"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, Sparkles } from "lucide-react";

type ChecklistItem = {
    id: string;
    label: string;
    hint: string;
};

const ITEMS: ChecklistItem[] = [
    { id: "task", label: "1. Klinische taak is concreet", hint: "Welk besluit ondersteunt de AI? Voor wie, met welke actie erna, en wie voert die uit?" },
    { id: "population", label: "2. Populatie matcht jouw patiënten", hint: "Leeftijd, comorbiditeit, setting, etniciteit, prevalentie. Past het studiecentrum bij jouw praktijk?" },
    { id: "outcome", label: "3. Uitkomst is hard en relevant", hint: "Mortaliteit, IC-opname, pathologische diagnose. Liever niet samengesteld of administratief. Timing klopt." },
    { id: "dataset", label: "4. Dataset is netjes opgebouwd", hint: "Bron, periode, in/exclusie, geen overlap tussen train/val/test. Geen lekken uit de toekomst." },
    { id: "external", label: "5. Externe validatie aanwezig", hint: "Andere centra, andere periode, andere systemen. Niet alleen interne held-out set." },
    { id: "metrics", label: "6. Verder dan AUC gekeken", hint: "Sensitiviteit, specificiteit, PPV/NPV bij klinische drempels. Aantal fout-positieven en -negatieven per 100 patiënten." },
    { id: "calibration", label: "7. Calibratie gerapporteerd", hint: "Calibratieplot, intercept en slope. Voor risicomodellen essentieel; alleen discriminatie is onvoldoende." },
    { id: "bias", label: "8. Bias en fairness onderzocht", hint: "Performance per subgroep: geslacht, leeftijd, etniciteit, taal, comorbiditeit, apparatuur, centrum." },
    { id: "workflow", label: "9. Workflow doordacht", hint: "Waar landt de output, hoe wordt onzekerheid getoond, mag de arts afwijken, wordt alarmmoeheid gemeten?" },
    { id: "utility", label: "10. Klinische bruikbaarheid aangetoond", hint: "Decision curve, prospectieve evaluatie of trial. Modelprestatie alleen is geen bewijs voor betere zorg." },
];

type Verdict = {
    title: string;
    description: string;
    tone: "strong" | "ok" | "weak" | "skip";
};

function verdictFor(score: number): Verdict {
    if (score >= 9) return {
        title: "Sterke studie — diepe lectuur waard",
        description: "Geschikt voor journal club en klinische bespreking. Lees in detail, kijk naar de figuren en de supplementen.",
        tone: "strong",
    };
    if (score >= 6) return {
        title: "Redelijk — kritisch lezen",
        description: "Bruikbaar voor context, maar focus op de zwakke punten. Vraag jezelf wat er ontbreekt voor jouw setting.",
        tone: "ok",
    };
    if (score >= 3) return {
        title: "Twijfelachtig — alleen oppakken bij specifieke claim",
        description: "Pak alleen verder op als één concrete claim of methode relevant is voor jouw werk. Niet generaliseren.",
        tone: "weak",
    };
    return {
        title: "Voorlopig terzijde",
        description: "Onvoldoende basis voor klinische beslissingen. Lees alleen verder als technische context belangrijker is dan klinische waarde.",
        tone: "skip",
    };
}

const TONE_STYLES: Record<Verdict["tone"], string> = {
    strong: "border-emerald-200 bg-emerald-50 text-emerald-900",
    ok: "border-sky-200 bg-sky-50 text-sky-900",
    weak: "border-amber-200 bg-amber-50 text-amber-900",
    skip: "border-rose-200 bg-rose-50 text-rose-900",
};

export default function ChecklistScore() {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const score = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
    const percentage = (score / ITEMS.length) * 100;
    const verdict = verdictFor(score);
    const touched = score > 0;

    const toggle = (id: string) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const reset = () => setChecked({});

    return (
        <section
            aria-labelledby="checklist-10min-title"
            className="not-prose my-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
        >
            <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 bg-gradient-to-br from-brand-primary/5 via-white to-brand-accent/5 p-6 sm:p-8">
                <div>
                    <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary">
                        <Sparkles size={14} />
                        Interactief
                    </p>
                    <h3 id="checklist-10min-title" className="text-2xl font-bold text-brand-dark sm:text-3xl">
                        Pas de check toe op jouw artikel
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                        Vink af wat de studie afdoende behandelt. De score en het oordeel updaten direct.
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold tabular-nums text-brand-primary sm:text-5xl">
                        {score}
                        <span className="text-2xl text-slate-400">/{ITEMS.length}</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Punten gehaald</p>
                </div>
            </header>

            <div className="p-6 sm:p-8">
                <div
                    className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={ITEMS.length}
                    aria-valuenow={score}
                    aria-label="Checklist voortgang"
                >
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent transition-[width] duration-300 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                    {ITEMS.map((item) => {
                        const isOn = !!checked[item.id];
                        return (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    onClick={() => toggle(item.id)}
                                    aria-pressed={isOn}
                                    className={`group flex h-full w-full items-start gap-3 rounded-2xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary ${isOn
                                        ? "border-brand-secondary bg-brand-secondary/5"
                                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                                        }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md border transition ${isOn
                                            ? "border-brand-secondary bg-brand-secondary text-white"
                                            : "border-slate-300 bg-white text-transparent group-hover:border-slate-400"
                                            }`}
                                    >
                                        <Check size={16} strokeWidth={3} />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className={`block text-sm font-bold leading-tight ${isOn ? "text-brand-dark" : "text-slate-800"}`}>
                                            {item.label}
                                        </span>
                                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                                            {item.hint}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <div className={`mt-8 rounded-2xl border p-5 transition-colors ${touched ? TONE_STYLES[verdict.tone] : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                    {touched ? (
                        <>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-70">Oordeel</p>
                            <p className="mt-1 text-lg font-bold leading-tight">{verdict.title}</p>
                            <p className="mt-2 text-sm leading-6 opacity-90">{verdict.description}</p>
                        </>
                    ) : (
                        <p className="text-sm">Vink hierboven aan wat de studie behandelt — het oordeel verschijnt zodra je begint.</p>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">
                        Geen opslag — vink-status verdwijnt als je de pagina ververst.
                    </p>
                    <button
                        type="button"
                        onClick={reset}
                        disabled={!touched}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
                    >
                        <RotateCcw size={14} />
                        Reset
                    </button>
                </div>
            </div>
        </section>
    );
}
