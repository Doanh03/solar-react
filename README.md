# Solar React

Solar Energy lead-generation website built with Next.js, React, TypeScript, and PostgreSQL.

## Current production flow

- Next.js App Router frontend.
- Multi-step solar consultation form on `/`.
- `POST /api/leads` validates input, scores the lead, captures attribution, and persists it to PostgreSQL.
- PostgreSQL connection uses the Vercel environment variable `DATABASE_URL`.
- Successful lead persistence returns HTTP `201` with the created lead id, score, temperature, and timestamp.
- Persistence failures return HTTP `503` and log `lead_persistence_failed` without exposing database credentials.

## Development

```bash
npm install
npm run dev
```

Build and lint:

```bash
npm run lint
npm run build
```

## Preview validation

Use `docs/preview-checklist.md` to validate the full browser → API → PostgreSQL flow on a Vercel Preview deployment before promoting changes to Production.

Do not print, commit, or share `DATABASE_URL`.
