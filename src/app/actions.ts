"use server";

import { fetchRecentArticles } from "@/lib/pubmed";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { generateBlogPost } from "@/lib/ai";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    COOKIE_NAME_ADMIN_ACCESS,
    COOKIE_NAME_SITE_ACCESS,
    SITE_ACCESS_CODE,
    ADMIN_PASSWORD
} from "@/lib/auth";

// --- Auth Actions ---

export async function verifySiteAccess(formData: FormData) {
    const code = formData.get("code") as string;

    if (code === SITE_ACCESS_CODE) {
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME_SITE_ACCESS, "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });
        redirect("/");
    } else {
        return { error: "Invalid access code" };
    }
}

export async function verifyAdminLogin(formData: FormData) {
    const password = formData.get("password") as string;

    console.log("Login attempt:", password);
    console.log("Expected:", ADMIN_PASSWORD);

    if (password === ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME_ADMIN_ACCESS, "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        return { success: true };
    } else {
        return { error: "Invalid password" };
    }
}

// --- Blog Actions ---

export async function fetchAndSaveArticles(term: string = "artificial intelligence medicine") {
    const articles = await fetchRecentArticles(term);

    let count = 0;
    for (const article of articles) {
        // Check if exists
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
    return await prisma.article.findMany({
        where: { status },
        orderBy: { createdAt: "desc" },
    });
}

export async function deleteArticle(id: string) {
    await prisma.article.delete({ where: { id } });
    revalidatePath("/admin");
}

export async function generateBlogs(articleIds: string[], instructions: string = "") {
    let count = 0;
    const logs: string[] = [];
    logs.push(`Starting generateBlogs with IDs: ${JSON.stringify(articleIds)}`);
    if (instructions) logs.push(`Custom Instructions: ${instructions}`);

    // Debug: Check API Key presence (don't log full key)
    logs.push(`GEMINI_API_KEY present: ${!!process.env.GEMINI_API_KEY}`);
    logs.push(`Model used: gemini-1.5-flash`);

    try {
        const { listAvailableModels } = await import("@/lib/ai");
        const availableModels = await listAvailableModels();
        logs.push(`Available Models: ${JSON.stringify(availableModels)}`);
    } catch (e) {
        logs.push(`Failed to list models: ${e}`);
    }

    for (const id of articleIds) {
        const article = await prisma.article.findUnique({ where: { id } });
        if (!article) {
            logs.push(`Article not found: ${id}`);
            continue;
        }

        try {
            logs.push(`Generating content for article: ${article.title}`);
            // 1. Generate content
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

            // 2. Determine category
            const categories = ["Predictie", "Diagnostiek", "Methodisch", "Ethiek"];
            const category = categories[Math.floor(Math.random() * categories.length)];

            // 3. Save BlogPost
            logs.push("Creating BlogPost in DB...");
            const blog = await prisma.blogPost.create({
                data: {
                    title: article.title,
                    content: content,
                    summary: article.abstract.substring(0, 200) + "...",
                    category: "Predictie",
                    published: false,
                    articleId: article.id,
                },
            });
            logs.push(`BlogPost created with ID: ${blog.id}`);

            // 4. Update Article status
            await prisma.article.update({
                where: { id },
                data: { status: "SELECTED" },
            });

            count++;
        } catch (error: any) {
            logs.push(`Failed to generate blog for article ${id}: ${error.message}`);
        }
    }

    revalidatePath("/admin");
    return { success: true, count, logs };
}

export async function getDraftBlogs() {
    return await prisma.blogPost.findMany({
        where: { published: false },
        orderBy: { createdAt: "desc" },
    });
}

export async function getPublishedBlogsAdmin() {
    return await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function getTags() {
    return await prisma.tag.findMany({ orderBy: { name: "asc" } });
}

export async function createTag(name: string) {
    return await prisma.tag.create({ data: { name } });
}

export async function getBlogPost(id: string) {
    return await prisma.blogPost.findUnique({
        where: { id },
        include: { tags: true, article: true }
    });
}

export async function updateBlogPost(id: string, data: {
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
    tags?: string[]; // Array of Tag IDs
    authors?: string;
    summary?: string;
    // Guidelines & Display
    coverImage?: string;
    guidelineCategory?: string;
    displayLocations?: string[];
}) {
    console.log("Updating Blog Post:", id);
    console.log("Data:", JSON.stringify(data, null, 2));

    const blog = await prisma.blogPost.update({
        where: { id },
        data: {
            title: data.title,
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
            // New fields
            coverImage: data.coverImage,
            guidelineCategory: data.guidelineCategory,
            displayLocations: data.displayLocations,
            tags: data.tags ? {
                set: data.tags.map(tagId => ({ id: tagId }))
            } : undefined
        },
    });

    if (data.authors) {
        await prisma.article.update({
            where: { id: blog.articleId },
            data: { authors: data.authors }
        });
    }
    revalidatePath(`/admin/editor/${id}`);
}

export async function publishBlogPost(id: string) {
    const blog = await prisma.blogPost.update({
        where: { id },
        data: { published: true },
    });

    await prisma.article.update({
        where: { id: blog.articleId },
        data: { status: "PUBLISHED" },
    });

    revalidatePath("/admin");
    revalidatePath("/");
}

export async function createManualArticle(data: { title: string; abstract: string; authors: string; url?: string }) {
    const id = Math.random().toString(36).substring(7); // Temporary ID generation

    await prisma.article.create({
        data: {
            pubmedId: `manual-${id}`,
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

export async function createEmptyBlogPost() {
    const blog = await prisma.blogPost.create({
        data: {
            title: "Untitled Post",
            content: "",
            category: "Predictie",
            published: false,
            articleId: "manual-" + Date.now(), // Unique dummy ID
        },
    });
    revalidatePath("/admin");
    return blog.id;
}

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    console.log(`--- NEW CONTACT MESSAGE ---`);
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: ${subject}`);

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Medical AI Contact" <${process.env.SMTP_USER}>`, // Sender address
            to: process.env.SMTP_USER, // List of receivers (sending to yourself)
            replyTo: email, // Reply to the user's email
            subject: `[Contact Form] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully via Nodemailer");
        return { success: true };

    } catch (error) {
        console.error("Error sending email:", error);
        // We still return success to the user to not alarm them, but log the error
        // In a production app you might want to handle this differently
        return { success: false, error: "Failed to send email" };
    }
}

export async function deleteBlogPost(id: string) {
    const blog = await prisma.blogPost.findUnique({
        where: { id },
        include: { article: true }
    });

    if (!blog) return;

    // Delete the blog post
    await prisma.blogPost.delete({ where: { id } });

    // If it was a manual entry (created via createEmptyBlogPost), we might want to delete the article too
    // Or just reset the status to FETCHED so it appears in the list again
    if (blog.article) {
        if (blog.article.pubmedId.startsWith('manual-')) {
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

export async function unpublishBlogPost(id: string) {
    await prisma.blogPost.update({
        where: { id },
        data: { published: false },
    });

    revalidatePath("/admin");
    revalidatePath("/");
}
