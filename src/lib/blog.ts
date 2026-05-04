"use server";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { specialisms } from "@/lib/constants";
import {
    getStaticArticles,
    getStaticArticleById,
    mergeWithStaticArticles,
    staticArticleMatchesTopic,
} from "@/lib/static-articles";

const HUB_CATEGORIES = ["Predictie", "Diagnostiek", "Methodisch", "Ethiek"] as const;

function logBlogLoadFailure(scope: string, error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[blog] ${scope}: ${message}`);
}

export async function getPublishedBlogs() {
    try {
        const databaseBlogs = await prisma.blogPost.findMany({
            where: {
                published: true,
                OR: [
                    { scheduledFor: null },
                    { scheduledFor: { lte: new Date() } }
                ]
            },
            orderBy: { createdAt: "desc" },
        });
        return mergeWithStaticArticles(databaseBlogs);
    } catch (error) {
        logBlogLoadFailure("Failed to load published blogs", error);
        return getStaticArticles();
    }
}

export async function getPublishedBlogsByCategory(category: string) {
    try {
        const databaseBlogs = await prisma.blogPost.findMany({
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
        const staticBlogs = getStaticArticles().filter((blog) => blog.category === category);
        return mergeWithStaticArticles([...staticBlogs, ...databaseBlogs]);
    } catch (error) {
        logBlogLoadFailure("Failed to load blogs by category", error);
        return getStaticArticles().filter((blog) => blog.category === category);
    }
}

export async function getCategoryCounts() {
    const zeroCounts = HUB_CATEGORIES.map((category) => ({ category, count: 0 }));

    try {
        const blogs = await getPublishedBlogs();
        return HUB_CATEGORIES.map((category) => ({
            category,
            count: blogs.filter((blog) => !blog.isGuideline && blog.category === category).length
        }));
    } catch (error) {
        logBlogLoadFailure("Failed to load category counts", error);
        return zeroCounts;
    }
}

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
        const databaseBlogs = await prisma.blogPost.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: { tags: true }
        });
        const staticBlogs = getStaticArticles().filter((blog) => staticArticleMatchesTopic(blog, topic));
        return mergeWithStaticArticles([...staticBlogs, ...databaseBlogs]);
    } catch (error) {
        logBlogLoadFailure("Failed to load blogs for topic", error);
        return getStaticArticles().filter((blog) => staticArticleMatchesTopic(blog, topic));
    }
}

export async function getBlogById(id: string) {
    try {
        const databaseBlog = await prisma.blogPost.findUnique({
            where: { id },
            include: { tags: true }
        });
        return databaseBlog ?? getStaticArticleById(id);
    } catch (error) {
        logBlogLoadFailure("Failed to load blog by id", error);
        return getStaticArticleById(id);
    }
}

export async function getPublishedBlogsByTag(tagName: string) {
    try {
        const databaseBlogs = await prisma.blogPost.findMany({
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
        const staticBlogs = getStaticArticles().filter((blog) => staticArticleMatchesTopic(blog, tagName));
        return mergeWithStaticArticles([...staticBlogs, ...databaseBlogs]);
    } catch (error) {
        logBlogLoadFailure("Failed to load blogs by tag", error);
        return getStaticArticles().filter((blog) => staticArticleMatchesTopic(blog, tagName));
    }
}
