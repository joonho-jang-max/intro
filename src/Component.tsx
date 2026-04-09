const BG = '#0d0d0d'
const NAV = '#000'
const TEXT = '#fff'
const GRAY = '#666'
const GREEN = '#2ecc40'
const RED = '#ff3b30'
const YELLOW = '#ffe40a'

function StatusBar() {
  return (
    <div style={{ background: NAV, padding: '14px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: TEXT, fontSize: 15, fontWeight: 600 }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <rect x="0" y="6" width="3" height="6" rx="1" fill="white"/>
          <rect x="4.7" y="4" width="3" height="8" rx="1" fill="white"/>
          <rect x="9.3" y="2" width="3" height="10" rx="1" fill="white"/>
          <rect x="14" y="0" width="3" height="12" rx="1" fill="white" opacity="0.35"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <circle cx="8" cy="10.5" r="1.5" fill="white"/>
          <path d="M4.5 7.5a4.9 4.9 0 017 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M1.5 4.5a9.5 9.5 0 0113 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 22, height: 11, border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 3, padding: '1.5px' }}>
            <div style={{ width: '80%', height: '100%', background: 'white', borderRadius: 1.5 }}/>
          </div>
          <div style={{ width: 2, height: 4, background: 'rgba(255,255,255,0.4)', borderRadius: '0 1px 1px 0' }}/>
        </div>
      </div>
    </div>
  )
}

function NavBar() {
  return (
    <div style={{ background: NAV, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44 }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <span style={{ color: TEXT, fontSize: 18, fontWeight: 900, letterSpacing: -0.5 }}>NOVEL</span>
        <span style={{ color: '#555', fontSize: 18, fontWeight: 600 }}>COMIX</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ background: GREEN, borderRadius: 10, padding: '4px 8px' }}>
          <span style={{ color: '#000', fontSize: 11, fontWeight: 800 }}>무료쿠키!</span>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: 14, border: '1.5px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🍪</div>
        <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="19" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </div>
        <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function TabBar() {
  const tabs = ['추천', '🚀급상승랭킹', '베스트랭킹', '신작', '연령별랭킹']
  return (
    <div style={{ background: NAV, display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid #1f1f1f' }}>
      {tabs.map((tab, i) => (
        <div key={tab} style={{
          padding: '10px 12px', whiteSpace: 'nowrap', flexShrink: 0,
          color: i === 0 ? TEXT : GRAY, fontSize: 13, fontWeight: i === 0 ? 700 : 400,
          borderBottom: i === 0 ? '2px solid white' : '2px solid transparent',
        }}>{tab}</div>
      ))}
    </div>
  )
}

function BenefitBanner() {
  return (
    <div style={{
      margin: '8px', borderRadius: 12, overflow: 'hidden',
      background: 'linear-gradient(130deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)',
      position: 'relative', padding: '14px 16px 30px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ background: '#000', color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 4 }}>NEW</span>
        <span style={{ background: RED, color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>참여하기</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>
            웰컴 <span style={{ color: YELLOW }}>쿠키</span> 선물
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
            <div>#딱 24시간만 <b>100%</b> 당첨!</div>
            <div>#만나서 반가워요!</div>
          </div>
        </div>
        <span style={{ fontSize: 72, lineHeight: 1 }}>🍪</span>
      </div>
      <div style={{ position: 'absolute', bottom: 10, right: 14, color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 600 }}>2/14 ›</div>
    </div>
  )
}

function BookCard({ badge }: { badge?: string }) {
  return (
    <div style={{ width: 100, flexShrink: 0 }}>
      <div style={{
        width: 100, height: 138, borderRadius: 6, overflow: 'hidden',
        background: 'linear-gradient(160deg, #1a1535 0%, #0d1b3e 60%, #1a0a2e 100%)',
        position: 'relative', marginBottom: 6,
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to bottom, transparent, rgba(80,40,120,0.8))' }}/>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 10, fontWeight: 700, textAlign: 'center', padding: '3px 0' }}>특가 세트</div>
      </div>
      <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
        <span style={{ background: '#2a2a2a', color: '#aaa', fontSize: 9, fontWeight: 600, padding: '1px 4px', borderRadius: 2 }}>NEW</span>
        {badge && <span style={{ background: '#1a2a3a', color: '#5bb8ff', fontSize: 9, fontWeight: 600, padding: '1px 4px', borderRadius: 2 }}>{badge}</span>}
      </div>
      <div style={{ color: TEXT, fontSize: 11, fontWeight: 600, lineHeight: 1.4, marginBottom: 3 }}>작품 타이틀<br/>두줄인 경우입니...</div>
      <div style={{ color: YELLOW, fontSize: 10, marginBottom: 2 }}>★8 · 9,999원</div>
      <div style={{ color: '#555', fontSize: 9 }}>예상 선호도 90%</div>
    </div>
  )
}

function BookSection() {
  return (
    <div style={{ paddingTop: 16, paddingBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', marginBottom: 12 }}>
        <span style={{ color: TEXT, fontSize: 14, fontWeight: 700 }}>닉네임 님이 좋아할 만한 작품</span>
        <span style={{ color: GRAY, fontSize: 12 }}>다보기 ›</span>
      </div>
      <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <BookCard badge="베스트 론칭 2위"/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
      </div>
    </div>
  )
}

function ShortcutRow() {
  return (
    <div style={{ display: 'flex', borderTop: '1px solid #1f1f1f', borderBottom: '1px solid #1f1f1f', marginTop: 8 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{
          flex: 1, padding: '11px 0', color: '#555', fontSize: 12, fontWeight: 500,
          textAlign: 'center', borderRight: i < 4 ? '1px solid #1f1f1f' : 'none',
        }}>숏컷명</div>
      ))}
    </div>
  )
}

function BottomNav() {
  const items = [
    { label: '홈', active: true, icon: <span style={{ fontSize: 18, fontWeight: 900, color: TEXT }}>S</span> },
    { label: '무료박스', active: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill={GRAY}><path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v5c0 .75.4 1.38 1 1.73V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3.28c.6-.35 1-.98 1-1.72V9c0-1.1-.9-2-2-2zm-6-2v2h-4V5h4zM4 9h16v5h-5v-3H9v3H4V9zm9 6h-2v-2h2v2zm5 4H6v-3h3v1h6v-1h3v3z"/></svg> },
    { label: '이벤트', active: false, dot: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill={GRAY}><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg> },
    { label: '검색', active: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill={GRAY}><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg> },
    { label: '보관함', active: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill={GRAY}><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg> },
  ]
  return (
    <div style={{ position: 'sticky', bottom: 0, background: '#111', borderTop: '1px solid #222', display: 'flex', padding: '8px 0 24px', zIndex: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, position: 'relative' }}>
          {item.dot && <div style={{ position: 'absolute', top: 0, right: '28%', width: 7, height: 7, borderRadius: 4, background: RED }}/>}
          {item.icon}
          <span style={{ color: item.active ? TEXT : GRAY, fontSize: 10 }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Component() {
  return (
    <div style={{
      maxWidth: 375, margin: '0 auto',
      background: BG, minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: TEXT,
    }}>
      <StatusBar />
      <NavBar />
      <TabBar />
      <BenefitBanner />
      <BookSection />
      <ShortcutRow />
      <BottomNav />
    </div>
  )
}
