"use client";

import { motion } from "framer-motion";

import InteractiveGrid from "./InteractiveGrid";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Interactive Background */}
            <InteractiveGrid />

            {/* Content Overlay */}
            <div className="relative z-10 container section-padding flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-6 border border-white/20 backdrop-blur-md">
                        Medical Intelligence
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6 max-w-4xl mx-auto text-white font-bold tracking-tight"
                    style={{ fontSize: "clamp(48px, 6vw, 80px)", letterSpacing: "-0.03em", textShadow: "0 0 40px rgba(59, 130, 246, 0.5)" }}
                >
                    The Future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Medical AI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl max-w-2xl mx-auto mb-10 text-gray-300"
                >
                    Curated research, ethical analysis, and clinical applications. <br className="hidden md:block" />
                    Bridging the gap between algorithms and patient care.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <a
                        href="#latest"
                        className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Read Latest
                    </a>
                    <a
                        href="/about"
                        className="px-8 py-4 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
                    >
                        About Us
                    </a>
                    <a
                        href="/contact"
                        className="px-8 py-4 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
                    >
                        Contact
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
