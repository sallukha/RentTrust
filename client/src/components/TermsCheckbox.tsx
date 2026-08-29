import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertCircle } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';

export const TermsCheckbox: React.FC = () => {
  const { formData, errors, touched, setFieldValue, openLegalModal } = useRegistration();

  const isChecked = formData.termsAccepted;
  const isTouched = !!touched.termsAccepted;
  const error = errors.termsAccepted;

  return (
    <div className="space-y-1 pt-1">
      <div className="flex items-start gap-3">
        {/* Custom Accessible Checkbox */}
        <button
          id="btn-terms-checkbox"
          type="button"
          role="checkbox"
          aria-checked={isChecked}
          onClick={() => setFieldValue('termsAccepted', !isChecked)}
          className={`relative flex-shrink-0 w-6 h-6 rounded-lg transition-all duration-150 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 mt-0.5 ${
            isChecked
              ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
              : 'bg-[#e0ecff] dark:bg-slate-700 hover:bg-[#d2e4ff] dark:hover:bg-slate-600 border border-blue-200/60 dark:border-slate-600'
          } ${error && isTouched && !isChecked ? 'ring-2 ring-rose-500/60' : ''}`}
        >
          <AnimatePresence>
            {isChecked && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Text with clickable dynamic legal links */}
        <label
          htmlFor="btn-terms-checkbox"
          className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-300 select-none cursor-pointer"
        >
          <span>I agree to the </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openLegalModal('terms');
            }}
            className="font-bold text-[#008080] dark:text-teal-400 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 rounded inline"
          >
            Terms of Service
          </button>
          <span> and </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openLegalModal('privacy');
            }}
            className="font-bold text-[#008080] dark:text-teal-400 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 rounded inline"
          >
            Privacy Policy
          </button>
          <span>.</span>
        </label>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && isTouched && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 pl-9 text-xs font-medium text-rose-600 dark:text-rose-400"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
