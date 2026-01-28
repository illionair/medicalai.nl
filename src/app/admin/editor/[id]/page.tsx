"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { updateBlogPost, publishBlogPost, getBlogPost, getTags, createTag } from "@/app/actions";
import { specialisms } from "@/lib/constants";
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
    const [subtitle, setSubtitle] = useState("");
    const [summary, setSummary] = useState("");
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
    const [authors, setAuthors] = useState("");

    // Guidelines & Display
    const [coverImage, setCoverImage] = useState("");
    const [displayLocations, setDisplayLocations] = useState<string[]>([]);
    const [guidelineCategory, setGuidelineCategory] = useState("");

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
                const blogData = data as any;
                setBlog(blogData);
                setContent(blogData.content);
                setTitle(blogData.title);
                setSubtitle(blogData.subtitle || "");
                setSummary(blogData.summary || "");
                setCategory(blogData.category);
                setIsGuideline(blogData.isGuideline);
                if (blogData.scheduledFor) {
                    const date = new Date(blogData.scheduledFor);
                    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                    setScheduledFor(date.toISOString().slice(0, 16));
                }

                // Load new fields
                setSpecialism(blogData.specialism || "");
                setCeStatus(blogData.ceStatus || "");
                setCost(blogData.cost || "");
                setModelType(blogData.modelType || "");
                setDoi(blogData.doi || "");
                setCitation(blogData.citation || "");
                setDeveloper(blogData.developer || "");
                setPrivacyType(blogData.privacyType || "");
                setIntegration(blogData.integration || "");
                setDemoUrl(blogData.demoUrl || "");
                setVendorUrl(blogData.vendorUrl || "");
                setFdaStatus(blogData.fdaStatus || "");
                setFdaNumber(blogData.fdaNumber || "");

                // Load display settings
                setCoverImage(blogData.coverImage || "");
                setDisplayLocations(blogData.displayLocations || []);
                setGuidelineCategory(blogData.guidelineCategory || "");

                // Load tags
                if (blogData.tags) {
                    setTags(blogData.tags.map((t: any) => t.id));
                }

                // Load authors
                if (blogData.article && blogData.article.authors) {
                    setAuthors(blogData.article.authors);
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
        const scheduledDate = scheduledFor ? new Date(scheduledFor).toISOString() : null;
        await updateBlogPost(id, {
            title, subtitle, content, summary, category, isGuideline, scheduledFor: scheduledDate,
            specialism, ceStatus, cost, modelType, doi, citation, developer, privacyType, integration, demoUrl, vendorUrl, fdaStatus, fdaNumber,
            tags, authors,
            coverImage, displayLocations, guidelineCategory
        });
        setSaving(false);
    }

    async function handlePublish() {
        setSaving(true);
        const scheduledDate = scheduledFor ? new Date(scheduledFor).toISOString() : null;
        await updateBlogPost(id, {
            title, subtitle, content, summary, category, isGuideline, scheduledFor: scheduledDate,
            specialism, ceStatus, cost, modelType, doi, citation, developer, privacyType, integration, demoUrl, vendorUrl, fdaStatus, fdaNumber,
            tags, authors,
            coverImage, displayLocations, guidelineCategory
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
                    <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Subtitle (Ondertitel)</label>
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full text-lg font-medium border-none focus:ring-0 p-0 placeholder-gray-300 text-gray-700"
                            placeholder="Enter subtitle..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Summary (In het kort)</label>
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full p-3 border rounded-lg text-sm text-black h-24 resize-y"
                            placeholder="Korte samenvatting van het artikel..."
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Author(s)</label>
                            <input
                                type="text"
                                value={authors}
                                onChange={(e) => setAuthors(e.target.value)}
                                className="w-full p-2 border rounded-lg text-sm text-black"
                                placeholder="Author names..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date (Scheduled/Published)</label>
                            <input
                                type="datetime-local"
                                value={scheduledFor}
                                onChange={(e) => setScheduledFor(e.target.value)}
                                className="w-full p-2 border rounded-lg text-sm text-black"
                            />
                        </div>
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
                                        <optgroup label="Klinische AI & Methodologie">
                                            <option value="Diagnostiek">Diagnostiek</option>
                                            <option value="Predictie">Predictie</option>
                                            <option value="Prognostiek">Prognostiek</option>
                                        </optgroup>
                                        <optgroup label="Governance, Ethiek & Wetgeving">
                                            <option value="Ethiek">Ethiek</option>
                                            <option value="AI-regelgeving">AI-regelgeving</option>
                                            <option value="Richtlijnen">Richtlijnen</option>
                                        </optgroup>
                                        <optgroup label="Medische Specialismen">
                                            <option value="Cardiologie">Cardiologie</option>
                                            <option value="Radiologie">Radiologie</option>
                                            <option value="Neurologie">Neurologie</option>
                                            <option value="Oncologie">Oncologie</option>
                                            <option value="Dermatologie">Dermatologie</option>
                                            <option value="Oogheelkunde">Oogheelkunde</option>
                                            <option value="Pathologie">Pathologie</option>
                                            <option value="Huisartsgeneeskunde">Huisartsgeneeskunde</option>
                                            <option value="Psychiatrie">Psychiatrie</option>
                                            <option value="Chirurgie">Chirurgie</option>
                                            <option value="Interne Geneeskunde">Interne Geneeskunde</option>
                                            <option value="Kindergeneeskunde">Kindergeneeskunde</option>
                                            <option value="Gynaecologie">Gynaecologie</option>
                                            <option value="Urologie">Urologie</option>
                                            <option value="Orthopedie">Orthopedie</option>
                                            <option value="Intensive Care">Intensive Care</option>
                                        </optgroup>
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
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Specialism</label>
                                    <select value={specialism} onChange={(e) => setSpecialism(e.target.value)} className="w-full p-2 border rounded-lg text-sm text-black">
                                        <option value="">Select Specialism...</option>
                                        <option value="Alle Specialismen">Alle Specialismen</option>
                                        {specialisms.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
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

                            {/* Display Settings */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-sm border-b pb-2">Display Settings</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Cover Image (Card)</label>
                                    <div className="flex items-center gap-4">
                                        {coverImage && (
                                            <img src={coverImage} alt="Cover" className="w-16 h-16 object-cover rounded-lg border" />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (ev) => setCoverImage(ev.target?.result as string);
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Display Locations</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Homepage", "Publicaties", "Guidelines"].map((loc) => (
                                            <button
                                                type="button"
                                                key={loc}
                                                onClick={() => {
                                                    if (displayLocations.includes(loc)) {
                                                        setDisplayLocations(displayLocations.filter(l => l !== loc));
                                                    } else {
                                                        setDisplayLocations([...displayLocations, loc]);
                                                    }
                                                }}
                                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${displayLocations.includes(loc)
                                                    ? "bg-brand-primary text-white border-brand-primary"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-brand-primary/50"
                                                    }`}
                                            >
                                                {loc}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {displayLocations.includes("Guidelines") && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                    >
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Guideline Category</label>
                                        <select
                                            value={guidelineCategory}
                                            onChange={(e) => setGuidelineCategory(e.target.value)}
                                            className="w-full p-2 border rounded-lg text-sm text-black"
                                        >
                                            <option value="">Select Category...</option>
                                            <option value="Klinisch onderzoek en evidence-standaarden">Klinisch onderzoek en evidence-standaarden</option>
                                            <option value="Nederlandse regelgeving">Nederlandse regelgeving</option>
                                            <option value="EU regelgeving">EU regelgeving</option>
                                            <option value="Internationale regelgeving">Internationale regelgeving</option>
                                        </select>
                                    </motion.div>
                                )}
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
