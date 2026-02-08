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
  name?: string;
  logo_url?: string;
  website_url?: string;
  tier?: string;
  display_order?: number;
  is_active?: boolean | string;
}

// GET /api/sponsors/:id
export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { env, params } = context;

  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return errorResponse('Invalid sponsor ID', 400);
    }

    const sponsor = await env.DB.prepare('SELECT * FROM sponsors WHERE id = ?')
      .bind(id)
      .first<Sponsor>();

    if (!sponsor) {
      return errorResponse('Sponsor not found', 404);
    }

    return successResponse(sponsor);
  } catch (error) {
    console.error('Get sponsor error:', error);
    return errorResponse('Failed to fetch sponsor', 500);
  }
}

// PUT /api/sponsors/:id
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
      return errorResponse('Invalid sponsor ID', 400);
    }

    const body: SponsorInput = await request.json();

    // Check if sponsor exists
    const existing = await env.DB.prepare('SELECT id FROM sponsors WHERE id = ?')
      .bind(id)
      .first();

    if (!existing) {
      return errorResponse('Sponsor not found', 404);
    }

    // Build update query
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    if (body.name !== undefined) {
      updates.push('name = ?');
      values.push(body.name);
    }
    if (body.logo_url !== undefined) {
      updates.push('logo_url = ?');
      values.push(body.logo_url || null);
    }
    if (body.website_url !== undefined) {
      updates.push('website_url = ?');
      values.push(body.website_url || null);
    }
    if (body.tier !== undefined) {
      updates.push('tier = ?');
      values.push(body.tier);
    }
    if (body.display_order !== undefined) {
      updates.push('display_order = ?');
      values.push(body.display_order);
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

    await env.DB.prepare(`UPDATE sponsors SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    // Get updated sponsor
    const sponsor = await env.DB.prepare('SELECT * FROM sponsors WHERE id = ?')
      .bind(id)
      .first<Sponsor>();

    return successResponse(sponsor, 'Sponsor updated successfully');
  } catch (error) {
    console.error('Update sponsor error:', error);
    return errorResponse('Failed to update sponsor', 500);
  }
}

// DELETE /api/sponsors/:id
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
      return errorResponse('Invalid sponsor ID', 400);
    }

    // Check if sponsor exists
    const existing = await env.DB.prepare('SELECT id FROM sponsors WHERE id = ?')
      .bind(id)
      .first();

    if (!existing) {
      return errorResponse('Sponsor not found', 404);
    }

    await env.DB.prepare('DELETE FROM sponsors WHERE id = ?').bind(id).run();

    return successResponse(null, 'Sponsor deleted successfully');
  } catch (error) {
    console.error('Delete sponsor error:', error);
    return errorResponse('Failed to delete sponsor', 500);
  }
}
