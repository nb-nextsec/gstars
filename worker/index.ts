import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { EmailMessage } from 'cloudflare:email';
import { createToken, verifyToken, getTokenFromRequest, setAuthCookie, clearAuthCookie } from '../functions/jwt';
import { verifyPassword } from '../functions/password';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Env = {
  DB: D1Database;
  IMAGES: R2Bucket;
  EMAIL: { send: (msg: unknown) => Promise<void> };
  ASSETS: Fetcher;
  JWT_SECRET: string;
  SITE_URL: string;
};

type App = { Bindings: Env };

function json<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
function ok<T>(data: T, message?: string) { return json({ success: true, data, message }); }
function err(message: string, status = 400) { return json({ success: false, error: message }, status); }

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
const app = new Hono<App>();

app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
app.post('/api/auth/login', async (c) => {
  try {
    const { username, password } = await c.req.json();
    if (!username || !password) return err('Username and password are required', 400);

    const row = await c.env.DB.prepare(
      'SELECT id, username, password_hash, created_at FROM users WHERE username = ?'
    ).bind(username).first<{ id: number; username: string; password_hash: string; created_at: string }>();

    if (!row) return err('Invalid username or password', 401);
    if (!(await verifyPassword(password, row.password_hash))) return err('Invalid username or password', 401);

    const user = { id: row.id, username: row.username, created_at: row.created_at };
    const token = await createToken(user, c.env.JWT_SECRET);
    const res = ok(user, 'Login successful');
    const hdrs = new Headers(res.headers);
    hdrs.set('Set-Cookie', setAuthCookie(token));
    return new Response(res.body, { status: res.status, headers: hdrs });
  } catch (e) { console.error('Login error:', e); return err('An error occurred during login', 500); }
});

app.post('/api/auth/logout', () => {
  const res = ok(null, 'Logged out successfully');
  const hdrs = new Headers(res.headers);
  hdrs.set('Set-Cookie', clearAuthCookie());
  return new Response(res.body, { status: res.status, headers: hdrs });
});

app.get('/api/auth/me', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Not authenticated', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);
    const user = await c.env.DB.prepare('SELECT id, username, created_at FROM users WHERE id = ?')
      .bind(payload.sub).first();
    if (!user) return err('User not found', 401);
    return ok(user);
  } catch (e) { console.error('Auth check error:', e); return err('An error occurred', 500); }
});

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------
app.get('/api/content', async (c) => {
  try {
    const url = new URL(c.req.url);
    const page = url.searchParams.get('page');
    const section = url.searchParams.get('section');

    if (page && section) {
      const content = await c.env.DB.prepare('SELECT * FROM content WHERE page = ? AND section = ?')
        .bind(page, section).first();
      return ok(content);
    }
    if (page) {
      const r = await c.env.DB.prepare('SELECT * FROM content WHERE page = ?').bind(page).all();
      return ok(r.results);
    }
    const r = await c.env.DB.prepare('SELECT * FROM content ORDER BY page, section').all();
    return ok(r.results);
  } catch (e) { console.error('Get content error:', e); return err('Failed to fetch content', 500); }
});

app.put('/api/content', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const body = await c.req.json<{ page: string; section: string; content: string }>();
    if (!body.page || !body.section) return err('Page and section are required', 400);

    await c.env.DB.prepare(`
      INSERT INTO content (page, section, content, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(page, section) DO UPDATE SET content = excluded.content, updated_at = CURRENT_TIMESTAMP
    `).bind(body.page, body.section, body.content || null).run();

    const content = await c.env.DB.prepare('SELECT * FROM content WHERE page = ? AND section = ?')
      .bind(body.page, body.section).first();
    return ok(content, 'Content updated successfully');
  } catch (e) { console.error('Update content error:', e); return err('Failed to update content', 500); }
});

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
app.get('/api/events', async (c) => {
  try {
    const url = new URL(c.req.url);
    const activeOnly = url.searchParams.get('active') === 'true';
    const upcoming = url.searchParams.get('upcoming') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '100');

    let query = 'SELECT * FROM events';
    const conditions: string[] = [];
    if (activeOnly) conditions.push('is_active = 1');
    if (upcoming) conditions.push("date >= date('now')");
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY date ASC';
    if (limit > 0) query += ` LIMIT ${limit}`;

    const r = await c.env.DB.prepare(query).all();
    return ok(r.results);
  } catch (e) { console.error('Get events error:', e); return err('Failed to fetch events', 500); }
});

