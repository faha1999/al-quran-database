import { NextResponse } from 'next/server';

import { getJuzById, validateEditionFilter } from '@/lib/data-loader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const juzId = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const juz = getJuzById(juzId, edition ?? undefined);

    if (!juz) {
      return NextResponse.json({ success: false, error: 'Juz not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: juz,
      meta: {
        ayah_count: juz.ayah_count,
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
