"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Scale, BookOpen } from "lucide-react";

export default function AboutPage() {
    const { t } = useLanguage();

    const icons = [Shield, Scale, BookOpen];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
                            {t.about.title}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                            {t.about.intro}
                        </p>
                    </motion.div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Mission & Questions */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <p className="text-lg text-slate-700 leading-relaxed mb-8">
                                {t.about.mission}
                            </p>
                            <ul className="space-y-4">
                                {t.about.questions.map((question: string, index: number) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3 text-slate-700"
                                    >
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                        <span className="font-medium">{question}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-16"
                    >
                        {t.about.principles_title}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {t.about.principles.map((principle: any, index: number) => {
                            const Icon = icons[index];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{principle.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {principle.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Goal */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto bg-blue-50 p-10 rounded-3xl border border-blue-100"
                    >
                        <p className="text-lg md:text-xl text-blue-900 font-medium leading-relaxed">
                            {t.about.goal}
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
