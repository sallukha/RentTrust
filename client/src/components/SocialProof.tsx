import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle, Quote, X } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { FeaturedMember } from '../types';

export const SocialProof: React.FC = () => {
  const { statsData } = useRegistration();
  const [selectedMember, setSelectedMember] = useState<FeaturedMember | null>(null);

  // 3 curated avatars corresponding directly to the screenshot
  const defaultAvatars = [
    {
      id: 'mem_1',
      name: 'Elena Vance',
      role: 'Verified Tenant',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      quote: 'Found my dream apartment in Hayes Valley in under 3 days. The verified landlord badge gave me total confidence.',
      joinedYears: '2023',
    },
    {
      id: 'mem_2',
      name: 'Rajesh Mehta',
      role: 'Property Owner & Landlord',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
      quote: 'Zero vacancies for 2 straight years. Background checks and automated rent collection make management effortless.',
      joinedYears: '2022',
    },
    {
      id: 'mem_3',
      name: 'Lucas Graham',
      role: 'Verified Tenant',
      location: 'Brooklyn, NY',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      quote: 'Transparent lease terms, zero hidden agent fees, and instant verification. The gold standard for modern renting.',
      joinedYears: '2024',
    },
  ];

  const members = statsData?.featuredMembers?.length ? statsData.featuredMembers : defaultAvatars;
  const countText = statsData?.formattedCount ? `${statsData.formattedCount}` : '12,000+';

  return (
    <div className="pt-5 pb-2 flex flex-col items-center">
      {/* 3 Circular Avatar portraits matching the screenshot layout */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mb-3.5">
        {members.slice(0, 3).map((member, idx) => {
          // The center image in the screenshot has a distinctive pill/taller portrait crop
          const isCenter = idx === 1;

          return (
            <motion.button
              key={member.id || idx}
              type="button"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedMember(member)}
              aria-label={`View feedback from ${member.name}`}
              className={`relative overflow-hidden cursor-pointer shadow-md transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isCenter
                  ? 'w-[84px] h-[104px] sm:w-[96px] sm:h-[118px] rounded-[32px] ring-2 ring-blue-100 dark:ring-slate-700'
                  : 'w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] rounded-full ring-2 ring-slate-100 dark:ring-slate-800'
              }`}
            >
              <img
                src={member.avatar}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
                <span className="text-[10px] text-white font-medium drop-shadow">Review</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Social proof caption matching the screenshot */}
      <p className="text-[13px] sm:text-[14px] text-slate-700 dark:text-slate-300 text-center font-medium leading-relaxed max-w-[320px] sm:max-w-none">
        Join <span className="font-bold text-slate-900 dark:text-white">{countText}</span> verified users finding their peace of mind.
      </p>

      {/* Member Testimonial Popup Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close review"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {selectedMember.name}
                    </h4>
                    <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {selectedMember.role} • {selectedMember.location}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/50">
                <Quote className="w-5 h-5 text-blue-400/60 dark:text-blue-400/40 mb-1" />
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 italic">
                  "{selectedMember.quote}"
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
              >
                Close Story
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
