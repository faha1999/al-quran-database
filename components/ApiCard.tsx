'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ApiCardProps {
  method: string;
  path: string;
  description: string;
  responseExample?: string;
}

export default function ApiCard({ method, path, description, responseExample }: ApiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-zinc-900/40 group"
    >
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-lg bg-blue-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-blue-500 border border-blue-500/20">
            {method}
          </span>
          <code className="break-all text-sm font-mono text-zinc-300 transition-colors group-hover:text-white">
            {path}
          </code>
        </div>

        <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
          {description}
        </p>

        {responseExample && (
          <div className="mt-8 space-y-3">
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-400 transition-colors">
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              Example Response
            </button>
            <div className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5">
              <pre className="text-[12px] font-mono leading-relaxed text-zinc-500">
                <code>{responseExample}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
