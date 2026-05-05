'use client';

import { motion } from 'framer-motion';
import {
  Database,
  Download,
  Layers3,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Zap,
} from 'lucide-react';
import type { DatasetMetadata, KnowledgeCoverage } from '@/lib/quran-types';

interface ExportCard {
  title: string;
  href: string;
  description: string;
  badge: string;
}

interface ClientProps {
  metadata: DatasetMetadata;
  knowledge: KnowledgeCoverage;
  exportCards: ExportCard[];
  schemaAreas: string[];
}

export default function DatabaseDocsClient({
  metadata,
  knowledge,
  exportCards,
  schemaAreas,
}: ClientProps) {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-blue-500/10 bg-zinc-950/40 p-6 md:p-10 backdrop-blur-xl"
      >
        <div className="absolute -top-24 -left-24 h-48 w-48 bg-blue-600/10 blur-[100px] rounded-full" />

        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-300">
            <Database className="h-3.5 w-3.5" />
            Canonical Data Layer
          </div>
          <h1 className="max-w-3xl text-3xl font-black tracking-tight text-white md:text-5xl">
            JSON-first dataset. <br className="hidden md:block" />
            SQL local. Exports reproducible.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
            The source of truth resides in sharded JSON. Conversion is deterministic, verification
            is hash-backed, and relational exports are regenerated from committed dataset artifacts.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Source SHA-256
              </p>
              <p className="mt-3 break-all text-xs font-mono text-zinc-400 leading-relaxed">
                {metadata.source.sha256}
              </p>
            </article>
            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                SQL Size
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                {(metadata.source.size_bytes / (1024 * 1024)).toFixed(1)}{' '}
                <span className="text-sm font-normal text-zinc-500 uppercase">MB</span>
              </p>
            </article>
            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Knowledge Layer
              </p>
              <p className="mt-3 text-3xl font-black text-white">{knowledge.ayah_entries}</p>
              <p className="mt-1 text-xs text-zinc-500">Curated entries</p>
            </article>
          </div>
        </div>
      </motion.section>

      {/* Download Section */}
      <section className="grid gap-6 md:grid-cols-2">
        {exportCards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col justify-between rounded-2xl md:rounded-[2rem] border border-zinc-800 bg-zinc-900/20 p-6 md:p-8 backdrop-blur-sm transition-all hover:bg-zinc-800/40"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h2>
                <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-[10px] font-bold text-zinc-400">
                  {card.badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {card.description}
              </p>
            </div>
            <a
              href={card.href}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all hover:bg-blue-500 active:scale-[0.98]"
            >
              <Download className="h-4 w-4" />
              Download Export
            </a>
          </motion.article>
        ))}
      </section>

      {/* Schema & Ops Section */}
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <TableProperties className="h-6 w-6 text-indigo-400" />
            Normalized Schema
          </h2>
          <div className="grid gap-3">
            {schemaAreas.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/10 px-5 py-4 text-sm text-zinc-400 hover:border-zinc-700 transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-500" />
            Data Pipeline Ops
          </h2>
          <div className="space-y-3 font-mono text-[13px]">
            {[
              'npm run data:convert',
              'npm run data:verify -- --check-determinism',
              'npm run data:export',
              'npm run data:migrate',
              'npm run data:seed',
              'npm run data:bench',
            ].map((cmd) => (
              <code
                key={cmd}
                className="block rounded-2xl border border-zinc-800 bg-black/40 p-5 text-blue-400/80 shadow-inner"
              >
                {cmd}
              </code>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8">
          <h2 className="mb-3 text-lg font-bold text-zinc-100">Build Artifacts</h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            Download links point at `/quran_indexed.sqlite` and `/quran_postgres.sql` from public
            build output.
          </p>
        </article>
        <article className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8">
          <h2 className="mb-3 text-lg font-bold text-zinc-100">Versioned Runtime</h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            App traffic reads versioned API contracts under `/api/v1/*`. Database exports track same
            committed JSON source used by docs and SDK.
          </p>
        </article>
        <article className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8">
          <h2 className="mb-3 text-lg font-bold text-zinc-100">Deployment Note</h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            Docker is intentionally out of scope in current pass. Self-host docs should assume
            standard Next.js deployment plus optional Redis cache.
          </p>
        </article>
      </section>

      {/* Technical Features */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: <Layers3 className="text-fuchsia-400" />,
            title: 'Integrity',
            body: 'Deterministic pipeline ensures perfect parity between SQL and JSON distributions.',
          },
          {
            icon: <Zap className="text-amber-400" />,
            title: 'Performance',
            titleColor: 'text-amber-400',
            body: 'Pre-indexed SQLite exports optimized for zero-latency lookups.',
          },
          {
            icon: <Sparkles className="text-sky-400" />,
            title: 'Scalability',
            body: 'Flexible architecture supporting everything from edge read-only to full RDBMS workloads.',
          },
        ].map((feature) => (
          <article
            key={feature.title}
            className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-8 text-center transition-all hover:bg-zinc-800/20"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-bold text-zinc-200 mb-2">{feature.title}</h3>
            <p className="text-xs leading-relaxed text-zinc-500">{feature.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
