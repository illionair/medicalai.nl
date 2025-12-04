"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface GuidelineCardProps {
    title: string;
    summary: string;
    coverImage?: string;
    slug: string;
    category: string;
}

export default function GuidelineCard({ title, summary, coverImage, slug, category }: GuidelineCardProps) {
    return (
        <Link href={`/blog/${slug}`} className="block h-full">
            <motion.div
                whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.25)'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative h-[400px] w-[300px] rounded-3xl overflow-hidden group cursor-pointer"
                style={{
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)'
                }}
            >
                {/* Background Gradient - This is what the glass will blur */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />

                {/* The Glass Layer with inner highlight and shadow underneath */}
                <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), 0 20px 40px -10px rgba(0, 0, 0, 0.15)'
                    }}
                />

                {/* Inner Content Container */}
                <div className="relative z-10 h-full p-5 flex flex-col">
                    {/* Top Badge */}
                    <div
                        className="self-start px-4 py-1.5 rounded-full text-[11px] font-semibold text-gray-700"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), 0 4px 12px 0 rgba(0, 0, 0, 0.08)'
                        }}
                    >
                        {category}
                    </div>

                    {/* Image Container */}
                    <div className="flex-1 my-4 rounded-2xl overflow-hidden shadow-lg">
                        {coverImage ? (
                            <img
                                src={coverImage}
                                alt={title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30" />
                        )}
                    </div>

                    {/* Text Container */}
                    <div
                        className="p-4 rounded-xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), 0 4px 12px 0 rgba(0, 0, 0, 0.06)'
                        }}
                    >
                        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                            {title}
                        </h3>

                        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                            {summary}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary">
                            Lees meer <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
