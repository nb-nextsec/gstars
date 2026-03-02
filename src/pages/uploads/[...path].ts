export const prerender = false;

import type { APIContext } from 'astro';

export async function GET({ params, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const filename = params.path;
    if (!filename) return new Response('Not Found', { status: 404 });

    const object = await env.IMAGES.get(filename);
    if (!object) return new Response('Image not found', { status: 404 });

    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000');
    headers.set('ETag', object.httpEtag);
    return new Response(object.body, { headers });
  } catch (e) {
    console.error('Error serving image:', e);
    return new Response('Error serving image', { status: 500 });
  }
}
