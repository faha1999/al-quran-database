# Architecture

## Layers

1. Data
   - **Canonical JSON**: Sources live in `lib/data/*`.
   - **Data Sharding**: Large datasets (words, specific editions) are sharded to minimize memory footprint and optimize load times.
   - **Source of Truth**: Committed JSON is the source of truth. SQL dumps are local build artifacts.
   - **Data Pipeline**: Python scripts in `scripts/` handle conversion, verification (hashing), migration, and performance benchmarking.

2. SDK Local Layer (zero-dependency)
   - **Bundled JSON**: Core data (`surahs`, `ayahs`, `editions`, `juzs`, `hizbs`, `rubs`, `pages`, `duas`, `knowledge-base`) and 4 editions (`en.sahih`, `en.yusufali`, `quran-simple-clean`, `quran-uthmani`) ship inside the npm package.
   - **Universal Functions**: `packages/sdk/src/local.ts` exports 20+ typed functions (`getSurah`, `getAyah`, `searchAyahs`, etc.) that work without any server, network call, or Node.js `fs` module. Compatible with browsers, edge runtimes, and Node.
   - **CDN Distribution**: Every bundled file is auto-served via jsDelivr/unpkg from the moment the package is published.

3. Domain (server-side)
   - **Data Loaders**: `lib/data-loader/*` provides high-performance server-side access to Quran entities and shared data access helpers.
   - **Knowledge Layer**: `knowledge-base.json` resolves thematic tags, cross-references, scientific notes, fiqh rulings, linguistic analysis, and research references.
   - **Search Engine**: `lib/search-engine.ts` integrates FlexSearch for ranked, fuzzy-matched keyword search.

4. Transport
   - **Versioned REST API**: `app/api/v1/*` provides a stable interface for external consumers.
   - **Legacy REST Aliases**: `app/api/*` re-exports versioned handlers for backward compatibility.
   - **GraphQL API**: `app/api/v1/graphql` is the preferred typed query layer for complex, multi-entity requests. Legacy `/api/graphql` alias still resolves.
   - **Multi-Level Caching**:
     - **L1 (In-Memory)**: Per-instance cache for ultra-fast response times.
     - **L2 (Redis)**: Optional shared cache for distributed scalability.
     - **Observability**: `X-Cache` headers indicate hit/miss status.

5. Presentation
   - **Framework**: Next.js 16 (App Router) with React 19.
   - **Component Model**: Default to Server Components; Client Components are reserved for interactive state (e.g., search filters).
   - **Aesthetics**: Modern UI with liquid glassmorphism, dark mode, and Framer Motion micro-animations.

6. Delivery
   - **CI/CD**: GitHub Actions pipeline executes linting, typechecking, Vitest (unit/integration), and Playwright (e2e) on every PR.
   - **Validation**: Automatic build verification ensures production readiness.

## Design Rules

- **JSON First**: All data updates must happen in JSON sources. SQL is an export target.
- **Zero-Dependency by Default**: The npm package must work offline with no server. Data bundling and universal functions are first-class concerns.
- **Logic Isolation**: Business logic resides strictly in `lib/`. Route handlers are minimal.
- **API Stability**: Public contracts (REST v1, GraphQL) must remain stable across internal refactors.
- **Performance First**: Hot paths must utilize `withApiCache` and avoid heavy computations on the request path.
- **Responsive & Accessible**: Current docs and search layouts are built responsively, but no dedicated full a11y/mobile audit is documented yet.
- **Deterministic Pipeline**: Data processing must be reproducible with cryptographic verification of output hashes.
