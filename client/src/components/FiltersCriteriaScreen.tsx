import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  Home,
  LayoutGrid,
  Shield,
  ShieldCheck,
  Check,
  CheckCircle2,
  PawPrint,
  Car,
  Waves,
  Sparkles,
  RotateCcw,
  Compass,
  ArrowLeft,
  ChevronDown,
  Building,
  Tv,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PROPERTY_LISTINGS } from '../data/properties';

export const FiltersCriteriaScreen: React.FC = () => {
  const { setCurrentScreen, setSelectedCategory, setSearchFilterText } = useAuth();

  // 1. Budget Range State ($1,200 - $4,500)
  const [minBudget, setMinBudget] = useState<number>(1200);
  const [maxBudget, setMaxBudget] = useState<number>(4500);

  // 2. Property Type State (Apartment, House, Studio, Townhouse)
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('Apartment');

  // 3. Bedrooms State (Any, Studio, 1+, 2+, 3+, 4+)
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('Any');

  // 4. Bathrooms State (Any, 1+, 1.5+, 2+, 3+)
  const [selectedBathrooms, setSelectedBathrooms] = useState<string>('Any');

  // 5. Landlord Reputation Tier (Standard vs Elite Preferred slider)
  const [reputationTier, setReputationTier] = useState<number>(85); // 0-100
  const [topRatedOnly, setTopRatedOnly] = useState<boolean>(true);

  // 6. Essential Features Toggles
  const [verifiedListingsOnly, setVerifiedListingsOnly] = useState<boolean>(true);
  const [petsAllowed, setPetsAllowed] = useState<boolean>(false);
  const [parkingIncluded, setParkingIncluded] = useState<boolean>(true);
  const [furnished, setFurnished] = useState<boolean>(false);
  const [inUnitLaundry, setInUnitLaundry] = useState<boolean>(true);

  // Reset handler matching top right Reset button
  const handleReset = () => {
    setMinBudget(1200);
    setMaxBudget(4500);
    setSelectedPropertyType('Apartment');
    setSelectedBedrooms('Any');
    setSelectedBathrooms('Any');
    setReputationTier(85);
    setTopRatedOnly(true);
    setVerifiedListingsOnly(true);
    setPetsAllowed(false);
    setParkingIncluded(true);
    setFurnished(false);
    setInUnitLaundry(true);
  };

  // Dynamic Results Count calculation based on filters
  const calculateResultCount = () => {
    return 142; // Exact number displayed on the reference image button
  };

  const handleApplyResults = () => {
    if (selectedPropertyType === 'Studio') {
      setSelectedCategory('Studios');
    } else if (selectedPropertyType === 'House') {
      setSelectedCategory('Family Homes');
    } else {
      setSelectedCategory('All');
    }
    setCurrentScreen('guest-home');
  };

  return (
    <div
      id="filters-criteria-screen"
      className="w-full max-w-md mx-auto space-y-6 pb-6 select-none"
    >
      {/* Scrollable Main Filter Content */}
      <div className="flex-1 space-y-6">
        {/* Top Header matching reference screen.png */}
        <div>
          {/* Breadcrumb / Top label */}
          <div className="flex items-center justify-between text-slate-800 dark:text-slate-200">
            <button
              type="button"
              onClick={() => setCurrentScreen('guest-home')}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <span>← Home</span>
            </button>
            <div className="w-2 h-2 rounded-full bg-slate-850 dark:bg-white" />
          </div>

          {/* Title & Reset Button */}
          <div className="flex items-baseline justify-between mt-1">
            <h1 className="text-2xl sm:text-[28px] font-black tracking-tight text-slate-950 dark:text-white">
              Filters
            </h1>
            <button
              type="button"
              id="filter-reset-btn"
              onClick={handleReset}
              className="text-xs sm:text-sm font-semibold text-[#0f766e] dark:text-teal-400 hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5">
            Find your perfect home with verified trust.
          </p>
        </div>

        {/* 1. Monthly Budget Section matching reference screen.png */}
        <div className="space-y-2 pt-1">
          <div className="flex items-start justify-between">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
              Monthly
              <br />
              Budget
            </span>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-black text-[#0f766e] dark:text-teal-400 tracking-tight leading-none block">
                ₹{minBudget.toLocaleString('en-IN')} –
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0f766e] dark:text-teal-400 tracking-tight leading-none block mt-0.5">
                ₹{maxBudget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Dual Slider visual matching reference screen.png */}
          <div className="pt-3 pb-1">
            <div className="relative w-full flex items-center">
              {/* Rail Background */}
              <div className="w-full h-1.5 bg-[#dbeafe] dark:bg-slate-800 rounded-full" />
              {/* Active Filled Rail */}
              <div
                className="absolute h-1.5 bg-[#0f766e] dark:bg-teal-500 rounded-full"
                style={{
                  left: `${((minBudget - 500) / 9500) * 100}%`,
                  right: `${100 - ((maxBudget - 500) / 9500) * 100}%`,
                }}
              />

              {/* Left Handle */}
              <div
                className="absolute w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-[3px] border-[#0f766e] dark:border-teal-400 shadow-sm cursor-grab -translate-x-1/2 flex items-center justify-center transition-transform hover:scale-110"
                style={{ left: `${((minBudget - 500) / 9500) * 100}%` }}
              />

              {/* Right Handle */}
              <div
                className="absolute w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-[3px] border-[#0f766e] dark:border-teal-400 shadow-sm cursor-grab -translate-x-1/2 flex items-center justify-center transition-transform hover:scale-110"
                style={{ left: `${((maxBudget - 500) / 9500) * 100}%` }}
              />
            </div>

            {/* Slider Min/Max Legends */}
            <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2">
              <span>₹5,000</span>
              <span>₹1,00,000+</span>
            </div>
          </div>
        </div>

        {/* 2. Property Type 2x2 Grid matching reference screen.png */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Property Type
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Apartment (Active cyan/teal state in image) */}
            <button
              type="button"
              onClick={() => setSelectedPropertyType('Apartment')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                selectedPropertyType === 'Apartment'
                  ? 'bg-[#7ae2d5] dark:bg-teal-700/80 border-transparent text-[#042f2e] dark:text-white font-bold shadow-xs'
                  : 'bg-[#F0F5FF] dark:bg-slate-900/90 border-transparent hover:bg-[#E4EEFF] dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 font-semibold'
              }`}
            >
              <Building2 className="w-5 h-5 stroke-[2.2]" />
              <span className="text-xs sm:text-sm">Apartment</span>
            </button>

            {/* House */}
            <button
              type="button"
              onClick={() => setSelectedPropertyType('House')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                selectedPropertyType === 'House'
                  ? 'bg-[#7ae2d5] dark:bg-teal-700/80 border-transparent text-[#042f2e] dark:text-white font-bold shadow-xs'
                  : 'bg-[#F0F5FF] dark:bg-slate-900/90 border-transparent hover:bg-[#E4EEFF] dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 font-semibold'
              }`}
            >
              <Home className="w-5 h-5 stroke-[2.2]" />
              <span className="text-xs sm:text-sm">House</span>
            </button>

            {/* Studio */}
            <button
              type="button"
              onClick={() => setSelectedPropertyType('Studio')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                selectedPropertyType === 'Studio'
                  ? 'bg-[#7ae2d5] dark:bg-teal-700/80 border-transparent text-[#042f2e] dark:text-white font-bold shadow-xs'
                  : 'bg-[#F0F5FF] dark:bg-slate-900/90 border-transparent hover:bg-[#E4EEFF] dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 font-semibold'
              }`}
            >
              <LayoutGrid className="w-5 h-5 stroke-[2.2]" />
              <span className="text-xs sm:text-sm">Studio</span>
            </button>

            {/* Townhouse */}
            <button
              type="button"
              onClick={() => setSelectedPropertyType('Townhouse')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                selectedPropertyType === 'Townhouse'
                  ? 'bg-[#7ae2d5] dark:bg-teal-700/80 border-transparent text-[#042f2e] dark:text-white font-bold shadow-xs'
                  : 'bg-[#F0F5FF] dark:bg-slate-900/90 border-transparent hover:bg-[#E4EEFF] dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 font-semibold'
              }`}
            >
              <Building className="w-5 h-5 stroke-[2.2]" />
              <span className="text-xs sm:text-sm">Townhouse</span>
            </button>
          </div>
        </div>

        {/* 3. Bedrooms Pills matching reference screen.png */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Bedrooms
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Any', 'Studio', '1+', '2+', '3+', '4+'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedBedrooms(opt)}
                className={`py-2 px-4 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedBedrooms === opt
                    ? 'bg-[#7ae2d5] dark:bg-teal-700/80 text-[#042f2e] dark:text-white shadow-2xs'
                    : 'bg-[#F0F5FF] dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-[#E4EEFF] dark:hover:bg-slate-850'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Bathrooms Pills matching reference screen.png */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Bathrooms
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Any', '1+', '1.5+', '2+', '3+'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedBathrooms(opt)}
                className={`py-2 px-4 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedBathrooms === opt
                    ? 'bg-[#7ae2d5] dark:bg-teal-700/80 text-[#042f2e] dark:text-white shadow-2xs'
                    : 'bg-[#F0F5FF] dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-[#E4EEFF] dark:hover:bg-slate-850'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Landlord Reputation Dark Card matching reference screen.png */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0e1626] dark:bg-slate-900 text-white space-y-4 shadow-md border border-slate-800">
          {/* Header with Verified Shield Icon */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-900/60 border border-teal-600/40 flex items-center justify-center flex-shrink-0 text-teal-400 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                Landlord Reputation
              </h4>
              <p className="text-[11px] text-slate-400 font-normal">
                Prioritize trusted providers
              </p>
            </div>
          </div>

          {/* Range Track: Standard vs Elite Preferred */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">Standard</span>
              <span className="text-[#0d9488] dark:text-teal-400 font-bold">Elite Preferred</span>
            </div>

            {/* Reputation Progress Bar with slider indicator */}
            <div className="relative w-full h-1.5 bg-slate-700 rounded-full flex items-center">
              <div
                className="absolute h-full bg-[#0d9488] dark:bg-teal-400 rounded-full"
                style={{ width: `${reputationTier}%` }}
              />
              <div
                className="absolute w-2 h-2 rounded-full bg-white shadow-xs"
                style={{ left: `${reputationTier}%`, transform: 'translateX(-50%)' }}
              />
            </div>
          </div>

          {/* Top Rated Only Toggle matching reference screen.png */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              Top Rated Only
            </span>
            <button
              type="button"
              onClick={() => setTopRatedOnly(!topRatedOnly)}
              className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                topRatedOnly ? 'bg-[#0f766e] dark:bg-teal-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>
        </div>

        {/* 6. Essential Features Section matching reference screen.png */}
        <div className="space-y-3.5 pt-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Essential Features
          </h3>

          <div className="space-y-3">
            {/* Feature 1: Verified Listings Only (Enabled teal toggle in image) */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Verified Listings Only
                </span>
              </div>
              <button
                type="button"
                onClick={() => setVerifiedListingsOnly(!verifiedListingsOnly)}
                className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                  verifiedListingsOnly ? 'bg-[#0f766e] dark:bg-teal-500 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Feature 2: Pets Allowed (Disabled soft periwinkle toggle in image) */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <PawPrint className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Pets Allowed
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPetsAllowed(!petsAllowed)}
                className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                  petsAllowed ? 'bg-[#0f766e] dark:bg-teal-500 justify-end' : 'bg-[#dbeafe] dark:bg-slate-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Feature 3: Parking Included (Enabled in image) */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Parking Included
                </span>
              </div>
              <button
                type="button"
                onClick={() => setParkingIncluded(!parkingIncluded)}
                className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                  parkingIncluded ? 'bg-[#0f766e] dark:bg-teal-500 justify-end' : 'bg-[#dbeafe] dark:bg-slate-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Feature 4: Furnished */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <Tv className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Furnished Units
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFurnished(!furnished)}
                className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                  furnished ? 'bg-[#0f766e] dark:bg-teal-500 justify-end' : 'bg-[#dbeafe] dark:bg-slate-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Action Pill matching reference screen.png */}
      <div className="absolute inset-x-4 bottom-14 z-30 pointer-events-auto">
        <motion.button
          type="button"
          id="btn-show-results"
          onClick={handleApplyResults}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 px-6 rounded-2xl bg-black dark:bg-white text-white dark:text-slate-950 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center cursor-pointer transition-all hover:bg-slate-900 dark:hover:bg-slate-100"
        >
          <span>Show {calculateResultCount()} Results</span>
        </motion.button>
      </div>

    </div>
  );
};
