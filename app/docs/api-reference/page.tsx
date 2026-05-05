'use client';

import DocsLayout from '@/components/DocsLayout';
import ApiCard from '@/components/ApiCard';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Info } from 'lucide-react';

const restEndpoints = [
  {
    method: 'GET',
    path: '/v1/surahs',
    description: 'List all 114 Surahs with support for pagination (page/limit).',
    responseExample: `{
  "success": true,
  "data": [{ "id": 1, "number": 1, "name_ar": "الفاتحة", ... }],
  "meta": { "total": 114 }
}`,
  },
  {
    method: 'GET',
    path: '/v1/ayahs/[id]',
    description:
      'Fetch specific ayah with optional translation, word-by-word breakdown, and knowledge hydration.',
    responseExample: `{
  "success": true,
  "data": { "id": 1, "text": "...", "translation": "..." }
}`,
  },
  {
    method: 'GET',
    path: '/v1/search?q=[query]',
    description: 'High-performance ranked keyword search across Arabic and translations.',
    responseExample: `{
  "success": true,
  "data": [{ "id": 1, "matched_identifiers": ["text", "translation"], ... }]
}`,
  },
  {
    method: 'GET',
    path: '/v1/knowledge/[ayah_id]',
    description: 'Retrieve scholarly metadata including themes, fiqh, and linguistic notes.',
    responseExample: `{
  "success": true,
  "data": { "themes": ["Guidance", "Praise"], ... }
}`,
  },
  {
    method: 'GET',
    path: '/v1/words?ayah_id=[id]',
    description: 'Fetch word-by-word tokens, roots, and morphology for one ayah.',
    responseExample: `{
  "success": true,
  "data": [{ "ayah_id": 1, "text": "بِسْمِ", "root": null, ... }],
  "meta": { "count": 4 }
}`,
  },
  {
    method: 'GET',
    path: '/v1/duas?page=[page]&limit=[limit]',
    description: 'List extracted duas with paginated metadata.',
    responseExample: `{
  "success": true,
  "data": [{ "ayah_id": 255, "text": "..." }],
  "meta": { "total": 17, "page": 1, "limit": 10 }
}`,
  },
  {
    method: 'GET',
    path: '/v1/reciters',
    description: 'List normalized reciter metadata and identifiers.',
    responseExample: `{
  "success": true,
  "data": [{ "identifier": "ar.alafasy", "name": "Mishary Alafasy", ... }],
  "meta": { "total": 24 }
}`,
  },
];

export default function ApiReference() {
  return (
    <DocsLayout>
      <div className="space-y-16">
        {/* Header */}
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
            A high-performance gateway to Quranic data. Choose between our versioned REST API or the
            flexible GraphQL query layer.
          </motion.p>
        </section>

        {/* GraphQL Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Code className="w-6 h-6 text-indigo-400" />
            GraphQL API
          </h2>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
            <div className="mb-6">
              <p className="text-sm text-zinc-500 mb-4">
                The preferred method for complex data requirements. Compose exactly the payload you
                need in a single request.
              </p>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-zinc-800 text-[10px] font-black uppercase text-zinc-400 rounded">
                  POST
                </span>
                <code className="text-sm font-mono text-zinc-300">/api/v1/graphql</code>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                  Query
                </span>
                <pre className="rounded-2xl bg-black/40 p-5 text-xs text-zinc-400 overflow-x-auto border border-zinc-800/50">
                  <code>{`query GetAyah {
  ayah(id: 1, includeWords: true) {
    text
    translation
    knowledge {
      themes
      historical_context
    }
  }
}`}</code>
                </pre>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                  Response
                </span>
                <pre className="rounded-2xl bg-black/40 p-5 text-xs text-zinc-500 overflow-x-auto border border-zinc-800/50">
                  <code>{`{
  "data": {
    "ayah": {
      "text": "بِسْمِ اللَّهِ...",
      "translation": "In the name of Allah...",
      "knowledge": { ... }
    }
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* REST Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Terminal className="w-6 h-6 text-blue-400" />
            REST v1 Endpoints
          </h2>
          <div className="grid gap-6">
            {restEndpoints.map((endpoint) => (
              <ApiCard key={endpoint.path} {...endpoint} />
            ))}
          </div>
        </section>

        {/* Technical Constraints */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              Rate Limiting
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Public access is throttled at **100 requests per minute** per IP by the current
              in-memory proxy layer. No API key system is implemented yet.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-400" />
              Cache Headers
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Watch the `X-Cache` header for performance metrics. Results are served from **Memory
              (L1)**, **Redis (L2)**, or directly from the **Sharded JSON (Disk)**.
            </p>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
