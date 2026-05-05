import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export const CURRENT_API_VERSION = 'v1';
export const LATEST_API_VERSION = 'v1';

export interface ApiSuccessPayload<T> {
  data: T;
  meta?: Record<string, unknown>;
  status?: number;
  headers?: HeadersInit;
}

export interface ApiErrorOptions {
  error: string;
  status?: number;
  headers?: HeadersInit;
}

export interface ApiRouteErrorOptions {
  error: unknown;
  fallbackMessage: string;
  validationPrefixes?: string[];
  logMessage: string;
  context?: Record<string, unknown>;
}

function withVersionHeaders(headers?: HeadersInit): Headers {
  const merged = new Headers(headers);
  merged.set('X-API-Version', CURRENT_API_VERSION);
  merged.set('X-API-Latest-Version', LATEST_API_VERSION);
  return merged;
}

export function createSuccessResponse<T>({
  data,
  meta,
  status = 200,
  headers,
}: ApiSuccessPayload<T>) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(meta ? { meta } : {}),
    },
    { status, headers: withVersionHeaders(headers) },
  );
}

export function createErrorResponse({ error, status = 500, headers }: ApiErrorOptions) {
  return NextResponse.json(
    { success: false, error },
    { status, headers: withVersionHeaders(headers) },
  );
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
