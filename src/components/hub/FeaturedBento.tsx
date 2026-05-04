import Link from "next/link";
import type { BlogPostSource } from "@prisma/client";

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

type FeaturedBentoProps = {
    blogs: FeaturedHubArticle[];
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80&auto=format";

function MS({ name, className = "" }: { name: string; className?: string }) {
    return <span className={"material-symbols-outlined " + className}>{name}</span>;
}

function CategoryPill({ children, size = "md" }: { children: React.ReactNode; size?: "sm" | "md" }) {
    const cls =
        size === "sm"
            ? "text-[11px] px-2.5 py-1"
            : "label-sm px-3.5 py-1.5";
    return (
        <span className={"inline-flex items-center rounded-full bg-white/85 backdrop-blur-md text-on-surface border border-white/60 shadow-sm " + cls}>
            {children}
        </span>
    );
}

function readTime(text?: string | null) {
    const wc = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(2, Math.round(wc / 200));
    return `${minutes} min`;
}

function authorOf(b: FeaturedHubArticle) {
    return b.developer?.trim() || "Redactie";
}

function summaryOf(b: FeaturedHubArticle) {
    return b.summary?.trim() || b.subtitle?.trim() || "";
}

function imageOf(b: FeaturedHubArticle) {
    return b.coverImage || b.imageUrl || FALLBACK_IMG;
}

export default function FeaturedBento({ blogs }: FeaturedBentoProps) {
    if (blogs.length === 0) {
        return (
            <section className="flex flex-col gap-6">
                <div className="flex justify-between items-end">
                    <h2 className="headline-lg text-on-surface">Nieuwste onderzoek</h2>
                    <Link href="/topics" className="label-sm brand-accent hover:text-[#003459] transition-colors flex items-center gap-1.5">
                        Bekijk Directory <MS name="arrow_forward" className="!text-[16px]" />
                    </Link>
                </div>
                <div className="glass-panel ambient-shadow rounded-[24px] p-10 text-center">
                    <p className="body-md text-on-surface-variant">Nog geen artikelen gepubliceerd.</p>
                </div>
            </section>
        );
    }

    const [main, ...rest] = blogs;
    const sideBlogs = rest.slice(0, 2);

    return (
        <section className="flex flex-col gap-6">
            <div className="flex justify-between items-end">
                <h2 className="headline-lg text-on-surface">Nieuwste onderzoek</h2>
                <Link href="/topics" className="label-sm brand-accent hover:text-[#003459] transition-colors flex items-center gap-1.5">
                    Bekijk Directory <MS name="arrow_forward" className="!text-[16px]" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <Link
                    href={`/blog/${main.id}`}
                    className="md:col-span-8 group glass-panel rounded-[24px] overflow-hidden ambient-shadow flex flex-col relative transition-transform duration-500 ease-out hover:-translate-y-0.5"
                >
                    <div className="h-72 overflow-hidden relative">
                        <img alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" src={imageOf(main)} />
                        <div className="absolute top-5 left-5 z-10">
                            <CategoryPill>{main.category}</CategoryPill>
                        </div>
                    </div>
                    <div className="p-7 md:p-8 flex-grow flex flex-col justify-between bg-white/70">
                        <div>
                            <h3 className="headline-md text-on-surface mb-2 group-hover:text-[#007EA7] transition-colors">{main.title}</h3>
                            <p className="body-md text-on-surface-variant line-clamp-2">{summaryOf(main)}</p>
                        </div>
                        <div className="mt-5 flex items-center gap-3 text-outline label-sm">
                            <span>{authorOf(main)}</span>
                            <span>·</span>
                            <span>{readTime(summaryOf(main))} leestijd</span>
                        </div>
                    </div>
                </Link>

                <div className="md:col-span-4 flex flex-col gap-6">
                    {sideBlogs.map((p) => (
                        <Link
                            key={p.id}
                            href={`/blog/${p.id}`}
                            className="group glass-panel rounded-[20px] overflow-hidden ambient-shadow flex-1 flex flex-col relative transition-transform duration-500 ease-out hover:-translate-y-0.5"
                        >
                            <div className="h-28 overflow-hidden relative">
                                <img alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" src={imageOf(p)} />
                                <div className="absolute top-3 left-3 z-10">
                                    <CategoryPill size="sm">{p.category}</CategoryPill>
                                </div>
                            </div>
                            <div className="p-5 flex-grow flex flex-col justify-between bg-white/70">
                                <h3 className="text-[16px] font-semibold text-on-surface leading-snug mb-1 group-hover:text-[#007EA7] transition-colors">{p.title}</h3>
                                <p className="text-[13.5px] text-on-surface-variant line-clamp-2">{summaryOf(p)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
