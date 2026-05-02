import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
});

describe("auth constants", () => {
    it("uses SITE_ACCESS_CODE from the environment", async () => {
        vi.stubEnv("SITE_ACCESS_CODE", "configured-code");

        const auth = await import("@/lib/auth");

        expect(auth.SITE_ACCESS_CODE).toBe("configured-code");
    });

    it("fails at module load when SITE_ACCESS_CODE is missing", async () => {
        vi.stubEnv("SITE_ACCESS_CODE", "");

        await expect(import("@/lib/auth")).rejects.toThrow("SITE_ACCESS_CODE");
    });
});
