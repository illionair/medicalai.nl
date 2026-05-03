import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME_SITE_ACCESS, COOKIE_NAME_USER_SESSION } from "@/lib/auth";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Exclude static assets and API routes (optional, depending on needs)
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.includes(".") // files like favicon.ico, hero-bg.png
    ) {
        return NextResponse.next();
    }

    // 2. Admin Routes Protection
    if (pathname.startsWith("/admin")) {
        if (pathname === "/admin/login") {
            return NextResponse.redirect(new URL("/login?next=/admin", request.url));
        }

        const sessionCookie = request.cookies.get(COOKIE_NAME_USER_SESSION);
        if (!sessionCookie) {
            const loginUrl = new URL("/login?next=/admin", request.url);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    // 3. Public Routes Protection (Gatekeeper)
    // Allow access to login and verification routes without the site cookie.
    if (["/access", "/login", "/auth/verify", "/about", "/contact"].includes(pathname)) {
        return NextResponse.next();
    }

    const accessCookie = request.cookies.get(COOKIE_NAME_SITE_ACCESS);
    if (!accessCookie) {
        const accessUrl = new URL("/access", request.url);
        return NextResponse.redirect(accessUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
