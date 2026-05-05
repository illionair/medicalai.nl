"use client";

import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    BookOpenCheck,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    FileWarning,
    HelpCircle,
    LockKeyhole,
    MessageSquareText,
    RotateCcw,
    ShieldCheck,
    Sparkles,
    XCircle,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
    ai101Content,
    ai101Microcopy,
    type Ai101CaseStep,
    type Ai101Lesson,
    type Ai101QuizQuestion,
    type Ai101RuleKind,
    type Ai101StatusTone,
} from "@/lib/elearning/ai101Content";

const toneClasses: Record<Ai101StatusTone, string> = {
    neutral: "border-slate-200 bg-white text-slate-700",
    info: "border-sky-200 bg-sky-50 text-sky-950",
    success: "border-emerald-200 bg-emerald-50 text-emerald-950",
    warning: "border-amber-200 bg-amber-50 text-amber-950",
    danger: "border-rose-200 bg-rose-50 text-rose-950",
};

const ruleTone: Record<Ai101RuleKind, { className: string; icon: ReactNode }> = {
    allowed: {
        className: "border-emerald-200 bg-emerald-50 text-emerald-950",
        icon: <CheckCircle2 size={18} />,
    },
    askFirst: {
        className: "border-amber-200 bg-amber-50 text-amber-950",
        icon: <HelpCircle size={18} />,
    },
    notAllowed: {
        className: "border-rose-200 bg-rose-50 text-rose-950",
        icon: <XCircle size={18} />,
    },
};

const glossary = [
    {
        term: "Publieke chatbot",
        body: "Een AI-tool buiten je zorgorganisatie, vaak zonder zorgspecifieke afspraken over opslag, logging en training.",
    },
    {
        term: "Goedgekeurde tool",
        body: "Een AI-toepassing die jouw organisatie heeft beoordeeld op privacy, security, doel, contracten en veilig gebruik.",
    },
    {
        term: "Herleidbare gegevens",
        body: "Informatie waardoor iemand direct of indirect herkenbaar is. Ook combinaties van details tellen mee.",
    },
    {
        term: "Medisch hulpmiddel",
        body: "Software kan hieronder vallen als de bedoeling medisch is, zoals diagnose, monitoring of behandelondersteuning.",
    },
];

const riskSteps = [
    { label: "Algemene tekst", detail: "Folder, mail, checklist", tone: "success" as const },
    { label: "Patientcommunicatie", detail: "Alleen zonder echte data", tone: "warning" as const },
    { label: "Dossier of scribe", detail: "Alleen goedgekeurde tool", tone: "warning" as const },
    { label: "Triage", detail: "Hoog risico", tone: "danger" as const },
    { label: "Diagnose of medicatie", detail: "Niet met publieke AI", tone: "danger" as const },
];

const dataFlow = [
    { icon: MessageSquareText, title: "Prompt", text: "Wat jij invoert" },
    { icon: LockKeyhole, title: "Provider", text: "Wie kan erbij?" },
    { icon: FileWarning, title: "Opslag", text: "Logs en bewaartermijn" },
    { icon: Sparkles, title: "Training", text: "Wordt data hergebruikt?" },
    { icon: ShieldCheck, title: "Controle", text: "Mens en beleid" },
];

const forbiddenItems = [
    "Naam, BSN, patientnummer",
    "Geboortedatum of opnamedatum",
    "Dossierfragmenten of brieven",
    "Labwaarden of medicatie",
    "Foto, audio of transcript",
    "Zeldzame diagnose met context",
    "Locatie of kleine afdeling",
    "Familie- of mantelzorggegevens",
];

type SlideKind =
    | "intro"
    | "glossary"
    | "risk"
    | "privacy"
    | "decision"
    | "prompt"
    | "forbidden"
    | "lessonIntro"
    | "goals"
    | "explainer"
    | "rules"
    | "case"
    | "quiz"
    | "team";

