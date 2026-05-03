import { NextResponse } from 'next/server';
import { searchAyahsWithFlex } from '@/lib/search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ success: false, error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const results = searchAyahsWithFlex(query);
    return NextResponse.json({
      success: true,
      data: results,
      meta: {
        count: results.length
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ success: false, error: 'Search failed' }, { status: 500 });
  }
}
