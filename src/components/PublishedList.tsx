"use client";

import { useEffect, useState } from "react";
import { getPublishedBlogsAdmin, deleteBlogPost, unpublishBlogPost } from "@/app/actions";
import Link from "next/link";

interface PublishedBlogSummary {
    id: string;
    title: string;
    summary: string | null;
    category: string;
    source?: string;
    createdAt: Date | string;
    scheduledFor?: Date | string | null;
}

const SOURCE_LABELS: Record<string, string> = {
    PUBMED: "PubMed",
    MANUAL: "Handmatig",
    AI_PROMPT: "AI-prompt",
};

export default function PublishedList() {
    const [blogs, setBlogs] = useState<PublishedBlogSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await getPublishedBlogsAdmin();
            setBlogs(data);
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return <div className="text-gray-500">Loading published posts...</div>;
    if (blogs.length === 0) return <div className="text-gray-500">No published or scheduled posts yet.</div>;

    return (
        <div className="grid gap-4">
            {blogs.map((blog) => (
                <div key={blog.id} className="p-4 bg-white rounded-xl border border-gray-200 hover:border-black transition-colors group relative z-10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
                        <Link href={`/admin/editor/${blog.id}`} className="min-w-0 flex-grow">
                            <div>
                                <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors text-black">
                                    {blog.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{blog.summary}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                        {blog.category}
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-blue-50 rounded-full text-blue-700">
                                        {SOURCE_LABELS[blog.source || "PUBMED"] || blog.source}
                                    </span>
                                    {blog.scheduledFor && new Date(blog.scheduledFor) > new Date() ? (
                                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                                            Scheduled: {new Date(blog.scheduledFor).toLocaleDateString()} {new Date(blog.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    ) : (
                                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                            Published
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                        <div className="flex flex-col gap-2 sm:ml-4 sm:items-end">
                            <span className="text-xs text-gray-400">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        if (confirm("Unpublish this post? It will move to drafts.")) {
                                            await unpublishBlogPost(blog.id);
                                            window.location.reload();
                                        }
                                    }}
                                    className="min-h-9 text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
                                >
                                    Unpublish
                                </button>
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        if (confirm("Delete this post permanently?")) {
                                            await deleteBlogPost(blog.id);
                                            window.location.reload();
                                        }
                                    }}
                                    className="min-h-9 text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
