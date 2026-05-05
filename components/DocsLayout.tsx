import Link from 'next/link';
import type { ReactNode } from 'react';
import { docsNavItems } from '@/lib/docs-navigation';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070b12] text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-zinc-800/70 bg-zinc-950/80 p-6 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="mb-8 space-y-3">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Quran <span className="text-blue-500">Dev</span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-zinc-400">
              Developer docs for dataset shape, API contracts, search filters, quality gates,
              release flow.
            </p>
          </div>
          <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {docsNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl border border-transparent px-3 py-2 text-sm text-gray-400 transition-colors hover:border-zinc-800 hover:bg-zinc-900 hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="px-6 py-10 md:px-10 lg:px-14">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
