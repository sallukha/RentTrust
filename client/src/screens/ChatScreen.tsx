import { useState } from 'react'
import type { NavProps } from '../types'
import BottomNav from '../components/BottomNav'

const initialMessages = [
  { from: 'them', text: 'Hi Priya! Thanks for your interest in the 2BHK at Koramangala. Happy to answer any questions.', time: '10:32 AM' },
  { from: 'me', text: 'Hello! Yes, I loved the listing. Is the apartment available from August 1st?', time: '10:35 AM' },
  { from: 'them', text: 'Yes it is! The current tenant moves out July 30. We can do a viewing this weekend if you\'re free.', time: '10:36 AM' },
  { from: 'me', text: 'That works. Saturday around 11 AM?', time: '10:40 AM' },
  { from: 'them', text: 'Perfect. I\'ll send you the exact address on Friday. You can also view the digital contract beforehand.', time: '10:41 AM' },
  { from: 'contract', time: '10:42 AM' },
]

export default function ChatScreen({ navigate, role, setRole }: NavProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [text, setText] = useState('')
  const isOwner = role === 'owner'
  const primary = isOwner ? '#028090' : '#02C39A'

  const send = () => {
    if (!text.trim()) return
    setMessages([...messages, { from: 'me', text: text.trim(), time: 'Now' }])
    setText('')
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ paddingTop: 52, background: '#FFFFFF', borderBottom: '1px solid #F0F2F5', paddingBottom: 12 }}>
        <div className="px-5 flex items-center gap-3">
          <button onClick={() => navigate(isOwner ? 'rental-requests' : 'property-detail')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <div className="rounded-full flex items-center justify-center" style={{ width: 40, height: 40, background: '#EBF8FA' }}>
            <span className="font-bold" style={{ fontSize: 18, color: primary }}>{isOwner ? 'A' : 'R'}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold" style={{ fontSize: 15, color: '#1A1A2E' }}>
                {isOwner ? 'Arjun Kapoor' : 'Rajesh Mehta'}
              </p>
              <div className="rounded-full" style={{ width: 7, height: 7, background: '#02C39A' }} />
            </div>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>
              {isOwner ? 'Trust Score: 88 · Tenant' : 'Trust Score: 94 · Owner'}
            </p>
          </div>
          <div className="flex gap-3">
            <button>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4C1.6 2.32 2.44 1.42 3.52 1.4h3a2 2 0 0 1 2 1.72" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Property banner */}
      <div className="mx-4 mt-3 rounded-xl px-3 py-2.5 flex items-center gap-3" style={{ background: '#EBF8FA', border: `1px solid ${primary}20` }}>
        <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: 36, height: 36, background: '#028090' }}>
          <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate" style={{ fontSize: 12, color: '#1A1A2E' }}>2BHK Koramangala · ₹28,000/mo</p>
        </div>
        <button onClick={() => navigate('agreement')} className="rounded-lg px-2.5 py-1" style={{ background: primary, fontSize: 11, color: 'white', fontWeight: 600, flexShrink: 0 }}>
          Agreement
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg, i) => {
          if (msg.from === 'contract') {
            return (
              <div key={i} className="flex justify-center">
                <button
                  onClick={() => navigate('agreement')}
                  className="rounded-2xl p-4 flex items-center gap-3 w-full"
                  style={{ background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: `1.5px solid ${primary}30` }}
                >
                  <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: 40, height: 40, background: '#EBF8FA' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold" style={{ fontSize: 13, color: '#1A1A2E' }}>Rental Agreement Draft</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>Tap to review and e-sign · {msg.time}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            )
          }

          const isMe = msg.from === 'me'
          return (
            <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div
                className="rounded-2xl px-4 py-3 max-w-xs"
                style={{
                  background: isMe ? primary : '#FFFFFF',
                  borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  boxShadow: isMe ? 'none' : '0 1px 4px rgba(0,0,0,0.08)',
                }}
              >
                <p style={{ fontSize: 14, color: isMe ? '#FFFFFF' : '#1A1A2E', lineHeight: 1.5 }}>{msg.text}</p>
                <p className="mt-1" style={{ fontSize: 10, color: isMe ? 'rgba(255,255,255,0.65)' : '#9CA3AF', textAlign: 'right' }}>{msg.time}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2" style={{ borderTop: '1px solid #F0F2F5', background: '#FFFFFF' }}>
        <div className="flex items-center gap-2">
          <button className="flex-shrink-0 rounded-full flex items-center justify-center" style={{ width: 40, height: 40, background: '#F8FAFB' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <div className="flex-1 flex items-center rounded-2xl px-4" style={{ background: '#F8FAFB', border: '1.5px solid #E5E7EB', minHeight: 44 }}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent"
              style={{ fontSize: 14, color: '#1A1A2E', fontFamily: 'Inter, system-ui, sans-serif', border: 'none', outline: 'none' }}
            />
          </div>
          <button
            onClick={send}
            className="flex-shrink-0 rounded-full flex items-center justify-center"
            style={{ width: 40, height: 40, background: text.trim() ? primary : '#E5E7EB' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22,2 15,22 11,13 2,9" />
            </svg>
          </button>
        </div>
      </div>

      {role && <BottomNav active="chat" navigate={navigate} role={role} />}
    </div>
  )
}
