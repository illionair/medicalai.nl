import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLinkToken } from "@/lib/user-auth";

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/login?error=missing-token", request.url));
    }

    const result = await verifyMagicLinkToken(token);

    if (!result.ok) {
        return NextResponse.redirect(new URL("/login?error=invalid-link", request.url));
    }

    return NextResponse.redirect(new URL(result.redirectTo || "/", request.url));
}
