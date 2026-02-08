import type { Env } from '../types';

interface PagesContext {
  request: Request;
  env: Env;
  params: {
    path: string[];
  };
}

// Serve images from R2
export async function onRequestGet(context: PagesContext): Promise<Response> {
  const { env, params } = context;

  try {
    const filename = params.path.join('/');

    if (!filename) {
      return new Response('Not Found', { status: 404 });
    }

    const object = await env.IMAGES.get(filename);

    if (!object) {
      return new Response('Image not found', { status: 404 });
    }

    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    headers.set('ETag', object.httpEtag);

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('Error serving image:', error);
    return new Response('Error serving image', { status: 500 });
  }
}
