import React, { useState } from 'react';
import { Shuffle, ToggleLeft, ToggleRight, Sliders, Info } from 'lucide-react';

export default function ShuffleToolbelt() {
  const [randomizeOptions, setRandomizeOptions] = useState(true);
  const [injectDistractors, setInjectDistractors] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Sliders size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Shuffle Matrix Configurations</h3>
            <p className="text-[10px] text-gray-400 font-medium">Fine-tune randomized generation sequences parameters during active testing.</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {/* Control Button Option Row 1 */}
        <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl">
          <div>
            <p className="text-xs font-bold text-gray-800">Randomize Choice Vectors</p>
            <p className="text-[10px] text-gray-400 font-medium">Scramble answer index coordinates upon each load sequence.</p>
          </div>
          <button onClick={() => setRandomizeOptions(!randomizeOptions)} className="text-indigo-600 transition">
            {randomizeOptions ? <ToggleRight size={26} /> : <ToggleLeft size={26} className="text-gray-300" />}
          </button>
        </div>

        {/* Control Button Option Row 2 */}
        <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl">
          <div>
            <p className="text-xs font-bold text-gray-800">Inject Cross-Module Pitfalls</p>
            <p className="text-[10px] text-gray-400 font-medium">Pull error data parameters from independent structural fields.</p>
          </div>
          <button onClick={() => setInjectDistractors(!injectDistractors)} className="text-indigo-600 transition">
            {injectDistractors ? <ToggleRight size={26} /> : <ToggleLeft size={26} className="text-gray-300" />}
          </button>
        </div>
      </div>
    </div>
  );
}