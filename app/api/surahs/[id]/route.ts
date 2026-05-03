import { NextResponse } from 'next/server';
import { getSurahById, validateEditionFilter } from '@/lib/data-loader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const surahId = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const surah = getSurahById(surahId, edition ?? undefined);

    if (!surah) {
      return NextResponse.json({ success: false, error: 'Surah not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: surah,
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
