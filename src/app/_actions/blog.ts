"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { generateBlogPost } from "@/lib/ai";
import { requireAdmin } from "@/lib/user-auth";

export async function generateBlogs(articleIds: string[], instructions: string = "") {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    let count = 0;
    const logs: string[] = [];
    logs.push(`Starting generateBlogs with IDs: ${JSON.stringify(articleIds)}`);
    if (instructions) logs.push(`Custom Instructions: ${instructions}`);

    for (const id of articleIds) {
        const article = await prisma.article.findUnique({ where: { id } });
        if (!article) {
            logs.push(`Article not found: ${id}`);
            continue;
        }

        try {
            logs.push(`Generating content for article: ${article.title}`);
            const content = await generateBlogPost({
                title: article.title,
                abstract: article.abstract,
                authors: article.authors || "Unknown",
            }, instructions);

            if (!content) {
                logs.push(`AI returned no content for article: ${id}`);
                continue;
            }
            logs.push(`Generated content length: ${content.length}`);

            const blog = await prisma.blogPost.create({
                data: {
                    title: article.title,
                    content,
                    summary: article.abstract.substring(0, 200) + "...",
                    category: "Predictie",
                    published: false,
                    articleId: article.id,
                },
            });
            logs.push(`BlogPost created with ID: ${blog.id}`);

            await prisma.article.update({
                where: { id },
                data: { status: "SELECTED" },
            });

            count++;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            logs.push(`Failed to generate blog for article ${id}: ${message}`);
        }
    }

    revalidatePath("/admin");
    return { success: true, count, logs };
}

export async function getDraftBlogs() {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    return await prisma.blogPost.findMany({
        where: { published: false },
        orderBy: { createdAt: "desc" },
    });
}

export async function getPublishedBlogsAdmin() {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    return await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function getBlogPost(id: string) {
    return await prisma.blogPost.findUnique({
        where: { id },
        include: {
            tags: true,
            article: true,
            likes: true,
            comments: {
                where: { status: "APPROVED" },
                orderBy: { createdAt: "desc" },
                include: { user: true },
            },
        },
    });
}

export interface UpdateBlogPostInput {
    title: string;
    content: string;
    category: string;
    isGuideline?: boolean;
    scheduledFor?: string | null;
    specialism?: string;
    ceStatus?: string;
    cost?: string;
    modelType?: string;
    doi?: string;
    citation?: string;
    developer?: string;
    privacyType?: string;
    integration?: string;
    demoUrl?: string;
    vendorUrl?: string;
    fdaStatus?: string;
    fdaNumber?: string;
    tags?: string[];
    authors?: string;
    summary?: string;
    subtitle?: string;
    coverImage?: string;
    guidelineCategory?: string;
    displayLocations?: string[];
}

export async function updateBlogPost(id: string, data: UpdateBlogPostInput) {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    const blog = await prisma.blogPost.update({
        where: { id },
        data: {
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            summary: data.summary,
            category: data.category,
            isGuideline: data.isGuideline,
            scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : null,
            specialism: data.specialism,
            ceStatus: data.ceStatus,
            cost: data.cost,
            modelType: data.modelType,
            doi: data.doi,
            citation: data.citation,
            developer: data.developer,
            privacyType: data.privacyType,
            integration: data.integration,
            demoUrl: data.demoUrl,
            vendorUrl: data.vendorUrl,
            fdaStatus: data.fdaStatus,
            fdaNumber: data.fdaNumber,
            coverImage: data.coverImage,
            guidelineCategory: data.guidelineCategory,
            displayLocations: data.displayLocations,
            tags: data.tags ? { set: data.tags.map((tagId) => ({ id: tagId })) } : undefined,
        },
    });

    if (data.authors && blog.articleId) {
        await prisma.article.update({
            where: { id: blog.articleId },
            data: { authors: data.authors },
        });
    }
    revalidatePath(`/admin/editor/${id}`);
}

export async function publishBlogPost(id: string) {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    const blog = await prisma.blogPost.update({
        where: { id },
        data: { published: true },
    });

    if (blog.articleId) {
        await prisma.article.update({
            where: { id: blog.articleId },
            data: { status: "PUBLISHED" },
        });
    }

    revalidatePath("/admin");
    revalidatePath("/");
}

export async function unpublishBlogPost(id: string) {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    await prisma.blogPost.update({
        where: { id },
        data: { published: false },
    });

    revalidatePath("/admin");
    revalidatePath("/");
}

export async function createEmptyBlogPost() {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    const blog = await prisma.blogPost.create({
        data: {
            title: "Untitled Post",
            content: "",
            category: "Predictie",
            published: false,
        },
    });
    revalidatePath("/admin");
    return blog.id;
}

export async function deleteBlogPost(id: string) {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    const blog = await prisma.blogPost.findUnique({
        where: { id },
        include: { article: true },
    });

    if (!blog) return;

    await prisma.blogPost.delete({ where: { id } });

    if (blog.article && blog.articleId) {
        if (blog.article.pubmedId.startsWith("manual-")) {
            await prisma.article.delete({ where: { id: blog.articleId } });
        } else {
            await prisma.article.update({
                where: { id: blog.articleId },
                data: { status: "FETCHED" },
            });
        }
    }

    revalidatePath("/admin");
    revalidatePath("/");
}
