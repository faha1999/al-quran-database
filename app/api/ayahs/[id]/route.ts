import { NextResponse } from 'next/server';
import { getAyahByNumber } from '@/lib/data-loader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const number = parseInt(id);
    const ayah = getAyahByNumber(number);

    if (!ayah) {
      return NextResponse.json({ success: false, error: 'Ayah not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: ayah
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
