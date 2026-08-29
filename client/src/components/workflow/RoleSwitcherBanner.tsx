import React from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck, ArrowLeftRight, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RoleSwitcherBanner: React.FC = () => {
  const { activeRole, switchRole, rentalApplication } = useAuth();

  return (
    <div className="bg-slate-900 text-white px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-xs select-none">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-slate-200">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Active Role:</span>
        </div>
        
        <div className="inline-flex p-0.5 rounded-lg bg-slate-800 border border-slate-700">
          <button
            type="button"
            onClick={() => switchRole('tenant')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 ${
              activeRole === 'tenant'
                ? 'bg-teal-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Tenant (Alex • 942)</span>
          </button>

          <button
            type="button"
            onClick={() => switchRole('landlord')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1.5 ${
              activeRole === 'landlord'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>Landlord (Marcus)</span>
          </button>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1 text-teal-300 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Status: {rentalApplication.status.toUpperCase()}</span>
        </span>
      </div>
    </div>
  );
};
