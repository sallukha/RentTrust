import React from 'react';
import { Home, Compass, MessageSquare, CheckCircle2, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GuestBottomTab } from '../../types';

export const GuestBottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen, guestTab, setGuestTab } = useAuth();

  const handleTabClick = (tab: GuestBottomTab) => {
    setGuestTab(tab);
    if (tab === 'home') {
      if (currentScreen !== 'tenant-home' && currentScreen !== 'guest-home') {
        setCurrentScreen('tenant-home');
      }
    } else if (tab === 'explore') {
      setCurrentScreen('guest-explore');
    } else if (tab === 'chat') {
      setCurrentScreen('chat-hub');
    } else if (tab === 'requests') {
      setCurrentScreen('tenant-requests-tracker');
    } else if (tab === 'profile') {
      setCurrentScreen('landlord-profile');
    }
  };

  const navItems: { id: GuestBottomTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'requests', label: 'Requests', icon: CheckCircle2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const activeTabId =
    currentScreen === 'guest-explore'
      ? 'explore'
      : currentScreen === 'tenant-home' || currentScreen === 'guest-home'
      ? guestTab === 'explore'
        ? 'home'
        : guestTab
      : guestTab;

  return (
    <div
      id="guest-bottom-navigation"
      className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTabId === item.id && currentScreen !== 'property-detail';

        return (
          <button
            key={item.id}
            id={`guest-tab-${item.id}`}
            type="button"
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-slate-950 dark:text-white font-bold scale-105'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-slate-900 dark:bg-teal-400 absolute -bottom-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
};
