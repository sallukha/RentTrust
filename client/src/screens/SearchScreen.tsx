import { useState } from 'react'
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
]

export default function SearchScreen({ navigate, role, setRole }: NavProps) {
  const [view, setView] = useState<'list' | 'map'>('list')
  const [budget, setBudget] = useState(40000)
  const primary = '#02C39A'

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#FFFFFF', borderBottom: '1px solid #F0F2F5' }}>
        <div className="px-5 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-3 flex-1 rounded-2xl px-4"
              style={{ height: 48, background: '#F0F2F5' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                defaultValue="Bengaluru"
                className="flex-1 bg-transparent"
                style={{ fontSize: 14, color: '#1A1A2E', fontFamily: 'Inter, system-ui, sans-serif', border: 'none', outline: 'none' }}
              />
            </div>
            <button
              className="rounded-2xl flex items-center justify-center"
              style={{ width: 48, height: 48, background: primary }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="4" y1="6" x2="16" y2="6" />
                <line x1="8" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="16" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Map/List toggle */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>
            <span className="font-semibold" style={{ color: '#1A1A2E' }}>24 properties</span> found
          </p>
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
            {(['list', 'map'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-2 flex items-center gap-1.5"
                style={{
                  background: view === v ? primary : '#FFFFFF',
                  color: view === v ? '#FFFFFF' : '#9CA3AF',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {v === 'list'
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>
                }
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Filter chips */}
        <div className="px-5 mb-4">
          <div className="flex gap-2 flex-wrap">
            {['2 BHK', 'Under ₹30K', 'Furnished', 'Verified Only', 'Pet Friendly'].map((f, i) => (
              <div
                key={f}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{
                  background: i < 2 ? '#E8FBF6' : '#FFFFFF',
                  border: `1px solid ${i < 2 ? '#02C39A40' : '#E5E7EB'}`,
                }}
              >
                <span style={{ fontSize: 12, color: i < 2 ? primary : '#6B7280', fontWeight: 500 }}>{f}</span>
                {i < 2 && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Budget slider */}
        <div className="px-5 mb-4">
          <div
            className="rounded-2xl p-4"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold" style={{ fontSize: 13, color: '#1A1A2E' }}>Monthly Budget</span>
              <span className="font-bold" style={{ fontSize: 14, color: primary }}>
                ₹{budget.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={100000}
              step={1000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: primary }}
            />
            <div className="flex justify-between mt-1">
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>₹10,000</span>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>₹1,00,000</span>
            </div>
          </div>
        </div>

        {view === 'map' ? (
          <div className="mx-5 rounded-2xl overflow-hidden" style={{ height: 240, background: '#E5E7EB', position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop&auto=format"
              alt="Map view"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl px-4 py-2" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
                <span className="font-semibold" style={{ fontSize: 13, color: '#1A1A2E' }}>Map view — 24 pins</span>
              </div>
            </div>
            {/* Mock pins */}
            {[{x:30,y:40,s:92},{x:55,y:60,s:88},{x:70,y:35,s:76}].map((pin,i)=>(
              <div key={i} className="absolute rounded-full flex items-center justify-center"
                style={{ left:`${pin.x}%`, top:`${pin.y}%`, width:32, height:32, background:'#028090', border:'2px solid white', boxShadow:'0 2px 8px rgba(0,0,0,0.2)', transform:'translate(-50%,-50%)' }}>
                <span className="text-white font-bold" style={{ fontSize:9 }}>{pin.s}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 flex flex-col gap-4 pb-4">
            {listings.map((l, i) => (
              <PropertyCard key={i} {...l} onClick={() => navigate('property-detail')} />
            ))}
          </div>
        )}
      </div>

      <BottomNav active="search" navigate={navigate} role={role} />
    </div>
  )
}
