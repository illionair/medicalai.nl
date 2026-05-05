"use client";

import TiptapEditor from "@/components/TiptapEditor";
import { motion } from "framer-motion";
import type { BlogFormState, SetField } from "./types";

interface Props {
    state: BlogFormState;
    setField: SetField;
}

export default function ContentPanel({ state, setField }: Props) {
    return (
        <>
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <Field label="Title">
                    <input
                        type="text"
                        value={state.title}
                        onChange={(e) => setField("title", e.target.value)}
                        className="w-full text-lg sm:text-xl font-bold border-none focus:ring-0 p-0 placeholder-gray-300 text-black"
                        placeholder="Enter title..."
                    />
                </Field>
                <Field label="Subtitle (Ondertitel)">
                    <input
                        type="text"
                        value={state.subtitle}
                        onChange={(e) => setField("subtitle", e.target.value)}
                        className="w-full text-base sm:text-lg font-medium border-none focus:ring-0 p-0 placeholder-gray-300 text-gray-700"
                        placeholder="Enter subtitle..."
                    />
                </Field>
                <Field label="Summary (In het kort)">
                    <textarea
                        value={state.summary}
                        onChange={(e) => setField("summary", e.target.value)}
                        className="w-full p-3 border rounded-lg text-sm text-black h-24 resize-y"
                        placeholder="Korte samenvatting van het artikel..."
                    />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Author(s)">
                        <input
                            type="text"
                            value={state.authors}
                            onChange={(e) => setField("authors", e.target.value)}
                            className="w-full p-2 border rounded-lg text-sm text-black"
                            placeholder="Author names..."
                        />
                    </Field>
                    <Field label="Date (Scheduled/Published)">
                        <input
                            type="datetime-local"
                            value={state.scheduledFor}
                            onChange={(e) => setField("scheduledFor", e.target.value)}
                            className="w-full p-2 border rounded-lg text-sm text-black"
                        />
                    </Field>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="h-[520px] sm:h-[620px] lg:h-[700px]"
            >
                <TiptapEditor value={state.content} onChange={(value) => setField("content", value)} />
            </motion.div>
        </>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</label>
            {children}
        </div>
    );
}
