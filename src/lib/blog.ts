"use server";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function logBlogLoadFailure(scope: string, error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[blog] ${scope}: ${message}`);
}

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
        logBlogLoadFailure("Failed to load published blogs", error);
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
        logBlogLoadFailure("Failed to load blogs by category", error);
        return [];
    }
}

import { specialisms } from "@/lib/constants";

export async function getBlogsForTopic(topic: string) {
    const isSpecialism = specialisms.includes(topic);

    const whereClause: Prisma.BlogPostWhereInput = {
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
        whereClause.OR?.push({ specialism: "Alle Specialismen" });
    }

    try {
        return await prisma.blogPost.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: { tags: true }
        });
    } catch (error) {
        logBlogLoadFailure("Failed to load blogs for topic", error);
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
        logBlogLoadFailure("Failed to load blog by id", error);
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
        logBlogLoadFailure("Failed to load blogs by tag", error);
        return [];
    }
}
