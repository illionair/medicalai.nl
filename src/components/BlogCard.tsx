"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
    id: string;
    title: string;
    summary: string;
    category: string;
    date: string;
}

export default function BlogCard({ id, title, summary, category, date }: BlogCardProps) {
    return (
        <Link href={`/blog/${id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full flex flex-col p-8 rounded-[32px] bg-white transition-shadow hover:shadow-2xl"
                style={{
                    backgroundColor: "var(--card-bg)",
                    boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)"
                }}
            >
                <div className="mb-6">
                    <span
                        className="inline-block py-1 px-3 rounded-full text-xs font-bold tracking-wider uppercase"
                        style={{
                            backgroundColor: "rgba(0, 113, 227, 0.08)",
                            color: "var(--accent)"
                        }}
                    >
                        {category}
                    </span>
                </div>

                <h3 className="text-2xl font-bold mb-4 leading-snug tracking-tight" style={{ color: "var(--foreground)" }}>
                    {title}
                </h3>

                <p className="text-base mb-6 line-clamp-3 flex-grow" style={{ color: "var(--gray-300)" }}>
                    {summary}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100" style={{ borderColor: "var(--card-border)" }}>
                    <span className="text-sm font-medium" style={{ color: "var(--gray-400)" }}>
                        {new Date(date).toLocaleDateString("nl-NL", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="text-sm font-semibold flex items-center gap-1" style={{ color: "var(--accent)" }}>
                        Read Article
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </motion.div>
        </Link>
    );
}
