'use client';

import DocsLayout from '@/components/DocsLayout';
import { motion } from 'framer-motion';
import { Database, Server, Globe, Shield, Cpu, RefreshCw } from 'lucide-react';

const layers = [
  {
    title: 'Data Ingestion (Python)',
    body: 'Deterministic pipeline converting canonical JSON sources into sharded distributions and relational SQL exports (PostgreSQL/SQLite).',
    icon: <Database className="h-5 w-5 text-emerald-400" />,
  },
  {
    title: 'Domain Logic (TypeScript)',
    body: '`lib/data-loader/*` provides high-performance access to Quranic entities with built-in L1 in-memory caching.',
    icon: <Cpu className="h-5 w-5 text-blue-400" />,
  },
  {
    title: 'Transport (REST & GraphQL)',
    body: 'Stable v1 REST surface and a typed GraphQL query layer with multi-level caching (L1 In-Memory, L2 Redis).',
    icon: <Globe className="h-5 w-5 text-indigo-400" />,
  },
  {
    title: 'Presentation (Next.js 16)',
    body: 'App Router architecture with React 19. Leveraging Server Components for speed and Framer Motion for interactivity.',
    icon: <Server className="h-5 w-5 text-amber-400" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export default function ArchitecturePageClient() {
  return (
    <DocsLayout>
      <div className="space-y-12">
        <section className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight md:text-5xl"
          >
            Architecture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            Engineered for precision and scale. The platform utilizes a layered architecture that
            strictly separates source data, business logic, and transport mechanisms.
          </motion.p>
        </section>

        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2"
        >
          {layers.map((layer) => (
            <motion.article
              key={layer.title}
              variants={item}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-sm transition-all hover:bg-zinc-800/40"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 transition-colors group-hover:bg-blue-500/10">
                {layer.icon}
              </div>
              <h2 className="mb-3 text-lg font-bold text-zinc-100">{layer.title}</h2>
              <p className="text-sm leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-400">
                {layer.body}
              </p>
            </motion.article>
          ))}
        </motion.section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
              <RefreshCw className="h-4 w-4 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold">Caching Strategy</h2>
          </div>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-4">
                <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-blue-500">
                  Level 1
                </span>
                <h3 className="mb-1 font-bold text-zinc-200">In-Memory</h3>
                <p className="text-xs text-zinc-500">
                  Ultra-low latency cache local to each server instance.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-4">
                <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-indigo-500">
                  Level 2
                </span>
                <h3 className="mb-1 font-bold text-zinc-200">Redis</h3>
                <p className="text-xs text-zinc-500">
                  Distributed cache for shared state across horizontally scaled pods.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-4">
                <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  Monitoring
                </span>
                <h3 className="mb-1 font-bold text-zinc-200">X-Cache</h3>
                <p className="text-xs text-zinc-500">
                  Full observability via custom headers (hit-memory, hit-redis, miss).
                </p>
              </div>
            </div>

            <pre className="overflow-x-auto rounded-2xl bg-black/40 p-6 font-mono text-[13px] leading-relaxed text-zinc-400">
              <code>{`request -> edge validation -> L1 cache -> L2 cache (Redis) -> data loader -> response`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Shield className="h-6 w-6 text-emerald-500" />
            Quality Gates
          </h2>
          <div className="grid gap-3 text-sm text-zinc-400">
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/10 p-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-500">
                01
              </span>
              <span>Deterministic hashing of all generated JSON and SQL artifacts.</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/10 p-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-500">
                02
              </span>
              <span>Strict TypeScript compilation and Vitest coverage for core domain logic.</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/10 p-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-500">
                03
              </span>
              <span>Playwright E2E smoke tests for API contracts and search UX.</span>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
