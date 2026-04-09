import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 208
const FPS = 24
const BASE = import.meta.env.BASE_URL

export default function FloatingCat() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const frames: HTMLImageElement[] = []

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      const num = String(i).padStart(5, '0')
      img.src = `${BASE}entry/a 2_${num}.png`
      img.onload = () => {
        loadedRef.current++
        if (loadedRef.current === TOTAL_FRAMES) startLoop()
      }
      frames.push(img)
    }
    imagesRef.current = frames

    let last = 0
    const interval = 1000 / FPS

    function startLoop() {
      function tick(ts: number) {
        if (ts - last >= interval) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(imagesRef.current[frameRef.current], 0, 0, canvas.width, canvas.height)
          frameRef.current = (frameRef.current + 1) % TOTAL_FRAMES
          last = ts
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 94,
      right: 20,
      width: 63,
      height: 69,
      zIndex: 100,
      cursor: 'pointer',
    }}>
      {/* 초록 원 배경 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 58,
        height: 58,
        borderRadius: '50%',
        background: '#00dc64',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 4px 12px rgba(0,220,100,0.4)',
      }} />
      {/* 고양이 캔버스 */}
      <canvas
        ref={canvasRef}
        width={80}
        height={80}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80,
          height: 80,
        }}
      />
    </div>
  )
}
