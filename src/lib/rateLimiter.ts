interface RateLimitRule {
    limit: number;     // Max requests allowed
    windowMs: number;  // Window duration in milliseconds
}

// In-memory store mapping IP keys to request count and reset timestamp
const memoryStore = new Map<string, { count: number; resetTime: number }>();

// Simple cleanup interval to prevent memory leaks by removing expired entries
if (typeof global !== 'undefined') {
    // Only run this cleanup routine once
    const globalObj = global as any;
    if (!globalObj.__rateLimitCleanupInterval) {
        globalObj.__rateLimitCleanupInterval = setInterval(() => {
            const now = Date.now();
            for (const [key, value] of memoryStore.entries()) {
                if (now > value.resetTime) {
                    memoryStore.delete(key);
                }
            }
        }, 60000); // Clean up every 60 seconds
    }
}

/**
 * Checks if a given IP address has exceeded the rate limit.
 * @returns true if the request is rate-limited (blocked), false otherwise.
 */
export function isRateLimited(ip: string, rule: RateLimitRule): boolean {
    const now = Date.now();
    const record = memoryStore.get(ip);

    if (!record || now > record.resetTime) {
        // Initial request or window has expired: reset counter
        memoryStore.set(ip, {
            count: 1,
            resetTime: now + rule.windowMs,
        });
        return false;
    }

    if (record.count >= rule.limit) {
        return true;
    }

    record.count += 1;
    return false;
}
