"use client";

import { motion } from "framer-motion";
import type { BlogFormState, SetField } from "./types";

interface Props {
    state: BlogFormState;
    setField: SetField;
}

const DISPLAY_LOCATIONS = ["Homepage", "Publicaties", "Guidelines"] as const;
const GUIDELINE_CATEGORIES = [
    "Klinisch onderzoek en evidence-standaarden",
    "Nederlandse regelgeving",
    "EU regelgeving",
    "Internationale regelgeving",
] as const;

export default function PublishingPanel({ state, setField }: Props) {
    function toggleLocation(loc: string) {
        const next = state.displayLocations.includes(loc)
            ? state.displayLocations.filter((l) => l !== loc)
            : [...state.displayLocations, loc];
        setField("displayLocations", next);
    }

    function handleCoverImage(file: File) {
        const reader = new FileReader();
        reader.onload = (ev) => setField("coverImage", (ev.target?.result as string) || "");
        reader.readAsDataURL(file);
    }

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-sm border-b pb-2">Display Settings</h3>
            <Field label="Cover Image (Card)">
                <div className="flex items-center gap-4">
                    {state.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={state.coverImage} alt="Cover" className="w-16 h-16 object-cover rounded-lg border" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleCoverImage(file);
                        }}
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
                    />
                </div>
            </Field>
            <Field label="Display Locations">
                <div className="flex flex-wrap gap-2">
                    {DISPLAY_LOCATIONS.map((loc) => {
                        const active = state.displayLocations.includes(loc);
                        return (
                            <button
                                type="button"
                                key={loc}
                                onClick={() => toggleLocation(loc)}
                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${active
                                    ? "bg-brand-primary text-white border-brand-primary"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-brand-primary/50"
                                    }`}
                            >
                                {loc}
                            </button>
                        );
                    })}
                </div>
            </Field>
            {state.displayLocations.includes("Guidelines") && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <Field label="Guideline Category">
                        <select
                            value={state.guidelineCategory}
                            onChange={(e) => setField("guidelineCategory", e.target.value)}
                            className="w-full p-2 border rounded-lg text-sm text-black"
                        >
                            <option value="">Select Category...</option>
                            {GUIDELINE_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </Field>
                </motion.div>
            )}
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
            {children}
        </div>
    );
}
