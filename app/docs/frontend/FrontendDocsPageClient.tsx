'use client';

import DocsLayout from '@/components/DocsLayout';
import { motion } from 'framer-motion';
import { Palette, MousePointer2, Type, Accessibility, Smartphone, Layers } from 'lucide-react';

const principles = [
  {
    title: 'Visual Excellence',
    body: 'Leveraging glassmorphism, depth through backdrop-blurs, and curated dark-mode palettes.',
    icon: <Palette className="h-5 w-5 text-fuchsia-400" />,
  },
  {
    title: 'Micro-Animations',
    body: 'Using Framer Motion for smooth layout transitions and interactive feedback.',
    icon: <MousePointer2 className="h-5 w-5 text-blue-400" />,
  },
  {
    title: 'Typography',
    body: 'Inter font family paired with high-contrast mono fonts for technical clarity.',
    icon: <Type className="h-5 w-5 text-emerald-400" />,
  },
  {
    title: 'Accessibility',
    body: 'Semantic structure and visible focus states are shipped; a dedicated full accessibility audit is still pending.',
    icon: <Accessibility className="h-5 w-5 text-amber-400" />,
  },
  {
    title: 'Responsive Design',
    body: 'Responsive layouts are implemented across landing, docs, and search pages; a formal mobile audit is still pending.',
    icon: <Smartphone className="h-5 w-5 text-indigo-400" />,
  },
  {
    title: 'Modern Architecture',
    body: 'Next.js 16 App Router with React 19 Server Components for maximum speed.',
    icon: <Layers className="h-5 w-5 text-rose-400" />,
  },
];

export default function FrontendDocsPageClient() {
  return (
    <DocsLayout>
      <div className="space-y-16">
        <section className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight md:text-5xl"
          >
            Frontend Guide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            Documentation of our design philosophy, UI components, and the modern tech stack
            powering the platform.
          </motion.p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-sm transition-all hover:bg-zinc-800/40"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 transition-colors group-hover:bg-blue-500/10">
                {principle.icon}
              </div>
              <h2 className="mb-3 text-lg font-bold text-zinc-100">{principle.title}</h2>
              <p className="text-sm leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-400">
                {principle.body}
              </p>
            </motion.article>
          ))}
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-10 text-center backdrop-blur-xl">
          <h2 className="mb-6 text-2xl font-bold text-zinc-100">Modern Stack</h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale transition-all hover:grayscale-0">
            <span className="text-xl font-black tracking-tighter text-white">Next.js 16</span>
            <span className="text-xl font-black tracking-tighter text-blue-400">Tailwind v4</span>
            <span className="text-xl font-black tracking-tighter text-indigo-400">
              Framer Motion
            </span>
            <span className="text-xl font-black tracking-tighter text-emerald-400">React 19</span>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
