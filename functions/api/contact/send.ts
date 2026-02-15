import { EmailMessage } from 'cloudflare:email';
import type { Env } from '../../types';
import { successResponse, errorResponse } from '../../types';

interface PagesContext {
  request: Request;
  env: Env;
}

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const TO = 'nb@securedynamics.com.au';
const FROM = 'noreply@geelongstars.com.au';

const SUBJECT_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  programs: 'Program Information',
  registration: 'Registration',
  sponsorship: 'Sponsorship Opportunities',
  volunteer: 'Volunteering',
  other: 'Other',
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /api/contact/send
export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  try {
    const body: ContactForm = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return errorResponse('Name, email, subject, and message are required', 400);
    }

    if (!isValidEmail(body.email)) {
      return errorResponse('Invalid email address', 400);
    }

    if (body.message.length < 10) {
      return errorResponse('Message must be at least 10 characters', 400);
    }

    const subjectLabel = SUBJECT_LABELS[body.subject] || body.subject;
    const msgId = `<${crypto.randomUUID()}@geelongstars.com.au>`;
    const dateHeader = new Date().toUTCString();

    const raw = [
      `From: "Geelong Stars Website" <${FROM}>`,
      `To: <${TO}>`,
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

    await env.EMAIL.send(new EmailMessage(FROM, TO, raw));

    return successResponse(null, 'Message sent successfully! We will get back to you soon.');
  } catch (error) {
    console.error('Contact form error:', error);
    return errorResponse('Failed to send message. Please try again later.', 500);
  }
}
