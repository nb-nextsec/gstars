export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';
import { verifyToken, getTokenFromRequest } from '../../../lib/jwt';

export async function GET({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const section = url.searchParams.get('section');

    if (page && section) {
      const content = await env.DB.prepare('SELECT * FROM content WHERE page = ? AND section = ?')
        .bind(page, section).first();
      return ok(content);
    }
    if (page) {
      const r = await env.DB.prepare('SELECT * FROM content WHERE page = ?').bind(page).all();
      return ok(r.results);
    }
    const r = await env.DB.prepare('SELECT * FROM content ORDER BY page, section').all();
    return ok(r.results);
  } catch (e) {
    console.error('Get content error:', e);
    return err('Failed to fetch content', 500);
  }
}

export async function PUT({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const token = getTokenFromRequest(request);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const body = await request.json() as { page: string; section: string; content: string };
    if (!body.page || !body.section) return err('Page and section are required', 400);

    await env.DB.prepare(`
      INSERT INTO content (page, section, content, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(page, section) DO UPDATE SET content = excluded.content, updated_at = CURRENT_TIMESTAMP
    `).bind(body.page, body.section, body.content || null).run();

    const content = await env.DB.prepare('SELECT * FROM content WHERE page = ? AND section = ?')
      .bind(body.page, body.section).first();
    return ok(content, 'Content updated successfully');
  } catch (e) {
    console.error('Update content error:', e);
    return err('Failed to update content', 500);
  }
}
