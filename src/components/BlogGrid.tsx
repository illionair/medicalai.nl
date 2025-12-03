"use client";

import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface BlogGridProps {
    blogs: any[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
    const { t } = useLanguage();

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
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
                            date={blog.createdAt.toISOString()}
                        />
                    </motion.div>
                ))}
            </div>

            {blogs.length === 0 && (
                <div className="text-center py-20 rounded-3xl bg-gray-50 border border-gray-100">
                    <p className="text-gray-400">{t.blog.no_blogs}</p>
                </div>
            )}
        </section>
    );
}
