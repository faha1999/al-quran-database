import { NextResponse } from 'next/server';
import { getAllSurahs } from '@/lib/data-loader';

export async function GET() {
  try {
    const surahs = getAllSurahs();
    return NextResponse.json({
      success: true,
      data: surahs,
      meta: {
        total: surahs.length
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch surahs' }, { status: 500 });
  }
}
