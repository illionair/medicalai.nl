"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { updateBlogPost, publishBlogPost, getBlogPost, getTags, createTag } from "@/app/actions";
import ContentPanel from "./_components/ContentPanel";
import MetadataPanel from "./_components/MetadataPanel";
import PublishingPanel from "./_components/PublishingPanel";
import TagsPanel from "./_components/TagsPanel";
import type { BlogFormState, SetField, TagOption } from "./_components/types";

const INITIAL_STATE: BlogFormState = {
    title: "",
    subtitle: "",
    summary: "",
    content: "",
    category: "Predictie",
    isGuideline: false,
    scheduledFor: "",
    specialism: "",
    ceStatus: "",
    cost: "",
    modelType: "",
    doi: "",
    citation: "",
    developer: "",
    privacyType: "",
    integration: "",
    demoUrl: "",
    vendorUrl: "",
    fdaStatus: "",
    fdaNumber: "",
    authors: "",
    coverImage: "",
    displayLocations: [],
    guidelineCategory: "",
    tags: [],
    source: "PUBMED",
    aiPrompt: "",
};

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [state, setState] = useState<BlogFormState>(INITIAL_STATE);
    const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const setField: SetField = useCallback((key, value) => {
        setState((prev) => ({ ...prev, [key]: value }));
    }, []);

    useEffect(() => {
        async function load() {
            const [data, allTags] = await Promise.all([getBlogPost(id), getTags()]);

            if (!data) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            const scheduledFor = data.scheduledFor
                ? formatDateTimeLocal(new Date(data.scheduledFor))
                : "";

            setState({
                title: data.title,
                subtitle: data.subtitle ?? "",
                summary: data.summary ?? "",
                content: data.content,
                category: data.category,
                isGuideline: data.isGuideline,
                scheduledFor,
                specialism: data.specialism ?? "",
                ceStatus: data.ceStatus ?? "",
                cost: data.cost ?? "",
                modelType: data.modelType ?? "",
                doi: data.doi ?? "",
                citation: data.citation ?? "",
                developer: data.developer ?? "",
                privacyType: data.privacyType ?? "",
                integration: data.integration ?? "",
                demoUrl: data.demoUrl ?? "",
                vendorUrl: data.vendorUrl ?? "",
                fdaStatus: data.fdaStatus ?? "",
                fdaNumber: data.fdaNumber ?? "",
                authors: data.article?.authors ?? "",
                coverImage: data.coverImage ?? "",
                displayLocations: data.displayLocations ?? [],
                guidelineCategory: data.guidelineCategory ?? "",
                tags: data.tags?.map((t) => t.id) ?? [],
                source: data.source ?? "PUBMED",
                aiPrompt: data.aiPrompt ?? "",
            });
            setAvailableTags(allTags ?? []);
            setLoading(false);
        }
        load();
    }, [id]);

    async function persist() {
        const scheduledDate = state.scheduledFor ? new Date(state.scheduledFor).toISOString() : null;
        await updateBlogPost(id, {
            ...state,
            scheduledFor: scheduledDate,
        });
    }

    async function handleSave() {
        setSaving(true);
        await persist();
        setSaving(false);
    }

    async function handlePublish() {
        setSaving(true);
        await persist();
        await publishBlogPost(id);
        router.push("/admin");
    }

    async function handleCreateTag(name: string): Promise<TagOption | null> {
        const newTag = await createTag(name);
        if (newTag) {
            setAvailableTags((prev) => [...prev, newTag]);
            return newTag;
        }
        return null;
    }

    if (loading) return <div className="p-8 text-center">Loading editor...</div>;
    if (notFound) return <div className="p-8 text-center">Blog post not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="text-sm text-gray-500 hover:text-black">← Back</Link>
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
                        {state.scheduledFor ? "Schedule" : "Publish"}
                    </button>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto mt-8 px-6 space-y-6">
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
                            <TagsPanel
                                state={state}
                                setField={setField}
                                availableTags={availableTags}
                                onCreateTag={handleCreateTag}
                            />
                            <MetadataPanel state={state} setField={setField} />
                            <PublishingPanel state={state} setField={setField} />
                        </div>
                    )}
                </div>

                <ContentPanel state={state} setField={setField} />
            </main>
        </div>
    );
}

function formatDateTimeLocal(date: Date): string {
    const local = new Date(date);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toISOString().slice(0, 16);
}
