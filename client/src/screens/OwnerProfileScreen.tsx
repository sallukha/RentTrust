import { useState } from 'react'
import type { NavProps } from '../types'

const PRIMARY = '#028090'
const LIGHT_BG = '#EBF8FA'

/* ─── data ────────────────────────────────────────────────────── */

const trustBadges = [
  { icon: '✅', label: 'Verified Identity', earned: true },
  { icon: '🏆', label: 'Trusted Owner', earned: true },
  { icon: '⚡', label: 'Fast Responder', earned: true },
  { icon: '⭐', label: 'Highly Rated', earned: true },
  { icon: '🌟', label: 'Super Host', earned: true },
  { icon: '🏠', label: 'Verified Property', earned: true },
  { icon: '🥇', label: 'Top Rated Owner', earned: false },
]

const ratingCategories = [
  { label: 'Communication', score: 4.9 },
  { label: 'Honesty', score: 4.8 },
  { label: 'Property Accuracy', score: 4.7 },
  { label: 'Cleanliness', score: 4.6 },
  { label: 'Maintenance Support', score: 4.5 },
  { label: 'Deposit Return Process', score: 4.8 },
  { label: 'Safety & Security', score: 4.9 },
  { label: 'Professionalism', score: 4.8 },
  { label: 'Overall Experience', score: 4.8 },
]

const ratingDist: { stars: number; count: number }[] = [
  { stars: 5, count: 48 },
  { stars: 4, count: 9 },
  { stars: 3, count: 2 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
]

const reviews = [
  {
    name: 'Priya Sharma',
    initials: 'P',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
    rating: 5,
    title: "Outstanding experience — best landlord I've had",
    desc: "Rajesh was incredibly responsive throughout our 11-month stay. Maintenance issues were fixed within 24 hours, the property was exactly as described, and the deposit was returned within 3 days of moving out. Would 100% rent from him again.",
    duration: 'Aug 2025 – Jun 2026',
    date: 'Jul 2026',
    helpful: 34,
    verified: true,
  },
  {
    name: 'Arjun Kapoor',
    initials: 'A',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format',
    rating: 5,
    title: 'Transparent, professional, zero drama',
    desc: "The rental agreement was clear, the property was spotless on move-in, and Rajesh never delayed communication. He respected our privacy and always gave 24 hr notice before any visit. Ideal landlord.",
    duration: 'Sep 2024 – Aug 2025',
    date: 'Aug 2025',
    helpful: 27,
    verified: true,
  },
  {
    name: 'Meera Nair',
    initials: 'M',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format',
    rating: 4,
    title: 'Very good overall — minor maintenance delay',
    desc: "Great owner overall. The AC repair took about 5 days which was slightly longer than expected, but everything else was handled promptly. Property matched the photos completely.",
    duration: 'Nov 2023 – Oct 2024',
    date: 'Oct 2024',
    helpful: 18,
    verified: true,
  },
]

/* ─── sub-components ─────────────────────────────────────────── */

function Stars({ score, size = 14 }: { score: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = score >= s ? '#F59E0B' : score >= s - 0.5 ? '#FCD34D' : '#E5E7EB'
        return (
          <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={fill}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      })}
    </div>
  )
}

function RatingBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex-shrink-0 font-medium" style={{ fontSize: 12.5, color: '#6B7280', width: 160 }}>{label}</span>
      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: '#E5E7EB' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${(score / 5) * 100}%`, background: `linear-gradient(90deg, ${PRIMARY}, #02C39A)` }}
        />
      </div>
      <span className="font-bold flex-shrink-0" style={{ fontSize: 13, color: PRIMARY, width: 28, textAlign: 'right' }}>{score.toFixed(1)}</span>
    </div>
  )
}

