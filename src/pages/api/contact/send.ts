export const prerender = false;

import type { APIContext } from 'astro';
import { ok, err } from '../../../lib/api-helpers';

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

export async function POST({ request, locals }: APIContext) {
  try {
    const env = locals.runtime.env;
    const body = await request.json() as {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    };

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

    const { EmailMessage } = await import('cloudflare:email');
    await env.EMAIL.send(new EmailMessage(CONTACT_FROM, CONTACT_TO, raw));

    return ok(null, 'Message sent successfully! We will get back to you soon.');
  } catch (e) {
    console.error('Contact form error:', e);
    return err('Failed to send message. Please try again later.', 500);
  }
}
