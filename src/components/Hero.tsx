"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hand-robot.png"
                    alt="Medical AI Future"
                    className="w-full h-full object-cover object-center"
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/90"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 container section-padding flex flex-col items-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6 max-w-4xl mx-auto text-slate-900 font-bold tracking-tight px-4"
                    style={{ fontSize: "clamp(36px, 6vw, 80px)", letterSpacing: "-0.03em" }}
                >
                    {t.hero.title_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t.hero.title_highlight}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl max-w-2xl mx-auto mb-10 text-slate-600 font-medium"
                >
                    {t.hero.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <a
                        href="#latest"
                        className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                        {t.hero.read_latest}
                    </a>
                    <a
                        href="/about"
                        className="px-8 py-4 rounded-full bg-white/60 text-slate-700 font-medium hover:bg-white/80 transition-colors backdrop-blur-md border border-white/40 shadow-sm"
                    >
                        {t.hero.about_us}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
