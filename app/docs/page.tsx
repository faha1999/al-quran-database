import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import DocsPageClient from './DocsPageClient';
import { createPageMetadata, createSoftwareApplicationSchema } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran API Docs, SDK Guides & Database References',
  description:
    'Browse the Al-Quran Database documentation hub for REST API references, GraphQL usage, SDK guides, search, and database export workflows.',
  path: '/docs',
  keywords: [
    'quran api docs',
    'quran sdk docs',
    'quran graphql docs',
    'quran database documentation',
    'quran developer documentation',
  ],
});

export default function DocsPage() {
  return (
    <>
      <StructuredData data={createSoftwareApplicationSchema()} />
      <DocsPageClient />
    </>
  );
}
