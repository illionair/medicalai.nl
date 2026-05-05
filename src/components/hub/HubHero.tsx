export default function HubHero() {
    return (
        <section className="relative w-full min-h-[390px] md:min-h-[480px] rounded-[22px] md:rounded-[28px] overflow-hidden glass-panel ambient-shadow flex items-end p-4 sm:p-8 md:p-12">
            <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-95"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80&auto=format"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F2A]/60 via-[#0B1F2A]/15 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#003459]/30 via-transparent to-[#00A8E8]/20 z-10 mix-blend-soft-light" />
            <div className="relative z-20 w-full max-w-2xl bg-white/45 backdrop-blur-2xl p-5 sm:p-7 md:p-10 rounded-[20px] md:rounded-[24px] border border-white/50 shadow-[0_8px_32px_rgba(0,23,31,0.08)]">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/65 text-[#003459] label-sm mb-4 backdrop-blur-md border border-white/60">
                    Knowledge Center
                </span>
                <h1 className="display-xl text-on-surface mb-3">Educational Hub</h1>
                <p className="body-md sm:body-lg text-on-surface-variant max-w-xl">
                    Verdiep je klinische expertise met onafhankelijke analyses, geselecteerde studies en aankomende seminars.
                </p>
            </div>
        </section>
    );
}
