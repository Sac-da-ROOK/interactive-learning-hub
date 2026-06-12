import React from 'react';
import { Sparkles } from 'lucide-react';

export default function LinearTicker() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 flex items-center justify-between gap-4 shadow-3xs">
      <div className="flex items-center gap-1 font-mono text-[10px] font-black text-indigo-600 shrink-0">
        <Sparkles size={11} fill="currentColor" /> BONUS MULTIPLIER ACTIVE
      </div>
      <div className="flex-1 bg-gray-100 h-1 rounded-full overflow-hidden">
        <div className="bg-indigo-500 h-full w-[45%] transition-all" />
      </div>
      <span className="font-mono text-[9px] font-bold text-gray-400 shrink-0">450 / 1000 UNTIL NEXT BADGE</span>
    </div>
  );
}