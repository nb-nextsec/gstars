import type { Env } from '../../types';
import { successResponse, errorResponse } from '../../types';
import { verifyToken, getTokenFromRequest } from '../../jwt';
import { purgeSponsorCache } from './cache';

interface PagesContext {
  request: Request;
  env: Env;
}

interface Sponsor {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

interface SponsorInput {
  name: string;
  logo_url?: string;
  website_url?: string;
  description?: string;
  display_order?: number;
  is_active?: boolean;
}

// GET /api/sponsors
export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  try {
    // Serve from edge cache if available
    const cfCaches = caches as unknown as { default: Cache };
    const cache = cfCaches.default;
    const cacheKey = new Request(request.url, { method: 'GET' });
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const url = new URL(request.url);
    const activeOnly = url.searchParams.get('active') === 'true';

    let query = 'SELECT * FROM sponsors';

    if (activeOnly) {
      query += ' WHERE is_active = 1';
    }

    query += ' ORDER BY display_order ASC, name ASC';

    const result = await env.DB.prepare(query).all<Sponsor>();

    const response = successResponse(result.results);
    // Browser caches 5 min; edge cache managed via Cache API (purged on mutation)
    response.headers.set('Cache-Control', 'public, max-age=300');
    // Store in edge cache for up to 24 hours (purged on any sponsor mutation)
    const cacheResponse = response.clone();
    cacheResponse.headers.set('Cache-Control', 'public, max-age=86400');
    context.env && cache.put(cacheKey, cacheResponse);
    return response;
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
      INSERT INTO sponsors (name, logo_url, website_url, description, tier, display_order, is_active)
      VALUES (?, ?, ?, ?, 'bronze', ?, ?)
    `)
      .bind(
        body.name,
        body.logo_url || null,
        body.website_url || null,
        body.description || null,
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

    await purgeSponsorCache(request.url);

    return successResponse(sponsor, 'Sponsor created successfully');
  } catch (error) {
    console.error('Create sponsor error:', error);
    return errorResponse('Failed to create sponsor', 500);
  }
}
