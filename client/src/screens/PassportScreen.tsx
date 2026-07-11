import type { NavProps } from '../types'
import BottomNav from '../components/BottomNav'

const score = 74

const badges = [
  { icon: '✅', label: 'Identity Verified', color: '#02C39A', earned: true },
  { icon: '📞', label: 'Phone Verified', color: '#02C39A', earned: true },
  { icon: '🏢', label: 'Employment Verified', color: '#02C39A', earned: true },
  { icon: '📄', label: 'References Submitted', color: '#F59E0B', earned: false },
  { icon: '💰', label: 'Income Verified', color: '#F59E0B', earned: false },
  { icon: '🌟', label: 'Gold Renter', color: '#9CA3AF', earned: false },
]

const history = [
  { property: '1BHK HSR Layout', owner: 'Kiran Rao', duration: 'Jan 2024 – Dec 2024', rating: 5, status: 'completed' },
  { property: '2BHK Whitefield', owner: 'Suman Gupta', duration: 'Feb 2023 – Dec 2023', rating: 4, status: 'completed' },
  { property: 'Studio Indiranagar', owner: 'Anita Shetty', duration: 'Jun 2022 – Jan 2023', rating: 5, status: 'completed' },
]

export default function PassportScreen({ navigate, role, setRole }: NavProps) {
  const primary = '#02C39A'
  const scoreColor = score >= 80 ? '#02C39A' : score >= 60 ? '#F59E0B' : '#EF4444'
  const scoreLabel = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Fair'

  // Score ring
  const r = 52
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#02C39A', paddingBottom: 32 }}>
        <div className="px-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Your</p>
              <h1 className="font-bold text-white" style={{ fontSize: 22 }}>Rental Passport</h1>
            </div>
            <div className="rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8" /><polyline points="16,6 12,2 8,6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
              <span className="text-white font-semibold" style={{ fontSize: 12 }}>Share</span>
            </div>
          </div>

          {/* Profile + Score */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <svg width={128} height={128} viewBox={`0 0 ${r*2+24} ${r*2+24}`}>
                <circle cx={r+12} cy={r+12} r={r} stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                <circle
                  cx={r+12} cy={r+12} r={r}
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={offset}
                  transform={`rotate(-90 ${r+12} ${r+12})`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-bold text-white" style={{ fontSize: 28, lineHeight: 1 }}>{score}</span>
                <span className="text-white font-medium" style={{ fontSize: 10, opacity: 0.8 }}>/ 100</span>
              </div>
            </div>

            <div>
              <p className="text-white font-bold" style={{ fontSize: 18 }}>Priya Sharma</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="rounded-full" style={{ width: 8, height: 8, background: 'white' }} />
                <span className="text-white font-semibold" style={{ fontSize: 13 }}>{scoreLabel}</span>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>3 rentals · 0 disputes</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Member since Jan 2022</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto -mt-4">
        <div className="rounded-t-3xl bg-white pt-5">
          {/* Badges */}
          <div className="px-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold" style={{ fontSize: 16, color: '#1A1A2E' }}>Verified Badges</h2>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>3 / 6</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="rounded-2xl py-3 px-2 flex flex-col items-center gap-1.5"
                  style={{
                    background: b.earned ? '#E8FBF6' : '#F8FAFB',
                    border: `1.5px solid ${b.earned ? '#02C39A30' : '#E5E7EB'}`,
                    opacity: b.earned ? 1 : 0.6,
                  }}
                >
                  <span style={{ fontSize: 20, filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.icon}</span>
                  <span className="text-center" style={{ fontSize: 10, color: b.earned ? '#1A1A2E' : '#9CA3AF', fontWeight: 600, lineHeight: 1.3 }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Score breakdown */}
          <div className="px-5 mb-5">
            <h2 className="font-bold mb-3" style={{ fontSize: 16, color: '#1A1A2E' }}>Score Breakdown</h2>
            <div className="flex flex-col gap-3 rounded-2xl p-4" style={{ background: '#F8FAFB' }}>
              {[
                { label: 'Payment History', score: 95, weight: '35%' },
                { label: 'Identity Verification', score: 100, weight: '25%' },
                { label: 'References', score: 40, weight: '20%' },
                { label: 'Rental Tenure', score: 72, weight: '20%' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ fontSize: 13, color: '#6B7280' }}>{item.label}</span>
                    <span className="font-bold" style={{ fontSize: 13, color: item.score >= 80 ? '#02C39A' : item.score >= 60 ? '#F59E0B' : '#EF4444' }}>
                      {item.score}/100
                    </span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: 6, background: '#E5E7EB' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.score}%`,
                        background: item.score >= 80 ? '#02C39A' : item.score >= 60 ? '#F59E0B' : '#EF4444',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rental history */}
          <div className="px-5 pb-4">
            <h2 className="font-bold mb-3" style={{ fontSize: 16, color: '#1A1A2E' }}>Rental History</h2>
            <div className="flex flex-col gap-3">
              {history.map((h, i) => (
                <div key={i} className="rounded-2xl p-4 flex items-start gap-3" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div className="rounded-xl flex-shrink-0 flex items-center justify-center" style={{ width: 40, height: 40, background: '#EBF8FA' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#028090" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold" style={{ fontSize: 14, color: '#1A1A2E' }}>{h.property}</p>
                    <p style={{ fontSize: 12, color: '#9CA3AF' }}>Owner: {h.owner} · {h.duration}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map((s) => (
                        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= h.rating ? '#F59E0B' : '#E5E7EB'}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-full px-2 py-1" style={{ background: '#E8FBF6' }}>
                    <span style={{ fontSize: 10, color: '#02C39A', fontWeight: 600 }}>✓ Done</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="passport" navigate={navigate} role={role} />
    </div>
  )
}
