"use client";

import { useEffect, useState } from "react";
import { getDraftBlogs, deleteBlogPost } from "@/app/actions";
import Link from "next/link";

interface DraftSummary {
    id: string;
    title: string;
    category: string;
    source?: string;
}

const SOURCE_LABELS: Record<string, string> = {
    PUBMED: "PubMed",
    MANUAL: "Handmatig",
    AI_PROMPT: "AI-prompt",
};

export default function DraftsList() {
    const [drafts, setDrafts] = useState<DraftSummary[]>([]);

    useEffect(() => {
        async function load() {
            const data = await getDraftBlogs();
            setDrafts(data);
        }
        load();
    }, []);

    if (drafts.length === 0) return <p className="text-gray-400 text-sm">No drafts pending.</p>;

    return (
        <div className="grid gap-3">
            {drafts.map((draft) => (
                <div key={draft.id} className="p-4 bg-white border border-yellow-200 rounded-xl flex flex-col gap-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <h3 className="font-medium">{draft.title}</h3>
                        <p className="text-xs text-gray-500">
                            Category: {draft.category} · Source: {SOURCE_LABELS[draft.source || "PUBMED"] || draft.source}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                            href={`/admin/editor/${draft.id}`}
                            className="inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-medium text-black bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
                        >
                            Edit & Publish
                        </Link>
                        <button
                            onClick={async () => {
                                if (confirm("Are you sure you want to delete this draft?")) {
                                    await deleteBlogPost(draft.id);
                                    window.location.reload();
                                }
                            }}
                            className="inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
