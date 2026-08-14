import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import SdkPageClient from './SdkPageClient';
import { createPageMetadata, createSoftwareApplicationSchema } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'TypeScript Quran SDK — Works Offline, No Server Required',
  description:
    'Install @faha1999/al-quran-database and call getSurah(), getAyah(), searchAyahs() with zero config — data bundled in the package. Also includes REST & GraphQL SDK for self-hosted deployments with all 134 editions.',
  path: '/docs/sdk',
  keywords: [
    'quran typescript sdk',
    'quran npm package offline',
    'quran javascript offline',
    'quran api no server',
    'quran bundled data npm',
    'al quran database sdk',
    'quran getSurah',
    'quran zero setup',
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
