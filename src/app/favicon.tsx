import { ImageResponse } from 'next/og'

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2563eb',
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        D
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
}