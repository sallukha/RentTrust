import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  MessageSquare,
  Building,
  Check,
  X,
  Send,
  Sparkles,
  FileCheck,
  Calendar,
  DollarSign,
  Star,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';

export const LandlordApplicantDossier: React.FC = () => {
  const {
    selectedRentRequest,
    setCurrentScreen,
    switchRole,
  } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showApprovalSuccess, setShowApprovalSuccess] = useState(false);

  const tenantName =
    (typeof selectedRentRequest?.tenantId === 'object' && selectedRentRequest.tenantId && 'name' in selectedRentRequest.tenantId
      ? (selectedRentRequest.tenantId as any).name
      : selectedRentRequest?.occupation) || 'Applicant';
  const tenantEmail =
    (typeof selectedRentRequest?.tenantId === 'object' && selectedRentRequest.tenantId && 'email' in selectedRentRequest.tenantId
      ? (selectedRentRequest.tenantId as any).email
      : '') || '';
  const propertyTitle =
    (typeof selectedRentRequest?.propertyId === 'object' && selectedRentRequest.propertyId && 'title' in selectedRentRequest.propertyId
      ? (selectedRentRequest.propertyId as any).title
      : 'Property') || 'Property';

  const moveInStr = selectedRentRequest?.moveInDate
    ? new Date(selectedRentRequest.moveInDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    : 'N/A';

  const formattedIncome = selectedRentRequest?.monthlyIncome
    ? `₹${Number(selectedRentRequest.monthlyIncome).toLocaleString('en-IN')} / mo`
    : 'Income on file';

  const handleApprove = async () => {
    if (!selectedRentRequest) return;
    const reqId = String(selectedRentRequest._id || selectedRentRequest.id);
    setIsProcessing(true);
    try {
      await apiService.updateLandlordRentRequestStatus(reqId, 'approved');
      setIsProcessing(false);
      setShowApprovalSuccess(true);
    } catch (err) {
      console.error('Failed to approve application:', err);
      setIsProcessing(false);
    }
  };

  const handleDecline = async () => {
    if (!selectedRentRequest) return;
    const reqId = String(selectedRentRequest._id || selectedRentRequest.id);
    try {
      await apiService.updateLandlordRentRequestStatus(reqId, 'rejected');
      setCurrentScreen('landlord-requests-queue');
    } catch (err) {
      console.error('Failed to decline application:', err);
    }
  };

  if (!selectedRentRequest) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center space-y-4">
        <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
          No applicant request selected for review.
        </p>
        <button
          type="button"
          onClick={() => setCurrentScreen('landlord-requests-queue')}
          className="py-2.5 px-4 rounded-xl bg-slate-950 dark:bg-teal-600 text-white font-bold text-xs"
        >
          Return to Applicants Queue
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between pb-6">
      <div>
        {/* Top Header */}
        <div className="px-4 pt-3 pb-2 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentScreen('landlord-requests-queue')}
              className="p-1.5 -ml-1.5 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-extrabold border border-teal-200 dark:border-teal-800">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Verified Dossier</span>
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4 max-w-lg mx-auto">
          {/* Applicant Header Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt={tenantName}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center border-2 border-white dark:border-slate-850 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-0.5">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {tenantName}
                </h2>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {selectedRentRequest.occupation || 'Professional'} {selectedRentRequest.currentCity ? `• ${selectedRentRequest.currentCity}` : ''}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">
                    {selectedRentRequest.organization || 'Independent'} &bull; {formattedIncome}
                  </span>
                </div>
              </div>
            </div>

            {/* Score pill */}
            <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-teal-900 dark:text-teal-200 uppercase tracking-wider block">
                  VERIFIED APPLICATION
                </span>
                <span className="text-2xl font-black text-teal-700 dark:text-teal-300">
                  942 <span className="text-xs font-bold text-teal-600/70">/ 1000 Score</span>
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-600 text-white text-[11px] font-extrabold shadow-sm capitalize">
                {selectedRentRequest.status || 'Pending'}
              </span>
            </div>
          </div>

          {/* Real Application Details Grid */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-teal-600" />
              <span>Rental Request Details</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">Target Property</span>
                <span className="font-bold text-slate-900 dark:text-white truncate block">{propertyTitle}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">Monthly Income</span>
                <span className="font-bold text-slate-900 dark:text-white block">{formattedIncome}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">Proposed Move-In</span>
                <span className="font-bold text-slate-900 dark:text-white block">{moveInStr}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">Lease Duration</span>
                <span className="font-bold text-slate-900 dark:text-white block">{selectedRentRequest.durationMonths || 12} Months</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">Family / Tenant Type</span>
                <span className="font-bold text-teal-600 dark:text-teal-400 block">{selectedRentRequest.familyType || 'BACHELOR'}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">Occupants</span>
                <span className="font-bold text-slate-900 dark:text-white block">{selectedRentRequest.occupants || 1} Person(s)</span>
              </div>
            </div>

            {selectedRentRequest.message && (
              <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 space-y-1">
                <span className="text-[10px] font-bold text-teal-800 dark:text-teal-300 uppercase">Tenant Message</span>
                <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                  “{selectedRentRequest.message}”
                </p>
              </div>
            )}
          </div>

          {/* Uploaded Documents Section */}
          {(selectedRentRequest.frontDocumentUrl || selectedRentRequest.backDocumentUrl || selectedRentRequest.paystubUrl) && (
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                <span>Uploaded Documents (Cloudinary Vault)</span>
              </h3>

              <div className="space-y-2">
                {selectedRentRequest.frontDocumentUrl && (
                  <a
                    href={selectedRentRequest.frontDocumentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-between hover:border-teal-500 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Front ID Document</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                  </a>
                )}

                {selectedRentRequest.backDocumentUrl && (
                  <a
                    href={selectedRentRequest.backDocumentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-between hover:border-teal-500 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Back ID Document</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                  </a>
                )}

                {selectedRentRequest.paystubUrl && (
                  <a
                    href={selectedRentRequest.paystubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-sky-50/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-between hover:border-teal-500 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Paystub / Proof of Income</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto w-full">
        {showApprovalSuccess || selectedRentRequest.status === 'approved' ? (
          <div className="space-y-2 text-center">
            <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-bold">
              ✓ {tenantName}'s application is approved!
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrentScreen('chat-hub')}
                className="py-2.5 rounded-xl bg-slate-950 dark:bg-slate-800 text-white text-xs font-bold cursor-pointer"
              >
                Open Messages
              </button>
              <button
                type="button"
                onClick={() => setCurrentScreen('landlord-requests-queue')}
                className="py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold cursor-pointer"
              >
                Back to Applicants &rarr;
              </button>
            </div>
          </div>
        ) : selectedRentRequest.status === 'rejected' || selectedRentRequest.status === 'declined' ? (
          <div className="space-y-2 text-center">
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold">
              ✕ {tenantName}'s application has been declined.
            </div>
            <button
              type="button"
              onClick={() => setCurrentScreen('landlord-requests-queue')}
              className="w-full py-2.5 rounded-xl bg-slate-950 dark:bg-slate-800 text-white text-xs font-bold cursor-pointer"
            >
              Back to Applicants Queue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDecline}
              className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <X className="w-4 h-4 text-slate-500" />
              <span>Decline</span>
            </button>

            <button
              type="button"
              onClick={handleApprove}
              disabled={isProcessing}
              className="py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-850 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isProcessing ? (
                <span>Approving...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Approve Request</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
