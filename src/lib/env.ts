const REQUIRED_ENV_VARS = [
    "SITE_ACCESS_CODE",
    "AUTH_SECRET",
    "ADMIN_EMAILS",
    "DATABASE_URL",
    "OPENAI_API_KEY",
    "EMAIL_FROM",
    "NEXT_PUBLIC_SITE_URL",
    "KV_REST_API_URL",
    "KV_REST_API_TOKEN",
] as const;

const SMTP_ENV_VARS = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const;

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

export function assertEnv() {
    const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]?.trim());
    const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());
    const hasSmtp = SMTP_ENV_VARS.every((name) => process.env[name]?.trim());

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${[...new Set(missing)].join(", ")}`);
    }

    if (!hasResend && !hasSmtp) {
        throw new Error("Missing email provider configuration: set RESEND_API_KEY or SMTP_HOST, SMTP_USER and SMTP_PASS");
    }
}
