import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Mail,
  ShieldCheck,
  Sparkles,
  Building2,
  User,
  Compass,
  ArrowLeft,
  Sun,
  Moon,
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
    isSocialLoading,
    isGuestLoading,
    showPassword,
    toggleShowPassword,
    setLoginFieldValue,
    handleLoginSubmit,
    handleSocialLogin,
    handleGuestLogin,
    openForgotPassword,
    quickDemoLogin,
  } = useAuth();

  const [inputFocused, setInputFocused] = useState<'identifier' | 'password' | null>(null);

  return (
    <motion.div
      id="login-screen-root"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="w-full flex flex-col justify-between max-w-md mx-auto"
    >
      {/* Main Heading & Subtitle */}
      <div id="login-header-block" className="space-y-2 mt-1 mb-6">
        <h1
          id="login-main-title"
          className="text-3xl sm:text-[34px] font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15]"
        >
          Welcome to RentalTrust
        </h1>
        <p
          id="login-sub-title"
          className="text-[15px] sm:text-[16px] text-slate-600 dark:text-slate-300 font-normal leading-snug"
        >
          Role-protected escrow and verified leasing portal.
        </p>
      </div>

      {/* 1-Click Fast Role Sign-In Cards (Production Demo Authentication) */}
      <div className="mb-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Fast Role Authentication
          </span>
          <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> One-Click Sign In
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Sign in as Tenant */}
          <button
            type="button"
            onClick={() => quickDemoLogin('tenant')}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-200/80 dark:border-teal-800/80 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-xs transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Tenant Portal
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              Alex Chen &bull; Score 842
            </span>
          </button>

          {/* Sign in as Landlord */}
          <button
            type="button"
            onClick={() => quickDemoLogin('landlord')}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200/80 dark:border-indigo-800/80 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-xs transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Landlord Portal
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              Marcus Sterling &bull; 4 Units
            </span>
          </button>
        </div>
      </div>

      {/* General Form Error Banner */}
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

      {/* Login Form */}
      <form id="login-form" onSubmit={handleLoginSubmit} className="space-y-4">
        {/* Email or Phone Number */}
        <div id="field-group-identifier" className="space-y-1">
          <label
            htmlFor="input-login-identifier"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Email or Phone Number
          </label>
          <div className="relative">
            <input
              id="input-login-identifier"
              type="text"
              name="identifier"
              value={loginData.identifier}
              onChange={(e) => setLoginFieldValue('identifier', e.target.value)}
              onFocus={() => setInputFocused('identifier')}
              onBlur={() => setInputFocused(null)}
              placeholder="alex.chen@designhub.io"
              autoComplete="username"
              className={`w-full px-4 py-2.5 rounded-xl text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-[#f0f5ff] dark:bg-slate-800/80 border transition-all duration-200 focus:outline-none ${
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

        {/* Password */}
        <div id="field-group-password" className="space-y-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="input-login-password"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Password
            </label>
            <button
              id="btn-forgot-password"
              type="button"
              onClick={openForgotPassword}
              className="text-[11px] font-medium text-teal-600 dark:text-teal-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <input
              id="input-login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={loginData.password}
              onChange={(e) => setLoginFieldValue('password', e.target.value)}
              onFocus={() => setInputFocused('password')}
              onBlur={() => setInputFocused(null)}
              placeholder="••••••••"
              autoComplete="current-password"
              className={`w-full pl-4 pr-11 py-2.5 rounded-xl text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-[#f0f5ff] dark:bg-slate-800/80 border transition-all duration-200 focus:outline-none ${
                loginErrors.password
                  ? 'border-rose-300 dark:border-rose-700 ring-2 ring-rose-500/20 bg-rose-50/30'
                  : inputFocused === 'password'
                  ? 'border-teal-500 ring-2 ring-teal-500/20 bg-white dark:bg-slate-800'
                  : 'border-slate-200/70 dark:border-slate-700/60 hover:border-slate-300'
              }`}
            />
            <button
              id="btn-toggle-password-visibility"
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {loginErrors.password && (
            <p className="text-[11px] text-rose-500 mt-0.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {loginErrors.password}
            </p>
          )}
        </div>

        {/* Remember this device */}
        <div id="field-group-remember-device" className="flex items-center gap-2">
          <input
            id="checkbox-remember-device"
            type="checkbox"
            checked={loginData.rememberDevice}
            onChange={(e) => setLoginFieldValue('rememberDevice', e.target.checked)}
            className="w-3.5 h-3.5 rounded text-teal-600 border-slate-300 dark:border-slate-600 focus:ring-teal-500 cursor-pointer"
          />
          <label
            htmlFor="checkbox-remember-device"
            className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none"
          >
            Remember this device for 30 days
          </label>
        </div>

        {/* Primary CTA: Login -> */}
        <div className="pt-1 space-y-2">
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
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </>
            )}
          </motion.button>
        </div>
      </form>

      {/* Social Logins: Google & Apple */}
      <div id="social-login-group" className="grid grid-cols-2 gap-2.5 mt-4">
        {/* Google Button */}
        <button
          id="btn-social-google"
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={!!isSocialLoading}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#eef4ff] hover:bg-[#e2edff] dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 font-semibold text-xs border border-transparent transition-all disabled:opacity-60 cursor-pointer"
        >
          {isSocialLoading === 'google' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-600" />
          ) : (
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>Google</span>
        </button>

        {/* Apple Button */}
        <button
          id="btn-social-apple"
          type="button"
          onClick={() => handleSocialLogin('apple')}
          disabled={!!isSocialLoading}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#eef4ff] hover:bg-[#e2edff] dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 font-semibold text-xs border border-transparent transition-all disabled:opacity-60 cursor-pointer"
        >
          {isSocialLoading === 'apple' ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-600" />
          ) : (
            <svg className="w-3.5 h-3.5 shrink-0 fill-current text-slate-900 dark:text-white" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.79-11.99-14.25-5.73-8.67-10.15-18.42-13.25-29.25-3.1-10.83-4.66-21.2-4.66-31.12 0-14.24 3.74-26.06 11.23-35.45 7.48-9.39 16.92-14.16 28.32-14.31 4.7 0 10.05 1.25 16.04 3.75 6 2.5 9.77 3.84 11.33 4.02 1.34-.23 5.43-1.66 12.27-4.29 6.84-2.63 12.43-3.72 16.78-3.26 12.83 1.15 22.84 6.2 30.03 15.15-11.39 6.88-17.01 16.48-16.85 28.8.16 9.68 3.92 17.78 11.28 24.3 7.36 6.52 16.14 10.29 26.34 11.31-2.22 6.64-4.83 13.06-7.83 19.25zm-29.62-113.68c0 6.67-2.48 13.08-7.44 18.23-4.96 5.15-11.08 8.44-18.36 9.87-.58-1.57-.87-3.1-.87-4.59 0-6.66 2.65-13.28 7.95-18.86 5.3-5.58 11.53-8.87 18.72-9.87 0 1.63 0 3.37 0 5.22z" />
            </svg>
          )}
          <span>Apple</span>
        </button>
      </div>

      {/* Footer Navigation: Guest Exploration or Register */}
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
      </div>
    </motion.div>
  );
};
