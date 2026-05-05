import { buildApiCacheKey, getCacheHeaders, withApiCache } from '@/lib/api-cache';
import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getHizbById, validateEditionFilter } from '@/lib/data-loader';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  let routeId = 'unknown';

  try {
    const { id } = await params;
    routeId = id;
    const hizbId = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const cached = await withApiCache(
      buildApiCacheKey('hizb', JSON.stringify({ hizbId, edition })),
      300,
      () => getHizbById(hizbId, edition ?? undefined),
    );
    const hizb = cached.value;

    if (!hizb) {
      return createErrorResponse({ error: 'Hizb not found', status: 404 });
    }

    return createSuccessResponse({
      data: hizb,
      meta: {
        ayah_count: hizb.ayah_count,
      },
      headers: getCacheHeaders(cached.cacheStatus),
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      validationPrefixes: ['Unknown edition'],
      logMessage: 'Hizb API error',
      context: { id: routeId },
    });
  }
}
