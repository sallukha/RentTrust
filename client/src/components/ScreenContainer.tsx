import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { LogoScreen } from './LogoScreen';
import { WelcomeScreen } from './WelcomeScreen';
import { FiltersCriteriaScreen } from './FiltersCriteriaScreen';
import { LandlordProfileScreen } from './LandlordProfileScreen';
import { TenantProfileScreen } from './TenantProfileScreen';
import { ListPropertyScreen } from './ListPropertyScreen';
import { OtpVerificationScreen } from './OtpVerificationScreen';
import { RegistrationCard } from './RegistrationCard';
import { LoginScreen } from './LoginScreen';
import { DashboardScreen } from './DashboardScreen';
import { TenantHomeScreen } from './guest/TenantHomeScreen';
import { GuestHomeScreen } from './guest/GuestHomeScreen';
import { GuestExploreScreen } from './guest/GuestExploreScreen';
import { PropertyDetailScreen } from './guest/PropertyDetailScreen';
import { GuestFilterModal } from './guest/GuestFilterModal';
import { NewRentalRequestFlow } from './workflow/NewRentalRequestFlow';
import { TenantRequestsTimeline } from './workflow/TenantRequestsTimeline';
import { LandlordRequestsQueue } from './workflow/LandlordRequestsQueue';
import { LandlordApplicantDossier } from './workflow/LandlordApplicantDossier';
import { MoveInConfirmedView } from './workflow/MoveInConfirmedView';
import { ChatHubView } from './workflow/ChatHubView';
import { ConversationDetailView } from './workflow/ConversationDetailView';
import { MainAppHeader } from './navigation/MainAppHeader';
import { AppBottomNav } from './navigation/AppBottomNav';
import { ProtectedRouteGuard } from './auth/ProtectedRouteGuard';
import { isNativeMobile } from '../utils/capacitor';

