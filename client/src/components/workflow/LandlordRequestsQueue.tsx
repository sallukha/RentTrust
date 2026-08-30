import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Lock,
  User,
  MessageSquare,
  ArrowRight,
  Shield,
  LayoutGrid,
  Building,
  CheckSquare,
  X,
  Menu as MenuIcon,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { BackendRentRequest } from '../../api';

export const LandlordRequestsQueue: React.FC = () => {
  const { setCurrentScreen, rentalApplication } = useAuth();
  const [filter, setFilter] = useState<'all' | 'high_rep' | 'urgent'>('all');
  const [requests, setRequests] = useState<BackendRentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadRequests = async () => {
      try {
        const result = await apiService.fetchLandlordRentRequests();
        if (mounted) setRequests(result || []);
      } catch (error) {
        console.error('Failed to load landlord rent requests:', error);
        if (mounted) setRequests([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadRequests();
    return () => {
      mounted = false;
    };
  }, []);

  const visibleRequests = requests.filter((request) => {
    if (filter === 'all') return true;
    const rep = Number(request.monthlyIncome || 0) > 120000 ? 'high_rep' : 'urgent';
    return filter === rep;
  });

  const handleDecision = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await apiService.updateLandlordRentRequestStatus(id, status);
      setRequests((prev) => prev.map((request) => (request._id === id ? { ...request, status } : request)));
    } catch (error) {
      console.error('Failed to update landlord rent request status:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 pb-6 select-none">
      <div>
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isLoading ? 'Loading requests' : `${visibleRequests.length} New Requests`}
            </h1>

            <div className="px-3 py-1.5 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-white">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Avg. Score: 890</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 pt-1 pb-1 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                filter === 'all'
                  ? 'bg-slate-950 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              All Requests
            </button>
            <button
              type="button"
              onClick={() => setFilter('high_rep')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                filter === 'high_rep'
                  ? 'bg-slate-950 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              High Reputation
            </button>
            <button
              type="button"
              onClick={() => setFilter('urgent')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                filter === 'urgent'
                  ? 'bg-slate-950 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              Urgent
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="p-4 space-y-4 max-w-lg mx-auto">
          {isLoading ? (
            <div className="p-4 text-sm text-slate-500 dark:text-slate-400">Loading rent requests…</div>
          ) : visibleRequests.length === 0 ? (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">
              No requests are available for review yet.
            </div>
          ) : (
            visibleRequests.map((request) => {
              const tenantName =
                (typeof request.tenantId === 'object' && request.tenantId && 'name' in request.tenantId
                  ? (request.tenantId as any).name
                  : 'Applicant') || 'Applicant';
              const propertyTitle =
                (typeof request.propertyId === 'object' && request.propertyId && 'title' in request.propertyId
                  ? (request.propertyId as any).title
                  : 'Property') || 'Property';
              const moveIn = request.moveInDate ? new Date(request.moveInDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'Requested date';
              const annualIncome = request.monthlyIncome ? `$${Number(request.monthlyIncome).toLocaleString()}/mo` : 'Income on file';
              const statusChip = request.status === 'approved' ? 'Approved' : request.status === 'rejected' ? 'Rejected' : 'Pending';

              return (
                <div key={String(request._id || request.id || Math.random())} className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3.5 hover:border-teal-500/50 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                          alt={tenantName}
                          className="w-12 h-12 rounded-2xl object-cover"
                        />
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center border-2 border-white dark:border-slate-850 shadow-sm">
                          <ShieldCheck className="w-3 h-3" />
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-base font-black text-slate-900 dark:text-white">
                          {tenantName}
                        </h3>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-sky-100 dark:border-slate-700">
                            {statusChip}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-sky-100 dark:border-slate-700">
                            Verified ID
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-teal-100/80 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 text-center shrink-0">
                      <p className="text-[9px] font-extrabold text-teal-800 dark:text-teal-300 tracking-wider">
                        INCOME
                      </p>
                      <p className="text-lg font-black text-teal-700 dark:text-teal-300">{request.monthlyIncome ? Math.round(Number(request.monthlyIncome) / 1000) : 0}k</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-sky-50/70 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        PROPERTY
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white truncate block">
                        {propertyTitle}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        ANNUAL INCOME
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {annualIncome}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        MOVE-IN DATE
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {moveIn}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        FAMILY TYPE
                      </span>
                      <span className="font-bold text-teal-700 dark:text-teal-400 block">
                        {request.familyType || 'BACHELOR'}
                      </span>
                    </div>
                  </div>

                  <div className="italic text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 pl-1">
                    <span className="text-lg font-serif text-slate-400 leading-none">“</span>
                    <p className="line-clamp-2">
                      {request.message || 'Looking for a stable rental home and long-term tenancy.'}
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setCurrentScreen('landlord-applicant-dossier')}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-xs shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Review & Respond</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecision(String(request._id || request.id), 'approved')}
                        className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDecision(String(request._id || request.id), 'rejected')}
                        className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div className="pt-2 text-center space-y-1">
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              All applicants are pre-screened for ID and Income verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
