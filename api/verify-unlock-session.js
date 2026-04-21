export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return res.status(500).json({ ok: false, error: 'Missing PAYSTACK_SECRET_KEY in Vercel env.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const reference = body.reference;
  if (!reference) return res.status(400).json({ ok: false, error: 'Missing reference.' });

  try {
    const r = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    const data = await r.json();
    if (!r.ok || !data?.status || !data?.data) {
      throw new Error(data?.message || 'Could not verify Paystack transaction.');
    }
    const paid = data.data.status === 'success';
    return res.status(200).json({ ok: true, paid });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : 'Could not verify Paystack transaction.',
    });
  }
}
