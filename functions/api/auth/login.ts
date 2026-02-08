import type { Env, User } from '../../types';
import { successResponse, errorResponse } from '../../types';
import { createToken, setAuthCookie } from '../../jwt';
import { verifyPassword } from '../../password';

interface LoginRequest {
  username: string;
  password: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  try {
    const body: LoginRequest = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return errorResponse('Username and password are required', 400);
    }

    // Find user in database
    const result = await env.DB.prepare(
      'SELECT id, username, password_hash, created_at FROM users WHERE username = ?'
    )
      .bind(username)
      .first<{ id: number; username: string; password_hash: string; created_at: string }>();

    if (!result) {
      return errorResponse('Invalid username or password', 401);
    }

    // Verify password
    const isValid = await verifyPassword(password, result.password_hash);
    if (!isValid) {
      return errorResponse('Invalid username or password', 401);
    }

    // Create JWT token
    const user: User = {
      id: result.id,
      username: result.username,
      created_at: result.created_at,
    };

    const token = await createToken(user, env.JWT_SECRET);

    // Return user data with auth cookie
    const response = successResponse(user, 'Login successful');
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Set-Cookie', setAuthCookie(token));

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('An error occurred during login', 500);
  }
}
