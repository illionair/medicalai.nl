import nodemailer from "nodemailer";

function siteUrl() {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    if (process.env.AUTH_URL) return process.env.AUTH_URL.replace(/\/$/, "");
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
}

function smtpReady() {
    return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

export function buildMagicLink(token: string) {
    const url = new URL("/auth/verify", siteUrl());
    url.searchParams.set("token", token);
    return url.toString();
}

export async function sendMagicLinkEmail(input: { to: string; name?: string; url: string }) {
    if (!smtpReady()) {
        if (process.env.NODE_ENV === "production") {
            throw new Error("SMTP_HOST, SMTP_USER and SMTP_PASS are required to send login links.");
        }

        console.info(`[auth] Magic login link for ${input.to}: ${input.url}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const from = process.env.EMAIL_FROM || `"Medical AI" <${process.env.SMTP_USER}>`;
    const displayName = input.name || "daar";
    const safeDisplayName = escapeHtml(displayName);
    const safeUrl = escapeHtml(input.url);

    await transporter.sendMail({
        from,
        to: input.to,
        subject: "Je loginlink voor Medical AI",
        text: `Hallo ${displayName},\n\nKlik op deze link om in te loggen bij Medical AI:\n${input.url}\n\nDeze link verloopt over 15 minuten. Als jij dit niet was, kun je deze mail negeren.`,
        html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
                <h2>Login bij Medical AI</h2>
                <p>Hallo ${safeDisplayName},</p>
                <p>Klik op onderstaande knop om in te loggen. Deze link verloopt over 15 minuten.</p>
                <p>
                    <a href="${safeUrl}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:bold">
                        Inloggen
                    </a>
                </p>
                <p style="font-size:13px;color:#666">Als de knop niet werkt, open dan deze link:<br>${safeUrl}</p>
                <p style="font-size:13px;color:#666">Als jij dit niet was, kun je deze mail negeren.</p>
            </div>
        `,
    });
}
