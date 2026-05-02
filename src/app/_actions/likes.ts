"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user-auth";

export async function toggleLike(blogPostId: string) {
    const user = await getCurrentUser();
    if (!user) redirect(`/login?next=/blog/${blogPostId}`);

    const existing = await prisma.like.findUnique({
        where: {
            userId_blogPostId: { userId: user.id, blogPostId },
        },
    });

    if (existing) {
        await prisma.like.delete({ where: { id: existing.id } });
    } else {
        await prisma.like.create({
            data: { userId: user.id, blogPostId },
        });
    }

    revalidatePath(`/blog/${blogPostId}`);
}
