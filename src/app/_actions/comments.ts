"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/user-auth";
import { rateLimit } from "@/lib/rate-limit";
import { resolveCommentStatus, shouldGrantTrust } from "@/lib/moderation";

export async function createComment(blogPostId: string, formData: FormData) {
    const user = await getCurrentUser();
    if (!user) redirect(`/login?next=/blog/${blogPostId}`);

    const content = String(formData.get("content") || "").trim();
    if (content.length < 2 || content.length > 1200) return;

    const rl = await rateLimit({ key: `comment:${user.id}`, limit: 5, windowSec: 60 });
    if (!rl.success) return { error: "Te veel reacties achter elkaar. Probeer het later opnieuw." };

    const status = resolveCommentStatus({ trustedAt: user.trustedAt ?? null });

    await prisma.comment.create({
        data: {
            content,
            userId: user.id,
            blogPostId,
            status,
        },
    });

    revalidatePath(`/blog/${blogPostId}`);
    return { success: true, status };
}

export async function getPendingComments() {
    if (!(await requireAdmin())) redirect("/login?next=/admin/moderation");

    return await prisma.comment.findMany({
        where: { status: "PENDING" },
        orderBy: { createdAt: "asc" },
        include: { user: true, blogPost: { select: { id: true, title: true } } },
    });
}

export async function approveComment(commentId: string) {
    if (!(await requireAdmin())) redirect("/login?next=/admin/moderation");

    const comment = await prisma.comment.update({
        where: { id: commentId },
        data: { status: "APPROVED" },
        include: { user: true, blogPost: { select: { id: true } } },
    });

    if (!comment.user.trustedAt) {
        const approvedCount = await prisma.comment.count({
            where: { userId: comment.userId, status: "APPROVED" },
        });
        if (shouldGrantTrust({ trustedAt: null, approvedCount })) {
            await prisma.user.update({
                where: { id: comment.userId },
                data: { trustedAt: new Date() },
            });
        }
    }

    revalidatePath("/admin/moderation");
    revalidatePath(`/blog/${comment.blogPost.id}`);
}

export async function rejectComment(commentId: string) {
    if (!(await requireAdmin())) redirect("/login?next=/admin/moderation");

    const comment = await prisma.comment.update({
        where: { id: commentId },
        data: { status: "REJECTED" },
        include: { blogPost: { select: { id: true } } },
    });

    revalidatePath("/admin/moderation");
    revalidatePath(`/blog/${comment.blogPost.id}`);
}
