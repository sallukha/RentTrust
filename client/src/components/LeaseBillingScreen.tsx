import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  DollarSign,
  FileText,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { BackendInvoice, BackendLease } from '../api';

const formatDate = (value?: string | Date) => {
  if (!value) return '—';

  try {
    return new Date(value).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
};

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const LeaseBillingScreen: React.FC = () => {
  const { setCurrentScreen } = useAuth();
  const [leases, setLeases] = useState<BackendLease[]>([]);
  const [invoices, setInvoices] = useState<BackendInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setLoading(true);

      try {
        const [leaseResult, invoiceResult] = await Promise.all([
          apiService.fetchMyLeases(),
          apiService.fetchMyInvoices(),
        ]);

        if (!mounted) return;

        setLeases(leaseResult || []);
        setInvoices(invoiceResult || []);
      } catch (error) {
        console.error('Failed to load lease and invoice data for billing screen:', error);
        if (mounted) {
          setLeases([]);
          setInvoices([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    const activeLeases = leases.filter((lease) => lease.status === 'active');
    const pendingInvoices = invoices.filter((invoice) => invoice.status === 'unpaid' || invoice.status === 'overdue');
    const totalReceivables = invoices.reduce((sum, invoice) => sum + (invoice.amountDue || 0), 0);
    const monthlyRent = activeLeases.reduce((sum, lease) => sum + (lease.monthlyRent || 0), 0);

    return {
      activeLeases: activeLeases.length,
      outstandingInvoices: pendingInvoices.length,
      totalReceivables,
      monthlyRent,
    };
  }, [leases, invoices]);

  const statusClasses: Record<string, string> = {
    active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    pending_signatures: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
    draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    expired: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
    terminated: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
    unpaid: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
    paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    overdue: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
    cancelled: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5 pb-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentScreen('dashboard')}
          className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Dashboard
        </button>

        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          Secure billing
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Lease & Billing
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            Portfolio finance
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-teal-600 dark:text-teal-400">
              <FileText className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Active leases</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
              {loading ? '…' : summary.activeLeases}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Wallet className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Outstanding</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
              {loading ? '…' : summary.outstandingInvoices}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-900 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Monthly rent
              </p>
              <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                {loading ? '…' : formatCurrency(summary.monthlyRent)}
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 p-2 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-extrabold">Invoices</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              {loading ? '…' : formatCurrency(summary.totalReceivables)}
            </span>
          </div>

          <div className="space-y-2.5">
            {loading ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">Loading billing data…</p>
            ) : invoices.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">No invoices available yet.</p>
            ) : (
              invoices.slice(0, 4).map((invoice) => (
                <div key={invoice._id || invoice.id || invoice.invoiceNumber} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {invoice.invoiceNumber || 'Invoice'}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Due {formatDate(invoice.dueDate)}
                      </p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${statusClasses[invoice.status || 'unpaid']}`}>
                      {invoice.status || 'unpaid'}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Amount</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {formatCurrency(invoice.amountDue)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-extrabold">Leases</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              {leases.length} total
            </span>
          </div>

          <div className="space-y-2.5">
            {loading ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">Loading leases…</p>
            ) : leases.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">No lease records found.</p>
            ) : (
              leases.slice(0, 4).map((lease) => (
                <div key={lease._id || lease.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                        Property {lease.propertyId || 'reference'}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {formatDate(lease.startDate)} - {formatDate(lease.endDate)}
                      </p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${statusClasses[lease.status || 'draft']}`}>
                      {lease.status || 'draft'}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Rent</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {formatCurrency(lease.monthlyRent)} / month
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
