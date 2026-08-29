import React from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  CheckCircle2,
  User,
  LogIn,
  UserPlus,
  Bookmark,
  Building,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PROPERTY_LISTINGS } from '../../data/properties';
import { GuestTopHeader } from './GuestTopHeader';

export const GuestChatView: React.FC = () => {
  const { setCurrentScreen, openPropertyDetail } = useAuth();

  return (
    <div className="space-y-4 pb-2">
      <GuestTopHeader title="Guest Messages" />

      <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Connect with Landlords & Hosts
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Sign in to start conversations, ask about lease terms, or request video tours.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentScreen('login')}
          className="py-2.5 px-6 rounded-xl bg-slate-950 dark:bg-teal-600 hover:bg-slate-850 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In to Chat</span>
        </button>
      </div>

      {/* Suggested Inquiries */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Quick Inquiries
        </h4>
        <div className="space-y-2">
          {PROPERTY_LISTINGS.slice(0, 2).map((prop) => (
            <div
              key={prop.id}
              onClick={() => openPropertyDetail(prop)}
              className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-teal-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={prop.host.avatar}
                  alt={prop.host.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {prop.host.name} &bull; {prop.shortTitle}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    "Available for move-in next month?"
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const GuestRequestsView: React.FC = () => {
  const { setCurrentScreen, savedPropertyIds, openPropertyDetail } = useAuth();

  const savedListings = PROPERTY_LISTINGS.filter((p) => savedPropertyIds.includes(p.id));

  return (
    <div className="space-y-4 pb-2">
      <GuestTopHeader title="My Requests & Trips" />

      {/* Saved Bookmarks Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Saved Stays & Rentals ({savedListings.length})</span>
          </h3>
        </div>

        {savedListings.length === 0 ? (
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 text-center text-xs text-slate-500">
            No saved listings yet. Tap the heart on any property to bookmark it!
          </div>
        ) : (
          <div className="space-y-2.5">
            {savedListings.map((prop) => (
              <div
                key={prop.id}
                onClick={() => openPropertyDetail(prop)}
                className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 cursor-pointer hover:shadow-xs transition-all"
              >
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {prop.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {prop.location}
                  </p>
                  <p className="text-xs font-black text-teal-600 dark:text-teal-400 mt-0.5">
                    {prop.price} {prop.priceUnit}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Application Status prompt */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-850 dark:to-slate-800 border border-teal-100 dark:border-slate-700 space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-teal-900 dark:text-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Active Applications & Lease Inquiries</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Sign in to submit tenant screening requests, track background verification, and sign digital leases.
        </p>
        <button
          type="button"
          onClick={() => setCurrentScreen('login')}
          className="w-full py-2.5 rounded-xl bg-[#0e1628] dark:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Log In to View Lease Status</span>
        </button>
      </div>
    </div>
  );
};

export const GuestProfileView: React.FC = () => {
  const { setCurrentScreen, currentUser, isGuestSession } = useAuth();

  return (
    <div className="space-y-4 pb-2">
      <GuestTopHeader title="Guest Profile" />

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-center space-y-3 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto text-xl font-black">
          G
        </div>
        <div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Guest Explorer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Viewing verified listings & curated stays
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => setCurrentScreen('login')}
            className="flex-1 py-3 rounded-2xl bg-[#0e1628] dark:bg-teal-600 hover:bg-[#16233f] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentScreen('register')}
            className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>
        </div>
      </div>

      {/* Guest Preferences */}
      <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-850/80 border border-slate-200/70 dark:border-slate-800 space-y-2 text-xs">
        <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-800">
          <span className="text-slate-600 dark:text-slate-400">Currency</span>
          <span className="font-bold text-slate-900 dark:text-white">USD ($)</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-800">
          <span className="text-slate-600 dark:text-slate-400">Language</span>
          <span className="font-bold text-slate-900 dark:text-white">English (US)</span>
        </div>
        <div className="flex justify-between py-1.5">
          <span className="text-slate-600 dark:text-slate-400">Security Escrow</span>
          <span className="font-bold text-teal-600 dark:text-teal-400">Active</span>
        </div>
      </div>
    </div>
  );
};