export const ScreenContainer: React.FC = () => {
  const { currentScreen, activeRole, isGuestSession } = useAuth();
  const isNative = isNativeMobile();

  return (
    <div className={`w-full flex flex-col items-center ${isNative ? 'h-full flex-1 min-h-0' : 'min-h-screen py-2 sm:py-6 px-1 sm:px-4'} bg-slate-100/70 dark:bg-slate-950 transition-colors`}>
      {/* Main Production Frame Container */}
      <div
        id="main-app-viewport"
        className={`w-full bg-white dark:bg-slate-900 transition-colors relative flex flex-col justify-between overflow-hidden ${
          isNative 
            ? 'h-full flex-1 min-h-0' 
            : 'max-w-[440px] mx-auto rounded-[36px] shadow-2xl dark:shadow-slate-950/90 border border-slate-200/90 dark:border-slate-800 min-h-[720px]'
        }`}
      >
        {/* Production App Header (Brand, Mode Badge, Notifications, Theme, Avatar) */}
        <MainAppHeader />

        {/* Screen Body */}
        <div className={`w-full flex-1 overflow-y-auto ${isNative ? 'px-4 sm:px-5 pt-3 pb-24 safe-area-bottom' : 'px-4 sm:px-5 pt-3 pb-24'}`}>
          <AnimatePresence mode="wait">
            {/* Screen: Logo Splash */}
            {currentScreen === 'logo-splash' && (
              <motion.div
                key="screen-logo-splash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <LogoScreen />
              </motion.div>
            )}

            {/* Screen: Welcome Onboarding */}
            {currentScreen === 'welcome' && (
              <motion.div
                key="screen-welcome"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <WelcomeScreen />
              </motion.div>
            )}

            {/* Screen: Tenant Home Dashboard */}
            {currentScreen === 'tenant-home' && (
              <motion.div
                key="screen-tenant-home"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="tenant-home" requiresAuth={true} requiredRole="tenant">
                  <TenantHomeScreen />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Tenant Profile */}
            {currentScreen === 'tenant-profile' && (
              <motion.div
                key="screen-tenant-profile"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="tenant-profile" requiresAuth={true} requiredRole="tenant">
                  <TenantProfileScreen />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Tenant New Rental Request Flow */}
            {currentScreen === 'tenant-new-request' && (
              <motion.div
                key="screen-tenant-new-request"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="tenant-new-request" requiresAuth={true} requiredRole="tenant">
                  <NewRentalRequestFlow />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Tenant Requests Timeline Tracker */}
            {currentScreen === 'tenant-requests-tracker' && (
              <motion.div
                key="screen-tenant-requests-tracker"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="tenant-requests-tracker" requiresAuth={true} requiredRole="tenant">
                  <TenantRequestsTimeline />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Move In Confirmed & Digital Key Vault */}
            {currentScreen === 'move-in-confirmed' && (
              <motion.div
                key="screen-move-in-confirmed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="move-in-confirmed" requiresAuth={true} requiredRole="tenant">
                  <MoveInConfirmedView />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Landlord Dashboard / Portfolio */}
            {currentScreen === 'dashboard' && (
              <motion.div
                key="screen-dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="dashboard" requiresAuth={true} requiredRole="landlord">
                  <DashboardScreen />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Landlord Requests Queue */}
            {currentScreen === 'landlord-requests-queue' && (
              <motion.div
                key="screen-landlord-requests-queue"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="landlord-requests-queue" requiresAuth={true} requiredRole="landlord">
                  <LandlordRequestsQueue />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Landlord Applicant Dossier */}
            {currentScreen === 'landlord-applicant-dossier' && (
              <motion.div
                key="screen-landlord-applicant-dossier"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="landlord-applicant-dossier" requiresAuth={true} requiredRole="landlord">
                  <LandlordApplicantDossier />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Landlord Profile */}
            {currentScreen === 'landlord-profile' && (
              <motion.div
                key="screen-landlord-profile"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="landlord-profile" requiresAuth={true} requiredRole="landlord">
                  <LandlordProfileScreen />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: List a Property 8-Step Wizard Flow */}
            {currentScreen === 'list-property' && (
              <motion.div
                key="screen-list-property"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="list-property" requiresAuth={true} requiredRole="landlord">
                  <ListPropertyScreen />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Chat Hub */}
            {currentScreen === 'chat-hub' && (
              <motion.div
                key="screen-chat-hub"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="chat-hub" requiresAuth={true}>
                  <ChatHubView />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Conversation Detail & DocuTrust Sign */}
            {currentScreen === 'chat-conversation' && (
              <motion.div
                key="screen-chat-conversation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <ProtectedRouteGuard screenName="chat-conversation" requiresAuth={true}>
                  <ConversationDetailView />
                </ProtectedRouteGuard>
              </motion.div>
            )}

            {/* Screen: Guest Home (Feeds / Stays) */}
            {currentScreen === 'guest-home' && (
              <motion.div
                key="screen-guest-home"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <GuestHomeScreen />
              </motion.div>
            )}

            {/* Screen: Map Explorer */}
            {currentScreen === 'guest-explore' && (
              <motion.div
                key="screen-guest-explore"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <GuestExploreScreen />
              </motion.div>
            )}

            {/* Screen: Property Details */}
            {currentScreen === 'property-detail' && (
              <motion.div
                key="screen-property-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
                className="w-full"
              >
                <PropertyDetailScreen />
              </motion.div>
            )}

            {/* Screen: Filters & Criteria */}
            {currentScreen === 'filters-criteria' && (
              <motion.div
                key="screen-filters-criteria"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <FiltersCriteriaScreen />
              </motion.div>
            )}

            {/* Screen: Register */}
            {currentScreen === 'register' && (
              <motion.div
                key="screen-register"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.22 }}
                className="w-full"
              >
                <RegistrationCard />
              </motion.div>
            )}

            {/* Screen: Login */}
            {currentScreen === 'login' && (
              <motion.div
                key="screen-login"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
                className="w-full"
              >
                <LoginScreen />
              </motion.div>
            )}

            {/* Screen: OTP Verification */}
            {currentScreen === 'otp-verification' && (
              <motion.div
                key="screen-otp-verification"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <OtpVerificationScreen />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Production Role-Aware Persistent Bottom Navigation */}
        <AppBottomNav />
      </div>

      {/* Global Interactive Filter Modal */}
      <GuestFilterModal />
    </div>
  );
};
