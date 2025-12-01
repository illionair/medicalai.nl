"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { updateBlogPost, publishBlogPost, getBlogPost } from "@/app/actions";
import Link from "next/link";
import { motion } from "framer-motion";
import TiptapEditor from "@/components/TiptapEditor";

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [blog, setBlog] = useState<any>(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Predictie");
    const [isGuideline, setIsGuideline] = useState(false);
    const [scheduledFor, setScheduledFor] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            const data = await getBlogPost(id);
            if (data) {
                setBlog(data);
                setContent(data.content);
                setTitle(data.title);
                setCategory(data.category);
                setIsGuideline(data.isGuideline);
                if (data.scheduledFor) {
                    // Format for datetime-local input: YYYY-MM-DDTHH:mm
                    const date = new Date(data.scheduledFor);
                    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                    setScheduledFor(date.toISOString().slice(0, 16));
                }
            }
            setLoading(false);
        }
        load();
    }, [id]);

    async function handleSave() {
        setSaving(true);
        await updateBlogPost(id, { title, content, category, isGuideline, scheduledFor: scheduledFor || null });
        setSaving(false);
    }

    async function handlePublish() {
        setSaving(true);
        await updateBlogPost(id, { title, content, category, isGuideline, scheduledFor: scheduledFor || null });
        await publishBlogPost(id);
        router.push("/admin");
    }

    if (loading) return <div className="p-8 text-center">Loading editor...</div>;
    if (!blog) return <div className="p-8 text-center">Blog post not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="text-sm text-gray-500 hover:text-black">
                        ← Back
                    </Link>
                    <h1 className="font-semibold">Edit Blog Post</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        {saving ? "Saving..." : "Save Draft"}
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={saving}
                        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:opacity-80 transition-opacity"
                    >
                        {scheduledFor ? "Schedule" : "Publish"}
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto mt-8 px-6 space-y-6">
                {/* Settings Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
                >
                    <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-xl font-bold border-none focus:ring-0 p-0 placeholder-gray-300 text-black"
                            placeholder="Enter title..."
                        />
                    </div>

                    <div className="flex gap-6">
                        <div className="w-1/2">
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Topic</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black text-black"
                            >
                                <option value="Predictie">Predictie</option>
                                <option value="Diagnostiek">Diagnostiek</option>
                                <option value="Methodisch">Methodisch</option>
                                <option value="Ethiek">Ethiek</option>
                            </select>
                        </div>

                        <div className="w-1/2 flex flex-col gap-4 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isGuideline}
                                    onChange={(e) => setIsGuideline(e.target.checked)}
                                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                                />
                                <span className="text-sm font-medium text-black">Post to Guidelines</span>
                            </label>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Schedule Publish (Optional)</label>
                                <input
                                    type="datetime-local"
                                    value={scheduledFor}
                                    onChange={(e) => setScheduledFor(e.target.value)}
                                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black text-black"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Editor Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="h-[700px]"
                >
                    <TiptapEditor value={content} onChange={setContent} />
                </motion.div>
            </main>
        </div>
    );
}
