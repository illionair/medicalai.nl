"use server";

import { prisma } from "@/lib/prisma";

export async function getPublishedBlogs() {
    return await prisma.blogPost.findMany({
        where: {
            published: true,
            OR: [
                { scheduledFor: null },
                { scheduledFor: { lte: new Date() } }
            ]
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function getPublishedBlogsByCategory(category: string) {
    return await prisma.blogPost.findMany({
        where: {
            published: true,
            category: category,
            OR: [
                { scheduledFor: null },
                { scheduledFor: { lte: new Date() } }
            ]
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function getBlogById(id: string) {
    return await prisma.blogPost.findUnique({
        where: { id },
        include: { tags: true }
    });
}

export async function getPublishedBlogsByTag(tagName: string) {
    return await prisma.blogPost.findMany({
        where: {
            published: true,
            tags: {
                some: {
                    name: tagName
                }
            },
            OR: [
                { scheduledFor: null },
                { scheduledFor: { lte: new Date() } }
            ]
        },
        orderBy: { createdAt: "desc" },
        include: { tags: true }
    });
}
