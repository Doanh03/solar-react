# Preview E2E checklist

This checklist validates the existing application without changing the Production Lead Flow.

## Scope

- Home page renders successfully.
- Client lead form progresses through all 4 steps.
- Browser submission uses `POST /api/leads` with JSON.
- Successful persistence returns HTTP `201` with a lead id and scoring fields.
- PostgreSQL persistence continues to use `DATABASE_URL`.
- Preview is validated before any Production promotion.

## Manual verification

1. Open the Preview deployment.
2. Open DevTools → Network.
3. Complete the lead form with test data.
4. Confirm `POST /api/leads` returns `201`.
5. Confirm the response contains `lead.id`, `lead.lead_score`, `lead.lead_temperature`, and `lead.created_at`.
6. Check Vercel Runtime Logs for the Preview deployment and confirm there is no `lead_persistence_failed` for the test.
7. Never print, copy, or expose `DATABASE_URL`.

## Out of scope

- Changing the `POST /api/leads` contract.
- Changing PostgreSQL connection behavior.
- Changing Production environment variables.
- Promoting to Production before Preview validation passes.
