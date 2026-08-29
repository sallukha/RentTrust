import React from 'react';
import { motion } from 'motion/react';
import { Home, Building2, CheckCircle2 } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { ProfileType } from '../types';

export const ProfileSelector: React.FC = () => {
  const { formData, setProfileType, rolesData } = useRegistration();

  const options: { id: ProfileType; label: string; icon: typeof Home; badge: string }[] = [
    {
      id: 'tenant',
      label: 'I am a Tenant',
      icon: Home,
      badge: 'Find a Home',
    },
    {
      id: 'landlord',
      label: 'I am a Landlord',
      icon: Building2,
      badge: 'List Property',
    },
  ];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label
          id="label-select-profile"
          className="text-[13px] font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase select-none"
        >
          Select Your Profile
        </label>
        {rolesData && (
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Matching
          </span>
        )}
      </div>

      {/* Main Switcher Box matching screenshot styling */}
      <div
        id="profile-selector-container"
        className="p-1.5 bg-[#eef4ff] dark:bg-slate-800/70 border border-blue-100/80 dark:border-slate-700/60 rounded-2xl grid grid-cols-2 gap-2 shadow-inner"
        role="radiogroup"
        aria-labelledby="label-select-profile"
      >
        {options.map((opt) => {
          const isSelected = formData.profileType === opt.id;
          const Icon = opt.icon;

          return (
            <button
              key={opt.id}
              id={`btn-profile-${opt.id}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setProfileType(opt.id)}
              className={`relative flex flex-col items-center justify-center py-5 px-3 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 select-none ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-blue-100/50 dark:border-slate-700/80'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-700/30'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="profileActiveIndicator"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl -z-10 shadow-sm border border-blue-100/60 dark:border-slate-700"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-2">
                <Icon
                  className={`w-6 h-6 stroke-[1.75] transition-transform duration-200 ${
                    isSelected
                      ? 'text-slate-900 dark:text-white scale-105'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                />
                <span
                  className={`text-[15px] tracking-tight ${
                    isSelected
                      ? 'font-bold text-slate-900 dark:text-white'
                      : 'font-medium text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic role benefit tip */}
      {rolesData && rolesData[formData.profileType] && (
        <motion.div
          key={formData.profileType}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="px-3 py-2 rounded-xl bg-blue-50/50 dark:bg-slate-800/40 border border-blue-100/40 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between"
        >
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {formData.profileType === 'tenant' ? '🔍 Zero broker fee access' : '🏢 Verified tenant screening'}
          </span>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            {rolesData[formData.profileType].headline}
          </span>
        </motion.div>
      )}
    </div>
  );
};
