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
                whileHover={{ y: -5 }}
                className="relative h-[400px] w-[300px] rounded-3xl overflow-hidden group"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20" />
                    )}
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Glass Badge */}
                    <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white">
                        {category}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors">
                        {title}
                    </h3>

                    <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                        {summary}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-primary transition-colors">
                        Lees meer <ArrowRight size={16} />
                    </div>
                </div>

                {/* Glass Glow Effect */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-brand-primary/50 transition-all duration-500 pointer-events-none" />
            </motion.div>
        </Link>
    );
}
