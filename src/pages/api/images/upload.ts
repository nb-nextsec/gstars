export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';
import { verifyToken, getTokenFromRequest } from '../../../lib/jwt';

export async function POST({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const token = getTokenFromRequest(request);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as string | null;

    if (!file) return err('No file provided', 400);
    if (!name) return err('Name is required', 400);

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) return err('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.', 400);
    if (file.size > 10 * 1024 * 1024) return err('File too large. Maximum size is 10MB.', 400);

    const ext = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${randomStr}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    await env.IMAGES.put(filename, arrayBuffer, { httpMetadata: { contentType: file.type } });

    const imageUrl = `/uploads/${filename}`;
    const r = await env.DB.prepare('INSERT INTO images (name, description, url, category) VALUES (?, ?, ?, ?)')
      .bind(name, description || null, imageUrl, category || 'general').run();

    if (!r.success) {
      try { await env.IMAGES.delete(filename); } catch { /* ignore cleanup failure */ }
      return err('Failed to save image record', 500);
    }
    return ok({ id: r.meta.last_row_id, url: imageUrl }, 'Image uploaded successfully');
  } catch (e) {
    console.error('Upload image error:', e);
    return err('Failed to upload image', 500);
  }
}
