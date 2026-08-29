import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Loader2 } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';

export const TermsModal: React.FC = () => {
  const {
    legalModalType,
    legalDoc,
    isLegalLoading,
    closeLegalModal,
    openLegalModal,
  } = useRegistration();

  if (!legalModalType) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Modal Header with Tabs */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => openLegalModal('terms')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    legalModalType === 'terms'
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Terms of Service
                </button>
                <button
                  type="button"
                  onClick={() => openLegalModal('privacy')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    legalModalType === 'privacy'
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Privacy Policy
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={closeLegalModal}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto space-y-4">
            {isLegalLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                <span className="text-xs">Fetching dynamic legal policy from REST API...</span>
              </div>
            ) : legalDoc ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{legalDoc.title}</span>
                  <span>Effective: {legalDoc.lastUpdated}</span>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {legalDoc.sections.map((sec, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                        {sec.heading}
                      </h4>
                      <p>{sec.content}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Your privacy and verified security are guaranteed under tenant protection laws.</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Document could not be loaded.</p>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={closeLegalModal}
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
            >
              I Understand & Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
