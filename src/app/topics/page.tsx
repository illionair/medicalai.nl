"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, Shield, Stethoscope, Brain, Eye, Heart, Microscope, Baby, Syringe, Scale, FileText, BookOpen } from "lucide-react";

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

const specialisms = [
    "Cardiologie", "Radiologie", "Neurologie", "Oncologie",
    "Dermatologie", "Oogheelkunde", "Pathologie", "Huisartsgeneeskunde",
    "Psychiatrie", "Chirurgie", "Interne Geneeskunde", "Kindergeneeskunde",
    "Gynaecologie", "Urologie", "Orthopedie", "Intensive Care"
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
                    <div className="grid md:grid-cols-3 gap-6">
                        {clinicalTopics.map((topic, index) => (
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
                        {governanceTopics.map((topic, index) => (
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

                {/* Specialisms Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-700">
                            <Stethoscope size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-brand-dark">Medische Specialismen</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                        {specialisms.map((specialism, index) => (
                            <Link href={`/topics/${specialism}`} key={specialism}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="p-4 rounded-xl border border-gray-200 bg-white hover:border-brand-primary/30 hover:shadow-md transition-all flex items-center justify-between group"
                                >
                                    <span className="font-medium text-gray-700 group-hover:text-brand-primary transition-colors">
                                        {specialism}
                                    </span>
                                    <ArrowRight size={14} className="text-gray-300 group-hover:text-brand-primary transition-colors" />
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
