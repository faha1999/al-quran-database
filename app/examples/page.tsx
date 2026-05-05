import type { Metadata } from 'next';
import ExamplesPageClient from './ExamplesPageClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran API Examples for Local and Self-Hosted Use',
  description:
    'Explore local-first and self-hosted Al-Quran Database API examples, including surah listings and fetch patterns for Next.js apps.',
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
