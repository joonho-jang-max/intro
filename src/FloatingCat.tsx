import React, { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 156
const FPS = 24
const BASE = import.meta.env.BASE_URL
const SIZE = 62

export default function FloatingCat() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef(0)
  const rafRef = useRef<number>(0)
  const [bubblePhase, setBubblePhase] = useState<'in' | 'show' | 'out' | 'hidden'>('in')

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 2
    const W = SIZE * dpr
    const H = SIZE * dpr
    canvas.width = W
    canvas.height = H

    const frames: HTMLImageElement[] = []
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `${BASE}cat_intro_fin/a_${String(i).padStart(5, '0')}.png`
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
          ctx.clearRect(0, 0, W, H)
          ctx.drawImage(imagesRef.current[frameRef.current], 0, 0, W, H)
          frameRef.current = (frameRef.current + 1) % TOTAL_FRAMES
          last = ts
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // 말풍선 애니메이션 타이머
  useEffect(() => {
    // in(0.4s) → show → out(4초 후, 0.4s) → hidden
    const outTimer = setTimeout(() => setBubblePhase('out'), 4400)
    const hideTimer = setTimeout(() => setBubblePhase('hidden'), 4800)
    return () => { clearTimeout(outTimer); clearTimeout(hideTimer) }
  }, [])

  const bubbleStyle: React.CSSProperties = {
    position: 'relative',
    background: '#111',
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '6px 12px',
    borderRadius: 20,
    whiteSpace: 'nowrap',
    marginBottom: 10,
    transformOrigin: 'right center',
    transition: 'transform 0.4s cubic-bezier(0.34,1.2,0.64,1), opacity 0.4s ease',
    ...(bubblePhase === 'in'
      ? { transform: 'scaleX(0)', opacity: 0 }
      : bubblePhase === 'show'
      ? { transform: 'scaleX(1)', opacity: 1 }
      : bubblePhase === 'out'
      ? { transform: 'scaleX(0)', opacity: 0 }
      : { display: 'none' }),
  }

  const textStyle: React.CSSProperties = {
    transition: 'opacity 0.4s ease 0.15s',
    opacity: bubblePhase === 'show' ? 1 : 0,
  }

  // mount 후 한 프레임 뒤에 'show' 로 전환
  useEffect(() => {
    const t = requestAnimationFrame(() => setBubblePhase('show'))
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 66,
      right: 16,
      zIndex: 999,
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    }}>
      {bubblePhase !== 'hidden' && (
        <div style={bubbleStyle}>
          <span style={textStyle}>일이삼사오육칠팔구십</span>
          <div style={{
            position: 'absolute',
            bottom: -4,
            right: 27,   /* cat 중앙(31px) - 4px */
            width: 8,
            height: 8,
            background: '#111',
            transform: 'rotate(45deg)',
            borderRadius: '0 0 1px 0',  /* 아래 꼭짓점(tip)만 */
          }}/>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{ width: SIZE, height: SIZE, display: 'block' }}
      />
    </div>
  )
}
