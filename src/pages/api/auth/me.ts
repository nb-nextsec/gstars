export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';
import { verifyToken, getTokenFromRequest } from '../../../lib/jwt';

export async function GET({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const token = getTokenFromRequest(request);
    if (!token) return err('Not authenticated', 401);

    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const user = await env.DB.prepare('SELECT id, username, created_at FROM users WHERE id = ?')
      .bind(payload.sub).first();
    if (!user) return err('User not found', 401);

    return ok(user);
  } catch (e) {
    console.error('Auth check error:', e);
    return err('An error occurred', 500);
  }
}
