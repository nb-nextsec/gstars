export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';
import { verifyToken, getTokenFromRequest } from '../../../lib/jwt';

async function purgeSponsorCache() {
  try {
    const cfCaches = caches as unknown as { default: Cache };
    const cache = cfCaches.default;
    const origins = [
      'https://geelong-stars.pages.dev',
      'https://www.geelongstars.com.au',
      'https://geelongstars.com.au',
      'https://geelong-stars.secure-dynamics.workers.dev'
    ];
    const purgePromises = origins.flatMap(origin => [
      cache.delete(new Request(`${origin}/api/sponsors`, { method: 'GET' })),
      cache.delete(new Request(`${origin}/api/sponsors?active=true`, { method: 'GET' })),
    ]);
    await Promise.all(purgePromises);
  } catch (e) {
    console.error('Cache purge failed:', e);
  }
}

export async function POST({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const token = getTokenFromRequest(request);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const body = await request.json() as { order: number[] };
    if (!body.order || !Array.isArray(body.order) || !body.order.length) return err('Order array is required', 400);

    const statements = body.order.map((id, index) =>
      env.DB.prepare('UPDATE sponsors SET display_order = ? WHERE id = ?').bind(index + 1, id)
    );
    await env.DB.batch(statements);
    await purgeSponsorCache();
    return ok(null, 'Sponsors reordered successfully');
  } catch (e) {
    console.error('Reorder sponsors error:', e);
    return err('Failed to reorder sponsors', 500);
  }
}
