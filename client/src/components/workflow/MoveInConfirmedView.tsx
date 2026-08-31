import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Key,
  Lock,
  Unlock,
  MessageSquare,
  Calendar,
  DollarSign,
  Sparkles,
  Zap,
  BookOpen,
  Home,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';

export const MoveInConfirmedView: React.FC = () => {
  const { rentalApplication, setCurrentScreen, setGuestTab } = useAuth();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [utilitiesChecked, setUtilitiesChecked] = useState(false);
  const [houseRulesChecked, setHouseRulesChecked] = useState(true);

  const toggleDigitalKey = () => {
    if (!isUnlocked) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }
    setIsUnlocked(!isUnlocked);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">
      <div>
        <div className="p-4 space-y-4 max-w-lg mx-auto">
          {/* Hero Property Card (Screen 10) */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/10] bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80"
              alt="Welcome Home"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500 text-slate-950 font-extrabold text-[11px] shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Move-in Confirmed</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
              <h1 className="text-2xl font-black tracking-tight">Welcome Home, Alex</h1>
              <p className="text-xs text-slate-300 font-medium">
                1248 Oakwood Avenue, Unit 4C &bull; Seattle, WA
              </p>
            </div>
          </div>

          {/* Reputation Tracking Active Banner */}
          <div className="p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-black text-teal-900 dark:text-teal-200">
                Reputation Tracking Active
              </h3>
              <p className="text-[11px] text-teal-700 dark:text-teal-300 leading-tight">
                Your professional rental history tracking begins today. On-time payments will boost your score.
              </p>
            </div>
          </div>

          {/* 2-Stat Card Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <Calendar className="w-3 h-3" />
                <span>START DATE</span>
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-white">Oct 1, 2024</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <DollarSign className="w-3 h-3" />
                <span>MONTHLY RENT</span>
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-white">₹24,500</p>
            </div>
          </div>

          {/* Key Collection Instructions & Digital Key */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-teal-600" />
                <span>Key Collection Instructions</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Your digital keys have been activated. Use the app to unlock the main foyer. Physical backup keys are in the lockbox (<strong className="font-extrabold text-teal-700 dark:text-teal-300">Code: 8842</strong>) by the side entrance.
            </p>

            {/* Interactive Digital Foyer Lock Button */}
            <button
              type="button"
              onClick={toggleDigitalKey}
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between shadow-sm ${
                isUnlocked
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-slate-950 text-white dark:bg-slate-800 border-slate-800 hover:border-teal-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isUnlocked ? 'bg-white/20' : 'bg-teal-500/20 text-teal-400'
                  }`}
                >
                  {isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div className="text-left">
                  <p className="text-xs font-black">
                    {isUnlocked ? 'Foyer Door Unlocked' : 'Tap to Unlock Main Foyer'}
                  </p>
                  <p className="text-[11px] opacity-80">
                    {isUnlocked ? 'Bluetooth Verified &bull; Auto-locks in 30s' : 'Digital Key Code: 4492'}
                  </p>
                </div>
              </div>

              <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-white/20">
                {isUnlocked ? 'OPEN' : 'TAP'}
              </span>
            </button>
          </div>

          {/* Next Steps Checklist (Screen 10) */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Next Steps
            </h3>

            <div className="space-y-2">
              <label
                onClick={() => setUtilitiesChecked(!utilitiesChecked)}
                className="p-3.5 rounded-2xl bg-sky-50/60 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-start gap-3 cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-lg border-2 mt-0.5 flex items-center justify-center transition-colors ${
                    utilitiesChecked
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {utilitiesChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Setup Utilities
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Transfer electricity & water accounts by end of day.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setHouseRulesChecked(!houseRulesChecked)}
                className="p-3.5 rounded-2xl bg-sky-50/60 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-start gap-3 cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-lg border-2 mt-0.5 flex items-center justify-center transition-colors ${
                    houseRulesChecked
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {houseRulesChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Review House Rules
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Standard noise policy and waste disposal guidelines.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto w-full">
        <button
          type="button"
          onClick={() => setCurrentScreen('chat-conversation')}
          className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Open Chat with Landlord</span>
        </button>
      </div>
    </div>
  );
};
