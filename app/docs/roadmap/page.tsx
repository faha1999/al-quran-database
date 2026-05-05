'use client';

import DocsLayout from '@/components/DocsLayout';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Rocket, Zap, Package, Globe } from 'lucide-react';

const phases = [
  {
    title: 'Phase 1: Intelligence & Search',
    status: 'Completed',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    items: [
      'Ranked Search via FlexSearch',
      'Arabic Text Normalization',
      'Advanced Filtering System',
    ],
  },
  {
    title: 'Phase 2: Developer Ecosystem',
    status: 'Completed',
    icon: <Package className="w-5 h-5 text-blue-400" />,
    items: [
      'JS/TS Developer SDK',
      'PostgreSQL & SQLite Exports',
      'Sharded Data Pipeline',
    ],
  },
  {
    title: 'Phase 3: Production Readiness',
    status: 'Completed',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    items: [
      'GraphQL API Layer',
      'Multi-Level Caching (Redis)',
      'Knowledge Base Integration',
      'Centralized Logging & Proxy',
    ],
  },
  {
    title: 'Phase 4: Advanced Scaling',
    status: 'In Progress',
    icon: <Rocket className="w-5 h-5 text-indigo-400" />,
    items: [
      'Semantic Search (Vector Embeddings)',
      'Interactive API Playground',
      'NPM SDK Package Publishing',
      'Audio Recitation Streaming API',
    ],
  },
];

export default function RoadmapPage() {
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
            Project Roadmap
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            Tracking the evolution of the Quran Developer Platform. From core data engineering to 
            AI-driven semantic exploration.
          </motion.p>
        </section>

        {/* Timeline */}
        <div className="space-y-6">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-10 before:absolute before:left-[19px] before:top-10 before:bottom-0 before:w-[1px] before:bg-zinc-800 last:before:hidden"
            >
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                {phase.status === 'Completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Clock className="w-5 h-5 text-zinc-600" />
                )}
              </div>
              
              <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-sm transition-all hover:bg-zinc-900/40">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                   <div className="flex items-center gap-3">
                      {phase.icon}
                      <h2 className="text-xl font-bold text-zinc-100">{phase.title}</h2>
                   </div>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                     phase.status === 'Completed' 
                     ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                     : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
                   }`}>
                      {phase.status}
                   </span>
                </div>
                
                <ul className="grid gap-3 sm:grid-cols-2">
                   {phase.items.map((item) => (
                     <li key={item} className="flex items-center gap-3 text-sm text-zinc-500">
                        <div className="h-1 w-1 rounded-full bg-zinc-700" />
                        {item}
                     </li>
                   ))}
                </ul>
              </article>
            </motion.div>
          ))}
        </div>

        {/* Future Section */}
        <section className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-950 to-indigo-900/10 p-10">
           <div className="flex items-center gap-4 mb-4">
              <Globe className="w-8 h-8 text-indigo-400" />
              <h2 className="text-2xl font-bold">Future Horizon</h2>
           </div>
           <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
             Beyond Phase 4, we are exploring **Knowledge Graphs** for visual thematic mapping, **Dockerized self-hosting** templates, 
             and **PWA capabilities** for offline-first documentation and API mock servers.
           </p>
        </section>
      </div>
    </DocsLayout>
  );
}
