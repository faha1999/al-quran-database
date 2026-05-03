import { NextResponse } from 'next/server';
import { getReciters } from '@/lib/data-loader';

export async function GET() {
  try {
    const reciters = getReciters();
    return NextResponse.json({
      success: true,
      data: reciters,
      meta: {
        total: reciters.length
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
