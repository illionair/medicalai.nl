import Image from "next/image";
import Link from "next/link";

function MS({ name, className = "" }: { name: string; className?: string }) {
    return <span className={"material-symbols-outlined " + className}>{name}</span>;
}

function LinkedInIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
    );
}

const LEGAL = [
    { label: "Privacy", href: "/privacy" },
    { label: "Voorwaarden", href: "/terms" },
    { label: "Klinische veiligheid", href: "/about" },
    { label: "Cookies", href: "/privacy" },
];

export default function Footer() {
    return (
        <footer className="w-full mt-16 border-t border-[#E6E6E0] bg-white/60 backdrop-blur-md">
            <div className="px-8 py-7 border-b border-[#E6E6E0]">
                <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/logo-medical-ai.png"
                            alt=""
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain"
                        />
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[16px] font-semibold text-on-surface tracking-tight">
                                Medical<span className="brand-accent">·</span>AI
                            </span>
                            <span className="text-[13px] text-on-surface-variant">
                                Onafhankelijk kennisplatform voor verantwoorde AI in de zorg.
                            </span>
                        </div>
                    </div>
                    <nav className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E6E0] hover:border-[#003459] hover:bg-[#FAFAF8] text-[13.5px] font-medium text-on-surface transition-colors"
                        >
                            <MS name="mail" className="!text-[18px] text-[#007EA7]" />
                            Contact
                        </Link>
                        <Link
                            href="/authors"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E6E0] hover:border-[#003459] hover:bg-[#FAFAF8] text-[13.5px] font-medium text-on-surface transition-colors"
                        >
                            <MS name="groups" className="!text-[18px] text-[#007EA7]" />
                            Auteurs
                        </Link>
                        <a
                            href="https://www.linkedin.com/company/110109298/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E6E0] hover:border-[#003459] hover:bg-[#FAFAF8] text-[13.5px] font-medium text-on-surface transition-colors"
                        >
                            <LinkedInIcon className="w-[15px] h-[15px] text-[#007EA7]" />
                            LinkedIn
                        </a>
                    </nav>
                </div>
            </div>
            <div className="px-8 py-5">
                <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <span className="text-[12px] text-outline">© 2026 Medical AI · KvK 00000000</span>
                    <nav className="flex flex-wrap gap-x-5 gap-y-2">
                        {LEGAL.map((l) => (
                            <Link key={l.label} href={l.href} className="text-[12px] text-outline hover:text-on-surface transition-colors">
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
