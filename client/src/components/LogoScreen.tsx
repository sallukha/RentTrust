import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  LogIn,
  Copy,
  Check,
  Sparkles,
  Play,
  RotateCcw,
  Palette,
  Eye,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RentalTrustLogo, RentalTrustLogoMark } from './RentalTrustLogo';

export const LogoScreen: React.FC = () => {
  const { setCurrentScreen } = useAuth();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [showBrandKit, setShowBrandKit] = useState(false);
  const [logoLayout, setLogoLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const [animKey, setAnimKey] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);

  const handleCopySvg = () => {
    const svgString = `<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M48 62V78" stroke="#0F172A" stroke-width="14" stroke-linecap="round"/>
  <path d="M36 94L76 54L94 72" stroke="#0F172A" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M50 94V128C50 134.627 55.3726 140 62 140H94" stroke="#0F172A" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M106 106V128C106 134.627 100.627 140 94 140" stroke="#22C55E" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M60 102L76 118L124 70" stroke="#22C55E" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    navigator.clipboard.writeText(svgString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const triggerLogoReplay = () => {
    setAnimKey((prev) => prev + 1);
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 800);
  };

  return (
    <div
      id="rentaltrust-logo-screen"
      className="flex flex-col justify-between -mx-4 sm:-mx-5 -mt-3 -mb-24 overflow-hidden bg-white dark:bg-slate-950 min-h-[100dvh] relative transition-colors duration-300 select-none"
    >
      {/* Subtle Background Radial Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-slate-500/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 px-6 pt-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Official Brand Screen</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={triggerLogoReplay}
            title="Replay Animation"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setLogoLayout((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))}
            title="Toggle Horizontal / Vertical layout"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setShowBrandKit((prev) => !prev)}
            title="Brand Palette & SVG code"
            className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
              showBrandKit
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Center Area: The Exact RentalTrust Logo matching screen.png */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
        <motion.div
          key={animKey}
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          className="relative cursor-pointer group"
          onClick={triggerLogoReplay}
        >
          {/* Animated Glow on click */}
          <motion.div
            animate={pulseActive ? { scale: [1, 1.25, 1], opacity: [0, 0.4, 0] } : {}}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl pointer-events-none"
          />

          {/* Logo Presentation matching screen.png */}
          <div className="p-4 sm:p-8 rounded-3xl transition-all">
            <RentalTrustLogo
              size={logoLayout === 'vertical' ? '2xl' : 'xl'}
              layout={logoLayout}
              animated={true}
              className="transform group-hover:scale-[1.02] transition-transform duration-200"
            />
          </div>
        </motion.div>

        {/* Brand Mission & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-4 space-y-1.5 max-w-xs mx-auto"
        >
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Verified Rentals. Guaranteed Trust.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
            The modern escrow and deed-verified standard for residential leases and short stays.
          </p>
        </motion.div>

        {/* Brand System Drawer / Inspector */}
        <AnimatePresence>
          {showBrandKit && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              className="mt-4 w-full max-w-sm p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-left space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  Brand Color Codes
                </span>
                <button
                  type="button"
                  onClick={handleCopySvg}
                  className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'SVG Copied!' : 'Copy Raw SVG'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyHex('#0F172A')}
                  className="p-2 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2 hover:border-slate-400 transition-colors text-left cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-md bg-[#0F172A] border border-black/20 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Dark Navy</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {copiedHex === '#0F172A' ? 'Copied!' : '#0F172A'}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyHex('#22C55E')}
                  className="p-2 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2 hover:border-emerald-400 transition-colors text-left cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-md bg-[#22C55E] border border-emerald-600/30 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Verified Green</div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {copiedHex === '#22C55E' ? 'Copied!' : '#22C55E'}
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Pathways from Logo Screen */}
      <div className="relative z-10 px-6 pb-6 pt-2 space-y-2.5">
        {/* Primary CTA: Launch Welcome / Onboarding Screen */}
        <button
          type="button"
          id="btn-logo-enter-app"
          onClick={() => setCurrentScreen('welcome')}
          className="w-full py-3.5 px-6 rounded-2xl bg-slate-950 dark:bg-emerald-600 hover:bg-slate-850 dark:hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
        >
          <span>Enter RentalTrust</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary CTAs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            id="btn-logo-explore"
            onClick={() => setCurrentScreen('guest-home')}
            className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Explore Stays</span>
          </button>

          <button
            type="button"
            id="btn-logo-login"
            onClick={() => setCurrentScreen('login')}
            className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Sign In</span>
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 pt-1 font-medium">
          RentalTrust Identity &bull; Escrow Verified &bull; FDIC Insured Partner
        </p>
      </div>
    </div>
  );
};
