type Difficulty = "basis" | "middel" | "diep";

const STYLES: Record<Difficulty, string> = {
    basis: "bg-emerald-50 text-emerald-700 border-emerald-200",
    middel: "bg-amber-50 text-amber-700 border-amber-200",
    diep: "bg-rose-50 text-rose-700 border-rose-200",
};

const LABELS: Record<Difficulty, string> = {
    basis: "Beginner",
    middel: "Intermediate",
    diep: "Expert",
};

export default function DifficultyBadge({ level }: { level?: string }) {
    if (!level || !(level in STYLES)) return null;
    const key = level as Difficulty;
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.1em] ${STYLES[key]}`}>
            {LABELS[key]}
        </span>
    );
}
