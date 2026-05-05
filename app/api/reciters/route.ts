import { createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getReciters } from '@/lib/data-loader';

export async function GET() {
  try {
    const reciters = getReciters();
    return createSuccessResponse({
      data: reciters,
      meta: {
        total: reciters.length,
      },
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      logMessage: 'Reciters API error',
    });
  }
}
