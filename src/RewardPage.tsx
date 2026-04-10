import { useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const TARGET = 1221
const DIGIT_H = 42  // font-size와 맞춤

/* 슬롯머신 스타일 단일 자릿수 */
function SlotDigit({ target, delay }: { target: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started || !ref.current) return
    // 0→target 까지 스크롤 (숫자를 위에서 아래로 쌓아두고 위로 스크롤)
    const totalItems = 10 + target + 1  // 0~9 패딩 + 0~target
    const finalOffset = -(totalItems - 1) * DIGIT_H
    ref.current.style.transition = `transform 0.6s cubic-bezier(0.17, 0.67, 0.35, 1.0)`
    ref.current.style.transform = `translateY(${finalOffset}px)`
  }, [started, target])

  // 0~9 * 2 + 0~target 으로 충분한 숫자 나열
  const items: number[] = []
  for (let i = 0; i < 10; i++) items.push(i)
  for (let i = 0; i <= target; i++) items.push(i)

  return (
    <div style={{
      width: 28,
      height: DIGIT_H,
      overflow: 'hidden',
      display: 'inline-block',
    }}>
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
        <SlotDigit key={i} target={d} delay={i * 100} />
      ))}
    </div>
  )
}

export default function RewardPage({ onBack }: { onBack: () => void }) {
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

      {/* 디자인 이미지 위에 숫자 오버레이 */}
      <div style={{ position: 'relative' }}>
        <img
          src={`${BASE}figma/fin_page.png`}
          style={{ width: '100%', display: 'block' }}
          alt="reward"
        />
        {/* 1221 위치: rel_x=16 rel_y=308, frame h=468
            이미지 비율에 맞게 % 로 */}
        <div style={{
          position: 'absolute',
          top: `${(308 / 468) * 100}%`,
          left: `${(16 / 375) * 100}%`,
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
        }}>
          <SlotNumber value={TARGET} />
          <span style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#000',
            lineHeight: `${DIGIT_H}px`,
          }}>/100개</span>
        </div>
      </div>
    </div>
  )
}
