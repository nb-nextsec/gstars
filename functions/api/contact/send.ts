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

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /api/contact/send
export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env: _env } = context;

  try {
    const body: ContactForm = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return errorResponse('Name, email, subject, and message are required', 400);
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return errorResponse('Invalid email address', 400);
    }

    // Validate message length
    if (body.message.length < 10) {
      return errorResponse('Message must be at least 10 characters', 400);
    }

    // In a production environment, you would send an email here
    // using Cloudflare Email Workers or an external service.
    // For now, we'll just log the contact form submission.
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Implement actual email sending using Cloudflare Email Workers
    // or integrate with an email service like SendGrid, Mailgun, etc.
    //
    // Example with Cloudflare Email Workers:
    // await env.EMAIL.send({
    //   to: 'info@geelongstars.com.au',
    //   from: 'noreply@geelongstars.com.au',
    //   subject: `Contact Form: ${body.subject}`,
    //   text: `
    //     Name: ${body.name}
    //     Email: ${body.email}
    //     Phone: ${body.phone || 'Not provided'}
    //
    //     Message:
    //     ${body.message}
    //   `,
    // });

    return successResponse(null, 'Message sent successfully! We will get back to you soon.');
  } catch (error) {
    console.error('Contact form error:', error);
    return errorResponse('Failed to send message. Please try again later.', 500);
  }
}
