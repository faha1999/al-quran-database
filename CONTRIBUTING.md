# Contributing

## Setup

```bash
npm install
npm run dev
```

## Before opening pull request

1. Branch from `main`.
2. Keep changes scoped. Separate data, API, UI, and docs work when possible.
3. Update docs in [`app/docs/*`](al-quran-database/app/docs) and
   [`docs/*`](al-quran-database/docs) when behavior changes.
4. Run full quality gate:

```bash
npm run format
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

## SDK auto-publish

- GitHub Actions publishes the SDK from `main` via `.github/workflows/publish-sdk.yml`.
- Store an npm automation token in repository secret `NPM_TOKEN`.
- Bump `packages/sdk/package.json` version before merge when a new npm release is intended.
- The publish workflow skips automatically if that exact version already exists on npm.

## Engineering rules

- Use strict TypeScript. Avoid `any`.
- Use shared helpers from `lib/` before adding route-local logic.
- Keep API responses in `{ success, data?, error?, meta? }` shape.
- Prefer focused components and utilities over large page files.
- Add tests for new behavior and edge cases.
- Document exported shared modules with concise TSDoc.

## Review process

- Every PR needs at least one reviewer approval before merge.
- Do not self-merge while checks are red.
- Use PR template sections completely: scope, test plan, docs impact, rollout risk.
- CODEOWNERS should review shared API, loader, and workflow changes.

See [`docs/review-process.md`](al-quran-database/docs/review-process.md)
for merge policy detail.

## Data contributions

- Validate source provenance and license before adding new editions.
- Run `npm run data:verify` after modifying source data or conversion scripts.
- Include schema impact and source references in PR description.

## License

By contributing, you agree contributions are licensed under MIT.
