import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getRubById, validateEditionFilter } from '@/lib/data-loader';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  let routeId = 'unknown';

  try {
    const { id } = await params;
    routeId = id;
    const rubId = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const rub = getRubById(rubId, edition ?? undefined);

    if (!rub) {
      return createErrorResponse({ error: 'Rub not found', status: 404 });
    }

    return createSuccessResponse({
      data: rub,
      meta: {
        ayah_count: rub.ayah_count,
      },
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      validationPrefixes: ['Unknown edition'],
      logMessage: 'Rub API error',
      context: { id: routeId },
    });
  }
}
