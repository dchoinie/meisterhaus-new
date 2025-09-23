/**
 * A simple in-memory rate limiting implementation
 * In production, consider using Redis or another distributed cache
 */

export interface RateLimitOptions {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max number of unique tokens per interval
}

interface TokenCount {
  tokens: Map<string, number>;
  createdAt: number;
}

export function rateLimit(options: RateLimitOptions) {
  const tokenCache = new Map<string, TokenCount>();

  return {
    check: (limit: number, token: string) => {
      const now = Date.now();
      const windowStart = now - options.interval;

      // Clear old entries
      for (const [key, value] of tokenCache.entries()) {
        if (value.createdAt < windowStart) {
          tokenCache.delete(key);
        }
      }

      // Create new bucket if needed
      const bucket = tokenCache.get(token) || {
        tokens: new Map([[token, 0]]),
        createdAt: now,
      };

      // Check if token is rate limited
      const tokenCount = bucket.tokens.get(token) || 0;

      // If rate limit exceeded
      if (tokenCount >= limit) {
        return Promise.reject(new Error("Rate limit exceeded"));
      }

      // Increment token count
      bucket.tokens.set(token, tokenCount + 1);
      tokenCache.set(token, bucket);

      return Promise.resolve();
    },
  };
}
