import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import ApiReferencePageClient from './ApiReferencePageClient';
import { createPageMetadata, createWebApiSchema } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran REST API & GraphQL API Reference',
  description:
    'Review the full Al-Quran Database REST and GraphQL API reference, including endpoints, parameters, response envelopes, and search rules.',
  path: '/docs/api-reference',
  keywords: [
    'quran rest api',
    'quran graphql api',
    'quran api reference',
    'quran developer api',
    'quran endpoint documentation',
  ],
});

export default function ApiReferencePage() {
  return (
    <>
      <StructuredData data={createWebApiSchema()} />
      <ApiReferencePageClient />
    </>
  );
}
