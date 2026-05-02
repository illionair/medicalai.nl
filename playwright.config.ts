import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: "list",
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000",
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
    webServer: process.env.PLAYWRIGHT_BASE_URL
        ? undefined
        : {
            command: "npm run dev",
            env: {
                ...process.env,
                AUTH_SECRET: process.env.AUTH_SECRET || "test-auth-secret",
                SITE_ACCESS_CODE: process.env.SITE_ACCESS_CODE || "test-site-code",
                ADMIN_EMAILS: process.env.ADMIN_EMAILS || "admin@example.com",
                DATABASE_URL: process.env.DATABASE_URL || "postgresql://user:pass@localhost:5432/medical_ai_test",
                OPENAI_API_KEY: process.env.OPENAI_API_KEY || "test-openai-key",
                RESEND_API_KEY: process.env.RESEND_API_KEY || "test-resend-key",
                EMAIL_FROM: process.env.EMAIL_FROM || "Medical AI <noreply@example.com>",
                NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000",
                KV_REST_API_URL: process.env.KV_REST_API_URL || "https://kv.example.com",
                KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN || "test-kv-token",
            },
            url: "http://127.0.0.1:3000",
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
});
