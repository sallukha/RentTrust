import type { NavProps } from '../types'
import BottomNav from '../components/BottomNav'

export default function SettingsScreen({ navigate, role, setRole }: NavProps) {
  const isOwner = role === 'owner'
  const primary = isOwner ? '#028090' : '#02C39A'
  const lightBg = isOwner ? '#EBF8FA' : '#E8FBF6'

  const sections = [
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Edit Profile', sub: 'Name, photo, bio' },
        { icon: '📱', label: 'Mobile Number', sub: '+91 98765 43210 · Verified' },
        { icon: '📧', label: 'Email Address', sub: 'priya@example.com · Verified' },
        { icon: '🔐', label: 'KYC / Identity Verification', sub: 'Aadhaar verified', arrow: true },
      ],
    },
    {
      title: 'Payments',
      items: [
        { icon: '💳', label: 'Payment Methods', sub: '2 methods linked' },
        { icon: '🏦', label: 'Bank Account', sub: 'HDFC •••• 4521 · For deposits' },
        { icon: '🧾', label: 'Transaction History', sub: 'View all transactions' },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { icon: '🔔', label: 'Push Notifications', toggle: true, enabled: true },
        { icon: '💬', label: 'SMS Alerts', toggle: true, enabled: true },
        { icon: '📧', label: 'Email Digest', toggle: true, enabled: false },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        { icon: '🔒', label: 'Two-Factor Auth', sub: 'OTP-based · Enabled', toggle: false },
        { icon: '👁️', label: 'Profile Visibility', sub: 'Visible to verified users only' },
        { icon: '📊', label: 'Data & Privacy', sub: 'Manage your data' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: '❓', label: 'Help Center', sub: 'FAQs and guides' },
        { icon: '💬', label: 'Contact Support', sub: 'Chat with our team' },
        { icon: '⭐', label: 'Rate TrustCore', sub: 'Share your feedback' },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#FFFFFF', borderBottom: '1px solid #F0F2F5', paddingBottom: 16 }}>
        <div className="px-5">
          <h1 className="font-bold" style={{ fontSize: 22, color: '#1A1A2E' }}>Settings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile card */}
        <div className="mx-5 mt-4 rounded-2xl p-4 flex items-center gap-4" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="rounded-full flex items-center justify-center" style={{ width: 60, height: 60, background: lightBg }}>
            <span className="font-bold" style={{ fontSize: 26, color: primary }}>P</span>
          </div>
          <div className="flex-1">
            <p className="font-bold" style={{ fontSize: 17, color: '#1A1A2E' }}>Priya Sharma</p>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>priya@example.com</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div
                className="rounded-full px-2 py-0.5"
                style={{ background: lightBg }}
              >
                <span className="font-semibold" style={{ fontSize: 10, color: primary }}>
                  {isOwner ? 'OWNER' : 'RENTER'}
                </span>
              </div>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>Trust Score: {isOwner ? '94' : '74'}</span>
            </div>
          </div>
          <button
            className="rounded-xl px-3 py-2 font-semibold"
            style={{ background: lightBg, color: primary, fontSize: 12, border: `1px solid ${primary}30` }}
          >
            Edit
          </button>
        </div>

        {/* Switch role */}
        <div className="mx-5 mt-3 rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: '#FFFFFF', border: '1.5px solid #E5E7EB' }}>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 18 }}>{isOwner ? '🏠' : '🔑'}</span>
            <div>
              <p className="font-semibold" style={{ fontSize: 13, color: '#1A1A2E' }}>
                Signed in as {isOwner ? 'Owner' : 'Renter'}
              </p>
              <p style={{ fontSize: 11, color: '#9CA3AF' }}>Switch to {isOwner ? 'Renter' : 'Owner'} mode</p>
            </div>
          </div>
          <button
            onClick={() => { setRole(isOwner ? 'renter' : 'owner'); navigate(isOwner ? 'home' : 'owner-dashboard') }}
            className="rounded-xl px-3 py-2 font-semibold"
            style={{ background: primary, color: 'white', fontSize: 11 }}
          >
            Switch
          </button>
        </div>

        {/* Sections */}
        <div className="px-5 py-4 flex flex-col gap-5">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="font-bold mb-2" style={{ fontSize: 12, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {section.title}
              </p>
              <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                {section.items.map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 px-4 py-4"
                    style={{ borderBottom: i < section.items.length - 1 ? '1px solid #F8FAFB' : 'none' }}
                  >
                    <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold" style={{ fontSize: 14, color: '#1A1A2E' }}>{item.label}</p>
                      {item.sub && (
                        <p className="truncate" style={{ fontSize: 12, color: '#9CA3AF' }}>{item.sub}</p>
                      )}
                    </div>
                    {item.toggle ? (
                      <div
                        className="rounded-full transition-colors"
                        style={{
                          width: 44,
                          height: 24,
                          background: (item as any).enabled ? primary : '#E5E7EB',
                          position: 'relative',
                          flexShrink: 0,
                        }}
                      >
                        <div
                          className="absolute rounded-full bg-white"
                          style={{
                            width: 20,
                            height: 20,
                            top: 2,
                            left: (item as any).enabled ? 22 : 2,
                            transition: 'left 0.2s',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                          }}
                        />
                      </div>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Logout */}
          <button
            onClick={() => { setRole(null); navigate('role-selection') }}
            className="w-full py-4 rounded-2xl font-semibold"
            style={{ background: '#FEF2F2', color: '#EF4444', fontSize: 15, border: '1px solid #FECACA' }}
          >
            Log Out
          </button>

          <div className="text-center pb-4">
            <p style={{ fontSize: 11, color: '#D1D5DB' }}>TrustCore v2.4.1 · Bengaluru, India</p>
          </div>
        </div>
      </div>

      <BottomNav active="settings" navigate={navigate} role={role} />
    </div>
  )
}
