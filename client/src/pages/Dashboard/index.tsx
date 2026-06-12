import React from 'react';
import { Trophy, Flame, Target, Star, ShieldCheck, Zap } from 'lucide-react';
import { useUserStore } from '../../store/useStore';

export default function Dashboard() {
  // Safely read the tracked lesson count from your existing global store
  const lessonsFinished = useUserStore((state: any) => state.lessonsFinished) || 0;

  // Dynamic XP Engine: Automatically awards 50 XP per finished lesson on top of a base profile score
  const totalXp = (lessonsFinished * 50) + 1150;

  // Dynamic Level Calculation Engine
  const xpPerLevel = 500;
  const currentLevel = Math.floor(totalXp / xpPerLevel) + 1;
  const xpInCurrentLevel = totalXp % xpPerLevel;
  const progressPercentage = (xpInCurrentLevel / xpPerLevel) * 100;

  const leaderboardMock = [
    { rank: 1, name: "Alex_Dev", xp: 4850, badge: "Master" },
    { rank: 2, name: "Sam_Codes", xp: 3200, badge: "Elite" },
    { rank: 3, name: "You", xp: totalXp, badge: currentLevel > 2 ? "Pro" : "Rising Star", isUser: true },
    { rank: 4, name: "Byte_Size", xp: 950, badge: "Novice" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Hero Profile Summary */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-xl">
                Rank: Tier 2 Sentinel
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Welcome Back, Captain!</h1>
            <p className="text-xs text-slate-400">Your neural pathways are primed. Ready for today's active recall curriculum?</p>
          </div>

          {/* Dynamic XP Level Circle Gauge */}
          <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-2xl flex items-center gap-4 min-w-[240px]">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20 shadow-inner font-mono font-black text-xl">
              {currentLevel}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Level Progression</span>
                <span className="text-amber-400 font-mono">{xpInCurrentLevel}/{xpPerLevel} XP</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Matrix Layout Container */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Active Daily Retention Streak Counter */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Daily Streaks</h3>
            <Flame size={16} className="text-orange-500" />
          </div>
          <div className="text-center space-y-1 py-2">
            <p className="text-4xl font-black text-gray-900 tracking-tight">5 Days</p>
            <p className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
              <Zap size={12} /> 1.2x XP Multiplier Active
            </p>
          </div>
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {['M', 'T', 'W', 'T', 'F'].map((day, i) => (
              <div key={i} className={`p-2 rounded-xl text-[10px] font-extrabold text-center border ${
                i < 4 ? 'bg-orange-50 border-orange-100 text-orange-600' : 'bg-gray-50 border-gray-100 text-gray-400'
              }`}>
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Core Academic Achievements Unlocked */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Milestone Unlocks</h3>
            <Target size={16} className="text-indigo-600" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0"><Star size={14} /></div>
              <div>
                <p className="text-xs font-bold text-gray-900">First Contact</p>
                <p className="text-[10px] text-gray-500">Completed a module lesson baseline.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-50 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0"><ShieldCheck size={14} /></div>
              <div>
                <p className="text-xs font-bold text-gray-900">Perfect Execution</p>
                <p className="text-[10px] text-gray-500">Score 100% on 3 consecutive quizzes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Network Leaderboard Standings */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Global Standings</h3>
            <Trophy size={16} className="text-amber-500" />
          </div>
          <div className="space-y-1.5">
            {leaderboardMock.map((user) => (
              <div 
                key={user.rank} 
                className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold ${
                  user.isUser ? 'bg-indigo-50 border border-indigo-100 text-indigo-900' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-400 text-[10px] w-4">#{user.rank}</span>
                  <span className="truncate max-w-[100px]">{user.name}</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 uppercase">{user.badge}</span>
                  <span className="font-mono text-gray-900 text-xs">{user.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}