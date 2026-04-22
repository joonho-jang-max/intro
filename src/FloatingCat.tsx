import { useLayoutEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const SIZE = 64

export default function FloatingCat({ onClick }: { onClick?: () => void }) {
  const [hidden, setHidden] = useState(false)
  const hiddenRef = useRef(false)

  useLayoutEffect(() => {
    function onScroll() {
      if (!hiddenRef.current && window.scrollY >= 10) {
        hiddenRef.current = true
        setHidden(true)
      } else if (hiddenRef.current && window.scrollY < 10) {
        hiddenRef.current = false
        setHidden(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
    }} onClick={onClick}>

      {/* 말풍선 + 꼬리 */}
      <div style={{
        position: 'relative',
        marginBottom: 6,
        opacity: hidden ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out',
        pointerEvents: hidden ? 'none' : 'auto',
      }}>
        <div style={{
          background: '#111',
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, sans-serif',
          height: 28,
          borderRadius: 20,
          whiteSpace: 'nowrap',
          padding: '0 12px',
          lineHeight: '28px',
          boxSizing: 'border-box',
        }}>
          오늘 쿠키미션 확인해보세요!
        </div>

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
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
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
