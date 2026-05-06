"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME_SITE_ACCESS } from "@/lib/auth";
import { clearUserSession, createMagicLinkToken } from "@/lib/user-auth";
import { buildMagicLink, sendMagicLinkEmail } from "@/lib/magic-link-mail";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { hasPostgresDatabaseConfig } from "@/lib/env";

const RATE_LIMIT_ERROR = { error: "Te veel pogingen. Probeer het later opnieuw." } as const;
const DATABASE_CONFIG_ERROR = {
    error: "Inloggen is tijdelijk niet beschikbaar: de database is niet als Postgres geconfigureerd.",
} as const;

export async function verifySiteAccess(formData: FormData) {
    const code = formData.get("code") as string;
    const expectedCode = process.env.SITE_ACCESS_CODE?.trim() || "medical2025";

    const ip = await getClientIp();
    const rl = await rateLimit({ key: `site-access:${ip}`, limit: 10, windowSec: 15 * 60 });
    if (!rl.success) return RATE_LIMIT_ERROR;

    if (code === expectedCode) {
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME_SITE_ACCESS, "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });
        redirect("/");
    } else {
        return { error: "Invalid access code" };
    }
}

export async function requestMagicLink(formData: FormData) {
    const name = String(formData.get("name") || "").trim().slice(0, 80);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const redirectTo = String(formData.get("next") || "/");

    if (!name) return { error: "Vul je naam in." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Vul een geldig e-mailadres in." };

    if (!hasPostgresDatabaseConfig()) {
        console.error("[auth] Cannot request magic link because DATABASE_URL or DIRECT_URL is not a Postgres URL.");
        return DATABASE_CONFIG_ERROR;
    }

    const ip = await getClientIp();
    const ipRl = await rateLimit({ key: `magic-link-ip:${ip}`, limit: 20, windowSec: 60 * 60 });
    if (!ipRl.success) return RATE_LIMIT_ERROR;
    const emailRl = await rateLimit({ key: `magic-link-email:${email}`, limit: 5, windowSec: 15 * 60 });
    if (!emailRl.success) return RATE_LIMIT_ERROR;

    try {
        const { token } = await createMagicLinkToken({ email, name, redirectTo });
        await sendMagicLinkEmail({ to: email, name, url: buildMagicLink(token) });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[auth] Failed to request magic link", message);
        return { error: "Loginlink kon niet worden verstuurd. Probeer het later opnieuw." };
    }

    return { success: true };
}

export async function logoutUser() {
    await clearUserSession();
    redirect("/");
}
