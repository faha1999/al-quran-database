import { NextResponse } from 'next/server';
import { getWordsByAyah } from '@/lib/data-loader';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ayahId = Number.parseInt(searchParams.get('ayah_id') || '', 10);

    if (Number.isNaN(ayahId)) {
      return NextResponse.json({ success: false, error: 'ayah_id is required' }, { status: 400 });
    }

    const words = getWordsByAyah(ayahId);

    return NextResponse.json({
      success: true,
      data: words,
      meta: {
        count: words.length,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
