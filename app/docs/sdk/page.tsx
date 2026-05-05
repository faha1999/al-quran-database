'use client';

import DocsLayout from '@/components/DocsLayout';
import { motion } from 'framer-motion';
import { Package, Terminal, Shield, Zap, Code } from 'lucide-react';

export default function SdkPage() {
  return (
    <DocsLayout>
      <div className="space-y-12">
        {/* Header */}
        <section className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight md:text-5xl"
          >
            SDK Guide
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            A lightweight, type-safe TypeScript SDK for seamless integration with the Quran Developer Platform.
          </motion.p>
        </section>

        {/* Installation */}
        <section className="space-y-6">
           <h2 className="text-2xl font-bold flex items-center gap-3">
             <Terminal className="w-6 h-6 text-blue-500" />
             Installation
           </h2>
           <div className="rounded-3xl border border-zinc-800 bg-black/60 p-6 backdrop-blur-xl font-mono text-sm text-zinc-300">
              <code>npm install @quran-dev/sdk</code>
           </div>
        </section>

        {/* Initialization */}
        <section className="space-y-6">
           <h2 className="text-2xl font-bold flex items-center gap-3">
             <Zap className="w-6 h-6 text-amber-500" />
             Initialization
           </h2>
           <div className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
              <pre className="text-xs text-zinc-400 overflow-x-auto leading-relaxed">
                <code>{`import { QuranDevSDK } from '@quran-dev/sdk';

const quran = new QuranDevSDK({
  baseUrl: 'https://api.qurandatabase.org', // Optional
  apiVersion: 'v1'
});`}</code>
              </pre>
           </div>
        </section>

        {/* Usage Examples */}
        <section className="space-y-6">
           <h2 className="text-2xl font-bold flex items-center gap-3">
             <Code className="w-6 h-6 text-indigo-400" />
             Usage Examples
           </h2>
           
           <div className="grid gap-6">
              <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-sm">
                 <h3 className="text-lg font-bold text-zinc-200 mb-4">Fetch Surah with Translations</h3>
                 <pre className="text-xs text-zinc-500 overflow-x-auto bg-black/40 p-5 rounded-2xl border border-zinc-800/50">
                   <code>{`// Get Surah 1 with English (Sahih International) translation
const surah = await quran.getSurah(1, 'en.sahih');
console.log(surah.name_ar); // الفاتحة`}</code>
                 </pre>
              </article>

              <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-sm">
                 <h3 className="text-lg font-bold text-zinc-200 mb-4">Perform Ranked Search</h3>
                 <pre className="text-xs text-zinc-500 overflow-x-auto bg-black/40 p-5 rounded-2xl border border-zinc-800/50">
                   <code>{`const { data: results, meta } = await quran.search('mercy', {
  language: 'en',
  limit: 5
});`}</code>
                 </pre>
              </article>
           </div>
        </section>

        {/* Features Note */}
        <section className="grid gap-6 md:grid-cols-3">
           <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/10">
              <Shield className="w-5 h-5 text-emerald-400 mb-3" />
              <h4 className="font-bold text-zinc-200 mb-1">Type-Safe</h4>
              <p className="text-xs text-zinc-500">Full TypeScript support for all API entities and response shapes.</p>
           </div>
           <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/10">
              <Package className="w-5 h-5 text-blue-400 mb-3" />
              <h4 className="font-bold text-zinc-200 mb-1">Tree-Shakeable</h4>
              <p className="text-xs text-zinc-500">Optimized for minimal bundle size in modern web applications.</p>
           </div>
           <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/10">
              <Zap className="w-5 h-5 text-amber-400 mb-3" />
              <h4 className="font-bold text-zinc-200 mb-1">Caching</h4>
              <p className="text-xs text-zinc-500">Automatic L1 caching for frequently accessed static metadata.</p>
           </div>
        </section>
      </div>
    </DocsLayout>
  );
}