app.post('/api/events', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const body = await c.req.json<{ title: string; description?: string; date: string; time?: string; location?: string; image_url?: string; is_active?: boolean }>();
    if (!body.title || !body.date) return err('Title and date are required', 400);

    const r = await c.env.DB.prepare(`
      INSERT INTO events (title, description, date, time, location, image_url, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(body.title, body.description || null, body.date, body.time || null, body.location || null, body.image_url || null, body.is_active !== false ? 1 : 0).run();

    if (!r.success) return err('Failed to create event', 500);
    const event = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(r.meta.last_row_id).first();
    return ok(event, 'Event created successfully');
  } catch (e) { console.error('Create event error:', e); return err('Failed to create event', 500); }
});

app.get('/api/events/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return err('Invalid event ID', 400);
    const event = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first();
    if (!event) return err('Event not found', 404);
    return ok(event);
  } catch (e) { console.error('Get event error:', e); return err('Failed to fetch event', 500); }
});

app.put('/api/events/:id', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return err('Invalid event ID', 400);

    const existing = await c.env.DB.prepare('SELECT id FROM events WHERE id = ?').bind(id).first();
    if (!existing) return err('Event not found', 404);

    const body = await c.req.json<{ title?: string; description?: string; date?: string; time?: string; location?: string; image_url?: string; is_active?: boolean | string }>();
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    if (body.title !== undefined) { updates.push('title = ?'); values.push(body.title); }
    if (body.description !== undefined) { updates.push('description = ?'); values.push(body.description || null); }
    if (body.date !== undefined) { updates.push('date = ?'); values.push(body.date); }
    if (body.time !== undefined) { updates.push('time = ?'); values.push(body.time || null); }
    if (body.location !== undefined) { updates.push('location = ?'); values.push(body.location || null); }
    if (body.image_url !== undefined) { updates.push('image_url = ?'); values.push(body.image_url || null); }
    if (body.is_active !== undefined) { updates.push('is_active = ?'); values.push(body.is_active === true || body.is_active === 'true' ? 1 : 0); }

    if (!updates.length) return err('No updates provided', 400);
    values.push(id);

    await c.env.DB.prepare(`UPDATE events SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
    const event = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first();
    return ok(event, 'Event updated successfully');
  } catch (e) { console.error('Update event error:', e); return err('Failed to update event', 500); }
});

app.delete('/api/events/:id', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return err('Invalid event ID', 400);
    const existing = await c.env.DB.prepare('SELECT id FROM events WHERE id = ?').bind(id).first();
    if (!existing) return err('Event not found', 404);

    await c.env.DB.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
    return ok(null, 'Event deleted successfully');
  } catch (e) { console.error('Delete event error:', e); return err('Failed to delete event', 500); }
});

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------
app.get('/api/images', async (c) => {
  try {
    const url = new URL(c.req.url);
    const category = url.searchParams.get('category');
    let query = 'SELECT * FROM images';
    const params: string[] = [];
    if (category) { query += ' WHERE category = ?'; params.push(category); }
    query += ' ORDER BY created_at DESC';

    const stmt = params.length ? c.env.DB.prepare(query).bind(...params) : c.env.DB.prepare(query);
    const r = await stmt.all();
    return ok(r.results);
  } catch (e) { console.error('Get images error:', e); return err('Failed to fetch images', 500); }
});

app.get('/api/images/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return err('Invalid image ID', 400);
    const image = await c.env.DB.prepare('SELECT * FROM images WHERE id = ?').bind(id).first();
    if (!image) return err('Image not found', 404);
    return ok(image);
  } catch (e) { console.error('Get image error:', e); return err('Failed to fetch image', 500); }
});

