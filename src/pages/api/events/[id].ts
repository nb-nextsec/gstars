export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';
import { verifyToken, getTokenFromRequest } from '../../../lib/jwt';

export async function GET({ params, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const id = parseInt(params.id!);
    if (isNaN(id)) return err('Invalid event ID', 400);

    const event = await env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first();
    if (!event) return err('Event not found', 404);
    return ok(event);
  } catch (e) {
    console.error('Get event error:', e);
    return err('Failed to fetch event', 500);
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
    if (isNaN(id)) return err('Invalid event ID', 400);

    const existing = await env.DB.prepare('SELECT id FROM events WHERE id = ?').bind(id).first();
    if (!existing) return err('Event not found', 404);

    const body = await request.json() as {
      title?: string;
      description?: string;
      date?: string;
      time?: string;
      location?: string;
      image_url?: string;
      is_active?: boolean | string;
    };
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    if (body.title !== undefined) { updates.push('title = ?'); values.push(body.title); }
    if (body.description !== undefined) { updates.push('description = ?'); values.push(body.description || null); }
    if (body.date !== undefined) { updates.push('date = ?'); values.push(body.date); }
    if (body.time !== undefined) { updates.push('time = ?'); values.push(body.time || null); }
    if (body.location !== undefined) { updates.push('location = ?'); values.push(body.location || null); }
    if (body.image_url !== undefined) { updates.push('image_url = ?'); values.push(body.image_url || null); }
    if (body.is_active !== undefined) { updates.push('is_active = ?'); values.push(body.is_active === true || body.is_active === 'true' ? 1 : 0); }

    if (!updates.length) return err('No updates provided', 400);
    values.push(id);

    await env.DB.prepare(`UPDATE events SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
    const event = await env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first();
    return ok(event, 'Event updated successfully');
  } catch (e) {
    console.error('Update event error:', e);
    return err('Failed to update event', 500);
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
    if (isNaN(id)) return err('Invalid event ID', 400);

    const existing = await env.DB.prepare('SELECT id FROM events WHERE id = ?').bind(id).first();
    if (!existing) return err('Event not found', 404);

    await env.DB.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
    return ok(null, 'Event deleted successfully');
  } catch (e) {
    console.error('Delete event error:', e);
    return err('Failed to delete event', 500);
  }
}
