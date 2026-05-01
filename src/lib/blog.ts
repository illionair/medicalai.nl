"use server";

import { prisma } from "@/lib/prisma";

export async function getPublishedBlogs() {
    try {
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
    } catch (error) {
        console.error("[blog] Failed to load published blogs", error);
        return [];
    }
}

export async function getPublishedBlogsByCategory(category: string) {
    try {
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
    } catch (error) {
        console.error("[blog] Failed to load blogs by category", error);
        return [];
    }
}

import { specialisms } from "@/lib/constants";

export async function getBlogsForTopic(topic: string) {
    const isSpecialism = specialisms.includes(topic);

    const whereClause: any = {
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
    };

    if (isSpecialism) {
        whereClause.OR.push({ specialism: "Alle Specialismen" });
    }

    try {
        return await prisma.blogPost.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: { tags: true }
        });
    } catch (error) {
        console.error("[blog] Failed to load blogs for topic", error);
        return [];
    }
}

export async function getBlogById(id: string) {
    try {
        return await prisma.blogPost.findUnique({
            where: { id },
            include: { tags: true }
        });
    } catch (error) {
        console.error("[blog] Failed to load blog by id", error);
        return null;
    }
}

export async function getPublishedBlogsByTag(tagName: string) {
    try {
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
    } catch (error) {
        console.error("[blog] Failed to load blogs by tag", error);
        return [];
    }
}
