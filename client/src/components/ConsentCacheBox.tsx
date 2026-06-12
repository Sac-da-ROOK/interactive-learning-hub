import React, { useState } from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';

export default function ConsentCacheBox() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-indigo-950 border border-indigo-800 text-indigo-100 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md animate-fadeIn">
      <div className="flex items-center gap-2 text-center sm:text-left">
        <ShieldAlert size={14} className="text-indigo-400 shrink-0" />
        <p className="text-[11px] font-semibold">Allow the local browser register memory systems to persist state telemetry loops?</p>
      </div>
      <div className="flex gap-1 shrink-0 w-full sm:w-auto">
        <button onClick={() => setVisible(false)} className="flex-1 sm:flex-none px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 font-black text-[10px] rounded-lg transition text-white">
          Approve Settings
        </button>
        <button onClick={() => setVisible(false)} className="p-1 text-indigo-400 hover:text-white transition">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}