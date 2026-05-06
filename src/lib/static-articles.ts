import fs from "fs";
import path from "path";
import { getCover } from "./covers";

type Frontmatter = {
    title?: string;
    seoTitle?: string;
    subtitle?: string;
    summary?: string;
    difficulty?: "basis" | "middel" | "diep";
    readingMinutes?: number;
    coverConcept?: string;
};

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) return { frontmatter: {}, body: raw };
    const body = raw.slice(match[0].length);
    const frontmatter: Frontmatter = {};
    for (const line of match[1].split("\n")) {
        const m = line.match(/^([A-Za-z][A-Za-z0-9_-]*)\s*:\s*(.+?)\s*$/);
        if (!m) continue;
        const key = m[1];
        let value: string = m[2];
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1);
        }
        if (key === "readingMinutes") {
            const n = parseInt(value, 10);
            if (!Number.isNaN(n)) frontmatter.readingMinutes = n;
        } else if (key === "difficulty") {
            if (value === "basis" || value === "middel" || value === "diep") {
                frontmatter.difficulty = value;
            }
        } else if (key === "title") {
            frontmatter.title = value;
        } else if (key === "seoTitle") {
            frontmatter.seoTitle = value;
        } else if (key === "subtitle") {
            frontmatter.subtitle = value;
        } else if (key === "summary") {
            frontmatter.summary = value;
        } else if (key === "coverConcept") {
            frontmatter.coverConcept = value;
        }
    }
    return { frontmatter, body };
}

type StaticArticleConfig = {
    file: string;
    id: string;
    category: "Predictie" | "Diagnostiek" | "Methodisch" | "Ethiek";
    tags: string[];
    interactive: string;
    visualLabel: string;
    difficulty: "basis" | "middel" | "diep";
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
    seoTitle?: string;
    difficulty?: "basis" | "middel" | "diep";
    readingMinutes?: number;
    coverConcept?: string;
};

const ARTICLE_DIR = path.join(process.cwd(), "docs", "articles", "drafts");
const BASE_DATE = Date.UTC(2026, 4, 5, 10, 0, 0);

