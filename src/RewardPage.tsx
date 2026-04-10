import { useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const TARGET = 1221
const DIGIT_H = 42
const FPS = 24

const IDLE_FRAMES = Array.from({ length: 17 }, (_, i) => i + 1)
const ACTION_FRAMES = Array.from({ length: 32 }, (_, i) => i + 18)  // 18~49

function SlotDigit({ target, delay }: { target: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started || !ref.current) return
    const ROLL = 4
    ref.current.style.transition = `transform 1.4s cubic-bezier(0.17, 0.67, 0.35, 1.0)`
    ref.current.style.transform = `translateY(${-ROLL * DIGIT_H}px)`
  }, [started])

  const ROLL = 4
  const items: number[] = []
  for (let i = ROLL; i >= 0; i--) {
    items.push(((target - i) % 10 + 10) % 10)
  }

  return (
    <div style={{ width: 32, height: DIGIT_H, overflow: 'hidden', display: 'inline-block', margin: '0 -4px' }}>
      <div ref={ref} style={{ transform: 'translateY(0)', willChange: 'transform' }}>
        {items.map((n, i) => (
          <div key={i} style={{
            height: DIGIT_H,
            lineHeight: `${DIGIT_H}px`,
            fontSize: 42,
            fontWeight: 700,
            color: '#121212',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            textAlign: 'center',
          }}>
            {n}
          </div>
        ))}
      </div>
    </div>
  )
}

function SlotNumber({ value }: { value: number }) {
  const digits = String(value).split('').map(Number)
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      {digits.map((d, i) => (
        <SlotDigit key={i} target={d} delay={i * 120} />
      ))}
    </div>
  )
}

export default function RewardPage({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const modeRef = useRef<'idle' | 'action'>('idle')
  const frameIdxRef = useRef(0)
  const rafRef = useRef(0)
  const imagesRef = useRef<Record<number, HTMLImageElement>>({})
  const loadedRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const dpr = window.devicePixelRatio || 2
    const displayW = canvas.offsetWidth
    const displayH = displayW * (960 / 540)
    canvas.width = displayW * dpr
    canvas.height = displayH * dpr
    canvas.style.height = `${displayH}px`
    const ctx = canvas.getContext('2d')!

    const allFrameNums = [...IDLE_FRAMES, ...ACTION_FRAMES]
    allFrameNums.forEach(n => {
      const img = new Image()
      img.src = `${BASE}catwalk/cat_${n}.png`
      img.onload = () => {
        imagesRef.current[n] = img
        loadedRef.current++
        if (loadedRef.current === allFrameNums.length) startLoop()
      }
    })

    let last = 0
    const interval = 1000 / FPS
    function startLoop() {
      function tick(ts: number) {
        if (ts - last >= interval) {
          const frames = modeRef.current === 'idle' ? IDLE_FRAMES : ACTION_FRAMES
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          const img = imagesRef.current[frames[frameIdxRef.current]]
          if (img) ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          frameIdxRef.current++
          if (frameIdxRef.current >= frames.length) {
            if (modeRef.current === 'action') modeRef.current = 'idle'
            frameIdxRef.current = 0
          }
          last = ts
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleButtonClick = () => {
    if (modeRef.current !== 'action') {
      modeRef.current = 'action'
      frameIdxRef.current = 0
    }
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      {/* Nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: 44,
        padding: '0 16px',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '0 8px 0 0', display: 'flex', alignItems: 'center',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M18 6L10 14L18 22" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ fontSize: 16, fontWeight: 600 }}>리워드</span>
        <span style={{ marginLeft: 'auto', fontSize: 15, fontWeight: 500, color: '#555' }}>내역보기</span>
      </div>

      {/* 고양이 캔버스: 가운데 정렬 */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 24 }}>
        <canvas ref={canvasRef} style={{
          width: '50%',
          maxWidth: 200,
          display: 'block',
        }} />
      </div>

      {/* 현재 쿠키조각 + 숫자 */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#000', letterSpacing: -0.15, marginBottom: 4 }}>
          현재 쿠키조각
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <SlotNumber value={TARGET} />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#000', lineHeight: `${DIGIT_H}px` }}>/100개</span>
        </div>
      </div>

      {/* 쿠키로 교환하기 버튼 */}
      <div style={{ padding: '24px 16px 0' }}>
        <button onClick={handleButtonClick} style={{
          width: '100%',
          height: 48,
          background: '#111',
          color: '#fff',
          fontSize: 15,
          fontWeight: 700,
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
        }}>
          쿠키로 교환하기
        </button>
      </div>
    </div>
  )
}
