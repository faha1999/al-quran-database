import { parsePositiveInteger } from '@/lib/api-utils';
import { createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getDuas } from '@/lib/data-loader';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parsePositiveInteger(searchParams.get('page'), 'page') ?? 1;
    const limit = parsePositiveInteger(searchParams.get('limit'), 'limit') ?? 50;

    const result = getDuas(page, limit);
    return createSuccessResponse({
      data: result.items,
      meta: result.meta,
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