app.put('/api/images/:id', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return err('Invalid image ID', 400);
    const existing = await c.env.DB.prepare('SELECT id FROM images WHERE id = ?').bind(id).first();
    if (!existing) return err('Image not found', 404);

    const body = await c.req.json<{ name?: string; description?: string; category?: string }>();
    const updates: string[] = [];
    const values: (string | null)[] = [];
    if (body.name !== undefined) { updates.push('name = ?'); values.push(body.name); }
    if (body.description !== undefined) { updates.push('description = ?'); values.push(body.description || null); }
    if (body.category !== undefined) { updates.push('category = ?'); values.push(body.category); }
    if (!updates.length) return err('No updates provided', 400);

    values.push(id.toString());
    await c.env.DB.prepare(`UPDATE images SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
    const image = await c.env.DB.prepare('SELECT * FROM images WHERE id = ?').bind(id).first();
    return ok(image, 'Image updated successfully');
  } catch (e) { console.error('Update image error:', e); return err('Failed to update image', 500); }
});

app.delete('/api/images/:id', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return err('Invalid image ID', 400);
    const image = await c.env.DB.prepare('SELECT * FROM images WHERE id = ?').bind(id).first<{ url: string }>();
    if (!image) return err('Image not found', 404);

    await c.env.DB.prepare('DELETE FROM images WHERE id = ?').bind(id).run();
    const filename = image.url.split('/').pop();
    if (filename) { try { await c.env.IMAGES.delete(filename); } catch { console.error('Failed to delete from R2:', filename); } }
    return ok(null, 'Image deleted successfully');
  } catch (e) { console.error('Delete image error:', e); return err('Failed to delete image', 500); }
});

app.post('/api/images/upload', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as string | null;

    if (!file) return err('No file provided', 400);
    if (!name) return err('Name is required', 400);

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) return err('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.', 400);
    if (file.size > 10 * 1024 * 1024) return err('File too large. Maximum size is 10MB.', 400);

    const ext = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `${timestamp}-${randomStr}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    await c.env.IMAGES.put(filename, arrayBuffer, { httpMetadata: { contentType: file.type } });

    const imageUrl = `/uploads/${filename}`;
    const r = await c.env.DB.prepare('INSERT INTO images (name, description, url, category) VALUES (?, ?, ?, ?)')
      .bind(name, description || null, imageUrl, category || 'general').run();

    if (!r.success) {
      try { await c.env.IMAGES.delete(filename); } catch {}
      return err('Failed to save image record', 500);
    }
    return ok({ id: r.meta.last_row_id, url: imageUrl }, 'Image uploaded successfully');
  } catch (e) { console.error('Upload image error:', e); return err('Failed to upload image', 500); }
});

// ---------------------------------------------------------------------------
// Sponsors
// ---------------------------------------------------------------------------
async function purgeSponsorCache(requestUrl: string) {
  try {
    const cfCaches = caches as unknown as { default: Cache };
    const cache = cfCaches.default;
    const origin = new URL(requestUrl).origin;
    await Promise.all([
      cache.delete(new Request(`${origin}/api/sponsors`)),
      cache.delete(new Request(`${origin}/api/sponsors?active=true`)),
    ]);
  } catch (e) { console.error('Cache purge failed:', e); }
}

app.get('/api/sponsors', async (c) => {
  try {
    const cfCaches = caches as unknown as { default: Cache };
    const cache = cfCaches.default;
    const url = new URL(c.req.url);
    const activeOnly = url.searchParams.get('active') === 'true';

    if (activeOnly) {
      const cacheKey = new Request(c.req.url, { method: 'GET' });
      const cached = await cache.match(cacheKey);
      if (cached) return cached;
    }

    let query = 'SELECT * FROM sponsors';
    if (activeOnly) query += ' WHERE is_active = 1';
    query += ' ORDER BY display_order ASC, name ASC';

    const r = await c.env.DB.prepare(query).all();
    const response = ok(r.results);

    if (activeOnly) {
      response.headers.set('Cache-Control', 'public, max-age=300');
      const cacheResponse = response.clone();
      cacheResponse.headers.set('Cache-Control', 'public, max-age=86400');
      cache.put(new Request(c.req.url, { method: 'GET' }), cacheResponse);
    } else {
      response.headers.set('Cache-Control', 'no-cache');
    }
    return response;
  } catch (e) { console.error('Get sponsors error:', e); return err('Failed to fetch sponsors', 500); }
});

