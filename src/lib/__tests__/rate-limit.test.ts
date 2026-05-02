import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rateLimit, type RateLimitClient } from "@/lib/rate-limit";

function createMemoryClient(): RateLimitClient {
    const store = new Map<string, { count: number; expiresAt: number }>();
    const now = () => Date.now();
    return {
        async incr(key) {
            const existing = store.get(key);
            if (!existing || existing.expiresAt <= now()) {
                store.set(key, { count: 1, expiresAt: Number.POSITIVE_INFINITY });
                return 1;
            }
            existing.count += 1;
            return existing.count;
        },
        async expire(key, seconds) {
            const existing = store.get(key);
            if (existing) existing.expiresAt = now() + seconds * 1000;
        },
        async ttl(key) {
            const existing = store.get(key);
            if (!existing) return -2;
            if (existing.expiresAt === Number.POSITIVE_INFINITY) return -1;
            return Math.max(0, Math.ceil((existing.expiresAt - now()) / 1000));
        },
    };
}

describe("rateLimit", () => {
    let client: RateLimitClient;

    beforeEach(() => {
        client = createMemoryClient();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    });

    it("first call within window returns success and remaining = limit - 1", async () => {
        const result = await rateLimit({ key: "user:a", limit: 3, windowSec: 60, client });
        expect(result.success).toBe(true);
        expect(result.remaining).toBe(2);
    });

    it("sets expiry on first call only", async () => {
        let expireCalls = 0;
        const wrapped: RateLimitClient = {
            ...client,
            async expire(key, seconds) {
                expireCalls += 1;
                return client.expire(key, seconds);
            },
        };
        await rateLimit({ key: "user:b", limit: 5, windowSec: 60, client: wrapped });
        await rateLimit({ key: "user:b", limit: 5, windowSec: 60, client: wrapped });
        await rateLimit({ key: "user:b", limit: 5, windowSec: 60, client: wrapped });
        expect(expireCalls).toBe(1);
    });

    it("calls within limit all succeed", async () => {
        for (let i = 0; i < 3; i++) {
            const result = await rateLimit({ key: "user:c", limit: 3, windowSec: 60, client });
            expect(result.success).toBe(true);
        }
    });

    it("call exceeding limit returns success = false", async () => {
        for (let i = 0; i < 3; i++) {
            await rateLimit({ key: "user:d", limit: 3, windowSec: 60, client });
        }
        const result = await rateLimit({ key: "user:d", limit: 3, windowSec: 60, client });
        expect(result.success).toBe(false);
        expect(result.remaining).toBe(0);
    });

    it("different keys are independent", async () => {
        await rateLimit({ key: "user:e", limit: 1, windowSec: 60, client });
        const otherKey = await rateLimit({ key: "user:f", limit: 1, windowSec: 60, client });
        expect(otherKey.success).toBe(true);
    });

    it("returns remaining ttl in resetSec after expire", async () => {
        const result = await rateLimit({ key: "user:g", limit: 5, windowSec: 60, client });
        expect(result.resetSec).toBeGreaterThan(0);
        expect(result.resetSec).toBeLessThanOrEqual(60);
    });

    it("allows requests when default KV configuration is missing", async () => {
        vi.stubEnv("KV_REST_API_URL", undefined);
        vi.stubEnv("KV_REST_API_TOKEN", undefined);
        vi.spyOn(console, "warn").mockImplementation(() => undefined);

        const result = await rateLimit({ key: "user:h", limit: 3, windowSec: 60 });

        expect(result.success).toBe(true);
        expect(result.remaining).toBe(2);
    });

    it("allows requests when the rate limit backend fails", async () => {
        vi.spyOn(console, "warn").mockImplementation(() => undefined);
        const failingClient: RateLimitClient = {
            async incr() {
                throw new Error("redis down");
            },
            async expire() {
                throw new Error("redis down");
            },
            async ttl() {
                throw new Error("redis down");
            },
        };

        const result = await rateLimit({ key: "user:i", limit: 3, windowSec: 60, client: failingClient });

        expect(result.success).toBe(true);
        expect(result.remaining).toBe(2);
    });
});
