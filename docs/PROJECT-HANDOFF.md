# Solar React — Project Handoff

Last updated: 2026-08-19

## Project

- Repository: `Doanh03/solar-react`
- PR: `#4`
- Head branch: `feature/solar-v2-next-migration`
- Base: `feature/solar-v2-phase1`
- PR remains **draft/open** and must not be merged automatically.

## Product direction

This is not only a company brochure. The target architecture is a solar conversion and marketing-data platform:

```text
FB / Google / SEO / Direct
        -> Landing / Homepage
        -> Calculator
        -> Progressive Lead Form
        -> Lead API
        -> PostgreSQL
        -> CRM / Sale
        -> Qualified / Contract / Revenue
        -> Marketing analytics
```

Primary principle: optimize conversion, mobile UX, speed, SEO, tracking and lead quality before decorative animation.

## Protected contracts — DO NOT CHANGE casually

These are already E2E verified and should remain stable unless a dedicated change is required:

- `POST /api/leads`
- Solar Calculator logic in `app/lib/solar-calculator.ts`
- Lead Scoring in `app/lib/lead-scoring.ts`
- Attribution logic in `app/lib/attribution.ts`
- PostgreSQL persistence schema/insert contract

Current Lead API E2E previously verified:

- validation: PASS
- lead creation: PASS
- Lead Score: PASS
- Attribution: PASS
- PostgreSQL persistence: PASS
- cleanup: PASS

## Database

- Provider: Neon PostgreSQL
- Region: AWS Asia Pacific 1 (Singapore)
- Branch: `production`
- Database: `neondb`
- GitHub repository secret: `DATABASE_URL`
- Never store or document the actual database connection string/password in this repository or chat.

## Current implementation phase

### Completed

- Next.js + TypeScript migration foundation
- Homepage sections
- Solar Calculator
- Progressive Lead Form
- Lead API
- PostgreSQL schema and persistence
- Lead Score
- Attribution
- E2E workflow with schema bootstrap

### P0.1/P0.2 currently implemented

- Hero conversion-focused copy and CTA
- Hero CTA analytics
- Calculator CTA changed to a result-oriented CTA
- Calculator start/completion analytics
- Progressive form value promise
- Lead Score removed from customer-facing UI
- Progressive form funnel events
- Mobile sticky CTA with impression/click tracking
- First-touch UTM storage for analytics via sessionStorage
- Analytics event taxonomy documented in `docs/TRACKING.md`

## Analytics V1

Events:

```text
hero_cta_clicked
calculator_started
calculator_completed
lead_form_started
lead_form_step_completed
lead_phone_reached
lead_submitted
mobile_sticky_cta_impression
mobile_sticky_cta_click
```

Event requirements:

- `event_version`
- page
- device
- first-touch UTM context
- last-touch UTM context
- section/CTA where relevant
- calculator context where relevant
- `lead_id` only after successful submission
- never send phone/name/email or Lead Score to client analytics

Important: current analytics UTM persistence does **not** change the existing Lead API attribution contract. Separate first-touch/last-touch database fields are a later data-model phase.

## Conversion principles

- Do not claim “30 seconds” until actual completion-time data supports it.
- Sticky mobile CTA is a hypothesis to measure, not assumed to improve conversion.
- Project proof vs trust-section ordering should be validated with behavior data.
- Do not start heavy A/B-testing infrastructure before enough traffic exists for meaningful comparisons.

## Next work

1. Wait for CI and Lead API E2E after the current P0 changes.
2. If failures occur, fix only the regression and rerun.
3. Add browser smoke/E2E for desktop and mobile conversion flow.
4. Review Project/Trust/Process ordering using real behavior data.
5. Later build campaign landing pages without duplicating the Lead API:
   - `/landing/solar-home`
   - `/landing/solar-business`
   - `/landing/solar-factory`
   - `/landing/hybrid`
   - `/landing/battery`
6. Later expand CRM and Marketing Dashboard: CPL, CPQL, CPA, conversion rate, revenue, ROAS, CAC.

## Data safety rule

All significant work must be committed to GitHub before moving to the next phase. Do not make destructive rewrites of the database or replace working contracts just for refactoring. Prefer small commits and green CI gates.

## New-chat continuation

If this project is continued in a new ChatGPT conversation, open this file first. Then inspect PR #4 and the latest CI/E2E runs before making changes. The file is the durable project handoff; ChatGPT memory is only a secondary aid.
