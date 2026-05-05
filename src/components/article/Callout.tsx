import type { ReactNode } from "react";
import { AlertTriangle, Lightbulb, Sparkles, BookOpen } from "lucide-react";

type CalloutType = "case" | "warning" | "tip" | "key";

const VARIANTS: Record<
    CalloutType,
    { container: string; iconBg: string; iconColor: string; titleColor: string; icon: typeof AlertTriangle }
> = {
    case: {
        container: "border-sky-200 bg-sky-50/70",
        iconBg: "bg-sky-100",
        iconColor: "text-sky-700",
        titleColor: "text-sky-900",
        icon: BookOpen,
    },
    warning: {
        container: "border-amber-200 bg-amber-50/70",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-700",
        titleColor: "text-amber-900",
        icon: AlertTriangle,
    },
    tip: {
        container: "border-emerald-200 bg-emerald-50/70",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
        titleColor: "text-emerald-900",
        icon: Lightbulb,
    },
    key: {
        container: "border-indigo-200 bg-indigo-50/70",
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-700",
        titleColor: "text-indigo-900",
        icon: Sparkles,
    },
};

const TYPE_LABELS: Record<CalloutType, string> = {
    case: "Praktijkvoorbeeld",
    warning: "Let op",
    tip: "Tip",
    key: "Kernpunt",
};

type CalloutProps = {
    type?: string;
    title?: string;
    children?: ReactNode;
};

export default function Callout({ type, title, children }: CalloutProps) {
    const variant = VARIANTS[(type as CalloutType) in VARIANTS ? (type as CalloutType) : "key"];
    const Icon = variant.icon;
    const heading = title || TYPE_LABELS[(type as CalloutType) in VARIANTS ? (type as CalloutType) : "key"];

    return (
        <aside className={`not-prose my-8 rounded-2xl border p-5 sm:p-6 ${variant.container}`}>
            <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${variant.iconBg} ${variant.iconColor}`}>
                    <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                    <p className={`mb-2 text-sm font-bold uppercase tracking-[0.12em] ${variant.titleColor}`}>
                        {heading}
                    </p>
                    <div className="text-sm leading-7 text-slate-800 [&>p]:m-0 [&>p+p]:mt-3">
                        {children}
                    </div>
                </div>
            </div>
        </aside>
    );
}
