export type Role = 'owner' | 'renter' | null

export type Screen =
  | 'splash'
  | 'role-selection'
  | 'auth'
  | 'otp'
  | 'onboarding'
  | 'home'
  | 'search'
  | 'property-detail'
  | 'owner-dashboard'
  | 'add-property'
  | 'rental-requests'
  | 'chat'
  | 'agreement'
  | 'payment'
  | 'passport'
  | 'review'
  | 'settings'
  | 'owner-profile'

export interface NavProps {
  navigate: (screen: Screen) => void
  role: Role
  setRole: (role: Role) => void
}
