import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Lock,
  User,
  MessageSquare,
  ArrowRight,
  Shield,
  LayoutGrid,
  Building,
  CheckSquare,
  Menu as MenuIcon,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LandlordRequestsQueue: React.FC = () => {
  const { setCurrentScreen, rentalApplication } = useAuth();
  const [filter, setFilter] = useState<'all' | 'high_rep' | 'urgent'>('all');

  return (
    <div className="w-full max-w-md mx-auto space-y-5 pb-6 select-none">
      <div>
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              5 New Requests
            </h1>

            <div className="px-3 py-1.5 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-white">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Avg. Score: 890</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 pt-1 pb-1 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                filter === 'all'
                  ? 'bg-slate-950 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              All Requests
            </button>
            <button
              type="button"
              onClick={() => setFilter('high_rep')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                filter === 'high_rep'
                  ? 'bg-slate-950 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              High Reputation
            </button>
            <button
              type="button"
              onClick={() => setFilter('urgent')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                filter === 'urgent'
                  ? 'bg-slate-950 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              Urgent
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="p-4 space-y-4 max-w-lg mx-auto">
          {/* Card 1: Julian Thorne / Alex Chen (942 Score) */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3.5 hover:border-teal-500/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                    alt="Marcus Chen"
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center border-2 border-white dark:border-slate-850 shadow-sm">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {rentalApplication.applicantName || 'Marcus Chen'}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-sky-100 dark:border-slate-700">
                      Verified ID
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-sky-100 dark:border-slate-700">
                      Income Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Teal Score Box */}
              <div className="p-2.5 rounded-2xl bg-teal-100/80 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 text-center shrink-0">
                <p className="text-[9px] font-extrabold text-teal-800 dark:text-teal-300 tracking-wider">
                  REPUTATION
                </p>
                <p className="text-xl font-black text-teal-700 dark:text-teal-300">942</p>
              </div>
            </div>

            {/* 4-stat grid */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-sky-50/70 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  OCCUPATION
                </span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">
                  {rentalApplication.jobTitle || 'Senior Product ...'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  ANNUAL INCOME
                </span>
                <span className="font-bold text-slate-900 dark:text-white block">
                  {rentalApplication.annualIncome || '$165,000/yr'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  MOVE-IN DATE
                </span>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Oct 15, 2024
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  CREDIT TIER
                </span>
                <span className="font-bold text-teal-700 dark:text-teal-400 block">
                  Excellent (780+)
                </span>
              </div>
            </div>

            {/* Applicant Quote */}
            <div className="italic text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 pl-1">
              <span className="text-lg font-serif text-slate-400 leading-none">“</span>
              <p className="line-clamp-2">
                I'm looking for a long-term home close to my office. I've lived in my previous apartment for 3 years with zero missed payments...
              </p>
            </div>

            {/* Action Bar */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => setCurrentScreen('landlord-applicant-dossier')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-xs shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>Review & Respond</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentScreen('landlord-applicant-dossier')}
                  className="py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentScreen('chat-conversation')}
                  className="py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Sarah J. Miller (Screen 8) */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Sarah J. Miller"
                  className="w-11 h-11 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Sarah J. Miller
                  </h3>
                  <p className="text-xs font-bold text-teal-600 dark:text-teal-400">
                    Urgent: Moving in 4 days
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-black text-slate-900 dark:text-white">885</span>
                <p className="text-[10px] text-slate-400 font-bold">Reputation</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-sky-50/60 dark:bg-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block">Income</span>
                <span className="font-bold text-slate-900 dark:text-white">$112k/yr</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Occupation</span>
                <span className="font-bold text-slate-900 dark:text-white">Lawyer</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCurrentScreen('landlord-applicant-dossier')}
              className="w-full py-2.5 px-4 rounded-xl bg-sky-100/70 hover:bg-sky-200 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-xs transition-all text-center"
            >
              Review Application
            </button>
          </div>

          {/* Footer note */}
          <div className="pt-2 text-center space-y-1">
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              All applicants are pre-screened for ID and Income verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
