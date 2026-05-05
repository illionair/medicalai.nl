"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, Shield, Brain, Microscope, Scale, FileText, BookOpen } from "lucide-react";

const clinicalTopics = [
    {
        title: "Diagnostiek",
        description: "AI-modellen voor detectie en diagnose.",
        icon: <Activity size={24} />,
        color: "bg-blue-50 text-blue-700 border-blue-100",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "Predictie",
        description: "Risicostratificatie en voorspelling.",
        icon: <Brain size={24} />,
        color: "bg-purple-50 text-purple-700 border-purple-100",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        title: "Prognostiek",
        description: "Verloop van ziekte en behandeling.",
        icon: <Microscope size={24} />,
        color: "bg-emerald-50 text-emerald-700 border-emerald-100",
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        title: "Methodisch",
        description: "Uitleg over modellen, validatie en interpretatie.",
        icon: <BookOpen size={24} />,
        color: "bg-sky-50 text-sky-700 border-sky-100",
        gradient: "from-sky-500 to-blue-500"
    },
];

const governanceTopics = [
    {
        title: "Ethiek",
        description: "Morele vraagstukken en bias.",
        icon: <Scale size={24} />,
        color: "bg-orange-50 text-orange-700 border-orange-100",
    },
    {
        title: "AI-regelgeving",
        description: "EU AI Act en regelgeving.",
        icon: <Shield size={24} />,
        color: "bg-red-50 text-red-700 border-red-100",
    },
    {
        title: "Richtlijnen",
        description: "Implementatie en standaarden.",
        icon: <FileText size={24} />,
        color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
];

export default function TopicsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-brand-dark mb-4"
                    >
                        Ontdek Medical AI
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-500 max-w-2xl mx-auto"
                    >
                        Verken de toekomst van de zorg via onze gecategoriseerde topics.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 }}
                        className="mt-8 flex justify-center"
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-secondary"
                        >
                            <BookOpen size={17} />
                            Alle artikelen
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-20 pb-64">

                {/* Clinical AI Section */}
                <section className="mt-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                            <Activity size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-brand-dark">Klinische AI & Methodologie</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {clinicalTopics.map((topic) => (
                            <Link href={`/topics/${topic.title}`} key={topic.title}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className={`p-6 rounded-2xl border ${topic.color} h-full transition-all hover:shadow-lg bg-opacity-50`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white shadow-sm text-current`}>
                                        {topic.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                                        {topic.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {topic.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-bold opacity-80">
                                        Bekijk artikelen <ArrowRight size={16} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Governance Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-brand-secondary/10 rounded-lg text-brand-secondary">
                            <Shield size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-brand-dark">Governance, Ethiek & Wetgeving</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {governanceTopics.map((topic) => (
                            <Link href={`/topics/${topic.title}`} key={topic.title}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className={`p-6 rounded-2xl border ${topic.color} h-full transition-all hover:shadow-lg bg-opacity-50`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white shadow-sm text-current`}>
                                        {topic.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                                        {topic.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {topic.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-bold opacity-80">
                                        Bekijk artikelen <ArrowRight size={16} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Spacer to ensure footer separation */}
                <div className="h-40"></div>

            </div>
        </div>
    );
}
