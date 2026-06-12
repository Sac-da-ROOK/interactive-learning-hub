import React from 'react';
import { ShieldCheck, Server } from 'lucide-react';

export default function SecurityShieldGuard() {
  return (
    <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <ShieldCheck size={16} className="text-emerald-600 fill-emerald-100" />
        <div>
          <h4 className="text-xs font-black text-emerald-900">Evaluation Guard Active</h4>
          <p className="text-[10px] text-emerald-600 font-medium leading-tight">Runtime execution pathways are isolated inside local functional context sandboxes.</p>
        </div>
      </div>
      <span className="font-mono text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-lg shrink-0 uppercase tracking-wider">Secure Node</span>
    </div>
  );
}