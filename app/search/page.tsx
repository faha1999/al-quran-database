import type { Metadata } from 'next';
import SearchPageClient from './SearchPageClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Search Quran Verses, Translations & Knowledge',
  description:
    'Search Quran verses, translations, and scholarly metadata with a fast developer-grade search experience powered by Al-Quran Database.',
  path: '/search',
  keywords: [
    'search quran verses',
    'quran search api',
    'quran translation search',
    'quran verse lookup',
    'quran knowledge search',
  ],
});

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const initialQuery = typeof params.q === 'string' ? params.q : '';
  const initialEdition = typeof params.edition === 'string' ? params.edition : '';
  const initialLanguage = typeof params.language === 'string' ? params.language : '';

  return (
    <SearchPageClient
      initialQuery={initialQuery}
      initialEdition={initialEdition}
      initialLanguage={initialLanguage}
    />
  );
}
