import type { NavProps } from '../types'
import BottomNav from '../components/BottomNav'
import PropertyCard from '../components/PropertyCard'

const listings = [
  {
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop&auto=format',
    title: 'Modern 2BHK in Koramangala',
    location: 'Koramangala, Bengaluru',
    price: 28000,
    trustScore: 92,
    beds: 2,
    baths: 2,
  },
  {
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop&auto=format',
    title: 'Spacious 3BHK near Metro',
    location: 'Indiranagar, Bengaluru',
    price: 42000,
    trustScore: 88,
    beds: 3,
    baths: 2,
  },
  {
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop&auto=format',
    title: 'Studio Apartment with Gym',
    location: 'HSR Layout, Bengaluru',
    price: 18500,
    trustScore: 76,
    beds: 1,
    baths: 1,
  },
]

export default function HomeScreen({ navigate, role, setRole }: NavProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#FFFFFF', paddingBottom: 16, borderBottom: '1px solid #F0F2F5' }}>
        <div className="px-5 flex items-center justify-between">
          <div>
            <p className="font-medium" style={{ fontSize: 12, color: '#9CA3AF' }}>
              <svg className="inline mr-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#02C39A" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Bengaluru, Karnataka
            </p>
            <h1 className="font-bold mt-0.5" style={{ fontSize: 22, color: '#1A1A2E' }}>
              Find your next home
            </h1>
          </div>
          <div className="relative">
            <div className="rounded-full overflow-hidden" style={{ width: 40, height: 40, background: '#E8FBF6' }}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-bold" style={{ fontSize: 16, color: '#02C39A' }}>P</span>
              </div>
            </div>
            <div
              className="absolute -top-1 -right-1 rounded-full flex items-center justify-center"
              style={{ width: 16, height: 16, background: '#EF4444' }}
            >
              <span className="text-white font-bold" style={{ fontSize: 9 }}>3</span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-5 mt-4">
          <button
            onClick={() => navigate('search')}
            className="w-full flex items-center gap-3 rounded-2xl px-4"
            style={{ height: 48, background: '#F0F2F5', border: 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontSize: 14, color: '#9CA3AF' }}>Search by location, property...</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Quick filters */}
        <div className="px-5 pt-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['All', '1 BHK', '2 BHK', '3 BHK', 'Studio', 'Furnished', 'Pet Friendly'].map((f, i) => (
              <button
                key={f}
                className="flex-shrink-0 rounded-full px-4 py-2 font-medium transition-colors"
                style={{
                  background: i === 0 ? '#02C39A' : '#FFFFFF',
                  color: i === 0 ? '#FFFFFF' : '#6B7280',
                  fontSize: 13,
                  border: i === 0 ? 'none' : '1px solid #E5E7EB',
                  boxShadow: i === 0 ? '0 2px 8px rgba(2,195,154,0.3)' : 'none',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Trust score banner */}
        <div className="px-5 mt-2 mb-4">
          <div
            className="rounded-2xl p-4 flex items-center gap-4"
            style={{ background: '#E8FBF6', border: '1px solid #02C39A20' }}
          >
            <div>
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: 48, height: 48, background: '#FFFFFF', border: '3px solid #02C39A' }}
              >
                <span className="font-bold" style={{ fontSize: 15, color: '#02C39A' }}>74</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold" style={{ fontSize: 13, color: '#1A1A2E' }}>Your Trust Score: 74/100</p>
              <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Complete verification to unlock premium listings</p>
            </div>
            <button
              onClick={() => navigate('passport')}
              className="rounded-xl px-3 py-2"
              style={{ background: '#02C39A', color: 'white', fontSize: 12, fontWeight: 600 }}
            >
              Boost
            </button>
          </div>
        </div>

        {/* Section */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold" style={{ fontSize: 17, color: '#1A1A2E' }}>Verified Listings Near You</h2>
            <button style={{ fontSize: 13, color: '#02C39A', fontWeight: 600 }}>See all</button>
          </div>

          <div className="flex flex-col gap-4 pb-4">
            {listings.map((l, i) => (
              <PropertyCard
                key={i}
                {...l}
                onClick={() => navigate('property-detail')}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" navigate={navigate} role={role} />
    </div>
  )
}
