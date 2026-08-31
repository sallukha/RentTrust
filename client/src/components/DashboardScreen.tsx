import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  User,
  Building,
  Building2,
  Clock,
  ClipboardList,
  ChevronDown,
  Plus,
  Star,
  CheckCircle2,
  X,
  ShieldCheck,
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  SlidersHorizontal,
  LayoutGrid,
  MessageSquare,
  Settings,
  ArrowRight,
  TrendingUp,
  Loader,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { BackendInvoice, BackendLease } from '../api';

type PendingRequestStatus = 'pending' | 'approved' | 'declined';

type PendingRequest = {
  id: string;
  name: string;
  avatar: string;
  property: string;
  leaseTerm: string;
  rep: number;
  salary: string;
  creditScore: number;
  employment: string;
  status: PendingRequestStatus;
};

export const DashboardScreen: React.FC = () => {
  const { currentUser, setCurrentScreen } = useAuth();
  const [selectedTimeRange, setSelectedTimeRange] = useState<'Last 6 Months' | 'Last 3 Months' | 'Year to Date'>('Last 6 Months');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'chat' | 'settings'>('dashboard');

  // Dashboard Data State
  const [leases, setLeases] = useState<BackendLease[]>([]);
  const [invoices, setInvoices] = useState<BackendInvoice[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    let mounted = true;

    const loadDashboardData = async () => {
      setIsDataLoading(true);

      try {
        const [leaseResult, invoiceResult, propertyResult, requestResult] = await Promise.all([
          apiService.fetchMyLeases(),
          apiService.fetchMyInvoices(),
          apiService.fetchLandlordProperties(currentUser.id),
          apiService.fetchLandlordRentRequests()
        ]);

        if (!mounted) return;

        setLeases(leaseResult || []);
        setInvoices(invoiceResult || []);
        setProperties(propertyResult.properties || []);

        // Map backend requests to UI type
        const mappedRequests: PendingRequest[] = (requestResult || []).map(req => {
          // Extract property title if it's an object, otherwise use a string
          let propTitle = 'Property';
          if (req.propertyId && typeof req.propertyId === 'object' && 'title' in req.propertyId) {
            propTitle = (req.propertyId as any).title;
          } else if (typeof req.propertyId === 'string') {
            propTitle = req.propertyId;
          }

          return {
            id: req.id || req._id || '',
            name: req.occupation || 'Applicant',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            property: propTitle,
            leaseTerm: `${req.durationMonths || 12} mo`,
            rep: 4.5,
            salary: `₹${(req.monthlyIncome || 0).toLocaleString('en-IN')} / mo`,
            creditScore: 750,
            employment: req.organization || 'Independent',
            status: req.status === 'rejected' ? 'declined' : (req.status as any) || 'pending',
          };
        });
        setPendingRequests(mappedRequests);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        if (mounted) {
          setLeases([]);
          setInvoices([]);
          setProperties([]);
          setPendingRequests([]);
        }
      } finally {
        if (mounted) {
          setIsDataLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, [currentUser]);

  const activeLeaseCount = leases.filter((lease) => lease.status === 'active').length;
  const payableInvoiceCount = invoices.filter((invoice) => invoice.status === 'unpaid' || invoice.status === 'overdue').length;
  const activeMonthlyRevenue = invoices.reduce((sum, invoice) => sum + (invoice.amountDue || 0), 0);
  const recentLeaseInvoiceItems = [
    ...leases.slice(0, 2).map((lease) => ({
      title: `Lease ${lease.status || 'draft'}`,
      detail: lease.propertyId ? `Property ${lease.propertyId}` : 'Property reference',
      amount: lease.monthlyRent ? `₹${lease.monthlyRent}` : '—',
    })),
    ...invoices.slice(0, 2).map((invoice) => ({
      title: `Invoice ${invoice.invoiceNumber || 'draft'}`,
      detail: invoice.status || 'unpaid',
      amount: invoice.amountDue ? `₹${invoice.amountDue}` : '—',
    })),
  ].slice(0, 4);

  // Modal states
  const [reviewingApplicant, setReviewingApplicant] = useState<PendingRequest | null>(null);
  const [showListModal, setShowListModal] = useState(false);
  const [newPropertyTitle, setNewPropertyTitle] = useState('');
  const [newPropertyPrice, setNewPropertyPrice] = useState('');
  const [newPropertyLocation, setNewPropertyLocation] = useState('');
  const [propertyListedSuccess, setPropertyListedSuccess] = useState(false);

  const handleApproveApplicant = async (id: string) => {
    try {
      await apiService.updateLandlordRentRequestStatus(id, 'approved');
      setPendingRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: 'approved' } : req))
      );
    } catch (error) {
      console.error('Failed to approve applicant:', error);
    }
    setReviewingApplicant(null);
  };

  const handleDeclineApplicant = async (id: string) => {
    try {
      await apiService.updateLandlordRentRequestStatus(id, 'rejected');
      setPendingRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: 'declined' } : req))
      );
    } catch (error) {
      console.error('Failed to decline applicant:', error);
    }
    setReviewingApplicant(null);
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    setPropertyListedSuccess(true);
    setTimeout(() => {
      setPropertyListedSuccess(false);
      setShowListModal(false);
      setNewPropertyTitle('');
      setNewPropertyPrice('');
      setNewPropertyLocation('');
    }, 1500);
  };

  return (
    <div
      id="landlord-dashboard-screen"
      className="w-full max-w-md mx-auto space-y-5 pb-6 select-none"
    >
      {/* Scrollable Main Area */}
      <div className="flex-1 space-y-5">
        <div className="space-y-1">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            WELCOME BACK
          </p>
          <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-slate-950 dark:text-white">
            Good Morning, {currentUser?.fullName?.split(' ')[0] || 'User'}
          </h2>
        </div>

        {/* 1. Active Rentals Large Dark Card matching image 1 */}
        <div className="p-5 rounded-2xl bg-[#1e2738] dark:bg-slate-900 text-white shadow-md relative overflow-hidden flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-300 block mb-1">
              Active Rentals
            </span>
            <span className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
              {isDataLoading ? '…' : properties.length}
            </span>
          </div>

          {/* Right illustration & badge */}
          <div className="flex flex-col items-end gap-2">
            <Building2 className="w-12 h-12 text-slate-500/40" />
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-700/70 text-slate-300 border border-slate-600/40">
              +2 this month
            </span>
          </div>
        </div>

        {/* 2. Side-by-Side Light Metric Cards matching image 1 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: New Requests */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
              <ClipboardList className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">
                Active Leases
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                {isDataLoading ? '…' : activeLeaseCount}
              </span>
            </div>
          </div>

          {/* Card 2: Properties */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Building className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">
                Unpaid Invoices
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                {isDataLoading ? '…' : payableInvoiceCount}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentScreen('lease-billing')}
          className="block w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs text-left transition hover:border-emerald-200 dark:hover:border-emerald-800"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Lease & Billing
              </p>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Live portfolio snapshot
              </h3>
            </div>
            <div className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              ₹{isDataLoading ? '…' : activeMonthlyRevenue.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="space-y-2.5">
            {recentLeaseInvoiceItems.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No leases or invoices loaded yet.
              </p>
            ) : (
              recentLeaseInvoiceItems.map((item, index) => (
                <div key={`${item.title}-${index}`} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 px-3 py-2">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.detail}</p>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{item.amount}</span>
                </div>
              ))
            )}
          </div>
        </button>

        {/* 3. Occupancy Rate Bar Chart Card matching image 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs space-y-4">
          {/* Header & Time Filter dropdown */}
          <div className="flex items-center justify-between relative">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white tracking-tight">
              Occupancy Rate
            </h3>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <span>{selectedTimeRange}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showTimeDropdown && (
                <div className="absolute right-0 top-6 z-20 w-36 py-1 rounded-xl bg-white dark:bg-slate-850 shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-medium">
                  {(['Last 6 Months', 'Last 3 Months', 'Year to Date'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedTimeRange(opt);
                        setShowTimeDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${
                        selectedTimeRange === opt ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bar Chart matching image 1 */}
          <div className="pt-6 pb-2">
            <div className="flex items-end justify-between h-36 px-2">
              {/* JAN */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-9 sm:w-11 h-16 rounded-md bg-[#e2e8f0] dark:bg-slate-800 transition-all hover:bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">JAN</span>
              </div>

              {/* FEB */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-9 sm:w-11 h-24 rounded-md bg-[#e2e8f0] dark:bg-slate-800 transition-all hover:bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">FEB</span>
              </div>

              {/* MAR */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-9 sm:w-11 h-20 rounded-md bg-[#e2e8f0] dark:bg-slate-800 transition-all hover:bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">MAR</span>
              </div>

              {/* APR */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-9 sm:w-11 h-28 rounded-md bg-[#e2e8f0] dark:bg-slate-800 transition-all hover:bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">APR</span>
              </div>

              {/* MAY - HIGHLIGHTED ACTIVE BAR WITH 92% TOOLTIP */}
              <div className="flex flex-col items-center gap-2 flex-1 relative">
                {/* 92% Badge Tooltip */}
                <div className="absolute -top-7 z-10 flex flex-col items-center">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950 text-white text-[10px] font-black shadow-xs">
                    92%
                  </span>
                  <div className="w-1.5 h-1.5 bg-slate-950 rotate-45 -mt-1" />
                </div>
                {/* Dark Black Bar */}
                <div className="w-9 sm:w-11 h-32 rounded-md bg-slate-950 dark:bg-emerald-500 shadow-sm" />
                <span className="text-[10px] font-black text-slate-950 dark:text-white">MAY</span>
              </div>

              {/* JUN */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-9 sm:w-11 h-28 rounded-md bg-[#e2e8f0] dark:bg-slate-800 transition-all hover:bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">JUN</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Pending Requests Section matching image 1 */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white tracking-tight">
              Pending Requests
            </h3>
            <button
              type="button"
              onClick={() => setCurrentScreen('landlord-profile')}
              className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white cursor-pointer"
            >
              View All
            </button>
          </div>

          {/* List of Requests */}
          <div className="space-y-2.5">
            {pendingRequests.length === 0 ? (
              <p className="text-xs text-center py-6 text-slate-500 italic">No pending requests at the moment.</p>
            ) : (
              pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  {/* Avatar with circular black star badge */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={req.avatar}
                      alt={req.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-slate-950 text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {req.name}
                      </h4>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {req.rep} Rep
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {req.property} &bull; {req.leaseTerm}
                    </p>
                  </div>

                  {/* Review button matching image 1 */}
                  <button
                    type="button"
                    id={`review-btn-${req.id}`}
                    onClick={() => setReviewingApplicant(req)}
                    className="py-1.5 px-4 rounded-xl bg-[#E0EBFF] dark:bg-slate-800 hover:bg-[#D4E4FC] dark:hover:bg-slate-700 text-[#1E3A8A] dark:text-blue-300 text-xs font-bold transition-colors cursor-pointer flex-shrink-0"
                  >
                    {req.status === 'approved' ? 'Approved' : req.status === 'declined' ? 'Declined' : 'Review'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button: [+ 🏢 List New Property] matching image 1 */}
      <div className="absolute inset-x-5 bottom-16 z-30 pointer-events-auto flex justify-center">
        <motion.button
          type="button"
          id="btn-list-new-property"
          onClick={() => setCurrentScreen('list-property')}
          whileTap={{ scale: 0.96 }}
          className="py-3 px-6 rounded-2xl bg-[#0e1626] dark:bg-slate-850 hover:bg-slate-900 dark:hover:bg-slate-750 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 border border-slate-700/60 cursor-pointer"
        >
          <Building className="w-4 h-4 text-white" />
          <span>List New Property (8-Step Wizard)</span>
        </motion.button>
      </div>

      {/* Interactive Review Applicant Modal */}
      <AnimatePresence>
        {reviewingApplicant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewingApplicant(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Applicant Trust Dossier
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setReviewingApplicant(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <img
                  src={reviewingApplicant.avatar}
                  alt={reviewingApplicant.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {reviewingApplicant.name}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                    <span>{reviewingApplicant.rep} Reputation Score &bull; Verified Renter</span>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Target: {reviewingApplicant.property} ({reviewingApplicant.leaseTerm})
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                    Verified Income
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {reviewingApplicant.salary}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                    Credit Passport
                  </span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {reviewingApplicant.creditScore} (Excellent)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                  Employer Verification
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {reviewingApplicant.employment}
                </span>
              </div>

              {reviewingApplicant.status === 'approved' ? (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs text-center">
                  ✓ Application Approved
                </div>
              ) : reviewingApplicant.status === 'declined' ? (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 font-bold text-xs text-center">
                  ✕ Application Declined
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleDeclineApplicant(reviewingApplicant.id)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApproveApplicant(reviewingApplicant.id)}
                    className="flex-1 py-3 rounded-xl bg-slate-950 dark:bg-emerald-600 hover:bg-slate-850 dark:hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Approve Lease & Escrow
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* List New Property Modal */}
      <AnimatePresence>
        {showListModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowListModal(false)}
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
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    List New Verified Property
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowListModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {propertyListedSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Property Listed Successfully!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Deed verification passed. Property is now live on RentalTrust.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreateListing} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Property Name / Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Skyline Penthouse Suite"
                      value={newPropertyTitle}
                      onChange={(e) => setNewPropertyTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Monthly Rent (₹)
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="3200"
                        value={newPropertyPrice}
                        onChange={(e) => setNewPropertyPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Location / City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Tribeca, NY"
                        value={newPropertyLocation}
                        onChange={(e) => setNewPropertyLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
                    <span className="font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Automatic Deed Cross-Check
                    </span>
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                      All new listings undergo instant municipal title verification and FDIC escrow guarantee attachment.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-950 dark:bg-emerald-600 hover:bg-slate-850 dark:hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Publish Verified Listing
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Loading Overlay */}
      {isDataLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            <Loader className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
            <p className="text-xs font-bold mt-2 text-slate-600 dark:text-slate-400">Updating Dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};
