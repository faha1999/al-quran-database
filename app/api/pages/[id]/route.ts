import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getPageById, validateEditionFilter } from '@/lib/data-loader';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  let routeId = 'unknown';

  try {
    const { id } = await params;
    routeId = id;
    const pageId = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const page = getPageById(pageId, edition ?? undefined);

    if (!page) {
      return createErrorResponse({ error: 'Page not found', status: 404 });
    }

    return createSuccessResponse({
      data: page,
      meta: {
        ayah_count: page.ayah_count,
      },
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      validationPrefixes: ['Unknown edition'],
      logMessage: 'Page API error',
      context: { id: routeId },
    });
  }
}
