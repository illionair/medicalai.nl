"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
    id: string;
    title: string;
    summary: string;
    category: string;
    date: string;
    specialism?: string | null;
    ceStatus?: string | null;
    cost?: string | null;
}

export default function BlogCard({ id, title, summary, category, date, specialism, ceStatus, cost }: BlogCardProps) {
    return (
        <Link href={`/blog/${id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-full flex flex-col p-7 rounded-[32px] transition-shadow hover:shadow-2xl overflow-hidden group"
                style={{
                    backgroundColor: "transparent", // Reset base bg
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)'
                }}
            >
                {/* Background Gradient - Match GuidelineCard */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />

                {/* The Glass Layer */}
                <div
                    className="absolute inset-0 rounded-[32px]"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), 0 20px 40px -10px rgba(0, 0, 0, 0.15)'
                    }}
                />

                {/* Content Container - Relative z-10 to sit above glass */}
                <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-[18px]">
                        <span
                            className="inline-block py-[5px] px-3 rounded-full text-[11px] font-bold tracking-[0.08em] uppercase"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255, 255, 255, 0.6)',
                                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), 0 4px 12px 0 rgba(0, 0, 0, 0.08)',
                                color: "var(--accent)"
                            }}
                        >
                            {category}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold mb-[10px] leading-[1.25] tracking-[-0.01em] group-hover:text-brand-primary transition-colors text-slate-800">
                        {title}
                    </h3>

                    <p className="text-sm mb-6 line-clamp-3 flex-grow text-slate-600 leading-[1.55]">
                        {summary}
                    </p>

                    {(specialism || ceStatus || cost) && (
                        <div className="mb-[14px] flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-600">
                            {specialism && <span className="rounded-full bg-white/60 px-3 py-1">{specialism}</span>}
                            {ceStatus && <span className="rounded-full bg-emerald-50/80 px-3 py-1 text-emerald-700">{ceStatus}</span>}
                            {cost && <span className="rounded-full bg-white/60 px-3 py-1">{cost}</span>}
                        </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-[14px] border-t border-black/[0.06]">
                        <span className="text-xs font-medium text-slate-500">
                            {new Date(date).toLocaleDateString("nl-NL", { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="text-xs font-bold flex items-center gap-1 text-brand-primary">
                            Lees artikel
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link >
    );
}
