export type ProfileType = 'tenant' | 'landlord' | 'admin';
export type ActiveUserRole = 'tenant' | 'landlord' | 'admin';

export interface RegistrationFormData {
  profileType: ProfileType;
  fullName: string;
  email: string;
  phoneNumber: string;
  termsAccepted: boolean;
}

export interface FormValidationErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  termsAccepted?: string;
  general?: string;
}

export interface UserProfile {
  id: string;
  profileType: ProfileType;
  fullName: string;
  email: string;
  phoneNumber: string;
  termsAccepted: boolean;
  registeredAt: string;
  avatarUrl: string;
  status: 'active' | 'pending_verification';
}

export interface OnboardingStep {
  step: number;
  title: string;
  status: 'ready' | 'pending' | 'completed';
  description: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  user: UserProfile;
  token: string;
  otp?: string;
  onboardingSteps: OnboardingStep[];
}

export interface FeaturedMember {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  joinedYears: string;
}

export interface CommunityStats {
  verifiedUsersCount: number;
  formattedCount: string;
  satisfactionRate: string;
  activeProperties: number;
  averageMatchTimeDays: number;
  featuredMembers: FeaturedMember[];
}

export interface RoleDetail {
  id: ProfileType;
  title: string;
  headline: string;
  description: string;
  benefits: string[];
  iconName: 'home' | 'building';
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export interface RecentUserItem {
  id: string;
  initials: string;
  name: string;
  role: string;
  timeAgo: string;
  avatar: string;
}

export type AppScreen =
  | 'logo-splash'
  | 'welcome'
  | 'tenant-home'
  | 'tenant-profile'
  | 'tenant-new-request'
  | 'tenant-requests-tracker'
  | 'tenant-move-in'
  | 'move-in-confirmed'
  | 'chat-hub'
  | 'chat-conversation'
  | 'landlord-requests-queue'
  | 'landlord-applicant-dossier'
  | 'filters-criteria'
  | 'guest-home'
  | 'guest-explore'
  | 'property-detail'
  | 'login'
  | 'register'
  | 'otp-verification'
  | 'dashboard'
  | 'landlord-profile'
  | 'list-property'
  | 'lease-billing';
export type GuestBottomTab = 'home' | 'explore' | 'chat' | 'requests' | 'profile';

export interface PropertyListing {
  id: string;
  title: string;
  shortTitle?: string;
  type: 'rental' | 'sale' | 'stay';
  badgeType?: 'top-choice' | 'rare-find' | 'elite-landlord' | 'trusted-landlord' | 'for-sale' | 'for-rent';
  badgeLabel?: string;
  location: string;
  city: string;
  neighborhood: string;
  price: string;
  priceNumeric: number;
  priceUnit: '/month' | '/mo' | 'night' | 'total' | '';
  rating?: number;
  reviewCount?: number;
  beds: number;
  baths: number;
  sqft?: number;
  guestsMax?: number;
  images: string[];
  description: string;
  amenities: { id: string; name: string; icon: string }[];
  host: {
    name: string;
    avatar: string;
    reputation: string;
    verified: boolean;
    responseRate?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // percentage for custom map
    mapY: number;
  };
  priceTag: string;
  isSaved?: boolean;
}

export interface PropertyReview {
  id: string;
  author: string;
  date: string;
  avatar?: string;
  rating: number;
  comment: string;
}

export interface LoginFormData {
  identifier: string; // email or phone number
  role: ProfileType;
  rememberDevice: boolean;
}

export interface LoginFormErrors {
  identifier?: string;
  role?: string;
  general?: string;
}

export interface PortfolioSummary {
  totalNetWorth: string;
  monthlyRentalIncome: string;
  propertiesTracked: number;
  portfolioGrowthYOY: string;
  creditPassportScore: number;
  recentTransactions?: {
    id: string;
    label: string;
    amount: string;
    date: string;
    type: 'credit' | 'debit';
  }[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: UserProfile;
  token: string;
  rememberDevice?: boolean;
  isGuest?: boolean;
  portfolioSummary: PortfolioSummary;
}
