import { buildApiCacheKey, getCacheHeaders, withApiCache } from '@/lib/api-cache';
import { createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getReciters } from '@/lib/data-loader';

export async function GET() {
  try {
    const cached = await withApiCache(buildApiCacheKey('reciters', 'all'), 900, getReciters);
    const reciters = cached.value;
    return createSuccessResponse({
      data: reciters,
      meta: {
        total: reciters.length,
      },
      headers: getCacheHeaders(cached.cacheStatus),
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      logMessage: 'Reciters API error',
    });
  }
}
