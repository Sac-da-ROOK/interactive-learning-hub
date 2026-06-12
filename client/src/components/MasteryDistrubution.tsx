import React from 'react';
import { Layers, Activity, HelpCircle } from 'lucide-react';

export default function MasteryDistribution() {
  const segments = [
    { label: 'Unreviewed Core', total: 14, color: 'bg-gray-400' },
    { label: 'Weak Retention', total: 6, color: 'bg-rose-400' },
    { label: 'Confident', total: 28, color: 'bg-emerald-400' }
  ];

  const totalItemsCount = segments.reduce((sum, current) => sum + current.total, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Layers size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Card Mastery Tier Allocation</h3>
            <p className="text-[10px] text-gray-400 font-medium">Proportional metrics scaling performance allocations across active flashcard sets.</p>
          </div>
        </div>
      </div>

      {/* Aggregate Stacked Progress Track Bar Frame Layout */}
      <div className="space-y-3">
        <div className="w-full h-4 rounded-xl overflow-hidden flex border border-gray-100 p-0.5 bg-gray-50 shadow-inner">
          {segments.map((seg, index) => {
            const calculatedRatio = (seg.total / totalItemsCount) * 100;
            return (
              <div
                key={index}
                className={`${seg.color} h-full transition-all duration-500 first:rounded-l-lg last:rounded-r-lg`}
                style={{ width: `${calculatedRatio}%` }}
                title={`${seg.label}: ${seg.total} items`}
              />
            );
          })}
        </div>

        {/* Legend Mapping Grid Labels Panel */}
        <div className="grid gap-2 grid-cols-3 pt-1 text-center">
          {segments.map((seg, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="flex items-center justify-center gap-1">
                <div className={`w-2 h-2 rounded-full ${seg.color}`} />
                <span className="text-[10px] font-black text-gray-700 truncate">{seg.label}</span>
              </div>
              <p className="font-mono text-xs font-extrabold text-gray-400">{seg.total} Cards</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}