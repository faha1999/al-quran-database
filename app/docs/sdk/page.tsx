import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import SdkPageClient from './SdkPageClient';
import { createPageMetadata, createSoftwareApplicationSchema } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'TypeScript Quran SDK Guide',
  description:
    'Install and use the Al-Quran Database TypeScript SDK against local and self-hosted REST and GraphQL deployments with typed responses and production-ready Quran data workflows.',
  path: '/docs/sdk',
  keywords: [
    'quran typescript sdk',
    'quran npm package',
    'quran javascript sdk',
    'quran api client',
    'al quran database sdk',
  ],
});

export default function SdkPage() {
  return (
    <>
      <StructuredData data={createSoftwareApplicationSchema()} />
      <SdkPageClient />
    </>
  );
}
