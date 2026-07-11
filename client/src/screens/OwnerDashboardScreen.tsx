import type { NavProps } from '../types'
import BottomNav from '../components/BottomNav'

const stats = [
  { label: 'Monthly Revenue', value: '₹1.24L', change: '+12%', positive: true },
  { label: 'Pending Requests', value: '7', change: '+3', positive: true },
  { label: 'Occupancy Rate', value: '87%', change: '-2%', positive: false },
  { label: 'Active Listings', value: '4', change: '0', positive: true },
]

const activities = [
  { name: 'Arjun Kapoor', action: 'Applied for 2BHK Koramangala', time: '2h ago', score: 88, img: 'A' },
  { name: 'Sneha Patel', action: 'Rent paid — ₹28,000', time: '1d ago', score: 92, img: 'S' },
  { name: 'Vikram Singh', action: 'Lease expires in 30 days', time: '3d ago', score: 74, img: 'V' },
]

export default function OwnerDashboardScreen({ navigate, role, setRole }: NavProps) {
  const primary = '#028090'

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#028090', paddingBottom: 24 }}>
        <div className="px-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium" style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Good morning</p>
              <h1 className="font-bold text-white" style={{ fontSize: 22 }}>Rajesh Mehta</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <div className="absolute -top-1 -right-1 rounded-full" style={{ width: 8, height: 8, background: '#EF4444' }} />
              </button>
              <div className="rounded-full" style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.2)', display:'flex',alignItems:'center',justifyContent:'center' }}>
                <span className="font-bold text-white" style={{ fontSize: 18 }}>R</span>
              </div>
            </div>
          </div>

          {/* Trust score pill */}
          <div
            className="rounded-2xl px-4 py-3 flex items-center justify-between"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full flex items-center justify-center" style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.2)', border: '2.5px solid rgba(255,255,255,0.7)' }}>
                <span className="font-bold text-white" style={{ fontSize: 14 }}>94</span>
              </div>
              <div>
                <p className="font-semibold text-white" style={{ fontSize: 13 }}>Trust Score: Excellent</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Top 5% of owners on TrustCore</p>
              </div>
            </div>
            <div className="rounded-full px-2.5 py-1" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <span className="text-white font-semibold" style={{ fontSize: 10 }}>OWNER</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto -mt-4">
        {/* Stat cards */}
        <div className="px-5 pt-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 6 }}>{s.label}</p>
                <p className="font-bold" style={{ fontSize: 22, color: '#1A1A2E' }}>{s.value}</p>
                <p className="font-semibold mt-1" style={{ fontSize: 11, color: s.positive ? '#02C39A' : '#EF4444' }}>
                  {s.change} vs last month
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-5 mt-4">
          <h2 className="font-bold mb-3" style={{ fontSize: 15, color: '#1A1A2E' }}>Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Add Property', icon: '🏠', screen: 'add-property' as const },
              { label: 'View Requests', icon: '📋', screen: 'rental-requests' as const },
              { label: 'Messages', icon: '💬', screen: 'chat' as const },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.screen)}
                className="rounded-2xl py-4 flex flex-col items-center gap-2 transition-transform active:scale-95"
                style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <span style={{ fontSize: 24 }}>{a.icon}</span>
                <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="px-5 mt-5 pb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold" style={{ fontSize: 15, color: '#1A1A2E' }}>Recent Activity</h2>
            <button onClick={() => navigate('rental-requests')} style={{ fontSize: 13, color: primary, fontWeight: 600 }}>See all</button>
          </div>
          <div className="flex flex-col gap-3">
            {activities.map((a, i) => {
              const scoreColor = a.score >= 85 ? '#02C39A' : a.score >= 70 ? '#028090' : '#F59E0B'
              return (
                <div key={i} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div className="rounded-full flex-shrink-0 flex items-center justify-center" style={{ width: 44, height: 44, background: '#EBF8FA' }}>
                    <span className="font-bold" style={{ fontSize: 18, color: primary }}>{a.img}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate" style={{ fontSize: 14, color: '#1A1A2E' }}>{a.name}</p>
                    <p className="truncate" style={{ fontSize: 12, color: '#9CA3AF' }}>{a.action}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold" style={{ fontSize: 13, color: scoreColor }}>{a.score}</span>
                    <span style={{ fontSize: 10, color: '#9CA3AF' }}>{a.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <BottomNav active="owner-dashboard" navigate={navigate} role={role} />
    </div>
  )
}
