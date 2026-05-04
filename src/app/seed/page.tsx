"use client";

import { useState } from "react";
import { createOpenEvidencePost, createTenMinChecklistPost } from "./actions";

export default function SeedPage() {
    const [status, setStatus] = useState("Idle");

    const run = async (label: string, fn: () => Promise<void>) => {
        setStatus(`${label}: bezig...`);
        try {
            await fn();
            setStatus(`${label}: klaar.`);
        } catch (e: unknown) {
            setStatus(`${label}: fout — ${e instanceof Error ? e.message : String(e)}`);
        }
    };

    return (
        <div className="p-10 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Seed posts</h1>
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => run("OpenEvidence", createOpenEvidencePost)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Create OpenEvidence post
                </button>
                <button
                    onClick={() => run("10-min checklist", createTenMinChecklistPost)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded"
                >
                    Create 10-min checklist post
                </button>
            </div>
            <p className="mt-4 text-sm text-slate-600">{status}</p>
        </div>
    );
}
