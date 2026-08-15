'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Book,
  Code,
  Download,
  GitBranch,
  Layers,
  Package,
  Search,
  Shield,
  Zap,
} from 'lucide-react';
import GlowEffect from '@/components/GlowEffect';
import { npmPackageUrl, repositoryUrl } from '@/lib/site-config';

interface HomePageClientProps {
  releaseLabel: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function HomePageClient({ releaseLabel }: HomePageClientProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <GlowEffect />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-16 lg:gap-24"
        >
          {/* Top Navigation / Header */}
          <motion.header
            variants={itemVariants}
            className="flex flex-col items-center justify-between gap-6 sm:flex-row"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-500/10 p-2 backdrop-blur-xl">
                <Image
                  src="/logo.png"
                  alt="Quran Dev Logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Quran <span className="text-blue-500">Dev</span>
                </h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Platform Hub
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
              <span className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                {releaseLabel}
              </span>
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                GitHub repository
              </a>
            </div>
          </motion.header>

          {/* Hero Section */}
          <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-8 text-center lg:text-left">
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  <Shield className="h-3.5 w-3.5" />
                  Self-Host Ready MVP
                </div>
                <h1 className="text-6xl font-black tracking-tight sm:text-7xl lg:text-7xl xl:text-8xl">
                  Build the <br />
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Future
                  </span>{' '}
                  of <br />
                  Quran Apps.
                </h1>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="mx-auto max-w-xl text-lg leading-relaxed text-zinc-400 lg:mx-0 lg:text-xl"
              >
                Production-grade Quran dataset, TypeScript SDK, and real-time search engine.
                Everything you need to build scholarly Islamic applications at scale.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
              >
                <Link
                  href="/docs"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                >
                  <Book className="h-4 w-4" />
                  Explore Documentation
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
                <a
                  href={npmPackageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-8 py-4 text-sm font-bold text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
                >
                  <Package className="h-4 w-4" />
                  Install SDK
                </a>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="relative hidden lg:block">
              <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 opacity-20 blur-2xl" />
              <div className="relative rounded-[2.5rem] border border-zinc-800 bg-zinc-950/80 p-8 backdrop-blur-2xl">
                <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-6">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/20" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20" />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    dataset_preview.json
                  </p>
                </div>
                <div className="space-y-4 font-mono text-[13px] leading-relaxed text-zinc-400">
                  <p className="text-blue-400">{`{`}</p>
                  <p className="pl-4">
                    <span className="text-zinc-500">{`"surahs":`}</span> 114,
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500">{`"ayahs":`}</span> 6236,
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500">{`"editions":`}</span> 134,
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500">{`"languages":`}</span>{' '}
                    {`["ar", "en", "ur", "fr", "..."],`}
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500">{`"features":`}</span> [
                  </p>
                  <p className="pl-8 text-emerald-400">{`"Search", "Tafsir", "Audio"`}</p>
                  <p className="pl-4">]</p>
                  <p className="text-blue-400">{`}`}</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Feature Bento Grid */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/search" className="block col-span-1 sm:col-span-2">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/20 p-8 transition-colors hover:border-blue-500/20"
              >
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/5 blur-[80px] transition-colors group-hover:bg-blue-600/10" />
                <Search className="mb-6 h-10 w-10 text-blue-500" />
                <h3 className="mb-4 text-2xl font-bold text-white">Semantic Search</h3>
                <p className="mb-8 text-zinc-400">
                  Experience high-performance, ranked search results powered by FlexSearch.
                  Optimized for both Arabic text and translations with zero-latency response.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 transition-colors group-hover:text-blue-300">
                  Try Search Workflow <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.div>
            </Link>

            <Link href="/docs/sdk" className="block">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/20 p-8 transition-colors hover:border-emerald-500/20"
              >
                <Code className="mb-6 h-10 w-10 text-emerald-500" />
                <h3 className="mb-3 text-xl font-bold text-white">Typed SDK</h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  A modern, TypeScript-first SDK with full autocomplete for every endpoint.
                </p>
              </motion.div>
            </Link>

            <Link href="/docs/database" className="block">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/20 p-8 transition-colors hover:border-amber-500/20"
              >
                <Download className="mb-6 h-10 w-10 text-amber-500" />
                <h3 className="mb-3 text-xl font-bold text-white">SQL Exports</h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  Deterministic SQLite and PostgreSQL exports for local data intensive apps.
                </p>
              </motion.div>
            </Link>

            <Link href="/docs/data-expansion" className="block">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/20 p-8 transition-colors hover:border-purple-500/20"
              >
                <Layers className="mb-6 h-10 w-10 text-purple-500" />
                <h3 className="mb-3 text-xl font-bold text-white">134 Editions</h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  Global collection of translations, transliterations, and scholarly tafsir.
                </p>
              </motion.div>
            </Link>

            <Link href="/docs/architecture" className="block">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/20 p-8 transition-colors hover:border-yellow-500/20"
              >
                <Zap className="mb-6 h-10 w-10 text-yellow-500" />
                <h3 className="mb-3 text-xl font-bold text-white">Edge Powered</h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  Optimized for static delivery and low-latency API interactions.
                </p>
              </motion.div>
            </Link>

            <Link href="/docs/architecture" className="block col-span-1 sm:col-span-2">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative h-full overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/20 p-8 transition-colors hover:border-emerald-500/20"
              >
                <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-600/5 blur-[80px] transition-colors group-hover:bg-emerald-600/10" />
                <GitBranch className="mb-6 h-10 w-10 text-emerald-400" />
                <h3 className="mb-4 text-2xl font-bold text-white">Open Source First</h3>
                <p className="mb-8 text-zinc-400">
                  The platform is fully open source. Use the repository to spin up your own
                  instances, extend the dataset, or contribute to the SDK.
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 transition-colors group-hover:text-emerald-300">
                  View Architecture Docs <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.div>
            </Link>
          </section>

          {/* Footer Attribution */}
          <motion.footer
            variants={itemVariants}
            className="flex flex-col items-center justify-between gap-6 border-t border-zinc-900 pt-12 text-center sm:flex-row sm:text-left"
          >
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Quran Developer Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a
                href="https://github.com/faha1999"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Creator Profile
              </a>
              <span className="text-zinc-800">|</span>
              <p className="font-mono text-[10px] uppercase tracking-widest">
                Developed with Purpose
              </p>
            </div>
          </motion.footer>
        </motion.div>
      </div>
    </main>
  );
}
