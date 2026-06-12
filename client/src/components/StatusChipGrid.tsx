import React from 'react';
import { ShieldCheck, RefreshCw, Radio } from 'lucide-react';

export default function StatusChipGrid() {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm flex flex-wrap gap-2 items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Radio size={12} className="text-indigo-500 animate-pulse" />
        <span className="text-[11px] font-black text-gray-900 uppercase tracking-tight">System Node Registers</span>
      </div>

      <div className="flex gap-1.5">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[10px] font-black text-emerald-700">
          <ShieldCheck size={10} fill="currentColor" className="text-emerald-100" /> Database Live
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 border border-indigo-200 rounded-lg text-[10px] font-black text-indigo-700">
          <RefreshCw size={10} className="animate-spin" /> Compiler Ready
        </span>
      </div>
    </div>
  );
}