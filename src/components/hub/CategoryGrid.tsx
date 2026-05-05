import Link from "next/link";

type CategoryMeta = {
    name: string;
    description: string;
    icon: string;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
    Predictie: {
        name: "Predictie",
        description: "Risicostratificatie en voorspelmodellen.",
        icon: "query_stats",
    },
    Diagnostiek: {
        name: "Diagnostiek",
        description: "AI voor detectie en diagnose.",
        icon: "biotech",
    },
    Methodisch: {
        name: "Methodisch",
        description: "Validatie, modelontwikkeling en implementatie.",
        icon: "school",
    },
    Ethiek: {
        name: "Ethiek",
        description: "Bias, fairness en verantwoorde AI.",
        icon: "balance",
    },
};

const CATEGORY_ORDER = ["Predictie", "Diagnostiek", "Methodisch", "Ethiek"] as const;

export type CategoryGridProps = {
    counts?: Partial<Record<string, number>>;
    categories?: Array<{ category: string; count: number }>;
};

function MS({ name, className = "" }: { name: string; className?: string }) {
    return <span className={"material-symbols-outlined " + className}>{name}</span>;
}

function CategoryTile({ meta, count }: { meta: CategoryMeta; count: number }) {
    return (
        <Link
            href={`/topics/${encodeURIComponent(meta.name)}`}
            className="group flex min-h-16 items-center gap-3 p-3 rounded-2xl bg-white/55 hover:bg-white border border-white/60 hover:border-white transition-all"
        >
            <div className="w-10 h-10 rounded-xl bg-[#EEF6FB] flex items-center justify-center text-[#007EA7] shrink-0 group-hover:bg-[#003459] group-hover:text-white transition-colors">
                <MS name={meta.icon} className="!text-[20px]" />
            </div>
            <div className="min-w-0 flex-1">
                <h4 className="text-[14px] font-semibold text-on-surface leading-tight truncate">{meta.name}</h4>
                <span className="text-[12px] text-outline">{count} {count === 1 ? "artikel" : "artikelen"}</span>
            </div>
            <MS name="arrow_forward" className="!text-[16px] text-outline group-hover:text-[#003459] transition-colors" />
        </Link>
    );
}

export default function CategoryGrid({ categories = [] }: CategoryGridProps = {}) {
    const countsByName = new Map(categories.map((c) => [c.category, c.count]));

    return (
        <div className="glass-panel rounded-[24px] p-5 sm:p-7 md:p-10 flex flex-col ambient-shadow">
            <div className="flex justify-between items-end gap-4 mb-6">
                <div>
                    <h2 className="headline-md text-on-surface">Verken op categorie</h2>
                    <p className="text-[13.5px] text-on-surface-variant mt-1">Vind onderzoek dat aansluit op jouw vraag.</p>
                </div>
                <Link href="/topics" className="label-sm brand-accent hover:text-[#003459] transition-colors shrink-0 min-h-11 flex items-center">
                    Alle topics
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-2 flex-grow sm:grid-cols-2">
                {CATEGORY_ORDER.map((name) => (
                    <CategoryTile key={name} meta={CATEGORY_META[name]} count={countsByName.get(name) ?? 0} />
                ))}
            </div>
        </div>
    );
}
