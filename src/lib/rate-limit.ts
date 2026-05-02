import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

export async function getClientIp(): Promise<string> {
    const h = await headers();
    const forwarded = h.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]!.trim();
    const realIp = h.get("x-real-ip");
    if (realIp) return realIp.trim();
    return "unknown";
}

export interface RateLimitClient {
    incr(key: string): Promise<number>;
    expire(key: string, seconds: number): Promise<unknown>;
    ttl(key: string): Promise<number>;
}

export interface RateLimitOptions {
    key: string;
    limit: number;
    windowSec: number;
    client?: RateLimitClient;
}

export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetSec: number;
}

let _redis: Redis | null = null;
let warnedAboutUnavailableRateLimit = false;

function allowRequest(limit: number, windowSec: number): RateLimitResult {
    return {
        success: true,
        remaining: Math.max(0, limit - 1),
        resetSec: windowSec,
    };
}

function warnRateLimitUnavailable(message: string, error?: unknown) {
    if (warnedAboutUnavailableRateLimit) return;
    warnedAboutUnavailableRateLimit = true;
    console.warn(`[rate-limit] ${message}; allowing requests without rate limiting.`, error);
}

function getDefaultClient(): RateLimitClient | null {
    const url = process.env.KV_REST_API_URL?.trim();
    const token = process.env.KV_REST_API_TOKEN?.trim();
    if (!url || !token) {
        warnRateLimitUnavailable("KV_REST_API_URL and KV_REST_API_TOKEN are not configured");
        return null;
    }

    if (!_redis) {
        _redis = new Redis({
            url,
            token,
        });
    }
    return _redis as unknown as RateLimitClient;
}

export async function rateLimit({ key, limit, windowSec, client }: RateLimitOptions): Promise<RateLimitResult> {
    const c = client || getDefaultClient();
    if (!c) return allowRequest(limit, windowSec);

    const namespacedKey = `rl:${key}`;
    try {
        const count = await c.incr(namespacedKey);
        if (count === 1) {
            await c.expire(namespacedKey, windowSec);
        }
        const ttl = await c.ttl(namespacedKey);
        return {
            success: count <= limit,
            remaining: Math.max(0, limit - count),
            resetSec: ttl > 0 ? ttl : windowSec,
        };
    } catch (error) {
        warnRateLimitUnavailable("Rate limit backend is unavailable", error);
        return allowRequest(limit, windowSec);
    }
}
