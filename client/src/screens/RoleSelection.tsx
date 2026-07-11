import type { NavProps } from '../types'

export default function RoleSelection({ navigate, setRole }: NavProps) {
  const handleRole = (role: 'owner' | 'renter') => {
    setRole(role)
    navigate('auth')
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB', paddingTop: 56 }}>
      {/* Header */}
      <div className="px-6 pb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="rounded-xl" style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #028090, #02C39A)' }}>
            <div className="w-full h-full flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 52 52" fill="none">
                <path d="M26 6L6 20v26h14V32h12v14h14V20L26 6z" fill="white" opacity="0.9" />
              </svg>
            </div>
          </div>
          <span className="font-bold text-sm" style={{ color: '#028090' }}>TrustCore</span>
        </div>
        <h1 className="font-bold leading-tight" style={{ fontSize: 26, color: '#1A1A2E' }}>
          How do you want to<br />use TrustCore?
        </h1>
        <p className="mt-2" style={{ fontSize: 14, color: '#6B7280' }}>
          Choose your role to get started
        </p>
      </div>

      {/* Role cards */}
      <div className="flex-1 px-5 flex flex-col gap-4">
        {/* Owner card */}
        <button
          onClick={() => handleRole('owner')}
          className="w-full rounded-2xl p-6 text-left transition-transform active:scale-95"
          style={{
            background: '#028090',
            boxShadow: '0 8px 24px rgba(2,128,144,0.3)',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.2)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold" style={{ fontSize: 20 }}>I'm an Owner</span>
                <div className="rounded-full px-2 py-0.5" style={{ background: 'rgba(255,255,255,0.25)' }}>
                  <span className="text-white font-semibold" style={{ fontSize: 10 }}>PROPERTY</span>
                </div>
              </div>
              <p className="text-white" style={{ opacity: 0.85, fontSize: 13, lineHeight: 1.5 }}>
                List your property and find verified tenants with background checks
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            {['List Properties', 'Review Tenants', 'Secure Payments'].map((f) => (
              <div key={f} className="flex items-center gap-1">
                <div className="rounded-full" style={{ width: 4, height: 4, background: 'rgba(255,255,255,0.6)' }} />
                <span className="text-white" style={{ fontSize: 11, opacity: 0.8 }}>{f}</span>
              </div>
            ))}
          </div>
        </button>

        {/* Renter card */}
        <button
          onClick={() => handleRole('renter')}
          className="w-full rounded-2xl p-6 text-left transition-transform active:scale-95"
          style={{
            background: '#02C39A',
            boxShadow: '0 8px 24px rgba(2,195,154,0.3)',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.2)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold" style={{ fontSize: 20 }}>I'm a Renter</span>
                <div className="rounded-full px-2 py-0.5" style={{ background: 'rgba(255,255,255,0.25)' }}>
                  <span className="text-white font-semibold" style={{ fontSize: 10 }}>TENANT</span>
                </div>
              </div>
              <p className="text-white" style={{ opacity: 0.85, fontSize: 13, lineHeight: 1.5 }}>
                Find and apply to verified rental homes with escrow-protected payments
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            {['Browse Listings', 'Easy Apply', 'Safe Escrow'].map((f) => (
              <div key={f} className="flex items-center gap-1">
                <div className="rounded-full" style={{ width: 4, height: 4, background: 'rgba(255,255,255,0.6)' }} />
                <span className="text-white" style={{ fontSize: 11, opacity: 0.8 }}>{f}</span>
              </div>
            ))}
          </div>
        </button>
      </div>

      {/* Login link */}
      <div className="py-8 text-center">
        <span style={{ fontSize: 14, color: '#6B7280' }}>Already have an account? </span>
        <button
          onClick={() => navigate('auth')}
          className="font-semibold"
          style={{ fontSize: 14, color: '#028090' }}
        >
          Log in
        </button>
      </div>
    </div>
  )
}
