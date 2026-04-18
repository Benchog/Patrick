-- Run in Supabase: SQL Editor → New query → Run.
-- Then edit prices in Table Editor → public.pricing_plans (dashboard bypasses RLS).

create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  description text,
  price_ghs numeric(12, 2) not null check (price_ghs >= 0),
  billing_note text default 'Starting at',
  features jsonb default '[]'::jsonb,
  is_highlight boolean default false,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists pricing_plans_active_sort_idx
  on public.pricing_plans (is_active, sort_order);

alter table public.pricing_plans enable row level security;

-- Public site: anyone can read active plans (anon key)
create policy "Public read active pricing_plans"
  on public.pricing_plans
  for select
  to anon, authenticated
  using (is_active = true);

-- Optional: only you (authenticated dashboard) can insert/update/delete.
-- Replace with your workflow: e.g. use service role in dashboard only, or add auth policies.
-- Example for service role / dashboard (adjust to your security model):
-- create policy "Service role full access"
--   on public.pricing_plans for all
--   to service_role
--   using (true) with check (true);

-- Seed examples (edit or delete in Table Editor)
insert into public.pricing_plans (slug, title, subtitle, description, price_ghs, billing_note, features, is_highlight, sort_order)
values
  (
    'landing-site',
    'Landing / brochure site',
    'Fast credibility',
    'Single strong page or small multi-page site: responsive layout, contact focus, deploy-ready.',
    3500,
    'per project · scoped',
    '["Up to 4 sections", "Mobile-first layout", "Contact + social hooks", "1 round of revisions"]'::jsonb,
    false,
    10
  ),
  (
    'web-app-mvp',
    'Web app MVP',
    'Product-ready slice',
    'Auth, core flows, and a live backend hook-up for a focused first release.',
    18000,
    'starting at · depends on scope',
    '["Requirements workshop", "UI + core screens", "API / database wiring", "Staging + production deploy"]'::jsonb,
    true,
    20
  ),
  (
    'dashboard-analytics',
    'Dashboard & analytics',
    'Decisions from data',
    'Excel / sheet ingestion, KPI layout, and a narrative your team can act on.',
    5500,
    'per engagement',
    '["Data model cleanup", "Chart suite", "Written insights", "Handoff session"]'::jsonb,
    false,
    30
  )
on conflict (slug) do nothing;
