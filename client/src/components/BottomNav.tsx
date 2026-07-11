import type { Screen, Role } from '../types'

interface BottomNavProps {
  active: Screen
  navigate: (s: Screen) => void
  role: Role
}

const ownerTabs = [
  {
    id: 'owner-dashboard' as Screen,
    label: 'Dashboard',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'add-property' as Screen,
    label: 'Add',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    id: 'rental-requests' as Screen,
    label: 'Requests',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'chat' as Screen,
    label: 'Chat',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'settings' as Screen,
    label: 'Settings',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

const renterTabs = [
  {
    id: 'home' as Screen,
    label: 'Home',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    id: 'search' as Screen,
    label: 'Search',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: 'chat' as Screen,
    label: 'Chat',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'passport' as Screen,
    label: 'Passport',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="12" cy="10" r="3" />
        <path d="M7 21v-1a5 5 0 0 1 10 0v1" />
      </svg>
    ),
  },
  {
    id: 'settings' as Screen,
    label: 'Settings',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? color : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

export default function BottomNav({ active, navigate, role }: BottomNavProps) {
  const isOwner = role === 'owner'
  const primary = isOwner ? '#028090' : '#02C39A'
  const tabs = isOwner ? ownerTabs : renterTabs

  return (
    <div
      className="flex items-center justify-around"
      style={{
        height: 72,
        background: '#FFFFFF',
        borderTop: '1px solid #F0F2F5',
        paddingBottom: 8,
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.id)}
            className="flex flex-col items-center gap-1 px-2 transition-transform active:scale-90"
          >
            {tab.icon(isActive, primary)}
            <span
              className="font-medium"
              style={{ fontSize: 10, color: isActive ? primary : '#9CA3AF' }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
