import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Heart,
  Share2,
  ShieldCheck,
  MapPin,
  Users,
  Wifi,
  Plus,
  Star,
  ChevronRight,
  Snowflake,
  ParkingCircle,
  Utensils,
  Flame,
  Bath,
  Zap,
  Mountain,
  Check,
  LogIn,
  Info,
  Calendar,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PROPERTY_LISTINGS, PROPERTY_REVIEWS } from '../../data/properties';

export const PropertyDetailScreen: React.FC = () => {
  const {
    selectedProperty,
    setCurrentScreen,
    savedPropertyIds,
    toggleSaveProperty,
    setReturnToScreenAfterAuth,
    currentUser,
    isGuestSession,
    startApplicationForProperty,
  } = useAuth();

  const property = selectedProperty || PROPERTY_LISTINGS[0];
  const isSaved = savedPropertyIds.includes(property.id);

  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState<boolean>(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState<boolean>(false);
  const [isPriceBreakdownOpen, setIsPriceBreakdownOpen] = useState<boolean>(false);
  const [isShareToastOpen, setIsShareToastOpen] = useState<boolean>(false);

  const handleStartRequest = () => {
    startApplicationForProperty(property);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsShareToastOpen(true);
    setTimeout(() => setIsShareToastOpen(false), 2500);
  };

  return (
    <div id="property-details-screen" className="w-full space-y-4 pb-20 relative">
      {/* Hero Image Gallery with 1/12 Photo Counter matching Image 4 */}
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-slate-900">
        <img
          src={property.images[activePhotoIdx % property.images.length]}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Top Overlay Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            type="button"
            id="gallery-heart-btn"
            onClick={(e) => toggleSaveProperty(property.id, e)}
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-105 transition-all"
            aria-label="Save"
          >
            <Heart
              className={`w-5 h-5 ${
                isSaved ? 'fill-red-500 text-red-500' : 'text-slate-800 dark:text-white'
              }`}
            />
          </button>

          <button
            type="button"
            id="gallery-share-btn"
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white backdrop-blur-md flex items-center justify-center shadow-md hover:scale-105 transition-all"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Image Pagination Clickers */}
        <div className="absolute inset-y-0 left-0 w-1/3 cursor-pointer" onClick={() => setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : property.images.length - 1))} />
        <div className="absolute inset-y-0 right-0 w-1/3 cursor-pointer" onClick={() => setActivePhotoIdx((prev) => (prev + 1) % property.images.length)} />

        {/* Photo Counter Badge matching Image 4 (1/12) */}
        <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-black tracking-wider">
          {activePhotoIdx + 1}/{property.images.length * 3}
        </div>
      </div>

      {/* Floating Verified Card matching Image 4 */}
      <div className="relative -mt-6 mx-1 z-20">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-700/90 shadow-xl space-y-3">
          {/* Verified Listing Badge */}
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-teal-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>VERIFIED LISTING</span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {property.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          {/* Nightly Rate & Specs Badges */}
          <div className="flex items-end justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {property.priceUnit === '/month' ? 'Monthly Lease' : 'Nightly Rate'}
              </p>
              <p className="text-xl font-black text-slate-900 dark:text-white">
                {property.price}{' '}
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {property.priceUnit ? property.priceUnit : ''}
                </span>
              </p>
            </div>

            {/* Spec Chips matching Image 4 (User icon, WiFi icon, +3) */}
            <div className="flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <Users className="w-3.5 h-3.5" />
              </span>
              <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <Wifi className="w-3.5 h-3.5" />
              </span>
              <span className="px-2 py-1 rounded-full bg-slate-900 dark:bg-teal-600 text-white font-black text-[11px]">
                +{property.beds}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Host Card matching Image 4 */}
      <div
        onClick={() => setCurrentScreen('landlord-profile')}
        className="mx-1 p-4 rounded-3xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-all shadow-2xs"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={property.host.avatar}
              alt={property.host.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-2xl object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center border-2 border-white dark:border-slate-800">
              <Star className="w-2.5 h-2.5 fill-amber-400" />
            </span>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
              Hosted by {property.host.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Reputation: {property.host.reputation}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1"
        >
          <span>View</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* About this space section matching Image 4 */}
      <div className="mx-1 space-y-2">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          About this space
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {isReadMoreOpen ? property.description : `${property.description.slice(0, 130)}...`}
        </p>
        <button
          type="button"
          onClick={() => setIsReadMoreOpen((prev) => !prev)}
          className="text-xs font-bold text-slate-900 dark:text-white hover:underline block"
        >
          {isReadMoreOpen ? 'Show less' : 'Read more'}
        </button>
      </div>

      {/* Amenities Grid 2x2 matching Image 4 */}
      <div className="mx-1 space-y-2.5">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          Amenities & Features
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
            <Wifi className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Fiber WiFi</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
            <Snowflake className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Central Air</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
            <ParkingCircle className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Free Parking</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-3">
            <Utensils className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Chef's Kitchen</span>
          </div>
        </div>
      </div>

      {/* Reviews Summary & Carousel matching Image 4 */}
      <div className="mx-1 space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
            <Star className="w-4 h-4 fill-slate-900 dark:fill-white text-slate-900 dark:text-white" />
            <span>4.92</span>
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              ({property.reviewCount || 128} reviews)
            </span>
          </div>
          <button type="button" className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">
            See all
          </button>
        </div>

        {/* Horizontal Review Cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {PROPERTY_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="flex-shrink-0 w-72 p-4 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-700/70 space-y-2 shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center font-bold text-xs">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                    {rev.author}
                  </h5>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{rev.date}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed line-clamp-3">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Action Bar matching Image 4 */}
      <div
        id="property-bottom-action-bar"
        className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 px-4 sm:px-5 flex items-center justify-between shadow-2xl"
      >
        <div>
          <p className="text-base font-black text-slate-900 dark:text-white leading-tight">
            {property.price}
          </p>
          <button
            type="button"
            onClick={() => setIsPriceBreakdownOpen(true)}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 underline hover:text-teal-600"
          >
            Total: $1,420
          </button>
        </div>

        <button
          type="button"
          id="sign-in-to-request-btn"
          onClick={handleStartRequest}
          className="py-3 px-5 rounded-2xl bg-[#0e1628] dark:bg-teal-600 hover:bg-[#16233f] dark:hover:bg-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
        >
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Start Rental Request</span>
        </button>
      </div>

      {/* Price Breakdown Modal */}
      <AnimatePresence>
        {isPriceBreakdownOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsPriceBreakdownOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Price Calculation
                </h3>
                <button
                  type="button"
                  onClick={() => setIsPriceBreakdownOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>3 nights &times; $450/night</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$1,350</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning & turnover fee</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$150</span>
                </div>
                <div className="flex justify-between">
                  <span>RentalTrust verification insurance</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$120</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Welcome discount promo</span>
                  <span>-$200</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 font-extrabold text-sm text-slate-900 dark:text-white">
                  <span>Total Amount</span>
                  <span>$1,420</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartRequest}
                className="w-full py-3 rounded-xl bg-[#0e1628] dark:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Start Rental Request</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Host Profile Modal */}
      <AnimatePresence>
        {isHostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsHostModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-4 text-center"
            >
              <img
                src={property.host.avatar}
                alt={property.host.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-teal-500/30"
              />
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {property.host.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Superhost &bull; 9.8/10 Verified Rating &bull; Response Time &lt; 1hr
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                "We take tremendous pride in maintaining our mountain retreat and ensuring every guest enjoys a frictionless, luxury experience."
              </p>

              <button
                type="button"
                onClick={() => setIsHostModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Toast */}
      {isShareToastOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-3.5 h-3.5 text-teal-400" />
          <span>Listing link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
};
