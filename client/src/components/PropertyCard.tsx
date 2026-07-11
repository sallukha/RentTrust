import { useState } from 'react'

interface PropertyCardProps {
  image: string
  title: string
  location: string
  price: number
  trustScore: number
  beds: number
  baths: number
  verified?: boolean
  onClick?: () => void
}

export default function PropertyCard({
  image, title, location, price, trustScore, beds, baths, verified = true, onClick
}: PropertyCardProps) {
  const [liked, setLiked] = useState(false)

  const scoreColor = trustScore >= 80 ? '#02C39A' : trustScore >= 60 ? '#028090' : '#F59E0B'

  return (
    <div
      onClick={onClick}
      className="w-full text-left rounded-2xl overflow-hidden transition-transform active:scale-95 cursor-pointer"
      style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
    >
      <div className="relative" style={{ height: 180 }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ background: '#E5E7EB' }}
        />
        {/* Heart */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
          className="absolute top-3 right-3 rounded-full flex items-center justify-center"
          style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? '#EF4444' : 'none'} stroke={liked ? '#EF4444' : '#9CA3AF'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {/* Verified badge */}
        {verified && (
          <div
            className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{ background: 'rgba(2,128,144,0.9)', backdropFilter: 'blur(8px)' }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="text-white font-semibold" style={{ fontSize: 10 }}>Verified</span>
          </div>
        )}
      </div>

      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold leading-tight" style={{ fontSize: 14, color: '#1A1A2E' }}>{title}</h3>
          {/* Trust score */}
          <div
            className="flex items-center gap-1 rounded-full px-2 py-0.5 flex-shrink-0"
            style={{ background: `${scoreColor}15` }}
          >
            <div className="rounded-full" style={{ width: 6, height: 6, background: scoreColor }} />
            <span className="font-bold" style={{ fontSize: 11, color: scoreColor }}>{trustScore}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-2.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>{location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" style={{ fontSize: 12, color: '#6B7280' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>
              {beds} Beds
            </span>
            <span className="flex items-center gap-1" style={{ fontSize: 12, color: '#6B7280' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8" /><polyline points="2,7 12,2 22,7" /></svg>
              {baths} Baths
            </span>
          </div>
          <div>
            <span className="font-bold" style={{ fontSize: 15, color: '#1A1A2E' }}>
              ₹{price.toLocaleString()}
            </span>
            <span style={{ fontSize: 11, color: '#9CA3AF' }}>/mo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
