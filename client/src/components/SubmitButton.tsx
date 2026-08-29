import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { useAuth } from '../context/AuthContext';

export const SubmitButton: React.FC = () => {
  const { isSubmitting, errors, handleSubmit } = useRegistration();
  const { setCurrentScreen } = useAuth();

  const handleCreateAccount = async (e: React.MouseEvent) => {
    const ok = await handleSubmit(e);
    if (ok) {
      setCurrentScreen('otp-verification');
    }
  };

  return (
    <div className="space-y-3 pt-2">
      {/* General API error banner if any */}
      {errors.general && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-medium text-rose-700 dark:text-rose-300 flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <span>{errors.general}</span>
        </motion.div>
      )}

      {/* Main Submit Action Button */}
      <motion.button
        id="btn-create-account"
        type="button"
        disabled={isSubmitting}
        onClick={handleCreateAccount}
        whileHover={!isSubmitting ? { scale: 1.01 } : {}}
        whileTap={!isSubmitting ? { scale: 0.985 } : {}}
        className={`group relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-[16px] text-white shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 cursor-pointer ${
          isSubmitting
            ? 'bg-slate-800 opacity-90 cursor-not-allowed'
            : 'bg-[#0e1628] dark:bg-blue-600 hover:bg-[#16233f] dark:hover:bg-blue-500 hover:shadow-lg active:shadow-sm'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
            <span>Creating your account...</span>
          </>
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </motion.button>
    </div>
  );
};
