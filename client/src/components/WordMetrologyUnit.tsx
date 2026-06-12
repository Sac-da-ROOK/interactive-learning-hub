import React, { useState } from 'react';
import { Type, Sliders } from 'lucide-react';

export default function ScaleController() {
  const [scaleFactor, setScaleFactor] = useState<'sm' | 'md'>('md');

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center"><Type size={14} /></div>
        <div>
          <h4 className="text-xs font-black text-gray-900">Font Proportions</h4>
          <p className="text-[10px] text-gray-400 font-medium">Calibrate reading margins.</p>
        </div>
      </div>

      <div className="flex gap-1 bg-slate-50 border border-slate-100 p-1 rounded-xl shrink-0">
        {(['sm', 'md'] as const).map((sz) => (
          <button
            key={sz}
            onClick={() => setScaleFactor(sz)}
            className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-lg transition-all ${
              scaleFactor === sz ? 'bg-white text-indigo-600 shadow-3xs' : 'text-gray-400'
            }`}
          >
            {sz} Bounds
          </button>
        ))}
      </div>
    </div>
  );
}