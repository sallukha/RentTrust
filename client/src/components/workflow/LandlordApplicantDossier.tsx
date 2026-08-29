import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  MessageSquare,
  Building,
  Check,
  X,
  Send,
  Sparkles,
  FileCheck,
  Calendar,
  DollarSign,
  Star,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LandlordApplicantDossier: React.FC = () => {
  const {
    rentalApplication,
    approveLandlordApplication,
    declineLandlordApplication,
    setCurrentScreen,
    switchRole,
  } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showApprovalSuccess, setShowApprovalSuccess] = useState(false);

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      approveLandlordApplication(rentalApplication.id);
      setIsProcessing(false);
      setShowApprovalSuccess(true);
    }, 600);
  };

  const handleDecline = () => {
    declineLandlordApplication(rentalApplication.id);
    setCurrentScreen('landlord-requests-queue');
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">
      <div>
        {/* Top Header */}
        <div className="px-4 pt-3 pb-2 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentScreen('landlord-requests-queue')}
              className="p-1.5 -ml-1.5 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-extrabold border border-teal-200 dark:border-teal-800">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Verified Dossier</span>
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4 max-w-lg mx-auto">
          {/* Applicant Header Card (Screen 9) */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Julian Thorne"
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center border-2 border-white dark:border-slate-850 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-0.5">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Julian Thorne
                </h2>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Senior Software Engineer &bull; Seattle, WA
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">
                    Stripe &bull; $165,000/yr
                  </span>
                </div>
              </div>
            </div>

            {/* Score pill */}
            <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-teal-900 dark:text-teal-200 uppercase tracking-wider block">
                  REPUTATION SCORE
                </span>
                <span className="text-2xl font-black text-teal-700 dark:text-teal-300">
                  942 <span className="text-xs font-bold text-teal-600/70">/ 1000</span>
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-600 text-white text-[11px] font-extrabold shadow-sm">
                Top 1% of Renters
              </span>
            </div>
          </div>

          {/* 4 Pillar Metric Tiles (Screen 9) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                FINANCIALS
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900 dark:text-white">98%</span>
                <span className="text-[10px] font-bold text-teal-600">On-Time</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 w-[98%] rounded-full" />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                PROPERTY CARE
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900 dark:text-white">95%</span>
                <span className="text-[10px] font-bold text-teal-600">Pristine</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 w-[95%] rounded-full" />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                COMMUNICATION
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900 dark:text-white">100%</span>
                <span className="text-[10px] font-bold text-teal-600">14m Avg</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 w-[100%] rounded-full" />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-sm">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                COMMUNITY
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900 dark:text-white">92%</span>
                <span className="text-[10px] font-bold text-teal-600">Courteous</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 w-[92%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Trust Insights */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Trust Insights</span>
            </h3>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Always Early Payments
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    Last 36 months recorded with zero delays or missed rent.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Highly Responsive
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    Average response time: 14 mins for landlord communications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rental History */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-500" />
              <span>Rental History</span>
            </h3>

            <div className="space-y-2.5">
              {/* History Item 1 */}
              <div className="p-3 rounded-2xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    The Mercer Lofts
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold">Jan 2021 - Present</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Landlord: Sarah Jenkins
                </p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-[9px] font-extrabold text-teal-700 dark:text-teal-300">
                    FLAWLESS EXIT
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-[9px] font-extrabold text-teal-700 dark:text-teal-300">
                    POSITIVE REVIEW
                  </span>
                </div>
              </div>

              {/* History Item 2 */}
              <div className="p-3 rounded-2xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Greenway Residences
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold">
                    June 2018 - Dec 2020
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Landlord: Alex Chen
                </p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-[9px] font-extrabold text-teal-700 dark:text-teal-300">
                    NO DISPUTES
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Review Quote */}
            <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 space-y-1.5">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                “Julian is the gold standard for tenants. Never had a single issue in 3 years. The apartment was returned in pristine condition.”
              </p>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                — Sarah Jenkins, Property Owner
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto w-full">
        {showApprovalSuccess ? (
          <div className="space-y-2 text-center">
            <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-bold">
              ✓ Julian's application approved! Lease agreement sent to tenant.
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrentScreen('chat-conversation')}
                className="py-2.5 rounded-xl bg-slate-950 dark:bg-slate-800 text-white text-xs font-bold"
              >
                Open Message Thread
              </button>
              <button
                type="button"
                onClick={() => {
                  switchRole('tenant');
                  setCurrentScreen('move-in-confirmed');
                }}
                className="py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold"
              >
                View as Tenant &rarr;
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDecline}
              className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4 text-slate-500" />
              <span>Decline</span>
            </button>

            <button
              type="button"
              onClick={handleApprove}
              disabled={isProcessing}
              className="py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              {isProcessing ? (
                <span>Approving...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Approve Request</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
