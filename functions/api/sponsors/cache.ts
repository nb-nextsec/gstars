// Cloudflare's CacheStorage has a `default` property not in the DOM type
const cfCaches = caches as unknown as { default: Cache };

// Purge all cached sponsor list responses from the edge cache.
// Called after any sponsor mutation (create, update, delete, reorder).
export async function purgeSponsorCache(requestUrl: string): Promise<void> {
  try {
    const cache = cfCaches.default;
    const origin = new URL(requestUrl).origin;
    // Purge both the unfiltered and active-only variants
    await Promise.all([
      cache.delete(new Request(`${origin}/api/sponsors`)),
      cache.delete(new Request(`${origin}/api/sponsors?active=true`)),
    ]);
  } catch (e) {
    console.error('Cache purge failed:', e);
  }
}
