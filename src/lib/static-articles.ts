import fs from "fs";
import path from "path";

type StaticArticleConfig = {
    file: string;
    id: string;
    category: "Predictie" | "Diagnostiek" | "Methodisch" | "Ethiek";
    tags: string[];
    interactive: string;
    visualLabel: string;
};

export type StaticArticle = {
    id: string;
    title: string;
    subtitle: string | null;
    content: string;
    summary: string;
    category: string;
    isGuideline: boolean;
    imageUrl: string | null;
    published: boolean;
    scheduledFor: Date | null;
    createdAt: Date;
    updatedAt: Date;
    articleId: string;
    source: "MANUAL";
    aiPrompt: string | null;
    specialism: string | null;
    ceStatus: string | null;
    cost: string | null;
    modelType: string | null;
    doi: string | null;
    citation: string | null;
    developer: string | null;
    privacyType: string | null;
    integration: string | null;
    demoUrl: string | null;
    vendorUrl: string | null;
    fdaStatus: string | null;
    fdaNumber: string | null;
    coverImage: string | null;
    guidelineCategory: string | null;
    displayLocations: string[];
    tags: Array<{ id: string; name: string }>;
    article: {
        id: string;
        pubmedId: string;
        title: string;
        abstract: string;
        authors: string | null;
        journal: string | null;
        pubDate: Date | null;
        url: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    };
    likes: [];
    comments: [];
};

const ARTICLE_DIR = path.join(process.cwd(), "docs", "articles", "drafts");
const BASE_DATE = Date.UTC(2026, 4, 5, 10, 0, 0);

