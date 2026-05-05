import DocsLayout from '@/components/DocsLayout';

const quickLinks = [
  {
    title: 'REST API',
    body: 'Typed JSON contracts for surahs, ayahs, juz, pages, rub, words, reciters, duas.',
  },
  {
    title: 'Search System',
    body: 'Arabic-first search with edition and language filters, pagination, validation rules.',
  },
  {
    title: 'SDK Usage',
    body: 'Lightweight JS/TS client for consuming local or deployed API endpoints.',
  },
  {
    title: 'Delivery Flow',
    body: 'Lint, typecheck, unit tests, integration tests, e2e smoke tests, production build.',
  },
];

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="space-y-10">
        <section className="space-y-5">
          <div className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
            Developer Platform
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Quran data, API, docs, SDK. One system. Clean contracts.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-zinc-400">
            This project serves sharded Quran JSON through typed Next.js API routes, a reusable
            JS/TS SDK, searchable docs, SQL export pipeline, and production-ready quality gates.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {quickLinks.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <h2 className="mb-3 text-xl font-semibold text-zinc-100">{item.title}</h2>
              <p className="text-sm leading-6 text-zinc-400">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
            <pre className="overflow-x-auto rounded-2xl bg-black/50 p-5 text-sm text-zinc-300">
              <code>{`npm install
npm run dev

curl "http://localhost:3000/api/search?q=mercy&language=en"

import { quran } from '@/lib/sdk';
const surah = await quran.getSurah(1, 'en.sahih');`}</code>
            </pre>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Response Contract</h2>
            <pre className="overflow-x-auto rounded-2xl bg-black/50 p-5 text-sm text-zinc-300">
              <code>{`{
  "success": true,
  "data": [...],
  "meta": {
    "total": 114
  }
}`}</code>
            </pre>
          </article>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-950 to-blue-950/30 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Quality Gates</h2>
          <div className="grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
            <p>`npm run lint` enforces ESLint + Prettier.</p>
            <p>`npm run typecheck` keeps strict TypeScript green.</p>
            <p>`npm test` covers core loader + route integration behavior.</p>
            <p>`npm run test:e2e` smoke-tests docs, search, and API in browser.</p>
            <p>`npm run build` proves production compile succeeds.</p>
            <p>GitHub Actions runs same checks for every pull request.</p>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
