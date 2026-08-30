import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  LogIn,
  UserPlus,
  ArrowLeftRight,
  Building2,
  User,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ActiveUserRole, AppScreen } from '../../types';

interface ProtectedRouteGuardProps {
  children: React.ReactNode;
  screenName: AppScreen;
  requiredRole?: ActiveUserRole;
  requiresAuth?: boolean;
}

export const ProtectedRouteGuard: React.FC<ProtectedRouteGuardProps> = ({
  children,
  screenName,
  requiredRole,
  requiresAuth = false,
}) => {
  const {
    currentUser,
    isGuestSession,
    activeRole,
    switchRole,
    setCurrentScreen,
    setReturnToScreenAfterAuth,
  } = useAuth();

  // 1. Check if unauthenticated and screen requires auth
  if (requiresAuth && isGuestSession) {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-6 text-center py-10 select-none">
        <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto shadow-md ring-8 ring-teal-500/10">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Verified Authentication Required</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Sign In to Access Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            This protected section requires a verified tenant passport or landlord deed identity to guarantee escrow security.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setReturnToScreenAfterAuth(screenName);
              setCurrentScreen('login');
            }}
            className="w-full py-3.5 rounded-2xl bg-[#0e1628] dark:bg-teal-600 hover:bg-[#15223e] dark:hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Continue</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setReturnToScreenAfterAuth(screenName);
              setCurrentScreen('register');
            }}
            className="w-full py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-teal-600" />
            <span>Create Verified Account</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('guest-home')}
            className="text-xs text-slate-500 dark:text-slate-400 hover:underline pt-1 block mx-auto"
          >
            Continue browsing public stays &rarr;
          </button>
        </div>
      </div>
    );
  }

  // 2. Check if user is in Tenant mode trying to access Landlord-only screens
  if (requiredRole === 'landlord' && activeRole !== 'landlord' && activeRole !== 'admin') {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-6 text-center py-10 select-none">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-md ring-8 ring-indigo-500/10">
          <Building2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Landlord Operations Required</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Switch to Landlord Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            You are currently browsing as a Tenant. Switch to Landlord Mode to manage properties, inspect applicant dossiers, and review portfolio revenue.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => {
              switchRole('landlord');
              setCurrentScreen(screenName);
            }}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Switch to Landlord Mode & Open</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('tenant-home')}
            className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all"
          >
            Back to Tenant Home
          </button>
        </div>
      </div>
    );
  }

  // 3. Check if user is in Landlord mode trying to access Tenant-only screens
  if (requiredRole === 'tenant' && activeRole !== 'tenant' && activeRole !== 'admin') {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-6 text-center py-10 select-none">
        <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto shadow-md ring-8 ring-teal-500/10">
          <User className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span>Tenant Mode Required</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Switch to Tenant Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            You are currently operating in Landlord Mode. Switch to Tenant Mode to submit rental applications, check reputation scores, and sign leases.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => {
              switchRole('tenant');
              setCurrentScreen(screenName);
            }}
            className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Switch to Tenant Mode & Open</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all"
          >
            Back to Landlord Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (requiredRole === 'admin' && activeRole !== 'admin') {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-6 text-center py-10 select-none">
        <div className="w-16 h-16 rounded-3xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto shadow-md ring-8 ring-violet-500/10">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-bold border border-violet-200 dark:border-violet-800">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
            <span>Admin Access Required</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Switch to Admin Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            This section is restricted to platform administrators. Sign in as an admin to manage escalations, compliance, and marketplace operations.
          </p>
        </div>
      </div>
    );
  }

  // Authorized
  return <>{children}</>;
};
