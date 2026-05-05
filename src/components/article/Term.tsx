"use client";

import { useId, useState, type ReactNode } from "react";

type TermProps = {
    def?: string;
    children?: ReactNode;
};

export default function Term({ def, children }: TermProps) {
    const [open, setOpen] = useState(false);
    const id = useId();

    if (!def) {
        return <span>{children}</span>;
    }

    return (
        <span className="relative inline-block">
            <button
                type="button"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpen((v) => !v)}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className="cursor-help border-b border-dotted border-brand-secondary text-brand-primary underline-offset-4 hover:text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 rounded-sm"
            >
                {children}
            </button>
            {open && (
                <span
                    id={id}
                    role="tooltip"
                    className="absolute left-1/2 top-full z-30 mt-2 w-72 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-700 shadow-xl"
                >
                    {def}
                </span>
            )}
        </span>
    );
}
