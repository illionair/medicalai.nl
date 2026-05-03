"use client";

import type { BlogPostSource } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export type FeaturedHubArticle = {
    id: string;
    title: string;
    subtitle?: string | null;
    summary?: string | null;
    category: string;
    imageUrl?: string | null;
    coverImage?: string | null;
    createdAt: string;
    source: BlogPostSource;
    developer?: string | null;
};

type HubCopy = {
    latest_research?: string;
    view_all?: string;
    featured_title?: string;
    no_blogs?: string;
    no_articles?: string;
};

type FeaturedBentoProps = {
    blogs: FeaturedHubArticle[];
};

const categoryGradients: Record<string, string> = {
    Predictie: "from-indigo-500 via-sky-400 to-cyan-300",
    Diagnostiek: "from-emerald-500 via-teal-400 to-sky-300",
    Methodisch: "from-amber-400 via-orange-400 to-rose-400",
    Ethiek: "from-slate-700 via-slate-500 to-stone-300",
};

function fallbackGradient(category: string) {
    return categoryGradients[category] ?? "from-brand-primary via-brand-secondary to-brand-accent";
}

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function sourceLabel(source: FeaturedHubArticle["source"]) {
    return {
        PUBMED: "PubMed",
        MANUAL: "Redactie",
        AI_PROMPT: "AI prompt",
    }[source] ?? source;
}

function getNoBlogsCopy(languageT: unknown) {
    const typed = languageT as { hub?: HubCopy; blog?: { no_blogs?: string } };
    return typed.hub?.no_articles ?? typed.hub?.no_blogs ?? typed.blog?.no_blogs ?? "Nog geen blogs gepubliceerd.";
}

function getHubCopy(languageT: unknown) {
    const hub = (languageT as { hub?: HubCopy }).hub;

    return {
        latest_research: hub?.latest_research ?? hub?.featured_title ?? "Laatste Research",
        view_all: hub?.view_all ?? "Bekijk archief",
    };
}

function BlogVisual({ blog, eager = false }: { blog: FeaturedHubArticle; eager?: boolean }) {
    const image = blog.coverImage ?? blog.imageUrl;

    if (image) {
        return (
            <img
                src={image}
                alt={blog.title}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
        );
    }

    return <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient(blog.category)}`} aria-hidden="true" />;
}

function FeaturedTile({ blog, large = false }: { blog: FeaturedHubArticle; large?: boolean }) {
    const description = blog.summary ?? blog.subtitle ?? "";
    const facts = [formatDate(blog.createdAt), sourceLabel(blog.source), blog.developer].filter(Boolean);

    return (
        <Link href={`/blog/${blog.id}`} className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary">
            <motion.article
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={`group relative h-full min-h-[260px] overflow-hidden rounded-[28px] border border-white/60 bg-slate-100 shadow-xl shadow-slate-900/10 ${large ? "md:min-h-[540px]" : ""}`}
            >
                <BlogVisual blog={blog} eager={large} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-white/5" aria-hidden="true" />
                <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-7">
                    <span className="mb-4 w-fit rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-primary backdrop-blur-md">
                        {blog.category}
                    </span>
                    <h3 className={`${large ? "line-clamp-3 text-3xl sm:text-4xl" : "line-clamp-2 text-xl"} mb-3 break-words font-bold leading-tight text-white`}>
                        {blog.title}
                    </h3>
                    {description && (
                        <p className={`${large ? "line-clamp-3" : "line-clamp-2"} text-sm font-medium leading-6 text-white/80`}>
                            {description}
                        </p>
                    )}
                    {large && facts.length > 0 && (
                        <div className="mt-5 hidden flex-wrap gap-2 border-t border-white/20 pt-4 sm:flex">
                            {facts.map((fact) => (
                                <span key={fact} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
                                    {fact}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </motion.article>
        </Link>
    );
}

export default function FeaturedBento({ blogs }: FeaturedBentoProps) {
    const { t } = useLanguage();
    const featuredBlogs = blogs.slice(0, 3);
    const copy = getHubCopy(t);

    if (featuredBlogs.length === 0) {
        return (
            <section className="flex flex-col gap-6">
                <div className="flex items-end justify-between gap-4">
                    <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">{copy.latest_research}</h2>
                    <Link href="/blog" className="text-sm font-bold text-brand-secondary transition-colors hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary">
                        {copy.view_all}
                    </Link>
                </div>
                <div className="rounded-3xl border border-white/70 bg-white/65 p-10 text-center shadow-xl shadow-slate-900/5 backdrop-blur-xl">
                    <p className="text-slate-500">{getNoBlogsCopy(t)}</p>
                </div>
            </section>
        );
    }

    const [largeBlog, ...smallBlogs] = featuredBlogs;

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-end justify-between gap-4">
                <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">{copy.latest_research}</h2>
                <Link href="/blog" className="text-sm font-bold text-brand-secondary transition-colors hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary">
                    {copy.view_all}
                </Link>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
                <FeaturedTile blog={largeBlog} large />
                {smallBlogs.length > 0 && (
                    <div className="grid gap-5">
                        {smallBlogs.map((blog) => (
                            <FeaturedTile key={blog.id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
