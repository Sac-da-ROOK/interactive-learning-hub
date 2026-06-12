import React from 'react';
import { Award, Star, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function MilestoneUnlocks() {
  const milestoneMilestones = [
    { title: "First Compilation Clean", condition: "Submit 1 custom quiz payload", targetCleared: true },
    { title: "Memory Grandmaster", condition: "Achieve 10 perfect accuracy scores", targetCleared: false },
    { title: "Debugger Prodigy", condition: "Resolve 5 sandbox error challenges", targetCleared: true }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Award size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Syllabus Milestones Tracker</h3>
            <p className="text-[10px] text-gray-400 font-medium">Automatic system verification tracking advanced structural achievements.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {milestoneMilestones.map((milestone, i) => (
          <div
            key={i}
            className={`p-3 border rounded-2xl flex flex-col justify-between space-y-2 relative overflow-hidden transition ${
              milestone.targetCleared ? 'bg-gradient-to-br from-indigo-50/20 to-slate-50 border-indigo-100' : 'bg-gray-50/40 border-gray-100 opacity-60'
            }`}
          >
            <div className="space-y-0.5">
              <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.2 rounded uppercase ${
                milestone.targetCleared ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-400'
              }`}>
                {milestone.targetCleared ? 'Unlocked' : 'Pending'}
              </span>
              <h4 className="text-xs font-black text-gray-900 pt-1 tracking-tight">{milestone.title}</h4>
              <p className="text-[10px] text-gray-400 font-medium leading-tight">{milestone.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}