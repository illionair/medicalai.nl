import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

const create = vi.fn();
const list = vi.fn();

vi.mock("openai", () => {
    return {
        default: class MockOpenAI {
            chat = { completions: { create } };
            models = { list };
        },
    };
});

beforeEach(() => {
    vi.resetModules();
    create.mockReset();
    list.mockReset();
    vi.stubEnv("OPENAI_API_KEY", "sk-test");
    vi.stubEnv("OPENAI_MODEL", "");
});

afterEach(() => {
    vi.unstubAllEnvs();
});

describe("generateBlogPost", () => {
    it("calls OpenAI chat.completions with prompt content and returns text", async () => {
        create.mockResolvedValue({
            choices: [{ message: { content: "# Generated post\n\nbody" } }],
        });

        const { generateBlogPost } = await import("@/lib/ai");
        const result = await generateBlogPost({
            title: "Test title",
            abstract: "Test abstract",
            authors: "Auteur A",
        });

        expect(result).toBe("# Generated post\n\nbody");
        expect(create).toHaveBeenCalledOnce();
        const args = create.mock.calls[0]![0];
        expect(args.model).toBe("gpt-4o-mini");
        expect(args.messages).toHaveLength(2);
        expect(args.messages[0].role).toBe("system");
        expect(args.messages[1].role).toBe("user");
        expect(args.messages[1].content).toContain("Test title");
        expect(args.messages[1].content).toContain("Test abstract");
        expect(args.messages[1].content).toContain("Auteur A");
    });

    it("uses OPENAI_MODEL env override when set", async () => {
        vi.stubEnv("OPENAI_MODEL", "gpt-4o");
        create.mockResolvedValue({ choices: [{ message: { content: "x" } }] });

        const { generateBlogPost } = await import("@/lib/ai");
        await generateBlogPost({ title: "t", abstract: "a", authors: "x" });

        expect(create.mock.calls[0]![0].model).toBe("gpt-4o");
    });

    it("appends custom instructions to prompt when provided", async () => {
        create.mockResolvedValue({ choices: [{ message: { content: "x" } }] });

        const { generateBlogPost } = await import("@/lib/ai");
        await generateBlogPost(
            { title: "t", abstract: "a", authors: "x" },
            "Focus op kosten",
        );

        const userMessage = create.mock.calls[0]![0].messages[1].content;
        expect(userMessage).toContain("Focus op kosten");
        expect(userMessage).toContain("CUSTOM INSTRUCTIONS");
    });

    it("returns empty string when API returns no content", async () => {
        create.mockResolvedValue({ choices: [{ message: { content: null } }] });

        const { generateBlogPost } = await import("@/lib/ai");
        const result = await generateBlogPost({ title: "t", abstract: "a", authors: "x" });

        expect(result).toBe("");
    });

    it("throws when OPENAI_API_KEY missing", async () => {
        vi.stubEnv("OPENAI_API_KEY", "");

        const { generateBlogPost } = await import("@/lib/ai");
        await expect(
            generateBlogPost({ title: "t", abstract: "a", authors: "x" }),
        ).rejects.toThrow(/OPENAI_API_KEY/);
    });
});

describe("generateBlogPostFromPrompt", () => {
    it("generates a Dutch draft prompt without fabricated citations", async () => {
        create.mockResolvedValue({
            choices: [{ message: { content: "# AI in de SEH\n\nConcept" } }],
        });

        const { generateBlogPostFromPrompt } = await import("@/lib/ai");
        const result = await generateBlogPostFromPrompt({
            topic: "AI-triage op de spoedeisende hulp",
            specialism: "SEH",
            template: "Implementatie in de praktijk",
            instructions: "Focus op werkdruk",
        });

        expect(result).toBe("# AI in de SEH\n\nConcept");
        const userMessage = create.mock.calls[0]![0].messages[1].content;
        expect(userMessage).toContain("AI-triage op de spoedeisende hulp");
        expect(userMessage).toContain("SEH");
        expect(userMessage).toContain("Implementatie in de praktijk");
        expect(userMessage).toContain("Do not invent citations");
        expect(userMessage).toContain("Bronnen te verifi");
    });
});

describe("listAvailableModels", () => {
    it("returns model ids from openai.models.list", async () => {
        list.mockResolvedValue({
            data: [{ id: "gpt-4o-mini" }, { id: "gpt-4o" }],
        });

        const { listAvailableModels } = await import("@/lib/ai");
        const result = await listAvailableModels();

        expect(result).toEqual(["gpt-4o-mini", "gpt-4o"]);
    });
});
