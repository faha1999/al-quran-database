import { NextResponse } from 'next/server';
import { getAllSurahs } from '@/lib/data-loader';
import { parsePositiveInteger } from '@/lib/api-utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = parsePositiveInteger(searchParams.get('page'), 'page');
    const limitParam = parsePositiveInteger(searchParams.get('limit'), 'limit');
    const usePagination = pageParam !== null || limitParam !== null;
    const page = pageParam ?? 1;
    const limit = limitParam ?? 20;
    const { items, meta } = usePagination ? getAllSurahs(page, limit) : getAllSurahs();

    return NextResponse.json({
      success: true,
      data: items,
      meta,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch surahs';
    const status = message.startsWith('Invalid "') ? 400 : 500;

    if (status === 400) {
      return NextResponse.json({ success: false, error: message }, { status });
    }

    return NextResponse.json({ success: false, error: 'Failed to fetch surahs' }, { status: 500 });
  }
}
