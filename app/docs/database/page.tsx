import { statSync } from 'node:fs';
import path from 'node:path';
import DocsLayout from '@/components/DocsLayout';
import { getDatasetMetadata, getKnowledgeCoverage } from '@/lib/data-loader';
import {
  Database,
  Download,
  Layers3,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Zap,
} from 'lucide-react';

function getPublicFileSize(fileName: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', fileName);
    return `${(statSync(filePath).size / (1024 * 1024)).toFixed(1)} MB`;
  } catch {
    return 'Build first';
  }
}

export default function DatabaseDocsPage() {
  const metadata = getDatasetMetadata();
  const knowledge = getKnowledgeCoverage();

  const exportCards = [
    {
      title: 'SQLite Export',
      href: '/quran_indexed.sqlite',
      description: 'Portable file for local apps, edge reads, test fixtures, and offline bundles.',
      badge: getPublicFileSize('quran_indexed.sqlite'),
    },
    {
      title: 'PostgreSQL Export',
      href: '/quran_postgres.sql',
      description:
        'Transactional schema + data dump with foreign keys, indexes, and normalized enrichment tables.',
      badge: getPublicFileSize('quran_postgres.sql'),
    },
  ];

  const schemaAreas = [
    'Core canon: surahs, ayahs, words, editions',
    'Reading divisions: juzs, hizbs, rubs, pages + normalized join tables',
    'Context: duas, asbab al-nuzul, hadith references, surah profiles',
    'Knowledge layer: themes, cross references, scientific notes, fiqh notes, linguistic notes, misinterpretations, FAQs, research refs',
  ];

  return (
    <DocsLayout>
      <div className="space-y-10 pb-16">
        <section className="rounded-[2rem] border border-cyan-500/15 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(180deg,rgba(9,17,28,0.96),rgba(7,11,18,0.98))] p-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            <Database className="h-3.5 w-3.5" />
            Canonical Data Layer
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            JSON-first dataset. SQL local. Exports reproducible.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
            Repo source-of-truth is sharded JSON under `lib/data`. Local `quran.sql` stays out of
            Git, conversion is deterministic, verification compares counts plus file hashes, and SQL
            exports are regenerated from committed JSON.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-white/8 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Source SHA-256</p>
              <p className="mt-3 break-all text-sm text-zinc-200">{metadata.source.sha256}</p>
            </article>
            <article className="rounded-3xl border border-white/8 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">SQL Size</p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {(metadata.source.size_bytes / (1024 * 1024)).toFixed(1)} MB
              </p>
            </article>
            <article className="rounded-3xl border border-white/8 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Coverage Layer</p>
              <p className="mt-3 text-3xl font-semibold text-white">{knowledge.ayah_entries}</p>
              <p className="mt-1 text-sm text-zinc-400">Curated ayah knowledge entries</p>
            </article>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {exportCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/70 p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-100">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{card.description}</p>
                </div>
                <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                  {card.badge}
                </span>
              </div>
              <a
                href={card.href}
                download
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/70 p-6">
            <div className="mb-5 flex items-center gap-3">
              <TableProperties className="h-5 w-5 text-cyan-300" />
              <h2 className="text-2xl font-semibold">Normalized Schema</h2>
            </div>
            <div className="space-y-3 text-sm text-zinc-300">
              {schemaAreas.map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3"
                >
                  {item}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/70 p-6">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <h2 className="text-2xl font-semibold">Ops Commands</h2>
            </div>
            <div className="space-y-3 text-sm text-zinc-300">
              <code className="block rounded-2xl border border-zinc-800 bg-black/40 p-4 text-cyan-200">
                npm run data:convert
              </code>
              <code className="block rounded-2xl border border-zinc-800 bg-black/40 p-4 text-cyan-200">
                npm run data:verify -- --check-determinism
              </code>
              <code className="block rounded-2xl border border-zinc-800 bg-black/40 p-4 text-cyan-200">
                npm run data:export
              </code>
              <code className="block rounded-2xl border border-zinc-800 bg-black/40 p-4 text-cyan-200">
                npm run data:migrate
              </code>
            </div>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="mb-4 flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-fuchsia-300" />
              <h3 className="text-lg font-semibold">Integrity</h3>
            </div>
            <p className="text-sm leading-6 text-zinc-400">
              Metadata records source hash, source size, generated timestamp, and canonical counts
              for surahs, ayahs, editions, juzs, hizbs, rubs, and pages.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="mb-4 flex items-center gap-3">
              <Zap className="h-5 w-5 text-amber-300" />
              <h3 className="text-lg font-semibold">Performance</h3>
            </div>
            <p className="text-sm leading-6 text-zinc-400">
              SQLite export ships with lookup indexes across ayah divisions, roots, themes, and
              knowledge tables. Benchmarks live in `scripts/performance_metrics.py`.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-5">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-sky-300" />
              <h3 className="text-lg font-semibold">Scaling</h3>
            </div>
            <p className="text-sm leading-6 text-zinc-400">
              JSON powers static and edge reads. SQLite handles embedded/offline workloads.
              PostgreSQL export supports replicas, poolers, and warehouse-style joins.
            </p>
          </article>
        </section>
      </div>
    </DocsLayout>
  );
}
