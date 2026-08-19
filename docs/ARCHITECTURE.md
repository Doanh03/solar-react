# Solar V2 Architecture

## Product direction

Solar V2 is a conversion and marketing platform, not only a corporate brochure.

Traffic sources: SEO, Meta Ads, Google Ads, direct/referral.
Conversion assets: website pages, solar calculator, progressive lead form, hotline.
Business flow: Lead -> qualification/score -> CRM/Sale -> deal -> revenue.
Marketing flow: source/campaign -> lead -> qualified lead -> sale -> revenue -> ROAS/CAC.

## Target stack

- Next.js + React + TypeScript
- Tailwind CSS
- Zod + React Hook Form
- Route Handlers / Server Actions for backend boundaries
- PostgreSQL for production lead data
- Vercel for deployment
- GA4 + GTM for analytics
- Meta/Google conversion events behind a server-side tracking boundary where appropriate

## Repository principles

1. Keep `main` production-ready.
2. Feature branches for each phase.
3. CI must pass lint/build/tests before merge.
4. No invented business claims or project statistics.
5. Calculator outputs are estimates and must show assumptions.
6. Tracking must be privacy-aware and must not log raw secrets or unnecessary PII.
7. Business logic stays separate from presentation components.

## Application layers

```text
app/                 routes, layouts, metadata, API boundaries
components/          reusable UI and conversion components
features/            domain modules: calculator, leads, scoring, tracking
lib/                 shared utilities, validation, attribution
server/              persistence and server-only integrations
docs/                architecture and business rules
```

## Conversion funnel

```text
Traffic
  -> Landing / Content
  -> Calculator OR Lead Form OR Hotline
  -> Lead
  -> Score + Attribution
  -> CRM / Sale
  -> Qualified
  -> Survey / Quote
  -> Deal
  -> Revenue
```

## Phase plan

### Phase 0
Architecture, routes, data model, attribution model, scoring rules.

### Phase 1
Next.js migration/foundation, responsive website, calculator, progressive form, SEO.

### Phase 2
Lead API, PostgreSQL persistence, UTM attribution, analytics/conversion events.

### Phase 3
Internal lead dashboard, status, scoring, assignment, source/campaign views.

### Phase 4
Marketing intelligence: CPL, CPQL, CPA, CVR, revenue, ROAS, CAC.

### Phase 5
PDF estimate, CRM integration, Meta CAPI/Google enhanced conversions and automation.
