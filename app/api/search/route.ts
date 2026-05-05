import { buildApiCacheKey, getCacheHeaders, withApiCache } from '@/lib/api-cache';
import { parsePositiveInteger } from '@/lib/api-utils';
import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import {
  searchAyahs,
  validateLanguageFilter,
  validateSearchEditionFilter,
} from '@/lib/data-loader';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return createErrorResponse({
      error: 'Query parameter "q" is required',
      status: 400,
    });
  }

  let editionParam: string | null = null;
  let languageParam: string | null = null;

  try {
    editionParam = searchParams.get('edition');
    languageParam = searchParams.get('language');

    if (editionParam && languageParam) {
      return createErrorResponse({
        error: 'Use either "edition" or "language", not both',
        status: 400,
      });
    }

    const edition = validateSearchEditionFilter(editionParam);
    const language = validateLanguageFilter(languageParam);
    const page = parsePositiveInteger(searchParams.get('page'), 'page') ?? 1;
    const limit = parsePositiveInteger(searchParams.get('limit'), 'limit') ?? 50;
    const cacheKey = buildApiCacheKey(
      'search',
      JSON.stringify({ query, edition, language, page, limit }),
    );
    const cached = await withApiCache(cacheKey, 120, () =>
      searchAyahs(query, {
        edition: edition ?? undefined,
        language: language ?? undefined,
        page,
        limit,
      }),
    );
    const { items, meta } = cached.value;

    return createSuccessResponse({
      data: items,
      meta: {
        ...meta,
        edition,
        language,
      },
      headers: getCacheHeaders(cached.cacheStatus),
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Search failed',
      validationPrefixes: [
        'Unknown edition',
        'Unsupported search edition',
        'Unsupported language',
        'Invalid "',
      ],
      logMessage: 'Search API error',
      context: { editionParam, languageParam, query },
    });
  }
}
