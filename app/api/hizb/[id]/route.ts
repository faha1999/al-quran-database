import { NextResponse } from 'next/server';
import { getHizbById, validateEditionFilter } from '@/lib/data-loader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const hizbId = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const hizb = getHizbById(hizbId, edition ?? undefined);

    if (!hizb) {
      return NextResponse.json({ success: false, error: 'Hizb not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: hizb,
      meta: {
        ayah_count: hizb.ayah_count,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status = message.startsWith('Unknown edition') ? 400 : 500;
    return NextResponse.json({ success: false, error: status === 400 ? message : 'Internal server error' }, { status });
  }
}
