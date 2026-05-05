import Link from "next/link";

function MS({ name, className = "" }: { name: string; className?: string }) {
    return <span className={"material-symbols-outlined " + className}>{name}</span>;
}

export default function ComingSoonCard() {
    return (
        <div
            className="rounded-[24px] p-5 sm:p-7 md:p-10 relative overflow-hidden flex flex-col justify-center min-h-[260px] md:min-h-[300px] group ambient-shadow"
            style={{
                background: "linear-gradient(135deg, #EEF6FB 0%, #DBE9F4 100%)",
                border: "0.5px solid rgba(255,255,255,0.8)",
            }}
        >
            <div className="absolute -top-2 -right-2 p-8 opacity-[0.08] group-hover:opacity-[0.12] transition-opacity">
                <MS name="smart_toy" className="!text-[140px] !text-[#003459]" />
            </div>
            <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/70 label-sm brand-accent mb-5 backdrop-blur-sm border border-white/60">
                    Binnenkort
                </span>
                <h2 className="headline-lg text-on-surface mb-3">AI 101 voor zorgprofessionals</h2>
                <p className="body-md text-on-surface-variant mb-7 max-w-md">
                    Een masterclass die machine learning in de dagelijkse klinische praktijk demystificeert — door zorgprofessionals, voor zorgprofessionals.
                </p>
                <Link
                    href="/subscribe"
                    className="bg-[#003459] text-white label-sm px-5 py-2.5 rounded-full inline-flex items-center gap-2 hover:bg-[#00171F] transition-colors"
                >
                    Houd me op de hoogte <MS name="arrow_forward" className="!text-[16px]" />
                </Link>
            </div>
        </div>
    );
}
