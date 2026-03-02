export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';
import { createToken, setAuthCookie } from '../../../lib/jwt';
import { verifyPassword } from '../../../lib/password';

export async function POST({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const { username, password } = await request.json();
    if (!username || !password) return err('Username and password are required', 400);

    const row = await env.DB.prepare(
      'SELECT id, username, password_hash, created_at FROM users WHERE username = ?'
    ).bind(username).first<{ id: number; username: string; password_hash: string; created_at: string }>();

    if (!row) return err('Invalid username or password', 401);
    if (!(await verifyPassword(password, row.password_hash))) return err('Invalid username or password', 401);

    const user = { id: row.id, username: row.username, created_at: row.created_at };
    const token = await createToken(user, env.JWT_SECRET);
    const res = ok(user, 'Login successful');
    const hdrs = new Headers(res.headers);
    hdrs.set('Set-Cookie', setAuthCookie(token));
    return new Response(res.body, { status: res.status, headers: hdrs });
  } catch (e) {
    console.error('Login error:', e);
    return err('An error occurred during login', 500);
  }
}
