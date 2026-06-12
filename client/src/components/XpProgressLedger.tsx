import React from 'react';
import { Star, ShieldCheck, Trophy } from 'lucide-react';

export default function XpProgressLedger() {
  const pointsCurrent = 740;
  const pointsTarget = 1000;
  const progressionRatio = Math.round((pointsCurrent / pointsTarget) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg flex items-center justify-center font-mono text-[11px] font-black">Lvl 4</div>
          <div>
            <h4 className="text-xs font-black text-gray-900 tracking-tight">System Rank Status</h4>
            <p className="text-[9px] text-gray-400 font-medium">Gather experience credentials by completing reference cards cleanly.</p>
          </div>
        </div>
        <span className="font-mono text-[10px] font-extrabold text-gray-400">{pointsCurrent} / {pointsTarget} XP</span>
      </div>

      <div className="space-y-1">
        <div className="w-full bg-slate-50 border border-slate-100 h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-500 rounded-full" style={{ width: `${progressionRatio}%` }} />
        </div>
        <p className="text-[9px] font-mono font-bold text-gray-400 text-right">Remaining to target upgrade: {pointsTarget - pointsCurrent} XP</p>
      </div>
    </div>
  );
}