"use client";

import type { BlogFormState, SetField } from "./types";

interface Props {
    state: BlogFormState;
    setField: SetField;
}

export default function MetadataPanel({ state, setField }: Props) {
    return (
        <>
            <div className="space-y-4">
                <h3 className="font-bold text-sm border-b pb-2">Trust Indicators</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="CE Status">
                        <select
                            value={state.ceStatus}
                            onChange={(e) => setField("ceStatus", e.target.value)}
                            className="w-full p-2 border rounded-lg text-sm text-black"
                        >
                            <option value="">None</option>
                            <option value="CE Class I">CE Class I</option>
                            <option value="CE Class IIa">CE Class IIa</option>
                            <option value="CE Class IIb">CE Class IIb</option>
                            <option value="CE Class III">CE Class III</option>
                        </select>
                    </Field>
                    <Field label="FDA Status">
                        <select
                            value={state.fdaStatus}
                            onChange={(e) => setField("fdaStatus", e.target.value)}
                            className="w-full p-2 border rounded-lg text-sm text-black"
                        >
                            <option value="">None</option>
                            <option value="Cleared">Cleared</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </Field>
                </div>
                <Field label="FDA/510(k) Number">
                    <input
                        type="text"
                        value={state.fdaNumber}
                        onChange={(e) => setField("fdaNumber", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm text-black"
                        placeholder="K200873"
                    />
                </Field>
                <Field label="DOI Reference (URL)">
                    <input
                        type="text"
                        value={state.doi}
                        onChange={(e) => setField("doi", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm text-black"
                        placeholder="https://doi.org/..."
                    />
                </Field>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-sm border-b pb-2">Quick Facts (Sidebar)</h3>
                <Field label="Developer (Name + Country)">
                    <input
                        type="text"
                        value={state.developer}
                        onChange={(e) => setField("developer", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm text-black"
                    />
                </Field>
                <Field label="Privacy Type">
                    <select
                        value={state.privacyType}
                        onChange={(e) => setField("privacyType", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm text-black"
                    >
                        <option value="">Select...</option>
                        <option value="Cloud">Cloud</option>
                        <option value="On-Premise">On-Premise</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </Field>
                <Field label="Integration">
                    <input
                        type="text"
                        value={state.integration}
                        onChange={(e) => setField("integration", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm text-black"
                        placeholder="PACS, EPD..."
                    />
                </Field>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-sm border-b pb-2">Links</h3>
                <Field label="Demo URL">
                    <input
                        type="text"
                        value={state.demoUrl}
                        onChange={(e) => setField("demoUrl", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm text-black"
                    />
                </Field>
                <Field label="Vendor URL">
                    <input
                        type="text"
                        value={state.vendorUrl}
                        onChange={(e) => setField("vendorUrl", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm text-black"
                    />
                </Field>
                <Field label="Citation Text">
                    <input
                        type="text"
                        value={state.citation}
                        onChange={(e) => setField("citation", e.target.value)}
                        className="w-full p-2 border rounded-lg text-sm text-black"
                        placeholder="Author et al. (Year)..."
                    />
                </Field>
            </div>
        </>
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
