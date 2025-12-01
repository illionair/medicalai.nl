import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy-key");

export async function generateBlogPost(article: { title: string; abstract: string; authors: string }, instructions?: string) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in .env file");
    }

    // Using gemini-2.0-flash as it is available in the user's model list.
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    You are a medical AI expert and professional science communicator.
    Write a blog post for a website designated for medical professionals and researchers.
    
    Source Article:
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

    ${instructions ? `CUSTOM INSTRUCTIONS FROM USER:\n${instructions}\n(Please prioritize these instructions over the general requirements if they conflict)` : ""}
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error("Error generating blog post with Gemini:", error);
        throw error;
    }
}

export async function listAvailableModels() {
    if (!process.env.GEMINI_API_KEY) return ["No API Key"];
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        if (data.models) {
            return data.models
                .filter((m: any) => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
                .map((m: any) => m.name);
        }
        return ["No models returned in list", JSON.stringify(data)];
    } catch (e: any) {
        return [`Error listing models: ${e.message}`];
    }
}
