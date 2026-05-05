import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export interface ApiSuccessPayload<T> {
  data: T;
  meta?: Record<string, unknown>;
  status?: number;
}

export interface ApiErrorOptions {
  error: string;
  status?: number;
}

export interface ApiRouteErrorOptions {
  error: unknown;
  fallbackMessage: string;
  validationPrefixes?: string[];
  logMessage: string;
  context?: Record<string, unknown>;
}

export function createSuccessResponse<T>({ data, meta, status = 200 }: ApiSuccessPayload<T>) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(meta ? { meta } : {}),
    },
    { status },
  );
}

export function createErrorResponse({ error, status = 500 }: ApiErrorOptions) {
  return NextResponse.json({ success: false, error }, { status });
}

export function handleRouteError({
  error,
  fallbackMessage,
  validationPrefixes = [],
  logMessage,
  context,
}: ApiRouteErrorOptions) {
  const message = error instanceof Error ? error.message : fallbackMessage;
  const isValidationError = validationPrefixes.some((prefix) => message.startsWith(prefix));

  if (isValidationError) {
    logger.warn(logMessage, {
      ...context,
      error: message,
    });
    return createErrorResponse({ error: message, status: 400 });
  }

  logger.error(logMessage, {
    ...context,
    error: message,
    stack: error instanceof Error ? error.stack : undefined,
  });

  return createErrorResponse({ error: fallbackMessage, status: 500 });
}
