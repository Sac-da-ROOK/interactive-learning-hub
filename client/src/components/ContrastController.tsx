import React, { useState } from 'react';
import { Eye, Sliders, Check } from 'lucide-react';

export default function ContrastController() {
  const [contrastSetting, setContrastSetting] = useState<'standard' | 'high'>('standard');

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-1.5 border-b border-gray-50 pb-2">
        <Eye size={15} className="text-indigo-600" />
        <h4 className="text-xs font-black text-gray-900 tracking-tight">Display Contrast Calibration</h4>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {(['standard', 'high'] as const).map((mode) => {
          const isChosen = contrastSetting === mode;
          return (
            <button
              key={mode}
              onClick={() => setContrastSetting(mode)}
              className={`p-2 border rounded-xl text-center text-xs font-black capitalize transition ${
                isChosen ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-slate-50 border-gray-100 text-gray-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                {isChosen && <Check size={10} />} {mode} View
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}