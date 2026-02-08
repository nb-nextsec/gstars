import type { Env } from '../../types';
import { successResponse, errorResponse } from '../../types';
import { verifyToken, getTokenFromRequest } from '../../jwt';

interface PagesContext {
  request: Request;
  env: Env;
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
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  image_url?: string;
  is_active?: boolean;
}

// GET /api/events
export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const activeOnly = url.searchParams.get('active') === 'true';
    const upcoming = url.searchParams.get('upcoming') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '100');

    let query = 'SELECT * FROM events';
    const conditions: string[] = [];

    if (activeOnly) {
      conditions.push('is_active = 1');
    }

    if (upcoming) {
      conditions.push("date >= date('now')");
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY date ASC';

    if (limit > 0) {
      query += ` LIMIT ${limit}`;
    }

    const result = await env.DB.prepare(query).all<Event>();

    return successResponse(result.results);
  } catch (error) {
    console.error('Get events error:', error);
    return errorResponse('Failed to fetch events', 500);
  }
}

// POST /api/events
export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

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

    const body: EventInput = await request.json();

    if (!body.title || !body.date) {
      return errorResponse('Title and date are required', 400);
    }

    const result = await env.DB.prepare(`
      INSERT INTO events (title, description, date, time, location, image_url, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        body.title,
        body.description || null,
        body.date,
        body.time || null,
        body.location || null,
        body.image_url || null,
        body.is_active !== false ? 1 : 0
      )
      .run();

    if (!result.success) {
      return errorResponse('Failed to create event', 500);
    }

    // Get the created event
    const event = await env.DB.prepare('SELECT * FROM events WHERE id = ?')
      .bind(result.meta.last_row_id)
      .first<Event>();

    return successResponse(event, 'Event created successfully');
  } catch (error) {
    console.error('Create event error:', error);
    return errorResponse('Failed to create event', 500);
  }
}
