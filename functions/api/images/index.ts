import type { Env } from '../../types';
import { successResponse, errorResponse } from '../../types';

interface PagesContext {
  request: Request;
  env: Env;
}

interface SiteImage {
  id: number;
  name: string;
  description: string | null;
  url: string;
  category: string | null;
  created_at: string;
}

// GET /api/images
export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    let query = 'SELECT * FROM images';
    const params: string[] = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = params.length > 0
      ? env.DB.prepare(query).bind(...params)
      : env.DB.prepare(query);

    const result = await stmt.all<SiteImage>();

    return successResponse(result.results);
  } catch (error) {
    console.error('Get images error:', error);
    return errorResponse('Failed to fetch images', 500);
  }
}

// DELETE /api/images/:id is handled by [id].ts
