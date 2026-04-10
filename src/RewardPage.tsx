import { useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const TARGET = 1221
const DIGIT_H = 42
const FPS = 24
const FW = 375
const FH = 418  // 468 - 50 (statusbar 제거)

const IDLE_FRAMES = Array.from({ length: 17 }, (_, i) => i + 1)
const ACTION_FRAMES = Array.from({ length: 32 }, (_, i) => i + 18)

function pct(v: number, total: number) { return `${(v / total) * 100}%` }

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
  for (let i = ROLL; i >= 0; i--) items.push(((target - i) % 10 + 10) % 10)

  return (
    <div style={{ width: 32, height: DIGIT_H, overflow: 'hidden', display: 'inline-block', margin: '0 -4px' }}>
      <div ref={ref} style={{ transform: 'translateY(0)', willChange: 'transform' }}>
        {items.map((n, i) => (
          <div key={i} style={{ height: DIGIT_H, lineHeight: `${DIGIT_H}px`, fontSize: 42, fontWeight: 700, color: '#121212', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', textAlign: 'center' }}>{n}</div>
        ))}
      </div>
    </div>
  )
}

function SlotNumber({ value }: { value: number }) {
  const digits = String(value).split('').map(Number)
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      {digits.map((d, i) => <SlotDigit key={i} target={d} delay={i * 120} />)}
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

  // 피그마 좌표 (statusbar 50px 제거 기준)
  // 고양이(A_high-end): x=111 y=11 w=153 h=238
  // uinon badge: x=123 y=171.6 w=134 h=37.4
  // mi: x=273 y=236 w=86 h=71
  // 현재쿠키조각: x=16 y=240 w=135 h=60
  // Button_R: x=16 y=321 w=343 h=48

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', paddingTop: pct(FH, FW) }}>

        {/* 1. 배경 - 최하단 레이어 */}
        <img src={`${BASE}figma/reward_bg.png`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'block', pointerEvents: 'none' }}
          alt="" />

        {/* 2. 고양이 캔버스 - 배경 위, 가운데 정렬, 원래 y 위치 */}
        <canvas ref={canvasRef} style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: pct(11, FH),
          width: pct(200, FW),
          display: 'block',
        }} />

        {/* 3. uinon badge (쿠키 30개 수령 완료!) - 고양이 위 레이어 */}
        <img src={`${BASE}figma/reward_badge.png`}
          style={{ position: 'absolute', left: pct(123, FW), top: pct(171.6, FH), width: pct(134, FW), display: 'block', pointerEvents: 'none' }}
          alt="" />

        {/* 4. mi (시작해볼까) */}
        <img src={`${BASE}figma/reward_mi.png`}
          style={{ position: 'absolute', left: pct(273, FW), top: pct(236, FH), width: pct(86, FW), display: 'block', pointerEvents: 'none' }}
          alt="" />

        {/* 5. 현재 쿠키조각 + 슬롯 숫자 */}
        <div style={{ position: 'absolute', left: pct(16, FW), top: pct(240, FH) }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#000', letterSpacing: -0.15, lineHeight: '18px', marginBottom: 4 }}>
            현재 쿠키조각
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <SlotNumber value={TARGET} />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#000', lineHeight: `${DIGIT_H}px` }}>/100개</span>
          </div>
        </div>

        {/* 6. Button_R */}
        <div onClick={handleButtonClick} style={{ position: 'absolute', left: pct(16, FW), top: pct(321, FH), width: pct(343, FW), cursor: 'pointer' }}>
          <img src={`${BASE}figma/reward_button.png`} style={{ width: '100%', display: 'block' }} alt="쿠키로 교환하기" />
        </div>

        {/* 7. Nav - 최상단 레이어 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px 0 0', display: 'flex', alignItems: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M18 6L10 14L18 22" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span style={{ fontSize: 16, fontWeight: 600 }}>리워드</span>
          <span style={{ marginLeft: 'auto', fontSize: 15, fontWeight: 500, color: '#555' }}>내역보기</span>
        </div>

      </div>
    </div>
  )
}
