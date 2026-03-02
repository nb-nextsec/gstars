export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';

export async function GET({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    let query = 'SELECT * FROM images';
    const params: string[] = [];
    if (category) { query += ' WHERE category = ?'; params.push(category); }
    query += ' ORDER BY created_at DESC';

    const stmt = params.length ? env.DB.prepare(query).bind(...params) : env.DB.prepare(query);
    const r = await stmt.all();
    return ok(r.results);
  } catch (e) {
    console.error('Get images error:', e);
    return err('Failed to fetch images', 500);
  }
}
