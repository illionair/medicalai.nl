import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { COOKIE_NAME_USER_SESSION } from "@/lib/auth";
import { isAdminEmail } from "@/lib/env";

const USER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const MAGIC_LINK_MAX_AGE_MINUTES = 15;

function hashToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
}

function safeRedirectPath(path?: string | null) {
    if (!path || !path.startsWith("/") || path.startsWith("//")) return "/";
    return path;
}

export async function createUserSession(userId: string) {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + USER_SESSION_MAX_AGE_SECONDS * 1000);

    await prisma.userSession.create({
        data: {
            tokenHash: hashToken(token),
            userId,
            expiresAt,
        },
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME_USER_SESSION, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: USER_SESSION_MAX_AGE_SECONDS,
        path: "/",
    });
}

export async function createMagicLinkToken(input: { email: string; name?: string; redirectTo?: string }) {
    const token = randomBytes(32).toString("hex");
    const email = input.email.trim().toLowerCase();
    const expiresAt = new Date(Date.now() + MAGIC_LINK_MAX_AGE_MINUTES * 60 * 1000);

    await prisma.magicLinkToken.create({
        data: {
            tokenHash: hashToken(token),
            email,
            name: input.name?.trim().slice(0, 80) || null,
            redirectTo: safeRedirectPath(input.redirectTo),
            expiresAt,
        },
    });

    return { token, expiresAt };
}

export async function verifyMagicLinkToken(token: string) {
    const magicLink = await prisma.magicLinkToken.findUnique({
        where: { tokenHash: hashToken(token) },
    });

    if (!magicLink || magicLink.usedAt || magicLink.expiresAt <= new Date()) {
        return { ok: false, error: "Deze loginlink is verlopen of al gebruikt.", redirectTo: "/login" };
    }

    const user = await prisma.user.upsert({
        where: { email: magicLink.email },
        update: magicLink.name ? { name: magicLink.name } : {},
        create: {
            email: magicLink.email,
            name: magicLink.name || magicLink.email.split("@")[0],
        },
    });

    await prisma.magicLinkToken.update({
        where: { id: magicLink.id },
        data: {
            usedAt: new Date(),
            userId: user.id,
        },
    });

    await createUserSession(user.id);

    return { ok: true, redirectTo: safeRedirectPath(magicLink.redirectTo) };
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME_USER_SESSION)?.value;
    if (!token) return null;

    const session = await prisma.userSession.findUnique({
        where: { tokenHash: hashToken(token) },
        include: { user: true },
    });

    if (!session || session.expiresAt <= new Date()) {
        if (session) {
            await prisma.userSession.delete({ where: { id: session.id } }).catch(() => null);
        }
        return null;
    }

    return {
        ...session.user,
        isAdmin: isAdminEmail(session.user.email),
    };
}

export async function requireAdmin() {
    const user = await getCurrentUser();
    if (!user?.isAdmin) return null;
    return user;
}

export async function clearUserSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME_USER_SESSION)?.value;

    if (token) {
        await prisma.userSession.deleteMany({ where: { tokenHash: hashToken(token) } });
    }

    cookieStore.delete(COOKIE_NAME_USER_SESSION);
}
