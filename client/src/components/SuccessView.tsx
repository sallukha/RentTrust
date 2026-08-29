import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Sparkles, RefreshCw, Shield, MapPin, Key, UserCheck, LayoutDashboard, LogIn } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { useAuth } from '../context/AuthContext';

export const SuccessView: React.FC = () => {
  const { registeredResponse, resetForm } = useRegistration();
  const { setCurrentScreen } = useAuth();

  if (!registeredResponse) return null;

  const { user, onboardingSteps, message } = registeredResponse;
  const isTenant = user.profileType === 'tenant';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 py-2"
    >
      {/* Header Badge */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          className="inline-flex p-3 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-1 ring-8 ring-emerald-50 dark:ring-emerald-900/20 shadow-sm"
        >
          <CheckCircle2 className="w-9 h-9" />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Welcome, {user.fullName.split(' ')[0]}!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          {message}
        </p>
      </div>

      {/* Verified Member ID Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden border border-slate-700/50">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
              Verified Rental Passport
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
            Active Status
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            referrerPolicy="no-referrer"
            className="w-13 h-13 rounded-full object-cover ring-2 ring-blue-400/50"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-white">{user.fullName}</h3>
              <UserCheck className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xs text-slate-300 capitalize">
              Role: <span className="font-semibold text-blue-300">{isTenant ? 'Tenant Finder' : 'Property Landlord'}</span>
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {user.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-700/60 text-xs text-slate-300">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Email Address</span>
            <span className="font-medium truncate block">{user.email}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Phone Number</span>
            <span className="font-medium">{user.phoneNumber}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Next Onboarding Steps from REST API */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Next Steps in Your Journey
          </h4>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Fast Track
          </span>
        </div>

        <div className="space-y-2.5">
          {onboardingSteps.map((step) => (
            <div
              key={step.step}
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                step.status === 'ready'
                  ? 'bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-500'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  step.status === 'ready'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {step.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5
                    className={`text-xs font-bold ${
                      step.status === 'ready' ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {step.title}
                  </h5>
                  {step.status === 'ready' && (
                    <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-1.5 py-0.5 rounded">
                      Action Required
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={() => setCurrentScreen('dashboard')}
          className="w-full py-4 px-6 rounded-2xl bg-[#0e1628] dark:bg-blue-600 hover:bg-[#16233f] dark:hover:bg-blue-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Access Wealth & Portfolio Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              resetForm();
              setCurrentScreen('login');
            }}
            className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Go to Login</span>
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Register New</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
