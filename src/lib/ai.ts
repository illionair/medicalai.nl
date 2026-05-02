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
