import { buildApiCacheKey, getCacheHeaders, withApiCache } from '@/lib/api-cache';
import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getSurahById, validateEditionFilter } from '@/lib/data-loader';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  let routeId = 'unknown';

  try {
    const { id } = await params;
    routeId = id;
    const surahId = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const cached = await withApiCache(
      buildApiCacheKey('surah', JSON.stringify({ surahId, edition })),
      300,
      () => getSurahById(surahId, edition ?? undefined),
    );
    const surah = cached.value;

    if (!surah) {
      return createErrorResponse({ error: 'Surah not found', status: 404 });
    }

    return createSuccessResponse({
      data: surah,
      headers: getCacheHeaders(cached.cacheStatus),
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      validationPrefixes: ['Unknown edition'],
      logMessage: 'Surah detail API error',
      context: { id: routeId },
    });
  }
}
