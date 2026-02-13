import type { Env } from '../../types';
import { successResponse, errorResponse } from '../../types';
import { verifyToken, getTokenFromRequest } from '../../jwt';
import { purgeSponsorCache } from './cache';

interface PagesContext {
  request: Request;
  env: Env;
}

interface ReorderInput {
  order: number[];
}

// POST /api/sponsors/reorder
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

    const body: ReorderInput = await request.json();

    if (!body.order || !Array.isArray(body.order) || body.order.length === 0) {
      return errorResponse('Order array is required', 400);
    }

    // Build batch of UPDATE statements
    const statements = body.order.map((id, index) =>
      env.DB.prepare('UPDATE sponsors SET display_order = ? WHERE id = ?')
        .bind(index + 1, id)
    );

    await env.DB.batch(statements);

    await purgeSponsorCache(request.url);

    return successResponse(null, 'Sponsors reordered successfully');
  } catch (error) {
    console.error('Reorder sponsors error:', error);
    return errorResponse('Failed to reorder sponsors', 500);
  }
}
