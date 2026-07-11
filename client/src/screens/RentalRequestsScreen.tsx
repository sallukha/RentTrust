import type { NavProps } from '../types'
import BottomNav from '../components/BottomNav'

const requests = [
  {
    name: 'Arjun Kapoor',
    initials: 'A',
    property: '2BHK Koramangala',
    score: 88,
    status: 'pending',
    applied: '2 hours ago',
    income: '₹1.2L/mo',
    occupation: 'Software Engineer, Google',
    tags: ['Employed', 'No Pets', 'Non-smoker'],
  },
  {
    name: 'Meera Nair',
    initials: 'M',
    property: '3BHK Indiranagar',
    score: 94,
    status: 'pending',
    applied: '5 hours ago',
    income: '₹1.8L/mo',
    occupation: 'Product Manager, Razorpay',
    tags: ['Employed', 'Has Pets', 'Non-smoker'],
  },
  {
    name: 'Rahul Desai',
    initials: 'R',
    property: '2BHK Koramangala',
    score: 62,
    status: 'declined',
    applied: '1 day ago',
    income: '₹65,000/mo',
    occupation: 'Freelancer',
    tags: ['Self-employed', 'No Pets'],
  },
]

export default function RentalRequestsScreen({ navigate, role, setRole }: NavProps) {
  const primary = '#028090'

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#028090', paddingBottom: 20 }}>
        <div className="px-5">
          <div className="flex items-center gap-3 mb-1">
            <button onClick={() => navigate('owner-dashboard')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <h1 className="font-bold text-white" style={{ fontSize: 20 }}>Rental Requests</h1>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', paddingLeft: 32 }}>
            7 pending · 12 total applications
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #F0F2F5' }}>
        <div className="flex px-5">
          {['Pending', 'Accepted', 'Declined'].map((t, i) => (
            <button key={t} className="py-3 mr-6 font-semibold" style={{
              fontSize: 14,
              color: i === 0 ? primary : '#9CA3AF',
              borderBottom: i === 0 ? `2px solid ${primary}` : '2px solid transparent',
            }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col gap-4">
          {requests.map((r, i) => {
            const scoreColor = r.score >= 85 ? '#02C39A' : r.score >= 70 ? '#F59E0B' : '#EF4444'
            const statusColor = r.status === 'pending' ? '#F59E0B' : r.status === 'declined' ? '#EF4444' : '#02C39A'

            return (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                {/* Card header */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full flex-shrink-0 flex items-center justify-center" style={{ width: 48, height: 48, background: '#EBF8FA' }}>
                      <span className="font-bold" style={{ fontSize: 20, color: primary }}>{r.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold" style={{ fontSize: 15, color: '#1A1A2E' }}>{r.name}</span>
                        <div className="rounded-full px-2 py-0.5" style={{ background: `${scoreColor}15` }}>
                          <span className="font-bold" style={{ fontSize: 11, color: scoreColor }}>{r.score}</span>
                        </div>
                        <div className="ml-auto rounded-full px-2 py-0.5" style={{ background: `${statusColor}15` }}>
                          <span className="font-semibold capitalize" style={{ fontSize: 10, color: statusColor }}>{r.status}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 12, color: '#9CA3AF' }}>{r.occupation}</p>
                      <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                        For: <span className="font-medium" style={{ color: '#1A1A2E' }}>{r.property}</span> · {r.applied}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {r.tags.map((tag) => (
                      <span key={tag} className="rounded-full px-2.5 py-1 font-medium" style={{ background: '#F8FAFB', border: '1px solid #E5E7EB', fontSize: 11, color: '#6B7280' }}>
                        {tag}
                      </span>
                    ))}
                    <span className="rounded-full px-2.5 py-1 font-medium" style={{ background: '#EBF8FA', border: '1px solid #028090' + '30', fontSize: 11, color: primary }}>
                      Income: {r.income}
                    </span>
                  </div>
                </div>

                {/* Passport preview button + actions */}
                {r.status === 'pending' && (
                  <div style={{ borderTop: '1px solid #F0F2F5' }}>
                    <button
                      onClick={() => navigate('passport')}
                      className="w-full flex items-center justify-between px-4 py-3"
                      style={{ background: '#F8FAFB' }}
                    >
                      <span style={{ fontSize: 13, color: '#6B7280' }}>View Rental Passport</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                    <div className="flex gap-0" style={{ borderTop: '1px solid #F0F2F5' }}>
                      <button
                        className="flex-1 py-3.5 font-semibold"
                        style={{ color: '#EF4444', fontSize: 14, borderRight: '1px solid #F0F2F5' }}
                      >
                        Decline
                      </button>
                      <button
                        className="flex-1 py-3.5 font-semibold text-white"
                        onClick={() => navigate('chat')}
                        style={{ background: primary, fontSize: 14, borderRadius: '0 0 16px 0' }}
                      >
                        Accept & Chat
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav active="rental-requests" navigate={navigate} role={role} />
    </div>
  )
}
