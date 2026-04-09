import { useState } from 'react'

/* ── palette ─────────────────────────────── */
const NAV      = '#000'
const LIGHT_BG = '#f7f6f3'
const WHITE    = '#fff'
const DARK     = '#111'
const GRAY     = '#999'
const ORANGE   = '#ff9500'
const PURPLE   = '#7c3aed'
const RED      = '#ff3b30'
const GREEN    = '#16a34a'

/* ── StatusBar ───────────────────────────── */
function StatusBar() {
  return (
    <div style={{ background: NAV, padding: '14px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: WHITE, fontSize: 15, fontWeight: 600 }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="18" height="12"><rect x="0" y="7" width="3" height="5" rx="1" fill="white"/><rect x="5" y="5" width="3" height="7" rx="1" fill="white"/><rect x="10" y="3" width="3" height="9" rx="1" fill="white"/><rect x="15" y="1" width="3" height="11" rx="1" fill="white" opacity="0.3"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12"><circle cx="8" cy="10.5" r="1.5" fill="white"/><path d="M4.5 7.5a4.9 4.9 0 017 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M1.5 4.5a9.5 9.5 0 0113 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 22, height: 11, border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 3, padding: '1.5px' }}>
            <div style={{ width: '80%', height: '100%', background: WHITE, borderRadius: 1.5 }}/>
          </div>
          <div style={{ width: 2, height: 4, background: 'rgba(255,255,255,0.35)', borderRadius: '0 1px 1px 0' }}/>
        </div>
      </div>
    </div>
  )
}

/* ── NavBar ──────────────────────────────── */
function NavBar() {
  return (
    <div style={{ background: NAV, padding: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 46 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ color: WHITE, fontSize: 19, fontWeight: 900, letterSpacing: -0.5 }}>NOVEL</span>
        <span style={{ color: '#555', fontSize: 19, fontWeight: 700 }}>COMIX</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* 무료쿠키 pill */}
        <div style={{ background: ORANGE, borderRadius: 14, padding: '5px 10px' }}>
          <span style={{ color: WHITE, fontSize: 12, fontWeight: 800 }}>무료쿠키!</span>
        </div>
        {/* cookie C icon */}
        <div style={{ width: 30, height: 30, borderRadius: 15, background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: WHITE, fontSize: 16, fontWeight: 900 }}>C</span>
        </div>
        {/* bell */}
        <button style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
        </button>
        {/* person */}
        <button style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z"/></svg>
        </button>
      </div>
    </div>
  )
}

/* ── TabBar ──────────────────────────────── */
const TABS = ['추천', '🚀급상승랭킹', '베스트랭킹', '신작', '연령별랭킹', '단독연재']

function TabBar({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  return (
    <div style={{ background: NAV, display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid #222' }}>
      {TABS.map((tab, i) => (
        <button key={tab} onClick={() => setActive(i)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '10px 14px', whiteSpace: 'nowrap', flexShrink: 0,
          color: i === active ? WHITE : GRAY,
          fontSize: 13, fontWeight: i === active ? 700 : 400,
          borderBottom: i === active ? '2px solid white' : '2px solid transparent',
        }}>{tab}</button>
      ))}
    </div>
  )
}

/* ── BenefitBanner ───────────────────────── */
function BenefitBanner() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #fce4f8 0%, #e8d5ff 40%, #d4b8ff 100%)',
      position: 'relative', padding: '14px 16px 32px', overflow: 'hidden',
    }}>
      {/* floating diamonds */}
      {[
        { top: 8, left: 40, size: 10, opacity: 0.4 },
        { top: 20, right: 80, size: 14, opacity: 0.3 },
        { top: 50, left: 15, size: 8, opacity: 0.35 },
        { bottom: 30, left: 100, size: 12, opacity: 0.3 },
        { bottom: 10, right: 60, size: 9, opacity: 0.4 },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute', ...d,
          width: d.size, height: d.size,
          background: PURPLE, opacity: d.opacity,
          transform: 'rotate(45deg)', borderRadius: 2,
        }}/>
      ))}

      {/* badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, position: 'relative', zIndex: 1 }}>
        <span style={{ background: DARK, color: WHITE, fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 4 }}>NEW</span>
        <span style={{ background: '#ff2d78', color: WHITE, fontSize: 11, fontWeight: 800, padding: '3px 12px', borderRadius: 20 }}>참여하기</span>
      </div>

      {/* title */}
      <div style={{ fontSize: 28, fontWeight: 900, color: DARK, lineHeight: 1.2, marginBottom: 14, position: 'relative', zIndex: 1 }}>
        웰컴 <span style={{ color: PURPLE }}>쿠키</span> 선물
      </div>

      {/* hashtag bubbles */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ background: WHITE, borderRadius: 12, padding: '8px 14px', marginBottom: 8, display: 'inline-block' }}>
          <span style={{ color: DARK, fontSize: 14, fontWeight: 600 }}>
            #딱 24시간만 <span style={{ color: PURPLE, fontWeight: 800 }}>100%</span> 당첨!
          </span>
        </div>
        <div style={{ color: '#4c1d95', fontSize: 14, fontWeight: 600, paddingLeft: 4 }}>
          #만나서 반가워요!
        </div>
      </div>

      {/* cookie image */}
      <div style={{
        position: 'absolute', right: 16, bottom: 24,
        fontSize: 80, lineHeight: 1, opacity: 0.92, zIndex: 1,
        filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.15))',
      }}>🍪</div>

      {/* page indicator */}
      <div style={{
        position: 'absolute', bottom: 10, right: 14, zIndex: 2,
        background: 'rgba(100,60,160,0.25)', borderRadius: 10,
        padding: '2px 8px', color: '#3b0764', fontSize: 11, fontWeight: 600,
      }}>2/14 ›</div>
    </div>
  )
}

