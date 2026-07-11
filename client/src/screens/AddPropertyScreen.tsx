import { useState } from 'react'
import type { NavProps } from '../types'

const steps = ['Details', 'Photos', 'Pricing', 'Amenities']

export default function AddPropertyScreen({ navigate, role }: NavProps) {
  const [step, setStep] = useState(0)
  const primary = '#028090'
  const lightBg = '#EBF8FA'

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#FFFFFF', borderBottom: '1px solid #F0F2F5' }}>
        <div className="px-5 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('owner-dashboard')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <h1 className="font-bold" style={{ fontSize: 18, color: '#1A1A2E' }}>Add New Property</h1>
          </div>

          {/* Step indicator */}
          <div className="flex gap-2 items-center">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-full flex items-center justify-center font-bold"
                    style={{
                      width: 28,
                      height: 28,
                      background: i <= step ? primary : '#F0F2F5',
                      color: i <= step ? '#FFFFFF' : '#9CA3AF',
                      fontSize: 12,
                    }}
                  >
                    {i < step ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                    ) : i + 1}
                  </div>
                  <span style={{ fontSize: 9, color: i === step ? primary : '#9CA3AF', marginTop: 4, fontWeight: 600 }}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="mb-4 h-px flex-1" style={{ background: i < step ? primary : '#E5E7EB', minWidth: 20 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold" style={{ fontSize: 17, color: '#1A1A2E' }}>Property Details</h2>
            {[
              { label: 'Property Title', placeholder: 'e.g. Modern 2BHK in Koramangala' },
              { label: 'Address Line 1', placeholder: 'Street, Building, Apartment no.' },
              { label: 'City', placeholder: 'e.g. Bengaluru' },
              { label: 'PIN Code', placeholder: '560001' },
            ].map((f) => (
              <div key={f.label}>
                <label className="block mb-1.5 font-medium" style={{ fontSize: 13, color: '#6B7280' }}>{f.label}</label>
                <input
                  placeholder={f.placeholder}
                  className="w-full rounded-xl px-4"
                  style={{ height: 48, border: '1.5px solid #E5E7EB', fontSize: 14, color: '#1A1A2E', background: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif' }}
                />
              </div>
            ))}
            <div>
              <label className="block mb-1.5 font-medium" style={{ fontSize: 13, color: '#6B7280' }}>Property Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['Apartment', 'Villa', 'PG/Co-living'].map((t, i) => (
                  <button key={t} className="rounded-xl py-3 font-medium" style={{ background: i === 0 ? lightBg : '#FFFFFF', border: `1.5px solid ${i === 0 ? primary : '#E5E7EB'}`, color: i === 0 ? primary : '#6B7280', fontSize: 13 }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: 'Bedrooms', val: '2' }, { label: 'Bathrooms', val: '2' }].map((f) => (
                <div key={f.label}>
                  <label className="block mb-1.5 font-medium" style={{ fontSize: 13, color: '#6B7280' }}>{f.label}</label>
                  <input defaultValue={f.val} className="w-full rounded-xl px-4" style={{ height: 48, border: '1.5px solid #E5E7EB', fontSize: 14, color: '#1A1A2E', background: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold" style={{ fontSize: 17, color: '#1A1A2E' }}>Property Photos</h2>
            <p style={{ fontSize: 13, color: '#9CA3AF' }}>Upload at least 3 photos. Clear, well-lit photos get 3x more enquiries.</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-2xl col-span-2 row-span-2 overflow-hidden relative" style={{ height: 160, background: '#E8FBF6', border: `2px dashed ${primary}` }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21,15 16,10 5,21" />
                  </svg>
                  <span style={{ fontSize: 12, color: primary, fontWeight: 600 }}>Add Main Photo</span>
                </div>
              </div>
              {[1,2,3,4].map((i) => (
                <div key={i} className="rounded-xl flex items-center justify-center" style={{ height: 72, background: '#F8FAFB', border: '1.5px dashed #E5E7EB' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: lightBg }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <p style={{ fontSize: 12, color: primary }}>Max 10 photos · JPG or PNG · Max 10 MB each</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold" style={{ fontSize: 17, color: '#1A1A2E' }}>Pricing</h2>
            {[
              { label: 'Monthly Rent (₹)', placeholder: '28,000' },
              { label: 'Security Deposit (₹)', placeholder: '56,000' },
              { label: 'Maintenance (₹/mo)', placeholder: '1,500' },
            ].map((f) => (
              <div key={f.label}>
                <label className="block mb-1.5 font-medium" style={{ fontSize: 13, color: '#6B7280' }}>{f.label}</label>
                <input placeholder={f.placeholder} className="w-full rounded-xl px-4" style={{ height: 48, border: '1.5px solid #E5E7EB', fontSize: 14, color: '#1A1A2E', background: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif' }} />
              </div>
            ))}
            <div>
              <label className="block mb-1.5 font-medium" style={{ fontSize: 13, color: '#6B7280' }}>Minimum Lease Period</label>
              <div className="flex gap-2">
                {['6 Months', '11 Months', '1 Year', '2 Years'].map((t, i) => (
                  <button key={t} className="rounded-xl py-2 px-3 font-medium" style={{ background: i === 1 ? lightBg : '#FFFFFF', border: `1.5px solid ${i === 1 ? primary : '#E5E7EB'}`, color: i === 1 ? primary : '#6B7280', fontSize: 12, flex: 1 }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1.5 font-medium" style={{ fontSize: 13, color: '#6B7280' }}>Available From</label>
              <input type="date" defaultValue="2026-08-01" className="w-full rounded-xl px-4" style={{ height: 48, border: '1.5px solid #E5E7EB', fontSize: 14, color: '#1A1A2E', background: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif' }} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-bold" style={{ fontSize: 17, color: '#1A1A2E' }}>Amenities</h2>
            <p style={{ fontSize: 13, color: '#9CA3AF' }}>Select all that apply to your property</p>
            <div className="grid grid-cols-3 gap-3">
              {['Furnished', 'WiFi', 'Parking', 'AC', 'Gym', 'Swimming Pool', 'Security', '24h Water', 'Power Backup', 'Laundry', 'Lift', 'Garden'].map((a, i) => (
                <button
                  key={a}
                  className="rounded-xl py-3 flex flex-col items-center gap-1"
                  style={{
                    background: [0,1,2,4].includes(i) ? lightBg : '#FFFFFF',
                    border: `1.5px solid ${[0,1,2,4].includes(i) ? primary : '#E5E7EB'}`,
                  }}
                >
                  <span style={{ fontSize: 20 }}>
                    {['🛋️','📶','🅿️','❄️','🏋️','🏊','🔒','💧','⚡','🧺','🛗','🌿'][i]}
                  </span>
                  <span style={{ fontSize: 11, color: [0,1,2,4].includes(i) ? primary : '#6B7280', fontWeight: 600 }}>{a}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-5 pb-8 pt-4 flex gap-3" style={{ borderTop: '1px solid #F0F2F5', background: '#FFFFFF' }}>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 py-4 rounded-2xl font-semibold"
            style={{ background: '#F8FAFB', color: '#6B7280', border: '1.5px solid #E5E7EB', fontSize: 15 }}
          >
            Back
          </button>
        )}
        <button
          onClick={() => step < 3 ? setStep(step + 1) : navigate('rental-requests')}
          className="flex-1 py-4 rounded-2xl font-semibold text-white"
          style={{ background: primary, fontSize: 15, boxShadow: `0 4px 16px ${primary}40` }}
        >
          {step < 3 ? 'Continue' : 'Publish Listing'}
        </button>
      </div>
    </div>
  )
}