const ARTICLE_CONFIGS: StaticArticleConfig[] = [
    {
        file: "draft-01-hoe-beoordeel-je-een-ai-artikel-in-10-minuten.md",
        id: "article-ai-artikel-checklist-10-minuten",
        category: "Methodisch",
        tags: ["TRIPOD+AI", "PROBAST+AI", "STARD-AI", "CONSORT-AI", "DECIDE-AI"],
        interactive: "checklist-10min",
        visualLabel: "10-minuten scan",
    },
    {
        file: "draft-02-interne-versus-externe-validatie-waarom-een-hoge-auc-vaak-misleidend-is.md",
        id: "article-interne-externe-validatie-auc",
        category: "Methodisch",
        tags: ["Externe validatie", "AUC", "Modelvalidatie"],
        interactive: "validation-shift-map",
        visualLabel: "Validatieshift",
    },
    {
        file: "draft-03-auc-uitgelegd-voor-zorgprofessionals-wat-zegt-het-wel-en-niet.md",
        id: "article-auc-uitgelegd-zorgprofessionals",
        category: "Methodisch",
        tags: ["AUC", "ROC", "Decision curve analysis"],
        interactive: "auc-playground",
        visualLabel: "AUC playground",
    },
    {
        file: "draft-04-calibratie-de-vergeten-maat-bij-ai-in-de-zorg.md",
        id: "article-calibratie-ai-zorg",
        category: "Methodisch",
        tags: ["Calibratie", "Risicomodellen", "Modelvalidatie"],
        interactive: "calibration-simulator",
        visualLabel: "Calibratieplot",
    },
    {
        file: "draft-05-eerlijk-genoeg-voor-de-kliniek-bias-en-fairness-in-medische-ai.md",
        id: "article-bias-fairness-medische-ai",
        category: "Ethiek",
        tags: ["Bias", "Fairness", "Ethiek", "Subgroepanalyse"],
        interactive: "fairness-audit-simulator",
        visualLabel: "Fairness audit",
    },
    {
        file: "draft-06-wanneer-wordt-ai-een-medisch-hulpmiddel-de-mdr-bril-voor-software-in-de-zorg.md",
        id: "article-mdr-bril-software-zorg",
        category: "Methodisch",
        tags: ["MDR", "AI-regelgeving", "SaMD", "CE"],
        interactive: "mdr-claim-checker",
        visualLabel: "MDR claim check",
    },
    {
        file: "draft-07-ai-als-medisch-hulpmiddel-wanneer-valt-software-onder-mdr.md",
        id: "article-ai-medisch-hulpmiddel-mdr",
        category: "Methodisch",
        tags: ["MDR", "Medical device software", "AI-regelgeving", "CE"],
        interactive: "mdr-claim-checker",
        visualLabel: "MDR beslisboom",
    },
    {
        file: "draft-08-fda-ce-en-mdr-wat-betekenen-ze-voor-ai-modellen-in-de-zorg.md",
        id: "article-fda-ce-mdr-ai-modellen-zorg",
        category: "Methodisch",
        tags: ["FDA", "CE", "MDR", "AI-regelgeving"],
        interactive: "mdr-claim-checker",
        visualLabel: "Regulatory map",
    },
    {
        file: "draft-09-niet-alleen-fda-approved-wat-fda-ce-en-mdr-echt-betekenen-voor-ai-modellen-in-de.md",
        id: "article-fda-approved-ce-mdr-betekenis",
        category: "Methodisch",
        tags: ["FDA", "CE", "MDR", "AI-regelgeving"],
        interactive: "mdr-claim-checker",
        visualLabel: "Claim versus bewijs",
    },
    {
        file: "draft-10-fda-ce-en-mdr-wat-betekenen-ze-voor-ai-modellen.md",
        id: "article-fda-ce-mdr-ai-modellen",
        category: "Methodisch",
        tags: ["FDA", "CE", "MDR", "AI-regelgeving"],
        interactive: "mdr-claim-checker",
        visualLabel: "Regulatory review",
    },
    {
        file: "draft-11-niet-alleen-een-ander-ziekenhuis-wat-maakt-een-externe-validatiestudie-echt-goed.md",
        id: "article-goede-externe-validatiestudie",
        category: "Methodisch",
        tags: ["Externe validatie", "Transportability", "Modelvalidatie"],
        interactive: "validation-shift-map",
        visualLabel: "External validation",
    },
    {
        file: "draft-12-silent-trial-shadow-mode-en-live-deployment-klinische-ai-gecontroleerd-naar-de-p.md",
        id: "article-silent-trial-shadow-mode-live-deployment",
        category: "Methodisch",
        tags: ["Silent trial", "Shadow mode", "Implementatie", "Monitoring"],
        interactive: "deployment-ladder",
        visualLabel: "Deployment ladder",
    },
    {
        file: "draft-13-de-ai-faalt-zelden-alleen-op-het-model-waarom-slimme-zorg-ai-strandt-in-de-workf.md",
        id: "article-workflow-falen-medische-ai",
        category: "Methodisch",
        tags: ["Workflow", "Implementatie", "Human factors"],
        interactive: "workflow-failure-map",
        visualLabel: "Workflow map",
    },
    {
        file: "draft-14-van-auc-naar-echte-winst-wanneer-helpt-ai-in-de-kliniek.md",
        id: "article-van-auc-naar-klinische-winst",
        category: "Predictie",
        tags: ["Clinical utility", "Decision curve analysis", "AUC"],
        interactive: "clinical-utility-calculator",
        visualLabel: "Clinical utility",
    },
    {
        file: "draft-15-llms-in-de-zorg-slim-hulpmiddel-geen-automatische-collega.md",
        id: "article-llms-in-de-zorg",
        category: "Diagnostiek",
        tags: ["LLM", "Generatieve AI", "Veiligheid", "Privacy"],
        interactive: "llm-safety-matrix",
        visualLabel: "LLM risk matrix",
    },
    {
        file: "draft-16-rag-in-de-zorg-een-uitlegbare-brug-tussen-medische-kennis-en-generatieve-ai.md",
        id: "article-rag-in-de-zorg",
        category: "Diagnostiek",
        tags: ["RAG", "Generatieve AI", "Bronvermelding", "LLM"],
        interactive: "rag-chunking-demo",
        visualLabel: "RAG chunking",
    },
    {
        file: "draft-17-data-leakage-de-stille-killer-van-ai-studies.md",
        id: "article-data-leakage-ai-studies",
        category: "Methodisch",
        tags: ["Data leakage", "Validatie", "AUC", "Modelontwikkeling"],
        interactive: "data-leakage-simulator",
        visualLabel: "Leakage simulator",
    },
];

