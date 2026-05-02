import OpenAI from "openai";

const SYSTEM_PROMPT = "You are a medical AI expert and professional science communicator who writes Markdown blog posts for Dutch medical professionals and researchers.";

function getClient(): OpenAI {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not set");
    }
    return new OpenAI({ apiKey });
}

function getModel(): string {
    return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}

function buildPrompt(article: { title: string; abstract: string; authors: string }, instructions?: string): string {
    return `Source Article:
Title: ${article.title}
Authors: ${article.authors}
Abstract: ${article.abstract}

Requirements:
1. Title: Catchy but professional.
2. Tone: Professional, critical, yet accessible. Apple-style minimalism in text structure.
3. Structure:
   - Introduction (Context)
   - Key Findings (Bulleted list)
   - Critical Analysis (Limitations, Ethics, Clinical Applicability)
   - Conclusion
4. Format: Markdown.
5. Language: Dutch (Nederlands).
${instructions ? `\nCUSTOM INSTRUCTIONS FROM USER:\n${instructions}\n(Please prioritize these instructions over the general requirements if they conflict)` : ""}`;
}

function buildPromptFromTopic(input: { topic: string; specialism?: string; template?: string; instructions?: string }): string {
    return `Write a new Markdown blog post for Medical-AI.nl based on this editorial prompt.

Topic:
${input.topic}

${input.specialism ? `Medical specialism/context: ${input.specialism}` : ""}
${input.template ? `Editorial template: ${input.template}` : ""}
${input.instructions ? `Extra instructions from editor:\n${input.instructions}` : ""}

Requirements:
1. Language: Dutch (Nederlands).
2. Audience: Dutch medical professionals and researchers.
3. Tone: Professional, critical, accessible, and practical.
4. Structure:
   - Introduction
   - Why this matters clinically
   - Current evidence and limitations
   - Risks, bias, privacy, and implementation concerns
   - Practical takeaways
   - Conclusion
5. Do not invent citations, DOI numbers, product approvals, or regulatory claims.
6. If sources are needed, add a section "Bronnen te verifiëren" with search suggestions instead of fabricated references.
7. Format: Markdown.`;
}

export async function generateBlogPost(
    article: { title: string; abstract: string; authors: string },
    instructions?: string,
): Promise<string> {
    const client = getClient();
    const completion = await client.chat.completions.create({
        model: getModel(),
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: buildPrompt(article, instructions) },
        ],
    });
    return completion.choices[0]?.message?.content ?? "";
}

export async function generateBlogPostFromPrompt(input: {
    topic: string;
    specialism?: string;
    template?: string;
    instructions?: string;
}): Promise<string> {
    const client = getClient();
    const completion = await client.chat.completions.create({
        model: getModel(),
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: buildPromptFromTopic(input) },
        ],
    });
    return completion.choices[0]?.message?.content ?? "";
}

export async function listAvailableModels(): Promise<string[]> {
    try {
        const client = getClient();
        const result = await client.models.list();
        return result.data.map((m) => m.id);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return [`Error listing models: ${message}`];
    }
}
