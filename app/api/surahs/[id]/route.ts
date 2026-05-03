import { NextResponse } from 'next/server';
import { getSurahById } from '@/lib/data-loader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const surahId = parseInt(id);
    const surah = getSurahById(surahId);

    if (!surah) {
      return NextResponse.json({ success: false, error: 'Surah not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: surah
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
