import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLinkToken } from "@/lib/user-auth";
import { rateLimit } from "@/lib/rate-limit";

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

    const result = await verifyMagicLinkToken(token);

    if (!result.ok) {
        return NextResponse.redirect(new URL("/login?error=invalid-link", request.url));
    }

    return NextResponse.redirect(new URL(result.redirectTo || "/", request.url));
}
