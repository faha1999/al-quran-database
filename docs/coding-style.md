# Coding Style Guide

## TypeScript

- Keep `strict` green.
- Prefer explicit interfaces for data contracts.
- Avoid `any`. Use `unknown` plus narrowing when runtime data uncertain.
- Add concise TSDoc on exported shared utilities, classes, and components.

## API routes

- Validate query params at boundary.
- Return normalized JSON shape: `{ success, data?, error?, meta? }`.
- New REST endpoints belong under `app/api/v1/*`; legacy aliases may re-export them.
- Reuse shared response helpers from `lib/api-response.ts`.
- Log validation as `warn`, unexpected failures as `error`.

## React and Next.js

- Default to Server Components. Opt into client components only for browser state or effects.
- Split reusable UI primitives out of page files once behavior becomes shareable.
- Include empty, loading, and error states for interactive pages.
- Preserve mobile layout quality. No desktop-only assumptions.

## Search and data access

- Keep filter logic composable and framework-agnostic where possible.
- Use cached edition loaders for repeated reads.
- Use shared API cache helper for hot routes; Redis optional, memory fallback required.
- Prefer domain helpers in `lib/data-loader/*` over route-local data traversal.

## Formatting

- Prettier controls formatting.
- ESLint warnings should trend to zero.
- Use ASCII unless source data requires Unicode.

## Testing

- Unit test pure helpers and loader logic.
- Integration test route behavior and validation.
- E2E test primary user workflows: docs load, search flow, API smoke path.
