"use client";

import { FlaskConical, Scale, Stethoscope, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Category = "Predictie" | "Diagnostiek" | "Methodisch" | "Ethiek";

type CategoryGridProps = {
    counts?: Partial<Record<Category | string, number>>;
    categories?: Array<{ category: string; count: number }>;
};

type HubCopy = {
    topics_title?: string;
    categories_title?: string;
    articles_count?: (count: number) => string;
};

const categories: Array<{
    name: Category;
    icon: ComponentType<{ size?: number; className?: string }>;
    className: string;
}> = [
    {
        name: "Predictie",
        icon: TrendingUp,
        className: "bg-sky-50 text-sky-700 border-sky-100",
    },
    {
        name: "Diagnostiek",
        icon: Stethoscope,
        className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
        name: "Methodisch",
        icon: FlaskConical,
        className: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
        name: "Ethiek",
        icon: Scale,
        className: "bg-rose-50 text-rose-700 border-rose-100",
    },
];

function getHubCopy(languageT: unknown) {
    const hub = (languageT as { hub?: HubCopy }).hub;

    return {
        topics_title: hub?.topics_title ?? hub?.categories_title ?? "Onderwerpen",
        articles_count: hub?.articles_count ?? ((count: number) => `${count} artikelen`),
    };
}

function normalizeCounts(counts?: CategoryGridProps["counts"], categoriesProp?: CategoryGridProps["categories"]) {
    if (counts) return counts;

    return Object.fromEntries(
        (categoriesProp ?? []).map((item) => [item.category, item.count])
    );
}

export default function CategoryGrid({ counts, categories: categoriesProp }: CategoryGridProps) {
    const { t } = useLanguage();
    const copy = getHubCopy(t);
    const countByCategory = normalizeCounts(counts, categoriesProp);

    return (
        <section className="glass-panel ambient-shadow rounded-3xl p-7">
            <h2 className="mb-6 text-2xl font-bold text-brand-dark">{copy.topics_title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const count = countByCategory[category.name] ?? 0;

                    return (
                        <Link
                            key={category.name}
                            href={`/topics/${encodeURIComponent(category.name)}`}
                            className={`group flex min-h-[150px] items-end justify-between gap-4 rounded-3xl border p-6 transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary ${category.className}`}
                        >
                            <div>
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                                    <Icon size={24} />
                                </div>
                                <h3 className="mb-1 text-xl font-bold text-slate-950">{category.name}</h3>
                                <p className="text-sm font-semibold opacity-75">{copy.articles_count(count)}</p>
                            </div>
                            <span aria-hidden="true" className="text-2xl font-bold opacity-25 transition-opacity group-hover:opacity-60">
                                {count}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
