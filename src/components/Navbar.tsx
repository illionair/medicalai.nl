"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
    { key: "/", label: "Educational Hub" },
    { key: "/blog", label: "Alle artikelen" },
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
    if (pathname === "/access") return null;

    return (
        <header className="fixed top-0 inset-x-0 z-50 glass-panel-strong border-b border-white/40 ambient-shadow">
            <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 h-16 w-full max-w-[1480px] mx-auto">
                <Link href="/" aria-label="Medical AI home" className="flex items-center gap-2.5">
                    <Image
                        src="/images/logo-medical-ai.png"
                        alt=""
                        width={32}
                        height={32}
                        priority
                        className="h-8 w-8 object-contain"
                    />
                    <span className="text-[18px] font-semibold tracking-tight text-on-surface">
                        Medical<span className="brand-accent">·</span>AI
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

                <div className="flex items-center gap-3">
                    <button aria-label="Notificaties" className="text-[#007EA7] hover:opacity-80 transition-opacity">
                        <MS name="notifications" />
                    </button>
                    <Link href="/login" aria-label="Account" className="text-[#007EA7] hover:opacity-80 transition-opacity">
                        <MS name="account_circle" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
