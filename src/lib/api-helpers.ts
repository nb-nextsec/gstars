export function json<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function ok<T>(data: T, message?: string) {
  return json({ success: true, data, message });
}

export function err(message: string, status = 400) {
  return json({ success: false, error: message }, status);
}