let cachedArticles: StaticArticle[] | null = null;

function slugify(value: string) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function normalizeTitle(value: string) {
    return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function escapeXml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function wrapWords(value: string, maxLength: number) {
    const lines: string[] = [];
    let current = "";

    for (const word of value.split(/\s+/)) {
        const next = current ? `${current} ${word}` : word;
        if (next.length > maxLength && current) {
            lines.push(current);
            current = word;
        } else {
            current = next;
        }
    }

    if (current) lines.push(current);
    return lines.slice(0, 3);
}

function paletteFor(category: string) {
    switch (category) {
        case "Ethiek":
            return ["#fff7ed", "#fb7185", "#f97316", "#7f1d1d"];
        case "Diagnostiek":
            return ["#ecfeff", "#06b6d4", "#0f766e", "#083344"];
        case "Predictie":
            return ["#eef2ff", "#6366f1", "#0284c7", "#1e1b4b"];
        default:
            return ["#eff6ff", "#007ea7", "#003459", "#0b1f2a"];
    }
}

function makeCoverImage(title: string, category: string, label: string) {
    const [background, accent, deep, ink] = paletteFor(category);
    const lines = wrapWords(title, 28);
    const titleNodes = lines
        .map((line, index) => `<text x="72" y="${300 + index * 70}" font-size="54" font-weight="800" fill="${ink}">${escapeXml(line)}</text>`)
        .join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${background}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
<linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop stop-color="${accent}"/><stop offset="1" stop-color="${deep}"/></linearGradient>
</defs>
<rect width="1200" height="675" rx="44" fill="url(#bg)"/>
<circle cx="1030" cy="90" r="220" fill="${accent}" opacity="0.14"/>
<circle cx="1010" cy="560" r="260" fill="${deep}" opacity="0.09"/>
<path d="M725 426 C790 330 858 364 918 278 C962 215 1027 232 1080 170" fill="none" stroke="url(#line)" stroke-width="18" stroke-linecap="round" opacity="0.9"/>
<path d="M716 485 H1070" stroke="${deep}" stroke-width="10" stroke-linecap="round" opacity="0.18"/>
<path d="M716 535 H1010" stroke="${deep}" stroke-width="10" stroke-linecap="round" opacity="0.14"/>
<rect x="72" y="72" width="236" height="48" rx="24" fill="#ffffff" opacity="0.78"/>
<text x="96" y="103" font-size="22" font-weight="800" fill="${deep}" letter-spacing="2">${escapeXml(category.toUpperCase())}</text>
<text x="72" y="194" font-size="28" font-weight="800" fill="${deep}">${escapeXml(label)}</text>
${titleNodes}
<text x="74" y="606" font-size="24" font-weight="700" fill="${deep}" opacity="0.72">Medical AI Educational Hub</text>
</svg>`;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function stripMarkdown(value: string) {
    return value
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/[#>*_`-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function extractSummary(content: string) {
    const beforeSources = content.split(/\n## (Bronnen|Referenties)\b/)[0];
    const paragraph = beforeSources.split(/\n{2,}/).map(stripMarkdown).find((part) => part.length > 80);
    if (!paragraph) return "Praktische Medical AI-uitleg met bronnen, voorbeeldvisual en interactieve module.";
    return paragraph.length > 260 ? `${paragraph.slice(0, 257).trim()}...` : paragraph;
}

function cleanMarkdown(raw: string, interactive: string) {
    const withoutFrontmatter = raw
        .replace(/\r\n/g, "\n")
        .replace(/^---\n[\s\S]*?\n---\n+/, "")
        .replace(/<!--[\s\S]*?-->\n*/g, "");
    const titleMatch = withoutFrontmatter.match(/^#\s+(.+)\n+/);
    const title = titleMatch?.[1]?.trim() || "Medical AI artikel";
    let body = withoutFrontmatter.replace(/^#\s+.+\n+/, "").trim();

    body = body
        .replace(/\n---\s*\n\s*## Interactieve module[\s\S]*$/i, "")
        .replace(/\n## Interactieve module[\s\S]*$/i, "")
        .replace(/```html\s*\n<interactive name="[^"]+"><\/interactive>\s*\n```/g, "")
        .trim();

    const interactiveTag = `<interactive name="${interactive}"></interactive>`;
    if (!body.includes(interactiveTag)) {
        const blocks = body.split(/\n{2,}/);
        const insertAfter = Math.min(2, Math.max(1, blocks.findIndex((block) => block.startsWith("## ")) || 2));
        blocks.splice(insertAfter, 0, interactiveTag);
        body = blocks.join("\n\n");
    }

    return { title, content: body, summary: extractSummary(body) };
}

function readArticle(config: StaticArticleConfig, index: number): StaticArticle {
    const raw = fs.readFileSync(path.join(ARTICLE_DIR, config.file), "utf8");
    const { title, content, summary } = cleanMarkdown(raw, config.interactive);
    const createdAt = new Date(BASE_DATE - index * 24 * 60 * 60 * 1000);
    const articleId = `static-source-${config.id}`;
    const coverImage = makeCoverImage(title, config.category, config.visualLabel);

    return {
        id: config.id,
        title,
        subtitle: config.visualLabel,
        content,
        summary,
        category: config.category,
        isGuideline: false,
        imageUrl: null,
        published: true,
        scheduledFor: null,
        createdAt,
        updatedAt: createdAt,
        articleId,
        source: "MANUAL",
        aiPrompt: null,
        specialism: null,
        ceStatus: null,
        cost: null,
        modelType: null,
        doi: null,
        citation: `Medical AI. (2026). ${title}. Medical AI Educational Hub.`,
        developer: "Medical AI redactie",
        privacyType: null,
        integration: "Website",
        demoUrl: null,
        vendorUrl: null,
        fdaStatus: null,
        fdaNumber: null,
        coverImage,
        guidelineCategory: null,
        displayLocations: ["Homepage", "Publicaties"],
        tags: config.tags.map((name) => ({ id: `static-tag-${slugify(name)}`, name })),
        article: {
            id: articleId,
            pubmedId: `static-${config.id}`,
            title,
            abstract: summary,
            authors: "Medical AI redactie",
            journal: "Medical AI Educational Hub",
            pubDate: createdAt,
            url: null,
            status: "PUBLISHED",
            createdAt,
            updatedAt: createdAt,
        },
        likes: [],
        comments: [],
    };
}

export function getStaticArticles() {
    if (!cachedArticles) {
        cachedArticles = ARTICLE_CONFIGS.map(readArticle);
    }
    return cachedArticles;
}

export function getStaticArticleById(id: string) {
    return getStaticArticles().find((article) => article.id === id) ?? null;
}

export function isStaticArticleId(id: string) {
    return getStaticArticleById(id) !== null;
}

export function mergeWithStaticArticles<T extends { id: string; title: string; createdAt: Date | string }>(databaseBlogs: T[]) {
    const databaseTitles = new Set(databaseBlogs.map((blog) => normalizeTitle(blog.title)));
    const staticArticles = getStaticArticles().filter((article) => !databaseTitles.has(normalizeTitle(article.title)));

    return [...staticArticles, ...databaseBlogs].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

export function staticArticleMatchesTopic(article: StaticArticle, topic: string) {
    const normalizedTopic = topic.trim().toLowerCase();
    if (!normalizedTopic) return true;
    return (
        article.category.toLowerCase() === normalizedTopic ||
        article.specialism?.toLowerCase() === normalizedTopic ||
        article.tags.some((tag) => tag.name.toLowerCase() === normalizedTopic)
    );
}
