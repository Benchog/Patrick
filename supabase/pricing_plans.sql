-- Run in Supabase: SQL Editor → New query → Run.
-- Edit prices anytime in Table Editor → public.pricing_plans (dashboard bypasses RLS).
-- Re-run the INSERT block below to refresh default copy/prices (upserts by slug).

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

drop policy if exists "Public read active pricing_plans" on public.pricing_plans;

create policy "Public read active pricing_plans"
  on public.pricing_plans
  for select
  to anon, authenticated
  using (is_active = true);

-- Seed / refresh: one row per service from your portfolio “Services” section (adjust GHS in Table Editor anytime)
insert into public.pricing_plans (slug, title, subtitle, description, price_ghs, billing_note, features, is_highlight, sort_order)
values
  (
    'app-development',
    'App development',
    'Mobile & web products',
    'Cross-platform apps with real backends, sync, and releases your users can rely on — scope drives the final quote.',
    22000,
    'from · scoped to requirements',
    '["Discovery + scope lock", "Core screens & flows", "API / database integration", "Test build + production deploy"]'::jsonb,
    true,
    10
  ),
  (
    'website-simple',
    'Simple business website',
    'Ideal if you are not technical',
    'A clear, professional site people understand immediately: who you are, what you offer, how to contact you — perfect for a small business, creator, or side project.',
    3800,
    'from · typical small site',
    '["Up to 5 sections / pages", "Mobile-friendly layout", "Contact form & social links", "One structured revision round"]'::jsonb,
    false,
    20
  ),
  (
    'website-larger',
    'Larger website',
    'More pages & structure',
    'When you need more pages, richer content, or a stronger story across the site — still fast and deploy-ready.',
    9500,
    'from · depends on page count',
    '["Information architecture", "Multi-page build", "Performance & SEO basics", "Revisions aligned to scope"]'::jsonb,
    false,
    30
  ),
  (
    'data-dashboards',
    'Data analytics & dashboards',
    'Numbers you can act on',
    'Turn spreadsheets and exports into dashboards and written insight your team can actually use.',
    6500,
    'from · per engagement',
    '["Data cleanup & checks", "KPI layout & charts", "Short written recommendations", "Walkthrough handoff"]'::jsonb,
    false,
    40
  ),
  (
    'cad-cam',
    'CAD / CAM engineering',
    'Drawings you can use',
    'Mechanical design support in Solid Edge and AutoCAD — from concepts to drawings ready for review or manufacture.',
    5500,
    'from · per deliverable',
    '["2D / 3D as agreed", "Revision cycle included in scope", "Files you can share with vendors"]'::jsonb,
    false,
    50
  ),
  (
    'graphics-photo',
    'Graphics & photo editing',
    'Brand-ready visuals',
    'Flyers, social posts, light branding touches, and photo edits with clean layout and print-ready export when needed.',
    2800,
    'from · per package',
    '["Source files when agreed", "Print or digital export", "Fast turnaround options"]'::jsonb,
    false,
    60
  ),
  (
    'it-support',
    'IT support & computer help',
    'Windows, Office, fixes',
    'Installations, activation, antivirus, tune-ups, and software issues — remote or on-site where agreed.',
    400,
    'from · per session / ticket',
    '["Diagnosis first", "Clear next steps", "Optional follow-up block"]'::jsonb,
    false,
    70
  ),
  (
    'document-thesis',
    'Document & thesis editing',
    'Clear, submission-ready work',
    'Proofreading, structure, formatting, and academic tone — tuned so your document reads polished and intentional.',
    1200,
    'from · per document',
    '["Style consistency pass", "Formatting to your guide", "Tracked suggestions where useful"]'::jsonb,
    false,
    80
  )
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  price_ghs = excluded.price_ghs,
  billing_note = excluded.billing_note,
  features = excluded.features,
  is_highlight = excluded.is_highlight,
  sort_order = excluded.sort_order;

-- Hide legacy demo rows from an earlier version of this file (safe if they never existed)
update public.pricing_plans
set is_active = false
where slug in ('landing-site', 'web-app-mvp', 'dashboard-analytics');
