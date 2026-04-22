import { useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const TARGET = 1221
const DIGIT_H = 42

function SlotDigit({ target, delay }: { target: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started || !ref.current) return
    const ROLL = 5
    ref.current.style.transition = `transform 0.9s cubic-bezier(0.17, 0.67, 0.35, 1.0)`
    ref.current.style.transform = `translateY(${-ROLL * DIGIT_H}px)`
  }, [started])

  const ROLL = 5
  const items: number[] = []
  for (let i = ROLL; i >= 0; i--) items.push(((target - i) % 10 + 10) % 10)

  return (
    <div style={{ width: 32, height: DIGIT_H, overflow: 'hidden', display: 'inline-block', margin: '0 -3px' }}>
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
      {digits.map((d, i) => <SlotDigit key={i} target={d} delay={i * 60} />)}
    </div>
  )
}

export default function RewardPage({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', overflow: 'hidden' }}>

      {/* ── Hero 블록 ── */}
      <div style={{ position: 'relative', minHeight: 378 }}>
        {/* 배경 */}
        <img src={`${BASE}ddd.png`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 378, objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
          alt="" />
        {/* 하단 그라데이션 마스크 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 100,
          background: 'linear-gradient(to bottom, transparent, #fff)',
          pointerEvents: 'none',
        }}/>

        {/* top 이미지 */}
        <img src={`${BASE}top.png`} style={{ position: 'relative', width: '100%', display: 'block' }} alt="" />

        {/* bb.apng 고양이 + 뱃지 — 화면 최상단으로부터 120px */}
        <div style={{ position: 'absolute', top: 150, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ position: 'relative' }}>
            <img src={`${BASE}bb.apng`} style={{ width: 180, display: 'block' }} alt="" />
            <img src={`${BASE}figma/reward_badge.png`}
              style={{ position: 'absolute', bottom: '22%', left: '50%', transform: 'translateX(-50%)', width: 134, display: 'block', pointerEvents: 'none' }}
              alt="" />
          </div>
        </div>
      </div>

      {/* ── 하단 섹션 ── */}
      <div style={{ padding: '0 16px 0', position: 'relative', marginTop: -60 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#000', letterSpacing: -0.15, lineHeight: '18px', marginBottom: 2 }}>
          현재 쿠키조각
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <SlotNumber value={TARGET} />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#000', lineHeight: `${DIGIT_H}px` }}>/100개</span>
          </div>
          <img src={`${BASE}figma/reward_mi.png`} style={{ width: 86, display: 'block', flexShrink: 0 }} alt="" />
        </div>

        {/* Button_R */}
        <img src={`${BASE}figma/reward_button.png`} style={{ width: '100%', display: 'block', cursor: 'pointer' }} alt="쿠키로 교환하기" />
      </div>

    </div>
  )
}
