import { NextResponse } from 'next/server';
import { getAyahByNumber, validateEditionFilter } from '@/lib/data-loader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const number = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const includeWords = new URL(request.url).searchParams.get('include_words') === 'true';
    const ayah = getAyahByNumber(number, edition ?? undefined);

    if (!ayah) {
      return NextResponse.json({ success: false, error: 'Ayah not found' }, { status: 404 });
    }

    const { getExtraContextByAyah, getWordsByAyah } = await import('@/lib/data-loader');
    const extra = getExtraContextByAyah(ayah.id);
    const words = includeWords ? getWordsByAyah(ayah.id) : undefined;

    return NextResponse.json({
      success: true,
      data: {
        ...ayah,
        ...extra,
        words
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status = message.startsWith('Unknown edition') ? 400 : 500;

    if (status === 400) {
      return NextResponse.json({ success: false, error: message }, { status });
    }

    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
