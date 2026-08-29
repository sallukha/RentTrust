import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  FileText,
  Lock,
  ArrowRight,
  User,
  Check,
  Info,
  Building2,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TenantRequestsTimeline: React.FC = () => {
  const {
    rentalApplication,
    setCurrentScreen,
    setGuestTab,
    switchRole,
  } = useAuth();

  const [showDossierModal, setShowDossierModal] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto space-y-5 pb-6">
      <div>
        <div className="space-y-4">
          {/* Phase Banner */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-50 to-blue-50/70 dark:from-slate-850 dark:to-slate-800 border border-sky-100 dark:border-slate-700 space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold tracking-widest text-slate-500 dark:text-slate-400 uppercase block">
                  CURRENT PHASE
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Reviewing Profile
                </h2>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-sky-100 dark:border-slate-700 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Landlord <strong className="font-extrabold text-slate-900 dark:text-white">Marcus S.</strong> is reviewing your profile. Average response: <strong className="text-teal-600 dark:text-teal-400 font-bold">4 hours</strong>.
              </p>
            </div>
          </div>

          {/* Vertical Stepper Timeline */}
          <div className="py-2 pl-2 space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-teal-500">
            {/* Step 1: Submitted */}
            <div className="relative pl-8 space-y-1">
              <span className="absolute left-1.5 top-0 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Submitted
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px] font-extrabold uppercase">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your application was successfully encrypted and sent.
              </p>
              <p className="text-[10px] font-bold text-slate-400">Oct 12, 09:30 AM</p>
            </div>

            {/* Step 2: Viewed */}
            <div className="relative pl-8 space-y-1">
              <span className="absolute left-1.5 top-0 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Viewed
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The landlord has opened your verified profile dossier.
              </p>
              <p className="text-[10px] font-bold text-slate-400">Oct 13, 02:15 PM</p>
            </div>

            {/* Step 3: Shortlisted (Current stage) */}
            <div className="relative pl-8 space-y-2.5">
              <span className="absolute left-1.5 top-0 w-6 h-6 rounded-full bg-teal-200 dark:bg-teal-900 border-2 border-teal-500 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-ping" />
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-teal-700 dark:text-teal-400">
                  Shortlisted
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  You've been moved to the priority candidate pool!
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowDossierModal(true)}
                  className="py-2 px-4 rounded-xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-600 dark:hover:bg-teal-500 text-white text-xs font-extrabold shadow-sm transition-all"
                >
                  View Dossier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentScreen('chat-conversation');
                  }}
                  className="py-2 px-4 rounded-xl bg-sky-100/80 hover:bg-sky-200/80 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-extrabold transition-all"
                >
                  Message Marcus
                </button>
              </div>
              <p className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                Current stage &bull; Oct 14
              </p>
            </div>

            {/* Step 4: Pending Final Review */}
            <div className="relative pl-8 space-y-1 opacity-50">
              <span className="absolute left-2.5 top-1 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Pending Final Review
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Background check and reference validation phase.
              </p>
            </div>

            {/* Step 5: Decision */}
            <div className="relative pl-8 space-y-1 opacity-50">
              <span className="absolute left-2.5 top-1 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Decision
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Final offer or application feedback will be provided here.
              </p>
            </div>
          </div>

          {/* Quick Simulation Link to Landlord */}
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                Want to test Landlord decision?
              </p>
              <p className="text-[11px] text-indigo-600 dark:text-indigo-400">
                Switch to Marcus Sterling to review & approve this dossier.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                switchRole('landlord');
                setCurrentScreen('landlord-requests-queue');
              }}
              className="py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-extrabold transition-all"
            >
              Open Queue &rarr;
            </button>
          </div>

          {/* Trust-First Marketplace Security Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Trust-First Marketplace
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                Your data is protected by AES-256 encryption. Only shortlisted landlords can access your full background credentials.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDossierModal(true)}
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Learn more about Rental Reputation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dossier Modal */}
      <AnimatePresence>
        {showDossierModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Alex Chen &bull; Verified Dossier</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowDossierModal(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
                  <span className="font-bold text-teal-900 dark:text-teal-200">
                    Rental Reputation
                  </span>
                  <span className="font-black text-teal-600 text-sm">942 / 1000</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <p className="text-[10px] text-slate-400">Employer</p>
                    <p className="font-bold">Stripe Inc.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <p className="text-[10px] text-slate-400">Income</p>
                    <p className="font-bold">$165,000/yr (Verified)</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <p className="text-[10px] text-slate-400">Credit Tier</p>
                    <p className="font-bold">Excellent (780+)</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <p className="text-[10px] text-slate-400">Biometric ID</p>
                    <p className="font-bold text-teal-600">Passed ✓</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDossierModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-950 dark:bg-teal-600 text-white font-bold text-xs"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
