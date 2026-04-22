import { useLayoutEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const SIZE = 64
const SHRUNK_WIDTH = 74

export default function FloatingCat({ onClick }: { onClick?: () => void }) {
  const [shrunk, setShrunk] = useState(false)
  const shrunkRef = useRef(false)

  const pillRef = useRef<HTMLDivElement>(null)
  const [initWidth, setInitWidth] = useState<number | null>(null)
  const [canTransition, setCanTransition] = useState(false)

  useLayoutEffect(() => {
    if (!pillRef.current) return
    const w = pillRef.current.offsetWidth
    setInitWidth(w)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setCanTransition(true))
    })
  }, [])

  useLayoutEffect(() => {
    function onScroll() {
      if (!shrunkRef.current && window.scrollY >= 10) {
        shrunkRef.current = true
        setShrunk(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pillWidth = shrunk ? SHRUNK_WIDTH : (initWidth ?? undefined)

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
    }} onClick={onClick}>

      {/* 말풍선 + 꼬리 + 레드닷 */}
      <div style={{ position: 'relative', marginBottom: 6 }}>
        <div ref={pillRef} style={{
          position: 'relative',
          background: '#111',
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, sans-serif',
          height: 28,
          borderRadius: 20,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: initWidth === null ? 'max-content' : pillWidth,
          padding: '0 12px',
          lineHeight: '28px',
          transition: canTransition ? 'width 0.45s ease-in-out' : 'none',
          boxSizing: 'border-box',
        }}>
          <span style={{
            position: 'absolute', top: 0, left: 12,
            lineHeight: '28px', whiteSpace: 'nowrap',
            opacity: shrunk ? 0 : 1,
            transition: 'opacity 0.25s ease-in-out',
          }}>
            오늘 쿠키미션 확인해보세요!
          </span>
          <span style={{
            position: 'absolute', top: 1, left: 0, right: 0,
            lineHeight: '26px', paddingBottom: 2,
            whiteSpace: 'nowrap', textAlign: 'center',
            opacity: shrunk ? 1 : 0,
            transition: shrunk ? 'opacity 0.25s ease-in-out 0.5s' : 'none',
          }}>
            리워드 미션
          </span>
          <span style={{ visibility: 'hidden', pointerEvents: 'none' }}>
            오늘 쿠키미션 확인해보세요!
          </span>
        </div>

        {/* 레드닷 */}
        <div style={{
          position: 'absolute', top: 1.5, right: 1.5,
          width: 6, height: 6, borderRadius: '50%',
          background: '#FF2F5D', boxShadow: '0 0 0 1.5px #fff',
          pointerEvents: 'none',
        }}/>

        {/* 꼬리 */}
        <div style={{
          position: 'absolute', bottom: -5, right: 28,
          width: 10, height: 7, overflow: 'hidden',
        }}>
          <svg width="10" height="14" viewBox="0 0 10 14"
            style={{ position: 'absolute', top: -7, left: 0, display: 'block' }}>
            <path d="M5 1 Q5.8 0 10 7 Q5.8 14 5 13 Q4.2 14 0 7 Q4.2 0 5 1 Z" fill="#111"/>
          </svg>
        </div>
      </div>

      {/* 고양이 APNG */}
      <div style={{
        position: 'relative',
        width: SIZE, height: SIZE,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: 26,
          background: 'linear-gradient(to bottom, #00dc64, #fff)',
        }}/>
        <img
          src={`${BASE}cat.apng`}
          width={SIZE}
          height={SIZE}
          style={{ position: 'absolute', inset: 0, display: 'block' }}
        />
      </div>
    </div>
  )
}
