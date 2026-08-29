import React, { useState } from 'react';
import { User, LogIn, UserPlus, Shield, Moon, Sun, Bookmark, X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { HeaderActions } from '../navigation/HeaderActions';

interface GuestTopHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  subtitle?: string;
}

export const GuestTopHeader: React.FC<GuestTopHeaderProps> = ({
  title,
  showBack = false,
  onBack,
  subtitle,
}) => {
  const { currentScreen, setCurrentScreen, currentUser, savedPropertyIds, isGuestSession } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="w-full relative">
      <header className="flex items-center justify-between py-2 px-1 mb-2">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              type="button"
              id="header-back-btn"
              onClick={onBack || (() => setCurrentScreen('guest-home'))}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>
        <HeaderActions />
      </header>
    </div>
  );
};
