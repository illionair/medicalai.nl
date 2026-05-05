"use client";

import { useEffect, useMemo, useState } from "react";

type Heading = { id: string; text: string };

function extractHeadings(content: string): Heading[] {
    const headings: Heading[] = [];
    const lines = content.split("\n");
    for (const line of lines) {
        const match = line.match(/^##\s+(.+?)\s*$/);
        if (!match) continue;
        const text = match[1].trim();
        const id = text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        if (id) headings.push({ id, text });
    }
    return headings;
}

export default function ArticleTOC({ content }: { content: string }) {
    const headings = useMemo(() => extractHeadings(content), [content]);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (headings.length === 0) return;

        const elements = headings
            .map((h) => document.getElementById(h.id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav aria-label="In dit artikel" className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                In dit artikel
            </p>
            <ol className="space-y-2 text-sm">
                {headings.map((h) => (
                    <li key={h.id}>
                        <a
                            href={`#${h.id}`}
                            className={
                                "block border-l-2 pl-3 leading-snug transition-colors " +
                                (activeId === h.id
                                    ? "border-brand-primary text-brand-primary font-semibold"
                                    : "border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900")
                            }
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
