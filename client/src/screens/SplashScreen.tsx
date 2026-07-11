import { useEffect } from 'react'
import type { NavProps } from '../types'

export default function SplashScreen({ navigate }: NavProps) {
  useEffect(() => {
    const t = setTimeout(() => navigate('role-selection'), 2200)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div
      className="flex flex-col items-center justify-center h-full"
      style={{ background: 'linear-gradient(160deg, #028090 0%, #00A896 50%, #02C39A 100%)' }}
    >
      {/* Logo mark */}
      <div className="flex flex-col items-center gap-6">
        <div
          className="flex items-center justify-center rounded-3xl"
          style={{ width: 88, height: 88, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <path
              d="M26 6L6 20v26h14V32h12v14h14V20L26 6z"
              fill="white"
              opacity="0.9"
            />
            <circle cx="26" cy="22" r="6" fill="white" />
            <path d="M20 22l6-6 6 6" stroke="rgba(2,128,144,0.6)" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-white font-bold" style={{ fontSize: 36, letterSpacing: -1 }}>
            TrustCore
          </h1>
          <p className="text-white mt-1" style={{ opacity: 0.8, fontSize: 15 }}>
            Rental, verified and secured
          </p>
        </div>

        {/* Trust badges row */}
        <div className="flex gap-3 mt-4">
          {['Verified Owners', 'Rental Passport', 'Escrow Safe'].map((label) => (
            <div
              key={label}
              className="rounded-full px-3 py-1"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <span className="text-white font-medium" style={{ fontSize: 10 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom loader */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 1 ? 20 : 6,
                height: 6,
                background: 'rgba(255,255,255,0.6)',
                transition: 'width 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
