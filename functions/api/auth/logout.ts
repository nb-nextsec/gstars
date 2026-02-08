import { successResponse } from '../../types';
import { clearAuthCookie } from '../../jwt';

export async function onRequestPost(): Promise<Response> {
  const response = successResponse(null, 'Logged out successfully');
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Set-Cookie', clearAuthCookie());

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
}
