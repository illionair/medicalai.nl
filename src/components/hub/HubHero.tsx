"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

type HubCopy = {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
};

function getHubCopy(languageT: unknown): Required<HubCopy> {
    const hub = (languageT as { hub?: HubCopy }).hub;

    return {
        eyebrow: hub?.eyebrow ?? "Educational Hub",
        title: hub?.title ?? "Leer medische AI beoordelen met klinische nuance.",
        subtitle: hub?.subtitle ?? "Verdiep je in toepassingen, methodologie en ethiek via zorgvuldig samengestelde artikelen.",
    };
}

export default function HubHero() {
    const { t } = useLanguage();
    const copy = getHubCopy(t);

    return (
        <section className="relative min-h-[520px] overflow-hidden rounded-3xl bg-slate-100 glass-panel ambient-shadow sm:h-[500px] lg:h-[560px]">
            <Image
                src="/images/hand-robot.png"
                alt=""
                fill
                priority
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/55 to-brand-primary/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />

            <div className="relative z-10 flex h-full items-end p-5 sm:p-8 lg:p-10">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl rounded-[28px] border border-white/70 bg-white/65 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-8"
                >
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary">
                        {copy.eyebrow}
                    </p>
                    <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-brand-dark sm:text-5xl">
                        {copy.title}
                    </h1>
                    <p className="max-w-xl text-base font-medium leading-7 text-slate-700 sm:text-lg">
                        {copy.subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
