import type { Metadata } from 'next';
import ExamplesPageClient from './ExamplesPageClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Live Quran API Examples',
  description:
    'Explore live examples of the Al-Quran Database API in action, including surah listings and real fetch patterns for Next.js apps.',
  path: '/examples',
  keywords: [
    'quran api examples',
    'quran nextjs example',
    'quran rest api demo',
    'quran developer examples',
    'quran api tutorial',
  ],
});

export default function ExamplesPage() {
  return <ExamplesPageClient />;
}
