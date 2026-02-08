import type { Env } from '../../types';
import { successResponse, errorResponse } from '../../types';
import { verifyToken, getTokenFromRequest } from '../../jwt';

interface PagesContext {
  request: Request;
  env: Env;
}

// POST /api/images/upload
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

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as string | null;

    if (!file) {
      return errorResponse('No file provided', 400);
    }

    if (!name) {
      return errorResponse('Name is required', 400);
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.', 400);
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return errorResponse('File too large. Maximum size is 10MB.', 400);
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${randomStr}.${ext}`;

    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await env.IMAGES.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Build the URL for the image
    const imageUrl = `/images/${filename}`;

    // Save to database
    const result = await env.DB.prepare(`
      INSERT INTO images (name, description, url, category)
      VALUES (?, ?, ?, ?)
    `)
      .bind(name, description || null, imageUrl, category || 'general')
      .run();

    if (!result.success) {
      // Try to clean up R2 object if DB insert fails
      try {
        await env.IMAGES.delete(filename);
      } catch {
        // Ignore cleanup errors
      }
      return errorResponse('Failed to save image record', 500);
    }

    return successResponse(
      {
        id: result.meta.last_row_id,
        url: imageUrl,
      },
      'Image uploaded successfully'
    );
  } catch (error) {
    console.error('Upload image error:', error);
    return errorResponse('Failed to upload image', 500);
  }
}
