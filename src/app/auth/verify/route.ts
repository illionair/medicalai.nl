import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLinkToken } from "@/lib/user-auth";
import { rateLimit } from "@/lib/rate-limit";
import { hasPostgresDatabaseConfig } from "@/lib/env";

function clientIpFromRequest(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]!.trim();
    const realIp = request.headers.get("x-real-ip");
    if (realIp) return realIp.trim();
    return "unknown";
}

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/login?error=missing-token", request.url));
    }

    const ip = clientIpFromRequest(request);
    const rl = await rateLimit({ key: `magic-link-verify:${ip}`, limit: 10, windowSec: 15 * 60 });
    if (!rl.success) {
        return NextResponse.redirect(new URL("/login?error=rate-limited", request.url));
    }

    if (!hasPostgresDatabaseConfig()) {
        console.error("[auth] Cannot verify magic link because DATABASE_URL or DIRECT_URL is not a Postgres URL.");
        return NextResponse.redirect(new URL("/login?error=db-unavailable", request.url));
    }

    const result = await verifyMagicLinkToken(token).catch((error) => {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[auth] Failed to verify magic link", message);
        return { ok: false as const, redirectTo: "/login" };
    });

    if (!result.ok) {
        return NextResponse.redirect(new URL("/login?error=invalid-link", request.url));
    }

    return NextResponse.redirect(new URL(result.redirectTo || "/", request.url));
}
