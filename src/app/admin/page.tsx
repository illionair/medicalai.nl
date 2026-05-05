"use client";

import { useState, useEffect } from "react";
import { fetchAndSaveArticles, fetchAndSaveDoi, getArticlesByStatus, deleteArticle, generateBlogs, createManualArticle, createEmptyBlogPost, createAiPromptBlogPost, getOrCreateBlogPostForArticle } from "../actions";
import { motion } from "framer-motion";
import DraftsList from "@/components/DraftsList";
import PublishedList from "@/components/PublishedList";
import { useRouter } from "next/navigation";

interface ArticleSummary {
    id: string;
    title: string;
    abstract: string;
    authors: string | null;
    journal: string | null;
    url: string | null;
}

export default function AdminPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<ArticleSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<"fetch" | "doi" | "manual" | "ai">("fetch");

    // Fetch State
    const [query, setQuery] = useState("artificial intelligence medicine");
    const [doi, setDoi] = useState("");

    // Manual State
    const [manualForm, setManualForm] = useState({ title: "", abstract: "", authors: "", url: "" });
    const [aiForm, setAiForm] = useState({
        topic: "",
        specialism: "",
        template: "Review klinische validatie",
        instructions: "",
    });

    // Custom Instructions State
    const [customInstructions, setCustomInstructions] = useState("");

    async function loadArticles() {
        const data = await getArticlesByStatus("FETCHED");
        setArticles(data);
    }

    useEffect(() => {
        let cancelled = false;
        getArticlesByStatus("FETCHED").then((data) => {
            if (!cancelled) setArticles(data);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    async function handleFetch() {
        setLoading(true);
        await fetchAndSaveArticles(query);
        await loadArticles();
        setLoading(false);
    }

    async function handleDoiFetch() {
        setLoading(true);
        const result = await fetchAndSaveDoi(doi);
        if (result.success) {
            setDoi("");
            await loadArticles();
            alert(result.message || "Article fetched successfully!");
        } else {
            alert(result.error || "Failed to fetch article.");
        }
        setLoading(false);
    }

    async function handleManualSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        await createManualArticle(manualForm);
        setManualForm({ title: "", abstract: "", authors: "", url: "" });
        await loadArticles();
        setLoading(false);
        alert("Article added manually!");
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

    async function handleEditArticle(id: string) {
        setLoading(true);
        const blogPostId = await getOrCreateBlogPostForArticle(id);
        router.push(`/admin/editor/${blogPostId}`);
    }

    async function handleAiPromptSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const result = await createAiPromptBlogPost(aiForm);
        setLoading(false);

        if (result.success && result.id) {
            setAiForm({ topic: "", specialism: "", template: "Review klinische validatie", instructions: "" });
            router.push(`/admin/editor/${result.id}`);
        } else {
            alert(result.error || "AI draft kon niet worden gemaakt.");
        }
    }

    function toggleSelect(id: string) {
        if (selected.includes(id)) {
            setSelected(selected.filter((s) => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    }

    return (
        <div className="container py-12 md:py-20 lg:py-28">
            <h1 className="mb-8">Admin Dashboard</h1>

            <div className="-mx-4 mb-6 overflow-x-auto border-b px-4 pb-4 sm:mx-0 sm:px-0">
                <div className="flex min-w-max gap-2 sm:gap-4">
                <button
                    onClick={() => setActiveTab("fetch")}
                    className={`min-h-11 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === "fetch"
                        ? "text-brand-primary border border-white/50 shadow-sm"
                        : "text-gray-500 hover:text-black hover:bg-white/30"
                        }`}
                    style={activeTab === "fetch" ? {
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)'
                    } : {}}
                >
                    Fetch from PubMed
                </button>
                <button
                    onClick={() => setActiveTab("doi")}
                    className={`min-h-11 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === "doi"
                        ? "text-brand-primary border border-white/50 shadow-sm"
                        : "text-gray-500 hover:text-black hover:bg-white/30"
                        }`}
                    style={activeTab === "doi" ? {
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)'
                    } : {}}
                >
                    Fetch by DOI
                </button>
                <button
                    onClick={() => setActiveTab("manual")}
                    className={`min-h-11 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === "manual"
                        ? "text-brand-primary border border-white/50 shadow-sm"
                        : "text-gray-500 hover:text-black hover:bg-white/30"
                        }`}
                    style={activeTab === "manual" ? {
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)'
                    } : {}}
                >
                    Manual Entry
                </button>
                <button
                    onClick={() => setActiveTab("ai")}
                    className={`min-h-11 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === "ai"
                        ? "text-brand-primary border border-white/50 shadow-sm"
                        : "text-gray-500 hover:text-black hover:bg-white/30"
                        }`}
                    style={activeTab === "ai" ? {
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)'
                    } : {}}
                >
                    AI Prompt
                </button>
                </div>
            </div>

            {activeTab === "fetch" && (
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
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
                        className="min-h-12 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 sm:h-[50px]"
                        style={{ backgroundColor: "var(--accent)" }}
                    >
                        {loading ? "Fetching..." : "Fetch"}
                    </button>
                </div>
            )}

            {activeTab === "doi" && (
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
                    <div className="flex-grow">
                        <label className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
                        <input
                            type="text"
                            value={doi}
                            onChange={(e) => setDoi(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="e.g. 10.1038/s41591-023-02361-0"
                        />
                    </div>
                    <button
                        onClick={handleDoiFetch}
                        disabled={loading}
                        className="min-h-12 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 sm:h-[50px]"
                        style={{ backgroundColor: "var(--accent)" }}
                    >
                        {loading ? "Fetching..." : "Fetch DOI"}
                    </button>
                </div>
            )}

            {activeTab === "manual" && (
                <form onSubmit={handleManualSubmit} className="mb-8 p-5 sm:p-6 rounded-2xl border border-gray-200 bg-gray-50">
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
                            className="min-h-11 px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors self-start"
                        >
                            Add Article
                        </button>
                    </div>
                </form>
            )}

            {activeTab === "ai" && (
                <form onSubmit={handleAiPromptSubmit} className="mb-8 p-5 sm:p-6 rounded-2xl border border-blue-100 bg-blue-50/50">
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-900 mb-1">Topic / prompt</label>
                            <textarea
                                required
                                rows={4}
                                value={aiForm.topic}
                                onChange={(e) => setAiForm({ ...aiForm, topic: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                placeholder="Bijv. Schrijf een kritisch overzicht over AI-triage op de SEH en de impact op werkdruk, veiligheid en bias."
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-blue-900 mb-1">Template</label>
                                <select
                                    value={aiForm.template}
                                    onChange={(e) => setAiForm({ ...aiForm, template: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-blue-200 text-black"
                                >
                                    <option value="Review klinische validatie">Review klinische validatie</option>
                                    <option value="Vergelijk twee modellen">Vergelijk twee modellen</option>
                                    <option value="Ethische analyse">Ethische analyse</option>
                                    <option value="Implementatie in de praktijk">Implementatie in de praktijk</option>
                                    <option value="Korte explainers voor artsen">Korte explainers voor artsen</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-900 mb-1">Specialisme</label>
                                <input
                                    value={aiForm.specialism}
                                    onChange={(e) => setAiForm({ ...aiForm, specialism: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-blue-200 text-black"
                                    placeholder="Radiologie, Cardiologie, SEH..."
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-900 mb-1">Extra instructies</label>
                            <textarea
                                rows={3}
                                value={aiForm.instructions}
                                onChange={(e) => setAiForm({ ...aiForm, instructions: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                placeholder="Bijv. Houd het praktisch, geen lange inleiding, benoem expliciet welke claims geverifieerd moeten worden."
                            />
                        </div>
                        <p className="text-xs text-blue-800">
                            AI-prompt artikelen worden altijd als draft aangemaakt. Check bronnen, claims en regelgeving voor publicatie.
                        </p>
                        <button
                            type="submit"
                            disabled={loading}
                            className="min-h-12 px-6 py-3 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 self-start"
                        >
                            {loading ? "Generating draft..." : "Generate AI Draft"}
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

            <div className="flex flex-col justify-between mb-4 gap-4 lg:flex-row lg:items-end">
                <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">Fetched Articles</h2>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <label className="block text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
                            ✨ AI Custom Instructions (Optional)
                        </label>
                        <textarea
                            value={customInstructions}
                            onChange={(e) => setCustomInstructions(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[80px] text-black"
                            placeholder="e.g. 'Write in a pirate voice', 'Focus on clinical implications', 'Use simple language'..."
                        />
                    </div>
                </div>
                <div className="flex gap-3 flex-col justify-end h-full pb-1 sm:flex-row lg:flex-col">
                    <button
                        onClick={handleCreateEmpty}
                        disabled={loading}
                        className="min-h-12 px-6 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 w-full"
                    >
                        + New Manual Post
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={selected.length === 0 || loading}
                        className="min-h-12 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 w-full shadow-sm"
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
                        className={`p-5 sm:p-6 rounded-2xl border transition-all ${selected.includes(article.id)
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
                            <div className="min-w-0 flex-1">
                                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                                <p className="text-sm text-gray-400 mb-2">{article.authors} • {article.journal}</p>
                                <p className="text-gray-600 line-clamp-3">{article.abstract}</p>
                                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                                    {article.url ? (
                                        <a href={article.url} target="_blank" className="text-sm text-blue-600 hover:underline">
                                            View on PubMed
                                        </a>
                                    ) : null}
                                    <button onClick={() => handleEditArticle(article.id)} className="text-sm text-blue-600 hover:underline">
                                        Edit
                                    </button>
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