type CourseSlide = {
    id: string;
    kind: SlideKind;
    kicker: string;
    title: string;
    body?: string;
    helper?: string;
    moduleTitle?: string;
    lesson?: Ai101Lesson;
    explainer?: Ai101Lesson["explainers"][number];
    caseStep?: Ai101CaseStep;
    quiz?: Ai101QuizQuestion;
};

type DecisionAnswers = {
    publicTool: boolean;
    patientData: boolean;
    clinicalDecision: boolean;
    approvedTool: boolean;
};

function Badge({ tone, children }: { tone: Ai101StatusTone; children: ReactNode }) {
    return (
        <span className={`inline-flex min-h-8 items-center rounded-full border px-3 text-[12.5px] font-bold ${toneClasses[tone]}`}>
            {children}
        </span>
    );
}

function ProgressBar({ value }: { value: number }) {
    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
                className="h-full rounded-full bg-[#007EA7] transition-all duration-500"
                style={{ width: `${Math.max(3, value)}%` }}
            />
        </div>
    );
}

function IconButton({
    children,
    onClick,
    disabled,
    label,
}: {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#003459] transition hover:border-[#9BD8EA] hover:bg-[#EEF6FB] disabled:cursor-not-allowed disabled:opacity-40"
        >
            {children}
        </button>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 shrink-0 text-[#007EA7]" size={18} />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function buildSlides(): CourseSlide[] {
    const slides: CourseSlide[] = [
        {
            id: "intro",
            kind: "intro",
            kicker: `E-learning · ${ai101Content.languageLevel}`,
            title: ai101Content.title,
            body: ai101Content.subtitle,
            helper: ai101Content.intro,
        },
        {
            id: "glossary",
            kind: "glossary",
            kicker: "Begrippen",
            title: "Eerst vier woorden helder",
            body: "Deze termen komen steeds terug in de e-learning.",
        },
        {
            id: "risk",
            kind: "risk",
            kicker: "Veiligheidsbeeld",
            title: "De risicoladder",
            body: "Hoe dichter AI bij een echte patient en een klinisch besluit komt, hoe strenger de regels worden.",
        },
        {
            id: "privacy",
            kind: "privacy",
            kicker: "Privacy",
            title: "Invoeren is al delen",
            body: "Bij patientdata moet je voor het typen weten of de tool, het doel en de afspraken kloppen.",
        },
        {
            id: "decision",
            kind: "decision",
            kicker: "Oefening",
            title: "Mag ik dit invoeren?",
            body: "Beantwoord vier simpele vragen. De conclusie verandert direct mee.",
        },
        {
            id: "prompt",
            kind: "prompt",
            kicker: "Oefening",
            title: "Check je prompt",
            body: "Schrijf een prompt en kijk welke woorden mogelijk privacyrisico's geven.",
        },
        {
            id: "forbidden",
            kind: "forbidden",
            kicker: "Stoplijst",
            title: "Nooit in publieke AI",
            body: "Deze gegevens horen niet in ChatGPT of een andere publieke AI-tool.",
        },
    ];

    ai101Content.modules.forEach((module) => {
        module.lessons.forEach((lesson) => {
            slides.push(
                {
                    id: `${lesson.id}-intro`,
                    kind: "lessonIntro",
                    kicker: module.title,
                    title: lesson.title,
                    body: lesson.summary,
                    helper: lesson.keyMessage,
                    moduleTitle: module.title,
                    lesson,
                },
                {
                    id: `${lesson.id}-goals`,
                    kind: "goals",
                    kicker: "Leerdoelen",
                    title: `Na deze les kun je dit`,
                    body: lesson.summary,
                    moduleTitle: module.title,
                    lesson,
                },
            );

            lesson.explainers.forEach((explainer, index) => {
                slides.push({
                    id: `${lesson.id}-uitleg-${index + 1}`,
                    kind: "explainer",
                    kicker: "Uitleg",
                    title: explainer.title,
                    body: explainer.body,
                    moduleTitle: module.title,
                    lesson,
                    explainer,
                });
            });

            slides.push({
                id: `${lesson.id}-regels`,
                kind: "rules",
                kicker: "Regels",
                title: "Wat mag wel, wat niet?",
                body: "Gebruik deze regels als snelle werkafspraak.",
                moduleTitle: module.title,
                lesson,
            });

            lesson.cases.forEach((caseStep) => {
                slides.push({
                    id: `${lesson.id}-casus-${caseStep.id}`,
                    kind: "case",
                    kicker: "Casus",
                    title: caseStep.title,
                    body: caseStep.situation,
                    moduleTitle: module.title,
                    lesson,
                    caseStep,
                });
            });

            lesson.quiz.forEach((quiz) => {
                slides.push({
                    id: `${lesson.id}-quiz-${quiz.id}`,
                    kind: "quiz",
                    kicker: "Kennischeck",
                    title: quiz.question,
                    moduleTitle: module.title,
                    lesson,
                    quiz,
                });
            });
        });
    });

    slides.push({
        id: "team",
        kind: "team",
        kicker: "Teamafspraak",
        title: "Twijfel is een werksignaal, geen fout.",
        body: "Bespreek nieuwe AI-toepassingen met leidinggevende, privacy officer, FG, CISO, jurist, medisch manager of AI-team. Veilig gebruik begint voor de eerste prompt.",
        helper: ai101Content.promise,
    });

    return slides;
}

function DecisionSlide() {
    const [answers, setAnswers] = useState<DecisionAnswers>({
        publicTool: true,
        patientData: false,
        clinicalDecision: false,
        approvedTool: false,
    });

    const result = useMemo(() => {
        if (answers.publicTool && answers.patientData) {
            return {
                tone: "danger" as const,
                label: "Stop",
                title: "Niet invoeren",
                body: "Een publieke AI-tool met herleidbare patientgegevens kan een datalek en schending van het beroepsgeheim opleveren.",
            };
        }
        if (answers.clinicalDecision && !answers.approvedTool) {
            return {
                tone: "danger" as const,
                label: "Niet gebruiken",
                title: "Geen klinisch besluit hiermee",
                body: "Diagnose, triage, behandeling en medicatie vragen om gevalideerde, goedgekeurde workflows en menselijke beoordeling.",
            };
        }
        if (!answers.approvedTool && (answers.patientData || answers.clinicalDecision)) {
            return {
                tone: "warning" as const,
                label: "Eerst checken",
                title: "Vraag lokaal beleid na",
                body: "Vraag je leidinggevende, privacy officer, FG, CISO of AI-team voordat je verdergaat.",
            };
        }
        return {
            tone: "success" as const,
            label: "Laag risico",
            title: "Waarschijnlijk geschikt als concept-hulp",
            body: "Gebruik AI zonder gevoelige gegevens, controleer altijd de output en laat de verantwoordelijkheid bij de professional.",
        };
    }, [answers]);

    const rows = [
        ["publicTool", "Gebruik je een publieke of niet-goedgekeurde AI-tool?"],
        ["patientData", "Staat er echte of herleidbare patientinformatie in?"],
        ["clinicalDecision", "Heeft de output invloed op diagnose, triage, behandeling of medicatie?"],
        ["approvedTool", "Is de tool door je organisatie goedgekeurd voor precies dit doel?"],
    ] as const;

    return (
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <div className="space-y-2">
                {rows.map(([key, label]) => (
                    <label key={key} className="flex min-h-14 cursor-pointer items-center gap-3 border-b border-slate-200 py-3">
                        <input
                            type="checkbox"
                            checked={answers[key]}
                            onChange={(event) => setAnswers((current) => ({ ...current, [key]: event.target.checked }))}
                            className="h-5 w-5 accent-[#007EA7]"
                        />
                        <span className="text-sm font-semibold leading-6 text-slate-800">{label}</span>
                    </label>
                ))}
            </div>
            <div className={`rounded-[18px] border p-5 ${toneClasses[result.tone]}`}>
                <Badge tone={result.tone}>{result.label}</Badge>
                <h3 className="mt-4 text-[22px] font-black leading-tight text-inherit">{result.title}</h3>
                <p className="mt-3 text-sm leading-7 text-inherit">{result.body}</p>
            </div>
        </div>
    );
}

function PromptSlide() {
    const [prompt, setPrompt] = useState("Maak een verwijsbrief voor Jan de Vries, 74 jaar, COPD, opname vorige week.");
    const flags = [
        { label: "naam", found: /\b(jan|jansen|de vries|mevrouw|meneer)\b/i.test(prompt) },
        { label: "leeftijd", found: /\b\d{2,3}\s?(jaar|jr)\b/i.test(prompt) },
        { label: "datum/tijd", found: /\b(vandaag|gisteren|vorige week|\d{1,2}[-/]\d{1,2})\b/i.test(prompt) },
        { label: "medische details", found: /\b(copd|medicatie|lab|diagnose|opname|ct|mri|uitslag)\b/i.test(prompt) },
    ];
    const hasFlags = flags.some((flag) => flag.found);

    return (
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <div>
                <label htmlFor="prompt-practice" className="mb-2 block text-sm font-bold text-slate-700">
                    Plak of schrijf een prompt
                </label>
                <textarea
                    id="prompt-practice"
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    rows={7}
                    className="w-full resize-none rounded-[18px] border border-slate-200 bg-white p-4 text-sm leading-6 outline-none transition focus:border-[#007EA7] focus:ring-4 focus:ring-[#007EA7]/10"
                />
                <button
                    type="button"
                    onClick={() => setPrompt("Maak een algemeen sjabloon voor een verwijsbrief. Gebruik placeholders zoals [reden verwijzing], [relevante achtergrond] en [vraag aan ontvanger]. Geef geen inhoudelijk advies.")}
                    className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#003459] px-4 text-sm font-bold text-white transition hover:bg-[#00171F]"
                >
                    <RotateCcw size={16} />
                    Maak veiliger voorbeeld
                </button>
            </div>
            <div className={`rounded-[18px] border p-5 ${hasFlags ? toneClasses.danger : toneClasses.success}`}>
                <h3 className="text-[22px] font-black leading-tight text-inherit">
                    {hasFlags ? ai101Microcopy.statuses.unsafePrompt : ai101Microcopy.statuses.safePrompt}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                    {flags.map((flag) => (
                        <span
                            key={flag.label}
                            className={`rounded-full border px-3 py-1 text-xs font-bold ${
                                flag.found ? "border-rose-200 bg-white text-rose-900" : "border-emerald-200 bg-white text-emerald-800"
                            }`}
                        >
                            {flag.found ? "Gevonden: " : "Niet gezien: "}
                            {flag.label}
                        </span>
                    ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-inherit">
                    Deze check is expres simpel. Hij vervangt geen beleid, maar helpt je zien welke woorden alarmbellen moeten laten rinkelen.
                </p>
            </div>
        </div>
    );
}

function QuizSlide({
    quiz,
    selected,
    onSelect,
}: {
    quiz: Ai101QuizQuestion;
    selected?: string;
    onSelect: (optionId: string) => void;
}) {
    const option = quiz.options.find((item) => item.id === selected);

    return (
        <div>
            <div className="space-y-3">
                {quiz.options.map((answer) => (
                    <button
                        key={answer.id}
                        type="button"
                        onClick={() => onSelect(answer.id)}
                        className={`flex min-h-14 w-full items-center gap-3 rounded-[18px] border px-4 py-3 text-left text-sm font-semibold transition ${
                            selected === answer.id
                                ? answer.isCorrect
                                    ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                                    : "border-rose-300 bg-rose-50 text-rose-950"
                                : "border-slate-200 bg-white text-slate-700 hover:border-[#9BD8EA]"
                        }`}
                    >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black uppercase">
                            {answer.id}
                        </span>
                        <span>{answer.label}</span>
                    </button>
                ))}
            </div>
            <div className={`mt-5 rounded-[18px] border p-4 ${option?.isCorrect ? toneClasses.success : selected ? toneClasses.danger : toneClasses.neutral}`}>
                <p className="text-sm font-black text-inherit">
                    {selected ? (option?.isCorrect ? "Goed antwoord" : "Nog niet goed") : "Kies een antwoord"}
                </p>
                <p className="mt-2 text-sm leading-7 text-inherit">
                    {option ? `${option.feedback} ${option.isCorrect ? quiz.correctFeedback : quiz.incorrectFeedback}` : ai101Microcopy.emptyStates.noAnswerYet}
                </p>
            </div>
        </div>
    );
}

function CaseSlide({
    caseStep,
    revealed,
    onReveal,
}: {
    caseStep: Ai101CaseStep;
    revealed: boolean;
    onReveal: () => void;
}) {
    return (
        <div>
            <p className="text-[17px] leading-8 text-slate-700">{caseStep.situation}</p>
            <p className="mt-5 border-l-4 border-[#007EA7] pl-4 text-[16px] font-semibold leading-7 text-slate-800">
                Reflectie: {caseStep.reflectionPrompt}
            </p>
            {!revealed ? (
                <button
                    type="button"
                    onClick={onReveal}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#003459] px-4 text-sm font-bold text-white transition hover:bg-[#00171F]"
                >
                    <BookOpenCheck size={17} />
                    Bekijk veilige aanpak
                </button>
            ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[18px] border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
                        <p className="text-sm font-black text-inherit">Veilige actie</p>
                        <p className="mt-2 text-sm leading-7 text-inherit">{caseStep.goodAction}</p>
                    </div>
                    <div className="rounded-[18px] border border-sky-200 bg-sky-50 p-4 text-sky-950">
                        <p className="text-sm font-black text-inherit">Waarom</p>
                        <p className="mt-2 text-sm leading-7 text-inherit">{caseStep.why}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function SlideBody({
    slide,
    quizAnswers,
    onQuizAnswer,
    revealedCases,
    onRevealCase,
}: {
    slide: CourseSlide;
    quizAnswers: Record<string, string>;
    onQuizAnswer: (questionId: string, optionId: string) => void;
    revealedCases: Record<string, boolean>;
    onRevealCase: (caseId: string) => void;
}) {
    if (slide.kind === "intro") {
        return (
            <div>
                <p className="text-[18px] leading-8 text-slate-700">{slide.helper}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                    <Badge tone="success">Menselijke controle</Badge>
                    <Badge tone="warning">Privacy eerst</Badge>
                    <Badge tone="danger">Geen patientdata in publieke AI</Badge>
                </div>
                <p className="mt-6 rounded-[18px] bg-[#EEF6FB] p-4 text-sm font-semibold leading-7 text-[#003459]">
                    {ai101Content.promise}
                </p>
            </div>
        );
    }

    if (slide.kind === "glossary") {
        return (
            <div className="grid gap-4 md:grid-cols-2">
                {glossary.map((item) => (
                    <div key={item.term} className="border-l-4 border-[#007EA7] pl-4">
                        <h3 className="text-[19px] font-black leading-tight text-[#003459]">{item.term}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{item.body}</p>
                    </div>
                ))}
            </div>
        );
    }

    if (slide.kind === "risk") {
        return (
            <div className="grid gap-3 sm:grid-cols-5">
                {riskSteps.map((step, index) => (
                    <div key={step.label} className={`rounded-[18px] border p-4 ${toneClasses[step.tone]}`}>
                        <div className="mb-4 flex items-center justify-between gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm font-black">
                                {index + 1}
                            </span>
                            {index < 1 ? <CheckCircle2 size={17} /> : index < 3 ? <AlertTriangle size={17} /> : <XCircle size={17} />}
                        </div>
                        <p className="text-sm font-black leading-tight text-inherit">{step.label}</p>
                        <p className="mt-2 text-xs leading-5 text-inherit opacity-85">{step.detail}</p>
                    </div>
                ))}
            </div>
        );
    }

    if (slide.kind === "privacy") {
        return (
            <div>
                <div className="grid gap-3 md:grid-cols-5">
                    {dataFlow.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="relative rounded-[18px] border border-slate-200 bg-white p-4">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF6FB] text-[#007EA7]">
                                    <Icon size={20} />
                                </div>
                                <p className="text-sm font-black text-slate-900">{item.title}</p>
                                <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                                {index < dataFlow.length - 1 && (
                                    <ArrowRight className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-slate-300 md:block" size={22} />
                                )}
                            </div>
                        );
                    })}
                </div>
                <p className="mt-5 rounded-[18px] bg-rose-50 p-4 text-sm font-semibold leading-7 text-rose-950">
                    Kernpunt: invoeren is al delen/verwerken. Bij patientdata moet je dus voor het typen weten of dit mag.
                </p>
            </div>
        );
    }

    if (slide.kind === "decision") {
        return <DecisionSlide />;
    }

    if (slide.kind === "prompt") {
        return <PromptSlide />;
    }

    if (slide.kind === "forbidden") {
        return (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {forbiddenItems.map((item) => (
                    <div key={item} className="rounded-[18px] border border-rose-100 bg-rose-50 p-4 text-sm font-bold leading-6 text-rose-950">
                        {item}
                    </div>
                ))}
            </div>
        );
    }

    if (slide.kind === "lessonIntro" && slide.lesson) {
        return (
            <div>
                <div className="mb-5 flex flex-wrap gap-2">
                    <Badge tone="info">{slide.lesson.durationMinutes} minuten</Badge>
                    <Badge tone="neutral">{slide.lesson.level}</Badge>
                    <Badge tone="success">{slide.moduleTitle}</Badge>
                </div>
                <p className="text-[18px] leading-8 text-slate-700">{slide.body}</p>
                <p className="mt-6 rounded-[18px] border border-[#BEE8F4] bg-[#EEF6FB] p-4 text-[16px] font-semibold leading-7 text-[#003459]">
                    Belangrijkste boodschap: {slide.helper}
                </p>
            </div>
        );
    }

    if (slide.kind === "goals" && slide.lesson) {
        return <BulletList items={slide.lesson.learningGoals} />;
    }

    if (slide.kind === "explainer") {
        return <p className="text-[18px] leading-8 text-slate-700">{slide.body}</p>;
    }

    if (slide.kind === "rules" && slide.lesson) {
        return (
            <div className="grid gap-4 md:grid-cols-3">
                {slide.lesson.rules.map((rule) => (
                    <div key={rule.id} className={`rounded-[18px] border p-4 ${ruleTone[rule.kind].className}`}>
                        <div className="mb-3 flex items-center gap-2 text-sm font-black">
                            {ruleTone[rule.kind].icon}
                            {rule.label}
                        </div>
                        <p className="text-sm font-bold leading-6 text-inherit">{rule.plainText}</p>
                        <p className="mt-3 text-sm leading-6 text-inherit opacity-85">
                            <span className="font-black">Waarom: </span>
                            {rule.why}
                        </p>
                        <p className="mt-3 text-xs leading-5 text-inherit opacity-85">
                            <span className="font-black">Voorbeeld: </span>
                            {rule.example}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    if (slide.kind === "case" && slide.caseStep) {
        return (
            <CaseSlide
                caseStep={slide.caseStep}
                revealed={Boolean(revealedCases[slide.id])}
                onReveal={() => onRevealCase(slide.id)}
            />
        );
    }

    if (slide.kind === "quiz" && slide.quiz) {
        return (
            <QuizSlide
                quiz={slide.quiz}
                selected={quizAnswers[slide.quiz.id]}
                onSelect={(optionId) => onQuizAnswer(slide.quiz!.id, optionId)}
            />
        );
    }

    if (slide.kind === "team") {
        return (
            <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
                <p className="text-[18px] leading-8 text-slate-700">{slide.body}</p>
                <div className="rounded-[18px] bg-[#0B1F2A] p-5 text-white">
                    <ShieldCheck size={26} className="text-sky-200" />
                    <p className="mt-3 text-sm font-black leading-6 text-white">Jij blijft verantwoordelijk</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{slide.helper}</p>
                </div>
            </div>
        );
    }

    return null;
}

export default function Ai101Course() {
    const slides = useMemo(() => buildSlides(), []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
    const [revealedCases, setRevealedCases] = useState<Record<string, boolean>>({});
    const currentSlide = slides[currentIndex];
    const progress = slides.length > 0 ? Math.round(((currentIndex + 1) / slides.length) * 100) : 0;

    const goTo = (index: number) => {
        setCurrentIndex(Math.min(Math.max(index, 0), slides.length - 1));
    };

    if (!currentSlide) {
        return null;
    }

    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#FCFCFB_0%,#F1F7F8_100%)] py-8">
            <div className="hub-container">
                <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <Badge tone="info">Kaartendeck e-learning</Badge>
                        <h1 className="mt-4 max-w-4xl text-[34px] font-black leading-[1.08] text-[#0B1F2A] sm:text-[46px]">
                            {ai101Content.title}
                        </h1>
                        <p className="mt-3 max-w-2xl text-[17px] leading-8 text-slate-600">
                            Rustig doorklikken: elke kaart is een uitleg, oefening, casus of kennischeck.
                        </p>
                    </div>
                    <div className="w-full rounded-[18px] border border-white/70 bg-white/80 p-4 shadow-sm lg:w-[360px]">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="text-sm font-black text-[#003459]">
                                Kaart {currentIndex + 1} van {slides.length}
                            </p>
                            <p className="text-sm font-black text-slate-500">{progress}%</p>
                        </div>
                        <ProgressBar value={progress} />
                    </div>
                </header>

                <section className="rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_24px_70px_rgba(11,31,42,0.09)] sm:p-7 lg:p-9">
                    <div className="mb-7 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.12em] text-[#007EA7]">{currentSlide.kicker}</p>
                            <h2 className="mt-3 max-w-4xl text-[28px] font-black leading-tight text-[#0B1F2A] sm:text-[38px]">
                                {currentSlide.title}
                            </h2>
                            {currentSlide.body && currentSlide.kind !== "lessonIntro" && currentSlide.kind !== "team" && (
                                <p className="mt-3 max-w-3xl text-[16px] leading-8 text-slate-600">{currentSlide.body}</p>
                            )}
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <IconButton label="Vorige kaart" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}>
                                <ChevronLeft size={20} />
                            </IconButton>
                            <IconButton label="Volgende kaart" onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === slides.length - 1}>
                                <ChevronRight size={20} />
                            </IconButton>
                        </div>
                    </div>

                    <div className="min-h-[340px]">
                        <SlideBody
                            slide={currentSlide}
                            quizAnswers={quizAnswers}
                            onQuizAnswer={(questionId, optionId) => setQuizAnswers((current) => ({ ...current, [questionId]: optionId }))}
                            revealedCases={revealedCases}
                            onRevealCase={(caseId) => setRevealedCases((current) => ({ ...current, [caseId]: true }))}
                        />
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="button"
                            onClick={() => goTo(currentIndex - 1)}
                            disabled={currentIndex === 0}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-[#003459] transition hover:border-[#9BD8EA] hover:bg-[#EEF6FB] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ArrowLeft size={18} />
                            Vorige
                        </button>
                        <select
                            value={currentIndex}
                            onChange={(event) => goTo(Number(event.target.value))}
                            className="min-h-12 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 outline-none focus:border-[#007EA7] focus:ring-4 focus:ring-[#007EA7]/10"
                            aria-label="Ga naar kaart"
                        >
                            {slides.map((slide, index) => (
                                <option key={slide.id} value={index}>
                                    {index + 1}. {slide.kicker}: {slide.title}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => goTo(currentIndex + 1)}
                            disabled={currentIndex === slides.length - 1}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#003459] px-5 text-sm font-black text-white transition hover:bg-[#00171F] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Volgende
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}
