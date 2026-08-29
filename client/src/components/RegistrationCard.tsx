import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileSelector } from './ProfileSelector';
import { FormInput } from './FormInput';
import { TermsCheckbox } from './TermsCheckbox';
import { SubmitButton } from './SubmitButton';
import { SocialProof } from './SocialProof';
import { SuccessView } from './SuccessView';
import { useRegistration } from '../context/RegistrationContext';
import { useAuth } from '../context/AuthContext';

export const RegistrationCard: React.FC = () => {
  const { registeredResponse } = useRegistration();
  const { setCurrentScreen } = useAuth();

  return (
    <div id="registration-card-content" className="w-full relative">
      <AnimatePresence mode="wait">
        {registeredResponse ? (
          <SuccessView key="success-view" />
        ) : (
          <motion.div
            key="registration-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 pt-1"
          >
            {/* Title & Subtitle matching the screenshot */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-[34px] font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15]">
                Start your journey
              </h1>
              <p className="text-[15px] sm:text-[16px] text-slate-600 dark:text-slate-300 font-normal leading-snug">
                Join the most trusted community in the rental market.
              </p>
            </div>

            {/* Profile Selector (Tenant / Landlord) */}
            <ProfileSelector />

            {/* Registration Form Inputs matching the screenshot */}
            <form
              id="registration-form-element"
              onSubmit={(e) => e.preventDefault()}
              noValidate
              className="space-y-4"
            >
              <FormInput
                name="fullName"
                label="Full Name"
                placeholder="Johnathan Doe"
                icon="user"
                autoComplete="name"
              />

              <FormInput
                name="email"
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                icon="mail"
                autoComplete="email"
              />

              <FormInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                type="tel"
                icon="phone"
                autoComplete="tel"
              />

              {/* Terms Checkbox */}
              <TermsCheckbox />

              {/* Submit CTA Button */}
              <SubmitButton />

              {/* Link to Login screen */}
              <div className="text-center pt-1">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Already have an account?{' '}
                  <button
                    id="btn-switch-to-login"
                    type="button"
                    onClick={() => setCurrentScreen('login')}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline transition-colors inline-flex items-center gap-0.5"
                  >
                    <span>Login</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </p>
              </div>
            </form>

            {/* Social Proof with 3 circular avatars and dynamic count */}
            <SocialProof />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
