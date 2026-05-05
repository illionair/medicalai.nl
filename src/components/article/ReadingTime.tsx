import { Clock } from "lucide-react";

export default function ReadingTime({ minutes }: { minutes?: number }) {
    if (!minutes || minutes <= 0) return null;
    return (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <Clock size={14} />
            {minutes} min lezen
        </span>
    );
}
