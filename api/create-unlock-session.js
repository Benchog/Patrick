export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return res.status(500).json({ ok: false, error: 'Missing PAYSTACK_SECRET_KEY in Vercel env.' });
  }
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const email = body.email;
  if (!email) return res.status(400).json({ ok: false, error: 'Missing email.' });

  try {
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const callbackUrl = `${origin}/?service=prompt-engineer-systems#service-request`;

    const payload = {
      email,
      amount: 4900 * 100, // GHS 4,900 in pesewas
      currency: 'GHS',
      callback_url: callbackUrl,
      metadata: {
        serviceSlug: body.serviceSlug || 'prompt-engineer-systems',
        custom_fields: [
          {
            display_name: 'Service',
            variable_name: 'service_slug',
            value: body.serviceSlug || 'prompt-engineer-systems',
          },
        ],
      },
    };

    const r = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await r.json();
    if (!r.ok || !data?.status || !data?.data?.authorization_url) {
      throw new Error(data?.message || 'Could not initialize Paystack payment.');
    }

    return res.status(200).json({ ok: true, url: data.data.authorization_url });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : 'Could not create Paystack session.',
    });
  }
}
