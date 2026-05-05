'use client';

import DocsLayout from '@/components/DocsLayout';
import { motion } from 'framer-motion';
import { Palette, MousePointer2, Type, Accessibility, Smartphone, Layers } from 'lucide-react';

const principles = [
  {
    title: 'Visual Excellence',
    body: 'Leveraging glassmorphism, depth through backdrop-blurs, and curated dark-mode palettes.',
    icon: <Palette className="w-5 h-5 text-fuchsia-400" />,
  },
  {
    title: 'Micro-Animations',
    body: 'Using Framer Motion for smooth layout transitions and interactive feedback.',
    icon: <MousePointer2 className="w-5 h-5 text-blue-400" />,
  },
  {
    title: 'Typography',
    body: 'Inter font family paired with high-contrast mono fonts for technical clarity.',
    icon: <Type className="w-5 h-5 text-emerald-400" />,
  },
  {
    title: 'Accessibility',
    body: 'ARIA-compliant, keyboard-navigable, and high-contrast visuals for all users.',
    icon: <Accessibility className="w-5 h-5 text-amber-400" />,
  },
  {
    title: 'Responsive Design',
    body: 'Fluid grid systems ensuring a premium experience from mobile to 4K displays.',
    icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
  },
  {
    title: 'Modern Architecture',
    body: 'Next.js 16 App Router with React 19 Server Components for maximum speed.',
    icon: <Layers className="w-5 h-5 text-rose-400" />,
  },
];

export default function FrontendDocsPage() {
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
            Frontend Guide
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            Documentation of our design philosophy, UI components, and the modern tech stack powering the platform.
          </motion.p>
        </section>

        {/* Principles Grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, index) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-sm transition-all hover:bg-zinc-800/40"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 group-hover:bg-blue-500/10 transition-colors">
                {p.icon}
              </div>
              <h2 className="mb-3 text-lg font-bold text-zinc-100">{p.title}</h2>
              <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {p.body}
              </p>
            </motion.article>
          ))}
        </section>

        {/* Tech Stack Preview */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-10 backdrop-blur-xl text-center">
           <h2 className="text-2xl font-bold mb-6 text-zinc-100">Modern Stack</h2>
           <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
              <span className="text-xl font-black tracking-tighter text-white">Next.js 16</span>
              <span className="text-xl font-black tracking-tighter text-blue-400">Tailwind v4</span>
              <span className="text-xl font-black tracking-tighter text-indigo-400">Framer Motion</span>
              <span className="text-xl font-black tracking-tighter text-emerald-400">React 19</span>
           </div>
        </section>
      </div>
    </DocsLayout>
  );
}
