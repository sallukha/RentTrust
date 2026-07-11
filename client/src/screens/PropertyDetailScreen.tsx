import { useState } from 'react'
import type { NavProps } from '../types'

const amenities = [
  { icon: '🛋️', label: 'Furnished' },
  { icon: '🅿️', label: 'Parking' },
  { icon: '💧', label: '24h Water' },
  { icon: '🏋️', label: 'Gym' },
  { icon: '📶', label: 'WiFi' },
  { icon: '🔒', label: 'Security' },
  { icon: '🌿', label: 'Garden' },
  { icon: '🧺', label: 'Laundry' },
]

const images = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop&auto=format',
]

export default function PropertyDetailScreen({ navigate }: NavProps) {
  const [activeImg, setActiveImg] = useState(0)

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Image carousel */}
      <div className="relative" style={{ height: 260 }}>
        <img
          src={images[activeImg]}
          alt="Property"
          className="w-full h-full object-cover"
          style={{ background: '#E5E7EB' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 100%)' }} />

        {/* Back */}
        <button
          onClick={() => navigate('home')}
          className="absolute top-12 left-4 rounded-full flex items-center justify-center"
          style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.9)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Image dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button key={i} onClick={() => setActiveImg(i)}>
              <div className="rounded-full" style={{ width: i === activeImg ? 20 : 6, height: 6, background: 'white', opacity: i === activeImg ? 1 : 0.5, transition: 'all 0.2s' }} />
            </button>
          ))}
        </div>

        {/* Verified + score overlay */}
        <div className="absolute bottom-10 left-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: 'rgba(2,128,144,0.9)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
            <span className="text-white font-semibold" style={{ fontSize: 11 }}>TrustCore Verified</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white rounded-t-3xl -mt-4 px-5 pt-5">
          {/* Title & price */}
          <div className="flex justify-between items-start mb-1">
            <div>
              <h1 className="font-bold" style={{ fontSize: 20, color: '#1A1A2E' }}>Modern 2BHK in Koramangala</h1>
              <div className="flex items-center gap-1 mt-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span style={{ fontSize: 13, color: '#9CA3AF' }}>Koramangala, Bengaluru</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold" style={{ fontSize: 20, color: '#1A1A2E' }}>₹28,000</span>
              <p style={{ fontSize: 12, color: '#9CA3AF' }}>/month</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-4 mt-4 pb-4" style={{ borderBottom: '1px solid #F0F2F5' }}>
            {[{ v: '2', l: 'Beds' }, { v: '2', l: 'Baths' }, { v: '1,200', l: 'sq.ft.' }, { v: '3rd', l: 'Floor' }].map((s) => (
              <div key={s.l} className="flex flex-col items-center flex-1">
                <span className="font-bold" style={{ fontSize: 16, color: '#1A1A2E' }}>{s.v}</span>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>{s.l}</span>
              </div>
            ))}
          </div>

          {/* Owner trust card */}
          <div className="mt-4 rounded-2xl overflow-hidden" style={{ background: '#EBF8FA', border: '1px solid #02809020' }}>
            <div className="p-4 flex items-center gap-4">
              <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: 52, height: 52, background: '#028090' }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format" alt="Rajesh Mehta" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold" style={{ fontSize: 15, color: '#1A1A2E' }}>Rajesh Mehta</span>
                  <div className="rounded-full px-2 py-0.5 flex items-center gap-1" style={{ background: '#028090' }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                    <span className="text-white font-semibold" style={{ fontSize: 9 }}>VERIFIED</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span style={{ fontSize: 12, color: '#6B7280' }}>Trust Score: <span className="font-bold" style={{ color: '#028090' }}>94</span></span>
                  <span style={{ fontSize: 12, color: '#6B7280' }}>⭐ <span className="font-bold" style={{ color: '#1A1A2E' }}>4.8</span> (61 reviews)</span>
                </div>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>Responds in ~15 min · 98% response rate</p>
              </div>
              <button
                onClick={() => navigate('chat')}
                className="rounded-xl px-3 py-2 font-semibold flex-shrink-0"
                style={{ background: '#028090', color: 'white', fontSize: 12 }}
              >
                Chat
              </button>
            </div>
            <button
              onClick={() => navigate('owner-profile')}
              className="w-full flex items-center justify-between px-4 py-3"
              style={{ borderTop: '1px solid #02809015', background: 'rgba(2,128,144,0.04)' }}
            >
              <span className="font-semibold" style={{ fontSize: 13, color: '#028090' }}>View Full Owner Profile & Reviews</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#028090" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          {/* Amenities */}
          <div className="mt-5">
            <h3 className="font-bold mb-3" style={{ fontSize: 16, color: '#1A1A2E' }}>Amenities</h3>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {amenities.map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-1.5 rounded-xl py-3" style={{ background: '#F8FAFB' }}>
                  <span style={{ fontSize: 22 }}>{a.icon}</span>
                  <span style={{ fontSize: 10, color: '#6B7280', fontWeight: 500 }}>{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-5">
            <h3 className="font-bold mb-2" style={{ fontSize: 16, color: '#1A1A2E' }}>About this property</h3>
            <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.7 }}>
              Fully furnished 2BHK apartment with modern interiors in the heart of Koramangala. Walking distance to Metro Station, restaurants, and tech parks. Ideal for working professionals.
            </p>
          </div>

          <div className="h-6" />
        </div>
      </div>

      {/* Apply CTA */}
      <div className="px-5 pb-8 pt-4" style={{ borderTop: '1px solid #F0F2F5', background: '#FFFFFF' }}>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('chat')}
            className="flex-1 py-4 rounded-2xl font-semibold"
            style={{ background: '#EBF8FA', color: '#028090', fontSize: 15, border: '1.5px solid #028090' + '30' }}
          >
            Schedule Visit
          </button>
          <button
            onClick={() => navigate('payment')}
            className="flex-1 py-4 rounded-2xl font-semibold text-white"
            style={{ background: '#02C39A', fontSize: 15, boxShadow: '0 4px 16px rgba(2,195,154,0.35)' }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}
