import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import DocsPageClient from './DocsPageClient';
import { createPageMetadata, createSoftwareApplicationSchema } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran API Docs, SDK Guides & Offline Dataset',
  description:
    'Browse the Al-Quran Database documentation hub — install the npm package and use getSurah(), getAyah() offline with no server. Also covers REST API, GraphQL, SDK guide, and database export workflows.',
  path: '/docs',
  keywords: [
    'quran api docs',
    'quran sdk docs offline',
    'quran npm package no server',
    'quran graphql docs',
    'quran database documentation',
    'quran developer documentation',
    'quran getSurah typescript',
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
