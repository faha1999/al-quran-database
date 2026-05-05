# Architecture

## Layers

1. Data
   - Canonical JSON lives in `lib/data/*`
   - Local `quran.sql` is conversion input only, not committed source-of-truth
   - Python scripts convert, verify, migrate, seed, benchmark, and export relational variants
2. Domain
   - `lib/data-loader/*` resolves Quran entities, pagination, filters, translation attachment, search
   - Knowledge layer resolves thematic tags, cross references, fiqh notes, scientific-reference notes, linguistic notes, misinterpretation notes, FAQ entries, and research references
3. Transport
   - `app/api/v1/*` is stable versioned REST surface; legacy `/api/*` aliases remain
   - `app/api/graphql` exposes typed flexible query layer on top of same domain helpers
   - Metadata and knowledge routes reuse same canonical JSON loader as core Quran routes
   - Hot routes use optional Redis cache with in-memory fallback and cache-status headers
4. Presentation
   - `app/*` and `components/*` render docs, examples, landing, and search experiences
   - Docs surface download artifacts, schema guidance, and data-coverage policy
5. Delivery
   - GitHub Actions runs format, lint, typecheck, unit/integration, e2e, build

## Design rules

- JSON committed to Git is canonical. SQL dumps are local build inputs only.
- Business logic belongs in `lib/`, not route files
- Shared UI behavior belongs in focused components or utilities
- API contracts stay stable even when internal data loading changes
- New public REST work lands under `/api/v1/*`; keep legacy aliases only for compatibility
- Search filter state remains mutually exclusive: `edition` xor `language`
- Derived exports must be reproducible from committed JSON and verifiable against local SQL source
- Scholarly metadata may be partial, but schema support must stay normalized and explicit
