import type { Metadata } from 'next';
import FrontendDocsPageClient from './FrontendDocsPageClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran Dev Frontend Implementation Guide',
  description:
    'Review the frontend implementation approach behind Al-Quran Database, including motion, typography, accessibility, and responsive design choices.',
  path: '/docs/frontend',
  keywords: [
    'quran frontend guide',
    'nextjs quran ui',
    'quran developer frontend',
    'quran docs ui',
    'quran app router frontend',
  ],
});

export default function FrontendDocsPage() {
  return <FrontendDocsPageClient />;
}
