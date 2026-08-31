import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Star,
  Home,
  Zap,
  MessageSquare,
  Share2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  Award,
  Send,
  X,
  Lock,
  ArrowRight,
  User,
  LogOut,
  Building2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';


export const LandlordProfileScreen: React.FC = () => {
  const { setCurrentScreen, openPropertyDetail, activeRole, switchRole, logout, currentUser, properties } = useAuth();
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const reviews = [
    {
      id: 'rev_1',
      author: 'Sarah J.',
      role: 'Tenant for 2 years',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      text: '"Marcus is the most responsive landlord I\'ve ever had. Any repairs were handled within 2 hours, and deposit escrow release was completely automated."',
      rating: 5,
    },
    {
      id: 'rev_2',
      author: 'David K.',
      role: 'Tenant for 1.5 years',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      text: '"Fair, professional and transparent escrow verification. Quiet premises, impeccably kept properties, and zero lease ambiguities."',
      rating: 5,
    },
    {
      id: 'rev_3',
      author: 'Chloe M.',
      role: 'Tenant for 3 years',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: '"The verified digital check-in and instantaneous utility escrow made moving in painless. Highly recommend any property hosted by Marcus."',
      rating: 5,
    },
  ];

  const handleNextReview = () => {
    setFeedbackIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setFeedbackIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setShowMessageModal(false);
      setMessageText('');
    }, 1500);
  };

  const handleShare = () => {
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2000);
  };

  return (
    <div
      id="landlord-profile-screen"
      className="w-full max-w-md mx-auto space-y-6 pb-6 select-none"
    >
      {/* Scrollable Main Profile Content */}
      <div className="flex-1 space-y-6">
        {/* Centered Identity Lockup matching image 2 */}
        <div className="flex flex-col items-center text-center space-y-2 pt-1">
          {/* Centered Profile Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-emerald-500/20 mb-2">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
              alt="Marcus Sterling"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Verified Green Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d9488] dark:bg-teal-600 text-white text-xs font-bold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Verified</span>
          </div>

          {/* Landlord Name */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            {currentUser?.fullName || 'Landlord'}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Member for 4 years &bull;{' '}
            <span className="text-[#0d9488] dark:text-teal-400 font-bold">
              Premier Host
            </span>
          </p>
        </div>

        {/* 1. Rental Reputation Dark Card matching image 2 */}
        <div className="p-5 rounded-2xl bg-[#0b1322] dark:bg-slate-900 text-white shadow-md relative overflow-hidden border border-slate-800 space-y-2">
          {/* Subtle starry background dots */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-30 pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-semibold text-slate-300">
              Rental Reputation
            </span>
            {/* 5 Filled Stars */}
            <div className="flex items-center gap-1 text-teal-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
              ))}
            </div>
          </div>

          <div className="flex items-baseline justify-between pt-1 relative z-10">
            <div>
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                942
              </span>
              <span className="text-sm font-bold text-slate-400 ml-1">
                / 1000
              </span>
            </div>

            {/* Top 1% Pill Badge */}
            <span className="px-2.5 py-1 rounded-md bg-[#0d9488]/30 border border-[#0d9488]/60 text-teal-300 text-xs font-black">
              Top 1%
            </span>
          </div>
        </div>

        {/* 2. Side-by-Side Dual Metrics matching image 2 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Total Rentals */}
          <div className="p-4 rounded-2xl bg-[#F0F5FF] dark:bg-slate-900/90 border border-transparent dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0d9488] dark:text-teal-400">
              <Home className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white block leading-tight">
                12
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total Rentals
              </span>
            </div>
          </div>

          {/* Response Rate */}
          <div className="p-4 rounded-2xl bg-[#F0F5FF] dark:bg-slate-900/90 border border-transparent dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0d9488] dark:text-teal-400">
              <Zap className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white block leading-tight">
                98%
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Response Rate
              </span>
            </div>
          </div>
        </div>

        {/* 3. About {currentUser?.fullName?.split(' ')[0] || 'Landlord'} Section matching image 2 */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
            About {currentUser?.fullName?.split(' ')[0] || 'Landlord'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Committed to providing high-quality urban living spaces with a focus on modern design and tenant comfort. My philosophy is built on clear communication and proactive maintenance to ensure a seamless living experience for every resident.
          </p>
        </div>

        {/* 4. Active Listings Section matching image 2 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
              Active Listings
            </h3>
            <button
              type="button"
              onClick={() => setCurrentScreen('guest-home')}
              className="text-xs sm:text-sm font-semibold text-[#0d9488] dark:text-teal-400 hover:underline cursor-pointer"
            >
              View all (3)
            </button>
          </div>

          {/* 2 Horizontal Listing Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1: The Skylark Loft */}
            <div
              onClick={() => {
                if (properties[0]) openPropertyDetail(properties[0]);
              }}
              className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs cursor-pointer group hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="relative h-24 sm:h-28 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=80"
                  alt="The Skylark Loft"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-white/95 dark:bg-slate-900/90 text-slate-950 dark:text-white text-[11px] font-black shadow-xs">
                  ₹24,500
                </span>
              </div>
              <div className="p-2.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  The Skylark Loft
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Downtown, NY
                </p>
              </div>
            </div>

            {/* Card 2: Hudson Garden Ste. */}
            <div
              onClick={() => {
                if (properties[1] || properties[0]) openPropertyDetail(properties[1] || properties[0]);
              }}
              className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs cursor-pointer group hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="relative h-24 sm:h-28 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=80"
                  alt="Hudson Garden Ste."
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-white/95 dark:bg-slate-900/90 text-slate-950 dark:text-white text-[11px] font-black shadow-xs">
                  ₹31,000
                </span>
              </div>
              <div className="p-2.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  Hudson Garden Ste.
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Greenwich, NY
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Trust Timeline Section matching image 2 */}
        <div className="space-y-3 pt-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
            Trust Timeline
          </h3>

          <div className="space-y-3">
            {/* Timeline Item 1 */}
            <div className="p-4 rounded-2xl bg-[#F0F5FF] dark:bg-slate-900 border-l-4 border-[#0d9488] shadow-xs space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Verified Lease Completion
                </h4>
                <span className="px-2 py-0.5 rounded-md bg-[#7ae2d5] dark:bg-teal-700/80 text-[#042f2e] dark:text-white text-[10px] font-black uppercase">
                  FLAWLESS EXIT
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Park Avenue Residence &bull; Oct 2023
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="p-4 rounded-2xl bg-[#F0F5FF] dark:bg-slate-900 border-l-4 border-[#0d9488] shadow-xs space-y-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Reputation Milestone: 900+
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                User Reliability Award &bull; May 2023
              </p>
              <p className="text-xs italic text-slate-600 dark:text-slate-300 pt-0.5">
                &ldquo;Marcus has maintained a 100% security deposit return rate over 3 years.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* 6. Resident Feedback Section with Carousel matching image 2 */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
              Resident Feedback
            </h3>
            {/* Navigation Arrows < > */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevReview}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextReview}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feedback Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reviews.slice(feedbackIndex, feedbackIndex + 2).map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {rev.author}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {rev.role}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Role Switcher Section (Production Role Switcher) */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 border border-teal-200/80 dark:border-teal-800/60 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Tenant & Renter Portal
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Search properties, submit applications & verify escrow
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => switchRole('tenant')}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Switch to Tenant Mode</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Actions: Message & Sign Out */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => setShowMessageModal(true)}
            className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-800"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Direct Message to {currentUser?.fullName?.split(' ')[0] || 'Landlord'}</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full py-3 rounded-2xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of {currentUser?.fullName || 'Account'}</span>
          </button>
        </div>
      </div>

      {/* Message Landlord Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMessageModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Direct Inquiry to {currentUser?.fullName?.split(' ')[0] || 'Landlord'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {messageSent ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Inquiry Dispatched!
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentUser?.fullName?.split(' ')[0] || 'Landlord'} usually responds within 20 minutes (98% response rate).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Submit your question regarding lease flexibility, viewing slots, or deposit terms.
                  </p>
                  <textarea
                    required
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Hi Marcus, I'm interested in viewing The Skylark Loft this weekend..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Lock className="w-3 h-3" /> End-to-end encrypted
                    </span>
                    <span>Average reply: 20 mins</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-black dark:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-900"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Verified Inquiry</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