const ARTICLE_CONFIGS: StaticArticleConfig[] = [
    {
        file: "draft-18-wat-is-hyperparametertuning.md",
        id: "article-hyperparameter-tuning-uitgelegd",
        category: "Methodisch",
        tags: ["Hyperparameter tuning", "Modelontwikkeling", "Validatie", "Overfitting"],
        interactive: "hyperparameter-tuning-lab",
        visualLabel: "Tuning lab",
        difficulty: "middel",
    },
    {
        file: "draft-19-wat-voor-soorten-ai-modellen-bestaan-er.md",
        id: "article-soorten-ai-modellen-uitgelegd",
        category: "Methodisch",
        tags: ["Modeltypen", "Machine learning", "Deep learning", "Generatieve AI"],
        interactive: "model-family-map",
        visualLabel: "Modelkaart",
        difficulty: "basis",
    },
    {
        file: "draft-01-hoe-beoordeel-je-een-ai-artikel-in-10-minuten.md",
        id: "article-ai-artikel-checklist-10-minuten",
        category: "Methodisch",
        tags: ["TRIPOD+AI", "PROBAST+AI", "STARD-AI", "CONSORT-AI", "DECIDE-AI"],
        interactive: "checklist-10min",
        visualLabel: "10-minuten scan",
        difficulty: "basis",
    },
    {
        file: "draft-02-interne-versus-externe-validatie-waarom-een-hoge-auc-vaak-misleidend-is.md",
        id: "article-interne-externe-validatie-auc",
        category: "Methodisch",
        tags: ["Externe validatie", "AUC", "Modelvalidatie"],
        interactive: "validation-shift-map",
        visualLabel: "Validatieshift",
        difficulty: "middel",
    },
    {
        file: "draft-03-auc-uitgelegd-voor-zorgprofessionals-wat-zegt-het-wel-en-niet.md",
        id: "article-auc-uitgelegd-zorgprofessionals",
        category: "Predictie",
        tags: ["AUC", "ROC", "Decision curve analysis"],
        interactive: "auc-scores",
        visualLabel: "AUC stap voor stap",
        difficulty: "middel",
    },
    {
        file: "draft-04-calibratie-de-vergeten-maat-bij-ai-in-de-zorg.md",
        id: "article-calibratie-ai-zorg",
        category: "Predictie",
        tags: ["Calibratie", "Risicomodellen", "Modelvalidatie"],
        interactive: "calibration-simulator",
        visualLabel: "Calibratieplot",
        difficulty: "middel",
    },
    {
        file: "draft-05-eerlijk-genoeg-voor-de-kliniek-bias-en-fairness-in-medische-ai.md",
        id: "article-bias-fairness-medische-ai",
        category: "Ethiek",
        tags: ["Bias", "Fairness", "Ethiek", "Subgroepanalyse"],
        interactive: "fairness-audit-simulator",
        visualLabel: "Fairness audit",
        difficulty: "middel",
    },
    {
        file: "draft-06-wanneer-wordt-ai-een-medisch-hulpmiddel-de-mdr-bril-voor-software-in-de-zorg.md",
        id: "article-mdr-bril-software-zorg",
        category: "Methodisch",
        tags: ["MDR", "AI-regelgeving", "SaMD", "CE"],
        interactive: "mdr-claim-checker",
        visualLabel: "MDR claim check",
        difficulty: "basis",
    },
    {
        file: "draft-09-niet-alleen-fda-approved-wat-fda-ce-en-mdr-echt-betekenen-voor-ai-modellen-in-de.md",
        id: "article-fda-approved-ce-mdr-betekenis",
        category: "Methodisch",
        tags: ["FDA", "CE", "MDR", "AI-regelgeving"],
        interactive: "mdr-claim-checker",
        visualLabel: "Claim versus bewijs",
        difficulty: "basis",
    },
    {
        file: "draft-11-niet-alleen-een-ander-ziekenhuis-wat-maakt-een-externe-validatiestudie-echt-goed.md",
        id: "article-goede-externe-validatiestudie",
        category: "Methodisch",
        tags: ["Externe validatie", "Transportability", "Modelvalidatie"],
        interactive: "validation-shift-map",
        visualLabel: "External validation",
        difficulty: "middel",
    },
    {
        file: "draft-12-silent-trial-shadow-mode-en-live-deployment-klinische-ai-gecontroleerd-naar-de-p.md",
        id: "article-silent-trial-shadow-mode-live-deployment",
        category: "Methodisch",
        tags: ["Silent trial", "Shadow mode", "Implementatie", "Monitoring"],
        interactive: "deployment-ladder",
        visualLabel: "Deployment ladder",
        difficulty: "middel",
    },
    {
        file: "draft-13-de-ai-faalt-zelden-alleen-op-het-model-waarom-slimme-zorg-ai-strandt-in-de-workf.md",
        id: "article-workflow-falen-medische-ai",
        category: "Methodisch",
        tags: ["Workflow", "Implementatie", "Human factors"],
        interactive: "workflow-failure-map",
        visualLabel: "Workflow map",
        difficulty: "middel",
    },
    {
        file: "draft-14-van-auc-naar-echte-winst-wanneer-helpt-ai-in-de-kliniek.md",
        id: "article-van-auc-naar-klinische-winst",
        category: "Predictie",
        tags: ["Clinical utility", "Decision curve analysis", "AUC"],
        interactive: "clinical-utility-calculator",
        visualLabel: "Clinical utility",
        difficulty: "middel",
    },
    {
        file: "draft-15-llms-in-de-zorg-slim-hulpmiddel-geen-automatische-collega.md",
        id: "article-llms-in-de-zorg",
        category: "Diagnostiek",
        tags: ["LLM", "Generatieve AI", "Veiligheid", "Privacy"],
        interactive: "llm-safety-matrix",
        visualLabel: "LLM risk matrix",
        difficulty: "basis",
    },
    {
        file: "draft-16-rag-in-de-zorg-een-uitlegbare-brug-tussen-medische-kennis-en-generatieve-ai.md",
        id: "article-rag-in-de-zorg",
        category: "Diagnostiek",
        tags: ["RAG", "Generatieve AI", "Bronvermelding", "LLM"],
        interactive: "rag-chunking-demo",
        visualLabel: "RAG chunking",
        difficulty: "middel",
    },
    {
        file: "draft-17-data-leakage-de-stille-killer-van-ai-studies.md",
        id: "article-data-leakage-ai-studies",
        category: "Methodisch",
        tags: ["Data leakage", "Validatie", "AUC", "Modelontwikkeling"],
        interactive: "data-leakage-simulator",
        visualLabel: "Leakage simulator",
        difficulty: "diep",
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

function stripMarkdown(value: string) {
    return value
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/[#>*_`-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function hasInteractiveTag(content: string, name: string) {
    return new RegExp(`<interactive\\s+name=["']${name}["']`, "i").test(content);
}

function extractSummary(content: string) {
    const beforeSources = content.split(/\n## (Bronnen|Referenties)\b/)[0];
    const paragraph = beforeSources.split(/\n{2,}/).map(stripMarkdown).find((part) => part.length > 80);
    if (!paragraph) return "Praktische Medical AI-uitleg met bronnen, voorbeeldvisual en interactieve module.";
    return paragraph.length > 260 ? `${paragraph.slice(0, 257).trim()}...` : paragraph;
}

function cleanMarkdown(raw: string, interactive: string) {
    const normalized = raw.replace(/\r\n/g, "\n");
    const { frontmatter, body: afterFrontmatter } = parseFrontmatter(normalized);
    const withoutComments = afterFrontmatter.replace(/<!--[\s\S]*?-->\n*/g, "").trimStart();
    const titleMatch = withoutComments.match(/^#\s+(.+)\n+/);
    const headingTitle = titleMatch?.[1]?.trim();
    const title = frontmatter.title || headingTitle || "Medical AI artikel";
    let body = withoutComments.replace(/^#\s+.+\n+/, "").trim();

    body = body
        .replace(/\n---\s*\n\s*## Interactieve module[\s\S]*$/i, "")
        .replace(/\n## Interactieve module[\s\S]*$/i, "")
        .replace(/```html\s*\n<interactive name="[^"]+"><\/interactive>\s*\n```/g, "")
        .trim();

    const interactiveTag = `<interactive name="${interactive}"></interactive>`;
    if (!hasInteractiveTag(body, interactive)) {
        const blocks = body.split(/\n{2,}/);
        const firstSectionIndex = blocks.findIndex((block) => block.startsWith("## "));
        const insertAfter = firstSectionIndex > 0 ? firstSectionIndex : Math.min(2, blocks.length);
        blocks.splice(insertAfter, 0, interactiveTag);
        body = blocks.join("\n\n");
    }

    return { title, content: body, summary: frontmatter.summary || extractSummary(body), frontmatter };
}

function readArticle(config: StaticArticleConfig, index: number): StaticArticle {
    const raw = fs.readFileSync(path.join(ARTICLE_DIR, config.file), "utf8");
    const { title, content, summary, frontmatter } = cleanMarkdown(raw, config.interactive);
    const createdAt = new Date(BASE_DATE - index * 24 * 60 * 60 * 1000);
    const articleId = `static-source-${config.id}`;
    const coverImage = getCover({
        title,
        label: config.visualLabel,
        category: config.category,
        concept: frontmatter.coverConcept,
    });
    const subtitle = frontmatter.subtitle || config.visualLabel;

    return {
        id: config.id,
        title,
        subtitle,
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
        seoTitle: frontmatter.seoTitle,
        difficulty: frontmatter.difficulty ?? config.difficulty,
        readingMinutes: frontmatter.readingMinutes,
        coverConcept: frontmatter.coverConcept,
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
