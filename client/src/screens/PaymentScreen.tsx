import { useState } from 'react'
import type { NavProps } from '../types'

const methods = [
  { id: 'upi', label: 'UPI', icon: '⚡', detail: 'priya@okaxis' },
  { id: 'card', label: 'Debit Card', icon: '💳', detail: '•••• •••• •••• 4521' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦', detail: 'HDFC Bank' },
]

export default function PaymentScreen({ navigate, role }: NavProps) {
  const [selected, setSelected] = useState('upi')
  const [paid, setPaid] = useState(false)
  const primary = role === 'owner' ? '#028090' : '#02C39A'
  const lightBg = role === 'owner' ? '#EBF8FA' : '#E8FBF6'

  if (paid) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center" style={{ background: '#FFFFFF' }}>
        <div className="rounded-full flex items-center justify-center mb-6" style={{ width: 96, height: 96, background: '#E8FBF6' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#02C39A" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22,4 12,14.01 9,11.01" />
          </svg>
        </div>
        <h2 className="font-bold mb-2" style={{ fontSize: 24, color: '#1A1A2E' }}>Payment Successful!</h2>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 8 }}>
          ₹56,000 security deposit held in TrustCore Escrow. You're all set to move in on August 1, 2026.
        </p>
        <div className="rounded-2xl px-4 py-2 mb-8" style={{ background: '#E8FBF6' }}>
          <span className="font-semibold" style={{ fontSize: 12, color: '#02C39A' }}>
            Transaction ID: TC-PAY-826431
          </span>
        </div>
        <button
          onClick={() => navigate('review')}
          className="w-full py-4 rounded-2xl font-semibold text-white mb-3"
          style={{ background: primary }}
        >
          Rate Your Experience
        </button>
        <button
          onClick={() => navigate('home')}
          style={{ fontSize: 14, color: '#9CA3AF', fontWeight: 500 }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#FFFFFF', borderBottom: '1px solid #F0F2F5' }}>
        <div className="px-5 pb-4 flex items-center gap-3">
          <button onClick={() => navigate('agreement')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="font-bold" style={{ fontSize: 18, color: '#1A1A2E' }}>Escrow Payment</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Escrow info card */}
        <div className="rounded-2xl p-5 mb-5" style={{ background: primary }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="font-semibold text-white" style={{ fontSize: 13, opacity: 0.9 }}>TrustCore Escrow</span>
          </div>
          <p className="text-white font-bold" style={{ fontSize: 32 }}>₹56,000</p>
          <p className="text-white mt-1" style={{ fontSize: 13, opacity: 0.8 }}>
            Security deposit · Released on move-in confirmation
          </p>
          <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
            <span className="text-white" style={{ fontSize: 12, opacity: 0.8 }}>Protected by TrustCore · 100% refundable</span>
          </div>
        </div>

        {/* Amount breakdown */}
        <div className="rounded-2xl overflow-hidden mb-5" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #F0F2F5' }}>
            <h3 className="font-bold" style={{ fontSize: 14, color: '#1A1A2E' }}>Payment Breakdown</h3>
          </div>
          {[
            { label: 'Security Deposit (2 months)', amount: '₹56,000' },
            { label: 'TrustCore Platform Fee', amount: '₹499' },
            { label: 'GST (18%)', amount: '₹90' },
          ].map((row, i, arr) => (
            <div key={row.label} className="flex justify-between px-5 py-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F8FAFB' : 'none' }}>
              <span style={{ fontSize: 13, color: '#6B7280' }}>{row.label}</span>
              <span className="font-semibold" style={{ fontSize: 13, color: '#1A1A2E' }}>{row.amount}</span>
            </div>
          ))}
          <div className="flex justify-between px-5 py-4" style={{ borderTop: '2px solid #F0F2F5', background: '#F8FAFB' }}>
            <span className="font-bold" style={{ fontSize: 15, color: '#1A1A2E' }}>Total</span>
            <span className="font-bold" style={{ fontSize: 15, color: primary }}>₹56,589</span>
          </div>
        </div>

        {/* Payment method */}
        <div>
          <h3 className="font-bold mb-3" style={{ fontSize: 14, color: '#1A1A2E' }}>Payment Method</h3>
          <div className="flex flex-col gap-2">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className="rounded-2xl p-4 flex items-center gap-4 text-left"
                style={{
                  background: '#FFFFFF',
                  border: `2px solid ${selected === m.id ? primary : '#E5E7EB'}`,
                  boxShadow: selected === m.id ? `0 0 0 4px ${primary}15` : 'none',
                }}
              >
                <span style={{ fontSize: 24 }}>{m.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold" style={{ fontSize: 14, color: '#1A1A2E' }}>{m.label}</p>
                  <p style={{ fontSize: 12, color: '#9CA3AF' }}>{m.detail}</p>
                </div>
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{ width: 22, height: 22, border: `2px solid ${selected === m.id ? primary : '#E5E7EB'}`, background: selected === m.id ? primary : 'transparent' }}
                >
                  {selected === m.id && (
                    <div className="rounded-full" style={{ width: 8, height: 8, background: 'white' }} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pay button */}
      <div className="px-5 pb-8 pt-4" style={{ borderTop: '1px solid #F0F2F5', background: '#FFFFFF' }}>
        <button
          onClick={() => setPaid(true)}
          className="w-full py-4 rounded-2xl font-semibold text-white"
          style={{ background: primary, fontSize: 16, boxShadow: `0 4px 16px ${primary}40` }}
        >
          Pay ₹56,589 Securely
        </button>
        <p className="text-center mt-2" style={{ fontSize: 11, color: '#9CA3AF' }}>
          Funds held in escrow · Released only after move-in
        </p>
      </div>
    </div>
  )
}
