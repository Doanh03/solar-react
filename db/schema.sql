create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  property_type text not null,
  monthly_bill numeric(14,2) not null,
  roof_area_m2 numeric(10,2) not null,
  solar_type text not null,
  calculator_used boolean not null default false,
  lead_score smallint not null,
  lead_temperature text not null,
  score_reasons jsonb not null default '[]'::jsonb,
  scoring_version text not null,
  source text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  landing_page text,
  referrer text,
  attribution_captured_at timestamptz,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_source_idx on leads (source);
create index if not exists leads_score_idx on leads (lead_score desc);
create index if not exists leads_status_idx on leads (status);
