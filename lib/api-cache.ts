import { createClient } from 'redis';

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

type CacheResult<T> = {
  value: T;
  cacheStatus: 'hit-memory' | 'hit-redis' | 'miss' | 'skip';
};

const memoryCache = new Map<string, CacheEntry<unknown>>();
let redisClientPromise: Promise<ReturnType<typeof createClient> | null> | null = null;

function getRedisUrl() {
  return process.env.REDIS_URL?.trim() || '';
}

async function getRedisClient(): Promise<ReturnType<typeof createClient> | null> {
  const redisUrl = getRedisUrl();
  if (!redisUrl) return null;

  if (!redisClientPromise) {
    redisClientPromise = (async () => {
      try {
        const client = createClient({ url: redisUrl });
        client.on('error', () => {});
        await client.connect();
        return client;
      } catch {
        return null;
      }
    })();
  }

  return redisClientPromise;
}

function getMemoryValue<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.value as T;
}

function setMemoryValue<T>(key: string, value: T, ttlSeconds: number) {
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

export function buildApiCacheKey(namespace: string, value: string) {
  return `quran-dev:${namespace}:${value}`;
}

export function getCacheHeaders(cacheStatus: CacheResult<unknown>['cacheStatus']) {
  return {
    'X-Cache': cacheStatus,
  };
}

export async function withApiCache<T>(
  key: string,
  ttlSeconds: number,
  producer: () => Promise<T> | T,
): Promise<CacheResult<T>> {
  if (ttlSeconds <= 0) {
    return {
      value: await producer(),
      cacheStatus: 'skip',
    };
  }

  const memoryValue = getMemoryValue<T>(key);
  if (memoryValue !== null) {
    return { value: memoryValue, cacheStatus: 'hit-memory' };
  }

  const redis = await getRedisClient();
  if (redis) {
    try {
      const raw = await redis.get(key);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        setMemoryValue(key, parsed, ttlSeconds);
        return { value: parsed, cacheStatus: 'hit-redis' };
      }
    } catch {}
  }

  const value = await producer();
  setMemoryValue(key, value, ttlSeconds);

  if (redis) {
    try {
      await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
    } catch {}
  }

  return { value, cacheStatus: 'miss' };
}
