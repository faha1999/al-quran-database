import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '@/proxy';

describe('proxy', () => {
  it('blocks hosted API traffic on the official domain', async () => {
    const response = proxy(
      new NextRequest('https://al-quran-database.vercel.app/api/v1/surahs?limit=5'),
    );
    const payload = await response.json();

    expect(response.status).toBe(403);
    expect(payload.success).toBe(false);
    expect(payload.error).toContain('Run the repository locally');
  });

  it('allows local API traffic for local development and self-hosting', () => {
    const response = proxy(new NextRequest('http://localhost:3000/api/v1/surahs?limit=5'));

    expect(response.status).toBe(200);
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(response.headers.get('X-RateLimit-Limit')).toBe('100');
  });
});
