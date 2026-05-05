import { buildApiCacheKey, getCacheHeaders, withApiCache } from '@/lib/api-cache';
import { createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getKnowledgeFaqs } from '@/lib/data-loader';

export async function GET() {
  try {
    const cached = await withApiCache(buildApiCacheKey('faqs', 'all'), 900, getKnowledgeFaqs);
    const faqs = cached.value;
    return createSuccessResponse({
      data: faqs,
      meta: { total: faqs.length },
      headers: getCacheHeaders(cached.cacheStatus),
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      logMessage: 'FAQ API error',
    });
  }
}
