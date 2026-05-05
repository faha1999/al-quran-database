import type { Metadata } from 'next';
import ArchitecturePageClient from './ArchitecturePageClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran API Architecture & Data Pipeline',
  description:
    'Understand the Al-Quran Database architecture, including data ingestion, TypeScript domain logic, REST and GraphQL transport, and caching strategy.',
  path: '/docs/architecture',
  keywords: [
    'quran api architecture',
    'quran data pipeline',
    'quran graphql architecture',
    'quran cache strategy',
    'quran developer platform architecture',
  ],
});

export default function ArchitecturePage() {
  return <ArchitecturePageClient />;
}
