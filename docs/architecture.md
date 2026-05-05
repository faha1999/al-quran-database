# Architecture

## Layers

1. Data
   - Raw JSON lives in `lib/data/*`
   - Python scripts convert, verify, migrate, seed, and export relational variants
2. Domain
   - `lib/data-loader/*` resolves Quran entities, pagination, filters, translation attachment, search
3. Transport
   - `app/api/*` exposes normalized route contracts through shared success/error helpers
4. Presentation
   - `app/*` and `components/*` render docs, examples, landing, and search experiences
5. Delivery
   - GitHub Actions runs format, lint, typecheck, unit/integration, e2e, build

## Design rules

- Business logic belongs in `lib/`, not route files
- Shared UI behavior belongs in focused components or utilities
- API contracts stay stable even when internal data loading changes
- Search filter state remains mutually exclusive: `edition` xor `language`
