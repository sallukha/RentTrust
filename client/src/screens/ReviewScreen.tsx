import { useState } from 'react'
import type { NavProps } from '../types'

export default function ReviewScreen({ navigate, role }: NavProps) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isOwner = role === 'owner'
  const primary = isOwner ? '#028090' : '#02C39A'
  const lightBg = isOwner ? '#EBF8FA' : '#E8FBF6'

  const aspectLabels = isOwner
    ? ['Payment Timeliness', 'Property Care', 'Communication', 'Cleanliness']
    : ['Property Accuracy', 'Owner Responsiveness', 'Value for Money', 'Neighborhood']

  const [aspects, setAspects] = useState<Record<string, number>>(
    Object.fromEntries(aspectLabels.map((a) => [a, 0]))
  )

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center" style={{ background: '#FFFFFF' }}>
        <div className="rounded-full flex items-center justify-center mb-6" style={{ width: 96, height: 96, background: lightBg }}>
          <span style={{ fontSize: 48 }}>⭐</span>
        </div>
        <h2 className="font-bold mb-2" style={{ fontSize: 24, color: '#1A1A2E' }}>Review Submitted!</h2>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 8 }}>
          Thank you for your feedback. Reviews are double-blind and published after both parties submit.
        </p>
        <button
          onClick={() => navigate(isOwner ? 'owner-dashboard' : 'home')}
          className="mt-6 py-4 px-8 rounded-2xl font-semibold text-white"
          style={{ background: primary }}
        >
          Back to {isOwner ? 'Dashboard' : 'Home'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#FFFFFF', borderBottom: '1px solid #F0F2F5' }}>
        <div className="px-5 pb-4 flex items-center gap-3">
          <button onClick={() => navigate(isOwner ? 'owner-dashboard' : 'payment')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <div>
            <h1 className="font-bold" style={{ fontSize: 18, color: '#1A1A2E' }}>Leave a Review</h1>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>Double-blind · Published after both submit</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Who you're reviewing */}
        <div className="rounded-2xl p-4 flex items-center gap-4 mb-5" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 48, height: 48, background: lightBg }}>
            <span className="font-bold" style={{ fontSize: 20, color: primary }}>{isOwner ? 'A' : 'R'}</span>
          </div>
          <div>
            <p className="font-semibold" style={{ fontSize: 15, color: '#1A1A2E' }}>
              {isOwner ? 'Arjun Kapoor' : 'Rajesh Mehta'}
            </p>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>
              {isOwner ? 'Tenant · 2BHK Koramangala · 11 months' : 'Owner · 2BHK Koramangala · Aug 2026'}
            </p>
          </div>
          <div className="ml-auto rounded-full px-2.5 py-1" style={{ background: lightBg }}>
            <span className="font-semibold" style={{ fontSize: 11, color: primary }}>
              {isOwner ? 'TENANT' : 'OWNER'}
            </span>
          </div>
        </div>

        {/* Overall star rating */}
        <div className="rounded-2xl p-5 mb-4" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p className="font-bold mb-4 text-center" style={{ fontSize: 15, color: '#1A1A2E' }}>Overall Rating</p>
          <div className="flex justify-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHovered(s)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(s)}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill={s <= (hovered || rating) ? '#F59E0B' : '#E5E7EB'}
                  style={{ transition: 'fill 0.1s' }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>
          <p className="text-center font-semibold" style={{ fontSize: 14, color: rating ? '#F59E0B' : '#9CA3AF' }}>
            {rating === 0 ? 'Tap to rate' : ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
          </p>
        </div>

        {/* Aspect ratings */}
        <div className="rounded-2xl p-5 mb-4" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p className="font-bold mb-4" style={{ fontSize: 15, color: '#1A1A2E' }}>Rate Specific Aspects</p>
          <div className="flex flex-col gap-4">
            {aspectLabels.map((aspect) => (
              <div key={aspect}>
                <div className="flex justify-between mb-2">
                  <span style={{ fontSize: 13, color: '#6B7280' }}>{aspect}</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((s) => (
                      <button key={s} onClick={() => setAspects({ ...aspects, [aspect]: s })}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={s <= (aspects[aspect] || 0) ? '#F59E0B' : '#E5E7EB'}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text review */}
        <div className="rounded-2xl p-5 mb-4" style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p className="font-bold mb-3" style={{ fontSize: 15, color: '#1A1A2E' }}>Written Feedback</p>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={isOwner
              ? 'Describe your experience with this tenant. Was rent paid on time? Did they keep the property clean?'
              : 'Describe your experience. Was the property as advertised? How was the owner to deal with?'}
            className="w-full rounded-xl p-4"
            style={{
              height: 120,
              border: '1.5px solid #E5E7EB',
              resize: 'none',
              fontSize: 14,
              color: '#1A1A2E',
              fontFamily: 'Inter, system-ui, sans-serif',
              lineHeight: 1.6,
            }}
          />
          <p className="mt-2 text-right" style={{ fontSize: 11, color: '#9CA3AF' }}>{review.length}/500</p>
        </div>

        {/* Privacy note */}
        <div className="rounded-xl p-4 flex gap-3" style={{ background: lightBg }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <p style={{ fontSize: 12, color: primary, lineHeight: 1.6 }}>
            Reviews are double-blind. Your identity is hidden until both parties submit their reviews, ensuring honest and unbiased feedback.
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="px-5 pb-8 pt-4" style={{ borderTop: '1px solid #F0F2F5', background: '#FFFFFF' }}>
        <button
          onClick={() => rating > 0 && setSubmitted(true)}
          className="w-full py-4 rounded-2xl font-semibold text-white"
          style={{
            background: rating > 0 ? primary : '#D1D5DB',
            fontSize: 16,
            boxShadow: rating > 0 ? `0 4px 16px ${primary}40` : 'none',
          }}
        >
          Submit Review
        </button>
      </div>
    </div>
  )
}
