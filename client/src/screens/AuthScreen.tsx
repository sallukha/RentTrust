import { useState } from 'react'
import type { NavProps } from '../types'

export default function AuthScreen({ navigate, role, setRole }: NavProps) {
  const [tab, setTab] = useState<'signup' | 'login'>('signup')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [taxId, setTaxId] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  const isOwner = role === 'owner'
  const primary = isOwner ? '#028090' : '#02C39A'
  const lightBg = isOwner ? '#EBF8FA' : '#E8FBF6'

  const inputStyle = (field: string) => ({
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: `1.5px solid ${focused === field ? primary : '#E5E7EB'}`,
    fontSize: 15,
    color: '#1A1A2E',
    background: '#FFFFFF',
    transition: 'border-color 0.15s',
    fontFamily: 'Inter, system-ui, sans-serif',
  })

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 56, background: '#FFFFFF', borderBottom: '1px solid #F0F2F5' }}>
        <div className="px-5 pb-5">
          <button
            onClick={() => navigate('role-selection')}
            className="flex items-center gap-2 mb-5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>

          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-bold" style={{ fontSize: 22, color: '#1A1A2E' }}>
              {isOwner ? 'Owner' : 'Renter'} {tab === 'signup' ? 'Sign Up' : 'Log In'}
            </h1>
            <div
              className="rounded-full px-2.5 py-1"
              style={{ background: lightBg }}
            >
              <span className="font-semibold" style={{ fontSize: 11, color: primary }}>
                {isOwner ? 'OWNER' : 'RENTER'}
              </span>
            </div>
          </div>

          {/* Toggle tabs */}
          <div
            className="flex mt-4 rounded-xl p-1"
            style={{ background: '#F0F2F5' }}
          >
            {(['signup', 'login'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2 rounded-lg font-semibold transition-all"
                style={{
                  fontSize: 14,
                  background: tab === t ? '#FFFFFF' : 'transparent',
                  color: tab === t ? primary : '#9CA3AF',
                  boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {t === 'signup' ? 'Sign Up' : 'Log In'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="flex flex-col gap-3">
          {tab === 'signup' && (
            <div>
              <label className="block mb-1.5 font-medium" style={{ fontSize: 13, color: '#6B7280' }}>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                style={inputStyle('name')}
              />
            </div>
          )}

          <div>
            <label className="block mb-1.5 font-medium" style={{ fontSize: 13, color: '#6B7280' }}>Mobile Number</label>
            <div className="flex gap-2">
              <div
                className="flex items-center justify-center rounded-xl px-3"
                style={{ border: '1.5px solid #E5E7EB', background: '#FFFFFF', minWidth: 64 }}
              >
                <span style={{ fontSize: 15, color: '#1A1A2E' }}>+91</span>
              </div>
              <input
                type="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
                style={{ ...inputStyle('phone'), flex: 1 }}
              />
            </div>
          </div>

          {tab === 'signup' && (
            <div>
              <label className="block mb-1.5 font-medium" style={{ fontSize: 13, color: '#6B7280' }}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                style={inputStyle('email')}
              />
            </div>
          )}

          {tab === 'signup' && isOwner && (
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <label className="font-medium" style={{ fontSize: 13, color: '#6B7280' }}>
                  Business / Property Tax ID
                </label>
                <span
                  className="rounded-full px-2 py-0.5"
                  style={{ background: '#F0F2F5', fontSize: 10, color: '#9CA3AF' }}
                >
                  Optional
                </span>
              </div>
              <input
                type="text"
                placeholder="GSTIN or Tax ID number"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                onFocus={() => setFocused('taxid')}
                onBlur={() => setFocused(null)}
                style={inputStyle('taxid')}
              />
            </div>
          )}
        </div>

        {/* Info box */}
        <div
          className="mt-5 rounded-xl p-4 flex gap-3"
          style={{ background: lightBg }}
        >
          <div className="mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p style={{ fontSize: 12.5, color: primary, lineHeight: 1.6 }}>
            {isOwner
              ? "You'll be able to list properties and manage tenant requests after OTP verification."
              : "You'll be able to browse verified listings and apply after OTP verification."}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-8 pt-4" style={{ borderTop: '1px solid #F0F2F5', background: '#FFFFFF' }}>
        <button
          onClick={() => navigate('otp')}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-transform active:scale-95"
          style={{ background: primary, fontSize: 16, boxShadow: `0 4px 16px ${primary}40` }}
        >
          Send OTP
        </button>
        <p className="text-center mt-3" style={{ fontSize: 12, color: '#9CA3AF' }}>
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  )
}
