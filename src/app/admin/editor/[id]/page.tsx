"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { updateBlogPost, publishBlogPost, getBlogPost, getTags, createTag } from "@/app/actions";
import Link from "next/link";
import { motion } from "framer-motion";
import TiptapEditor from "@/components/TiptapEditor";
import { ChevronDown, ChevronUp } from "lucide-react";
import MultiSelect from "@/components/MultiSelect";

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

    // Blog 2.0 Fields State
    const [specialism, setSpecialism] = useState("");
    const [ceStatus, setCeStatus] = useState("");
    const [cost, setCost] = useState("");
    const [modelType, setModelType] = useState("");
    const [doi, setDoi] = useState("");
    const [citation, setCitation] = useState("");
    const [developer, setDeveloper] = useState("");
    const [privacyType, setPrivacyType] = useState("");
    const [integration, setIntegration] = useState("");
    const [demoUrl, setDemoUrl] = useState("");
    const [vendorUrl, setVendorUrl] = useState("");
    const [fdaStatus, setFdaStatus] = useState("");
    const [fdaNumber, setFdaNumber] = useState("");

    // Tags
    const [tags, setTags] = useState<string[]>([]);
    const [availableTags, setAvailableTags] = useState<{ id: string; name: string }[]>([]);

    const [showAdvanced, setShowAdvanced] = useState(false);

    useEffect(() => {
        async function load() {
            const [data, allTags] = await Promise.all([
                getBlogPost(id),
                getTags()
            ]);

            if (data) {
                setBlog(data);
                setContent(data.content);
                setTitle(data.title);
                setCategory(data.category);
                setIsGuideline(data.isGuideline);
                if (data.scheduledFor) {
                    const date = new Date(data.scheduledFor);
                    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                    setScheduledFor(date.toISOString().slice(0, 16));
                }

                // Load new fields
                setSpecialism(data.specialism || "");
                setCeStatus(data.ceStatus || "");
                setCost(data.cost || "");
                setModelType(data.modelType || "");
                setDoi(data.doi || "");
                setCitation(data.citation || "");
                setDeveloper(data.developer || "");
                setPrivacyType(data.privacyType || "");
                setIntegration(data.integration || "");
                setDemoUrl(data.demoUrl || "");
                setVendorUrl(data.vendorUrl || "");
                setFdaStatus(data.fdaStatus || "");
                setFdaNumber(data.fdaNumber || "");

                // Load tags
                if (data.tags) {
                    setTags(data.tags.map((t: any) => t.id));
                }
            }
            if (allTags) {
                setAvailableTags(allTags);
            }
            setLoading(false);
        }
        load();
    }, [id]);

    async function handleSave() {
        setSaving(true);
        await updateBlogPost(id, {
            title, content, category, isGuideline, scheduledFor: scheduledFor || null,
            specialism, ceStatus, cost, modelType, doi, citation, developer, privacyType, integration, demoUrl, vendorUrl, fdaStatus, fdaNumber,
            tags
        });
        setSaving(false);
    }

    async function handlePublish() {
        setSaving(true);
        await updateBlogPost(id, {
            title, content, category, isGuideline, scheduledFor: scheduledFor || null,
            specialism, ceStatus, cost, modelType, doi, citation, developer, privacyType, integration, demoUrl, vendorUrl, fdaStatus, fdaNumber,
            tags
        });
        await publishBlogPost(id);
        router.push("/admin");
    }

    async function handleCreateTag(name: string) {
        const newTag = await createTag(name);
        if (newTag) {
            setAvailableTags(prev => [...prev, newTag]);
            return newTag;
        }
        return null;
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

            <main className="max-w-5xl mx-auto mt-8 px-6 space-y-6">
                {/* Title & Basic Settings */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
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
                </div>

                {/* Advanced Metadata Toggle */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                        <span className="font-bold text-sm text-gray-700">Blog Metadata & Taxonomy</span>
                        {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {showAdvanced && (
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Taxonomy */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-sm border-b pb-2">Taxonomy</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Main Category</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black">
                                        <option value="Predictie">Predictie</option>
                                        <option value="Diagnostiek">Diagnostiek</option>
                                        <option value="Methodisch">Methodisch</option>
                                        <option value="Ethiek">Ethiek</option>
                                        <option value="Prognostisch">Prognostisch</option>
                                        <option value="Logistiek & Planning">Logistiek & Planning</option>
                                        <option value="Generatieve AI">Generatieve AI</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Tags (Multiple Categories)</label>
                                    <MultiSelect
                                        options={availableTags}
                                        selected={tags}
                                        onChange={setTags}
                                        onCreate={handleCreateTag}
                                        placeholder="Select or create tags..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Specialism (Legacy)</label>
                                    <input type="text" value={specialism} onChange={(e) => setSpecialism(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black" placeholder="Radiologie, Cardiologie..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Cost Category</label>
                                    <select value={cost} onChange={(e) => setCost(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black">
                                        <option value="">Select...</option>
                                        <option value="Gratis (Freemium)">€ (Laag/Gratis)</option>
                                        <option value="Licentie">€€ (Licentie)</option>
                                        <option value="Enterprise">€€€ (Enterprise)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-sm border-b pb-2">Trust Indicators</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">CE Status</label>
                                        <select value={ceStatus} onChange={(e) => setCeStatus(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black">
                                            <option value="">None</option>
                                            <option value="CE Class I">CE Class I</option>
                                            <option value="CE Class IIa">CE Class IIa</option>
                                            <option value="CE Class IIb">CE Class IIb</option>
                                            <option value="CE Class III">CE Class III</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">FDA Status</label>
                                        <select value={fdaStatus} onChange={(e) => setFdaStatus(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black">
                                            <option value="">None</option>
                                            <option value="Cleared">Cleared</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">FDA/510(k) Number</label>
                                    <input type="text" value={fdaNumber} onChange={(e) => setFdaNumber(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black" placeholder="K200873" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">DOI Reference (URL)</label>
                                    <input type="text" value={doi} onChange={(e) => setDoi(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black" placeholder="https://doi.org/..." />
                                </div>
                            </div>

                            {/* Quick Facts */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-sm border-b pb-2">Quick Facts (Sidebar)</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Developer (Name + Country)</label>
                                    <input type="text" value={developer} onChange={(e) => setDeveloper(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Privacy Type</label>
                                    <select value={privacyType} onChange={(e) => setPrivacyType(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black">
                                        <option value="">Select...</option>
                                        <option value="Cloud">Cloud</option>
                                        <option value="On-Premise">On-Premise</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Integration</label>
                                    <input type="text" value={integration} onChange={(e) => setIntegration(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black" placeholder="PACS, EPD..." />
                                </div>
                            </div>

                            {/* Links */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-sm border-b pb-2">Links</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Demo URL</label>
                                    <input type="text" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Vendor URL</label>
                                    <input type="text" value={vendorUrl} onChange={(e) => setVendorUrl(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Citation Text</label>
                                    <input type="text" value={citation} onChange={(e) => setCitation(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black" placeholder="Author et al. (Year)..." />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

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
