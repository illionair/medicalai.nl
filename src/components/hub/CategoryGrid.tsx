import Link from "next/link";

const SPECIALISMEN = [
    { name: "Radiologie", icon: "radiology", count: 12 },
    { name: "Cardiologie", icon: "cardiology", count: 9 },
    { name: "Oncologie", icon: "oncology", count: 7 },
    { name: "Neurologie", icon: "neurology", count: 6 },
    { name: "Dermatologie", icon: "dermatology", count: 5 },
    { name: "Pathologie", icon: "biotech", count: 4 },
    { name: "Oogheelkunde", icon: "visibility", count: 3 },
    { name: "Huisartsgenees.", icon: "stethoscope", count: 3 },
] as const;

export type CategoryGridProps = {
    counts?: Partial<Record<string, number>>;
    categories?: Array<{ category: string; count: number }>;
};

function MS({ name, className = "" }: { name: string; className?: string }) {
    return <span className={"material-symbols-outlined " + className}>{name}</span>;
}

function SpecialismTile({ s }: { s: (typeof SPECIALISMEN)[number] }) {
    return (
        <Link
            href={`/topics/${encodeURIComponent(s.name)}`}
            className="group flex items-center gap-3 p-3 rounded-2xl bg-white/55 hover:bg-white border border-white/60 hover:border-white transition-all"
        >
            <div className="w-10 h-10 rounded-xl bg-[#EEF6FB] flex items-center justify-center text-[#007EA7] shrink-0 group-hover:bg-[#003459] group-hover:text-white transition-colors">
                <MS name={s.icon} className="!text-[20px]" />
            </div>
            <div className="min-w-0 flex-1">
                <h4 className="text-[14px] font-semibold text-on-surface leading-tight truncate">{s.name}</h4>
                <span className="text-[12px] text-outline">{s.count} artikelen</span>
            </div>
            <MS name="arrow_forward" className="!text-[16px] text-outline group-hover:text-[#003459] transition-colors" />
        </Link>
    );
}

export default function CategoryGrid(_: CategoryGridProps = {}) {
    return (
        <div className="glass-panel rounded-[24px] p-9 md:p-10 flex flex-col ambient-shadow">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="headline-md text-on-surface">Verken op specialisme</h2>
                    <p className="text-[13.5px] text-on-surface-variant mt-1">Vind onderzoek dat raakt aan jouw vakgebied.</p>
                </div>
                <Link href="/topics" className="label-sm brand-accent hover:text-[#003459] transition-colors shrink-0">
                    Alle topics
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-grow">
                {SPECIALISMEN.map((s) => (
                    <SpecialismTile key={s.name} s={s} />
                ))}
            </div>
        </div>
    );
}
