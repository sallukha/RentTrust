import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Star,
  Award,
  CheckCircle2,
  Building2,
  ArrowRight,
  CreditCard,
  FileCheck2,
  LogOut,
  Mail,
  Phone,
  Briefcase,
  Share2,
  Lock,
  ChevronRight,
  ExternalLink,
  Sparkles,
  UserCheck,
  Building,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TenantProfileScreen: React.FC = () => {
  const { setCurrentScreen, switchRole, logout, currentUser, rentalApplication } = useAuth();
  const [showShareToast, setShowShareToast] = useState(false);
  const [showPassportModal, setShowPassportModal] = useState(false);

  const handleSharePassport = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  return (
    <div
      id="tenant-profile-screen"
      className="w-full max-w-md mx-auto space-y-5 pb-8 select-none"
    >
      {/* Share Toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-xl bg-slate-900 text-white text-xs font-medium flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Rental Passport link copied to clipboard!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Info Card */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt="Alex Chen"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-500/80"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-slate-900 dark:text-white truncate">
              {currentUser?.fullName || 'Alex Chen'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate mt-0.5">
              <Briefcase className="w-3 h-3 text-slate-400" />
              <span>Senior Product Designer at Stripe</span>
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-1">
              Member ID: {currentUser?.id || 'usr_alex_chen'}
            </p>
          </div>
        </div>

        {/* Contact Snippets */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{currentUser?.email || 'alex.chen@designhub.io'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{currentUser?.phoneNumber || '+1 (555) 234-5678'}</span>
          </div>
        </div>
      </div>

      {/* Reputation Score & Rental Passport Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0e1628] via-[#131f37] to-[#0e1628] text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              RentalTrust Reputation Passport
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
            TOP 2% TIER
          </span>
        </div>

        <div className="flex items-end justify-between my-2">
          <div>
            <div className="text-4xl font-black tracking-tight text-white flex items-baseline gap-1">
              <span>842</span>
              <span className="text-sm font-normal text-slate-400">/ 900</span>
            </div>
            <p className="text-xs font-semibold text-teal-300 mt-0.5">
              Elite Preferred Applicant
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowPassportModal(true)}
            className="px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
          >
            <span>View Breakdown</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Verification Checkpoints */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-700/60 text-center">
          <div className="p-2 rounded-xl bg-white/5">
            <span className="text-[10px] text-slate-400 block">ID Verification</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> Pass
            </span>
          </div>
          <div className="p-2 rounded-xl bg-white/5">
            <span className="text-[10px] text-slate-400 block">Income Ratio</span>
            <span className="text-xs font-bold text-teal-300 block mt-0.5">
              3.8x Rent
            </span>
          </div>
          <div className="p-2 rounded-xl bg-white/5">
            <span className="text-[10px] text-slate-400 block">Rental History</span>
            <span className="text-xs font-bold text-white block mt-0.5">
              3 Verifications
            </span>
          </div>
        </div>
      </div>

      {/* Role Switcher Section (Production Role Switcher) */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/80 dark:border-indigo-800/60 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Landlord & Property Owner Portal
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Manage units, review applicants & track cashflow
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => switchRole('landlord')}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Switch to Landlord Operations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Preferences & Credentials Menu */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
          Account & Preferences
        </h3>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          <button
            type="button"
            onClick={() => setCurrentScreen('tenant-requests-tracker')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Active Rental Requests
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Track {rentalApplication.propertyTitle} application
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('chat-hub')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Escrow Deposit & Payment Wallet
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Visa &bull;&bull;&bull;&bull; 4242 (Auto-Escrow Enabled)
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('filters-criteria')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Housing Criteria & Search Filters
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Manage budget thresholds, neighborhood radii & amenities
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={logout}
          className="w-full py-3.5 rounded-2xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Alex Chen</span>
        </button>
      </div>

      {/* Breakdown Modal */}
      <AnimatePresence>
        {showPassportModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-500" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Reputation Passport Breakdown
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassportModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Identity & Biometrics</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">98 / 100</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Income to Rent Ratio</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">95 / 100</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                  <span className="font-medium text-slate-600 dark:text-slate-300">On-Time Payment Record</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">100 / 100</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                  <span className="font-medium text-slate-600 dark:text-slate-300">Landlord Endorsements</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">92 / 100</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPassportModal(false)}
                className="w-full py-3 rounded-xl bg-slate-900 dark:bg-teal-600 text-white font-bold text-xs"
              >
                Close Breakdown
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
