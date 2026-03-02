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

export async function GET({ params, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const id = parseInt(params.id!);
    if (isNaN(id)) return err('Invalid sponsor ID', 400);

    const sponsor = await env.DB.prepare('SELECT * FROM sponsors WHERE id = ?').bind(id).first();
    if (!sponsor) return err('Sponsor not found', 404);
    return ok(sponsor);
  } catch (e) {
    console.error('Get sponsor error:', e);
    return err('Failed to fetch sponsor', 500);
  }
}

export async function PUT({ params, request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const token = getTokenFromRequest(request);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(params.id!);
    if (isNaN(id)) return err('Invalid sponsor ID', 400);

    const existing = await env.DB.prepare('SELECT id FROM sponsors WHERE id = ?').bind(id).first();
    if (!existing) return err('Sponsor not found', 404);

    const body = await request.json() as {
      name?: string;
      logo_url?: string;
      website_url?: string;
      description?: string;
      display_order?: number;
      is_active?: boolean | string;
    };
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    if (body.name !== undefined) { updates.push('name = ?'); values.push(body.name); }
    if (body.logo_url !== undefined) { updates.push('logo_url = ?'); values.push(body.logo_url || null); }
    if (body.website_url !== undefined) { updates.push('website_url = ?'); values.push(body.website_url || null); }
    if (body.description !== undefined) { updates.push('description = ?'); values.push(body.description || null); }
    if (body.display_order !== undefined) { updates.push('display_order = ?'); values.push(body.display_order); }
    if (body.is_active !== undefined) { updates.push('is_active = ?'); values.push(body.is_active === true || body.is_active === 'true' ? 1 : 0); }

    if (!updates.length) return err('No updates provided', 400);
    values.push(id);

    await env.DB.prepare(`UPDATE sponsors SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
    const sponsor = await env.DB.prepare('SELECT * FROM sponsors WHERE id = ?').bind(id).first();
    await purgeSponsorCache();
    return ok(sponsor, 'Sponsor updated successfully');
  } catch (e) {
    console.error('Update sponsor error:', e);
    return err('Failed to update sponsor', 500);
  }
}

export async function DELETE({ params, request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const token = getTokenFromRequest(request);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(params.id!);
    if (isNaN(id)) return err('Invalid sponsor ID', 400);

    const existing = await env.DB.prepare('SELECT id FROM sponsors WHERE id = ?').bind(id).first();
    if (!existing) return err('Sponsor not found', 404);

    await env.DB.prepare('DELETE FROM sponsors WHERE id = ?').bind(id).run();
    await purgeSponsorCache();
    return ok(null, 'Sponsor deleted successfully');
  } catch (e) {
    console.error('Delete sponsor error:', e);
    return err('Failed to delete sponsor', 500);
  }
}
