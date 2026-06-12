import React from 'react';
import { Calendar, Hourglass, ArrowUpRight } from 'lucide-react';

export default function ExamCountdownClock() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl flex items-center justify-center">
          <Calendar size={14} />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-100">AWS DevOps Credentials Deadline</h4>
          <p className="text-[10px] text-slate-400 font-medium">Target certification tracking roadmap timeline.</p>
        </div>
      </div>

      <div className="bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/60 font-mono text-center shrink-0">
        <span className="text-[10px] font-black text-indigo-400 flex items-center gap-0.5 justify-center"><Hourglass size={10} /> 14 Days</span>
      </div>
    </div>
  );
}