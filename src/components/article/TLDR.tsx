import type { ReactNode } from "react";
import { Zap } from "lucide-react";

type TLDRProps = {
    children?: ReactNode;
};

export default function TLDR({ children }: TLDRProps) {
    return (
        <aside className="not-prose my-10 rounded-2xl border border-brand-primary/15 bg-gradient-to-br from-brand-primary/5 via-white to-brand-accent/5 p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary text-white">
                    <Zap size={14} />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
                    In 30 seconden
                </p>
            </div>
            <ul className="space-y-2 text-[15px] leading-7 text-slate-800 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-3 [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-brand-secondary">
                {children}
            </ul>
        </aside>
    );
}
