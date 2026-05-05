import { graphql } from 'graphql';
import { NextResponse } from 'next/server';
import { buildApiCacheKey, getCacheHeaders, withApiCache } from '@/lib/api-cache';
import { CURRENT_API_VERSION, LATEST_API_VERSION } from '@/lib/api-response';
import { quranGraphqlSchema } from '@/lib/graphql-schema';

function buildHeaders(cacheStatus: 'hit-memory' | 'hit-redis' | 'miss' | 'skip') {
  return {
    ...getCacheHeaders(cacheStatus),
    'X-API-Version': CURRENT_API_VERSION,
    'X-API-Latest-Version': LATEST_API_VERSION,
  };
}

async function runGraphql(
  query: string,
  variables?: Record<string, unknown> | null,
  useCache: boolean = false,
) {
  const exec = () =>
    graphql({
      schema: quranGraphqlSchema,
      source: query,
      variableValues: variables ?? undefined,
    });

  if (!useCache) {
    const result = await exec();
    return NextResponse.json(result, {
      status: result.errors?.length ? 400 : 200,
      headers: buildHeaders('skip'),
    });
  }

  const cached = await withApiCache(
    buildApiCacheKey('graphql', JSON.stringify({ query, variables })),
    120,
    exec,
  );
  const result = cached.value;
  return NextResponse.json(result, {
    status: result.errors?.length ? 400 : 200,
    headers: buildHeaders(cached.cacheStatus),
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const variablesParam = searchParams.get('variables');

  if (!query) {
    return NextResponse.json(
      {
        errors: [{ message: 'GraphQL query is required' }],
      },
      {
        status: 400,
        headers: buildHeaders('skip'),
      },
    );
  }

  let variables: Record<string, unknown> | null = null;
  if (variablesParam) {
    variables = JSON.parse(variablesParam) as Record<string, unknown>;
  }

  return runGraphql(query, variables, true);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    query?: string;
    variables?: Record<string, unknown> | null;
  };

  if (!body.query) {
    return NextResponse.json(
      {
        errors: [{ message: 'GraphQL query is required' }],
      },
      {
        status: 400,
        headers: buildHeaders('skip'),
      },
    );
  }

  return runGraphql(body.query, body.variables ?? null, false);
}
