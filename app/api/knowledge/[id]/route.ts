import { createErrorResponse, createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getKnowledgeByAyah } from '@/lib/data-loader';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  let routeId = 'unknown';

  try {
    const { id } = await params;
    routeId = id;
    const ayahId = Number.parseInt(id, 10);
    const knowledge = getKnowledgeByAyah(ayahId);

    if (!knowledge) {
      return createErrorResponse({ error: 'Knowledge entry not found', status: 404 });
    }

    return createSuccessResponse({ data: knowledge });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      logMessage: 'Knowledge API error',
      context: { id: routeId },
    });
  }
}
