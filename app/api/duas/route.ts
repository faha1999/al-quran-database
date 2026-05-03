import { NextResponse } from 'next/server';
import { getDuas } from '@/lib/data-loader';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get('page') || '1', 10);
    const limit = Number.parseInt(searchParams.get('limit') || '50', 10);

    const result = getDuas(page, limit);
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
