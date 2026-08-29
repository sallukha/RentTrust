import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, KeyRound, Mail, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ForgotPasswordModal: React.FC = () => {
  const {
    isForgotPasswordOpen,
    closeForgotPassword,
    forgotIdentifier,
    setForgotIdentifier,
    forgotSuccessMessage,
    forgotError,
    isForgotSubmitting,
    handleForgotPasswordSubmit,
  } = useAuth();

  return (
    <AnimatePresence>
      {isForgotPasswordOpen && (
        <div id="forgot-password-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForgotPassword}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            id="forgot-password-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              id="btn-close-forgot-modal"
              type="button"
              onClick={closeForgotPassword}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Reset Password
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Recover access to your portfolio account
                </p>
              </div>
            </div>

            {forgotSuccessMessage ? (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200">
                    <p className="font-semibold">Reset Link Dispatched</p>
                    <p className="mt-1 leading-relaxed">{forgotSuccessMessage}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeForgotPassword}
                  className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 text-white text-sm font-medium transition-colors"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Enter the email address or phone number linked with your account and we will send you a one-time verification link.
                </p>

                {forgotError && (
                  <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 flex items-start gap-2 text-rose-700 dark:text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{forgotError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="forgot-identifier-input" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Registered Email or Phone
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="forgot-identifier-input"
                      type="text"
                      value={forgotIdentifier}
                      onChange={(e) => setForgotIdentifier(e.target.value)}
                      placeholder="name@example.com or phone"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-slate-900 dark:text-white text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={closeForgotPassword}
                    className="w-1/2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isForgotSubmitting}
                    className="w-1/2 py-2.5 rounded-xl bg-[#008080] hover:bg-teal-700 text-white text-sm font-medium flex items-center justify-center gap-1.5 transition-colors disabled:opacity-70"
                  >
                    {isForgotSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Send Link</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
