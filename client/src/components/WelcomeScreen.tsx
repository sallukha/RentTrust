import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, X, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RentalTrustLogo } from './RentalTrustLogo';

export const WelcomeScreen: React.FC = () => {
  const { setCurrentScreen } = useAuth();
  const [activeLegalModal, setActiveLegalModal] = useState<'terms' | 'privacy' | null>(null);

  return (
    <div id="welcome-screen" className="flex flex-col justify-between -mx-4 sm:-mx-5 -mt-3 -mb-24 overflow-hidden bg-white dark:bg-slate-900 min-h-[100dvh]">
      {/* Top Luxury Penthouse & Overlaid Glass Card Visual matching screen.png */}
      <div className="relative w-full aspect-[4/3.8] bg-slate-900 overflow-hidden flex-shrink-0">
        {/* Luxury High-Rise Penthouse Sunset Image */}
        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80"
          alt="Luxury Verified Penthouse"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
        />

        {/* Ambient Top Ceiling Lights & Subtle Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white dark:to-slate-900 pointer-events-none" />

        {/* Overlaid Center TrustVue Glass Card Mockup matching screen.png */}
        <div className="absolute inset-x-8 top-6 bottom-8 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[280px] p-4 rounded-2xl bg-white/70 dark:bg-slate-900/75 backdrop-blur-md border border-white/60 dark:border-slate-700/60 shadow-xl space-y-2 text-center"
          >
            {/* TrustVue Header inside Glass Card */}
            <div className="flex items-center justify-between pb-1 text-[10px] text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1 font-bold">
                <span className="text-blue-600 dark:text-blue-400">TT</span>
                <span className="tracking-tight text-[9px] font-semibold text-slate-800 dark:text-slate-200">
                  TrustVue Capital
                </span>
              </div>
              <span className="text-[9px] font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400">
                Log In
              </span>
            </div>

            {/* Inner Card Title */}
            <div className="pt-1">
              <h4 className="text-xs font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Welcome to Verified Calm
              </h4>
              <p className="text-[9px] text-slate-600 dark:text-slate-300 leading-snug mt-1 max-w-[200px] mx-auto">
                Your secure gateway to sophisticated urban investment and financial security.
              </p>
            </div>

            {/* Mock Buttons inside Glass Card */}
            <div className="space-y-1 pt-1">
              <div className="w-full py-1.5 rounded-lg bg-blue-500/90 text-white text-[9px] font-bold shadow-xs">
                Get Started
              </div>
              <div className="w-full py-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-slate-300/60 dark:border-slate-600/60 text-slate-700 dark:text-slate-200 text-[9px] font-semibold">
                Learn More
              </div>
            </div>

            <p className="text-[8px] text-slate-500 dark:text-slate-400 pt-0.5">
              Already have an account? <span className="font-semibold text-blue-600 dark:text-blue-400">Sign In</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area matching screen.png */}
      <div className="px-6 py-5 sm:py-6 flex-1 flex flex-col justify-between space-y-4 relative z-20">
        <div className="space-y-3">
          {/* Verified Status Pill Badge matching screen.png */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccfbf1] dark:bg-teal-950/80 text-[#0f766e] dark:text-teal-300 border border-teal-200/70 dark:border-teal-800/80 text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0f766e] dark:text-teal-400 flex-shrink-0" />
            <span>Verified Status</span>
          </div>

          {/* RentalTrust Official Brand Logo */}
          <div className="pt-0.5">
            <RentalTrustLogo size="md" showWordmark={true} />
          </div>

          {/* Headline with signature teal accent matching screen.png */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-[28px] font-black text-slate-950 dark:text-white tracking-tight leading-[1.15]">
              The future of rental trust <br />
              <span className="text-[#0e4a42] dark:text-teal-400">starts here.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed pt-1">
              Join the community of verified renters and owners building a safer housing market.
            </p>
          </div>
        </div>

        {/* Action Buttons Section matching screen.png */}
        <div className="space-y-2.5 pt-2">
          {/* 1. Primary Action: Create Account */}
          <button
            type="button"
            id="welcome-create-account-btn"
            onClick={() => setCurrentScreen('register')}
            className="w-full py-3.5 px-6 rounded-2xl bg-black dark:bg-white hover:bg-slate-850 dark:hover:bg-slate-100 text-white dark:text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* 2. Secondary Action: Log In */}
          <button
            type="button"
            id="welcome-login-btn"
            onClick={() => setCurrentScreen('login')}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#E0EBFF] dark:bg-slate-800 hover:bg-[#D4E4FC] dark:hover:bg-slate-750 text-[#1E3A8A] dark:text-blue-300 font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center active:scale-[0.99] cursor-pointer"
          >
            <span>Log In</span>
          </button>

          {/* 3. Tertiary Action: Continue as Guest */}
          <button
            type="button"
            id="welcome-guest-btn"
            onClick={() => setCurrentScreen('guest-home')}
            className="w-full py-2 text-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Continue as Guest</span>
          </button>

          {/* 4. Legal / Terms and Privacy Disclaimer */}
          <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 leading-snug px-2 pt-1">
            By continuing, you acknowledge our{' '}
            <button
              type="button"
              onClick={() => setActiveLegalModal('terms')}
              className="underline font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
            >
              Terms of Service
            </button>{' '}
            and have read our{' '}
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacy')}
              className="underline font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>

      {/* Interactive Legal Terms & Privacy Modal */}
      <AnimatePresence>
        {activeLegalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLegalModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  {activeLegalModal === 'terms' ? (
                    <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  )}
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {activeLegalModal === 'terms' ? 'Terms of Service' : 'Privacy & Security Policy'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLegalModal(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeLegalModal === 'terms' ? (
                  <>
                    <p>
                      <strong>1. Verified Community Standards:</strong> RentalTrust provides a verified marketplace where all listings and landlords are cross-referenced with public property deeds and escrow guarantees.
                    </p>
                    <p>
                      <strong>2. Escrow Protection:</strong> Security deposits transferred through RentalTrust are held in FDIC-insured escrow accounts until check-in and move-in inspection verification.
                    </p>
                    <p>
                      <strong>3. Zero-Tolerance Fraud Policy:</strong> Misrepresentation of listings, unauthorized subletting, or fraudulent screening submissions will result in immediate profile suspension and escrow forfeiture.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>1. Bank-Grade Encryption:</strong> All sensitive identity credentials, income verification data, and background checks are encrypted end-to-end with AES-256 protocols.
                    </p>
                    <p>
                      <strong>2. Privacy Guarantee:</strong> We do not sell or monetize personal renter credit data to third-party ad networks.
                    </p>
                    <p>
                      <strong>3. Control Over Your Records:</strong> You can export or request full deletion of your identity verification credentials at any time from your account settings.
                    </p>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="w-full py-3 rounded-xl bg-slate-950 dark:bg-teal-600 text-white font-bold text-xs"
              >
                I Understand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