function ReviewCard({ r, idx }: { r: typeof reviews[0]; idx: number }) {
  const [helpful, setHelpful] = useState(r.helpful)
  const [tapped, setTapped] = useState(false)

  const handleHelpful = () => {
    if (tapped) return
    setHelpful(helpful + 1)
    setTapped(true)
  }

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #F0F2F5' }}
    >
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start gap-3">
          <img
            src={r.avatar}
            alt={r.name}
            className="rounded-full object-cover flex-shrink-0"
            style={{ width: 46, height: 46, background: '#E5E7EB' }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold" style={{ fontSize: 14, color: '#1A1A2E' }}>{r.name}</span>
              {r.verified && (
                <div className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: '#E8FBF6' }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#02C39A" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  <span className="font-semibold" style={{ fontSize: 9, color: '#02C39A' }}>VERIFIED STAY</span>
                </div>
              )}
            </div>
            <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{r.duration} · {r.date}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Stars score={r.rating} size={13} />
              <span className="font-bold" style={{ fontSize: 12, color: '#F59E0B' }}>{r.rating}.0</span>
            </div>
          </div>
        </div>

        <h4 className="font-bold mt-4" style={{ fontSize: 14.5, color: '#1A1A2E', lineHeight: 1.3 }}>
          {r.title}
        </h4>
        <p className="mt-2" style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.75 }}>
          {r.desc}
        </p>
      </div>

      {/* Footer */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderTop: '1px solid #F8FAFB', background: '#FAFAFA' }}
      >
        <button
          onClick={handleHelpful}
          className="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors"
          style={{
            background: tapped ? LIGHT_BG : '#F0F2F5',
            border: tapped ? `1px solid ${PRIMARY}30` : '1px solid transparent',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={tapped ? PRIMARY : 'none'} stroke={tapped ? PRIMARY : '#9CA3AF'} strokeWidth="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span className="font-semibold" style={{ fontSize: 12, color: tapped ? PRIMARY : '#9CA3AF' }}>
            Helpful ({helpful})
          </span>
        </button>
        <button className="flex items-center gap-1.5 rounded-xl px-3 py-2" style={{ background: '#F0F2F5' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
          <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 500 }}>Report</span>
        </button>
      </div>
    </div>
  )
}

/* ─── main screen ────────────────────────────────────────────── */

