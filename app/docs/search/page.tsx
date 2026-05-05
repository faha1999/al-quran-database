import type { Metadata } from 'next';
import DocsSearchClient from './DocsSearchClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran Search API & FlexSearch Engine',
  description:
    'Learn how the Al-Quran Database search engine works, including ranking, language filters, edition filters, and Arabic normalization.',
  path: '/docs/search',
  keywords: [
    'quran search api',
    'quran flexsearch',
    'arabic quran search',
    'quran search documentation',
    'quran translation search api',
  ],
});

export default function DocsSearch() {
  return <DocsSearchClient />;
}
