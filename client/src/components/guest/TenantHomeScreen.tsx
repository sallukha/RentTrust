import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Calendar,
  Heart,
  Search,
  History,
  ArrowRight,
  ShieldCheck,
  User,
  CheckCircle2,
  TrendingUp,
  MapPin,
  FileText,
  Phone,
  MessageSquare,
  X,
  ExternalLink,
  Award,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PropertyListing } from '../../types';

export const TenantHomeScreen: React.FC = () => {
  const {
    setCurrentScreen,
    openPropertyDetail,
    savedPropertyIds,
    toggleSaveProperty,
    setSearchFilterText,
    setGuestTab,
    currentUser,
    properties,
  } = useAuth();

  // Modals state
  const [isReputationModalOpen, setIsReputationModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [activeSearchTag, setActiveSearchTag] = useState<string | null>(null);

  // Filter saved properties or fallback to the two reference properties
  const dumboLoft = properties.find((p) => p.id === 'prop-dumbo-industrial') || properties[0];
  const greenwichTownhouse = properties.find((p) => p.id === 'prop-greenwich-townhouse') || properties[1];

  const savedDisplayList: PropertyListing[] = properties.length > 0 ? [
    ...(dumboLoft ? [dumboLoft] : []),
    ...(greenwichTownhouse ? [greenwichTownhouse] : []),
    ...properties.filter(
      (p) => savedPropertyIds.includes(p.id) && p.id !== dumboLoft?.id && p.id !== greenwichTownhouse?.id
    ),
  ].slice(0, 4) : [];

  // Recent searches list matching image
  const recentSearches = [
    { label: '2BR Chelsea', query: 'Chelsea' },
    { label: 'Pets allowed Loft', query: 'Loft' },
    { label: 'Under $3.5k', query: 'Brooklyn' },
  ];

  const handleSearchTagClick = (tag: { label: string; query: string }) => {
    setActiveSearchTag(tag.label);
    setSearchFilterText(tag.query);
    setTimeout(() => {
      setGuestTab('explore');
      setCurrentScreen('guest-explore');
    }, 150);
  };

  return (
    <div id="tenant-home-screen" className="w-full max-w-md mx-auto space-y-5 pb-6">
      {/* Greeting */}
      <div className="space-y-0.5">
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
          Good morning,
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          {currentUser?.fullName || 'Alex Chen'}
        </h2>
      </div>

      {/* Tenant Reputation Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl bg-[#0a101f] text-white p-6 sm:p-7 shadow-xl border border-slate-800/80 relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-5 relative z-10">
          {/* Label */}
          <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase">
            TENANT REPUTATION SCORE
          </p>

          {/* Large Score Display */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
              842
            </span>
            <span className="text-xl sm:text-2xl font-semibold text-slate-400 tracking-normal">
              /900
            </span>
          </div>

          {/* Custom Score Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(842 / 900) * 100}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="h-full bg-white rounded-full shadow-xs"
              />
            </div>

            {/* Score sub labels */}
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-200">Excellent</span>
              <span className="text-slate-200 flex items-center gap-1">
                +12 pts this month
              </span>
            </div>
          </div>

          {/* View Reputation Breakdown Button */}
          <button
            id="btn-view-reputation-breakdown"
            type="button"
            onClick={() => setIsReputationModalOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-[#192132] hover:bg-[#222c42] active:bg-[#161d2d] transition-all flex items-center justify-center gap-2 text-sm font-bold text-slate-100 shadow-xs cursor-pointer group"
          >
            <span>View Reputation Breakdown</span>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* ACTIVE JOURNEY Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black tracking-[0.14em] text-slate-900 dark:text-white uppercase">
            ACTIVE JOURNEY
          </h3>
          <button
            type="button"
            onClick={() => setCurrentScreen('tenant-requests-tracker')}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
          >
            Track Full Timeline &rarr;
          </button>
        </div>

        <div className="space-y-3">
          {/* Card 1: Awaiting Response / Live Request Tracker */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setCurrentScreen('tenant-requests-tracker')}
            className="p-4 rounded-2xl bg-[#eaf1fb] dark:bg-slate-800/80 border border-blue-100/90 dark:border-slate-700/60 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#dce7f7] dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-200">
              <Clock className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Active Rental Application
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-black uppercase">
                  IN REVIEW
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                Landlord Marcus Sterling is reviewing your dossier for The Skylark Loft.
              </p>
            </div>
          </motion.div>

          {/* New Fast Application Action Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setCurrentScreen('tenant-new-request')}
            className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-200/80 dark:border-teal-800/60 flex items-center justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold">
                +
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Start New Rental Request
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fill occupancy details & income verification
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </motion.div>

          {/* Card 2: Upcoming Visit */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsVisitModalOpen(true)}
            className="p-4 rounded-2xl bg-[#f4f6fa] dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#e6ebf3] dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-200">
              <Calendar className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Upcoming Visit
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-[#0a101f] text-white text-[10px] font-black tracking-wider uppercase">
                  TOMORROW
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed truncate">
                Modern Studio, Brooklyn Heights • 2:30 PM
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SAVED PROPERTIES Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black tracking-[0.14em] text-slate-900 dark:text-white uppercase">
            SAVED PROPERTIES
          </h3>
          <button
            type="button"
            onClick={() => {
              setGuestTab('explore');
              setCurrentScreen('guest-explore');
            }}
            className="text-xs font-bold text-slate-900 dark:text-white hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Horizontal Scrolling Saved Property Cards */}
        <div className="flex items-stretch gap-3.5 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
          {savedDisplayList.map((property) => {
            const isSaved = savedPropertyIds.includes(property.id);

            return (
              <motion.div
                key={property.id}
                whileHover={{ y: -2 }}
                onClick={() => openPropertyDetail(property)}
                className="w-56 sm:w-60 flex-shrink-0 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {/* Price Tag Pill on bottom-left */}
                  <div className="absolute bottom-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0e1628]/95 text-white font-bold text-xs shadow-md backdrop-blur-xs">
                      {property.priceNumeric ? `$${property.priceNumeric.toLocaleString()}/mo` : property.price}
                    </span>
                  </div>

                  {/* Heart Button on top-right */}
                  <button
                    type="button"
                    onClick={(e) => toggleSaveProperty(property.id, e)}
                    className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                    aria-label="Save property"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? 'fill-rose-500 text-rose-500' : 'stroke-[2.2]'
                      }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {property.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Primary Action Button: Explore New Properties */}
      <div className="pt-1">
        <motion.button
          id="btn-explore-new-properties"
          type="button"
          onClick={() => {
            setGuestTab('explore');
            setCurrentScreen('guest-explore');
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 rounded-2xl bg-[#0a101f] dark:bg-slate-900 hover:bg-[#131b2e] dark:hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
          <span>Explore New Properties</span>
        </motion.button>
      </div>

      {/* Recent Searches Section */}
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700/80 p-4 space-y-3 bg-slate-50/50 dark:bg-slate-850/40">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Recent Searches
          </h4>
          <History className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </div>

        {/* Search Pills */}
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((item) => {
            const isSelected = activeSearchTag === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleSearchTagClick(item)}
                className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300/80 dark:hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MODAL 1: Tenant Reputation Breakdown */}
      <AnimatePresence>
        {isReputationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      Reputation Breakdown
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Tier 1 Verified Tenant Score
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReputationModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Score Highlight Header */}
              <div className="p-4 rounded-2xl bg-[#0a101f] text-white flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    CURRENT SCORE
                  </p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-3xl font-black">842</span>
                    <span className="text-sm font-semibold text-slate-400">/900</span>
                  </div>
                  <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Top 4% of all platform renters</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-black text-xs">
                    EXCELLENT
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1.5">+12 pts updated Aug</p>
                </div>
              </div>

              {/* Score Factors List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Score Factors & Metrics
                </h4>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Identity & Background Check
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Government ID & SSN verified
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      300 / 300
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          On-Time Payment History
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          24 consecutive on-time rent cycles
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      280 / 300
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Verified Income Stability
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          W2 linked, 3.8x rent coverage
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      150 / 150
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          Landlord Endorsements
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          3 verified positive recommendations
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      112 / 150
                    </span>
                  </div>
                </div>
              </div>

              {/* Unlocked Benefits */}
              <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 text-xs font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Unlocked Renter Privileges</span>
                </div>
                <ul className="text-xs text-teal-700 dark:text-teal-300 space-y-1 ml-6 list-disc">
                  <li>$0 Security Deposit Guarantee Option</li>
                  <li>Fast-track 24h landlord review priority</li>
                  <li>Pre-approved status for listings up to $4,500/mo</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setIsReputationModalOpen(false)}
                className="w-full py-3 rounded-xl bg-slate-950 dark:bg-teal-600 text-white text-xs font-bold hover:bg-slate-850"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Application Journey Details */}
      <AnimatePresence>
        {isApplicationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Application Status</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsApplicationModalOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Skyline Lofts • Unit 4B
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                    IN REVIEW
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Applied 2 days ago for $3,600/mo lease. Landlord Sarah Jenkins has opened your verified dossier.
                </p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>1. Application & Identity Submitted</span>
                </div>
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>2. Credit & Background Cleared</span>
                </div>
                <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-bold">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>3. Final Landlord Review (Est. response in ~14h)</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsApplicationModalOpen(false);
                    setGuestTab('chat');
                    setCurrentScreen('guest-home');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-950 dark:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message Landlord</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsApplicationModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Scheduled Visit Details */}
      <AnimatePresence>
        {isVisitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <span>Confirmed Tour Itinerary</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsVisitModalOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Modern Studio Loft
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                    CONFIRMED
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Tomorrow, 2:30 PM • 142 Montague St, Brooklyn Heights, NY
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Host: Marcus Sterling (Certified Verified Landlord)
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Buzz Unit 302 at main building lobby</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Direct contact: (555) 283-9910</span>
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    alert('Tour saved to calendar!');
                    setIsVisitModalOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-950 dark:bg-teal-600 text-white font-bold text-xs"
                >
                  Add to Calendar
                </button>
                <button
                  type="button"
                  onClick={() => setIsVisitModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