app.post('/api/sponsors', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const body = await c.req.json<{ name: string; logo_url?: string; website_url?: string; description?: string; display_order?: number; is_active?: boolean }>();
    if (!body.name) return err('Name is required', 400);

    const r = await c.env.DB.prepare(`
      INSERT INTO sponsors (name, logo_url, website_url, description, tier, display_order, is_active) VALUES (?, ?, ?, ?, 'bronze', ?, ?)
    `).bind(body.name, body.logo_url || null, body.website_url || null, body.description || null, body.display_order || 0, body.is_active !== false ? 1 : 0).run();

    if (!r.success) return err('Failed to create sponsor', 500);
    const sponsor = await c.env.DB.prepare('SELECT * FROM sponsors WHERE id = ?').bind(r.meta.last_row_id).first();
    await purgeSponsorCache(c.req.url);
    return ok(sponsor, 'Sponsor created successfully');
  } catch (e) { console.error('Create sponsor error:', e); return err('Failed to create sponsor', 500); }
});

app.get('/api/sponsors/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return err('Invalid sponsor ID', 400);
    const sponsor = await c.env.DB.prepare('SELECT * FROM sponsors WHERE id = ?').bind(id).first();
    if (!sponsor) return err('Sponsor not found', 404);
    return ok(sponsor);
  } catch (e) { console.error('Get sponsor error:', e); return err('Failed to fetch sponsor', 500); }
});

