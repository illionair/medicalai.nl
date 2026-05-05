"use client";

import { useId, useMemo, useState } from "react";
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

type AucPoint = {
    score: number;
    outcome: 0 | 1;
    id: string;
};

type AucDatasetId = "separated" | "unseparated" | "imbalanced";

type AucDataset = {
    id: AucDatasetId;
    label: string;
    shortLabel: string;
    description: string;
    clinicalHint: string;
    defaultThreshold: number;
    points: AucPoint[];
};

function makeAucPoints(negativeScores: number[], positiveScores: number[]): AucPoint[] {
    return [
        ...negativeScores.map((score, index) => ({ id: `n-${index}`, score, outcome: 0 as const })),
        ...positiveScores.map((score, index) => ({ id: `p-${index}`, score, outcome: 1 as const })),
    ].sort((a, b) => a.score - b.score || a.outcome - b.outcome);
}

const AUC_DATASETS: Record<AucDatasetId, AucDataset> = {
    separated: {
        id: "separated",
        label: "Goed gescheiden",
        shortLabel: "Gescheiden",
        description: "Bijna alle patiënten mét de uitkomst krijgen duidelijk hogere scores dan patiënten zonder de uitkomst.",
        clinicalHint: "Mooi voor uitleg, maar in echte klinische data zelden zo netjes.",
        defaultThreshold: 55,
        points: makeAucPoints(
            [0.04, 0.07, 0.1, 0.13, 0.16, 0.18, 0.21, 0.24, 0.27, 0.3, 0.33, 0.36, 0.39, 0.42, 0.45],
            [0.58, 0.61, 0.64, 0.67, 0.7, 0.73, 0.76, 0.79, 0.82, 0.85, 0.88, 0.91, 0.93, 0.95, 0.97],
        ),
    },
    unseparated: {
        id: "unseparated",
        label: "Overlap",
        shortLabel: "Overlap",
        description: "De groepen schuiven door elkaar: er is signaal, maar sommige patiënten zonder uitkomst scoren hoger dan echte gevallen.",
        clinicalHint: "Dit lijkt meer op praktijkdata: AUC kan redelijk zijn, terwijl drempelkeuze veel uitmaakt.",
        defaultThreshold: 58,
        points: makeAucPoints(
            [0.02, 0.05, 0.07, 0.07, 0.1, 0.13, 0.15, 0.18, 0.2, 0.2, 0.22, 0.24, 0.27, 0.31, 0.34, 0.37, 0.4, 0.43, 0.43, 0.48, 0.51, 0.53, 0.56, 0.58, 0.6, 0.63, 0.66, 0.69, 0.72, 0.75, 0.79, 0.82, 0.86, 0.89, 0.92, 0.96],
            [0.29, 0.34, 0.37, 0.38, 0.38, 0.43, 0.45, 0.5, 0.55, 0.59, 0.59, 0.62, 0.62, 0.62, 0.67, 0.7, 0.7, 0.75, 0.75, 0.8, 0.84, 0.87, 0.87, 0.91, 0.96, 0.98],
        ),
    },
    imbalanced: {
        id: "imbalanced",
        label: "Scheef verdeeld",
        shortLabel: "Imbalanced",
        description: "De uitkomst is zeldzamer. De rangorde kan nog bruikbaar zijn, maar positief voorspellende waarde zakt snel bij vals alarm.",
        clinicalHint: "Belangrijk voor screening en triage: veel oranje punten betekent dat PPV kwetsbaar is.",
        defaultThreshold: 68,
        points: makeAucPoints(
            [0.01, 0.03, 0.04, 0.06, 0.08, 0.1, 0.11, 0.13, 0.14, 0.16, 0.18, 0.2, 0.21, 0.23, 0.25, 0.27, 0.29, 0.31, 0.33, 0.35, 0.37, 0.39, 0.41, 0.43, 0.45, 0.47, 0.49, 0.51, 0.53, 0.55, 0.58, 0.6, 0.62, 0.64, 0.66, 0.69, 0.72, 0.75, 0.79, 0.83, 0.88, 0.92],
            [0.38, 0.52, 0.64, 0.7, 0.77, 0.82, 0.9, 0.96],
        ),
    },
};

const DEFAULT_AUC_DATASET_ID: AucDatasetId = "unseparated";
const AUC_POINTS = AUC_DATASETS[DEFAULT_AUC_DATASET_ID].points;

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

