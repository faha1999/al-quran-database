import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getJuzById, validateEditionFilter } from '@/lib/data-loader';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  let routeId = 'unknown';

  try {
    const { id } = await params;
    routeId = id;
    const juzId = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const juz = getJuzById(juzId, edition ?? undefined);

    if (!juz) {
      return createErrorResponse({ error: 'Juz not found', status: 404 });
    }

    return createSuccessResponse({
      data: juz,
      meta: {
        ayah_count: juz.ayah_count,
      },
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      validationPrefixes: ['Unknown edition'],
      logMessage: 'Juz API error',
      context: { id: routeId },
    });
  }
}
