'use client';

import DocsLayout from '@/components/DocsLayout';
import { motion } from 'framer-motion';
import { Terminal, Shield, Zap, Database, Layers, Code } from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
  {
    title: 'REST API v1',
    body: 'Stable `/api/v1/*` contracts for surahs, ayahs, search, divisions, and metadata.',
    icon: <Terminal className="w-5 h-5 text-blue-400" />,
    href: '/docs/api-reference',
  },
  {
    title: 'GraphQL API',
    body: 'Flexible query layer for multi-entity reads with GET debug support and POST app usage.',
    icon: <Code className="w-5 h-5 text-indigo-400" />,
    href: '/docs/api-reference',
  },
  {
    title: 'SDK Guide',
    body: 'ESM npm package with typed methods for REST, GraphQL, metadata, and research refs.',
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    href: '/docs/sdk',
  },
  {
    title: 'Database Exports',
    body: 'SQLite and PostgreSQL artifacts generated from committed JSON source of truth.',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    href: '/docs/database',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="relative py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
              <Shield className="w-3.5 h-3.5" />
              Developer Platform
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              One Dataset. <br />
              Infinite Possibilities.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
              Sharded JSON source, versioned API contracts, verified npm SDK, and reproducible
              database exports for production apps, docs, and research tooling.
            </p>
          </motion.div>
        </section>

        {/* Quick Links Grid */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <motion.article
                variants={item}
                whileHover={{ y: -4, borderColor: 'rgba(59, 130, 246, 0.4)' }}
                className="group h-full rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-sm transition-colors hover:bg-zinc-800/40"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/50 group-hover:bg-blue-500/10 transition-colors">
                  {link.icon}
                </div>
                <h2 className="mb-3 text-xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">
                  {link.title}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  {link.body}
                </p>
              </motion.article>
            </Link>
          ))}
        </motion.section>

        {/* Code Preview Section */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Terminal className="w-6 h-6 text-blue-500" />
              Quick Start
            </h2>
            <div className="rounded-3xl border border-zinc-800 bg-black/60 p-1 backdrop-blur-xl">
              <div className="flex items-center gap-1.5 border-b border-zinc-800/50 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
                <span className="ml-2 text-[10px] font-medium text-zinc-600 uppercase tracking-widest">
                  bash
                </span>
              </div>
              <pre className="p-6 text-[13px] font-mono leading-relaxed text-zinc-300 overflow-x-auto">
                <code>{`npm install @faha1999/al-quran-database

import { QuranDevSDK } from '@faha1999/al-quran-database';

const quran = new QuranDevSDK({ baseUrl: 'https://al-quran-database.vercel.app' });
const data = await quran.getSurah(1, 'en.sahih');`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Layers className="w-6 h-6 text-indigo-500" />
              GraphQL Power
            </h2>
            <div className="rounded-3xl border border-zinc-800 bg-black/60 p-1 backdrop-blur-xl">
              <div className="flex items-center gap-1.5 border-b border-zinc-800/50 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
                <span className="ml-2 text-[10px] font-medium text-zinc-600 uppercase tracking-widest">
                  graphql
                </span>
              </div>
              <pre className="p-6 text-[13px] font-mono leading-relaxed text-zinc-400 overflow-x-auto">
                <code>{`query GetMetaAndAyah($id: Int!) {
  meta {
    dataset {
      counts {
        ayahs
      }
    }
  }
  ayah(id: $id, includeWords: true) {
    text
    knowledge {
      themes
    }
  }
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-950 to-blue-900/10 p-10 text-center">
          <h2 className="text-xl font-bold text-zinc-100 mb-2">Production Ready.</h2>
          <p className="text-sm text-zinc-500 mb-8">
            Built around `v1` contracts, cache headers, strict TypeScript, and deterministic JSON to
            SQL export pipeline.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs/api-reference"
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-transform hover:scale-105 active:scale-95"
            >
              Read API Docs
            </Link>
            <Link
              href="/docs/sdk"
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-2.5 text-sm font-bold text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              Open SDK Guide
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
