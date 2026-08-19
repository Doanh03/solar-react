# Solar V2 Phase 1

## Scope

Phase 1 establishes reusable conversion-domain primitives while the existing Vite/React shell remains stable.

### Delivered

- Versioned solar calculator engine (`solar_estimate_v1`)
- Transparent lead scoring (`lead_scoring_v1`)
- Progressive qualification form
- UTM/source normalization helper
- Calculator and lead logic separated from presentation

### Migration note

The repository is currently a Vite + React application. The target architecture is Next.js + TypeScript, but the migration is intentionally staged so the current production-safe shell does not become unbuildable while package-lock and CI changes are prepared.

The next migration step should introduce Next.js and TypeScript together, regenerate the lockfile with the package manager, then move routes/components into the target `app/`, `components/`, `features/`, `lib/`, and `server/` layers.

## Calculator assumptions

The calculator intentionally exposes assumptions and returns a versioned snapshot. The numbers are modeling defaults only; they are not business claims, quotes, or engineering guarantees.

## Lead scoring

The score is a prioritization aid. It is not a purchase probability and should not be presented as AI/predictive scoring. Historical conversion data should be collected before attempting statistical calibration.
