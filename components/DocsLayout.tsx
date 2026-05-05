'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { docsNavItems } from '@/lib/docs-navigation';
import { clsx } from 'clsx';

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 selection:bg-blue-500/30">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="border-b border-zinc-800/50 bg-zinc-950/40 p-6 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r lg:bg-zinc-950/20">
          <div className="mb-10 space-y-4">
            <Link
              href="/"
              className="group flex items-center gap-2 text-2xl font-bold tracking-tight"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-black text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110">
                Q
              </div>
              <span>
                Quran <span className="text-blue-500">Dev</span>
              </span>
            </Link>
            <p className="max-w-xs text-[13px] leading-relaxed text-zinc-500">
              High-performance Quranic data platform with typed contracts, search, and scholarly
              metadata.
            </p>
          </div>

          <nav className="space-y-1">
            <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
              Documentation
            </div>
            {docsNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'group relative flex items-center rounded-xl px-3 py-2 text-sm transition-all duration-200',
                    isActive
                      ? 'bg-blue-600/10 text-white font-medium'
                      : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl border border-blue-500/20 bg-blue-500/5 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]"
                    />
                  )}
                  <span className="relative z-10">{item.title}</span>
                  {isActive && (
                    <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="relative px-6 py-12 md:px-12 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mx-auto max-w-4xl"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
