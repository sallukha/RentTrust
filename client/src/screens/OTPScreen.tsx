import { useState, useRef, useEffect } from 'react'
import type { NavProps } from '../types'

export default function OTPScreen({ navigate, role }: NavProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const primary = role === 'owner' ? '#028090' : '#02C39A'
  const lightBg = role === 'owner' ? '#EBF8FA' : '#E8FBF6'

  useEffect(() => {
    if (timer <= 0) return
    const t = setInterval(() => setTimer((p) => p - 1), 1000)
    return () => clearInterval(t)
  }, [timer])

  const handleChange = (val: string, idx: number) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...otp]
    next[idx] = val
    setOtp(next)
    if (val && idx < 5) inputs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
    }
  }

  const handleVerify = () => {
    if (role === 'owner') navigate('onboarding')
    else navigate('onboarding')
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 56, background: '#FFFFFF', borderBottom: '1px solid #F0F2F5' }}>
        <div className="px-5 pb-5">
          <button onClick={() => navigate('auth')} className="flex items-center gap-2 mb-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="font-bold" style={{ fontSize: 22, color: '#1A1A2E' }}>Verify your number</h1>
          <p className="mt-1" style={{ fontSize: 14, color: '#6B7280' }}>
            OTP sent to <span className="font-semibold" style={{ color: '#1A1A2E' }}>+91 •••••• 3210</span>
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-5 pt-10">
        {/* OTP boxes */}
        <div className="flex justify-between gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="text-center font-bold rounded-2xl"
              style={{
                width: 48,
                height: 56,
                fontSize: 22,
                border: `2px solid ${digit ? primary : '#E5E7EB'}`,
                background: digit ? lightBg : '#FFFFFF',
                color: primary,
                fontFamily: 'Inter, system-ui, sans-serif',
                transition: 'all 0.15s',
              }}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center mt-8 gap-1">
          {timer > 0 ? (
            <p style={{ fontSize: 14, color: '#9CA3AF' }}>
              Resend OTP in{' '}
              <span className="font-semibold" style={{ color: '#1A1A2E' }}>
                00:{String(timer).padStart(2, '0')}
              </span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="font-semibold"
              style={{ fontSize: 14, color: primary }}
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Visual hint */}
        <div
          className="mt-8 rounded-2xl p-5 flex gap-4 items-start"
          style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: lightBg, flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4C1.6 2.32 2.44 1.42 3.52 1.4h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.11 6.11l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold" style={{ fontSize: 14, color: '#1A1A2E' }}>Check your messages</p>
            <p className="mt-1" style={{ fontSize: 12.5, color: '#9CA3AF', lineHeight: 1.6 }}>
              Enter the 6-digit code sent via SMS. It expires in 5 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-8 pt-4" style={{ borderTop: '1px solid #F0F2F5', background: '#FFFFFF' }}>
        <button
          onClick={handleVerify}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-transform active:scale-95"
          style={{
            background: otp.every(Boolean) ? primary : '#D1D5DB',
            fontSize: 16,
            boxShadow: otp.every(Boolean) ? `0 4px 16px ${primary}40` : 'none',
          }}
        >
          Verify & Continue
        </button>
      </div>
    </div>
  )
}
