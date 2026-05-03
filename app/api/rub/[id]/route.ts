import { NextResponse } from 'next/server';
import { getRubById, validateEditionFilter } from '@/lib/data-loader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rubId = Number.parseInt(id, 10);
    const edition = validateEditionFilter(new URL(request.url).searchParams.get('edition'));
    const rub = getRubById(rubId, edition ?? undefined);

    if (!rub) {
      return NextResponse.json({ success: false, error: 'Rub not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: rub,
      meta: {
        ayah_count: rub.ayah_count,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status = message.startsWith('Unknown edition') ? 400 : 500;
    return NextResponse.json({ success: false, error: status === 400 ? message : 'Internal server error' }, { status });
  }
}