function thresholdStats(cut: number, points: AucPoint[] = AUC_POINTS) {
    const positives = points.filter((point) => point.outcome === 1).length;
    const negatives = points.length - positives;
    const predicted = points.map((point) => ({ ...point, positive: point.score >= cut }));
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

function rocPath(points: AucPoint[] = AUC_POINTS) {
    const thresholds = [1.01, ...Array.from(new Set(points.map((point) => point.score))).sort((a, b) => b - a), -0.01];
    return thresholds.map((threshold) => {
        const stats = thresholdStats(threshold, points);
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

function aucForPoints(points: AucPoint[]) {
    return areaUnderCurve(rocPath(points));
}

function getThresholdMarkers(points: AucPoint[]) {
    return [75, 55, 35].map((markerThreshold) => ({
        label: markerThreshold === 75 ? "A" : markerThreshold === 55 ? "B" : "C",
        threshold: markerThreshold,
        stats: thresholdStats(markerThreshold / 100, points),
    }));
}

function DatasetSelector({
    selected,
    onChange,
}: {
    selected: AucDatasetId;
    onChange: (id: AucDatasetId) => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-2">
            <div className="grid gap-2 sm:grid-cols-3">
                {Object.values(AUC_DATASETS).map((dataset) => {
                    const active = dataset.id === selected;
                    return (
                        <button
                            key={dataset.id}
                            type="button"
                            onClick={() => onChange(dataset.id)}
                            className={
                                "rounded-xl border px-3 py-2 text-left text-sm font-bold transition " +
                                (active
                                    ? "border-brand-primary bg-brand-primary text-white shadow-sm"
                                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-brand-primary/40 hover:bg-white")
                            }
                            aria-pressed={active}
                        >
                            {dataset.shortLabel}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function ScoreDistributionPlot({
    points,
    threshold,
    showThreshold = false,
    height = 190,
}: {
    points: AucPoint[];
    threshold?: number;
    showThreshold?: boolean;
    height?: number;
}) {
    const gradientId = useId().replace(/:/g, "");
    const plotLeft = 22;
    const plotRight = 478;
    const plotWidth = plotRight - plotLeft;
    const axisY = height - 24;
    const markerSize = points.length > 50 ? 12 : 14;
    const stackGap = points.length > 50 ? 12 : 14;
    const stackCounts = new Map<string, number>();
    const sorted = [...points].sort((a, b) => a.score - b.score || a.outcome - b.outcome || a.id.localeCompare(b.id));
    const stacked = sorted.map((point) => {
        const bucket = Math.round(point.score * 40).toString();
        const stack = stackCounts.get(bucket) ?? 0;
        stackCounts.set(bucket, stack + 1);
        return {
            ...point,
            x: plotLeft + point.score * plotWidth,
            y: axisY - 14 - stack * stackGap,
            predictedPositive: threshold === undefined ? false : point.score >= threshold,
        };
    });
    const thresholdX = threshold === undefined ? plotLeft : plotLeft + threshold * plotWidth;

    return (
        <svg viewBox={`0 0 500 ${height}`} className="h-auto w-full" role="img" aria-label="Verdeling van modelscores per echte uitkomst">
            <defs>
                <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="55%" stopColor="#fff7ed" />
                    <stop offset="100%" stopColor="#f5f3ff" />
                </linearGradient>
            </defs>
            <rect x="10" y="12" width="480" height={height - 44} rx="12" fill={`url(#${gradientId})`} />
            {showThreshold && threshold !== undefined && (
                <>
                    <rect x={thresholdX} y="12" width={plotRight - thresholdX} height={height - 44} fill="#6d28d9" opacity="0.08" />
                    <line x1={thresholdX} y1="12" x2={thresholdX} y2={axisY + 8} stroke="#0059b5" strokeWidth="2.5" />
                    <text x={Math.min(438, thresholdX + 8)} y="30" className="fill-brand-primary text-[11px] font-black">
                        drempel {Math.round(threshold * 100)}%
                    </text>
                </>
            )}
            {stacked.map((point) =>
                point.outcome === 1 ? (
                    <g key={point.id} opacity={showThreshold && !point.predictedPositive ? 0.72 : 1}>
                        <rect
                            x={point.x - markerSize / 2}
                            y={point.y - markerSize / 2}
                            width={markerSize}
                            height={markerSize}
                            rx="2"
                            fill="#7c3aed"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                        />
                        <path
                            d={`M${point.x - markerSize / 3},${point.y - markerSize / 3} L${point.x + markerSize / 3},${point.y + markerSize / 3} M${point.x + markerSize / 3},${point.y - markerSize / 3} L${point.x - markerSize / 3},${point.y + markerSize / 3}`}
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </g>
                ) : (
                    <circle
                        key={point.id}
                        cx={point.x}
                        cy={point.y}
                        r={markerSize / 2}
                        fill="#f59e0b"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        opacity={showThreshold && !point.predictedPositive ? 0.72 : 1}
                    />
                ),
            )}
            <line x1={plotLeft} y1={axisY} x2={plotRight} y2={axisY} stroke="#94a3b8" strokeWidth="1.5" />
            {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
                const x = plotLeft + tick * plotWidth;
                return (
                    <g key={tick}>
                        <line x1={x} y1={axisY} x2={x} y2={axisY + 6} stroke="#94a3b8" />
                        <text x={x} y={axisY + 18} textAnchor="middle" className="fill-slate-500 text-[10px]">
                            {formatDecimal(tick)}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export function AucPlayground() {
    const [threshold, setThreshold] = useState(55);
    const [pairIndex, setPairIndex] = useState(0);
    const points = AUC_DATASETS[DEFAULT_AUC_DATASET_ID].points;

    const metrics = useMemo(() => {
        return thresholdStats(threshold / 100, points);
    }, [points, threshold]);

    const path = useMemo(() => rocPath(points), [points]);
    const auc = useMemo(() => areaUnderCurve(path), [path]);
    const pairs = useMemo(() => {
        const positives = points.filter((point) => point.outcome === 1);
        const negatives = points.filter((point) => point.outcome === 0);
        return positives.flatMap((positive, positiveIndex) =>
            negatives.map((negative, negativeIndex) => ({
                id: `${positiveIndex}-${negativeIndex}`,
                positive,
                negative,
                correct: positive.score > negative.score,
                tied: positive.score === negative.score,
            })),
        );
    }, [points]);
    const correctPairs = pairs.filter((pair) => pair.correct).length;
    const tiedPairs = pairs.filter((pair) => pair.tied).length;
    const pair = pairs[pairIndex % pairs.length];
    const thresholdMarkers = getThresholdMarkers(points);
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
                            <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                                <span>negatief voorspeld</span>
                                <span className="rounded-full bg-white px-2 py-1 text-brand-primary shadow-sm">drempel {threshold}%</span>
                                <span className="text-right">positief voorspeld</span>
                            </div>
                            <ScoreDistributionPlot points={points} threshold={threshold / 100} showThreshold height={180} />
                            <p className="mt-3 text-xs leading-5 text-slate-500">
                                Elke marker is een fictieve patiënt. Paars is de uitkomst aanwezig; oranje is geen uitkomst. Rechts van de drempel wordt het model positief.
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
    const [datasetId, setDatasetId] = useState<AucDatasetId>(DEFAULT_AUC_DATASET_ID);
    const dataset = AUC_DATASETS[datasetId];
    const positives = dataset.points.filter((p) => p.outcome === 1);
    const negatives = dataset.points.filter((p) => p.outcome === 0);
    const meanPos = positives.reduce((s, p) => s + p.score, 0) / positives.length;
    const meanNeg = negatives.reduce((s, p) => s + p.score, 0) / negatives.length;
    const auc = aucForPoints(dataset.points);

    return (
        <Shell
            title="Patiënten op één score-as"
            subtitle="Het model kent elke patiënt een score tussen 0 en 1 toe. De paarse vierkantjes zijn patiënten mét uitkomst; de oranje rondjes zonder. AUC kijkt of paars meestal rechts van oranje ligt."
        >
            <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-3">
                    <DatasetSelector selected={datasetId} onChange={setDatasetId} />
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Dataset</p>
                        <p className="mt-2 text-sm font-bold text-brand-dark">{dataset.label}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{dataset.description}</p>
                        <p className="mt-3 text-xs leading-5 text-slate-500">{dataset.clinicalHint}</p>
                    </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        <span>score 0: laag risico</span>
                        <span>score 1: hoog risico</span>
                    </div>
                    <ScoreDistributionPlot points={dataset.points} />
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-2">
                            <span className="inline-block h-3 w-3 rounded-full bg-amber-500" />
                            geen uitkomst
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <span className="inline-block h-3 w-3 rounded-sm bg-violet-600" />
                            uitkomst aanwezig
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <MetricCard label="AUC" value={formatDecimal(auc)} hint="rangschikkingskans" />
                <MetricCard label="Gemiddelde score positieven" value={formatDecimal(meanPos)} hint={`${positives.length} patiënten met de uitkomst`} />
                <MetricCard label="Gemiddelde score negatieven" value={formatDecimal(meanNeg)} hint={`${negatives.length} patiënten zonder de uitkomst`} />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
                De verticale stapeling betekent alleen: meerdere patiënten hebben bijna dezelfde score. De horizontale volgorde is het belangrijkst: hoe vaker een paarse patiënt rechts van een oranje patiënt staat, hoe hoger de AUC.
            </p>
        </Shell>
    );
}

export function AucThreshold({
    initialThreshold = 0.55,
    showHint = false,
}: {
    initialThreshold?: number;
    showHint?: boolean;
} = {}) {
    const clamped = Math.round(Math.min(0.95, Math.max(0.05, initialThreshold)) * 100);
    const [datasetId, setDatasetId] = useState<AucDatasetId>(DEFAULT_AUC_DATASET_ID);
    const dataset = AUC_DATASETS[datasetId];
    const [threshold, setThreshold] = useState(clamped);
    const thresholdValue = threshold / 100;
    const metrics = useMemo(() => thresholdStats(thresholdValue, dataset.points), [dataset.points, thresholdValue]);
    const auc = useMemo(() => aucForPoints(dataset.points), [dataset.points]);

    function handleDatasetChange(id: AucDatasetId) {
        setDatasetId(id);
        setThreshold(AUC_DATASETS[id].defaultThreshold);
    }

    return (
        <Shell
            title="Verschuif de drempel"
            subtitle="Kies een dataset en sleep de drempel. Alles rechts van de lijn voorspelt het model positief; de score-as blijft zichtbaar zodat je ziet waarom de matrix verandert."
        >
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
                    <div className="space-y-3">
                        <DatasetSelector selected={datasetId} onChange={handleDatasetChange} />
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Huidige dataset</p>
                            <p className="mt-2 text-sm font-bold text-brand-dark">{dataset.label}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{dataset.description}</p>
                            {(showHint || datasetId === "imbalanced") && (
                                <p className="mt-3 text-xs leading-5 text-slate-500">{dataset.clinicalHint}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <MetricCard label="AUC" value={formatDecimal(auc)} hint="blijft drempelvrij" />
                            <MetricCard label="Drempel" value={`${threshold}%`} hint="bepaalt de actie" />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white bg-white p-4 sm:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <label className="text-sm font-bold text-slate-800" htmlFor="auc-thr-threshold">
                                Beslisdrempel
                            </label>
                            <span className="rounded-full bg-brand-primary px-3 py-1 text-sm font-black tabular-nums text-white shadow-sm">
                                {threshold}%
                            </span>
                        </div>
                        <input
                            id="auc-thr-threshold"
                            type="range"
                            min="5"
                            max="95"
                            value={threshold}
                            onChange={(event) => setThreshold(Number(event.target.value))}
                            className="mt-3 w-full accent-brand-secondary"
                        />
                        <div className="mt-4 grid grid-cols-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                            <span>voorspelt geen uitkomst</span>
                            <span className="text-right">voorspelt uitkomst</span>
                        </div>
                        <ScoreDistributionPlot points={dataset.points} threshold={thresholdValue} showThreshold height={210} />
                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
                            <span className="inline-flex items-center gap-2">
                                <span className="inline-block h-3 w-3 rounded-full bg-amber-500" />
                                werkelijk geen uitkomst
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="inline-block h-3 w-3 rounded-sm bg-violet-600" />
                                werkelijk uitkomst
                            </span>
                            <span className="inline-flex items-center gap-2 text-brand-primary">
                                rechts van de lijn = alarm
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Confusion matrix bij deze drempel</p>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="grid grid-cols-[auto_1fr_1fr]">
                        <div className="border-b border-slate-200 bg-slate-50" />
                        <div className="border-b border-r border-slate-200 bg-slate-50 p-3 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
                            voorspelt geen uitkomst
                        </div>
                        <div className="border-b border-slate-200 bg-slate-50 p-3 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
                            voorspelt uitkomst
                        </div>

                        <div className="flex items-center justify-end border-b border-slate-200 bg-slate-50 p-3 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-violet-700">
                            <span className="mr-2 inline-block h-3 w-3 rounded-sm bg-violet-600" />
                            werkelijk uitkomst
                        </div>
                        <div className="border-b border-r border-slate-200 bg-amber-50 p-4 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700">FN — gemist</p>
                            <p className="mt-1 text-3xl font-black tabular-nums text-amber-900">{metrics.fn}</p>
                        </div>
                        <div className="border-b border-slate-200 bg-emerald-50 p-4 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">TP — terecht actie</p>
                            <p className="mt-1 text-3xl font-black tabular-nums text-emerald-900">{metrics.tp}</p>
                        </div>

                        <div className="flex items-center justify-end bg-slate-50 p-3 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700">
                            <span className="mr-2 inline-block h-3 w-3 rounded-full bg-amber-500" />
                            werkelijk geen uitkomst
                        </div>
                        <div className="border-r border-slate-200 bg-slate-50 p-4 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">TN — terecht rust</p>
                            <p className="mt-1 text-3xl font-black tabular-nums text-slate-800">{metrics.tn}</p>
                        </div>
                        <div className="bg-rose-50 p-4 text-center">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-rose-700">FP — vals alarm</p>
                            <p className="mt-1 text-3xl font-black tabular-nums text-rose-900">{metrics.fp}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard label="Sensitiviteit" value={pct(metrics.sensitivity)} hint="hoeveel echte gevallen vang je?" />
                <MetricCard label="Specificiteit" value={pct(metrics.specificity)} hint="hoeveel gezonden blijven met rust?" />
                <MetricCard label="PPV" value={pct(metrics.ppv)} hint="alarm: hoe vaak terecht?" />
                <MetricCard label="NPV" value={pct(metrics.npv)} hint="rust: hoe vaak terecht?" />
            </div>
        </Shell>
    );
}

export function AucRoc() {
    const [datasetId, setDatasetId] = useState<AucDatasetId>(DEFAULT_AUC_DATASET_ID);
    const dataset = AUC_DATASETS[datasetId];
    const [threshold, setThreshold] = useState(dataset.defaultThreshold);
    const metrics = useMemo(() => thresholdStats(threshold / 100, dataset.points), [dataset.points, threshold]);
    const path = useMemo(() => rocPath(dataset.points), [dataset.points]);
    const auc = useMemo(() => areaUnderCurve(path), [path]);
    const linePoints = path.map((point) => {
        const pointOnSvg = svgPoint(point);
        return `${pointOnSvg.x},${pointOnSvg.y}`;
    });
    const areaPoints = ["24,236", ...linePoints, "236,236"].join(" ");
    const currentX = 24 + (1 - metrics.specificity) * 212;
    const currentY = 236 - metrics.sensitivity * 212;
    const thresholdMarkers = getThresholdMarkers(dataset.points);

    function handleDatasetChange(id: AucDatasetId) {
        setDatasetId(id);
        setThreshold(AUC_DATASETS[id].defaultThreshold);
    }

    return (
        <Shell
            title="ROC: kaart van alle drempels"
            subtitle="Elk punt op de curve hoort bij één drempel. Schuif hieronder en zie waar je op de kaart belandt."
        >
            <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 via-white to-brand-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-secondary">Oppervlakte onder de curve</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                        Vat alle drempels samen in één getal. Hoe dichter bij 1, hoe beter het model rangschikt. Dataset: <strong>{dataset.shortLabel}</strong>.
                    </p>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">AUC</p>
                    <p className="text-5xl font-black tabular-nums leading-none text-brand-dark sm:text-6xl">
                        {formatDecimal(auc)}
                    </p>
                </div>
            </div>
            <div className="mb-6">
                <DatasetSelector selected={datasetId} onChange={handleDatasetChange} />
            </div>
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
                    <div className="mt-5 rounded-2xl border border-white bg-white p-3">
                        <ScoreDistributionPlot points={dataset.points} threshold={threshold / 100} showThreshold height={150} />
                    </div>
                    <p className="mt-4 text-xs leading-5 text-slate-500">
                        Het groene puntje rechts beweegt mee. A, B en C zijn vaste drempels: A streng, B gemiddeld, C ruim. Linksboven is sterker, maar wat klopt hangt af van wat de fout kost.
                    </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                        <LineChart size={18} />
                        ROC-ruimte
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

type PairTrial = {
    id: number;
    positiveScore: number;
    negativeScore: number;
    result: "correct" | "wrong" | "tie";
};

export function AucPairs() {
    const [datasetId, setDatasetId] = useState<AucDatasetId>(DEFAULT_AUC_DATASET_ID);
    const dataset = AUC_DATASETS[datasetId];
    const path = useMemo(() => rocPath(dataset.points), [dataset.points]);
    const auc = useMemo(() => areaUnderCurve(path), [path]);
    const positives = useMemo(() => dataset.points.filter((point) => point.outcome === 1), [dataset.points]);
    const negatives = useMemo(() => dataset.points.filter((point) => point.outcome === 0), [dataset.points]);
    const allPairs = useMemo(() => {
        return positives.flatMap((positive) =>
            negatives.map((negative) => ({
                positive,
                negative,
                correct: positive.score > negative.score,
                tied: positive.score === negative.score,
            })),
        );
    }, [positives, negatives]);
    const correctPairs = allPairs.filter((p) => p.correct).length;
    const tiedPairs = allPairs.filter((p) => p.tied).length;
    const trueRankProb = (correctPairs + tiedPairs * 0.5) / allPairs.length;

    const [trials, setTrials] = useState<PairTrial[]>([]);

    function handleDatasetChange(id: AucDatasetId) {
        setDatasetId(id);
        setTrials([]);
    }

    function drawPair() {
        const positive = positives[Math.floor(Math.random() * positives.length)];
        const negative = negatives[Math.floor(Math.random() * negatives.length)];
        const result: PairTrial["result"] =
            positive.score === negative.score
                ? "tie"
                : positive.score > negative.score
                    ? "correct"
                    : "wrong";
        setTrials((prev) => [
            { id: prev.length, positiveScore: positive.score, negativeScore: negative.score, result },
            ...prev,
        ]);
    }

    function drawMany(n: number) {
        const draws: PairTrial[] = [];
        const startId = trials.length;
        for (let i = 0; i < n; i++) {
            const positive = positives[Math.floor(Math.random() * positives.length)];
            const negative = negatives[Math.floor(Math.random() * negatives.length)];
            const result: PairTrial["result"] =
                positive.score === negative.score
                    ? "tie"
                    : positive.score > negative.score
                        ? "correct"
                        : "wrong";
            draws.push({ id: startId + i, positiveScore: positive.score, negativeScore: negative.score, result });
        }
        setTrials((prev) => [...draws.reverse(), ...prev]);
    }

    function reset() {
        setTrials([]);
    }

    const totalTries = trials.length;
    const correctCount = trials.filter((t) => t.result === "correct").length;
    const tieCount = trials.filter((t) => t.result === "tie").length;
    const runningAuc = totalTries === 0 ? 0 : (correctCount + tieCount * 0.5) / totalTries;
    const lastTrial = trials[0];

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
            label: dataset.shortLabel,
            auc: formatDecimal(auc),
            points: path,
            note: "een paar paren gaan fout",
        },
    ];

    return (
        <Shell
            title="AUC als rangordespel"
            subtitle="Pak willekeurig één patiënt mét uitkomst en één zonder. Geeft het model de juiste de hogere score? Trek genoeg paren en het percentage 'goed' kruipt naar AUC."
        >
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="mb-5 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
                    <DatasetSelector selected={datasetId} onChange={handleDatasetChange} />
                    <div className="rounded-2xl border border-white bg-white p-4 text-sm leading-6 text-slate-600">
                        <strong className="text-brand-dark">{dataset.label}:</strong> {dataset.description}
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-bold text-slate-800">Trek willekeurige paren</p>
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-100"
                    >
                        <RotateCcw size={13} /> reset
                    </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={drawPair}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-secondary"
                    >
                        Trek 1 paar
                    </button>
                    <button
                        type="button"
                        onClick={() => drawMany(10)}
                        className="inline-flex items-center gap-2 rounded-xl border border-brand-primary/30 bg-white px-4 py-2.5 text-sm font-bold text-brand-primary hover:bg-brand-primary/5"
                    >
                        Trek 10 paren
                    </button>
                    <button
                        type="button"
                        onClick={() => drawMany(100)}
                        className="inline-flex items-center gap-2 rounded-xl border border-brand-primary/30 bg-white px-4 py-2.5 text-sm font-bold text-brand-primary hover:bg-brand-primary/5"
                    >
                        Trek 100 paren
                    </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Stand zo ver</p>
                        <p className="mt-2 text-4xl font-black tabular-nums text-brand-dark">
                            {totalTries === 0 ? "—" : formatDecimal(runningAuc)}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                            {totalTries === 0
                                ? "Trek paren om te zien hoe de score zich ontwikkelt."
                                : `${correctCount} goed van ${totalTries} ${totalTries === 1 ? "trekking" : "trekkingen"}${tieCount ? ` (${tieCount} gelijk)` : ""}`}
                        </p>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-brand-secondary transition-all"
                                style={{ width: totalTries === 0 ? "0%" : `${runningAuc * 100}%` }}
                            />
                        </div>
                        <p className="mt-3 text-xs text-slate-500">
                            Echte AUC over alle {allPairs.length} paren: <strong>{formatDecimal(trueRankProb)}</strong>. Hoe meer trekkingen, hoe dichter je daarbij komt.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Laatste trekking</p>
                        {lastTrial ? (
                            <>
                                <div className="mt-3 flex items-center justify-between gap-3">
                                    <div className="flex-1 rounded-xl bg-emerald-50 p-3 text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">+ uitkomst</p>
                                        <p className="mt-1 text-2xl font-black tabular-nums text-emerald-900">
                                            {Math.round(lastTrial.positiveScore * 100)}%
                                        </p>
                                    </div>
                                    <span className="text-2xl font-black text-slate-400">vs</span>
                                    <div className="flex-1 rounded-xl bg-slate-100 p-3 text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">− geen uitkomst</p>
                                        <p className="mt-1 text-2xl font-black tabular-nums text-slate-800">
                                            {Math.round(lastTrial.negativeScore * 100)}%
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={
                                        "mt-3 rounded-xl p-3 text-sm font-bold " +
                                        (lastTrial.result === "correct"
                                            ? "bg-emerald-100 text-emerald-900"
                                            : lastTrial.result === "tie"
                                                ? "bg-slate-100 text-slate-700"
                                                : "bg-rose-100 text-rose-900")
                                    }
                                >
                                    {lastTrial.result === "correct" && "✓ Goed: + scoort hoger"}
                                    {lastTrial.result === "wrong" && "✗ Fout: − scoort hoger"}
                                    {lastTrial.result === "tie" && "= Gelijk: telt voor de helft"}
                                </div>
                            </>
                        ) : (
                            <p className="mt-3 text-sm text-slate-500">Nog geen paar getrokken.</p>
                        )}
                    </div>
                </div>

                {trials.length > 0 && (
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Laatste 30 trekkingen</p>
                        <div className="mt-3 flex flex-wrap gap-1">
                            {trials.slice(0, 30).map((t) => (
                                <span
                                    key={t.id}
                                    title={`+${Math.round(t.positiveScore * 100)}% vs −${Math.round(t.negativeScore * 100)}%`}
                                    className={
                                        "inline-block h-4 w-4 rounded-sm " +
                                        (t.result === "correct"
                                            ? "bg-emerald-400"
                                            : t.result === "tie"
                                                ? "bg-slate-300"
                                                : "bg-rose-400")
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}
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

export function DataLeakageSimulator(_props: { scenario?: string; startToggles?: string[] } = {}) {
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

export function FairnessAuditSimulator(_props: { scenario?: string; focusGroup?: string } = {}) {
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

type TuningModelKey = "Neuraal netwerk" | "Random forest" | "XGBoost" | "CNN";

const TUNING_MODELS: Record<TuningModelKey, {
    metaphor: string;
    complexityLabel: string;
    tempoLabel: string;
    regularizationLabel: string;
    examples: string[];
    idealComplexity: number;
    idealTempo: number;
    idealRegularization: number;
}> = {
    "Neuraal netwerk": {
        metaphor: "Een flexibel netwerk dat tussenrepresentaties leert. De kunst is genoeg capaciteit geven zonder trainingsdata uit het hoofd te leren.",
        complexityLabel: "lagen en neuronen",
        tempoLabel: "learning rate",
        regularizationLabel: "dropout / weight decay",
        examples: ["aantal hidden layers", "units per laag", "learning rate", "batch size", "dropout"],
        idealComplexity: 58,
        idealTempo: 42,
        idealRegularization: 52,
    },
    "Random forest": {
        metaphor: "Veel beslisbomen stemmen samen. Tuning bepaalt hoe diep bomen mogen denken en hoeveel variatie ze krijgen.",
        complexityLabel: "boomdiepte",
        tempoLabel: "aantal bomen",
        regularizationLabel: "min. samples per blad",
        examples: ["n_estimators", "max_depth", "min_samples_leaf", "max_features", "class_weight"],
        idealComplexity: 48,
        idealTempo: 62,
        idealRegularization: 58,
    },
    XGBoost: {
        metaphor: "Een reeks kleine bomen die elkaar corrigeren. Sterk op tabulaire data, maar gevoelig voor te gretig leren.",
        complexityLabel: "max_depth",
        tempoLabel: "learning_rate / eta",
        regularizationLabel: "gamma, alpha, lambda",
        examples: ["learning_rate", "n_estimators", "max_depth", "subsample", "reg_lambda"],
        idealComplexity: 44,
        idealTempo: 35,
        idealRegularization: 64,
    },
    CNN: {
        metaphor: "Een beeldmodel dat eerst lokale patronen leert en die laag voor laag combineert tot grotere structuren.",
        complexityLabel: "filters en blokken",
        tempoLabel: "learning rate",
        regularizationLabel: "augmentatie / dropout",
        examples: ["aantal filters", "kernel size", "convolutionele blokken", "pooling", "data augmentation"],
        idealComplexity: 64,
        idealTempo: 38,
        idealRegularization: 68,
    },
};

function tuningOutcome(model: TuningModelKey, complexity: number, tempo: number, regularization: number) {
    const profile = TUNING_MODELS[model];
    const distance =
        Math.abs(complexity - profile.idealComplexity) * 0.28 +
        Math.abs(tempo - profile.idealTempo) * 0.22 +
        Math.abs(regularization - profile.idealRegularization) * 0.2;
    const overfit = Math.max(0, complexity - regularization - 15) + Math.max(0, tempo - 70) * 0.5;
    const underfit = Math.max(0, regularization - complexity - 28) + Math.max(0, 18 - tempo) * 0.7;
    const train = Math.min(96, Math.max(55, 61 + complexity * 0.35 + tempo * 0.08 - regularization * 0.04));
    const validation = Math.min(94, Math.max(48, 90 - distance - overfit * 0.18 - underfit * 0.16));
    const runtime = Math.min(98, Math.max(18, complexity * 0.55 + tempo * 0.18 + (model === "CNN" ? 22 : model === "XGBoost" ? 12 : 5)));
    const label = overfit > 24 ? "overfit-risico" : underfit > 18 ? "underfit-risico" : validation > 78 ? "goede balans" : "zoek verder";

    return { train, validation, runtime, label };
}

export function HyperparameterTuningLab() {
    const [model, setModel] = useState<TuningModelKey>("XGBoost");
    const [complexity, setComplexity] = useState(52);
    const [tempo, setTempo] = useState(38);
    const [regularization, setRegularization] = useState(58);
    const profile = TUNING_MODELS[model];
    const outcome = tuningOutcome(model, complexity, tempo, regularization);
    const curve = [15, 30, 45, 60, 75, 90].map((value) => ({
        complexity: value,
        train: tuningOutcome(model, value, tempo, regularization).train,
        validation: tuningOutcome(model, value, tempo, regularization).validation,
    }));
    const trainPoints = curve.map((point, index) => `${34 + index * 44},${190 - point.train * 1.45}`).join(" ");
    const validationPoints = curve.map((point, index) => `${34 + index * 44},${190 - point.validation * 1.45}`).join(" ");

    const controls = [
        { id: "tune-complexity", label: profile.complexityLabel, value: complexity, set: setComplexity },
        { id: "tune-tempo", label: profile.tempoLabel, value: tempo, set: setTempo },
        { id: "tune-regularization", label: profile.regularizationLabel, value: regularization, set: setRegularization },
    ];

    return (
        <Shell
            title="Hyperparameter tuning-lab"
            subtitle="Kies eerst het modeltype. Pas daarna hebben de knoppen betekenis: bij een CNN tune je andere dingen dan bij XGBoost of een random forest."
        >
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <div>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {(Object.keys(TUNING_MODELS) as TuningModelKey[]).map((name) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setModel(name)}
                                className={`rounded-2xl border p-4 text-left transition ${model === name ? "border-brand-secondary bg-brand-secondary/5" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                            >
                                <span className="block text-sm font-bold text-brand-dark">{name}</span>
                                <span className="mt-1 block text-xs leading-5 text-slate-500">{TUNING_MODELS[name].complexityLabel}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Model eerst begrijpen</p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{profile.metaphor}</p>
                    </div>

                    <div className="mt-5 grid gap-4">
                        {controls.map((control) => (
                            <label key={control.id} className="rounded-2xl border border-slate-200 bg-white p-4" htmlFor={control.id}>
                                <span className="flex items-center justify-between gap-3 text-sm font-bold text-slate-800">
                                    {control.label}
                                    <span className="tabular-nums text-brand-primary">{control.value}%</span>
                                </span>
                                <input
                                    id={control.id}
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={control.value}
                                    onChange={(event) => control.set(Number(event.target.value))}
                                    className="mt-3 w-full accent-brand-secondary"
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Validatiecurve</p>
                            <h4 className="mt-1 text-xl font-bold text-brand-dark">{outcome.label}</h4>
                        </div>
                        <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold text-brand-primary">
                            validatie {Math.round(outcome.validation)}%
                        </span>
                    </div>
                    <svg viewBox="0 0 300 220" className="h-64 w-full rounded-2xl bg-slate-50">
                        <line x1="34" y1="190" x2="260" y2="190" stroke="#64748b" />
                        <line x1="34" y1="190" x2="34" y2="34" stroke="#64748b" />
                        <polyline points={trainPoints} fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points={validationPoints} fill="none" stroke="#007EA7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="84" y="208" className="fill-slate-500 text-[10px]">meer complexiteit</text>
                        <text x="6" y="120" transform="rotate(-90 10 120)" className="fill-slate-500 text-[10px]">score</text>
                    </svg>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <MetricCard label="Train" value={`${Math.round(outcome.train)}%`} hint="kan stijgen door memoriseren" />
                        <MetricCard label="Validatie" value={`${Math.round(outcome.validation)}%`} hint="belangrijker voor tuning" />
                        <MetricCard label="Rekentijd" value={`${Math.round(outcome.runtime)}%`} hint="workflow en budget" />
                    </div>
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Voorbeelden bij {model}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {profile.examples.map((example) => (
                                <span key={example} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                                    {example}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}

type ModelMode = "Tabulaire data" | "Beelden" | "Tekst" | "Patronen" | "Beslissingen";

type ModelFamily = {
    name: string;
    modes: ModelMode[];
    input: string;
    output: string;
    how: string;
    caveat: string;
};

const MODEL_FAMILIES: ModelFamily[] = [
    {
        name: "Lineair / logistisch",
        modes: ["Tabulaire data"],
        input: "EPD-velden, labwaarden, scores",
        output: "kans, label of continue waarde",
        how: "Combineert variabelen met gewichten en trekt een relatief eenvoudige grens.",
        caveat: "Sterk als baseline, maar mist complexe interacties tenzij je die zelf toevoegt.",
    },
    {
        name: "Random forest",
        modes: ["Tabulaire data"],
        input: "gestructureerde klinische data",
        output: "stemming van veel bomen",
        how: "Bouwt veel beslisbomen en laat ze samen stemmen.",
        caveat: "Kan robuust zijn, maar calibratie en uitlegbaarheid blijven aandachtspunten.",
    },
    {
        name: "Gradient boosting",
        modes: ["Tabulaire data"],
        input: "tabulaire data met nonlineariteit",
        output: "stapsgewijs gecorrigeerde voorspelling",
        how: "Elke nieuwe boom corrigeert fouten van de vorige bomen.",
        caveat: "Vaak sterk, maar gevoelig voor tuning, leakage en lokale shortcuts.",
    },
    {
        name: "CNN",
        modes: ["Beelden"],
        input: "röntgen, CT, dermatoscopie, pathologie",
        output: "classificatie, detectie of segmentatie",
        how: "Leert lokale beeldpatronen en combineert die tot grotere structuren.",
        caveat: "Patient-level splits, scanner-shift en externe beeldvalidatie zijn cruciaal.",
    },
    {
        name: "Transformer / LLM",
        modes: ["Tekst"],
        input: "tekst, tokens, richtlijnen, verslagen",
        output: "samenvatting, generatie, extractie",
        how: "Gebruikt attention om context tussen woorden of tokens te wegen.",
        caveat: "Kan overtuigend klinken en toch fout zijn; broncontrole en guardrails zijn nodig.",
    },
    {
        name: "Clustering",
        modes: ["Patronen"],
        input: "data zonder vaste labels",
        output: "groepen of subtypen",
        how: "Zoekt observaties die op elkaar lijken.",
        caveat: "Een cluster is geen klinisch subtype totdat het gevalideerd en geïnterpreteerd is.",
    },
    {
        name: "Reinforcement learning",
        modes: ["Beslissingen"],
        input: "state, actie, beloning over tijd",
        output: "beleid of actievoorstel",
        how: "Leert acties kiezen die op termijn beloning maximaliseren.",
        caveat: "Klinisch lastig door confounding, veiligheid en vertraagde uitkomsten.",
    },
];

export function ModelFamilyMap() {
    const [mode, setMode] = useState<ModelMode>("Tabulaire data");
    const visibleFamilies = MODEL_FAMILIES.filter((family) => family.modes.includes(mode));
    const [activeName, setActiveName] = useState<string>(visibleFamilies[0].name);
    const active = visibleFamilies.find((family) => family.name === activeName) ?? visibleFamilies[0];

    function selectMode(nextMode: ModelMode) {
        setMode(nextMode);
        const firstFamily = MODEL_FAMILIES.find((family) => family.modes.includes(nextMode));
        if (firstFamily) setActiveName(firstFamily.name);
    }

    return (
        <Shell
            title="Modelkaart voor medische AI"
            subtitle="Kies eerst het soort data of vraag. Daarna zie je welke modelfamilies logisch zijn, hoe ze ongeveer werken en waar je op moet letten."
        >
            <div className="mb-6 flex flex-wrap gap-2">
                {(["Tabulaire data", "Beelden", "Tekst", "Patronen", "Beslissingen"] as ModelMode[]).map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => selectMode(item)}
                        className={`rounded-full px-4 py-2 text-sm font-bold transition ${mode === item ? "bg-brand-secondary text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="grid gap-3">
                    {visibleFamilies.map((family) => (
                        <button
                            key={family.name}
                            type="button"
                            onClick={() => setActiveName(family.name)}
                            className={`rounded-2xl border p-4 text-left transition ${active.name === family.name ? "border-brand-secondary bg-brand-secondary/5" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                        >
                            <span className="block text-lg font-bold text-brand-dark">{family.name}</span>
                            <span className="mt-1 block text-xs leading-5 text-slate-500">{family.output}</span>
                        </button>
                    ))}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Input</p>
                            <p className="mt-2 text-sm font-semibold leading-6 text-brand-dark">{active.input}</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Model</p>
                            <p className="mt-2 text-sm font-semibold leading-6 text-brand-dark">{active.name}</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Output</p>
                            <p className="mt-2 text-sm font-semibold leading-6 text-brand-dark">{active.output}</p>
                        </div>
                    </div>
                    <div className="my-6 flex items-center gap-3 px-2 text-brand-primary">
                        <div className="h-2 flex-1 rounded-full bg-brand-primary/20" />
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold shadow-sm">leren uit voorbeelden</span>
                        <div className="h-2 flex-1 rounded-full bg-brand-primary/20" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-white bg-white p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-secondary">Hoe werkt het ongeveer?</p>
                            <p className="mt-2 text-sm leading-6 text-slate-700">{active.how}</p>
                        </div>
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">Let op in de zorg</p>
                            <p className="mt-2 text-sm leading-6 text-amber-900">{active.caveat}</p>
                        </div>
                    </div>
                </div>
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
