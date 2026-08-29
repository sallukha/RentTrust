import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Zap,
  Users,
  Building,
  Award,
  CheckCircle,
  Clock,
  KeyRound,
  TrendingUp,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { useAuth } from '../context/AuthContext';
import { RentalTrustLogo } from './RentalTrustLogo';

export const DesktopCompanion: React.FC = () => {
  const { statsData, recentUsers, formData, rolesData } = useRegistration();
  const { currentScreen, setCurrentScreen } = useAuth();

  const isTenant = formData.profileType === 'tenant';
  const roleInfo = rolesData ? rolesData[formData.profileType] : null;

  return (
    <div className="hidden lg:flex flex-col justify-between h-full space-y-6 text-slate-800 dark:text-slate-100">
      {/* Brand & Market Stats Header */}
      <div className="space-y-4">
        {/* Official Brand Lockup */}
        <div className="pb-1">
          <RentalTrustLogo size="lg" showWordmark={true} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>#1 Rated Rental Trust & Escrow Platform</span>
        </div>

        <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {currentScreen === 'logo-splash'
            ? 'The Gold Standard for Verified Rentals.'
            : currentScreen === 'welcome'
            ? 'The future of rental trust starts here.'
            : currentScreen === 'filters-criteria'
            ? 'Find your perfect home with verified trust.'
            : currentScreen === 'dashboard'
            ? 'Landlord Operations & Portfolio Hub.'
            : currentScreen === 'landlord-profile'
            ? 'Verified Landlord Reputation & Dossier.'
            : currentScreen === 'list-property'
            ? 'Verified 8-Step Property Listing Flow.'
            : currentScreen === 'otp-verification'
            ? 'End-to-End Encrypted Number Verification.'
            : currentScreen === 'login'
            ? 'Access your wealth & portfolio insights.'
            : currentScreen === 'property-detail'
            ? '100% Verified Escrow Protected Booking.'
            : currentScreen === 'guest-explore'
            ? 'Explore pre-vetted homes on live radar.'
            : currentScreen === 'guest-home'
            ? 'Find verified rentals with zero hidden fees.'
            : 'Rent with total clarity and peace of mind.'}
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
          {currentScreen === 'logo-splash'
            ? 'RentalTrust bridges tenants and property owners with instant deed verification, escrow protection, and zero fraud.'
            : currentScreen === 'welcome'
            ? 'Join the community of verified renters and owners building a safer, escrow-backed housing market.'
            : currentScreen === 'tenant-home'
            ? 'Track your 842/900 Tenant Reputation Score, review active rental application journeys, access upcoming tour itineraries, and browse saved lofts.'
            : currentScreen === 'filters-criteria'
            ? 'Customize budget thresholds, property typology, verified host criteria, and essential amenities.'
            : currentScreen === 'dashboard'
            ? 'Track real-time occupancy rates, process pre-screened tenant applications, and list verified properties.'
            : currentScreen === 'landlord-profile'
            ? 'Inspect verified host credentials, historical 900+ reliability milestones, active loft listings, and resident feedback.'
            : currentScreen === 'list-property'
            ? 'Follow the comprehensive 8-step wizard to upload photos, define amenities, synthesize AI copy, configure house rules, and verify ownership deed.'
            : currentScreen === 'otp-verification'
            ? 'Enter the 6-digit cryptographic verification code sent via SMS to verify phone ownership with end-to-end encryption.'
            : currentScreen === 'login'
            ? 'Sign in securely to review rental cashflow, monitor real estate equity, review leases, and execute instant background verifications.'
            : currentScreen === 'property-detail'
            ? 'Direct deed-verified listings with guaranteed escrow deposit security and pre-screened hosts.'
            : currentScreen === 'guest-explore'
            ? 'Interactive vector map indexing verified lofts, villas, and brownstones across top neighborhoods.'
            : 'Say goodbye to fake listings, fraudulent deposits, and endless back-and-forth. Our platform matches verified tenants with pre-screened landlords.'}
        </p>

        {/* Live dynamic metrics from REST API */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white">
              {statsData ? `${(statsData.verifiedUsersCount).toLocaleString()}+` : '12,480+'}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Verified Members</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 mb-1">
              <Building className="w-4 h-4" />
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white">
              {statsData?.activeProperties ? `${statsData.activeProperties.toLocaleString()}` : '3,540'}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Active Homes</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
            <div className="flex items-center gap-1 text-amber-500 mb-1">
              <Zap className="w-4 h-4" />
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-white">
              {statsData?.satisfactionRate || '99.4%'}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Screen-specific highlights */}
      <AnimatePresence mode="wait">
        {currentScreen === 'login' ? (
          <motion.div
            key="login-highlights"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-5 rounded-3xl bg-gradient-to-br from-teal-50/80 to-blue-50/50 dark:from-slate-800/90 dark:to-teal-950/30 border border-teal-100 dark:border-slate-700 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Bank-Grade Security</span>
              </h3>
              <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full">
                256-Bit Encrypted
              </span>
            </div>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>Zero password storage — end-to-end tokenized auth</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>Real-time portfolio tracking & rent disbursement logs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>One-tap biometric & social credentials integration</span>
              </li>
            </ul>
          </motion.div>
        ) : (
          roleInfo && (
            <motion.div
              key={formData.profileType}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-5 rounded-3xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-slate-800/90 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{isTenant ? 'Tenant Benefits' : 'Landlord Guarantees'}</span>
                </h3>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                  {isTenant ? 'For Renters' : 'For Property Owners'}
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {roleInfo.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Live Recent Signups ticker */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            Live Marketplace Activity
          </span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Syncing
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {recentUsers.slice(0, 4).map((user) => (
            <div
              key={user.id}
              className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-700/50 flex items-center gap-2.5 shadow-2xs"
            >
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {user.role} &bull; {user.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
