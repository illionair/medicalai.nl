import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { resolveCommentStatus, getTrustThreshold, shouldGrantTrust } from "@/lib/moderation";

describe("getTrustThreshold", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("returns 3 by default", () => {
        vi.stubEnv("MODERATION_TRUST_THRESHOLD", "");
        expect(getTrustThreshold()).toBe(3);
    });

    it("respects MODERATION_TRUST_THRESHOLD env override", () => {
        vi.stubEnv("MODERATION_TRUST_THRESHOLD", "5");
        expect(getTrustThreshold()).toBe(5);
    });

    it("falls back to 3 if env value invalid", () => {
        vi.stubEnv("MODERATION_TRUST_THRESHOLD", "not-a-number");
        expect(getTrustThreshold()).toBe(3);
    });

    it("falls back to 3 if env value is zero or negative", () => {
        vi.stubEnv("MODERATION_TRUST_THRESHOLD", "0");
        expect(getTrustThreshold()).toBe(3);
        vi.stubEnv("MODERATION_TRUST_THRESHOLD", "-2");
        expect(getTrustThreshold()).toBe(3);
    });
});

describe("resolveCommentStatus", () => {
    it("trusted user gets APPROVED", () => {
        const status = resolveCommentStatus({ trustedAt: new Date() });
        expect(status).toBe("APPROVED");
    });

    it("untrusted user gets PENDING", () => {
        const status = resolveCommentStatus({ trustedAt: null });
        expect(status).toBe("PENDING");
    });
});

describe("shouldGrantTrust", () => {
    beforeEach(() => {
        vi.stubEnv("MODERATION_TRUST_THRESHOLD", "3");
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("returns true when approved count reaches threshold", () => {
        expect(shouldGrantTrust({ trustedAt: null, approvedCount: 3 })).toBe(true);
    });

    it("returns true when approved count exceeds threshold", () => {
        expect(shouldGrantTrust({ trustedAt: null, approvedCount: 5 })).toBe(true);
    });

    it("returns false when approved count below threshold", () => {
        expect(shouldGrantTrust({ trustedAt: null, approvedCount: 2 })).toBe(false);
    });

    it("returns false when user already trusted (no-op)", () => {
        expect(shouldGrantTrust({ trustedAt: new Date(), approvedCount: 10 })).toBe(false);
    });
});
