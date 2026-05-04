import { NextResponse } from 'next/server';

import { parsePositiveInteger } from '@/lib/api-utils';
import {
  searchAyahs,
  validateLanguageFilter,
  validateSearchEditionFilter,
} from '@/lib/data-loader';
import { logger } from '@/lib/logger';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { success: false, error: 'Query parameter "q" is required' },
      { status: 400 },
    );
  }

  let editionParam: string | null = null;
  let languageParam: string | null = null;

  try {
    editionParam = searchParams.get('edition');
    languageParam = searchParams.get('language');

    if (editionParam && languageParam) {
      return NextResponse.json(
        { success: false, error: 'Use either "edition" or "language", not both' },
        { status: 400 },
      );
    }

    const edition = validateSearchEditionFilter(editionParam);
    const language = validateLanguageFilter(languageParam);
    const page = parsePositiveInteger(searchParams.get('page'), 'page') ?? 1;
    const limit = parsePositiveInteger(searchParams.get('limit'), 'limit') ?? 50;
    const { items, meta } = searchAyahs(query, { edition: edition ?? undefined, language: language ?? undefined, page, limit });

    return NextResponse.json({
      success: true,
      data: items,
      meta: {
        ...meta,
        edition,
        language,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed';
    const status =
      message.startsWith('Unknown edition') ||
      message.startsWith('Unsupported search edition') ||
      message.startsWith('Unsupported language') ||
      message.startsWith('Invalid "')
        ? 400
        : 500;

    if (status === 400) {
      logger.warn(`Search validation error: ${message}`, { query, editionParam, languageParam });
      return NextResponse.json({ success: false, error: message }, { status });
    }

    logger.error('Search API internal error', { error: message, stack: error instanceof Error ? error.stack : undefined, query });
    return NextResponse.json({ success: false, error: 'Search failed' }, { status: 500 });
  }
}
