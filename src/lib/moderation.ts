export type CommentStatus = "PENDING" | "APPROVED" | "REJECTED";

const DEFAULT_TRUST_THRESHOLD = 3;

export function getTrustThreshold(): number {
    const raw = process.env.MODERATION_TRUST_THRESHOLD;
    if (!raw) return DEFAULT_TRUST_THRESHOLD;
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed) || parsed < 1) return DEFAULT_TRUST_THRESHOLD;
    return parsed;
}

export function resolveCommentStatus(user: { trustedAt: Date | null }): CommentStatus {
    return user.trustedAt ? "APPROVED" : "PENDING";
}

export function shouldGrantTrust(user: { trustedAt: Date | null; approvedCount: number }): boolean {
    if (user.trustedAt) return false;
    return user.approvedCount >= getTrustThreshold();
}
