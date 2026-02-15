export interface Env {
  DB: D1Database;
  IMAGES: R2Bucket;
  EMAIL: {
    send: (msg: unknown) => Promise<void>;
  };
  JWT_SECRET: string;
  SITE_URL: string;
}

export interface User {
  id: number;
  username: string;
  created_at: string;
}

export interface JWTPayload {
  sub: number;
  username: string;
  exp: number;
  iat: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function jsonResponse<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ success: false, error: message }, status);
}

export function successResponse<T>(data: T, message?: string): Response {
  return jsonResponse({ success: true, data, message });
}
