import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Moon, Sun, ShieldCheck, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRegistration } from '../context/RegistrationContext';
import { useAuth } from '../context/AuthContext';
import { RentalTrustLogoMark } from './RentalTrustLogo';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { registeredResponse, resetForm } = useRegistration();
  const { setCurrentScreen } = useAuth();

  const handleBack = () => {
    if (registeredResponse) {
      resetForm();
    } else {
      setCurrentScreen('login');
    }
  };

  return (
    <header className="flex items-center justify-between pt-2 pb-4">
      {/* Back button: navigates to Login or previous step */}
      <button
        id="btn-back-nav"
        type="button"
        onClick={handleBack}
        className="group flex items-center gap-1.5 text-slate-800 dark:text-slate-100 font-semibold text-lg hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg py-1 px-1 -ml-1"
        aria-label="Back to Login"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5 text-slate-800 dark:text-slate-100" />
        <span className="tracking-tight text-xl font-bold font-sans">Register</span>
      </button>

      {/* Center RentalTrust Logo Mark */}
      <div className="hidden sm:flex items-center justify-center">
        <RentalTrustLogoMark size={28} animated={false} />
      </div>

      {/* Right controls: Switch to Login + Theme Toggle */}
      <div className="flex items-center gap-2">
        <button
          id="btn-nav-to-login"
          type="button"
          onClick={() => setCurrentScreen('login')}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-2.5 py-1 rounded-full bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 flex items-center gap-1 transition-colors"
        >
          <LogIn className="w-3 h-3" />
          <span>Login</span>
        </button>

        <button
          id="btn-theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </motion.div>
        </button>
      </div>
    </header>
  );
};

