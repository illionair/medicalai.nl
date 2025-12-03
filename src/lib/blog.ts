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

export async function getBlogsForTopic(topic: string) {
    return await prisma.blogPost.findMany({
        where: {
            published: true,
            OR: [
                { category: { equals: topic, mode: 'insensitive' } },
                { specialism: { equals: topic, mode: 'insensitive' } },
                { tags: { some: { name: { equals: topic, mode: 'insensitive' } } } }
            ],
            AND: [
                {
                    OR: [
                        { scheduledFor: null },
                        { scheduledFor: { lte: new Date() } }
                    ]
                }
            ]
        },
        orderBy: { createdAt: "desc" },
        include: { tags: true }
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
