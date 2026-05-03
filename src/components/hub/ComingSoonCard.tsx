"use client";

import { GraduationCap, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type HubCopy = {
    coming_soon_label?: string;
    elearning_title?: string;
    elearning_body?: string;
    notify_me?: string;
    coming_soon_title?: string;
    coming_soon_description?: string;
};

function getHubCopy(languageT: unknown) {
    const hub = (languageT as { hub?: HubCopy }).hub;

    return {
        coming_soon_label: hub?.coming_soon_label ?? "Binnenkort",
        elearning_title: hub?.elearning_title ?? hub?.coming_soon_title ?? "E-learning voor zorgprofessionals",
        elearning_body: hub?.elearning_body ?? hub?.coming_soon_description ?? "Korte modules over AI-validatie, implementatie en verantwoord gebruik in de klinische praktijk.",
        notify_me: hub?.notify_me ?? "Houd mij op de hoogte",
    };
}

export default function ComingSoonCard() {
    const { t } = useLanguage();
    const copy = getHubCopy(t);

    return (
        <aside className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/80 bg-[linear-gradient(135deg,#f0f7ff_0%,#e6f0fa_100%)] p-7 shadow-xl shadow-slate-900/5">
            <div className="absolute right-5 top-5 text-brand-secondary/20">
                <Sparkles size={76} strokeWidth={1.5} />
            </div>
            <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-secondary shadow-sm">
                    <GraduationCap size={26} />
                </div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary">
                    {copy.coming_soon_label}
                </p>
                <h2 className="mb-3 text-2xl font-bold leading-tight text-brand-dark">
                    {copy.elearning_title}
                </h2>
                <p className="mb-7 text-sm leading-6 text-slate-600">
                    {copy.elearning_body}
                </p>
                <Link
                    href="/subscribe"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-secondary/20 transition-colors hover:bg-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
                >
                    {copy.notify_me}
                </Link>
            </div>
        </aside>
    );
}
