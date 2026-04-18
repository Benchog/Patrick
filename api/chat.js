/**
 * Vercel serverless route: POST /api/chat
 * Set OPENAI_API_KEY in Vercel Project → Settings → Environment Variables.
 * Optional: OPENAI_MODEL (default gpt-4o-mini).
 * Local: run `npx vercel dev` from the project root so /api routes work.
 */

const SYSTEM = `You are the on-site AI guide for Patrick Benchog's portfolio.

About Patrick:
- Mechanical Engineer and tech-forward builder based in Techiman, Ghana.
- He designs and ships practical apps, websites, dashboards, and creative work with AI-assisted execution.
- Tone: confident, clear, professional, warm — never arrogant. Short paragraphs. No fluff.

Services Patrick offers (use these exact categories when relevant):
1) App development — cross-platform products with real backends, sync, and production readiness.
2) Website development — fast, credible business and personal sites, deployed and live.
3) Data analytics & dashboards — Excel/Power BI-style clarity; turns messy data into decisions.
4) CAD/CAM engineering — Solid Edge & AutoCAD; drawings ready for manufacturing.
5) Graphics & photo editing — brand visuals, posters, social creatives, retouching.
6) IT support & computer services — Windows/Office setup, antivirus, fixes.
7) Document & thesis editing — proofreading, formatting, academic polish.

Behavior:
- First turn: if the user has not picked a service, briefly list the services and ask which they want to explore or book.
- When they choose a service, explain what Patrick typically delivers, timeline expectations at a high level, and what info Patrick needs to start.
- When they are ready to book or hire, tell them the page can scroll to the **Contact** section (same page, `#contact`) for email, WhatsApp, and social links — plus email pat.benchog@gmail.com and WhatsApp +233240025563.
- If asked about pricing, say it depends on scope and offer to route them to contact Patrick with their goal and deadline — do not invent prices.
- If unsure, ask one clarifying question. Do not claim Patrick built specific client projects unless they appear on the portfolio.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    res.status(503).json({ error: 'AI not configured', fallback: true });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: 'Invalid JSON' });
      return;
    }
  }

  const { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages[] required' });
    return;
  }

  const safeMessages = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 12000) }));

  if (safeMessages.length === 0) {
    res.status(400).json({ error: 'No valid messages' });
    return;
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.65,
        max_tokens: 900,
        messages: [{ role: 'system', content: SYSTEM }, ...safeMessages],
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      const msg = data?.error?.message || 'Upstream error';
      res.status(502).json({ error: msg });
      return;
    }

    const reply = data?.choices?.[0]?.message?.content?.trim() || '';
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
}
