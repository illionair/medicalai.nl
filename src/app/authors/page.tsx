"use client";

import { motion } from "framer-motion";

const authors = [
    {
        name: "Dr. S. Mahes",
        role: "Editor-in-Chief",
        bio: "Medical doctor and AI researcher with a passion for bridging technology and clinical practice.",
        initials: "SM"
    },
    {
        name: "Medical AI Team",
        role: "Editorial Board",
        bio: "A collective of researchers and clinicians curating the latest advancements in medical AI.",
        initials: "MA"
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
                <h1 className="text-4xl font-bold tracking-tight mb-12">Our Authors</h1>

                <div className="grid gap-8">
                    {authors.map((author) => (
                        <div key={author.name} className="flex items-start gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold shrink-0">
                                {author.initials}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">{author.name}</h3>
                                <p className="text-blue-600 text-sm font-medium mb-2">{author.role}</p>
                                <p className="text-gray-600 leading-relaxed">
                                    {author.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
