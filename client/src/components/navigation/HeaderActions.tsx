import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HeaderActions: React.FC = () => {
  const {
    setCurrentScreen,
    activeRole,
    conversations,
    rentalApplication,
  } = useAuth();
  
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadMessagesCount = conversations.filter((c) => c.unread).length;
  const isPendingApplication = rentalApplication.status === 'submitted' || rentalApplication.status === 'shortlisted';

  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      {/* Notifications Icon with Badge */}
      <div className="relative" ref={notificationRef}>
        <button
          type="button"
          onClick={() => setIsNotificationOpen((prev) => !prev)}
          className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {(unreadMessagesCount > 0 || isPendingApplication) && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {isNotificationOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl p-3 z-50 text-xs space-y-2"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Notifications</span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">Live Escrow</span>
              </div>
              <div className="space-y-1.5 max-h-56 overflow-y-auto">
                {unreadMessagesCount > 0 && (
                  <div
                    onClick={() => {
                      setCurrentScreen('chat-hub');
                      setIsNotificationOpen(false);
                    }}
                    className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60 cursor-pointer hover:shadow-xs transition-all"
                  >
                    <p className="font-bold text-teal-900 dark:text-teal-200">
                      New message from {conversations.find(c => c.unread)?.participantName || 'Landlord'}
                    </p>
                    <p className="text-[11px] text-teal-700 dark:text-teal-400 truncate">
                      "I've sent the agreement for your review & signature."
                    </p>
                  </div>
                )}
                <div
                  onClick={() => {
                    if (activeRole === 'landlord') setCurrentScreen('landlord-requests-queue');
                    else setCurrentScreen('tenant-requests-tracker');
                    setIsNotificationOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750 transition-all"
                >
                  <p className="font-bold text-slate-900 dark:text-white">
                    Rental Application: {rentalApplication.propertyTitle}
                  </p>
                  <p className="text-[11px] text-slate-500 capitalize">
                    Status: {rentalApplication.status} &bull; Escrow Guaranteed
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
