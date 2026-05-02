import { afterEach, describe, expect, it, vi } from "vitest";
import { assertEnv, getAdminEmails, getRequiredEnv, isAdminEmail } from "@/lib/env";

const REQUIRED_VALUES = {
    SITE_ACCESS_CODE: "site-code",
    AUTH_SECRET: "auth-secret",
    ADMIN_EMAILS: "admin@example.com, backup@example.com",
    DATABASE_URL: "postgresql://user:pass@example.com:5432/db",
    OPENAI_API_KEY: "openai-key",
    EMAIL_FROM: "Medical AI <noreply@example.com>",
    NEXT_PUBLIC_SITE_URL: "https://example.com",
    KV_REST_API_URL: "https://kv.example.com",
    KV_REST_API_TOKEN: "kv-token",
    RESEND_API_KEY: "resend-key",
};

function stubRequiredEnv(overrides: Record<string, string | undefined> = {}) {
    for (const [name, value] of Object.entries({ ...REQUIRED_VALUES, ...overrides })) {
        if (value === undefined) {
            vi.stubEnv(name, undefined);
        } else {
            vi.stubEnv(name, value);
        }
    }
}

afterEach(() => {
    vi.unstubAllEnvs();
});

describe("env helpers", () => {
    it("returns required values and throws when a required value is missing", () => {
        vi.stubEnv("SITE_ACCESS_CODE", "expected-code");
        expect(getRequiredEnv("SITE_ACCESS_CODE")).toBe("expected-code");

        vi.stubEnv("SITE_ACCESS_CODE", "");
        expect(() => getRequiredEnv("SITE_ACCESS_CODE")).toThrow("SITE_ACCESS_CODE");
    });

    it("parses admin allowlist emails case-insensitively", () => {
        vi.stubEnv("ADMIN_EMAILS", " Admin@Example.com, backup@example.com ");

        expect(getAdminEmails()).toEqual(["admin@example.com", "backup@example.com"]);
        expect(isAdminEmail("ADMIN@example.com")).toBe(true);
        expect(isAdminEmail("reader@example.com")).toBe(false);
    });

    it("accepts a complete environment with Resend configured", () => {
        stubRequiredEnv();

        expect(() => assertEnv()).not.toThrow();
    });

    it("requires either Resend or SMTP settings for email", () => {
        stubRequiredEnv({
            RESEND_API_KEY: undefined,
            SMTP_HOST: undefined,
            SMTP_USER: undefined,
            SMTP_PASS: undefined,
        });

        expect(() => assertEnv()).toThrow("Missing email provider configuration");
    });
});
