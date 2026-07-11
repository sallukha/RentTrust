import { useState } from 'react'
import type { NavProps } from '../types'

const slides = [
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#EBF8FA" />
        <circle cx="32" cy="32" r="20" fill="none" stroke="#028090" strokeWidth="4" strokeDasharray="20 8" />
        <text x="32" y="38" textAnchor="middle" fontFamily="Inter" fontWeight="700" fontSize="16" fill="#028090">87</text>
      </svg>
    ),
    title: 'Your Trust Score',
    desc: 'TrustCore scores every user 0–100 based on payment history, identity verification, and rental behavior. Higher scores unlock better deals.',
    color: '#028090',
    bg: '#EBF8FA',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="14" width="48" height="36" rx="8" fill="#E8FBF6" />
        <rect x="16" y="22" width="12" height="14" rx="3" fill="#02C39A" />
        <rect x="32" y="22" width="16" height="4" rx="2" fill="#02C39A" opacity="0.5" />
        <rect x="32" y="30" width="12" height="4" rx="2" fill="#02C39A" opacity="0.3" />
        <circle cx="50" cy="46" r="10" fill="#02C39A" />
        <path d="M46 46l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Rental Passport',
    desc: 'Your verified rental history, identity, and references in one portable profile. Share it with any landlord on TrustCore instantly.',
    color: '#02C39A',
    bg: '#E8FBF6',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="10" y="18" width="44" height="30" rx="8" fill="#EBF8FA" />
        <path d="M22 28h20M22 36h14" stroke="#028090" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="20" r="10" fill="#028090" />
        <path d="M45 20l3 3 7-6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Escrow Payments',
    desc: 'Your rent is held securely in escrow and only released to the owner once you confirm move-in. Full protection, no risk.',
    color: '#028090',
    bg: '#EBF8FA',
  },
]

export default function OnboardingScreen({ navigate, role }: NavProps) {
  const [slide, setSlide] = useState(0)
  const isOwner = role === 'owner'
  const primary = isOwner ? '#028090' : '#02C39A'

  const handleNext = () => {
    if (slide < slides.length - 1) setSlide(slide + 1)
    else navigate(isOwner ? 'owner-dashboard' : 'home')
  }

  const s = slides[slide]

  return (
    <div className="flex flex-col h-full" style={{ background: '#FFFFFF' }}>
      <div className="flex items-center justify-between px-5" style={{ paddingTop: 56, paddingBottom: 16 }}>
        <div className="w-8" />
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === slide ? 24 : 8,
                height: 8,
                background: i === slide ? primary : '#E5E7EB',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => navigate(isOwner ? 'owner-dashboard' : 'home')}
          style={{ fontSize: 14, color: '#9CA3AF', fontWeight: 500 }}
        >
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div
          className="rounded-3xl flex items-center justify-center mb-8"
          style={{ width: 120, height: 120, background: s.bg }}
        >
          {s.icon}
        </div>

        <h2 className="font-bold mb-4" style={{ fontSize: 26, color: '#1A1A2E', lineHeight: 1.2 }}>
          {s.title}
        </h2>
        <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, maxWidth: 280 }}>
          {s.desc}
        </p>
      </div>

      <div className="px-5 pb-10">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-transform active:scale-95"
          style={{ background: primary, fontSize: 16, boxShadow: `0 4px 16px ${primary}40` }}
        >
          {slide < slides.length - 1 ? 'Next' : "Let's Go"}
        </button>
      </div>
    </div>
  )
}
