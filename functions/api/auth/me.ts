import type { Env, User } from '../../types';
import { successResponse, errorResponse } from '../../types';
import { verifyToken, getTokenFromRequest } from '../../jwt';

interface PagesContext {
  request: Request;
  env: Env;
}

export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  try {
    const token = getTokenFromRequest(request);

    if (!token) {
      return errorResponse('Not authenticated', 401);
    }

    const payload = await verifyToken(token, env.JWT_SECRET);

    if (!payload) {
      return errorResponse('Invalid or expired token', 401);
    }

    // Get user from database
    const result = await env.DB.prepare(
      'SELECT id, username, created_at FROM users WHERE id = ?'
    )
      .bind(payload.sub)
      .first<User>();

    if (!result) {
      return errorResponse('User not found', 401);
    }

    return successResponse(result);
  } catch (error) {
    console.error('Auth check error:', error);
    return errorResponse('An error occurred', 500);
  }
}
