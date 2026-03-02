export const prerender = false;

import type { APIContext } from 'astro';
import { ok } from '../../../lib/api-helpers';
import { clearAuthCookie } from '../../../lib/jwt';

export async function POST(_context: APIContext) {
  const res = ok(null, 'Logged out successfully');
  const hdrs = new Headers(res.headers);
  hdrs.set('Set-Cookie', clearAuthCookie());
  return new Response(res.body, { status: res.status, headers: hdrs });
}
