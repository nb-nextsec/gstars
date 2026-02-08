import type { Env } from '../../types';
import { successResponse, errorResponse } from '../../types';
import { verifyToken, getTokenFromRequest } from '../../jwt';

interface PagesContext {
  request: Request;
  env: Env;
}

interface Sponsor {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

interface SponsorInput {
  name: string;
  logo_url?: string;
  website_url?: string;
  tier?: string;
  display_order?: number;
  is_active?: boolean;
}

// GET /api/sponsors
export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const activeOnly = url.searchParams.get('active') === 'true';
    const tier = url.searchParams.get('tier');

    let query = 'SELECT * FROM sponsors';
    const conditions: string[] = [];
    const params: string[] = [];

    if (activeOnly) {
      conditions.push('is_active = 1');
    }

    if (tier) {
      conditions.push('tier = ?');
      params.push(tier);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY display_order ASC, name ASC';

    const stmt = params.length > 0
      ? env.DB.prepare(query).bind(...params)
      : env.DB.prepare(query);

    const result = await stmt.all<Sponsor>();

    return successResponse(result.results);
  } catch (error) {
    console.error('Get sponsors error:', error);
    return errorResponse('Failed to fetch sponsors', 500);
  }
}

// POST /api/sponsors
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

    const body: SponsorInput = await request.json();

    if (!body.name) {
      return errorResponse('Name is required', 400);
    }

    const result = await env.DB.prepare(`
      INSERT INTO sponsors (name, logo_url, website_url, tier, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
      .bind(
        body.name,
        body.logo_url || null,
        body.website_url || null,
        body.tier || 'bronze',
        body.display_order || 0,
        body.is_active !== false ? 1 : 0
      )
      .run();

    if (!result.success) {
      return errorResponse('Failed to create sponsor', 500);
    }

    // Get the created sponsor
    const sponsor = await env.DB.prepare('SELECT * FROM sponsors WHERE id = ?')
      .bind(result.meta.last_row_id)
      .first<Sponsor>();

    return successResponse(sponsor, 'Sponsor created successfully');
  } catch (error) {
    console.error('Create sponsor error:', error);
    return errorResponse('Failed to create sponsor', 500);
  }
}
