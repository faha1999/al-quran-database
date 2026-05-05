import type { Metadata } from 'next';
import DocsSurahsClient from './DocsSurahsClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Surahs API Documentation',
  description:
    'Learn how to list surahs and fetch individual surah payloads from the Al-Quran Database API with pagination and edition support.',
  path: '/docs/surahs',
  keywords: [
    'surahs api',
    'quran surah api',
    'list surahs api',
    'quran chapter api',
    'quran surah documentation',
  ],
});

export default function DocsSurahs() {
  return <DocsSurahsClient />;
}
