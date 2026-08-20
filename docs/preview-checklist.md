# Preview E2E checklist

This checklist is intentionally read-only with respect to the existing Production Lead Flow.

## Scope

- Home page renders successfully.
- Client lead form can progress through all 4 steps.
- Browser submission uses `POST /api/leads` with JSON.
- Production contract remains: `201` on successful persistence and `503` on persistence failure.
- PostgreSQL persistence continues to use `DATABASE_URL`.
- No Production deployment/configuration changes are required for Preview validation.

## Manual verification

1. Open the Preview deployment.
2. Open DevTools → Network.
3. Complete the lead form with test data.
4. Confirm `POST /api/leads` returns `201`.
5. Confirm the response contains a lead `id`, `lead_score`, `lead_temperature`, and `created_at`.
6. In Vercel Runtime Logs, filter `Production` or `Preview` as appropriate and confirm there is no `lead_persistence_failed` for the test.
7. Never print or copy `DATABASE_URL`.

## Out of scope

- Changing the lead API contract.
- Changing PostgreSQL connection semantics.
- Changing Production environment variables.
- Deploying the Preview changes to Production before manual validation.
