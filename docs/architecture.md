# Architecture

## Layers

1. Data
   - **Canonical JSON**: Sources live in `lib/data/*`.
   - **Data Sharding**: Large datasets (words, specific editions) are sharded to minimize memory footprint and optimize load times.
   - **Source of Truth**: Committed JSON is the source of truth. SQL dumps are local build artifacts.
   - **Data Pipeline**: Python scripts in `scripts/` handle conversion, verification (hashing), migration, and performance benchmarking.

2. Domain
   - **Data Loaders**: `lib/data-loader/*` provides high-performance access to Quran entities with built-in L1 caching.
   - **Knowledge Layer**: `knowledge-base.json` resolves thematic tags, cross-references, scientific notes, fiqh rulings, linguistic analysis, and research references.
   - **Search Engine**: `lib/search-engine.ts` integrates FlexSearch for ranked, fuzzy-matched keyword search.

3. Transport
   - **Versioned REST API**: `app/api/v1/*` provides a stable interface for external consumers.
   - **GraphQL API**: `app/api/graphql` exposes a typed query layer for complex, multi-entity requests.
   - **Multi-Level Caching**:
     - **L1 (In-Memory)**: Per-instance cache for ultra-fast response times.
     - **L2 (Redis)**: Optional shared cache for distributed scalability.
     - **Observability**: `X-Cache` headers indicate hit/miss status.

4. Presentation
   - **Framework**: Next.js 16 (App Router) with React 19.
   - **Component Model**: Default to Server Components; Client Components are reserved for interactive state (e.g., search filters).
   - **Aesthetics**: Modern UI with liquid glassmorphism, dark mode, and Framer Motion micro-animations.

5. Delivery
   - **CI/CD**: GitHub Actions pipeline executes linting, typechecking, Vitest (unit/integration), and Playwright (e2e) on every PR.
   - **Validation**: Automatic build verification ensures production readiness.

## Design Rules

- **JSON First**: All data updates must happen in JSON sources. SQL is an export target.
- **Logic Isolation**: Business logic resides strictly in `lib/`. Route handlers are minimal.
- **API Stability**: Public contracts (REST v1, GraphQL) must remain stable across internal refactors.
- **Performance First**: Hot paths must utilize `withApiCache` and avoid heavy computations on the request path.
- **Responsive & Accessible**: All UI components must adhere to high accessibility standards and provide a premium mobile experience.
- **Deterministic Pipeline**: Data processing must be reproducible with cryptographic verification of output hashes.
