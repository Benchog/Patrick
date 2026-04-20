import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const REQUIRED_PLAN_DEFAULTS = [
  { slug: 'app-development', title: 'App development', price_ghs: 22000, billing_note: 'from · scoped to requirements', sort_order: 10 },
  { slug: 'website-simple', title: 'Simple business website', price_ghs: 3800, billing_note: 'from · typical small site', sort_order: 20 },
  { slug: 'website-larger', title: 'Larger website', price_ghs: 9500, billing_note: 'from · depends on page count', sort_order: 30 },
  { slug: 'data-dashboards', title: 'Data analytics & dashboards', price_ghs: 6500, billing_note: 'from · per engagement', sort_order: 40 },
  { slug: 'cad-cam', title: 'CAD / CAM engineering', price_ghs: 5500, billing_note: 'from · per deliverable', sort_order: 50 },
  { slug: 'graphics-photo', title: 'Graphics & photo editing', price_ghs: 2800, billing_note: 'from · per package', sort_order: 60 },
  { slug: 'it-support', title: 'IT support & computer help', price_ghs: 400, billing_note: 'from · per session / ticket', sort_order: 70 },
  { slug: 'document-thesis', title: 'Document & thesis editing', price_ghs: 1200, billing_note: 'from · per document', sort_order: 80 },
  { slug: 'prompt-engineer-systems', title: 'Prompt Engineer systems', price_ghs: 3200, billing_note: 'from · per access package', sort_order: 90 },
];

function formatGhs(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return '';
  try {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `GHS ${num.toLocaleString('en-GH', { maximumFractionDigits: 0 })}`;
  }
}

export function ServiceRequestSection() {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [selectedSlug, setSelectedSlug] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    timeline: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) return;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('pricing_plans')
          .select('slug,title,price_ghs,billing_note,is_active,sort_order')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (cancelled) return;
        if (error) throw error;
        setPlans(data || []);
      } catch {
        // keep graceful fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('service');
    if (fromUrl) setSelectedSlug(fromUrl);
  }, []);

  const selectedPlan = useMemo(
    () => {
      const merged = [...plans];
      REQUIRED_PLAN_DEFAULTS.forEach((seed) => {
        if (!merged.some((p) => p.slug === seed.slug)) merged.push(seed);
      });
      return merged.find((p) => p.slug === selectedSlug) || null;
    },
    [plans, selectedSlug],
  );

  const serviceOptions = useMemo(() => {
    const merged = [...plans];
    REQUIRED_PLAN_DEFAULTS.forEach((seed) => {
      if (!merged.some((p) => p.slug === seed.slug)) merged.push(seed);
    });
    return merged.sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999));
  }, [plans]);

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      setStatus({ type: 'error', message: 'Please select a service first.' });
      return;
    }
    setSubmitting(true);
    setStatus({ type: 'idle', message: '' });
    try {
      const payload = {
        serviceSlug: selectedPlan.slug,
        serviceTitle: selectedPlan.title,
        servicePriceGhs: selectedPlan.price_ghs,
        serviceBillingNote: selectedPlan.billing_note || '',
        ...form,
      };
      const r = await fetch('/api/service-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data?.ok) throw new Error(data?.error || 'Unable to submit request.');
      setStatus({
        type: 'success',
        message: 'Request sent successfully. Patrick will reach out by email shortly.',
      });
      setForm({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        timeline: '',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Could not submit request.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="service-request" className="fade-in service-request-section" tabIndex={-1} aria-label="Service request form">
      <h2 className="section-title">Request a Service</h2>
      <p className="service-request-intro">
        Choose the service you want, review the locked starting price, and submit your project details.
      </p>
      <form className="service-request-form" onSubmit={onSubmit}>
        <label>
          Service
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            required
          >
            <option value="">Select a service...</option>
            {serviceOptions.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Full name
          <input type="text" value={form.fullName} onChange={onChange('fullName')} required />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={onChange('email')} required />
        </label>
        <label>
          Phone / WhatsApp
          <input type="text" value={form.phone} onChange={onChange('phone')} required />
        </label>
        <label>
          Company (optional)
          <input type="text" value={form.company} onChange={onChange('company')} />
        </label>
        <label>
          Preferred timeline
          <input
            type="text"
            value={form.timeline}
            onChange={onChange('timeline')}
            placeholder="e.g. 2 weeks, 1 month..."
          />
        </label>

        {selectedPlan ? (
          <div className="service-request-price-box" aria-live="polite">
            <label>
              Starting price (locked)
              <input
                type="text"
                value={`${formatGhs(selectedPlan.price_ghs)}${selectedPlan.billing_note ? ` · ${selectedPlan.billing_note}` : ''}`}
                readOnly
              />
            </label>
          </div>
        ) : null}

        <label className="service-request-message">
          Project details
          <textarea
            value={form.message}
            onChange={onChange('message')}
            required
            rows={5}
            placeholder="Tell me what you need, your goals, and any must-have features."
          />
        </label>

        <button type="submit" className="service-request-submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send request'}
        </button>

        {status.message ? (
          <p className={`service-request-status ${status.type === 'success' ? 'ok' : 'err'}`}>{status.message}</p>
        ) : null}
      </form>
    </section>
  );
}
