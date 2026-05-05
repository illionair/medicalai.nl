"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
    const { t } = useLanguage();
    const sections = t.privacy.sections as Array<{ heading: string; content: string }>;

    return (
        <div className="min-h-screen bg-white py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-[clamp(36px,10vw,48px)] font-bold text-brand-primary mb-4 leading-tight">{t.privacy.title}</h1>
                <p className="text-sm text-gray-500 mb-8">{t.privacy.last_updated}</p>

                <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                    {t.privacy.intro}
                </p>

                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-2xl font-bold text-brand-dark mb-4">{section.heading}</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
