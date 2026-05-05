'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, Menu, Package, X } from 'lucide-react';
import { docsNavItems } from '@/lib/docs-navigation';
import { clsx } from 'clsx';
import { useState } from 'react';
import { createBreadcrumbSchema, serializeJsonLd } from '@/lib/seo';
import { npmPackageUrl, repositoryUrl } from '@/lib/site-config';

export default function DocsLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const activeItem = docsNavItems.find((item) => item.href === pathname);
  const breadcrumbItems =
    pathname === '/docs'
      ? [
          { name: 'Home', path: '/' },
          { name: 'Docs', path: '/docs' },
        ]
      : pathname.startsWith('/docs') && activeItem
        ? [
            { name: 'Home', path: '/' },
            { name: 'Docs', path: '/docs' },
            { name: activeItem.title, path: activeItem.href },
          ]
        : [];
  const breadcrumbJson =
    breadcrumbItems.length > 0 ? serializeJsonLd(createBreadcrumbSchema(breadcrumbItems)) : null;

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 selection:bg-blue-500/30">
      {breadcrumbJson ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      ) : null}
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-800/50 bg-zinc-950/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="h-8 w-8" />
            <span className="text-lg font-bold">
              Quran <span className="text-blue-500">Dev</span>
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={clsx(
            'fixed inset-y-0 left-0 z-40 w-[18rem] transform border-r border-zinc-800/50 bg-zinc-950 p-5 backdrop-blur-xl transition-transform duration-300 ease-in-out sm:p-6 lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:translate-x-0 lg:overflow-y-auto lg:border-b-0 lg:bg-zinc-950/20',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="mb-10 space-y-4">
            <Link
              href="/"
              className="group flex items-center gap-2 text-2xl font-bold tracking-tight"
            >
              <div className="flex h-16 w-16 items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <Image
                  src="/logo.png"
                  alt="Quran Dev Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                  priority
                />
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
                  onClick={() => setIsSidebarOpen(false)}
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

          <div className="mt-8 grid gap-3">
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900/70 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-zinc-500" />
                Repository
              </span>
              <ExternalLink className="h-4 w-4 text-zinc-600" />
            </a>
            <a
              href={npmPackageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900/70 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4 text-zinc-500" />
                npm Package
              </span>
              <ExternalLink className="h-4 w-4 text-zinc-600" />
            </a>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <main className="relative px-4 py-8 sm:px-6 md:px-10 md:py-10 lg:px-16 lg:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mx-auto max-w-4xl"
            >
              <div className="mb-8 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100 sm:p-5">
                Hosted API access is disabled on `al-quran-database.vercel.app` for now. Use the
                repository locally or self-host this project to run the API endpoints documented
                here.
              </div>
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
