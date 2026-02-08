import type { Env } from '../../types';
import { successResponse, errorResponse } from '../../types';
import { verifyToken, getTokenFromRequest } from '../../jwt';

interface PagesContext {
  request: Request;
  env: Env;
}

interface SiteContent {
  id: number;
  page: string;
  section: string;
  content: string | null;
  updated_at: string;
}

interface ContentInput {
  page: string;
  section: string;
  content: string;
}

// GET /api/content
export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const section = url.searchParams.get('section');

    if (page && section) {
      // Get specific content
      const content = await env.DB.prepare(
        'SELECT * FROM content WHERE page = ? AND section = ?'
      )
        .bind(page, section)
        .first<SiteContent>();

      return successResponse(content);
    }

    if (page) {
      // Get all content for a page
      const result = await env.DB.prepare('SELECT * FROM content WHERE page = ?')
        .bind(page)
        .all<SiteContent>();

      return successResponse(result.results);
    }

    // Get all content
    const result = await env.DB.prepare('SELECT * FROM content ORDER BY page, section')
      .all<SiteContent>();

    return successResponse(result.results);
  } catch (error) {
    console.error('Get content error:', error);
    return errorResponse('Failed to fetch content', 500);
  }
}

// PUT /api/content
export async function onRequestPut(context: PagesContext): Promise<Response> {
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

    const body: ContentInput = await request.json();

    if (!body.page || !body.section) {
      return errorResponse('Page and section are required', 400);
    }

    // Upsert content (insert or update)
    await env.DB.prepare(`
      INSERT INTO content (page, section, content, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(page, section) DO UPDATE SET
        content = excluded.content,
        updated_at = CURRENT_TIMESTAMP
    `)
      .bind(body.page, body.section, body.content || null)
      .run();

    // Get updated content
    const content = await env.DB.prepare(
      'SELECT * FROM content WHERE page = ? AND section = ?'
    )
      .bind(body.page, body.section)
      .first<SiteContent>();

    return successResponse(content, 'Content updated successfully');
  } catch (error) {
    console.error('Update content error:', error);
    return errorResponse('Failed to update content', 500);
  }
}
