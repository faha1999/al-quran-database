import { parseOptionalBoolean } from '@/lib/api-utils';
import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getAyahByNumber, validateEditionFilter } from '@/lib/data-loader';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  let routeId = 'unknown';

  try {
    const { id } = await params;
    routeId = id;
    const number = Number.parseInt(id, 10);
    const searchParams = new URL(request.url).searchParams;
    const edition = validateEditionFilter(searchParams.get('edition'));
    const includeWords = parseOptionalBoolean(searchParams.get('include_words'));
    const ayah = getAyahByNumber(number, edition ?? undefined);

    if (!ayah) {
      return createErrorResponse({ error: 'Ayah not found', status: 404 });
    }

    const { getExtraContextByAyah, getWordsByAyah } = await import('@/lib/data-loader');
    const extra = getExtraContextByAyah(ayah.id);
    const words = includeWords ? getWordsByAyah(ayah.id) : undefined;

    return createSuccessResponse({
      data: {
        ...ayah,
        ...extra,
        words,
      },
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      validationPrefixes: ['Unknown edition'],
      logMessage: 'Ayah API error',
      context: { id: routeId },
    });
  }
}
