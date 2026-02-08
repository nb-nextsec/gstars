import type { Env } from '../../types';
import { successResponse, errorResponse } from '../../types';
import { verifyToken, getTokenFromRequest } from '../../jwt';

interface PagesContext {
  request: Request;
  env: Env;
  params: {
    id: string;
  };
}

interface Event {
  id: number;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  location: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

interface EventInput {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  image_url?: string;
  is_active?: boolean | string;
}

// GET /api/events/:id
export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { env, params } = context;

  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return errorResponse('Invalid event ID', 400);
    }

    const event = await env.DB.prepare('SELECT * FROM events WHERE id = ?')
      .bind(id)
      .first<Event>();

    if (!event) {
      return errorResponse('Event not found', 404);
    }

    return successResponse(event);
  } catch (error) {
    console.error('Get event error:', error);
    return errorResponse('Failed to fetch event', 500);
  }
}

// PUT /api/events/:id
export async function onRequestPut(context: PagesContext): Promise<Response> {
  const { request, env, params } = context;

  try {
    // Verify authentication
    const token = getTokenFromRequest(request);
    if (!token) {
      return errorResponse('Authentication required', 401);
    }

    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) {
      return errorResponse('Invalid or expired token', 401);
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return errorResponse('Invalid event ID', 400);
    }

    const body: EventInput = await request.json();

    // Check if event exists
    const existing = await env.DB.prepare('SELECT id FROM events WHERE id = ?')
      .bind(id)
      .first();

    if (!existing) {
      return errorResponse('Event not found', 404);
    }

    // Build update query
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    if (body.title !== undefined) {
      updates.push('title = ?');
      values.push(body.title);
    }
    if (body.description !== undefined) {
      updates.push('description = ?');
      values.push(body.description || null);
    }
    if (body.date !== undefined) {
      updates.push('date = ?');
      values.push(body.date);
    }
    if (body.time !== undefined) {
      updates.push('time = ?');
      values.push(body.time || null);
    }
    if (body.location !== undefined) {
      updates.push('location = ?');
      values.push(body.location || null);
    }
    if (body.image_url !== undefined) {
      updates.push('image_url = ?');
      values.push(body.image_url || null);
    }
    if (body.is_active !== undefined) {
      updates.push('is_active = ?');
      const isActive = body.is_active === true || body.is_active === 'true' ? 1 : 0;
      values.push(isActive);
    }

    if (updates.length === 0) {
      return errorResponse('No updates provided', 400);
    }

    values.push(id);

    await env.DB.prepare(`UPDATE events SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    // Get updated event
    const event = await env.DB.prepare('SELECT * FROM events WHERE id = ?')
      .bind(id)
      .first<Event>();

    return successResponse(event, 'Event updated successfully');
  } catch (error) {
    console.error('Update event error:', error);
    return errorResponse('Failed to update event', 500);
  }
}

// DELETE /api/events/:id
export async function onRequestDelete(context: PagesContext): Promise<Response> {
  const { request, env, params } = context;

  try {
    // Verify authentication
    const token = getTokenFromRequest(request);
    if (!token) {
      return errorResponse('Authentication required', 401);
    }

    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) {
      return errorResponse('Invalid or expired token', 401);
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return errorResponse('Invalid event ID', 400);
    }

    // Check if event exists
    const existing = await env.DB.prepare('SELECT id FROM events WHERE id = ?')
      .bind(id)
      .first();

    if (!existing) {
      return errorResponse('Event not found', 404);
    }

    await env.DB.prepare('DELETE FROM events WHERE id = ?').bind(id).run();

    return successResponse(null, 'Event deleted successfully');
  } catch (error) {
    console.error('Delete event error:', error);
    return errorResponse('Failed to delete event', 500);
  }
}
