import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter (not shared across instances, but good enough for Phase 2)
const ipCache = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 100; // 100 requests per minute
const WINDOW_SIZE = 60 * 1000; // 1 minute

export function proxy(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();
  const userData = ipCache.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > WINDOW_SIZE) {
    userData.count = 1;
    userData.lastReset = now;
  } else {
    userData.count++;
  }

  ipCache.set(ip, userData);

  if (userData.count > RATE_LIMIT) {
    return NextResponse.json(
      { success: false, error: 'Too many requests' },
      { status: 429 }
    );
  }

  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;");
  response.headers.set('X-RateLimit-Limit', '100');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
