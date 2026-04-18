import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const FX_URLS = [
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/ghs.min.json',
  'https://latest.currency-api.pages.dev/v1/currencies/ghs.json',
];

function parseFeatures(raw) {
  if (Array.isArray(raw)) return raw.filter(Boolean).map(String);
  if (raw && typeof raw === 'object') {
    const vals = Object.values(raw);
    if (vals.every((v) => typeof v === 'string')) return vals;
  }
  if (typeof raw === 'string') {
    try {
      const j = JSON.parse(raw);
      if (Array.isArray(j)) return j.map(String);
    } catch {
      return raw
        .split(/\n|•/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return [];
}

function normalizeUsdPerOneGhs(raw) {
  if (typeof raw !== 'number' || !(raw > 0)) return null;
  if (raw < 1) return raw;
  if (raw >= 1 && raw < 50) return 1 / raw;
  return null;
}

async function fetchUsdPerGhs() {
  for (const url of FX_URLS) {
    try {
      const r = await fetch(url);
      if (!r.ok) continue;
      const data = await r.json();
      const raw = data?.ghs?.usd ?? data?.GHS?.USD;
      const rate = normalizeUsdPerOneGhs(raw);
      if (rate != null) return rate;
    } catch {
      /* try next */
    }
  }
  return null;
}

function formatGhs(n) {
  const num = Number(n);
  try {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `GHS\u00A0${num.toLocaleString('en-GH', { maximumFractionDigits: 0 })}`;
  }
}

export function PricingSection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usdPerGhs, setUsdPerGhs] = useState(null);
  const [rateMeta, setRateMeta] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const rate = await fetchUsdPerGhs();
      if (cancelled) return;
      setUsdPerGhs(rate);
      setRateMeta(rate != null ? new Date().toISOString() : null);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setLoading(false);
      setError('missing_env');
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    let cancelled = false;

    (async () => {
      try {
        const { data, error: qErr } = await supabase
          .from('pricing_plans')
          .select(
            'id,slug,title,subtitle,description,price_ghs,billing_note,features,is_highlight,sort_order',
          )
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (cancelled) return;
        if (qErr) throw qErr;
        setPlans(data ?? []);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'fetch_failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatUsd = (ghsAmount) => {
    if (usdPerGhs == null) return null;
    const usd = Number(ghsAmount) * usdPerGhs;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(usd);
  };

  if (error === 'missing_env') {
    return (
      <section id="pricing" className="fade-in" tabIndex={-1} aria-label="Pricing">
        <h2 className="section-title">Pricing</h2>
        <div className="pricing-error">
          Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your environment (e.g. Vercel → Settings → Environment Variables), then redeploy. Run the SQL in{' '}
          <code>supabase/pricing_plans.sql</code> in the Supabase SQL editor to create the table and sample rows.
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="pricing" className="fade-in" aria-label="Pricing">
        <h2 className="section-title">Pricing</h2>
        <p className="pricing-intro">Loading packages…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="fade-in" tabIndex={-1} aria-label="Pricing">
        <h2 className="section-title">Pricing</h2>
        <div className="pricing-error">
          Could not load pricing: {error}. Confirm the <code>pricing_plans</code> table exists and public read is allowed (see{' '}
          <code>supabase/pricing_plans.sql</code>).
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="fade-in" tabIndex={-1} aria-label="Pricing">
      <h2 className="section-title">Pricing</h2>
      <p className="pricing-intro">
        Starting points in Ghana cedis (GHS), with a live USD estimate for clients outside Ghana. Update amounts anytime in your Supabase{' '}
        <code>pricing_plans</code> table — no redeploy required.
      </p>
      <p className="pricing-rate-line">
        {usdPerGhs != null ? (
          <>
            Live rate:{' '}
            <code>
              1 GHS {'\u2248'} {usdPerGhs.toFixed(4)} USD
            </code>
            {rateMeta ? ` · ${new Date(rateMeta).toLocaleString()}` : ''}. USD is indicative (mid-market), not a bank quote.
          </>
        ) : (
          <>USD estimate is offline right now; GHS prices below come straight from your database.</>
        )}
      </p>

      {plans.length === 0 ? (
        <div className="pricing-empty">
          No active plans yet. In Supabase, open the <code>pricing_plans</code> table and add rows with <code>is_active = true</code>, or run the seed in{' '}
          <code>supabase/pricing_plans.sql</code>.
        </div>
      ) : (
        <div className="pricing-grid">
          {plans.map((p) => {
            const feats = parseFeatures(p.features);
            const usd = formatUsd(p.price_ghs);
            return (
              <article
                key={p.id}
                className={`pricing-card${p.is_highlight ? ' pricing-card--highlight' : ''}`}
              >
                {p.is_highlight ? <span className="pricing-card-badge">Popular</span> : null}
                <h3>{p.title}</h3>
                {p.subtitle ? <p className="pricing-card-sub">{p.subtitle}</p> : null}
                {p.description ? <p className="pricing-card-desc">{p.description}</p> : null}
                <div className="pricing-price-block">
                  <div className="pricing-ghs">{formatGhs(p.price_ghs)}</div>
                  {p.billing_note ? <div className="pricing-billing">{p.billing_note}</div> : null}
                  {usd ? (
                    <div className="pricing-usd">
                      {'\u2248'} {usd} USD
                    </div>
                  ) : null}
                </div>
                {feats.length > 0 ? (
                  <ul className="pricing-features">
                    {feats.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                ) : null}
                <div className="pricing-cta">
                  <a href="#contact">Start a conversation</a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
