import { getAllSurahs } from '@/lib/data-loader';
import { parsePositiveInteger } from '@/lib/api-utils';
import { createSuccessResponse, handleRouteError } from '@/lib/api-response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = parsePositiveInteger(searchParams.get('page'), 'page');
    const limitParam = parsePositiveInteger(searchParams.get('limit'), 'limit');
    const usePagination = pageParam !== null || limitParam !== null;
    const page = pageParam ?? 1;
    const limit = limitParam ?? 20;
    const { items, meta } = usePagination ? getAllSurahs(page, limit) : getAllSurahs();

    return createSuccessResponse({
      data: items,
      meta,
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Failed to fetch surahs',
      validationPrefixes: ['Invalid "'],
      logMessage: 'Surahs API error',
    });
  }
}
