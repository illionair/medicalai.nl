const REQUIRED_ENV_VARS = [
    "SITE_ACCESS_CODE",
    "AUTH_SECRET",
    "ADMIN_EMAILS",
    "DATABASE_URL",
    "DIRECT_URL",
    "OPENAI_API_KEY",
    "NEXT_PUBLIC_SITE_URL",
] as const;

const SMTP_ENV_VARS = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const;
const RESEND_ENV_VARS = ["RESEND_API_KEY", "EMAIL_FROM"] as const;
const LEGACY_SITE_HOSTS: Record<string, string> = {
    "medicalai.nl": "medical-ai.nl",
    "www.medicalai.nl": "www.medical-ai.nl",
};

export type RequiredEnvVar = (typeof REQUIRED_ENV_VARS)[number];

export function getRequiredEnv(name: RequiredEnvVar) {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export function getAdminEmails() {
    return getRequiredEnv("ADMIN_EMAILS")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
}

export function isAdminEmail(email: string) {
    return getAdminEmails().includes(email.trim().toLowerCase());
}

export function normalizeSiteUrl(value: string) {
    const trimmed = value.trim().replace(/\/$/, "");

    try {
        const url = new URL(trimmed);
        const normalizedHost = LEGACY_SITE_HOSTS[url.hostname];

        if (normalizedHost) {
            url.hostname = normalizedHost;
        }

        return url.toString().replace(/\/$/, "");
    } catch {
        return trimmed
            .replace("://www.medicalai.nl", "://www.medical-ai.nl")
            .replace("://medicalai.nl", "://medical-ai.nl");
    }
}

export function resolveSiteUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
    if (process.env.VERCEL_URL) return normalizeSiteUrl(`https://${process.env.VERCEL_URL}`);
    if (process.env.AUTH_URL) return normalizeSiteUrl(process.env.AUTH_URL);
    return "http://localhost:3000";
}

export function isPostgresDatabaseUrl(value = process.env.DATABASE_URL) {
    const trimmed = value?.trim();
    if (!trimmed) return false;

    try {
        const url = new URL(trimmed);
        return url.protocol === "postgresql:" || url.protocol === "postgres:";
    } catch {
        return false;
    }
}

export function hasPostgresDatabaseConfig() {
    return isPostgresDatabaseUrl(process.env.DATABASE_URL) && isPostgresDatabaseUrl(process.env.DIRECT_URL);
}

export function assertEnv() {
    const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]?.trim());
    const hasResend = RESEND_ENV_VARS.every((name) => process.env[name]?.trim());
    const hasSmtp = SMTP_ENV_VARS.every((name) => process.env[name]?.trim());

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${[...new Set(missing)].join(", ")}`);
    }

    if (!hasResend && !hasSmtp) {
        throw new Error("Missing email provider configuration: set RESEND_API_KEY or SMTP_HOST, SMTP_USER and SMTP_PASS");
    }
}
