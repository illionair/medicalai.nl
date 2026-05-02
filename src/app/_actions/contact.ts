"use server";

import nodemailer from "nodemailer";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function smtpReady() {
    return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function resendReady() {
    return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

function contactRecipient() {
    return (
        process.env.CONTACT_EMAIL?.trim() ||
        process.env.SMTP_USER?.trim() ||
        process.env.ADMIN_EMAILS?.split(",")[0]?.trim() ||
        ""
    );
}

export async function sendContactEmail(formData: FormData) {
    const name = String(formData.get("name") || "").trim().slice(0, 120);
    const email = String(formData.get("email") || "").trim().slice(0, 254);
    const subject = String(formData.get("subject") || "").trim().slice(0, 160);
    const message = String(formData.get("message") || "").trim().slice(0, 5000);

    if (!name || !email || !subject || !message) {
        return { success: false, error: "Vul alle velden in." };
    }

    const ip = await getClientIp();
    const rl = await rateLimit({ key: `contact:${ip}`, limit: 3, windowSec: 60 * 60 });
    if (!rl.success) return { success: false, error: "Te veel pogingen. Probeer het later opnieuw." };

    try {
        const to = contactRecipient();
        if (!to) {
            throw new Error("CONTACT_EMAIL, SMTP_USER or ADMIN_EMAILS must be configured for contact messages.");
        }

        const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const html = `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `;

        if (resendReady()) {
            const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: process.env.EMAIL_FROM,
                    to,
                    reply_to: email,
                    subject: `[Contact Form] ${subject}`,
                    text,
                    html,
                }),
            });

            if (!response.ok) {
                const body = await response.text().catch(() => "");
                throw new Error(`Resend failed to send contact email: ${response.status} ${body.slice(0, 200)}`);
            }

            return { success: true };
        }

        if (!smtpReady()) {
            throw new Error("RESEND_API_KEY with EMAIL_FROM or SMTP_HOST, SMTP_USER and SMTP_PASS are required to send contact emails.");
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

        await transporter.sendMail({
            from: process.env.EMAIL_FROM || `"Medical AI Contact" <${process.env.SMTP_USER}>`,
            to,
            replyTo: email,
            subject: `[Contact Form] ${subject}`,
            text,
            html,
        });
        return { success: true };
    } catch (error) {
        console.error("[contact] Failed to send email", error);
        return { success: false, error: "Failed to send email" };
    }
}
