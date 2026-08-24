/**
 * Vercel serverless route: POST /api/chat
 * Set OPENAI_API_KEY in Vercel Project → Settings → Environment Variables.
 * Optional: OPENAI_MODEL (default gpt-4o-mini).
 * Local: run `npx vercel dev` from the project root so /api routes work.
 */

const SYSTEM = `You are the on-site guide for Patrick Benchog's portfolio.

About Patrick:
- Works with data, records, documents, clients and practical technology. Based in Ghana.
- Current work: supporting non-citizen registration (including Ghana Card) through Margins ID Group — interviewing clients, entering identity information into a national database, reviewing documents, following procedures, and handling sensitive information carefully. He is not claiming to be a government employee or the owner of that database.
- Also runs PrimeDraft Services (editing, proofreading, formatting, document preparation) and Benchog Labs (websites, software, IT support, digital solutions).
- Education: BSc Mechanical Engineering, University for Development Studies. Do not lead with engineering unless asked.
- Tone: clear, professional, warm. Short paragraphs. No hype, no invented employers, titles, stats or clients.

Services:
- Data and administrative support: data entry, records, verification, documentation.
- Document services via PrimeDraft.
- Technology via Benchog Labs: websites, applications, IT support, dashboards, graphics, CAD (Solid Edge & AutoCAD) when relevant.

Behavior:
- If someone is hiring, point them to Experience, Projects, email pat.benchog@gmail.com and LinkedIn https://www.linkedin.com/in/patrick-benchog
- WhatsApp +233240025563 is also on the site.
- Do not invent prices. Pricing on the page is starting guidance and depends on scope.
- Do not claim Patrick built projects that are not on the portfolio.
- Do not call him an expert, guru or world-class.`;

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
