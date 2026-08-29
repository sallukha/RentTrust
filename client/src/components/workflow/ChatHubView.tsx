import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  ShieldCheck,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  User,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ChatHubView: React.FC = () => {
  const {
    conversations,
    setActiveConversationId,
    setCurrentScreen,
    activeRole,
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'properties' | 'archive'>('all');

  const filteredConversations = conversations.filter((c) => {
    if (activeTab === 'unread' && !c.unread) return false;
    if (activeTab === 'properties' && c.category !== 'Properties') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.participantName.toLowerCase().includes(q) ||
        c.propertyTitle.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-md mx-auto space-y-5 pb-6 select-none">
      <div>
        {/* Header */}
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Filter Tabs (Screen 12) */}
          <div className="flex items-center gap-2 pt-1 pb-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: 'Unread' },
              { id: 'properties', label: 'Properties' },
              { id: 'archive', label: 'Archive' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-950 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation List */}
        <div className="space-y-2.5">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => {
                setActiveConversationId(conv.id);
                setCurrentScreen('chat-conversation');
              }}
              className="p-3.5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-teal-500/50 transition-all flex items-start gap-3 cursor-pointer group"
            >
              <div className="relative shrink-0">
                <img
                  src={conv.participantAvatar}
                  alt={conv.participantName}
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-teal-500 text-white flex items-center justify-center border-2 border-white dark:border-slate-850">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </span>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                    {conv.participantName}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    {conv.timeAgo}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px] font-extrabold">
                    {conv.participantBadge}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 truncate">
                    &bull; {conv.propertyTitle}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                  {conv.lastMessage}
                </p>
              </div>

              {conv.unread && (
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0 mt-2" />
              )}
            </div>
          ))}

          {/* Footer Card (Screen 12) */}
          <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 text-center space-y-1 mt-4">
            <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 flex items-center justify-center mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs font-bold text-teal-900 dark:text-teal-200">
              Your trust-based network is growing
            </p>
            <p className="text-[11px] text-teal-700 dark:text-teal-400">
              3 verified landlord & host connections active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
