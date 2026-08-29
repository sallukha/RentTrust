import React from 'react';
import { ArrowLeft, Video, Phone, MoreVertical, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { HeaderActions } from './HeaderActions';

export const MainAppHeader: React.FC = () => {
  const { currentScreen, setCurrentScreen, tenantAppStep, setTenantAppStep, conversations, activeConversationId } = useAuth();

  const isChat = currentScreen === 'chat-conversation';
  const activeConv = conversations.find(c => c.id === activeConversationId);

  // Define titles for different screens
  const getScreenTitle = () => {
    if (isChat) return activeConv?.participantName || 'Chat';
    switch (currentScreen) {
      case 'tenant-home': return 'Tenant Home';
      case 'tenant-profile': return 'My Profile';
      case 'tenant-new-request':
        if (tenantAppStep === 0) return 'New Request';
        return `Step ${tenantAppStep} of 3`;
      case 'tenant-requests-tracker': return 'My Requests';
      case 'dashboard': return 'Dashboard';
      case 'landlord-profile': return 'Landlord Profile';
      case 'landlord-requests-queue': return 'Applicants';
      case 'landlord-applicant-dossier': return 'Applicant Dossier';
      case 'chat-hub': return 'Messages';
      case 'guest-home': return 'RentalTrust';
      case 'guest-explore': return 'Explore';
      case 'property-detail': return 'Property Details';
      case 'move-in-confirmed': return 'Active Lease';
      case 'login': return 'Login';
      case 'register': return 'Register';
      default: return '';
    }
  };

  // Screens that should NOT show the header
  const isImmersiveScreen = [
    'logo-splash',
    'welcome',
    'otp-verification'
  ].includes(currentScreen);

  if (isImmersiveScreen) return null;

  const title = getScreenTitle();
  if (!title) return null;

  const showBack = [
    'property-detail',
    'tenant-new-request',
    'chat-conversation',
    'landlord-requests-queue',
    'landlord-applicant-dossier',
    'login',
    'register'
  ].includes(currentScreen);

  const handleBack = () => {
    if (currentScreen === 'property-detail') {
      setCurrentScreen('guest-explore');
    } else if (currentScreen === 'tenant-new-request') {
      if (tenantAppStep > 0) {
        setTenantAppStep(tenantAppStep - 1);
      } else {
        setCurrentScreen('tenant-home');
      }
    } else if (currentScreen === 'chat-conversation') {
      setCurrentScreen('chat-hub');
    } else if (currentScreen === 'landlord-applicant-dossier') {
      setCurrentScreen('landlord-requests-queue');
    } else if (currentScreen === 'landlord-requests-queue') {
      setCurrentScreen('dashboard');
    } else if (currentScreen === 'login' || currentScreen === 'register') {
      setCurrentScreen('welcome');
    }
  };

  return (
    <header className="w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-sm safe-area-top shrink-0">
      <div className={`max-w-md mx-auto px-4 ${isChat ? 'py-2' : 'py-3'} flex items-center justify-between`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-1 -ml-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-slate-900 dark:text-white" />
            </button>
          )}

          {isChat && activeConv ? (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={activeConv.participantAvatar}
                  alt={activeConv.participantName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-teal-500 text-white flex items-center justify-center border-2 border-white dark:border-slate-900">
                  <ShieldCheck className="w-2 h-2" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-[15px] font-bold text-slate-950 dark:text-white truncate">
                  {title}
                </h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  Online &bull; {activeConv.propertyTitle}
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
              {title}
            </h1>
          )}
        </div>
      </div>
    </header>
  );
};
