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

export async function GET({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const cfCaches = caches as unknown as { default: Cache };
    const cache = cfCaches.default;
    const url = new URL(request.url);
    const activeOnly = url.searchParams.get('active') === 'true';

    if (activeOnly) {
      const cacheKey = new Request(request.url, { method: 'GET' });
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    }

    let query = 'SELECT * FROM sponsors';
    if (activeOnly) query += ' WHERE is_active = 1';
    query += ' ORDER BY display_order ASC, name ASC';

    const r = await env.DB.prepare(query).all();
    const response = ok(r.results);

    if (activeOnly) {
      response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=3600');
      const cacheResponse = response.clone();
      cacheResponse.headers.set('Cache-Control', 'public, max-age=3600');
      cache.put(new Request(request.url, { method: 'GET' }), cacheResponse);
    } else {
      response.headers.set('Cache-Control', 'no-cache');
    }
    return response;
  } catch (e) {
    console.error('Get sponsors error:', e);
    return err('Failed to fetch sponsors', 500);
  }
}

export async function POST({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const token = getTokenFromRequest(request);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const body = await request.json() as {
      name: string;
      logo_url?: string;
      website_url?: string;
      description?: string;
      display_order?: number;
      is_active?: boolean;
    };
    if (!body.name) return err('Name is required', 400);

    const r = await env.DB.prepare(`
      INSERT INTO sponsors (name, logo_url, website_url, description, tier, display_order, is_active) VALUES (?, ?, ?, ?, 'bronze', ?, ?)
    `).bind(
      body.name,
      body.logo_url || null,
      body.website_url || null,
      body.description || null,
      body.display_order || 0,
      body.is_active !== false ? 1 : 0
    ).run();

    if (!r.success) return err('Failed to create sponsor', 500);
    const sponsor = await env.DB.prepare('SELECT * FROM sponsors WHERE id = ?').bind(r.meta.last_row_id).first();
    await purgeSponsorCache();
    return ok(sponsor, 'Sponsor created successfully');
  } catch (e) {
    console.error('Create sponsor error:', e);
    return err('Failed to create sponsor', 500);
  }
}
