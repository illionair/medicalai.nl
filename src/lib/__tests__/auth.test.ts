import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
});

describe("auth constants", () => {
    it("does not read SITE_ACCESS_CODE at module load", async () => {
        vi.stubEnv("SITE_ACCESS_CODE", "");

        const auth = await import("@/lib/auth");

        expect(auth.COOKIE_NAME_SITE_ACCESS).toBe("medical_ai_access");
    });
});
