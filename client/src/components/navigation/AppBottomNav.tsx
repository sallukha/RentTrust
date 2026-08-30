import React from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  MapPin,
  MessageSquare,
  Bookmark,
  User,
  LayoutDashboard,
  Users,
  PlusCircle,
  ShieldCheck,
  FileCheck2,
  Home,
  Building2,
  Building,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AppScreen } from '../../types';

export const AppBottomNav: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    activeRole,
    isGuestSession,
    guestTab,
    setGuestTab,
    conversations,
    rentalApplication,
  } = useAuth();

  // Hide on standalone immersion screens
  const isImmersiveFlow = [
    'logo-splash',
    'welcome',
    'login',
    'register',
    'otp-verification',
    'property-detail',
    'tenant-new-request',
    'move-in-confirmed',
    'list-property',
  ].includes(currentScreen);

  if (isImmersiveFlow) return null;

  const unreadCount = conversations.filter((c) => c.unread).length;
  const isAppPending = rentalApplication.status === 'submitted' || rentalApplication.status === 'shortlisted';

  // --- TENANT TABS ---
  if (!isGuestSession && activeRole === 'tenant') {
    const isHome = currentScreen === 'tenant-home';
    const isExplore = currentScreen === 'guest-explore';
    const isRequests = currentScreen === 'tenant-requests-tracker';
    const isMessages = currentScreen === 'chat-hub' || currentScreen === 'chat-conversation';
    const isProfile = currentScreen === 'tenant-profile';

    return (
      <nav
        id="tenant-bottom-nav"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-2 px-3 sm:px-6 transition-colors shadow-lg"
      >
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentScreen('tenant-home')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 ${
              isHome
                ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('guest-explore')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 ${
              isExplore
                ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Explore</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('tenant-requests-tracker')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 relative ${
              isRequests
                ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <FileCheck2 className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Requests</span>
            {isAppPending && (
              <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('chat-hub')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 relative ${
              isMessages
                ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Messages</span>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('tenant-profile')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 ${
              isProfile
                ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Profile</span>
          </button>
        </div>
      </nav>
    );
  }

  // --- LANDLORD / ADMIN TABS ---
  if (!isGuestSession && (activeRole === 'landlord' || activeRole === 'admin')) {
    const isDashboard = currentScreen === 'dashboard';
    const isApplicants = currentScreen === 'landlord-requests-queue' || currentScreen === 'landlord-applicant-dossier';
    const isListProperty = currentScreen === 'list-property';
    const isMessages = currentScreen === 'chat-hub' || currentScreen === 'chat-conversation';
    const isProfile = currentScreen === 'landlord-profile';

    return (
      <nav
        id="landlord-bottom-nav"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-2 px-3 sm:px-6 transition-colors shadow-lg"
      >
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 ${
              isDashboard
                ? 'text-indigo-600 dark:text-indigo-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('landlord-requests-queue')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 relative ${
              isApplicants
                ? 'text-indigo-600 dark:text-indigo-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Applicants</span>
            {isAppPending && (
              <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('list-property')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 ${
              isListProperty
                ? 'text-indigo-600 dark:text-indigo-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <PlusCircle className="w-5 h-5 text-indigo-500" />
            <span className="text-[10px] tracking-tight">List Unit</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('chat-hub')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 relative ${
              isMessages
                ? 'text-indigo-600 dark:text-indigo-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Messages</span>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('landlord-profile')}
            className={`flex flex-col items-center gap-1 transition-all flex-1 ${
              isProfile
                ? 'text-indigo-600 dark:text-indigo-400 font-extrabold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Profile</span>
          </button>
        </div>
      </nav>
    );
  }

  // --- GUEST TABS (Unauthenticated Explorer) ---
  const isGuestHome = currentScreen === 'guest-home' && guestTab === 'home';
  const isGuestExplore = currentScreen === 'guest-explore' || guestTab === 'explore';
  const isGuestRequests = currentScreen === 'guest-home' && guestTab === 'requests';
  const isGuestChat = currentScreen === 'guest-home' && guestTab === 'chat';
  const isGuestProfile = currentScreen === 'guest-home' && guestTab === 'profile';

  return (
    <nav
      id="guest-bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-2 px-3 sm:px-6 transition-colors shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setGuestTab('home');
            setCurrentScreen('guest-home');
          }}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${
            isGuestHome
              ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Stays</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setGuestTab('explore');
            setCurrentScreen('guest-explore');
          }}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${
            isGuestExplore
              ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Explore</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setGuestTab('requests');
            setCurrentScreen('guest-home');
          }}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${
            isGuestRequests
              ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Saved</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setGuestTab('chat');
            setCurrentScreen('guest-home');
          }}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${
            isGuestChat
              ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Messages</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentScreen('login');
          }}
          className="flex flex-col items-center gap-1 transition-all flex-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Sign In</span>
        </button>
      </div>
    </nav>
  );
};
function LayoutGrid(props: any) {
  return <LayoutDashboard {...props} />;
}
