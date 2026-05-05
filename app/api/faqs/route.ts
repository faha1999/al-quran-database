import { createSuccessResponse, handleRouteError } from '@/lib/api-response';
import { getKnowledgeFaqs } from '@/lib/data-loader';

export async function GET() {
  try {
    const faqs = getKnowledgeFaqs();
    return createSuccessResponse({
      data: faqs,
      meta: { total: faqs.length },
    });
  } catch (error) {
    return handleRouteError({
      error,
      fallbackMessage: 'Internal server error',
      logMessage: 'FAQ API error',
    });
  }
}
