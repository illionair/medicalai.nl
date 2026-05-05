"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, UserCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

const ITEMS = [
    { key: "/", label: "Educational Hub" },
    { key: "/topics", label: "AI Directory" },
    { key: "/guidelines", label: "Guidelines" },
    { key: "/authors", label: "Community" },
    { key: "/about", label: "Mission" },
];

function MS({ name, className = "" }: { name: string; className?: string }) {
    return <span className={"material-symbols-outlined " + className}>{name}</span>;
}

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (pathname === "/access") return null;

    return (
        <header className="fixed top-0 inset-x-0 z-50 glass-panel-strong border-b border-white/40 ambient-shadow">
            <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 h-16 w-full max-w-[1480px] mx-auto">
                <Link href="/" aria-label="Medical AI home" className="flex min-h-11 items-center gap-2.5">
                    <Image
                        src="/images/logo-medical-ai.png"
                        alt=""
                        width={32}
                        height={32}
                        priority
                        className="h-8 w-8 object-contain"
                    />
                    <span className="text-[18px] font-semibold tracking-tight text-on-surface">
                        Medical<span className="brand-accent">·</span><span className="brand-ai-gradient">AI</span>
                    </span>
                </Link>

                <nav className="hidden md:flex gap-1 items-center">
                    {ITEMS.map((i) => {
                        const active = pathname === i.key || (i.key !== "/" && pathname.startsWith(`${i.key}/`));
                        return (
                            <Link
                                key={i.key}
                                href={i.key}
                                className={
                                    "text-[13.5px] font-medium px-3 py-1.5 rounded-full transition-colors " +
                                    (active
                                        ? "bg-white/80 text-on-surface"
                                        : "text-on-surface-variant hover:text-on-surface hover:bg-white/40")
                                }
                            >
                                {i.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden lg:flex items-center relative">
                    <MS name="search" className="absolute left-3 text-outline !text-[20px] pointer-events-none" />
                    <input
                        className="bg-white/60 border border-white/70 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#007EA7]/20 focus:border-[#007EA7]/40 w-56 transition-all placeholder:text-outline"
                        placeholder="Zoeken..."
                        type="text"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/login"
                        aria-label="Account"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#007EA7] transition-colors hover:bg-white/60 hover:text-[#003459]"
                    >
                        <UserCircle size={28} strokeWidth={2.4} />
                    </Link>
                    <button
                        type="button"
                        aria-label={open ? "Menu sluiten" : "Menu openen"}
                        aria-expanded={open}
                        onClick={() => setOpen((value) => !value)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#007EA7] transition-colors hover:bg-white/60 hover:text-[#003459] md:hidden"
                    >
                        {open ? <X size={28} strokeWidth={2.4} /> : <Menu size={28} strokeWidth={2.4} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 top-16 z-40 bg-[#0B1F2A]/25 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
                    <div
                        className="ml-auto flex h-[calc(100dvh-4rem)] w-full max-w-sm flex-col gap-6 overflow-y-auto border-l border-white/70 bg-white/95 p-5 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="relative">
                            <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                            <input
                                className="h-12 w-full rounded-2xl border border-[#E6E6E0] bg-white pl-12 pr-4 text-[15px] text-on-surface outline-none transition focus:border-[#007EA7] focus:ring-2 focus:ring-[#007EA7]/15 placeholder:text-outline"
                                placeholder="Zoeken..."
                                type="text"
                            />
                        </div>

                        <nav className="flex flex-col gap-2" aria-label="Mobiele navigatie">
                            {ITEMS.map((i) => {
                                const active = pathname === i.key || (i.key !== "/" && pathname.startsWith(`${i.key}/`));
                                return (
                                    <Link
                                        key={i.key}
                                        href={i.key}
                                        onClick={() => setOpen(false)}
                                        className={
                                            "flex min-h-12 items-center justify-between rounded-2xl px-4 text-[16px] font-semibold transition-colors " +
                                            (active
                                                ? "bg-[#EEF6FB] text-[#003459]"
                                                : "text-on-surface hover:bg-[#F5F5F2]")
                                        }
                                    >
                                        {i.label}
                                        <MS name="arrow_forward" className="!text-[18px] text-[#007EA7]" />
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-auto rounded-2xl border border-[#E6E6E0] bg-[#FAFAF8] p-4">
                            <p className="text-[13.5px] leading-6 text-on-surface-variant">
                                Onafhankelijk kennisplatform voor verantwoorde AI in de zorg.
                            </p>
                            <Link
                                href="/login"
                                onClick={() => setOpen(false)}
                                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#003459] px-4 text-sm font-bold text-white transition-colors hover:bg-[#00171F]"
                            >
                                <UserCircle size={18} />
                                Account
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
