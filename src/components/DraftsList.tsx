"use client";

import { useEffect, useState } from "react";
import { getDraftBlogs } from "@/app/actions";
import Link from "next/link";

export default function DraftsList() {
    const [drafts, setDrafts] = useState<any[]>([]);

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
                <div key={draft.id} className="p-4 bg-white border border-yellow-200 rounded-xl flex items-center justify-between shadow-sm">
                    <div>
                        <h3 className="font-medium">{draft.title}</h3>
                        <p className="text-xs text-gray-500">Category: {draft.category}</p>
                    </div>
                    <Link
                        href={`/admin/editor/${draft.id}`}
                        className="px-4 py-2 text-sm font-medium text-black bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                        Edit & Publish
                    </Link>
                </div>
            ))}
        </div>
    );
}
