export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';
import { verifyToken, getTokenFromRequest } from '../../../lib/jwt';

export async function GET({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const url = new URL(request.url);
    const activeOnly = url.searchParams.get('active') === 'true';
    const upcoming = url.searchParams.get('upcoming') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '100');

    let query = 'SELECT * FROM events';
    const conditions: string[] = [];
    if (activeOnly) conditions.push('is_active = 1');
    if (upcoming) conditions.push("date >= date('now')");
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY date ASC';
    if (limit > 0) query += ` LIMIT ${limit}`;

    const r = await env.DB.prepare(query).all();
    return ok(r.results);
  } catch (e) {
    console.error('Get events error:', e);
    return err('Failed to fetch events', 500);
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
      title: string;
      description?: string;
      date: string;
      time?: string;
      location?: string;
      image_url?: string;
      is_active?: boolean;
    };
    if (!body.title || !body.date) return err('Title and date are required', 400);

    const r = await env.DB.prepare(`
      INSERT INTO events (title, description, date, time, location, image_url, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.title,
      body.description || null,
      body.date,
      body.time || null,
      body.location || null,
      body.image_url || null,
      body.is_active !== false ? 1 : 0
    ).run();

    if (!r.success) return err('Failed to create event', 500);
    const event = await env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(r.meta.last_row_id).first();
    return ok(event, 'Event created successfully');
  } catch (e) {
    console.error('Create event error:', e);
    return err('Failed to create event', 500);
  }
}
