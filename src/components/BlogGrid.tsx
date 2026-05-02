"use client";

import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Filter } from "lucide-react";
import { useState } from "react";

interface BlogGridProps {
    blogs: Array<{
        id: string;
        title: string;
        summary?: string | null;
        category: string;
        createdAt: Date | string;
        specialism?: string | null;
        ceStatus?: string | null;
        cost?: string | null;
    }>;
}

export default function BlogGrid({ blogs }: BlogGridProps) {
    const { t } = useLanguage();
    const [specialism, setSpecialism] = useState("");
    const [ceStatus, setCeStatus] = useState("");
    const [cost, setCost] = useState("");

    const uniqueValues = (key: "specialism" | "ceStatus" | "cost") =>
        Array.from(new Set(blogs.map((blog) => blog[key]).filter(Boolean) as string[])).sort();

    const filteredBlogs = blogs.filter((blog) => {
        if (specialism && blog.specialism !== specialism) return false;
        if (ceStatus && blog.ceStatus !== ceStatus) return false;
        if (cost && blog.cost !== cost) return false;
        return true;
    });

    const hasFilters = blogs.some((blog) => blog.specialism || blog.ceStatus || blog.cost);

    return (
        <section id="latest" className="container section-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
            >
                <h2 className="mb-4">{t.blog.latest_research}</h2>
                <p className="text-lg max-w-2xl" style={{ color: "var(--gray-300)" }}>
                    {t.blog.latest_desc}
                </p>
            </motion.div>

            {hasFilters && (
                <div className="mb-10 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <Filter size={16} className="text-brand-secondary" />
                            Filter publicaties
                        </div>
                        <p className="text-xs font-medium text-slate-500">
                            {filteredBlogs.length} van {blogs.length} zichtbaar
                        </p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                        <select
                            value={specialism}
                            onChange={(event) => setSpecialism(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-secondary"
                        >
                            <option value="">Alle specialismen</option>
                            {uniqueValues("specialism").map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                        <select
                            value={ceStatus}
                            onChange={(event) => setCeStatus(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-secondary"
                        >
                            <option value="">Alle CE-statussen</option>
                            {uniqueValues("ceStatus").map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                        <select
                            value={cost}
                            onChange={(event) => setCost(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-secondary"
                        >
                            <option value="">Alle kosten</option>
                            {uniqueValues("cost").map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <BlogCard
                            id={blog.id}
                            title={blog.title}
                            summary={blog.summary || ""}
                            category={blog.category}
                            date={typeof blog.createdAt === "string" ? blog.createdAt : blog.createdAt.toISOString()}
                            specialism={blog.specialism}
                            ceStatus={blog.ceStatus}
                            cost={blog.cost}
                        />
                    </motion.div>
                ))}
            </div>

            {filteredBlogs.length === 0 && (
                <div className="text-center py-20 rounded-3xl bg-gray-50 border border-gray-100">
                    <p className="text-gray-400">{t.blog.no_blogs}</p>
                </div>
            )}
        </section>
    );
}
