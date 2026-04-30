import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { COOKIE_NAME_USER_SESSION } from "@/lib/auth";

const USER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function hashToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
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
        cookieStore.delete(COOKIE_NAME_USER_SESSION);
        return null;
    }

    return session.user;
}

export async function clearUserSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME_USER_SESSION)?.value;

    if (token) {
        await prisma.userSession.deleteMany({ where: { tokenHash: hashToken(token) } });
    }

    cookieStore.delete(COOKIE_NAME_USER_SESSION);
}
