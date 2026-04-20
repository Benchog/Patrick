import { Resend } from 'resend';

const TO_EMAIL = process.env.SERVICE_REQUEST_TO_EMAIL || 'pat.benchog@gmail.com';
const FROM_EMAIL = process.env.SERVICE_REQUEST_FROM_EMAIL || 'Portfolio Requests <onboarding@resend.dev>';

function badRequest(message) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status: 400,
    headers: { 'content-type': 'application/json' },
  });
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'RESEND_API_KEY is missing. Add it in Vercel environment variables.',
      }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }

  let body = {};
  try {
    body = await req.json();
  } catch {
    return badRequest('Invalid JSON payload.');
  }

  const required = ['serviceSlug', 'serviceTitle', 'servicePriceGhs', 'fullName', 'email', 'phone', 'message'];
  for (const key of required) {
    if (!body[key]) return badRequest(`Missing field: ${key}`);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const submittedAt = new Date().toISOString();

  try {
    const subject = `New Service Request: ${body.serviceTitle}`;
    const html = `
      <h2>New Portfolio Service Request</h2>
      <p><strong>Service:</strong> ${body.serviceTitle}</p>
      <p><strong>Starting Price:</strong> GHS ${Number(body.servicePriceGhs).toLocaleString('en-GH')}</p>
      ${body.serviceBillingNote ? `<p><strong>Billing Note:</strong> ${body.serviceBillingNote}</p>` : ''}
      <hr />
      <p><strong>Name:</strong> ${body.fullName}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ''}
      ${body.timeline ? `<p><strong>Timeline:</strong> ${body.timeline}</p>` : ''}
      <p><strong>Details:</strong></p>
      <p>${String(body.message).replace(/\n/g, '<br />')}</p>
      <hr />
      <p><small>Submitted at: ${submittedAt}</small></p>
    `;

    const text = [
      `New Portfolio Service Request`,
      `Service: ${body.serviceTitle}`,
      `Starting Price: GHS ${Number(body.servicePriceGhs).toLocaleString('en-GH')}`,
      body.serviceBillingNote ? `Billing Note: ${body.serviceBillingNote}` : '',
      `Name: ${body.fullName}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone}`,
      body.company ? `Company: ${body.company}` : '',
      body.timeline ? `Timeline: ${body.timeline}` : '',
      `Details: ${body.message}`,
      `Submitted at: ${submittedAt}`,
    ]
      .filter(Boolean)
      .join('\n');

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject,
      html,
      text,
      replyTo: body.email,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error instanceof Error ? error.message : 'Failed to send email.',
      }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}
