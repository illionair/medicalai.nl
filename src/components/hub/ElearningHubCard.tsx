import Link from "next/link";

function MS({ name, className = "" }: { name: string; className?: string }) {
    return <span className={"material-symbols-outlined " + className}>{name}</span>;
}

export default function ElearningHubCard() {
    return (
        <section className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-sm ambient-shadow sm:p-7 md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">
                <div>
                    <span className="inline-flex min-h-8 items-center rounded-full border border-sky-200 bg-sky-50 px-3 text-[12.5px] font-bold text-[#003459]">
                        E-learning
                    </span>
                    <h2 className="headline-lg mt-4 text-on-surface">AI 101 voor zorgprofessionals</h2>
                    <p className="body-md mt-3 max-w-3xl text-on-surface-variant">
                        Een rustig kaartendeck over ChatGPT en AI op de werkvloer: privacy, veilige prompts,
                        casussen, kennischecks en praktische regels in kleine stappen.
                    </p>
                </div>
                <div className="flex flex-col gap-3 rounded-[20px] border border-[#DCEAF0] bg-[#EEF6FB] p-5">
                    <div className="flex items-center gap-3 text-[#003459]">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white">
                            <MS name="style" className="!text-[23px]" />
                        </span>
                        <div>
                            <p className="text-[14px] font-black text-[#003459]">38 kaarten</p>
                            <p className="text-[13px] leading-5 text-[#4A5A6A]">Doorklikken, oefenen en direct feedback krijgen.</p>
                        </div>
                    </div>
                    <Link
                        href="/e-learning"
                        className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#003459] px-5 text-sm font-black text-white transition-colors hover:bg-[#00171F]"
                    >
                        Start e-learning
                        <MS name="arrow_forward" className="!text-[17px]" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
