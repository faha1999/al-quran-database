import { ImageResponse } from 'next/og';
import { brandName, productName } from '@/lib/seo';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:
          'radial-gradient(circle at top left, rgba(37,99,235,0.35), transparent 35%), linear-gradient(135deg, #020617 0%, #0f172a 45%, #111827 100%)',
        color: 'white',
        padding: '56px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          fontSize: 28,
          fontWeight: 700,
          color: '#93c5fd',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '56px',
            width: '56px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '18px',
            background: '#2563eb',
            color: 'white',
            fontSize: 28,
          }}
        >
          Q
        </div>
        {brandName}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>{productName}</div>
        <div style={{ maxWidth: '900px', fontSize: 30, color: '#cbd5e1', lineHeight: 1.35 }}>
          Quran API, SDK, search, and database exports for developers building production apps.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#94a3b8',
          fontSize: 24,
        }}
      >
        <div>REST API</div>
        <div>GraphQL</div>
        <div>TypeScript SDK</div>
        <div>Search</div>
      </div>
    </div>,
    size,
  );
}
