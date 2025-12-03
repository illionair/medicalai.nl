"use client";

import { useState } from "react";
import { createOpenEvidencePost } from "./actions";

export default function SeedPage() {
    const [status, setStatus] = useState("Idle");

    const handleSeed = async () => {
        setStatus("Seeding...");
        try {
            await createOpenEvidencePost();
            setStatus("Success! Blog post created.");
        } catch (e: any) {
            setStatus("Error: " + e.message);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Seed OpenEvidence Post</h1>
            <button
                onClick={handleSeed}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Create Post
            </button>
            <p className="mt-4">{status}</p>
        </div>
    );
}
