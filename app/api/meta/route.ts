import { buildApiCacheKey, getCacheHeaders, withApiCache } from '@/lib/api-cache';
import { createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getDatasetMetadata, getKnowledgeCoverage } from '@/lib/data-loader';

export async function GET() {
  try {
    const cached = await withApiCache(buildApiCacheKey('meta', 'dataset'), 900, () => ({
      dataset: getDatasetMetadata(),
      knowledge: getKnowledgeCoverage(),
    }));
    return createSuccessResponse({
      data: cached.value,
      headers: getCacheHeaders(cached.cacheStatus),
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      logMessage: 'Meta API error',
    });
  }
}
