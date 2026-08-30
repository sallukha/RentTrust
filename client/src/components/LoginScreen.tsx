import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Compass,
  Loader2,
  AlertCircle,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
  User,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { RentalTrustLogoMark } from './RentalTrustLogo';

export const LoginScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    setCurrentScreen,
    loginData,
    loginErrors,
    isLoggingIn,
    isGuestLoading,
    setLoginFieldValue,
    handleLoginSubmit,
    handleGuestLogin,
  } = useAuth();

  const [inputFocused, setInputFocused] = useState<'identifier' | null>(null);

  return (
    <motion.div
      id="login-screen-root"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="w-full flex flex-col justify-between max-w-md mx-auto"
    >
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={() => setCurrentScreen('guest-home')}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          aria-label="Back to browsing"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <RentalTrustLogoMark size={34} />
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div id="login-header-block" className="space-y-2 mt-1 mb-6">
        <h1 className="text-3xl sm:text-[34px] font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15]">
          Welcome to RentalTrust
        </h1>
        <p className="text-[15px] sm:text-[16px] text-slate-600 dark:text-slate-300 font-normal leading-snug">
          Sign in with the OTP flow used by the backend.
        </p>
      </div>

      <div className="mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
          Account role
        </span>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setLoginFieldValue('role', 'tenant')}
            className={`p-2.5 rounded-xl border transition-all text-left flex flex-col justify-between group cursor-pointer ${
              loginData.role === 'tenant'
                ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500'
                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-black text-slate-900 dark:text-white">Tenant</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">OTP</span>
          </button>

          <button
            type="button"
            onClick={() => setLoginFieldValue('role', 'landlord')}
            className={`p-2.5 rounded-xl border transition-all text-left flex flex-col justify-between group cursor-pointer ${
              loginData.role === 'landlord'
                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500'
                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-500'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-black text-slate-900 dark:text-white">Landlord</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">OTP</span>
          </button>

          <button
            type="button"
            onClick={() => setLoginFieldValue('role', 'admin')}
            className={`p-2.5 rounded-xl border transition-all text-left flex flex-col justify-between group cursor-pointer ${
              loginData.role === 'admin'
                ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-500'
                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-700/80 hover:border-violet-500'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-black text-slate-900 dark:text-white">Admin</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Ops</span>
          </button>
        </div>
      </div>

      {loginErrors.general && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs sm:text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{loginErrors.general}</span>
        </motion.div>
      )}

      <form id="login-form" onSubmit={handleLoginSubmit} className="space-y-4">
        <div id="field-group-identifier" className="space-y-1">
          <label htmlFor="input-login-identifier" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Email or Phone Number
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="input-login-identifier"
              type="text"
              name="identifier"
              value={loginData.identifier}
              onChange={(e) => setLoginFieldValue('identifier', e.target.value)}
              onFocus={() => setInputFocused('identifier')}
              onBlur={() => setInputFocused(null)}
              placeholder="name@example.com or phone"
              autoComplete="username"
              className={`w-full pl-10 pr-4 py-3 rounded-xl text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-[#f0f5ff] dark:bg-slate-800/80 border transition-all duration-200 focus:outline-none ${
                loginErrors.identifier
                  ? 'border-rose-300 dark:border-rose-700 ring-2 ring-rose-500/20 bg-rose-50/30'
                  : inputFocused === 'identifier'
                  ? 'border-teal-500 ring-2 ring-teal-500/20 bg-white dark:bg-slate-800'
                  : 'border-slate-200/70 dark:border-slate-700/60 hover:border-slate-300'
              }`}
            />
          </div>
          {loginErrors.identifier && (
            <p className="text-[11px] text-rose-500 mt-0.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {loginErrors.identifier}
            </p>
          )}
        </div>

        <div id="field-group-remember-device" className="flex items-center gap-2">
          <input
            id="checkbox-remember-device"
            type="checkbox"
            checked={loginData.rememberDevice}
            onChange={(e) => setLoginFieldValue('rememberDevice', e.target.checked)}
            className="w-3.5 h-3.5 rounded text-teal-600 border-slate-300 dark:border-slate-600 focus:ring-teal-500 cursor-pointer"
          />
          <label htmlFor="checkbox-remember-device" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            Remember this device
          </label>
        </div>

        <motion.button
          id="btn-submit-login"
          type="submit"
          disabled={isLoggingIn}
          whileTap={{ scale: isLoggingIn ? 1 : 0.99 }}
          className="w-full py-3 px-6 rounded-xl bg-[#0e1628] hover:bg-[#162238] dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending OTP...</span>
            </>
          ) : (
            <>
              <span>Send OTP</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </>
          )}
        </motion.button>
      </form>

      <div id="login-footer" className="mt-5 text-center space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Want to view listings first?{' '}
          <button
            id="btn-continue-as-guest"
            type="button"
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
            className="font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            {isGuestLoading && <Loader2 className="w-3 h-3 animate-spin" />}
            <Compass className="w-3 h-3" />
            <span>Browse as Guest Explorer</span>
          </button>
        </p>

        <p className="text-[11px] text-slate-400">
          Don't have an account?{' '}
          <button
            id="btn-go-to-signup"
            type="button"
            onClick={() => setCurrentScreen('register')}
            className="text-slate-700 dark:text-slate-300 hover:text-teal-600 font-bold underline"
          >
            Create New Account
          </button>
        </p>

        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-2">
          <ShieldCheck className="w-3 h-3" />
          <span>Backend OTP authentication</span>
        </div>
      </div>
    </motion.div>
  );
};
