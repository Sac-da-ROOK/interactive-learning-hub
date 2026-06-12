import React from 'react';
import { Medal, Users, Trophy, Coins, Star } from 'lucide-react';

export default function LeaderboardSnapshot() {
  const leaderRows = [
    { position: 1, handle: "Alex_DevOps", cashBonus: 1450, isUser: false },
    { position: 2, handle: "Sarah_Hooks", cashBonus: 1200, isUser: false },
    { position: 3, handle: "You (Active Profile)", cashBonus: 850, isUser: true }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Trophy size={16} className="fill-amber-50" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Global Standings Radar</h3>
            <p className="text-[10px] text-gray-400 font-medium">Live sync positioning comparing profile milestone levels across peer nodes.</p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        {leaderRows.map((user, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-xl border flex items-center justify-between transition ${
              user.isUser ? 'bg-indigo-50/60 border-indigo-200 text-indigo-950' : 'bg-slate-50/60 border-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate max-w-[70%]">
              <span className={`w-5 h-5 rounded-md text-[10px] font-mono font-black flex items-center justify-center border ${
                user.position === 1 ? 'bg-yellow-100 border-yellow-300 text-yellow-700' :
                user.position === 2 ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-indigo-100 border-indigo-200 text-indigo-700'
              }`}>
                #{user.position}
              </span>
              <p className={`text-xs truncate ${user.isUser ? 'font-black text-indigo-900' : 'font-bold text-gray-700'}`}>
                {user.handle}
              </p>
            </div>

            <div className="flex items-center gap-1 font-mono text-[10px] font-black text-amber-600 bg-white border border-gray-200/60 px-2 py-0.5 rounded-lg shadow-3xs shrink-0">
              <Coins size={11} fill="currentColor" /> {user.cashBonus}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}