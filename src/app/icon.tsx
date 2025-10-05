import { ImageResponse } from 'next/og'

export function generateIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff',
        }}
      >
        DDD
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
}

export default generateIcon