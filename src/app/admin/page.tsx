"use client";

import { useState, useEffect } from "react";
import { fetchAndSaveArticles, getArticlesByStatus, deleteArticle, generateBlogs, createManualArticle, createEmptyBlogPost } from "../actions";
import { motion } from "framer-motion";
import DraftsList from "@/components/DraftsList";
import PublishedList from "@/components/PublishedList";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<"fetch" | "manual">("fetch");

    // Fetch State
    const [query, setQuery] = useState("artificial intelligence medicine");

    // Manual State
    const [manualForm, setManualForm] = useState({ title: "", abstract: "", authors: "", url: "" });

    // Custom Instructions State
    const [customInstructions, setCustomInstructions] = useState("");

    useEffect(() => {
        loadArticles();
    }, []);

    async function loadArticles() {
        const data = await getArticlesByStatus("FETCHED");
        setArticles(data);
    }

    async function handleFetch() {
        setLoading(true);
        await fetchAndSaveArticles(query);
        await loadArticles();
        setLoading(false);
    }

    async function handleManualSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        await createManualArticle(manualForm);
        setManualForm({ title: "", abstract: "", authors: "", url: "" });
        await loadArticles();
        setLoading(false);
        alert("Article added!");
    }

    async function handleGenerate() {
        setLoading(true);
        await generateBlogs(selected, customInstructions);
        setSelected([]);
        await loadArticles();
        setLoading(false);
        window.location.reload();
    }

    async function handleCreateEmpty() {
        setLoading(true);
        const id = await createEmptyBlogPost();
        router.push(`/admin/editor/${id}`);
    }

    function toggleSelect(id: string) {
        if (selected.includes(id)) {
            setSelected(selected.filter((s) => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    }

    return (
        <div className="container section-padding">
            <h1 className="mb-8">Admin Dashboard</h1>

            <div className="flex gap-4 mb-6 border-b pb-4">
                <button
                    onClick={() => setActiveTab("fetch")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "fetch" ? "bg-gray-100 text-black" : "text-gray-500 hover:text-black"}`}
                >
                    Fetch from PubMed
                </button>
                <button
                    onClick={() => setActiveTab("manual")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "manual" ? "bg-gray-100 text-black" : "text-gray-500 hover:text-black"}`}
                >
                    Manual Entry
                </button>
            </div>

            {activeTab === "fetch" ? (
                <div className="mb-8 flex gap-4 items-end">
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search Query</label>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="e.g. artificial intelligence radiology"
                        />
                    </div>
                    <button
                        onClick={handleFetch}
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 h-[50px]"
                        style={{ backgroundColor: "var(--accent)" }}
                    >
                        {loading ? "Fetching..." : "Fetch"}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleManualSubmit} className="mb-8 p-6 rounded-2xl border border-gray-200 bg-gray-50">
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                required
                                value={manualForm.title}
                                onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 text-black"
                                placeholder="Article Title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Authors</label>
                            <input
                                required
                                value={manualForm.authors}
                                onChange={(e) => setManualForm({ ...manualForm, authors: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 text-black"
                                placeholder="Author names"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Abstract (Paste text here)</label>
                            <textarea
                                required
                                rows={5}
                                value={manualForm.abstract}
                                onChange={(e) => setManualForm({ ...manualForm, abstract: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 text-black"
                                placeholder="Paste the abstract or full text summary here..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors self-start"
                        >
                            Add Article
                        </button>
                    </div>
                </form>
            )}

            {/* Drafts Section */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Drafts (Needs Review)</h2>
                <DraftsList />
            </section>

            {/* Published/Scheduled Section */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Published & Scheduled</h2>
                <PublishedList />
            </section>

            <div className="flex justify-between items-end mb-4 gap-4">
                <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">Fetched Articles</h2>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <label className="block text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
                            ✨ AI Custom Instructions (Optional)
                        </label>
                        <textarea
                            value={customInstructions}
                            onChange={(e) => setCustomInstructions(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[80px]"
                            placeholder="e.g. 'Write in a pirate voice', 'Focus on clinical implications', 'Use simple language'..."
                        />
                    </div>
                </div>
                <div className="flex gap-3 flex-col justify-end h-full pb-1">
                    <button
                        onClick={handleCreateEmpty}
                        disabled={loading}
                        className="px-6 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 w-full"
                    >
                        + New Manual Post
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={selected.length === 0 || loading}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 w-full shadow-sm"
                    >
                        {loading ? "Generating..." : `Generate Blogs (${selected.length})`}
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {articles.map((article) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-6 rounded-2xl border transition-all ${selected.includes(article.id)
                            ? "border-blue-500 bg-blue-50/50"
                            : "border-gray-200 bg-white"
                            }`}
                        style={{
                            borderColor: selected.includes(article.id) ? "var(--accent)" : "var(--card-border)",
                        }}
                    >
                        <div className="flex items-start gap-4">
                            <input
                                type="checkbox"
                                checked={selected.includes(article.id)}
                                onChange={() => toggleSelect(article.id)}
                                className="mt-1.5 w-5 h-5"
                            />
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                                <p className="text-sm text-gray-400 mb-2">{article.authors} • {article.journal}</p>
                                <p className="text-gray-600 line-clamp-3">{article.abstract}</p>
                                <div className="mt-4 flex gap-4">
                                    <a href={article.url} target="_blank" className="text-sm text-blue-600 hover:underline">
                                        View on PubMed
                                    </a>
                                    <button onClick={() => deleteArticle(article.id)} className="text-sm text-red-500 hover:underline">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {articles.length === 0 && (
                    <p className="text-center text-gray-500 py-12">No articles found. Use the tabs above to add articles.</p>
                )}
            </div>
        </div>
    );
}
