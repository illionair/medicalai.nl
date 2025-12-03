"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const authors = [
    {
        name: "Drs. S.S. Mahes",
        role: "Hoofdauteur & Oprichter",
        bio: "Arts en AI-onderzoeker (PhD) met een passie voor het slaan van bruggen tussen technologie en de klinische praktijk.",
        initials: "SM"
    }
];

export default function AuthorsPage() {
    return (
        <div className="container section-padding min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                <h1 className="text-4xl font-bold tracking-tight mb-4">Onze Auteurs</h1>
                <p className="text-gray-500 text-lg mb-12">
                    Maak kennis met de experts achter Medical AI.
                </p>

                <div className="grid gap-8 mb-16">
                    {authors.map((author) => (
                        <div key={author.name} className="flex items-start gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                            <div className="w-16 h-16 rounded-full bg-brand-secondary text-white flex items-center justify-center text-xl font-bold shrink-0">
                                {author.initials}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{author.name}</h3>
                                <p className="text-brand-secondary text-sm font-medium mb-3">{author.role}</p>
                                <p className="text-gray-600 leading-relaxed">
                                    {author.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call for Authors */}
                <div className="bg-brand-primary/5 rounded-3xl p-8 border border-brand-primary/10 text-center">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">Word Mede-auteur</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Wij zijn actief op zoek naar medische professionals en onderzoekers die hun kennis willen delen met de community. Heb jij expertise op het gebied van Medical AI?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary text-white rounded-xl font-bold hover:bg-brand-primary transition-colors shadow-lg shadow-brand-secondary/20"
                    >
                        Neem contact op <ArrowRight size={18} />
                    </Link>
                </div>

            </motion.div>
        </div>
    );
}
