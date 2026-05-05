import { buildApiCacheKey, getCacheHeaders, withApiCache } from '@/lib/api-cache';
import { parsePositiveInteger } from '@/lib/api-utils';
import { createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getDuas } from '@/lib/data-loader';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parsePositiveInteger(searchParams.get('page'), 'page') ?? 1;
    const limit = parsePositiveInteger(searchParams.get('limit'), 'limit') ?? 50;

    const cached = await withApiCache(
      buildApiCacheKey('duas', JSON.stringify({ page, limit })),
      300,
      () => getDuas(page, limit),
    );
    const result = cached.value;
    return createSuccessResponse({
      data: result.items,
      meta: result.meta,
      headers: getCacheHeaders(cached.cacheStatus),
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      validationPrefixes: ['Invalid "'],
      logMessage: 'Duas API error',
    });
  }
}