export default function OwnerProfileScreen({ navigate }: NavProps) {
  const [tab, setTab] = useState<'profile' | 'reviews'>('profile')
  const totalReviews = ratingDist.reduce((s, r) => s + r.count, 0)
  const overallRating = 4.8
  const pct5 = Math.round((ratingDist[0].count / totalReviews) * 100)

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* ── Hero header ───────────────────────────────── */}
      <div style={{ background: '#FFFFFF' }}>
        {/* Back + action bar */}
        <div className="flex items-center justify-between px-5" style={{ paddingTop: 52, paddingBottom: 12 }}>
          <button
            onClick={() => navigate('property-detail')}
            className="rounded-full flex items-center justify-center"
            style={{ width: 38, height: 38, background: '#F0F2F5' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <span className="font-bold" style={{ fontSize: 16, color: '#1A1A2E' }}>Owner Profile</span>
          <button
            className="rounded-full flex items-center justify-center"
            style={{ width: 38, height: 38, background: '#F0F2F5' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>

        {/* Profile card */}
        <div className="px-5 pb-5">
          <div className="flex items-start gap-4">
            {/* Avatar with trust ring */}
            <div className="relative flex-shrink-0">
              <div
                className="rounded-full overflow-hidden"
                style={{ width: 84, height: 84, border: `3px solid ${PRIMARY}`, background: '#E5E7EB' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format"
                  alt="Rajesh Mehta"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online badge */}
              <div
                className="absolute bottom-0 right-0 rounded-full border-2 border-white"
                style={{ width: 20, height: 20, background: '#02C39A' }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-bold" style={{ fontSize: 20, color: '#1A1A2E' }}>Rajesh Mehta</h1>
                <div className="flex items-center gap-1 rounded-full px-2.5 py-1" style={{ background: PRIMARY }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  <span className="text-white font-bold" style={{ fontSize: 9 }}>VERIFIED</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <Stars score={overallRating} size={14} />
                <span className="font-bold" style={{ fontSize: 13, color: '#1A1A2E' }}>{overallRating}</span>
                <span style={{ fontSize: 12, color: '#9CA3AF' }}>({totalReviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="font-medium" style={{ fontSize: 12, color: '#6B7280' }}>
                  <span className="font-bold" style={{ color: '#1A1A2E' }}>Trust Score: </span>
                  <span className="font-bold" style={{ color: PRIMARY }}>94/100</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div
            className="mt-4 rounded-2xl p-4 grid grid-cols-4 gap-2"
            style={{ background: '#F8FAFB', border: '1px solid #E5E7EB' }}
          >
            {[
              { value: '61', label: 'Reviews' },
              { value: '47', label: 'Rentals' },
              { value: '98%', label: 'Response' },
              { value: '~15m', label: 'Reply Time' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="font-bold" style={{ fontSize: 16, color: '#1A1A2E' }}>{s.value}</span>
                <span style={{ fontSize: 10, color: '#9CA3AF', textAlign: 'center', lineHeight: 1.2 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-5" style={{ borderBottom: '1px solid #F0F2F5' }}>
          {(['profile', 'reviews'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="py-3 mr-8 font-semibold capitalize"
              style={{
                fontSize: 14,
                color: tab === t ? PRIMARY : '#9CA3AF',
                borderBottom: `2px solid ${tab === t ? PRIMARY : 'transparent'}`,
              }}
            >
              {t === 'reviews' ? `Reviews (${totalReviews})` : 'Profile'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable body ───────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'profile' ? (
          <div className="px-5 py-5 flex flex-col gap-5">

            {/* Trust Badges */}
            <section>
              <h2 className="font-bold mb-3" style={{ fontSize: 16, color: '#1A1A2E' }}>Trust Badges</h2>
              <div className="grid grid-cols-4 gap-2">
                {trustBadges.map((b) => (
                  <div
                    key={b.label}
                    className="rounded-2xl py-3 px-1.5 flex flex-col items-center gap-1.5"
                    style={{
                      background: b.earned ? LIGHT_BG : '#F8FAFB',
                      border: `1.5px solid ${b.earned ? PRIMARY + '30' : '#E5E7EB'}`,
                      opacity: b.earned ? 1 : 0.45,
                    }}
                  >
                    <span style={{ fontSize: 22, filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.icon}</span>
                    <span className="text-center leading-tight" style={{ fontSize: 9.5, color: b.earned ? PRIMARY : '#9CA3AF', fontWeight: 600 }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reputation Dashboard */}
            <section>
              <h2 className="font-bold mb-3" style={{ fontSize: 16, color: '#1A1A2E' }}>Reputation Dashboard</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Trust Score', value: '94/100', icon: '🏅', color: PRIMARY },
                  { label: 'Overall Rating', value: '4.8/5.0', icon: '⭐', color: '#F59E0B' },
                  { label: 'Properties Listed', value: '6', icon: '🏠', color: '#6366F1' },
                  { label: 'Successful Rentals', value: '47', icon: '✅', color: '#02C39A' },
                  { label: 'Verified Reviews', value: '61', icon: '🔒', color: PRIMARY },
                  { label: 'Repeat Tenants', value: '12', icon: '🔁', color: '#F59E0B' },
                  { label: 'Response Quality', value: 'Excellent', icon: '💬', color: '#02C39A' },
                  { label: 'Profile Complete', value: '96%', icon: '📊', color: '#6366F1' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl p-4 flex flex-col gap-1"
                    style={{ background: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #F0F2F5' }}
                  >
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <span className="font-bold" style={{ fontSize: 17, color: item.color }}>{item.value}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* About */}
            <section>
              <h2 className="font-bold mb-3" style={{ fontSize: 16, color: '#1A1A2E' }}>About the Owner</h2>
              <div className="rounded-2xl p-5" style={{ background: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #F0F2F5' }}>
                <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.8 }}>
                  Property developer and landlord with 8+ years of experience managing residential properties across Bengaluru. I believe in transparent agreements, quick maintenance response, and treating tenants like partners — not just customers.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {[
                    { icon: '📅', label: 'Member Since', value: 'January 2018' },
                    { icon: '🗣️', label: 'Languages', value: 'English, Hindi, Kannada' },
                    { icon: '📍', label: 'Properties In', value: 'Koramangala, Indiranagar, HSR' },
                    { icon: '📞', label: 'Contact Preference', value: 'Chat · WhatsApp · Call' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-3">
                      <span style={{ fontSize: 16, width: 22, textAlign: 'center' }}>{row.icon}</span>
                      <div>
                        <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{row.label}</p>
                        <p className="font-medium" style={{ fontSize: 13, color: '#1A1A2E' }}>{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Verification status */}
            <section>
              <h2 className="font-bold mb-3" style={{ fontSize: 16, color: '#1A1A2E' }}>Verification Status</h2>
              <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #F0F2F5' }}>
                {[
                  { label: 'Aadhaar / Government ID', status: true },
                  { label: 'PAN Card', status: true },
                  { label: 'Property Ownership Proof', status: true },
                  { label: 'Mobile Number', status: true },
                  { label: 'Email Address', status: true },
                  { label: 'Bank Account (for deposits)', status: true },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid #F8FAFB' : 'none' }}
                  >
                    <span style={{ fontSize: 13.5, color: '#1A1A2E' }}>{item.label}</span>
                    <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: item.status ? '#E8FBF6' : '#FEF2F2' }}>
                      {item.status
                        ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#02C39A" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                        : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      }
                      <span className="font-semibold" style={{ fontSize: 10, color: item.status ? '#02C39A' : '#EF4444' }}>
                        {item.status ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="h-4" />
          </div>
        ) : (
          /* ── Reviews tab ──── */
          <div className="px-5 py-5 flex flex-col gap-5">

            {/* Rating summary */}
            <section>
              <div className="rounded-3xl p-5" style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #F0F2F5' }}>
                {/* Top row */}
                <div className="flex items-start gap-5 mb-5">
                  <div className="flex flex-col items-center">
                    <span className="font-bold" style={{ fontSize: 52, color: '#1A1A2E', lineHeight: 1 }}>{overallRating}</span>
                    <Stars score={overallRating} size={18} />
                    <span style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>{totalReviews} reviews</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5 pt-1">
                    {ratingDist.map((row) => {
                      const pct = Math.round((row.count / totalReviews) * 100)
                      return (
                        <div key={row.stars} className="flex items-center gap-2">
                          <span style={{ fontSize: 11, color: '#6B7280', width: 12 }}>{row.stars}</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                          <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: '#F0F2F5' }}>
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#F59E0B' }} />
                          </div>
                          <span style={{ fontSize: 11, color: '#9CA3AF', width: 24, textAlign: 'right' }}>{row.count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Summary pills */}
                <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid #F0F2F5' }}>
                  <div className="rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ background: '#E8FBF6', border: '1px solid #02C39A30' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#02C39A" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                    <span style={{ fontSize: 12, color: '#02C39A', fontWeight: 600 }}>61 Verified Reviews</span>
                  </div>
                  <div className="rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ background: LIGHT_BG, border: `1px solid ${PRIMARY}30` }}>
                    <span style={{ fontSize: 12, color: PRIMARY, fontWeight: 600 }}>96% Recommend</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Rating categories */}
            <section>
              <h2 className="font-bold mb-3" style={{ fontSize: 16, color: '#1A1A2E' }}>Rating by Category</h2>
              <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #F0F2F5' }}>
                {ratingCategories.map((cat) => (
                  <RatingBar key={cat.label} label={cat.label} score={cat.score} />
                ))}
              </div>
            </section>

            {/* Review cards */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold" style={{ fontSize: 16, color: '#1A1A2E' }}>Tenant Reviews</h2>
                <div className="flex items-center gap-1 rounded-full px-3 py-1.5" style={{ background: LIGHT_BG }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  <span style={{ fontSize: 11, color: PRIMARY, fontWeight: 600 }}>Verified only</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {reviews.map((r, i) => <ReviewCard key={i} r={r} idx={i} />)}
              </div>

              <button
                className="w-full mt-4 py-4 rounded-2xl font-semibold"
                style={{ background: '#F8FAFB', border: `1.5px solid ${PRIMARY}30`, color: PRIMARY, fontSize: 14 }}
              >
                View All 61 Reviews
              </button>
            </section>

            <div className="h-4" />
          </div>
        )}
      </div>

      {/* ── Bottom action bar ─────────────────────────── */}
      <div style={{ background: '#FFFFFF', borderTop: '1px solid #F0F2F5' }}>
        {/* Primary CTAs */}
        <div className="px-5 pt-4 flex gap-3">
          <button
            onClick={() => navigate('chat')}
            className="flex-1 py-4 rounded-2xl font-semibold"
            style={{ background: LIGHT_BG, color: PRIMARY, fontSize: 14, border: `1.5px solid ${PRIMARY}30` }}
          >
            Chat Now
          </button>
          <button
            onClick={() => navigate('property-detail')}
            className="flex-1 py-4 rounded-2xl font-semibold text-white"
            style={{ background: PRIMARY, fontSize: 14, boxShadow: `0 4px 16px ${PRIMARY}40` }}
          >
            Send Request
          </button>
        </div>
        {/* Secondary CTAs */}
        <div className="px-5 pt-2 pb-6 flex gap-2">
          <button
            onClick={() => navigate('property-detail')}
            className="flex-1 py-3 rounded-xl font-medium"
            style={{ background: '#F8FAFB', color: '#6B7280', fontSize: 13, border: '1px solid #E5E7EB' }}
          >
            View Property
          </button>
          <button
            className="flex-1 py-3 rounded-xl font-medium"
            style={{ background: '#F8FAFB', color: '#6B7280', fontSize: 13, border: '1px solid #E5E7EB' }}
          >
            Schedule Visit
          </button>
          <button
            className="py-3 px-4 rounded-xl font-medium"
            style={{ background: '#F8FAFB', border: '1px solid #E5E7EB' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
