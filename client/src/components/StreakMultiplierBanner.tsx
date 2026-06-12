import React, { useState } from 'react';
import { Flame, Star, Zap, CalendarDays, Award } from 'lucide-react';

export default function StreakMultiplierBanner() {
  const [streakCount, setStreakCount] = useState(6);
  const [isClaimed, setIsClaimed] = useState(false);

  // Dynamic progressive calculations
  const multiplierBonus = (1 + streakCount * 0.1).toFixed(1);
  const consecutiveDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const activeDayIndex = 5; // Simulating Saturday active status

  return (
    <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white rounded-3xl p-5 shadow-md space-y-4 relative overflow-hidden">
      <div className="absolute right-0 top-0 -translate-y-4 translate-x-4 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center animate-bounce">
            <Flame size={22} className="fill-white" />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight">Your Streak is Catching Fire!</h3>
            <p className="text-xs text-orange-50 font-medium">You have maintained system consistency for {streakCount} consecutive days.</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 font-mono text-center shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider block text-orange-100">Active Multiplier</span>
          <span className="text-lg font-black flex items-center justify-center gap-0.5"><Zap size={14} fill="currentColor" /> {multiplierBonus}x</span>
        </div>
      </div>

      {/* Week Calendar Track Row */}
      <div className="flex justify-between items-center bg-black/10 rounded-2xl p-3 border border-white/10">
        {consecutiveDays.map((day, idx) => {
          const isPastOrCurrent = idx <= activeDayIndex;
          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold opacity-60">{day}</span>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[10px] font-black transition ${
                idx === activeDayIndex ? 'bg-white text-orange-600 shadow-sm' :
                isPastOrCurrent ? 'bg-orange-600/40 text-white border border-white/20' : 'bg-transparent text-white/30 border border-white/10'
              }`}>
                {isPastOrCurrent ? '✓' : '○'}
              </div>
            </div>
          );
        })}
      </div>

      <button
        disabled={isClaimed}
        onClick={() => { setIsClaimed(true); alert('Streak validation verified! +100 Streak XP deposited.'); }}
        className={`w-full font-black text-xs py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 ${
          isClaimed ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/5' : 'bg-white text-orange-600 hover:bg-orange-50'
        }`}
      >
        <Award size={14} />
        {isClaimed ? 'Daily Streak Multiplier Claimed' : 'Validate & Claim Daily Streak Multiplier'}
      </button>
    </div>
  );
}