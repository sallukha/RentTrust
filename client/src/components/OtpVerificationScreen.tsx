import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Lock, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRegistration } from '../context/RegistrationContext';
import confetti from 'canvas-confetti';

export const OtpVerificationScreen: React.FC = () => {
  const { setCurrentScreen, verifyPendingLoginOtp, loginData, loginErrors } = useAuth();
  const { formData } = useRegistration();

  // 6 digits array
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(57);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendNotification, setResendNotification] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // References to all 6 input elements
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Phone number from registration context or fallback demo
  const displayPhone = loginData.identifier || formData.phoneNumber?.trim() || '+1 (555) 000-0000';


  // Real-time Countdown Timer
  useEffect(() => {
    if (timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  // Focus the first input on initial mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle single character change
  const handleChange = (index: number, value: string) => {
    // Only accept numeric digits
    const cleaned = value.replace(/\D/g, '');

    if (!cleaned) {
      const updatedOtp = [...otp];
      updatedOtp[index] = '';
      setOtp(updatedOtp);
      return;
    }

    // If multiple digits pasted or typed (e.g. paste full code)
    if (cleaned.length > 1) {
      handlePasteCode(cleaned);
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = cleaned[cleaned.length - 1]; // Take the last typed digit
    setOtp(updatedOtp);
    setErrorMessage(null);

    // Auto-advance to the next input box
    if (index < 5 && cleaned) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  // Handle backspace key navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move back and clear previous input
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = '';
        setOtp(updatedOtp);
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      } else {
        const updatedOtp = [...otp];
        updatedOtp[index] = '';
        setOtp(updatedOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    } else if (e.key === 'Enter') {
      handleVerify();
    }
  };

  // Handle clipboard paste of full OTP code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData) {
      handlePasteCode(pastedData);
    }
  };

  const handlePasteCode = (code: string) => {
    const digits = code.slice(0, 6).split('');
    const updatedOtp = [...otp];
    digits.forEach((digit, idx) => {
      if (idx < 6) updatedOtp[idx] = digit;
    });
    setOtp(updatedOtp);
    setErrorMessage(null);

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
    setFocusedIndex(nextIndex);
  };

  // Quick autofill demo helper
  const handleDemoFill = () => {
    const sample = ['7', '2', '9', '4', '1', '8'];
    setOtp(sample);
    setErrorMessage(null);
    inputRefs.current[5]?.focus();
    setFocusedIndex(5);
  };

  // Resend code action
  const handleResend = () => {
    if (timerSeconds > 0) return;
    setTimerSeconds(60);
    setOtp(['', '', '', '', '', '']);
    setErrorMessage(null);
    setResendNotification('New 6-digit verification code sent to your phone!');
    setTimeout(() => setResendNotification(null), 4000);
    inputRefs.current[0]?.focus();
    setFocusedIndex(0);
  };

  // Submit and verify code
  const handleVerify = async () => {
    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    const success = await verifyPendingLoginOtp(fullCode);

    if (success) {
      setIsVerifying(false);
      setIsSuccess(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0f9f8e', '#14b8a6', '#0ea5e9', '#3b82f6', '#10b981'],
        });
      } catch {
        // optional confetti
      }

      // verifyPendingLoginOtp handles setCurrentScreen
    } else {
      setIsVerifying(false);
      // loginErrors.general will be shown automatically in the UI
    }
  };

  return (
    <motion.div
      id="otp-verification-screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="w-full flex flex-col justify-between max-w-md mx-auto pb-6"
    >
      {/* Top Bar with "< Otp Verification" Navigation */}
      <div id="otp-top-bar" className="w-full flex items-center justify-between pt-1 pb-3">
        <button
          id="btn-back-from-otp"
          type="button"
          onClick={() => setCurrentScreen('register')}
          className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-xl hover:text-teal-600 dark:hover:text-teal-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg px-1 py-0.5 -ml-1 group cursor-pointer"
          aria-label="Back to registration"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5] text-slate-900 dark:text-white group-hover:-translate-x-0.5 transition-transform" />
          <span className="tracking-tight">Otp Verification</span>
        </button>

        {/* Demo Fast Fill Badge */}
        <button
          type="button"
          onClick={handleDemoFill}
          className="text-[11px] font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer"
          title="Auto fill sample OTP for testing"
        >
          <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
          <span>Demo Code</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center pt-2">
        {/* Curved Pill / Oval Banner with Verified Badge */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm h-14 rounded-full bg-[#e8f4fc] dark:bg-slate-800/90 border border-blue-100/80 dark:border-slate-700/60 flex items-center justify-center shadow-xs mb-8"
        >
          <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-xs border border-teal-100 dark:border-teal-900/40">
            <div className="relative">
              <ShieldCheck className="w-6 h-6 text-[#0f9f8e] dark:text-teal-400" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 opacity-90" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Heading: Verify your number */}
        <h1 className="text-2xl sm:text-[28px] font-black tracking-tight text-slate-950 dark:text-white text-center mb-2">
          Verify your number
        </h1>

        {/* Subtitle with Phone Number */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] text-center leading-relaxed max-w-xs mb-8">
          We sent a 6–digit code to <span className="font-bold text-slate-950 dark:text-white whitespace-nowrap">{displayPhone}</span>
        </p>

        {/* 6 OTP Input Boxes */}
        {/* CRITICAL: Uses type="text" with inputMode="numeric" to strictly eliminate browser number spinner arrows */}
        <div className="w-full max-w-sm flex items-center justify-between gap-2 sm:gap-3 mb-6">
          {otp.map((digit, index) => {
            const isFocused = focusedIndex === index;
            const isFilled = digit.length > 0;
            return (
              <input
                key={`otp-slot-${index}`}
                id={`otp-input-${index}`}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                autoComplete="one-time-code"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={() => setFocusedIndex(index)}
                aria-label={`Digit ${index + 1} of 6`}
                className={`w-11 h-14 sm:w-12 sm:h-16 text-center text-2xl sm:text-[26px] font-bold rounded-2xl transition-all duration-150 outline-none select-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  isFocused
                    ? 'border-2 border-teal-600 dark:border-teal-400 bg-white dark:bg-slate-900 text-slate-950 dark:text-white ring-4 ring-teal-500/15 shadow-sm scale-105'
                    : isFilled
                    ? 'border-2 border-teal-600/60 dark:border-teal-500/60 bg-[#e1edf9] dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs'
                    : 'border-2 border-transparent bg-[#dbe8f7] dark:bg-slate-800/80 text-slate-950 dark:text-white hover:bg-[#d2e2f3] dark:hover:bg-slate-800'
                }`}
              />
            );
          })}
        </div>

        {/* Error Feedback */}
        <AnimatePresence>
          {(errorMessage || loginErrors.general) && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2 max-w-sm w-full"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <span>{errorMessage || loginErrors.general}</span>
            </motion.div>
          )}

          {resendNotification && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs font-semibold text-teal-800 dark:text-teal-200 flex items-center gap-2 max-w-sm w-full"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <span>{resendNotification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verify & Continue Action Button */}
        <div className="w-full max-w-sm mb-6">
          <motion.button
            id="btn-verify-and-continue"
            type="button"
            disabled={isVerifying || isSuccess}
            onClick={handleVerify}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-[16px] text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isSuccess
                ? 'bg-emerald-600 text-white'
                : isVerifying
                ? 'bg-slate-800 dark:bg-slate-700 text-slate-300 cursor-wait'
                : 'bg-black dark:bg-slate-900 hover:bg-slate-900 dark:hover:bg-slate-800 hover:shadow-lg active:shadow-sm'
            }`}
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-teal-400" />
                <span>Verifying code...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>Phone Verified!</span>
              </>
            ) : (
              <span>Verify & Continue</span>
            )}
          </motion.button>
        </div>

        {/* Resend Code Section */}
        <div className="flex flex-col items-center gap-1.5 text-center mb-8">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Resend code in{' '}
            <span className="font-bold text-teal-700 dark:text-teal-400">
              {formatTime(timerSeconds)}
            </span>
          </p>

          <button
            id="btn-resend-code"
            type="button"
            disabled={timerSeconds > 0}
            onClick={handleResend}
            className={`text-sm font-semibold transition-colors ${
              timerSeconds > 0
                ? 'text-teal-400/60 dark:text-teal-600/40 cursor-not-allowed'
                : 'text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline cursor-pointer'
            }`}
          >
            Resend Code
          </button>
        </div>
      </div>

      {/* Footer: End-to-end Encrypted Verification */}
      <div
        id="otp-encryption-footer"
        className="w-full flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-xs sm:text-[13px] font-normal pt-4"
      >
        <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 stroke-[1.75]" />
        <span>End-to-end encrypted verification</span>
      </div>
    </motion.div>
  );
};
