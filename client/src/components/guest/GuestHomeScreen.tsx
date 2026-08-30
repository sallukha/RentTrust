import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  Shield,
  ShieldCheck,
  Heart,
  Star,
  Compass,
  Building,
  Home as HomeIcon,
  Castle,
  Palmtree,
  Mountain,
  Grid,
  Sparkles,
  ArrowRight,
  LogIn,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PropertyListing } from '../../types';

export const GuestHomeScreen: React.FC = () => {
  const {
    setCurrentScreen,
    openPropertyDetail,
    savedPropertyIds,
    toggleSaveProperty,
    searchFilterText,
    setSearchFilterText,
    selectedCategory,
    setSelectedCategory,
    setIsFilterModalOpen,
    guestHomeVariant,
    setGuestHomeVariant,
    properties,
  } = useAuth();

  const [isTrustModalOpen, setIsTrustModalOpen] = useState<boolean>(false);

  // Category definitions
  const categories = [
    { id: 'Modern Lofts', label: 'Modern Lofts', icon: Building },
    { id: 'Family Homes', label: 'Family Homes', icon: HomeIcon },
    { id: 'Studios', label: 'Studios', icon: Grid },
    { id: 'Castles', label: 'Castles', icon: Castle },
    { id: 'Beach', label: 'Beach', icon: Palmtree },
    { id: 'Views', label: 'Views', icon: Mountain },
    { id: 'Unique', label: 'Unique', icon: Sparkles },
  ];

  // Filter listings
  const filteredListings = properties.filter((prop) => {
    if (searchFilterText) {
      const matchSearch =
        prop.title.toLowerCase().includes(searchFilterText.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchFilterText.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchFilterText.toLowerCase());
      if (!matchSearch) return false;
    }

    if (selectedCategory && selectedCategory !== 'All') {
      if (selectedCategory === 'Modern Lofts') return prop.title.includes('Loft') || prop.sqft! > 1200;
      if (selectedCategory === 'Studios') return prop.beds === 1 || prop.sqft! < 800;
      if (selectedCategory === 'Family Homes') return prop.beds >= 3;
      if (selectedCategory === 'Views') return prop.title.includes('Vista') || prop.title.includes('Lake');
      if (selectedCategory === 'Beach') return prop.title.includes('Lakeside') || prop.location.includes('Lake');
    }

    return true;
  });

  return (
    <div id="guest-home-screen" className="w-full space-y-4 pb-2">
      {/* Mode Switcher Pill (Rental Hub vs Stays Discovery) */}
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
        <button
          type="button"
          onClick={() => setGuestHomeVariant('rental')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            guestHomeVariant === 'rental'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Long-Term Rentals</span>
        </button>
        <button
          type="button"
          onClick={() => setGuestHomeVariant('stays')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            guestHomeVariant === 'stays'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Castle className="w-3.5 h-3.5" />
          <span>Curated Stays</span>
        </button>
      </div>

      {/* Universal Search Bar matching Image 2 & 3 */}
      <div className="relative">
        <div className="flex items-center bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-700/90 rounded-full shadow-xs hover:shadow-md transition-shadow px-4 py-2.5">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-2.5 flex-shrink-0" />
          <input
            type="text"
            placeholder={
              guestHomeVariant === 'rental'
                ? 'Where to? Anywhere • Any week • Add guests'
                : 'Where are you going?'
            }
            value={searchFilterText}
            onChange={(e) => setSearchFilterText(e.target.value)}
            className="w-full bg-transparent text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
          <button
            type="button"
            id="search-filter-trigger"
            onClick={() => setCurrentScreen('filters-criteria')}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors ml-1 cursor-pointer"
            aria-label="Open Filters & Criteria screen"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Icons Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
        <button
          type="button"
          onClick={() => setSelectedCategory('All')}
          className={`flex flex-col items-center justify-center min-w-[62px] py-1.5 px-2 rounded-2xl transition-all ${
            selectedCategory === 'All'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-xs'
              : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 font-medium'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] whitespace-nowrap">All Homes</span>
        </button>

        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center justify-center min-w-[70px] py-1.5 px-2 rounded-2xl transition-all ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-xs'
                  : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 font-medium'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] whitespace-nowrap">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Verified Trust Card Banner matching Image 2 */}
      {guestHomeVariant === 'rental' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-[#0e1628] text-white p-5 shadow-lg border border-slate-800"
        >
          {/* Shield watermark graphic */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-15 pointer-events-none">
            <ShieldCheck className="w-full h-full text-white" />
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <h2 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                Verified Trust
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-[260px]">
              Every landlord on RentalTrust is pre-vetted for your peace of mind.
            </p>
            <button
              type="button"
              onClick={() => setIsTrustModalOpen(true)}
              className="mt-1 px-3.5 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Section Header */}
      <div className="flex items-center justify-between pt-1 px-1">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
          {guestHomeVariant === 'rental' ? 'Featured Verified Rentals' : 'Recommended for you'}
        </h3>
        <button
          type="button"
          onClick={() => setCurrentScreen('guest-explore')}
          className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
        >
          See all
        </button>
      </div>

      {/* Property Cards List */}
      <div className="space-y-4">
        {filteredListings.map((property) => {
          const isSaved = savedPropertyIds.includes(property.id);

          return (
            <motion.div
              key={property.id}
              whileHover={{ y: -2 }}
              onClick={() => openPropertyDetail(property)}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/70 dark:border-slate-700/60 overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              {/* Photo Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge (Elite Landlord, Trusted Landlord, Top Choice, Rare Find) */}
                {property.badgeLabel && (
                  <div className="absolute bottom-3 left-3 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-md backdrop-blur-md ${
                        property.badgeType === 'elite-landlord'
                          ? 'bg-emerald-600/90 text-white'
                          : property.badgeType === 'trusted-landlord'
                          ? 'bg-teal-600/90 text-white'
                          : property.badgeType === 'rare-find'
                          ? 'bg-teal-500/90 text-white'
                          : 'bg-emerald-500/90 text-white'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{property.badgeLabel}</span>
                    </span>
                  </div>
                )}

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  id={`favorite-btn-${property.id}`}
                  onClick={(e) => toggleSaveProperty(property.id, e)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="Save to favorites"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isSaved ? 'fill-red-500 text-red-500' : 'text-white'
                    }`}
                  />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-tight">
                      {property.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {property.location}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {property.price}
                    </p>
                    {property.priceUnit && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-medium">
                        {property.priceUnit}
                      </p>
                    )}
                  </div>
                </div>

                {/* Specs / Ratings */}
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span>{property.beds} Bed</span>
                    <span>&bull;</span>
                    <span>{property.baths} Bath</span>
                    {property.sqft && (
                      <>
                        <span>&bull;</span>
                        <span>{property.sqft.toLocaleString()} sqft</span>
                      </>
                    )}
                  </div>

                  {property.rating && (
                    <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{property.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* End of Road CTA matching Image 3 */}
      <div className="pt-2">
        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-850/90 border border-slate-200/80 dark:border-slate-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center mx-auto shadow-xs text-slate-700 dark:text-slate-300">
            <Compass className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>

          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              End of the road?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              There are thousands more unique stays and verified listings waiting to be discovered.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCurrentScreen('guest-explore')}
            className="py-2.5 px-6 rounded-xl bg-[#0e1628] dark:bg-blue-600 hover:bg-[#16233f] dark:hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Keep exploring</span>
          </button>
        </div>
      </div>

      {/* Sticky Bottom Personalized Recommendations Banner matching Image 2 */}
      <div className="sticky bottom-14 z-20 pt-2">
        <div className="p-3 px-4 rounded-2xl bg-[#0e1628] text-white shadow-xl flex items-center justify-between gap-3 border border-slate-800">
          <div>
            <p className="text-xs font-bold text-white leading-tight">Ready for more?</p>
            <p className="text-[11px] text-slate-300">Get personalized recommendations</p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentScreen('login')}
            className="py-2 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-all flex-shrink-0"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Log In</span>
          </button>
        </div>
      </div>

      {/* Verified Trust Info Modal */}
      <AnimatePresence>
        {isTrustModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsTrustModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  The RentalTrust Guarantee
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  How our pre-vetting framework protects both renters and hosts.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span><strong>100% Deed Verification:</strong> We cross-check county land deeds to ensure legitimate property ownership.</span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Escrow Deposit Protection:</strong> Your security deposit is held in a protected bank escrow vault until move-in inspection.</span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero Fake Listings:</strong> Every photo is geocoded and validated before publication.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTrustModalOpen(false)}
                className="w-full py-3 rounded-xl bg-slate-950 dark:bg-teal-600 text-white font-bold text-xs"
              >
                Got It, Return to Browse
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
