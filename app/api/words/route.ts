import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getWordsByAyah } from '@/lib/data-loader';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ayahId = Number.parseInt(searchParams.get('ayah_id') || '', 10);

    if (Number.isNaN(ayahId)) {
      return createErrorResponse({ error: 'ayah_id is required', status: 400 });
    }

    const words = getWordsByAyah(ayahId);

    return createSuccessResponse({
      data: words,
      meta: {
        count: words.length,
      },
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      logMessage: 'Words API error',
    });
  }
}
