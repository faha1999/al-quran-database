import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { formatAppReleaseLabel } from '@/lib/app-version';
import { createPageMetadata, createSoftwareApplicationSchema } from '@/lib/seo';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran API, SDK, Search & Database Exports',
  description:
    'Build with a production-ready Quran API, TypeScript SDK, search engine, and downloadable database exports from Al-Quran Database.',
  path: '/',
  keywords: [
    'quran api',
    'quran sdk',
    'quran database exports',
    'quran graphql api',
    'quran search engine',
    'quran developer platform',
  ],
});

export default function Home() {
  const releaseLabel = formatAppReleaseLabel();

  return (
    <>
      <StructuredData data={createSoftwareApplicationSchema()} />
      <HomePageClient releaseLabel={releaseLabel} />
    </>
  );
}
