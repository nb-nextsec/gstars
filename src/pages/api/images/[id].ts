export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';
import { verifyToken, getTokenFromRequest } from '../../../lib/jwt';

export async function GET({ params, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const id = parseInt(params.id!);
    if (isNaN(id)) return err('Invalid image ID', 400);

    const image = await env.DB.prepare('SELECT * FROM images WHERE id = ?').bind(id).first();
    if (!image) return err('Image not found', 404);
    return ok(image);
  } catch (e) {
    console.error('Get image error:', e);
    return err('Failed to fetch image', 500);
  }
}

export async function PUT({ params, request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const token = getTokenFromRequest(request);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(params.id!);
    if (isNaN(id)) return err('Invalid image ID', 400);

    const existing = await env.DB.prepare('SELECT id FROM images WHERE id = ?').bind(id).first();
    if (!existing) return err('Image not found', 404);

    const body = await request.json() as { name?: string; description?: string; category?: string };
    const updates: string[] = [];
    const values: (string | null)[] = [];

    if (body.name !== undefined) { updates.push('name = ?'); values.push(body.name); }
    if (body.description !== undefined) { updates.push('description = ?'); values.push(body.description || null); }
    if (body.category !== undefined) { updates.push('category = ?'); values.push(body.category); }
    if (!updates.length) return err('No updates provided', 400);

    values.push(id.toString());
    await env.DB.prepare(`UPDATE images SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
    const image = await env.DB.prepare('SELECT * FROM images WHERE id = ?').bind(id).first();
    return ok(image, 'Image updated successfully');
  } catch (e) {
    console.error('Update image error:', e);
    return err('Failed to update image', 500);
  }
}

export async function DELETE({ params, request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const token = getTokenFromRequest(request);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(params.id!);
    if (isNaN(id)) return err('Invalid image ID', 400);

    const image = await env.DB.prepare('SELECT * FROM images WHERE id = ?').bind(id).first<{ url: string }>();
    if (!image) return err('Image not found', 404);

    await env.DB.prepare('DELETE FROM images WHERE id = ?').bind(id).run();
    const filename = image.url.split('/').pop();
    if (filename) {
      try { await env.IMAGES.delete(filename); } catch { console.error('Failed to delete from R2:', filename); }
    }
    return ok(null, 'Image deleted successfully');
  } catch (e) {
    console.error('Delete image error:', e);
    return err('Failed to delete image', 500);
  }
}
