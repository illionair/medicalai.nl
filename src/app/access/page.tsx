"use client";

import { useState } from "react";
import Image from "next/image";
import { verifySiteAccess } from "../actions";

export default function AccessPage() {
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    async function handleSubmit(formData: FormData) {
        setPending(true);
        setError("");
        const result = await verifySiteAccess(formData);
        if (result?.error) {
            setError(result.error);
            setPending(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 stage-bg overflow-auto">
            <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80&auto=format"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/55 to-white/95" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#003459]/15 via-transparent to-[#00A8E8]/10 mix-blend-soft-light" />

            <div className="relative w-full max-w-md glass-panel ambient-shadow rounded-[28px] p-8 md:p-10 text-center">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/images/logo-medical-ai.png"
                        alt=""
                        width={56}
                        height={56}
                        priority
                        className="h-14 w-14 object-contain"
                    />
                </div>

                <span className="inline-block px-3.5 py-1 rounded-full bg-white/65 text-[#003459] label-sm mb-5 backdrop-blur-md border border-white/60">
                    Coming Soon
                </span>

                <h1 className="headline-lg text-on-surface mb-3">
                    Medical<span className="brand-accent">·</span>AI
                </h1>

                <p className="body-md text-on-surface-variant mb-8">
                    Het kennisplatform voor verantwoorde AI in de zorg gaat binnenkort live. Heb je een toegangscode? Log dan hieronder in.
                </p>

                <form action={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 !text-[20px] text-outline pointer-events-none">
                            lock
                        </span>
                        <input
                            type="password"
                            name="code"
                            placeholder="Toegangscode"
                            className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/75 border border-white/70 focus:outline-none focus:ring-2 focus:ring-[#007EA7]/20 focus:border-[#007EA7]/50 text-[15px] tracking-wide text-on-surface placeholder:text-outline backdrop-blur-md transition-all"
                            required
                            autoComplete="off"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-[13px] font-medium text-rose-600 bg-rose-50/80 border border-rose-100 rounded-2xl py-2.5 px-4">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full bg-[#003459] text-white label-sm px-5 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:bg-[#00171F] transition-colors disabled:opacity-60"
                    >
                        {pending ? "Bezig…" : "Toegang"}
                        <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                    </button>
                </form>

                <p className="text-[11.5px] text-outline mt-6 tracking-wide uppercase">
                    Project Medical AI · 2026
                </p>
            </div>
        </div>
    );
}
