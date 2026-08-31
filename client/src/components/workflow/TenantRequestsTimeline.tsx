import React, { useEffect, useState } from 'react';
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
import { apiService } from '../../services/api';
import { BackendRentRequest } from '../../api';

export const TenantRequestsTimeline: React.FC = () => {
  const {
    currentScreen,
    rentalApplication,
    setCurrentScreen,
    setGuestTab,
    switchRole,
  } = useAuth();

  const [showDossierModal, setShowDossierModal] = useState(false);
  const [myRequests, setMyRequests] = useState<BackendRentRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);

  useEffect(() => {
    if (currentScreen !== 'tenant-requests-tracker') {
      return;
    }

    let mounted = true;

    const loadRequests = async () => {
      try {
        const result = await apiService.fetchMyRentRequests();
        if (mounted) {
          setMyRequests(result || []);
        }
      } catch (error) {
        console.error('Failed to load tenant rent requests:', error);
        if (mounted) {
          setMyRequests([]);
        }
      } finally {
        if (mounted) {
          setIsLoadingRequests(false);
        }
      }
    };

    loadRequests();
    const intervalId = window.setInterval(loadRequests, 10000);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, [currentScreen]);

  const latestRequest = myRequests[0];
  const requestStatus = latestRequest?.status || 'pending';
  const statusLabel = requestStatus === 'approved' ? 'Approved' : requestStatus === 'rejected' ? 'Rejected' : requestStatus === 'cancelled' ? 'Cancelled' : 'Pending review';

  const requestTone =
    requestStatus === 'approved'
      ? {
          shell: 'from-emerald-50 to-green-50/70 border-emerald-200 dark:from-emerald-950/40 dark:to-slate-800 dark:border-emerald-800',
          icon: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-700',
          accent: 'text-emerald-700 dark:text-emerald-400',
          chip: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
          message: 'Your rental request has been approved and is ready for the next step.',
        }
      : requestStatus === 'rejected'
        ? {
            shell: 'from-rose-50 to-red-50/70 border-rose-200 dark:from-rose-950/40 dark:to-slate-800 dark:border-rose-800',
            icon: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-900/60 dark:text-rose-300 dark:border-rose-700',
            accent: 'text-rose-700 dark:text-rose-400',
            chip: 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300',
            message: 'Your request was not approved this time, but you can update your profile and reapply.',
          }
        : {
            shell: 'from-sky-50 to-blue-50/70 border-sky-200 dark:from-slate-850 dark:to-slate-800 dark:border-slate-700',
            icon: 'bg-sky-100 text-sky-700 border-sky-300 dark:bg-teal-950/60 dark:text-teal-400 dark:border-teal-700',
            accent: 'text-sky-700 dark:text-teal-400',
            chip: 'bg-sky-100 text-sky-700 dark:bg-teal-950/60 dark:text-teal-300',
            message: 'Landlord review is in progress for your most recent rental request.',
          };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 pb-6">
      <div>
        <div className="space-y-4">
          {/* Phase Banner */}
          <div className={`p-4 rounded-3xl bg-gradient-to-r ${requestTone.shell} border space-y-2.5 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold tracking-widest text-slate-500 dark:text-slate-400 uppercase block">
                  CURRENT PHASE
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {isLoadingRequests ? 'Loading request' : statusLabel}
                </h2>
              </div>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${requestTone.icon}`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-sky-100 dark:border-slate-700 flex items-start gap-2.5">
              <Info className={`w-4 h-4 shrink-0 mt-0.5 ${requestTone.accent}`} />
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {isLoadingRequests ? 'Syncing your latest rental request status with the backend.' : requestTone.message}
              </p>
            </div>
          </div>

          {/* Vertical Stepper Timeline */}
          <div className="py-2 pl-2 space-y-6 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
            {(() => {
              const stepStates =
                requestStatus === 'approved'
                  ? [
                      { key: 'submitted', title: 'Submitted', detail: 'Your application was successfully encrypted and sent.', timestamp: latestRequest?.createdAt ? new Date(latestRequest.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Oct 12, 09:30 AM', state: 'complete', badge: 'VERIFIED' },
                      { key: 'viewed', title: 'Viewed', detail: 'The landlord has opened your verified profile dossier.', timestamp: 'Oct 13, 02:15 PM', state: 'complete' },
                      { key: 'shortlisted', title: 'Shortlisted', detail: 'You moved into the priority candidate pool and were considered for approval.', timestamp: 'Current stage', state: 'complete' },
                      { key: 'decision', title: 'Decision', detail: 'Your request was approved and the next leasing steps are ready.', timestamp: 'Approved', state: 'success', badge: 'APPROVED' },
                    ]
                  : requestStatus === 'rejected'
                    ? [
                        { key: 'submitted', title: 'Submitted', detail: 'Your application was successfully encrypted and sent.', timestamp: latestRequest?.createdAt ? new Date(latestRequest.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Oct 12, 09:30 AM', state: 'complete', badge: 'VERIFIED' },
                        { key: 'viewed', title: 'Viewed', detail: 'The landlord has opened your verified profile dossier.', timestamp: 'Oct 13, 02:15 PM', state: 'complete' },
                        { key: 'shortlisted', title: 'Shortlisted', detail: 'Your profile was reviewed but the landlord requested another option.', timestamp: 'Review concluded', state: 'complete' },
                        { key: 'decision', title: 'Decision', detail: 'Your request was declined. You can refresh your dossier and reapply.', timestamp: 'Rejected', state: 'error', badge: 'REJECTED' },
                      ]
                    : [
                        { key: 'submitted', title: 'Submitted', detail: 'Your application was successfully encrypted and sent.', timestamp: latestRequest?.createdAt ? new Date(latestRequest.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Oct 12, 09:30 AM', state: 'complete', badge: 'VERIFIED' },
                        { key: 'viewed', title: 'Viewed', detail: 'The landlord has opened your verified profile dossier.', timestamp: 'Oct 13, 02:15 PM', state: 'complete' },
                        { key: 'shortlisted', title: 'Shortlisted', detail: 'You are currently in the active review queue for a landlord decision.', timestamp: 'Current stage', state: 'current' },
                        { key: 'final-review', title: 'Pending Final Review', detail: 'Background check and reference validation phase.', timestamp: 'Awaiting review', state: 'pending' },
                        { key: 'decision', title: 'Decision', detail: 'Final approval or rejection outcome from the landlord.', timestamp: 'Pending', state: 'pending' },
                      ];

              return stepStates.map((step, index) => {
                const isComplete = step.state === 'complete';
                const isCurrent = step.state === 'current';
                const isSuccess = step.state === 'success';
                const isError = step.state === 'error';
                const isPending = step.state === 'pending';

                const bulletClass = isComplete
                  ? 'bg-teal-600 text-white shadow-md'
                  : isSuccess
                    ? 'bg-emerald-600 text-white shadow-md'
                    : isError
                      ? 'bg-rose-600 text-white shadow-md'
                      : isCurrent
                        ? 'bg-teal-200 dark:bg-teal-900 border-2 border-teal-500 text-teal-600 dark:text-teal-400'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300';

                const headingClass = isSuccess
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : isError
                    ? 'text-rose-700 dark:text-rose-400'
                    : isCurrent
                      ? 'text-teal-700 dark:text-teal-400'
                      : ' ';

                const detailClass = isComplete
                  ? 'text-slate-600 dark:text-slate-400'
                  : isSuccess
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : isError
                      ? 'text-rose-700 dark:text-rose-300'
                      : isCurrent
                        ? 'text-slate-700 dark:text-slate-300'
                        : 'text-slate-500 dark:text-slate-400';

                const labelClass = isComplete
                  ? 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300'
                  : isSuccess
                    ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                    : isError
                      ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300'
                      : isCurrent
                        ? 'bg-teal-100 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400';

                const currentLineClass = index < stepStates.length - 1 ? 'before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-teal-500' : '';

                return (
                  <div key={step.key} className={`relative pl-8 space-y-2 ${currentLineClass}`}>
                    <span className={`absolute left-1.5 top-0 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${bulletClass}`}>
                      {isComplete || isSuccess || isError ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-ping" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                      )}
                    </span>

                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-extrabold ${headingClass}`}>
                        {step.title}
                      </h3>
                      {step.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${labelClass}`}>
                          {step.badge}
                        </span>
                      )}
                    </div>

                    <p className={`text-xs ${detailClass}`}>
                      {step.detail}
                    </p>

                    {step.state === 'current' && (
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
                          onClick={() => setCurrentScreen('chat-conversation')}
                          className="py-2 px-4 rounded-xl bg-sky-100/80 hover:bg-sky-200/80 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-extrabold transition-all"
                        >
                          Message Marcus
                        </button>
                      </div>
                    )}

                    {step.state === 'success' && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setCurrentScreen('tenant-profile')}
                          className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm transition-all"
                        >
                          Review next steps
                        </button>
                      </div>
                    )}

                    {step.state === 'error' && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setCurrentScreen('tenant-profile')}
                          className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-sm transition-all"
                        >
                          Update profile
                        </button>
                      </div>
                    )}

                    <p className={`text-[10px] font-bold ${isComplete || isSuccess || isError ? 'text-slate-400' : isCurrent ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}`}>
                      {step.timestamp}
                    </p>
                  </div>
                );
              });
            })()}
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
                    <p className="font-bold">₹16,50,000/yr (Verified)</p>
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
