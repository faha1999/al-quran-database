'use client';

import DocsLayout from '@/components/DocsLayout';
import ApiCard from '@/components/ApiCard';
import { motion } from 'framer-motion';
import { Code, Cpu, Database, Info, Terminal } from 'lucide-react';

const restEndpoints = [
  {
    method: 'GET',
    path: '/api/v1/surahs?page=1&limit=10',
    description:
      'List surahs with pagination metadata. Stable list endpoint for SDKs, docs previews, and browse UIs.',
    responseExample: `{
  "success": true,
  "data": [{ "id": 1, "name_en": "Al-Faatiha" }],
  "meta": { "total": 114, "page": 1, "limit": 10, "total_pages": 12 }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/surahs/1?edition=en.sahih',
    description: 'Resolve one surah with hydrated ayahs and optional edition translation data.',
    responseExample: `{
  "success": true,
  "data": {
    "id": 1,
    "ayahs": [{ "id": 1, "translation": "In the name of Allah..." }]
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/ayahs/1?edition=en.sahih&include_words=true',
    description:
      'Resolve one absolute ayah ID with optional translation, word breakdown, and knowledge payload.',
    responseExample: `{
  "success": true,
  "data": {
    "id": 1,
    "text": "بِسْمِ اللَّهِ...",
    "words": [{ "text": "بِسْمِ", "position": 1 }]
  }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/search?q=mercy&language=en&limit=5',
    description:
      'Ranked full-text search. Use either edition or language filter, never both in same request.',
    responseExample: `{
  "success": true,
  "data": [{ "id": 43, "matched_identifiers": ["translation"] }],
  "meta": { "total": 5, "page": 1, "limit": 5, "language": "en" }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/juz/1?edition=en.sahih',
    description: 'Resolve one juz with range metadata and included ayahs.',
  },
  {
    method: 'GET',
    path: '/api/v1/hizb/1?edition=en.sahih',
    description: 'Resolve one hizb with range metadata and included ayahs.',
  },
  {
    method: 'GET',
    path: '/api/v1/rub/1?edition=en.sahih',
    description: 'Resolve one rub with range metadata and included ayahs.',
  },
  {
    method: 'GET',
    path: '/api/v1/pages/1?edition=en.sahih',
    description: 'Resolve one Mushaf page with ayah range and included ayahs.',
  },
  {
    method: 'GET',
    path: '/api/v1/words?ayah_id=1',
    description: 'Fetch word-by-word tokens, roots, and morphology for one absolute ayah.',
    responseExample: `{
  "success": true,
  "data": [{ "ayah_id": 1, "text": "بِسْمِ", "root": null }],
  "meta": { "count": 4 }
}`,
  },
  {
    method: 'GET',
    path: '/api/v1/duas?page=1&limit=10',
    description: 'List extracted duas with pagination metadata.',
  },
  {
    method: 'GET',
    path: '/api/v1/reciters',
    description: 'List normalized reciter metadata and identifiers.',
  },
  {
    method: 'GET',
    path: '/api/v1/faqs',
    description: 'Return FAQ entries curated in knowledge-base source.',
  },
  {
    method: 'GET',
    path: '/api/v1/knowledge/255',
    description:
      'Return one ayah knowledge entry including themes, context, cross references, and notes.',
  },
  {
    method: 'GET',
    path: '/api/v1/meta',
    description: 'Return dataset provenance, row counts, and knowledge coverage counters.',
    responseExample: `{
  "success": true,
  "data": {
    "dataset": { "counts": { "ayahs": 6236 } },
    "knowledge": { "ayah_entries": 6236 }
  }
}`,
  },
];

const graphqlFields = [
  'surahs(page, limit)',
  'surah(id, edition)',
  'ayah(id, edition, includeWords)',
  'juz(id, edition)',
  'hizb(id, edition)',
  'rub(id, edition)',
  'mushafPage(id, edition)',
  'search(query, edition, language, page, limit)',
  'knowledge(ayahId)',
  'faqs',
  'researchReferences',
  'meta',
];

export default function ApiReferencePageClient() {
  return (
    <DocsLayout>
      <div className="space-y-16">
        <section className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight md:text-5xl"
          >
            API Reference
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            Stable contracts live under `/api/v1/*`, with legacy `/api/*` aliases retained for
            compatibility. The official hosted domain keeps these endpoints private for now, so use
            them from a local or self-hosted deployment.
          </motion.p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Terminal className="h-5 w-5 text-blue-400" />
              REST Envelope
            </h2>
            <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-4 text-xs leading-relaxed text-zinc-400">
              <code>{`{
  "success": true,
  "data": {},
  "meta": {}
}`}</code>
            </pre>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Info className="h-5 w-5 text-amber-400" />
              Headers
            </h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              REST and GraphQL responses include `X-API-Version`, `X-API-Latest-Version`, and cache
              status headers from `X-Cache`.
            </p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Cpu className="h-5 w-5 text-emerald-400" />
              Search Rule
            </h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              `/search` and GraphQL `search` accept `edition` or `language`. Sending both returns a
              validation error.
            </p>
          </article>
        </section>

        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Code className="h-6 w-6 text-indigo-400" />
            GraphQL
          </h2>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
            <div className="mb-6 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-black uppercase text-zinc-400">
                  POST preferred
                </span>
                <code className="text-sm text-zinc-300">/api/v1/graphql</code>
              </div>
              <p className="text-sm leading-relaxed text-zinc-500">
                `POST` is recommended for app traffic. `GET` with `query` and optional `variables`
                query params also works for debugging and cached reads in your own deployment.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                  Query
                </span>
                <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
                  <code>{`query GetAyah($id: Int!) {
  ayah(id: $id, includeWords: true) {
    text
    translation
    words {
      text
      root
    }
    knowledge {
      themes
      historical_context
    }
  }
}`}</code>
                </pre>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                  Root Fields
                </span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {graphqlFields.map((field) => (
                    <code
                      key={field}
                      className="rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3 text-xs text-zinc-300"
                    >
                      {field}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Database className="h-6 w-6 text-blue-400" />
            REST v1 Endpoints
          </h2>
          <div className="grid gap-6">
            {restEndpoints.map((endpoint) => (
              <ApiCard key={endpoint.path} {...endpoint} />
            ))}
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
