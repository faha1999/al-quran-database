# Review Process

## Merge policy

- One approving review minimum
- All CI checks passing
- PR description includes scope, test proof, docs impact, and rollout risk
- No direct push to protected `main` after branch protection enabled

## Reviewer focus

- Contract changes in API/data loader
- Dataset correctness and provenance
- UX regressions in docs/search flow
- Test gaps for edge cases
- Build or deployment workflow risk

## Repository settings to enable

- Require pull request before merging
- Require approval count: 1+
- Require status checks: lint, typecheck, tests, e2e, build
- Dismiss stale approvals on new commits
