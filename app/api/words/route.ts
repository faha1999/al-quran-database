import { buildApiCacheKey, getCacheHeaders, withApiCache } from '@/lib/api-cache';
import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getWordsByAyah } from '@/lib/data-loader';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ayahId = Number.parseInt(searchParams.get('ayah_id') || '', 10);

    if (Number.isNaN(ayahId)) {
      return createErrorResponse({ error: 'ayah_id is required', status: 400 });
    }

    const cached = await withApiCache(
      buildApiCacheKey('words', JSON.stringify({ ayahId })),
      300,
      () => getWordsByAyah(ayahId),
    );
    const words = cached.value;

    return createSuccessResponse({
      data: words,
      meta: {
        count: words.length,
      },
      headers: getCacheHeaders(cached.cacheStatus),
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      logMessage: 'Words API error',
    });
  }
}
