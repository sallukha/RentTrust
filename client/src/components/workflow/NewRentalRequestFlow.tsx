import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Calendar as CalendarIcon,
  Home,
  Briefcase,
  GraduationCap,
  Minus,
  Plus,
  ArrowRight,
  Upload,
  Camera,
  Lock,
  Building,
  DollarSign,
  Send,
  Sparkles,
  ExternalLink,
  Clock,
  MessageSquare,
  Key,
  Check,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DocumentTypeId, EmploymentTypeId, RentalPurpose } from '../../types/workflow';

export const NewRentalRequestFlow: React.FC = () => {
  const {
    tenantAppStep,
    setTenantAppStep,
    rentalApplication,
    updateRentalApplication,
    submitRentalApplication,
    setCurrentScreen,
    setGuestTab,
  } = useAuth();

  // Local state for Step 2 upload preview & selfies
  const [selfieTaken, setSelfieTaken] = useState(false);
  const [frontDocName, setFrontDocName] = useState<string | null>(rentalApplication.frontDocumentName || null);
  const [backDocName, setBackDocName] = useState<string | null>(rentalApplication.backDocumentName || null);
  const [paystubName, setPaystubName] = useState<string | null>('Paystub_Recent_Sept2024.pdf');

  // Step 0: Pre-Application Status (Screen 1)
  if (tenantAppStep === 0) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">
        <div>
          <div className="p-4 space-y-4 max-w-lg mx-auto">
            {/* Reputation Score Dark Card (Screen 1) */}
            <div className="rounded-3xl bg-slate-950 text-white p-5 space-y-3 relative overflow-hidden shadow-xl border border-slate-800">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-[11px] font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>ELITE PREFERRED</span>
                </span>
              </div>

              <div className="text-center space-y-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  REPUTATION SCORE
                </p>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-teal-400 tracking-tight">
                    942
                  </span>
                  <span className="text-lg font-bold text-slate-500">/ 1000</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '94.2%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(45,212,191,0.5)]"
                  />
                </div>
              </div>
            </div>

            {/* Profile Strength Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3.5 shadow-sm">
              <div className="relative flex items-center justify-center">
                <span className="text-base font-black text-slate-900 dark:text-white">85%</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Profile Strength
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your profile is nearly complete.
                </p>
              </div>
            </div>

            {/* Verification Status List */}
            <div className="space-y-2.5">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Verification Status
              </h2>

              <div className="space-y-2">
                {/* Identity Verification */}
                <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        Identity Verification
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Biometric match successful
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                </div>

                {/* Phone Number */}
                <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        Phone Number
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        +1 &bull;&bull;&bull; &bull;&bull;&bull; 4492
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                </div>

                {/* Income Verification */}
                <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        Income Verification
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Bank sync in progress...
                      </p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Ready to Apply Notice */}
            <div className="text-center pt-2 space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Ready to apply
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                Your high reputation score unlocks fast-track processing for this property. You're in the top 5% of applicants.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 space-y-3 max-w-lg mx-auto w-full">
          <button
            type="button"
            onClick={() => setTenantAppStep(1)}
            className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Start Rental Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setCurrentScreen('tenant-home')}
              className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
            >
              Save for later
            </button>
          </div>

          {/* Trust badges footer */}
          <div className="pt-2 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>BANK GRADE SECURITY</span>
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FAIR HOUSING ADV.</span>
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>ENCRYPTED VAULT</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Setting the stage / Rental Details (Screen 2)
  if (tenantAppStep === 1) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">
        <div>
          <div className="p-4 space-y-5 max-w-lg mx-auto">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Setting the stage
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Tell us a bit more about your plans for this space. This helps the owner prepare for your arrival.
              </p>
            </div>

            {/* Expected Move-in Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Expected Move-in Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={rentalApplication.moveInDate || '2024-10-15'}
                  onChange={(e) => updateRentalApplication({ moveInDate: e.target.value })}
                  className="w-full py-3 px-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Lease Duration Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 dark:text-white">
                  Lease Duration
                </label>
                <span className="text-sm font-extrabold text-teal-600 dark:text-teal-400">
                  {rentalApplication.leaseDurationMonths || 12} months
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 space-y-2">
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={rentalApplication.leaseDurationMonths || 12}
                  onChange={(e) =>
                    updateRentalApplication({ leaseDurationMonths: parseInt(e.target.value) })
                  }
                  className="w-full accent-teal-600 dark:accent-teal-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-bold text-slate-400">
                  <span>1 mo</span>
                  <span>24 mo</span>
                </div>
              </div>
            </div>

            {/* Number of Occupants */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Number of Occupants
              </label>
              <div className="p-3 px-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Total people</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Including children</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      updateRentalApplication({
                        occupantsCount: Math.max(1, (rentalApplication.occupantsCount || 1) - 1),
                      })
                    }
                    className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-300"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-black text-slate-900 dark:text-white w-4 text-center">
                    {rentalApplication.occupantsCount || 1}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateRentalApplication({
                        occupantsCount: (rentalApplication.occupantsCount || 1) + 1,
                      })
                    }
                    className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center hover:bg-teal-500"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Purpose of Rental */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Purpose of Rental
              </label>

              <div className="space-y-2">
                {[
                  {
                    id: 'residential' as RentalPurpose,
                    title: 'Residential',
                    sub: 'Main home or dwelling',
                    icon: Home,
                  },
                  {
                    id: 'work' as RentalPurpose,
                    title: 'Work / Professional',
                    sub: 'Business use or office',
                    icon: Briefcase,
                  },
                  {
                    id: 'student' as RentalPurpose,
                    title: 'Student Accommodation',
                    sub: 'Proximity to campus',
                    icon: GraduationCap,
                  },
                ].map((item) => {
                  const isSelected = (rentalApplication.purpose || 'residential') === item.id;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => updateRentalApplication({ purpose: item.id })}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-teal-100/70 dark:bg-teal-950/40 border-teal-500'
                          : 'bg-sky-50/70 dark:bg-slate-800 border-sky-100 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-teal-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.sub}
                          </p>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-teal-600" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto w-full">
          <button
            type="button"
            onClick={() => setTenantAppStep(2)}
            className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Continue to Identity</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Identity Verification (Screen 3)
  if (tenantAppStep === 2) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">
        <div>
          <div className="p-4 space-y-5 max-w-lg mx-auto">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Identity Verification
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                To ensure a secure community, we need to verify your official documents.
              </p>
            </div>

            {/* Select Document Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Select Document Type
              </label>

              <div className="space-y-2">
                {[
                  { id: 'drivers_license' as DocumentTypeId, label: "Driver's License", icon: Shield },
                  { id: 'passport' as DocumentTypeId, label: 'Passport', icon: FileText },
                  { id: 'national_id' as DocumentTypeId, label: 'National ID', icon: ShieldCheck },
                ].map((doc) => {
                  const isSelected = (rentalApplication.documentType || 'drivers_license') === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => updateRentalApplication({ documentType: doc.id })}
                      className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:border-teal-400 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <doc.icon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {doc.label}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-teal-600 bg-teal-600 text-white'
                            : 'border-slate-400 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upload Document Slots */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Upload Document
              </label>

              <div className="space-y-2.5">
                <label className="block p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-sky-50/40 dark:bg-slate-800/40 text-center cursor-pointer hover:border-teal-500 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setFrontDocName(e.target.files[0].name);
                    }}
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {frontDocName ? `✓ ${frontDocName}` : 'Front of Document'}
                  </span>
                </label>

                <label className="block p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-sky-50/40 dark:bg-slate-800/40 text-center cursor-pointer hover:border-teal-500 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setBackDocName(e.target.files[0].name);
                    }}
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {backDocName ? `✓ ${backDocName}` : 'Back of Document'}
                  </span>
                </label>
              </div>
            </div>

            {/* Face Match / Quick Selfie */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Face Match
              </label>

              <div
                onClick={() => setSelfieTaken(!selfieTaken)}
                className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:border-teal-400"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Quick Selfie {selfieTaken && '(Completed ✓)'}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Match with ID
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Encrypted Vault Note */}
            <div className="p-3.5 rounded-2xl bg-sky-50/80 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 flex items-center gap-3">
              <Lock className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                Your data is encrypted and never shared with landlords until you authorize.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto w-full">
          <button
            type="button"
            onClick={() => setTenantAppStep(3)}
            className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Continue to Employment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Employment Details (Screen 4)
  if (tenantAppStep === 3) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">
        <div>
          <div className="p-4 space-y-4 max-w-lg mx-auto">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Employment Details
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                This helps landlords understand your financial stability and rental eligibility.
              </p>
            </div>

            {/* Current Employment 2x2 Buttons */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Current Employment
              </label>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'full_time' as EmploymentTypeId, label: 'Full-time', icon: Briefcase },
                  { id: 'part_time' as EmploymentTypeId, label: 'Part-time', icon: Clock },
                  { id: 'self_employed' as EmploymentTypeId, label: 'Self-employed', icon: Home },
                  { id: 'student' as EmploymentTypeId, label: 'Student', icon: GraduationCap },
                ].map((emp) => {
                  const isSelected = (rentalApplication.employmentType || 'full_time') === emp.id;
                  const Icon = emp.icon;
                  return (
                    <button
                      key={emp.id}
                      type="button"
                      onClick={() => updateRentalApplication({ employmentType: emp.id })}
                      className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 dark:bg-teal-500 dark:text-slate-950 dark:border-teal-500 shadow-sm'
                          : 'bg-sky-50/70 dark:bg-slate-800 border-sky-100 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold">{emp.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Employer Info */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Employer Info
              </label>

              <div className="space-y-2">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                    Company Name
                  </span>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Stripe"
                      value={rentalApplication.companyName || 'Stripe'}
                      onChange={(e) => updateRentalApplication({ companyName: e.target.value })}
                      className="w-full py-3 pl-10 pr-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                    Job Title
                  </span>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Senior Product Designer"
                      value={rentalApplication.jobTitle || 'Senior Product Designer'}
                      onChange={(e) => updateRentalApplication({ jobTitle: e.target.value })}
                      className="w-full py-3 pl-10 pr-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Income Verification */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                Income Verification
              </label>

              <div className="space-y-2">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                    Annual Gross Income
                  </span>
                  <div className="relative">
                    <span className="text-xs font-bold text-slate-400 absolute left-3.5 top-3.5">
                      $
                    </span>
                    <input
                      type="text"
                      placeholder="165,000"
                      value={rentalApplication.annualIncome || '$165,000'}
                      onChange={(e) => updateRentalApplication({ annualIncome: e.target.value })}
                      className="w-full py-3 pl-8 pr-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                    Upload Paystubs (Latest 2 months)
                  </span>
                  <label className="block p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-sky-50/40 dark:bg-slate-800/40 text-center cursor-pointer hover:border-teal-500 transition-colors">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) setPaystubName(e.target.files[0].name);
                      }}
                    />
                    <FileText className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-slate-800 dark:text-white">
                      {paystubName ? `✓ ${paystubName}` : 'Tap to upload files'}
                    </p>
                    <p className="text-[10px] text-slate-400">PDF, PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Professional Links */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 dark:text-white">
                  Professional Links
                </label>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Optional
                </span>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="LinkedIn Profile URL"
                  value={rentalApplication.linkedinUrl || 'https://linkedin.com/in/alexchen'}
                  onChange={(e) => updateRentalApplication({ linkedinUrl: e.target.value })}
                  className="w-full py-3 px-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Portfolio / Website URL"
                  value={rentalApplication.portfolioUrl || 'https://alexchen.design'}
                  onChange={(e) => updateRentalApplication({ portfolioUrl: e.target.value })}
                  className="w-full py-3 px-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto w-full">
          <button
            type="button"
            onClick={() => setTenantAppStep(4)}
            className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Review Your Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Final Verification Review (Screen 5)
  if (tenantAppStep === 4) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">
        <div>
          <div className="p-4 space-y-4 max-w-lg mx-auto">
            {/* Title */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>REVIEWING APPLICATION</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Final Verification
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Review your details before submitting to the landlord.
              </p>
            </div>

            {/* Property summary card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&auto=format&fit=crop&q=80"
                alt="Skyline Vista Apartments"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 dark:text-teal-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Listing</span>
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Skyline Vista Apartments
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Unit 402 &bull; 128 Harbor St.
                </p>
              </div>
            </div>

            {/* Rental Reputation Card */}
            <div className="p-4 rounded-2xl bg-slate-950 text-white space-y-2.5 shadow-md border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  RENTAL REPUTATION
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-950 border border-teal-500/40 text-teal-300 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-teal-400" />
                  <span>Verified Identity</span>
                </span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-teal-400">942</span>
                <span className="text-sm font-bold text-slate-500">/ 1000</span>
              </div>

              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-400 w-[94.2%] rounded-full" />
              </div>
              <p className="text-[10px] text-slate-400">
                Your score is in the top 2% of applicants in this area.
              </p>
            </div>

            {/* Lease Terms Summary */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-white">
                <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>LEASE TERMS</span>
              </div>

              <div className="rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="p-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Proposed Start</span>
                  <span className="font-bold text-slate-900 dark:text-white">Oct 15, 2024</span>
                </div>
                <div className="p-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Monthly Rent</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">$3,200.00</span>
                </div>
                <div className="p-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Occupants</span>
                  <span className="font-bold text-slate-900 dark:text-white">1</span>
                </div>
              </div>
            </div>

            {/* Applicant Profile Summary */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-white">
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                <span>APPLICANT PROFILE</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-850 border border-sky-100 dark:border-slate-800 space-y-2">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Occupation</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Senior Product Designer at Stripe
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Annual Income</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">$165,000</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Employment Status</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-sky-50/40 dark:bg-slate-800/40 border border-sky-100 dark:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={rentalApplication.agreedToTerms || false}
                onChange={(e) => updateRentalApplication({ agreedToTerms: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                I confirm that all provided information is accurate and I agree to the{' '}
                <span className="text-teal-600 dark:text-teal-400 font-bold underline">
                  Standard Rental Terms
                </span>
                .
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto w-full">
          <button
            type="button"
            onClick={submitRentalApplication}
            className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Submit Rental Request</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Step 5: What happens next / Submission Confirmed (Screen 6)
  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">
      <div>
        <div className="p-4 max-w-lg mx-auto pt-6">
          {/* Main Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              What happens next
            </h2>

            {/* Stepper list */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-teal-500/30">
              {/* Step 1 */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center text-white">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <p className="text-[11px] font-bold text-teal-600 dark:text-teal-400">Step 1</p>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Request Submitted
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Today, 10:45 AM</p>
              </div>

              {/* Step 2 */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                </span>
                <p className="text-[11px] font-bold text-slate-400">Step 2</p>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Landlord Reviews
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Screening background & profile
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative space-y-0.5 opacity-60">
                <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <MessageSquare className="w-2.5 h-2.5 text-slate-500" />
                </span>
                <p className="text-[11px] font-bold text-slate-400">Step 3</p>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Chat Opens
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Coordinate a viewing</p>
              </div>

              {/* Step 4 */}
              <div className="relative space-y-0.5 opacity-60">
                <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <Key className="w-2.5 h-2.5 text-slate-500" />
                </span>
                <p className="text-[11px] font-bold text-slate-400">Step 4</p>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Move In
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Finalize lease & get keys
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 space-y-2 max-w-lg mx-auto w-full">
        <button
          type="button"
          onClick={() => {
            setCurrentScreen('tenant-requests-tracker');
            setGuestTab('requests');
          }}
          className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-sm shadow-md transition-all text-center"
        >
          Track Request
        </button>

        <button
          type="button"
          onClick={() => setCurrentScreen('tenant-home')}
          className="w-full py-2.5 px-5 rounded-2xl border border-teal-500/40 text-teal-600 dark:text-teal-400 font-bold text-xs hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all text-center"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};
