import React from 'react';
import { Target, Activity, ShieldCheck, Zap } from 'lucide-react';

export default function VelocityMeter() {
  const operationalModules = [
    { name: 'Core Foundations (ES6+)', lessonsTotal: 12, completedCount: 8 },
    { name: 'React UI Reconciliation Engine', lessonsTotal: 10, completedCount: 4 },
    { name: 'State Architecture Store Matrix', lessonsTotal: 6, completedCount: 0 }
  ];

  const combinedTotal = operationalModules.reduce((acc, current) => acc + current.lessonsTotal, 0);
  const combinedFinished = operationalModules.reduce((acc, current) => acc + current.completedCount, 0);
  const absoluteProgressPercentage = Math.round((combinedFinished / combinedTotal) * 100) || 0;

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Target size={16} /></div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Syllabus Completion Track Velocity</h3>
            <p className="text-[10px] text-gray-400 font-medium">Real-time aggregate data visualization of completed curriculum components.</p>
          </div>
        </div>
        <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-xl px-2.5 py-1 flex items-center gap-0.5">
          <Zap size={11} fill="currentColor" /> {absoluteProgressPercentage}% Total Progress
        </span>
      </div>

      <div className="space-y-3">
        {operationalModules.map((mod, idx) => {
          const innerRatio = Math.round((mod.completedCount / mod.lessonsTotal) * 100);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">{mod.name}</span>
                <span className="font-mono text-[10px] text-gray-400 font-extrabold">{mod.completedCount} / {mod.lessonsTotal} Units</span>
              </div>
              <div className="w-full bg-slate-50 border border-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-600 h-full transition-all duration-500 rounded-full" style={{ width: `${innerRatio}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}