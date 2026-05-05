import { createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getDatasetMetadata, getKnowledgeCoverage } from '@/lib/data-loader';

export async function GET() {
  try {
    return createSuccessResponse({
      data: {
        dataset: getDatasetMetadata(),
        knowledge: getKnowledgeCoverage(),
      },
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      logMessage: 'Meta API error',
    });
  }
}
