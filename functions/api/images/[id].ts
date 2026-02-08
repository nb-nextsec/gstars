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

interface SiteImage {
  id: number;
  name: string;
  description: string | null;
  url: string;
  category: string | null;
  created_at: string;
}

// GET /api/images/:id
export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { env, params } = context;

  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return errorResponse('Invalid image ID', 400);
    }

    const image = await env.DB.prepare('SELECT * FROM images WHERE id = ?')
      .bind(id)
      .first<SiteImage>();

    if (!image) {
      return errorResponse('Image not found', 404);
    }

    return successResponse(image);
  } catch (error) {
    console.error('Get image error:', error);
    return errorResponse('Failed to fetch image', 500);
  }
}

// PUT /api/images/:id
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
      return errorResponse('Invalid image ID', 400);
    }

    const body: { name?: string; description?: string; category?: string } = await request.json();

    // Check if image exists
    const existing = await env.DB.prepare('SELECT id FROM images WHERE id = ?')
      .bind(id)
      .first();

    if (!existing) {
      return errorResponse('Image not found', 404);
    }

    // Build update query
    const updates: string[] = [];
    const values: (string | null)[] = [];

    if (body.name !== undefined) {
      updates.push('name = ?');
      values.push(body.name);
    }
    if (body.description !== undefined) {
      updates.push('description = ?');
      values.push(body.description || null);
    }
    if (body.category !== undefined) {
      updates.push('category = ?');
      values.push(body.category);
    }

    if (updates.length === 0) {
      return errorResponse('No updates provided', 400);
    }

    values.push(id.toString());

    await env.DB.prepare(`UPDATE images SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    // Get updated image
    const image = await env.DB.prepare('SELECT * FROM images WHERE id = ?')
      .bind(id)
      .first<SiteImage>();

    return successResponse(image, 'Image updated successfully');
  } catch (error) {
    console.error('Update image error:', error);
    return errorResponse('Failed to update image', 500);
  }
}

// DELETE /api/images/:id
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
      return errorResponse('Invalid image ID', 400);
    }

    // Get image to find the URL for R2 cleanup
    const image = await env.DB.prepare('SELECT * FROM images WHERE id = ?')
      .bind(id)
      .first<SiteImage>();

    if (!image) {
      return errorResponse('Image not found', 404);
    }

    // Delete from database
    await env.DB.prepare('DELETE FROM images WHERE id = ?').bind(id).run();

    // Try to delete from R2 (extract filename from URL)
    const filename = image.url.split('/').pop();
    if (filename) {
      try {
        await env.IMAGES.delete(filename);
      } catch {
        // Log but don't fail if R2 cleanup fails
        console.error('Failed to delete image from R2:', filename);
      }
    }

    return successResponse(null, 'Image deleted successfully');
  } catch (error) {
    console.error('Delete image error:', error);
    return errorResponse('Failed to delete image', 500);
  }
}
