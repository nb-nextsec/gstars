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
    const cfCaches = caches as unknown as { default: Cache };
    const cache = cfCaches.default;
    const url = new URL(request.url);
    const activeOnly = url.searchParams.get('active') === 'true';

    // Only serve from edge cache for public (active-only) requests
    if (activeOnly) {
      const cacheKey = new Request(request.url, { method: 'GET' });
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    }

    let query = 'SELECT * FROM sponsors';

    if (activeOnly) {
      query += ' WHERE is_active = 1';
    }

    query += ' ORDER BY display_order ASC, name ASC';

    const result = await env.DB.prepare(query).all<Sponsor>();

    const response = successResponse(result.results);

    if (activeOnly) {
      // Public requests: browser caches 5 min, edge cache 24hr (purged on mutation)
      response.headers.set('Cache-Control', 'public, max-age=300');
      const cacheResponse = response.clone();
      cacheResponse.headers.set('Cache-Control', 'public, max-age=86400');
      cache.put(new Request(request.url, { method: 'GET' }), cacheResponse);
    } else {
      // Admin requests: no browser cache so reorder/edits are always fresh
      response.headers.set('Cache-Control', 'no-cache');
    }

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
