"use client";

import MultiSelect from "@/components/MultiSelect";
import { specialisms } from "@/lib/constants";
import type { BlogFormState, SetField, TagOption } from "./types";

interface Props {
    state: BlogFormState;
    setField: SetField;
    availableTags: TagOption[];
    onCreateTag: (name: string) => Promise<TagOption | null>;
}

export default function TagsPanel({ state, setField, availableTags, onCreateTag }: Props) {
    return (
        <div className="space-y-4">
            <h3 className="font-bold text-sm border-b pb-2">Taxonomy</h3>
            <Field label="Main Category">
                <select
                    value={state.category}
                    onChange={(e) => setField("category", e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm text-black"
                >
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
                        {specialisms.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </optgroup>
                </select>
            </Field>
            <Field label="Tags (Multiple Categories)">
                <MultiSelect
                    options={availableTags}
                    selected={state.tags}
                    onChange={(value) => setField("tags", value)}
                    onCreate={onCreateTag}
                    placeholder="Select or create tags..."
                />
            </Field>
            <Field label="Specialism">
                <select
                    value={state.specialism}
                    onChange={(e) => setField("specialism", e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm text-black"
                >
                    <option value="">Select Specialism...</option>
                    <option value="Alle Specialismen">Alle Specialismen</option>
                    {specialisms.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </Field>
            <Field label="Cost Category">
                <select
                    value={state.cost}
                    onChange={(e) => setField("cost", e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm text-black"
                >
                    <option value="">Select...</option>
                    <option value="Gratis (Freemium)">€ (Laag/Gratis)</option>
                    <option value="Licentie">€€ (Licentie)</option>
                    <option value="Enterprise">€€€ (Enterprise)</option>
                </select>
            </Field>
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