app.put('/api/sponsors/:id', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return err('Invalid sponsor ID', 400);
    const existing = await c.env.DB.prepare('SELECT id FROM sponsors WHERE id = ?').bind(id).first();
    if (!existing) return err('Sponsor not found', 404);

    const body = await c.req.json<{ name?: string; logo_url?: string; website_url?: string; description?: string; display_order?: number; is_active?: boolean | string }>();
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    if (body.name !== undefined) { updates.push('name = ?'); values.push(body.name); }
    if (body.logo_url !== undefined) { updates.push('logo_url = ?'); values.push(body.logo_url || null); }
    if (body.website_url !== undefined) { updates.push('website_url = ?'); values.push(body.website_url || null); }
    if (body.description !== undefined) { updates.push('description = ?'); values.push(body.description || null); }
    if (body.display_order !== undefined) { updates.push('display_order = ?'); values.push(body.display_order); }
    if (body.is_active !== undefined) { updates.push('is_active = ?'); values.push(body.is_active === true || body.is_active === 'true' ? 1 : 0); }

    if (!updates.length) return err('No updates provided', 400);
    values.push(id);

    await c.env.DB.prepare(`UPDATE sponsors SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
    const sponsor = await c.env.DB.prepare('SELECT * FROM sponsors WHERE id = ?').bind(id).first();
    await purgeSponsorCache(c.req.url);
    return ok(sponsor, 'Sponsor updated successfully');
  } catch (e) { console.error('Update sponsor error:', e); return err('Failed to update sponsor', 500); }
});

app.delete('/api/sponsors/:id', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return err('Invalid sponsor ID', 400);
    const existing = await c.env.DB.prepare('SELECT id FROM sponsors WHERE id = ?').bind(id).first();
    if (!existing) return err('Sponsor not found', 404);

    await c.env.DB.prepare('DELETE FROM sponsors WHERE id = ?').bind(id).run();
    await purgeSponsorCache(c.req.url);
    return ok(null, 'Sponsor deleted successfully');
  } catch (e) { console.error('Delete sponsor error:', e); return err('Failed to delete sponsor', 500); }
});

app.post('/api/sponsors/reorder', async (c) => {
  try {
    const token = getTokenFromRequest(c.req.raw);
    if (!token) return err('Authentication required', 401);
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (!payload) return err('Invalid or expired token', 401);

    const body = await c.req.json<{ order: number[] }>();
    if (!body.order || !Array.isArray(body.order) || !body.order.length) return err('Order array is required', 400);

    const statements = body.order.map((id, index) =>
      c.env.DB.prepare('UPDATE sponsors SET display_order = ? WHERE id = ?').bind(index + 1, id)
    );
    await c.env.DB.batch(statements);
    await purgeSponsorCache(c.req.url);
    return ok(null, 'Sponsors reordered successfully');
  } catch (e) { console.error('Reorder sponsors error:', e); return err('Failed to reorder sponsors', 500); }
});

// ---------------------------------------------------------------------------
// Contact (email via Cloudflare send_email binding)
// ---------------------------------------------------------------------------
const CONTACT_TO = 'contact@geelongstars.com.au';
const CONTACT_FROM = 'noreply@geelongstars.com.au';

const SUBJECT_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  programs: 'Program Information',
  registration: 'Registration',
  sponsorship: 'Sponsorship Opportunities',
  volunteer: 'Volunteering',
  other: 'Other',
};

app.post('/api/contact/send', async (c) => {
  try {
    const body = await c.req.json<{ name: string; email: string; phone?: string; subject: string; message: string }>();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return err('Name, email, subject, and message are required', 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return err('Invalid email address', 400);
    if (body.message.length < 10) return err('Message must be at least 10 characters', 400);

    const subjectLabel = SUBJECT_LABELS[body.subject] || body.subject;
    const msgId = `<${crypto.randomUUID()}@geelongstars.com.au>`;
    const dateHeader = new Date().toUTCString();

    const raw = [
      `From: "Geelong Stars Website" <${CONTACT_FROM}>`,
      `To: <${CONTACT_TO}>`,
      `Reply-To: <${body.email}>`,
      `Subject: New enquiry: ${subjectLabel} - from ${body.name}`,
      `Date: ${dateHeader}`,
      `Message-ID: ${msgId}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/plain; charset="utf-8"`,
      ``,
      `New contact form submission from geelongstars.com.au`,
      ``,
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone || 'Not provided'}`,
      `Subject: ${subjectLabel}`,
      ``,
      `Message:`,
      `${body.message}`,
    ].join('\r\n');

    await c.env.EMAIL.send(new EmailMessage(CONTACT_FROM, CONTACT_TO, raw));

    return ok(null, 'Message sent successfully! We will get back to you soon.');
  } catch (e) { console.error('Contact form error:', e); return err('Failed to send message. Please try again later.', 500); }
});

// ---------------------------------------------------------------------------
// Uploads — serve images from R2
// ---------------------------------------------------------------------------
app.get('/uploads/:path{.+}', async (c) => {
  try {
    const filename = c.req.param('path');
    if (!filename) return new Response('Not Found', { status: 404 });

    const object = await c.env.IMAGES.get(filename);
    if (!object) return new Response('Image not found', { status: 404 });

    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000');
    headers.set('ETag', object.httpEtag);
    return new Response(object.body, { headers });
  } catch (e) { console.error('Error serving image:', e); return new Response('Error serving image', { status: 500 }); }
});

// ---------------------------------------------------------------------------
// Fallbacks
// ---------------------------------------------------------------------------
app.notFound(() => json({ success: false, error: 'Not Found' }, 404));
app.onError((e) => { console.error('[ERROR]', e); return json({ success: false, error: 'Internal Server Error' }, 500); });

// ---------------------------------------------------------------------------
// Export — route API/uploads through Hono, everything else to static assets
// ---------------------------------------------------------------------------
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/uploads/')) {
      return app.fetch(request, env, ctx);
    }
    // Serve static assets (SPA not_found_handling returns index.html for client routes)
    return env.ASSETS.fetch(request);
  },
};
