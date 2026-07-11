import { useState } from 'react'
import type { NavProps } from '../types'

export default function AgreementScreen({ navigate, role }: NavProps) {
  const [signed, setSigned] = useState(false)
  const primary = role === 'owner' ? '#028090' : '#02C39A'
  const lightBg = role === 'owner' ? '#EBF8FA' : '#E8FBF6'

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#FFFFFF', borderBottom: '1px solid #F0F2F5' }}>
        <div className="px-5 pb-4 flex items-center gap-3">
          <button onClick={() => navigate('chat')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <div>
            <h1 className="font-bold" style={{ fontSize: 18, color: '#1A1A2E' }}>Digital Rental Agreement</h1>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>11-month lease · Koramangala 2BHK</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Status bar */}
        <div className="mx-5 mt-4 rounded-2xl p-3 flex items-center gap-3" style={{ background: signed ? '#E8FBF6' : lightBg, border: `1px solid ${primary}30` }}>
          <div className="rounded-full flex items-center justify-center" style={{ width: 32, height: 32, background: primary }}>
            {signed ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            )}
          </div>
          <div>
            <p className="font-semibold" style={{ fontSize: 13, color: '#1A1A2E' }}>
              {signed ? 'Agreement Signed — Both Parties' : 'Awaiting your e-signature'}
            </p>
            <p style={{ fontSize: 11, color: '#9CA3AF' }}>
              {signed ? 'Escrowed · Legally binding' : 'Owner has signed. Your turn.'}
            </p>
          </div>
        </div>

        {/* Contract content */}
        <div className="mx-5 mt-4 rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          {/* Contract header */}
          <div className="px-5 py-4" style={{ background: primary, borderRadius: '16px 16px 0 0' }}>
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
              <span className="font-bold text-white" style={{ fontSize: 14 }}>RENTAL AGREEMENT</span>
            </div>
            <p className="text-white mt-1" style={{ fontSize: 11, opacity: 0.8 }}>Document ID: TC-2026-08-KRM-4821</p>
          </div>

          <div className="px-5 py-5">
            {[
              {
                title: '1. Parties',
                content: 'This agreement is between Rajesh Mehta ("Landlord") and Priya Sharma ("Tenant") for the residential property located at Flat 3B, Prestige Park, 12th Cross, Koramangala 5th Block, Bengaluru — 560095.',
              },
              {
                title: '2. Term',
                content: 'The lease period is 11 (eleven) months commencing August 1, 2026 and ending June 30, 2027. This lease may be renewed by mutual written consent.',
              },
              {
                title: '3. Rent & Escrow',
                content: 'Monthly rent of ₹28,000 is due on the 1st of each month. Payments are processed via TrustCore Escrow and released to the Landlord after Tenant confirms occupancy.',
              },
              {
                title: '4. Security Deposit',
                content: 'A refundable security deposit of ₹56,000 (2 months\' rent) is held in TrustCore Escrow. It will be released within 7 days of vacating, subject to property condition.',
              },
              {
                title: '5. Maintenance',
                content: 'The Tenant agrees to maintain the property in good condition. Monthly maintenance charges of ₹1,500 cover common area upkeep.',
              },
              {
                title: '6. Termination',
                content: 'Either party may terminate this agreement with 60 days\' written notice. Early termination by Tenant forfeits 1 month\'s deposit.',
              },
            ].map((section) => (
              <div key={section.title} className="mb-5">
                <h4 className="font-bold mb-2" style={{ fontSize: 13, color: '#1A1A2E' }}>{section.title}</h4>
                <p style={{ fontSize: 12.5, color: '#6B7280', lineHeight: 1.8 }}>{section.content}</p>
              </div>
            ))}

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-5" style={{ borderTop: '1px solid #F0F2F5' }}>
              <div>
                <p className="font-semibold mb-2" style={{ fontSize: 12, color: '#6B7280' }}>Landlord Signature</p>
                <div className="rounded-xl flex items-center justify-center" style={{ height: 56, background: '#E8FBF6', border: '1.5px solid #02C39A' }}>
                  <span style={{ fontSize: 18, fontFamily: 'serif', color: '#028090', fontStyle: 'italic' }}>R. Mehta</span>
                </div>
                <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>Signed · Jul 8, 2026</p>
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ fontSize: 12, color: '#6B7280' }}>Tenant Signature</p>
                <div className="rounded-xl flex items-center justify-center" style={{ height: 56, background: signed ? '#E8FBF6' : '#F8FAFB', border: `1.5px ${signed ? 'solid #02C39A' : 'dashed #E5E7EB'}` }}>
                  {signed ? (
                    <span style={{ fontSize: 18, fontFamily: 'serif', color: '#028090', fontStyle: 'italic' }}>P. Sharma</span>
                  ) : (
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>Awaiting...</span>
                  )}
                </div>
                <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>
                  {signed ? 'Signed · Now' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* CTA */}
      <div className="px-5 pb-8 pt-4" style={{ borderTop: '1px solid #F0F2F5', background: '#FFFFFF' }}>
        {signed ? (
          <button
            onClick={() => navigate('payment')}
            className="w-full py-4 rounded-2xl font-semibold text-white"
            style={{ background: primary, fontSize: 16, boxShadow: `0 4px 16px ${primary}40` }}
          >
            Proceed to Pay Security Deposit
          </button>
        ) : (
          <button
            onClick={() => setSigned(true)}
            className="w-full py-4 rounded-2xl font-semibold text-white"
            style={{ background: primary, fontSize: 16, boxShadow: `0 4px 16px ${primary}40` }}
          >
            Sign Agreement with OTP
          </button>
        )}
      </div>
    </div>
  )
}
