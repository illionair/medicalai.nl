"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { fetchRecentArticles } from "@/lib/pubmed";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/user-auth";

export async function fetchAndSaveArticles(term: string = "artificial intelligence medicine") {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    const articles = await fetchRecentArticles(term);

    let count = 0;
    for (const article of articles) {
        const existing = await prisma.article.findUnique({
            where: { pubmedId: article.pubmedId },
        });

        if (!existing) {
            await prisma.article.create({
                data: {
                    pubmedId: article.pubmedId,
                    title: article.title,
                    abstract: article.abstract,
                    authors: article.authors,
                    journal: article.journal,
                    url: article.url,
                    status: "FETCHED",
                },
            });
            count++;
        }
    }

    revalidatePath("/admin");
    return { success: true, count };
}

export async function fetchAndSaveDoi(doi: string) {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    const { fetchArticleByDoi } = await import("@/lib/pubmed");
    const article = await fetchArticleByDoi(doi);

    if (!article) {
        return { success: false, error: "Article not found" };
    }

    const existing = await prisma.article.findUnique({
        where: { pubmedId: article.pubmedId },
    });

    if (!existing) {
        await prisma.article.create({
            data: {
                pubmedId: article.pubmedId,
                title: article.title,
                abstract: article.abstract,
                authors: article.authors,
                journal: article.journal,
                url: article.url,
                status: "FETCHED",
            },
        });
        revalidatePath("/admin");
        return { success: true, article };
    }

    return { success: true, article, message: "Article already exists" };
}

export async function getArticlesByStatus(status: string) {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    return await prisma.article.findMany({
        where: { status },
        orderBy: { createdAt: "desc" },
    });
}

export async function deleteArticle(id: string) {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    await prisma.article.delete({ where: { id } });
    revalidatePath("/admin");
}

export async function createManualArticle(data: { title: string; abstract: string; authors: string; url?: string }) {
    if (!(await requireAdmin())) redirect("/login?next=/admin");

    await prisma.article.create({
        data: {
            pubmedId: `manual-${randomUUID()}`,
            title: data.title,
            abstract: data.abstract,
            authors: data.authors,
            journal: "Manual Entry",
            url: data.url || "",
            status: "FETCHED",
        },
    });

    revalidatePath("/admin");
    return { success: true };
}
