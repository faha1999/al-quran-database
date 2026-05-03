import Link from 'next/link';
import type { ReactNode } from 'react';

export default function DocsLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { title: 'Getting Started', href: '/docs' },
    { title: 'API Reference', href: '/docs/api-reference' },
    { title: 'Surahs', href: '/docs/surahs' },
    { title: 'Ayahs', href: '/docs/ayahs' },
    { title: 'Juz', href: '/docs/juz' },
    { title: 'Search', href: '/docs/search' },
    { title: 'Database & Exports', href: '/docs/database' },
    { title: 'Data Expansion', href: '/docs/data-expansion' },
    { title: 'FAQ', href: '/docs/faq' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Quran <span className="text-blue-500">Dev</span>
          </Link>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}
