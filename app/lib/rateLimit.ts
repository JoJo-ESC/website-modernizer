// Tiny in-memory rate limiter (per process). For production, swap for Redis/Upstash.
type Bucket = { count: number; resetAt: number };

const store: Map<string, Bucket> =
  (globalThis as any).__rateStore || new Map<string, Bucket>();
(globalThis as any).__rateStore = store;

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || bucket.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.max(bucket.resetAt - now, 0) };
  }

  bucket.count += 1;
  return { ok: true };
}