/* ── BookCard ────────────────────────────── */
function BookCard({ promoText, badge }: { promoText: string; badge?: string }) {
  // gradient palette for cover art variety
  const covers = [
    'linear-gradient(160deg,#1a0e2e 0%,#2d1b4e 40%,#1e0a3c 100%)',
    'linear-gradient(160deg,#0f1e2e 0%,#1e3a5f 40%,#0a1e3c 100%)',
    'linear-gradient(160deg,#2e1a0e 0%,#4e2d1b 40%,#3c1e0a 100%)',
    'linear-gradient(160deg,#0e2e1a 0%,#1b4e2d 40%,#0a3c1e 100%)',
    'linear-gradient(160deg,#2e0e1a 0%,#4e1b2d 40%,#3c0a1e 100%)',
  ]
  const cover = covers[Math.floor(Math.random() * covers.length)]

  return (
    <div style={{ width: 106, flexShrink: 0 }}>
      {/* cover */}
      <div style={{ width: 106, height: 148, borderRadius: 8, overflow: 'hidden', position: 'relative', marginBottom: 8, background: cover }}>
        {/* character silhouette hint */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6) 100%)' }}/>
        {/* top icons */}
        <div style={{ position: 'absolute', top: 6, left: 6, width: 22, height: 22, borderRadius: 11, border: '1.5px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z"/></svg>
        </div>
        <div style={{ position: 'absolute', top: 6, right: 6 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
        </div>
        {/* bottom badge */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.75)', padding: '4px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: WHITE, fontSize: 10, fontWeight: 700 }}>특가 세트</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 8 }}>SERIES EDITION</span>
        </div>
      </div>
      {/* meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
        <span style={{ background: GREEN, color: WHITE, fontSize: 9, fontWeight: 800, padding: '2px 5px', borderRadius: 3 }}>NEW</span>
        {badge && <span style={{ color: GRAY, fontSize: 9 }}>{badge}</span>}
      </div>
      <div style={{ color: DARK, fontSize: 12, fontWeight: 700, lineHeight: 1.4, marginBottom: 3 }}>작품 타이틀<br/>두줄인 경우입니...</div>
      <div style={{ color: DARK, fontSize: 11, marginBottom: 2 }}>★9.8 · 9,999만</div>
      <div style={{ color: GREEN, fontSize: 11, fontWeight: 600 }}>{promoText}</div>
    </div>
  )
}

/* ── BookSection ─────────────────────────── */
function BookSection() {
  return (
    <div style={{ background: LIGHT_BG, paddingTop: 18, paddingBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', marginBottom: 14 }}>
        <span style={{ color: DARK, fontSize: 15 }}>
          <b>닉네임</b> 님이 좋아할 만한 작품
        </span>
        <span style={{ color: GRAY, fontSize: 13 }}>더보기 ›</span>
      </div>
      <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <BookCard promoText="베스트 로판 2위" badge="베스트 론칭 2위"/>
        <BookCard promoText="예상 선호도 90%"/>
        <BookCard promoText="예상 선호도 90%"/>
        <BookCard promoText="9,999만"/>
        <BookCard promoText="예상 선호도 90%"/>
      </div>
    </div>
  )
}

/* ── ShortcutRow ─────────────────────────── */
const SHORTCUTS = ['숏컷명', '숏컷명', '숏컷명', '숏컷명', '숏컷명']

function ShortcutRow() {
  return (
    <div style={{ background: LIGHT_BG, padding: '10px 12px', display: 'flex', gap: 8 }}>
      {SHORTCUTS.map((s, i) => (
        <button key={i} style={{
          flex: 1, background: WHITE, border: 'none', borderRadius: 8,
          padding: '10px 0', color: DARK, fontSize: 12, fontWeight: 600,
          cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>{s}</button>
      ))}
    </div>
  )
}

/* ── BottomNav ───────────────────────────── */
function BottomNav() {
  const items = [
    {
      label: '홈', active: true,
      icon: <div style={{ width: 28, height: 28, background: DARK, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: WHITE, fontSize: 15, fontWeight: 900 }}>S</span>
      </div>,
    },
    {
      label: '무료박스', active: false,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill={GRAY}><path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.13 15.87 0 13.3 0a3.5 3.5 0 00-2.76 1.34L9 3l-1.54-1.66A3.5 3.5 0 004.7 0C2.13 0 0 2.13 0 4.7c0 .44.11.86.18 1.3H0v2h20V6zm0 3H0v12h20V9z" transform="translate(2 2) scale(.83)"/></svg>,
    },
    {
      label: '이벤트', active: false, dot: true,
      icon: <div style={{ position: 'relative' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill={GRAY}><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-2 .9-2 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
        <div style={{ position: 'absolute', top: -4, right: -4, background: RED, borderRadius: 10, padding: '1px 5px' }}>
          <span style={{ color: WHITE, fontSize: 9, fontWeight: 800 }}>참여</span>
        </div>
      </div>,
    },
    {
      label: '검색', active: false,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill={GRAY}><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
    },
    {
      label: '보관함', active: false,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill={GRAY}><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>,
    },
  ]

  return (
    <div style={{ position: 'sticky', bottom: 0, background: WHITE, borderTop: '1px solid #e5e5e5', display: 'flex', padding: '10px 0 24px', zIndex: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          {item.icon}
          <span style={{ color: item.active ? DARK : GRAY, fontSize: 10, fontWeight: item.active ? 700 : 400 }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Main ────────────────────────────────── */
export default function Component() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div style={{
      maxWidth: 375, margin: '0 auto',
      background: LIGHT_BG, minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <StatusBar />
      <NavBar />
      <TabBar active={activeTab} setActive={setActiveTab} />
      <BenefitBanner />
      <BookSection />
      <ShortcutRow />
      <BottomNav />
    </div>
  )
}
