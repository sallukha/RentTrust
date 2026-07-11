import { useState } from 'react'
import type { Screen, Role } from './types'
import SplashScreen from './screens/SplashScreen'
import RoleSelection from './screens/RoleSelection'
import AuthScreen from './screens/AuthScreen'
import OTPScreen from './screens/OTPScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import PropertyDetailScreen from './screens/PropertyDetailScreen'
import OwnerDashboardScreen from './screens/OwnerDashboardScreen'
import AddPropertyScreen from './screens/AddPropertyScreen'
import RentalRequestsScreen from './screens/RentalRequestsScreen'
import ChatScreen from './screens/ChatScreen'
import AgreementScreen from './screens/AgreementScreen'
import PaymentScreen from './screens/PaymentScreen'
import PassportScreen from './screens/PassportScreen'
import ReviewScreen from './screens/ReviewScreen'
import SettingsScreen from './screens/SettingsScreen'
import OwnerProfileScreen from './screens/OwnerProfileScreen'

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [role, setRole] = useState<Role>(null)

  const navigate = (s: Screen) => setScreen(s)

  const props = { navigate, role, setRole }

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen {...props} />
      case 'role-selection': return <RoleSelection {...props} />
      case 'auth': return <AuthScreen {...props} />
      case 'otp': return <OTPScreen {...props} />
      case 'onboarding': return <OnboardingScreen {...props} />
      case 'home': return <HomeScreen {...props} />
      case 'search': return <SearchScreen {...props} />
      case 'property-detail': return <PropertyDetailScreen {...props} />
      case 'owner-dashboard': return <OwnerDashboardScreen {...props} />
      case 'add-property': return <AddPropertyScreen {...props} />
      case 'rental-requests': return <RentalRequestsScreen {...props} />
      case 'chat': return <ChatScreen {...props} />
      case 'agreement': return <AgreementScreen {...props} />
      case 'payment': return <PaymentScreen {...props} />
      case 'passport': return <PassportScreen {...props} />
      case 'review': return <ReviewScreen {...props} />
      case 'settings': return <SettingsScreen {...props} />
      case 'owner-profile': return <OwnerProfileScreen {...props} />
      default: return <SplashScreen {...props} />
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#D1DCE8' }}>
      <div
        className="relative overflow-hidden"
        style={{
          width: 375,
          height: 812,
          background: '#FFFFFF',
          borderRadius: 44,
          boxShadow: '0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)',
        }}
      >
        {/* Status bar */}
        <div
          className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 z-50"
          style={{ height: 44, paddingTop: 14 }}
        >
          <span className="text-xs font-semibold" style={{ color: '#1A1A2E', fontSize: 12 }}>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 rounded-sm border border-current opacity-80" style={{ borderColor: '#1A1A2E' }}>
              <div className="w-3/4 h-full rounded-sm" style={{ background: '#1A1A2E' }} />
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="absolute inset-0 overflow-hidden" style={{ top: 0 }}>
          {renderScreen()}
        </div>
      </div>
    </div>
  )
}
