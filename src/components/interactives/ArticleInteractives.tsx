"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, FlaskConical, LineChart, LockKeyhole, RotateCcw, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
    label: string;
    value: string;
    hint?: string;
};

function MetricCard({ label, value, hint }: MetricCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-brand-dark">{value}</p>
            {hint && <p className="mt-1 text-xs leading-5 text-slate-500">{hint}</p>}
        </div>
    );
}

function Shell({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <section className="not-prose my-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            <header className="border-b border-slate-100 bg-gradient-to-br from-brand-primary/5 via-white to-brand-accent/5 p-6 sm:p-8">
                <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary">
                    <SlidersHorizontal size={14} />
                    Interactief
                </p>
                <h3 className="text-2xl font-bold text-brand-dark sm:text-3xl">{title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p>
            </header>
            <div className="p-6 sm:p-8">{children}</div>
            <footer className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-xs leading-5 text-slate-500 sm:px-8">
                Educatieve simulatie met fictieve data. Niet gebruiken voor individuele patientbeslissingen.
            </footer>
        </section>
    );
}

const AUC_POINTS = [
    { score: 0.95, outcome: 1 },
    { score: 0.9, outcome: 1 },
    { score: 0.84, outcome: 0 },
    { score: 0.78, outcome: 1 },
    { score: 0.72, outcome: 1 },
    { score: 0.66, outcome: 0 },
    { score: 0.61, outcome: 1 },
    { score: 0.55, outcome: 0 },
    { score: 0.49, outcome: 0 },
    { score: 0.43, outcome: 1 },
    { score: 0.38, outcome: 0 },
    { score: 0.31, outcome: 0 },
    { score: 0.27, outcome: 0 },
    { score: 0.2, outcome: 0 },
    { score: 0.14, outcome: 0 },
];

function ratio(numerator: number, denominator: number) {
    if (denominator === 0) return 0;
    return numerator / denominator;
}

function pct(value: number) {
    return `${Math.round(value * 100)}%`;
}

function formatNumber(value: number, digits = 2) {
    return value.toFixed(digits).replace(/\.?0+$/, "");
}

function formatDecimal(value: number, digits = 2) {
    return formatNumber(value, digits).replace(".", ",");
}

function thresholdStats(cut: number) {
    const positives = AUC_POINTS.filter((point) => point.outcome === 1).length;
    const negatives = AUC_POINTS.length - positives;
    const predicted = AUC_POINTS.map((point) => ({ ...point, positive: point.score >= cut }));
    const tp = predicted.filter((point) => point.positive && point.outcome === 1).length;
    const fp = predicted.filter((point) => point.positive && point.outcome === 0).length;
    const tn = predicted.filter((point) => !point.positive && point.outcome === 0).length;
    const fn = predicted.filter((point) => !point.positive && point.outcome === 1).length;

    return {
        tp,
        fp,
        tn,
        fn,
        sensitivity: ratio(tp, positives),
        specificity: ratio(tn, negatives),
        ppv: ratio(tp, tp + fp),
        npv: ratio(tn, tn + fn),
        fpr: ratio(fp, negatives),
    };
}

function rocPath() {
    const thresholds = [1.01, ...Array.from(new Set(AUC_POINTS.map((point) => point.score))).sort((a, b) => b - a), -0.01];
    return thresholds.map((threshold) => {
        const stats = thresholdStats(threshold);
        return {
            threshold,
            x: stats.fpr,
            y: stats.sensitivity,
        };
    });
}

function areaUnderCurve(points: Array<{ x: number; y: number }>) {
    return points.slice(1).reduce((area, point, index) => {
        const previous = points[index];
        return area + (point.x - previous.x) * ((point.y + previous.y) / 2);
    }, 0);
}

function svgPoint(point: { x: number; y: number }) {
    return {
        x: 24 + point.x * 212,
        y: 236 - point.y * 212,
    };
}

export function AucPlayground() {
    const [threshold, setThreshold] = useState(55);
    const [pairIndex, setPairIndex] = useState(0);

    const metrics = useMemo(() => {
        return thresholdStats(threshold / 100);
    }, [threshold]);

    const path = useMemo(() => rocPath(), []);
    const auc = useMemo(() => areaUnderCurve(path), [path]);
    const pairs = useMemo(() => {
        const positives = AUC_POINTS.filter((point) => point.outcome === 1);
        const negatives = AUC_POINTS.filter((point) => point.outcome === 0);
        return positives.flatMap((positive, positiveIndex) =>
            negatives.map((negative, negativeIndex) => ({
                id: `${positiveIndex}-${negativeIndex}`,
                positive,
                negative,
                correct: positive.score > negative.score,
                tied: positive.score === negative.score,
            })),
        );
    }, []);
    const correctPairs = pairs.filter((pair) => pair.correct).length;
    const tiedPairs = pairs.filter((pair) => pair.tied).length;
    const pair = pairs[pairIndex % pairs.length];
    const thresholdMarkers = [75, 55, 35].map((markerThreshold) => ({
        label: markerThreshold === 75 ? "A" : markerThreshold === 55 ? "B" : "C",
        threshold: markerThreshold,
        stats: thresholdStats(markerThreshold / 100),
    }));
    const currentX = 24 + (1 - metrics.specificity) * 212;
    const currentY = 236 - metrics.sensitivity * 212;
    const linePoints = path.map((point) => {
        const pointOnSvg = svgPoint(point);
        return `${pointOnSvg.x},${pointOnSvg.y}`;
    });
    const areaPoints = ["24,236", ...linePoints, "236,236"].join(" ");
    const comparisonCards = [
        {
            label: "Perfect",
            auc: "1,00",
            points: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 },
            ],
            note: "alle positieven staan hoger dan alle negatieven",
        },
        {
            label: "Toeval",
            auc: "0,50",
            points: [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
            ],
            note: "de diagonale lijn: rangorde is coin-flip niveau",
        },
        {
            label: "Demo",
            auc: formatDecimal(auc),
            points: path,
            note: "realistische curve met enkele verwisselde paren",
        },
    ];

    return (
        <Shell
            title="AUC en drempelwaarde playground"
            subtitle="Verplaats de drempel, bekijk de ROC-curve en test het kernidee van AUC: hoe vaak krijgt een patient met de uitkomst een hogere score dan een patient zonder de uitkomst?"
        >
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <label className="text-sm font-bold text-slate-800" htmlFor="auc-threshold">
                            Beslisdrempel: {threshold}%
                        </label>
                        <input
                            id="auc-threshold"
                            type="range"
                            min="5"
                            max="95"
                            value={threshold}
                            onChange={(event) => setThreshold(Number(event.target.value))}
                            className="mt-3 w-full accent-brand-secondary"
                        />
                        <div className="mt-5 rounded-2xl border border-white bg-white p-4">
                            <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                                <span>Modelscore</span>
                                <span>hoog risico</span>
                            </div>
                            <div className="rounded-2xl bg-gradient-to-r from-cyan-50 via-white to-rose-50 p-3">
                                <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                                    <span>negatief voorspeld</span>
                                    <span className="rounded-full bg-white px-2 py-1 text-brand-primary shadow-sm">drempel {threshold}%</span>
                                    <span className="text-right">positief voorspeld</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                                    {AUC_POINTS.map((point, index) => {
                                        const predictedPositive = point.score * 100 >= threshold;
                                        return (
                                            <div
                                                key={`${point.score}-${index}`}
                                                className={
                                                    "min-h-[64px] rounded-2xl border p-2 text-center shadow-sm transition " +
                                                    (predictedPositive
                                                        ? "border-brand-primary/40 bg-white"
                                                        : "border-slate-200 bg-white/60")
                                                }
                                                title={`Score ${Math.round(point.score * 100)}%, ${point.outcome === 1 ? "uitkomst aanwezig" : "geen uitkomst"}`}
                                            >
                                                <div
                                                    className={
                                                        "mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[11px] font-black shadow-sm " +
                                                        (point.outcome === 1 ? "bg-brand-secondary text-white" : "bg-slate-300 text-slate-700")
                                                    }
                                                >
                                                    {point.outcome === 1 ? "+" : "-"}
                                                </div>
                                                <div className="text-sm font-black tabular-nums text-brand-dark">{Math.round(point.score * 100)}%</div>
                                                <div className={"mt-0.5 text-[10px] font-bold " + (predictedPositive ? "text-brand-primary" : "text-slate-400")}>
                                                    {predictedPositive ? "alarm" : "rust"}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <p className="mt-3 text-xs leading-5 text-slate-500">
                                Elke tegel is een fictieve patiënt. Het plus/min-teken is de echte uitkomst; de rand laat zien of de score boven de drempel valt. Zo blijft de verdeling leesbaar, ook bij dicht bij elkaar liggende scores.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <MetricCard label="TP" value={`${metrics.tp}`} hint="terecht positief" />
                        <MetricCard label="FP" value={`${metrics.fp}`} hint="fout positief" />
                        <MetricCard label="FN" value={`${metrics.fn}`} hint="fout negatief" />
                        <MetricCard label="TN" value={`${metrics.tn}`} hint="terecht negatief" />
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <MetricCard label="Sensitiviteit" value={pct(metrics.sensitivity)} />
                        <MetricCard label="Specificiteit" value={pct(metrics.specificity)} />
                        <MetricCard label="PPV" value={pct(metrics.ppv)} />
                        <MetricCard label="NPV" value={pct(metrics.npv)} />
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <LineChart size={18} />
                            ROC-ruimte
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-primary shadow-sm">
                            AUC {formatDecimal(auc)}
                        </span>
                    </div>
                    <svg viewBox="0 0 260 260" className="h-72 w-full">
                        <polygon points={areaPoints} fill="#007EA7" opacity="0.12" />
                        <line x1="24" y1="236" x2="236" y2="24" stroke="#cbd5e1" strokeDasharray="5 5" />
                        <polyline
                            fill="none"
                            stroke="#0059b5"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={linePoints.join(" ")}
                        />
                        {thresholdMarkers.map((marker) => {
                            const markerX = 24 + marker.stats.fpr * 212;
                            const markerY = 236 - marker.stats.sensitivity * 212;
                            return (
                                <g key={marker.label}>
                                    <circle cx={markerX} cy={markerY} r="5" fill="#ffffff" stroke="#003459" strokeWidth="2" />
                                    <text x={markerX + 7} y={markerY - 7} className="fill-slate-700 text-[11px] font-bold">
                                        {marker.label}
                                    </text>
                                </g>
                            );
                        })}
                        <circle cx={currentX} cy={currentY} r="7" fill="#0f766e" stroke="white" strokeWidth="3" />
                        <line x1="24" y1="236" x2="236" y2="236" stroke="#475569" />
                        <line x1="24" y1="236" x2="24" y2="24" stroke="#475569" />
                        <text x="105" y="254" className="fill-slate-500 text-[10px]">1 - specificiteit</text>
                        <text x="3" y="135" transform="rotate(-90 8 135)" className="fill-slate-500 text-[10px]">sensitiviteit</text>
                    </svg>
                    <div className="grid gap-2 text-xs leading-5 text-slate-600 sm:grid-cols-3">
                        <div><strong>A:</strong> strengere drempel, minder fout-positieven.</div>
                        <div><strong>B:</strong> balanspunt in deze fictieve dataset.</div>
                        <div><strong>C:</strong> lagere drempel, meer sensitiviteit.</div>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {comparisonCards.map((card) => (
                    <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h4 className="text-sm font-bold text-brand-dark">{card.label}</h4>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">AUC {card.auc}</span>
                        </div>
                        <svg viewBox="0 0 100 72" className="h-24 w-full rounded-2xl bg-slate-50">
                            <line x1="12" y1="60" x2="88" y2="12" stroke="#cbd5e1" strokeDasharray="4 4" />
                            <polyline
                                fill="none"
                                stroke={card.label === "Toeval" ? "#94a3b8" : "#007EA7"}
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={card.points.map((point) => `${12 + point.x * 76},${60 - point.y * 48}`).join(" ")}
                            />
                            <line x1="12" y1="60" x2="88" y2="60" stroke="#64748b" />
                            <line x1="12" y1="60" x2="12" y2="12" stroke="#64748b" />
                        </svg>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{card.note}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-primary/5 via-white to-brand-accent/5 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">AUC als rangschikkingskans</p>
                    <p className="mt-2 text-3xl font-black text-brand-dark">{formatDecimal((correctPairs + tiedPairs * 0.5) / pairs.length)}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        In {correctPairs} van {pairs.length} positieve-negatieve paren staat de patient met de uitkomst hoger. Ties tellen half mee.
                    </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Paarvergelijking</p>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Klik door paren en zie of de positieve casus hoger scoort dan de negatieve casus.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setPairIndex((value) => value + 1)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white shadow-sm transition-transform hover:scale-105"
                            aria-label="Toon volgend paar"
                        >
                            <RotateCcw size={17} />
                        </button>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">uitkomst aanwezig</p>
                            <p className="mt-2 text-3xl font-black tabular-nums text-emerald-900">{Math.round(pair.positive.score * 100)}%</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">geen uitkomst</p>
                            <p className="mt-2 text-3xl font-black tabular-nums text-slate-800">{Math.round(pair.negative.score * 100)}%</p>
                        </div>
                    </div>
                    <div className={"mt-4 rounded-2xl p-4 text-sm font-semibold " + (pair.correct ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900")}>
                        {pair.correct
                            ? "Goed gerangschikt: dit paar draagt positief bij aan de AUC."
                            : "Verwisseld paar: de negatieve casus scoort hoger, waardoor de AUC daalt."}
                    </div>
                </div>
            </div>
        </Shell>
    );
}

export function AucScores() {
    const positives = AUC_POINTS.filter((p) => p.outcome === 1);
    const negatives = AUC_POINTS.filter((p) => p.outcome === 0);
    const meanPos = positives.reduce((s, p) => s + p.score, 0) / positives.length;
    const meanNeg = negatives.reduce((s, p) => s + p.score, 0) / negatives.length;

    return (
        <Shell
            title="Vijftien patiënten, vijftien scores"
            subtitle="Het model kent elke patiënt een score tussen 0 en 1 toe. Plus = uitkomst aanwezig, min = niet. Liggen de plusjes vooral rechts?"
        >
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-3 flex justify-between text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    <span>laag risico</span>
                    <span>hoog risico</span>
                </div>
                <div className="relative h-28 rounded-2xl bg-gradient-to-r from-cyan-50 via-white to-rose-50">
                    <div className="absolute inset-x-3 inset-y-0">
                        {AUC_POINTS.map((p, i) => (
                            <div
                                key={`${p.score}-${i}`}
                                className="absolute"
                                style={{
                                    left: `${p.score * 100}%`,
                                    top: p.outcome === 1 ? "22%" : "62%",
                                    transform: "translate(-50%, -50%)",
                                }}
                                title={`Score ${Math.round(p.score * 100)}% · ${p.outcome === 1 ? "uitkomst" : "geen uitkomst"}`}
                            >
                                <div
                                    className={
                                        "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-sm font-black shadow-md " +
                                        (p.outcome === 1 ? "bg-brand-secondary text-white" : "bg-slate-300 text-slate-700")
                                    }
                                >
                                    {p.outcome === 1 ? "+" : "−"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-2">
                        <span className="inline-block h-3 w-3 rounded-full bg-brand-secondary" />
                        uitkomst aanwezig
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <span className="inline-block h-3 w-3 rounded-full bg-slate-300" />
                        geen uitkomst
                    </span>
                </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MetricCard label="Gemiddelde score positieven" value={formatDecimal(meanPos)} hint={`${positives.length} patiënten met de uitkomst`} />
                <MetricCard label="Gemiddelde score negatieven" value={formatDecimal(meanNeg)} hint={`${negatives.length} patiënten zonder de uitkomst`} />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
                In dit voorbeeld liggen de plusjes gemiddeld duidelijk hoger dan de minnetjes. Het model pikt dus signaal op. AUC vat dat verschil straks in één getal samen.
            </p>
        </Shell>
    );
}

export function AucThreshold() {
    const [threshold, setThreshold] = useState(55);
    const metrics = useMemo(() => thresholdStats(threshold / 100), [threshold]);

    return (
        <Shell
            title="Verschuif de drempel"
            subtitle="Boven de drempel zegt het model alarm, eronder rust. Kijk wat dat doet met de vier kwadranten en de bekende cijfers."
        >
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <label className="text-sm font-bold text-slate-800" htmlFor="auc-thr-threshold">
                    Beslisdrempel: {threshold}%
                </label>
                <input
                    id="auc-thr-threshold"
                    type="range"
                    min="5"
                    max="95"
                    value={threshold}
                    onChange={(event) => setThreshold(Number(event.target.value))}
                    className="mt-3 w-full accent-brand-secondary"
                />
                <div className="mt-5 rounded-2xl border border-white bg-white p-4">
                    <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                        <span>negatief voorspeld</span>
                        <span className="rounded-full bg-white px-2 py-1 text-brand-primary shadow-sm">drempel {threshold}%</span>
                        <span className="text-right">positief voorspeld</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {AUC_POINTS.map((point, index) => {
                            const predictedPositive = point.score * 100 >= threshold;
                            return (
                                <div
                                    key={`${point.score}-${index}`}
                                    className={
                                        "min-h-[64px] rounded-2xl border p-2 text-center shadow-sm transition " +
                                        (predictedPositive
                                            ? "border-brand-primary/40 bg-white"
                                            : "border-slate-200 bg-white/60")
                                    }
                                    title={`Score ${Math.round(point.score * 100)}%, ${point.outcome === 1 ? "uitkomst aanwezig" : "geen uitkomst"}`}
                                >
                                    <div
                                        className={
                                            "mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[11px] font-black shadow-sm " +
                                            (point.outcome === 1 ? "bg-brand-secondary text-white" : "bg-slate-300 text-slate-700")
                                        }
                                    >
                                        {point.outcome === 1 ? "+" : "-"}
                                    </div>
                                    <div className="text-sm font-black tabular-nums text-brand-dark">{Math.round(point.score * 100)}%</div>
                                    <div className={"mt-0.5 text-[10px] font-bold " + (predictedPositive ? "text-brand-primary" : "text-slate-400")}>
                                        {predictedPositive ? "alarm" : "rust"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
                <MetricCard label="TP" value={`${metrics.tp}`} hint="terecht positief" />
                <MetricCard label="FP" value={`${metrics.fp}`} hint="vals alarm" />
                <MetricCard label="FN" value={`${metrics.fn}`} hint="gemist" />
                <MetricCard label="TN" value={`${metrics.tn}`} hint="terecht negatief" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MetricCard label="Sensitiviteit" value={pct(metrics.sensitivity)} hint="hoeveel echte gevallen vang je?" />
                <MetricCard label="Specificiteit" value={pct(metrics.specificity)} hint="hoeveel gezonden blijven met rust?" />
                <MetricCard label="PPV" value={pct(metrics.ppv)} hint="alarm: hoe vaak terecht?" />
                <MetricCard label="NPV" value={pct(metrics.npv)} hint="rust: hoe vaak terecht?" />
            </div>
        </Shell>
    );
}

export function AucRoc() {
    const [threshold, setThreshold] = useState(55);
    const metrics = useMemo(() => thresholdStats(threshold / 100), [threshold]);
    const path = useMemo(() => rocPath(), []);
    const auc = useMemo(() => areaUnderCurve(path), [path]);
    const linePoints = path.map((point) => {
        const pointOnSvg = svgPoint(point);
        return `${pointOnSvg.x},${pointOnSvg.y}`;
    });
    const areaPoints = ["24,236", ...linePoints, "236,236"].join(" ");
    const currentX = 24 + (1 - metrics.specificity) * 212;
    const currentY = 236 - metrics.sensitivity * 212;
    const thresholdMarkers = [75, 55, 35].map((markerThreshold) => ({
        label: markerThreshold === 75 ? "A" : markerThreshold === 55 ? "B" : "C",
        threshold: markerThreshold,
        stats: thresholdStats(markerThreshold / 100),
    }));

    return (
        <Shell
            title="ROC: kaart van alle drempels"
            subtitle="Elk punt op de curve hoort bij één drempel. Schuif je hieronder, dan zie je waar je belandt op de kaart."
        >
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <label className="text-sm font-bold text-slate-800" htmlFor="auc-roc-threshold">
                        Beslisdrempel: {threshold}%
                    </label>
                    <input
                        id="auc-roc-threshold"
                        type="range"
                        min="5"
                        max="95"
                        value={threshold}
                        onChange={(event) => setThreshold(Number(event.target.value))}
                        className="mt-3 w-full accent-brand-secondary"
                    />
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <MetricCard label="Sensitiviteit" value={pct(metrics.sensitivity)} hint="y-as" />
                        <MetricCard label="1 − specificiteit" value={pct(metrics.fpr)} hint="x-as" />
                    </div>
                    <p className="mt-4 text-xs leading-5 text-slate-500">
                        Het groene puntje rechts beweegt mee. A, B en C zijn vaste drempels: A streng, B gemiddeld, C ruim. Linksboven is sterker, maar wat klopt hangt af van wat de fout kost.
                    </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <LineChart size={18} />
                            ROC-ruimte
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-primary shadow-sm">
                            AUC {formatDecimal(auc)}
                        </span>
                    </div>
                    <svg viewBox="0 0 260 260" className="h-72 w-full">
                        <polygon points={areaPoints} fill="#007EA7" opacity="0.12" />
                        <line x1="24" y1="236" x2="236" y2="24" stroke="#cbd5e1" strokeDasharray="5 5" />
                        <polyline
                            fill="none"
                            stroke="#0059b5"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={linePoints.join(" ")}
                        />
                        {thresholdMarkers.map((marker) => {
                            const markerX = 24 + marker.stats.fpr * 212;
                            const markerY = 236 - marker.stats.sensitivity * 212;
                            return (
                                <g key={marker.label}>
                                    <circle cx={markerX} cy={markerY} r="5" fill="#ffffff" stroke="#003459" strokeWidth="2" />
                                    <text x={markerX + 7} y={markerY - 7} className="fill-slate-700 text-[11px] font-bold">
                                        {marker.label}
                                    </text>
                                </g>
                            );
                        })}
                        <circle cx={currentX} cy={currentY} r="7" fill="#0f766e" stroke="white" strokeWidth="3" />
                        <line x1="24" y1="236" x2="236" y2="236" stroke="#475569" />
                        <line x1="24" y1="236" x2="24" y2="24" stroke="#475569" />
                        <text x="105" y="254" className="fill-slate-500 text-[10px]">1 − specificiteit</text>
                        <text x="3" y="135" transform="rotate(-90 8 135)" className="fill-slate-500 text-[10px]">sensitiviteit</text>
                    </svg>
                    <div className="grid gap-2 text-xs leading-5 text-slate-600 sm:grid-cols-3">
                        <div><strong>A:</strong> strenger, minder vals alarm.</div>
                        <div><strong>B:</strong> middenweg in deze data.</div>
                        <div><strong>C:</strong> ruimer, meer echte gevallen.</div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}

export function AucPairs() {
    const [pairIndex, setPairIndex] = useState(0);
    const path = useMemo(() => rocPath(), []);
    const auc = useMemo(() => areaUnderCurve(path), [path]);
    const pairs = useMemo(() => {
        const positives = AUC_POINTS.filter((point) => point.outcome === 1);
        const negatives = AUC_POINTS.filter((point) => point.outcome === 0);
        return positives.flatMap((positive, positiveIndex) =>
            negatives.map((negative, negativeIndex) => ({
                id: `${positiveIndex}-${negativeIndex}`,
                positive,
                negative,
                correct: positive.score > negative.score,
                tied: positive.score === negative.score,
            })),
        );
    }, []);
    const correctPairs = pairs.filter((pair) => pair.correct).length;
    const tiedPairs = pairs.filter((pair) => pair.tied).length;
    const pair = pairs[pairIndex % pairs.length];
    const rankProb = (correctPairs + tiedPairs * 0.5) / pairs.length;

    const comparisonCards = [
        {
            label: "Perfect",
            auc: "1,00",
            points: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 },
            ],
            note: "elke positieve patiënt scoort hoger dan elke negatieve",
        },
        {
            label: "Toeval",
            auc: "0,50",
            points: [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
            ],
            note: "diagonaal: kop of munt",
        },
        {
            label: "Deze demo",
            auc: formatDecimal(auc),
            points: path,
            note: "een paar paren gaan fout",
        },
    ];

    return (
        <Shell
            title="AUC als rangordespel"
            subtitle="Pak willekeurig één patiënt mét en één zonder uitkomst. Hoe vaak geeft het model de juiste de hogere score? Dat percentage is AUC."
        >
            <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-primary/5 via-white to-brand-accent/5 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Goed gerangschikt</p>
                    <p className="mt-2 text-3xl font-black text-brand-dark">{correctPairs} van {pairs.length} paren</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Komt neer op AUC {formatDecimal(rankProb)}. Gelijke scores tellen voor de helft mee.
                    </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Volgend paar</p>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Klik door en zie of de positieve casus hoger scoort dan de negatieve.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setPairIndex((value) => value + 1)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white shadow-sm transition-transform hover:scale-105"
                            aria-label="Toon volgend paar"
                        >
                            <RotateCcw size={17} />
                        </button>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">uitkomst aanwezig</p>
                            <p className="mt-2 text-3xl font-black tabular-nums text-emerald-900">{Math.round(pair.positive.score * 100)}%</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">geen uitkomst</p>
                            <p className="mt-2 text-3xl font-black tabular-nums text-slate-800">{Math.round(pair.negative.score * 100)}%</p>
                        </div>
                    </div>
                    <div className={"mt-4 rounded-2xl p-4 text-sm font-semibold " + (pair.correct ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900")}>
                        {pair.correct
                            ? "Juist gerangschikt — telt mee voor de AUC."
                            : "Verwisseld paar — AUC daalt iets."}
                    </div>
                </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {comparisonCards.map((card) => (
                    <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h4 className="text-sm font-bold text-brand-dark">{card.label}</h4>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">AUC {card.auc}</span>
                        </div>
                        <svg viewBox="0 0 100 72" className="h-24 w-full rounded-2xl bg-slate-50">
                            <line x1="12" y1="60" x2="88" y2="12" stroke="#cbd5e1" strokeDasharray="4 4" />
                            <polyline
                                fill="none"
                                stroke={card.label === "Toeval" ? "#94a3b8" : "#007EA7"}
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={card.points.map((point) => `${12 + point.x * 76},${60 - point.y * 48}`).join(" ")}
                            />
                            <line x1="12" y1="60" x2="88" y2="60" stroke="#64748b" />
                            <line x1="12" y1="60" x2="12" y2="12" stroke="#64748b" />
                        </svg>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{card.note}</p>
                    </div>
                ))}
            </div>
        </Shell>
    );
}

export function CalibrationSimulator() {
    const [tilt, setTilt] = useState(20);
    const bins = [0.08, 0.22, 0.38, 0.56, 0.74];
    const observed = bins.map((value, index) => Math.max(0.02, Math.min(0.95, value + (tilt / 100) * (index - 2) * 0.11)));
    const error = observed.reduce((sum, value, index) => sum + Math.abs(value - bins[index]), 0) / bins.length;

    return (
        <Shell
            title="Calibratie simulator"
            subtitle="Een risicomodel moet niet alleen rangordenen, maar ook betrouwbare kansen geven. Deze simulator toont hoe voorspeld risico kan afwijken van werkelijk risico."
        >
            <label className="text-sm font-bold text-slate-800" htmlFor="calibration-tilt">
                Calibratiefout: {tilt > 0 ? "overconfident hoog risico" : tilt < 0 ? "underconfident hoog risico" : "bijna perfect"}
            </label>
            <input
                id="calibration-tilt"
                type="range"
                min="-40"
                max="40"
                value={tilt}
                onChange={(event) => setTilt(Number(event.target.value))}
                className="mt-3 w-full accent-brand-secondary"
            />
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <svg viewBox="0 0 300 240" className="h-72 w-full">
                        <line x1="36" y1="204" x2="264" y2="204" stroke="#475569" />
                        <line x1="36" y1="204" x2="36" y2="24" stroke="#475569" />
                        <line x1="36" y1="204" x2="264" y2="24" stroke="#cbd5e1" strokeDasharray="5 5" />
                        <polyline
                            fill="none"
                            stroke="#0071e3"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={bins.map((bin, index) => `${36 + bin * 228},${204 - observed[index] * 180}`).join(" ")}
                        />
                        {bins.map((bin, index) => (
                            <circle key={bin} cx={36 + bin * 228} cy={204 - observed[index] * 180} r="6" fill="#0f766e" stroke="white" strokeWidth="3" />
                        ))}
                        <text x="86" y="226" className="fill-slate-500 text-[10px]">voorspeld risico</text>
                        <text x="7" y="135" transform="rotate(-90 12 135)" className="fill-slate-500 text-[10px]">werkelijk risico</text>
                    </svg>
                </div>
                <div className="grid content-start gap-3">
                    <MetricCard label="Gem. absolute fout" value={`${Math.round(error * 100)}%`} hint="lager is beter" />
                    <MetricCard label="Model AUC" value="0,82" hint="blijft gelijk in deze demo" />
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                        <strong>Les:</strong> twee modellen kunnen dezelfde AUC hebben, maar verschillende risico-inschattingen geven.
                    </div>
                </div>
            </div>
        </Shell>
    );
}

export function ClinicalUtilityCalculator() {
    const [prevalence, setPrevalence] = useState(12);
    const [threshold, setThreshold] = useState(15);
    const [sensitivity, setSensitivity] = useState(82);
    const [specificity, setSpecificity] = useState(76);

    const result = useMemo(() => {
        const n = 1000;
        const disease = n * (prevalence / 100);
        const noDisease = n - disease;
        const tp = disease * (sensitivity / 100);
        const fp = noDisease * (1 - specificity / 100);
        const fn = disease - tp;
        const weight = (threshold / 100) / (1 - threshold / 100);
        const netBenefit = tp / n - (fp / n) * weight;
        const treatAll = disease / n - (noDisease / n) * weight;
        return { tp, fp, fn, netBenefit, treatAll };
    }, [prevalence, sensitivity, specificity, threshold]);
    const controls: Array<{
        label: string;
        value: number;
        setter: (next: number) => void;
        min: number;
        max: number;
    }> = [
            { label: "Prevalentie", value: prevalence, setter: setPrevalence, min: 1, max: 40 },
            { label: "Drempelrisico", value: threshold, setter: setThreshold, min: 1, max: 50 },
            { label: "Sensitiviteit", value: sensitivity, setter: setSensitivity, min: 40, max: 99 },
            { label: "Specificiteit", value: specificity, setter: setSpecificity, min: 40, max: 99 },
        ];

    return (
        <Shell
            title="Clinical utility calculator"
            subtitle="Decision curve-denken in het klein: een model helpt pas als de winst van terechte acties opweegt tegen de schade van fout-positieven bij een relevante drempel."
        >
            <div className="grid gap-5 lg:grid-cols-2">
                <div className="grid gap-4">
                    {controls.map(({ label, value, setter, min, max }) => (
                        <label key={label} className="block text-sm font-bold text-slate-800">
                            {label}: {value}%
                            <input
                                type="range"
                                min={min}
                                max={max}
                                value={value}
                                onChange={(event) => setter(Number(event.target.value))}
                                className="mt-2 w-full accent-brand-secondary"
                            />
                        </label>
                    ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    <MetricCard label="TP / 1000" value={`${Math.round(result.tp)}`} />
                    <MetricCard label="FP / 1000" value={`${Math.round(result.fp)}`} />
                    <MetricCard label="FN / 1000" value={`${Math.round(result.fn)}`} />
                    <MetricCard label="Net benefit" value={formatNumber(result.netBenefit, 3)} hint={`treat-all: ${formatNumber(result.treatAll, 3)}`} />
                </div>
            </div>
        </Shell>
    );
}

export function DataLeakageSimulator() {
    const [patientSplit, setPatientSplit] = useState(false);
    const [futureFeature, setFutureFeature] = useState(true);
    const [preprocessLeak, setPreprocessLeak] = useState(true);
    const [duplicates, setDuplicates] = useState(false);

    const leakScore = [!patientSplit, futureFeature, preprocessLeak, duplicates].filter(Boolean).length;
    const internal = Math.min(0.99, 0.76 + leakScore * 0.055);
    const external = Math.max(0.55, 0.75 - leakScore * 0.045);

    const toggles = [
        { label: "Patient-level split", value: patientSplit, set: setPatientSplit, good: true },
        { label: "Toekomstfeature aanwezig", value: futureFeature, set: setFutureFeature, good: false },
        { label: "Preprocessing voor split", value: preprocessLeak, set: setPreprocessLeak, good: false },
        { label: "Duplicaten in dataset", value: duplicates, set: setDuplicates, good: false },
    ];

    return (
        <Shell
            title="Data leakage simulator"
            subtitle="Zet lekken aan of uit. Interne performance kan spectaculair stijgen terwijl externe performance juist slechter wordt."
        >
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="grid gap-3">
                    {toggles.map((toggle) => (
                        <button
                            key={toggle.label}
                            type="button"
                            onClick={() => toggle.set(!toggle.value)}
                            className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${toggle.value ? "border-brand-secondary bg-brand-secondary/5" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                        >
                            <span className="font-semibold text-slate-800">{toggle.label}</span>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${toggle.value === toggle.good ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                                {toggle.value ? "aan" : "uit"}
                            </span>
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => {
                            setPatientSplit(true);
                            setFutureFeature(false);
                            setPreprocessLeak(false);
                            setDuplicates(false);
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                        <RotateCcw size={15} />
                        Maak studie netjes
                    </button>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="grid gap-4">
                        {[
                            ["Interne AUC", internal, "bg-brand-primary"],
                            ["Externe AUC", external, "bg-brand-secondary"],
                        ].map(([label, value, color]) => (
                            <div key={String(label)}>
                                <div className="mb-2 flex justify-between text-sm font-bold text-slate-700">
                                    <span>{label}</span>
                                    <span>{formatNumber(Number(value), 2)}</span>
                                </div>
                                <div className="h-4 overflow-hidden rounded-full bg-white">
                                    <div className={`h-full rounded-full ${color}`} style={{ width: `${Number(value) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={`mt-6 rounded-2xl border p-4 text-sm leading-6 ${leakScore ? "border-rose-200 bg-rose-50 text-rose-900" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>
                        {leakScore ? `${leakScore} leakage-risico's actief. Hoge interne score is verdacht.` : "Geen duidelijke leakage-toggle actief. Nu blijft externe performance geloofwaardiger."}
                    </div>
                </div>
            </div>
        </Shell>
    );
}

export function ValidationShiftMap() {
    const [shift, setShift] = useState(35);
    const internalAuc = 0.88;
    const temporalAuc = Math.max(0.62, internalAuc - shift / 500);
    const externalAuc = Math.max(0.55, internalAuc - shift / 330);
    const calibrationError = 4 + Math.round(shift / 3);

    const rows = [
        { label: "Interne testset", auc: internalAuc, note: "zelfde centrum, zelfde periode" },
        { label: "Temporale validatie", auc: temporalAuc, note: "zelfde centrum, latere periode" },
        { label: "Externe validatie", auc: externalAuc, note: "ander centrum of ander systeem" },
    ];

    return (
        <Shell
            title="Validatieshift visual"
            subtitle="Simuleer wat er gebeurt wanneer populatie, apparatuur, protocol of datadefinitie verschuift. Een model kan intern sterk lijken en extern toch duidelijk terugvallen."
        >
            <label className="text-sm font-bold text-slate-800" htmlFor="validation-shift">
                Verschil tussen ontwikkelsetting en praktijk: {shift}%
                <input
                    id="validation-shift"
                    type="range"
                    min="0"
                    max="80"
                    value={shift}
                    onChange={(event) => setShift(Number(event.target.value))}
                    className="mt-3 w-full accent-brand-secondary"
                />
            </label>
            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                <div className="grid gap-3">
                    {rows.map((row) => (
                        <div key={row.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-slate-700">
                                <span>{row.label}</span>
                                <span className="tabular-nums">{formatNumber(row.auc, 2)}</span>
                            </div>
                            <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                                <div className="h-full rounded-full bg-brand-secondary" style={{ width: `${row.auc * 100}%` }} />
                            </div>
                            <p className="mt-2 text-xs leading-5 text-slate-500">{row.note}</p>
                        </div>
                    ))}
                </div>
                <div className="grid content-start gap-3">
                    <MetricCard label="Calibratiefout" value={`${calibrationError}%`} hint="groeit vaak mee met contextshift" />
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                        <strong>Check:</strong> vraag altijd of externe data echt onafhankelijk zijn: andere patienten, andere tijd en bij voorkeur een andere zorgomgeving.
                    </div>
                </div>
            </div>
        </Shell>
    );
}

export function FairnessAuditSimulator() {
    const [threshold, setThreshold] = useState(55);
    const groups = [
        { name: "Groep A", baseRisk: 0.32, sensitivity: 0.84 - threshold / 500, falseAlarm: 0.18 + (60 - threshold) / 700 },
        { name: "Groep B", baseRisk: 0.24, sensitivity: 0.76 - threshold / 650, falseAlarm: 0.28 + (60 - threshold) / 560 },
    ];

    return (
        <Shell
            title="Fairness audit simulator"
            subtitle="Een enkele totaalscore kan subgroepverschillen verbergen. Verschuif de drempel en vergelijk detectie en fout-positieve belasting per groep."
        >
            <label className="text-sm font-bold text-slate-800" htmlFor="fairness-threshold">
                Beslisdrempel: {threshold}%
                <input
                    id="fairness-threshold"
                    type="range"
                    min="25"
                    max="85"
                    value={threshold}
                    onChange={(event) => setThreshold(Number(event.target.value))}
                    className="mt-3 w-full accent-brand-secondary"
                />
            </label>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {groups.map((group) => {
                    const sensitivity = Math.max(0.45, Math.min(0.95, group.sensitivity));
                    const falseAlarm = Math.max(0.04, Math.min(0.55, group.falseAlarm));
                    const workload = Math.round(falseAlarm * (1 - group.baseRisk) * 1000);
                    return (
                        <div key={group.name} className="rounded-3xl border border-slate-200 bg-white p-5">
                            <h4 className="text-xl font-bold text-brand-dark">{group.name}</h4>
                            <div className="mt-4 grid gap-3">
                                <MetricCard label="Sensitiviteit" value={pct(sensitivity)} />
                                <MetricCard label="Fout-positieven / 1000" value={`${workload}`} />
                            </div>
                            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                                <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                                    <span>gemiste casussen</span>
                                    <span>{pct(1 - sensitivity)}</span>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-white">
                                    <div className="h-full rounded-full bg-rose-400" style={{ width: `${(1 - sensitivity) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Shell>
    );
}

export function DeploymentLadder() {
    const stages = [
        {
            label: "Retrospectief",
            goal: "Kan het model historisch signaal vinden?",
            check: "Datakwaliteit, leakage, externe validatie.",
        },
        {
            label: "Silent trial",
            goal: "Wat zou het model live hebben gezegd zonder impact op zorg?",
            check: "Timing, missing data, calibratie, drift.",
        },
        {
            label: "Shadow mode",
            goal: "Hoe reageren teams op zichtbare output zonder formele besluitimpact?",
            check: "Workflow, alarmmoeheid, uitleg, escalatiepad.",
        },
        {
            label: "Live",
            goal: "Levert het aantoonbaar betere zorg op?",
            check: "Prospectieve monitoring, incidenten, retraining, audit.",
        },
    ];
    const [active, setActive] = useState(1);

    return (
        <Shell
            title="Deployment ladder"
            subtitle="Klinische AI hoort stapsgewijs naar de praktijk te gaan. Elke trede heeft een andere bewijsvraag en andere veiligheidschecks."
        >
            <div className="grid gap-3 md:grid-cols-4">
                {stages.map((stage, index) => (
                    <button
                        key={stage.label}
                        type="button"
                        onClick={() => setActive(index)}
                        className={`rounded-2xl border p-4 text-left transition ${active === index ? "border-brand-secondary bg-brand-secondary/5" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Stap {index + 1}</span>
                        <span className="mt-1 block text-lg font-bold text-brand-dark">{stage.label}</span>
                    </button>
                ))}
            </div>
            <div className="mt-6 rounded-3xl border border-brand-secondary/20 bg-brand-secondary/5 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary">Bewijsvraag</p>
                <p className="mt-2 text-xl font-bold text-brand-dark">{stages[active].goal}</p>
                <p className="mt-4 text-sm font-bold text-slate-700">Minimale checks</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{stages[active].check}</p>
            </div>
        </Shell>
    );
}

export function WorkflowFailureMap() {
    const [lateOutput, setLateOutput] = useState(true);
    const [unclearOwner, setUnclearOwner] = useState(true);
    const [noFeedback, setNoFeedback] = useState(false);
    const [alertLoad, setAlertLoad] = useState(true);
    const risks = [lateOutput, unclearOwner, noFeedback, alertLoad].filter(Boolean).length;

    const items = [
        { label: "Output komt te laat", value: lateOutput, set: setLateOutput },
        { label: "Geen duidelijke eigenaar", value: unclearOwner, set: setUnclearOwner },
        { label: "Geen feedbackloop", value: noFeedback, set: setNoFeedback },
        { label: "Te veel alerts", value: alertLoad, set: setAlertLoad },
    ];

    return (
        <Shell
            title="Workflow failure map"
            subtitle="Veel AI-projecten falen niet door de modelarchitectuur, maar door timing, verantwoordelijkheid, uitleg en feedback in het zorgproces."
        >
            <div className="grid gap-3 md:grid-cols-2">
                {items.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        onClick={() => item.set(!item.value)}
                        className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${item.value ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"}`}
                    >
                        <span className="font-semibold text-slate-800">{item.label}</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.value ? "bg-white text-rose-700" : "bg-white text-emerald-700"}`}>
                            {item.value ? "risico" : "geborgd"}
                        </span>
                    </button>
                ))}
            </div>
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <MetricCard label="Workflow-risico" value={`${risks}/4`} hint={risks >= 3 ? "Eerst herontwerpen, daarna pas live." : "Nog steeds prospectief monitoren."} />
            </div>
        </Shell>
    );
}

export function LlmSafetyMatrix() {
    const tasks = [
        { label: "Samenvatten", risk: "Laag-middel", guardrail: "Bron tonen, onzekerheid tonen, arts blijft eindverantwoordelijk." },
        { label: "Triageadvies", risk: "Hoog", guardrail: "Alleen binnen gevalideerde workflow met escalatie en logging." },
        { label: "Medicatieadvies", risk: "Hoog", guardrail: "Koppeling aan lokale formularia, interactiecheck en menselijke accordering." },
        { label: "Patientbericht", risk: "Middel-hoog", guardrail: "Toon bron, vermijd diagnoseclaims, controleer toon en begrijpelijkheid." },
    ];
    const [active, setActive] = useState(0);

    return (
        <Shell
            title="LLM safety matrix"
            subtitle="Dezelfde taalmodeltechniek kan veilig of riskant zijn afhankelijk van taak, context, broncontrole en menselijke supervisie."
        >
            <div className="mb-5 flex flex-wrap gap-2">
                {tasks.map((task, index) => (
                    <button
                        key={task.label}
                        type="button"
                        onClick={() => setActive(index)}
                        className={`rounded-xl px-4 py-2 text-sm font-bold transition ${active === index ? "bg-brand-secondary text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                    >
                        {task.label}
                    </button>
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <MetricCard label="Risiconiveau" value={tasks[active].risk} />
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                    <strong>Minimale guardrail:</strong> {tasks[active].guardrail}
                </div>
            </div>
        </Shell>
    );
}

export function MdrClaimChecker() {
    const questions = [
        "Maakt de software een medische claim?",
        "Gebruikt de software patient-specifieke data?",
        "Beinvloedt de output diagnose, therapie, monitoring of prognose?",
        "Kan een fout leiden tot ernstige schade?",
        "Wordt het model na livegang inhoudelijk aangepast?",
        "Is er CE/FDA-documentatie voor precies deze use case?",
    ];
    const [answers, setAnswers] = useState<Record<number, boolean>>({});
    const score = Object.values(answers).filter(Boolean).length;
    const verdict = score >= 4 ? "Regulatory review nodig" : score >= 2 ? "Mogelijk MDSW/SaMD" : "Waarschijnlijk laag risico of buiten scope";

    return (
        <Shell
            title="MDR / AI claim-checker"
            subtitle="Een snelle beslisboom voor leverancierclaims. De uitkomst is geen classificatie, maar een lijst met vragen voor regulatory en legal review."
        >
            <div className="grid gap-3">
                {questions.map((question, index) => (
                    <div key={question} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                        <span className="font-semibold text-slate-800">{question}</span>
                        <div className="flex gap-2">
                            {[true, false].map((value) => (
                                <button
                                    key={String(value)}
                                    type="button"
                                    onClick={() => setAnswers((prev) => ({ ...prev, [index]: value }))}
                                    className={`rounded-xl px-4 py-2 text-sm font-bold transition ${answers[index] === value ? "bg-brand-secondary text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                                >
                                    {value ? "Ja" : "Nee"}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 rounded-3xl border border-brand-secondary/20 bg-brand-secondary/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary">Educatieve uitkomst</p>
                <p className="mt-1 text-2xl font-bold text-brand-dark">{verdict}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Beoordeel altijd de exacte intended purpose, versie, gebruikersgroep, workflow en lokale context.
                </p>
            </div>
        </Shell>
    );
}

export function RagChunkingDemo() {
    const [chunkSize, setChunkSize] = useState<"small" | "medium" | "large">("medium");
    const chunks = {
        small: [
            "Start antistolling rond ingreep volgens lokaal protocol.",
            "Uitzondering: hoog bloedingsrisico vereist specialistische afweging.",
            "Controleer nierfunctie bij DOAC-gebruik.",
        ],
        medium: [
            "Bij antistolling rond een ingreep: weeg tromboserisico en bloedingsrisico. Uitzondering: hoog bloedingsrisico vereist specialistische afweging.",
            "Controleer nierfunctie bij DOAC-gebruik en volg het lokale protocol voor stop- en herstartmomenten.",
        ],
        large: [
            "Protocolsamenvatting: antistolling rond ingrepen vraagt beoordeling van tromboserisico, bloedingsrisico, nierfunctie, type middel, lokale afspraken, stopmoment, herstartmoment en uitzonderingen. Bij hoog bloedingsrisico is specialistische afweging nodig.",
        ],
    };
    const risk = chunkSize === "small" ? "Mist sneller context en uitzonderingen." : chunkSize === "large" ? "Kan minder precies ophalen en irrelevante tekst meenemen." : "Balans tussen context en precisie.";

    return (
        <Shell
            title="RAG chunking-demo"
            subtitle="Chunkgrootte bepaalt wat het taalmodel als context meekrijgt. Te klein mist uitzonderingen; te groot kan ruis toevoegen."
        >
            <div className="mb-5 flex flex-wrap gap-2">
                {(["small", "medium", "large"] as const).map((size) => (
                    <button
                        key={size}
                        type="button"
                        onClick={() => setChunkSize(size)}
                        className={`rounded-xl px-4 py-2 text-sm font-bold capitalize transition ${chunkSize === size ? "bg-brand-secondary text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                    >
                        {size}
                    </button>
                ))}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Search size={17} />
                    Vraag: wat zegt het protocol over antistolling rond een ingreep?
                </div>
                <div className="grid gap-3">
                    {chunks[chunkSize].map((chunk, index) => (
                        <div key={chunk} className="rounded-xl border border-white bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                            <span className="mr-2 rounded-md bg-brand-primary/10 px-2 py-1 text-xs font-bold text-brand-primary">chunk {index + 1}</span>
                            {chunk}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                <strong>Risico:</strong> {risk}
            </div>
        </Shell>
    );
}

export function VisualPolicyCard() {
    return (
        <Shell
            title="Image en visual policy"
            subtitle="Gebruik dit blok als interne reminder voordat een artikel live gaat met figuren, screenshots of embeds."
        >
            <div className="grid gap-3 md:grid-cols-3">
                <MetricCard label="1" value="Maak zelf" hint="SVG/React-figuren met eigen fictieve data." />
                <MetricCard label="2" value="Check licentie" hint="Gebruik externe beelden alleen met duidelijke rechten." />
                <MetricCard label="3" value="Bron erbij" hint="Caption noemt bron, datum en of het om een adaptatie gaat." />
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                    <CheckCircle2 className="mb-2" size={20} />
                    Primaire bronnen: FDA, EU/MDCG, WHO, NICE, NIST, EQUATOR.
                </div>
                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
                    <ShieldCheck className="mb-2" size={20} />
                    Interacties gebruiken fictieve data en duidelijke disclaimers.
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                    <AlertTriangle className="mb-2" size={20} />
                    Geen patientdata, geen diagnostische output, geen onduidelijke screenshots.
                </div>
            </div>
        </Shell>
    );
}

export function PrivacyArchitectureMap() {
    const cards: Array<{ title: string; text: string; Icon: LucideIcon }> = [
        { title: "Cloud", text: "Verwerkersafspraak, datalocatie, logging, DPIA, exitplan.", Icon: LockKeyhole },
        { title: "On-premise", text: "Lokale controle, maar nog steeds modelupdates, access control en monitoring.", Icon: ShieldCheck },
        { title: "Federated learning", text: "Data blijft lokaal, maar gradients/modelupdates kunnen nog privacyrisico dragen.", Icon: FlaskConical },
    ];

    return (
        <Shell
            title="Privacykaart voor medische AI"
            subtitle="Een visuele checklist voor cloud, on-premise en federated learning."
        >
            <div className="grid gap-4 md:grid-cols-3">
                {cards.map(({ title, text, Icon }) => (
                    <div key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <Icon size={24} className="mb-3 text-brand-secondary" />
                        <h4 className="text-lg font-bold text-brand-dark">{title}</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                ))}
            </div>
        </Shell>
    );
}
