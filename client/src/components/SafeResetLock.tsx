import React, { useState } from 'react';
import { Trash2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SafeResetLock() {
  const [stage, setStage] = useState<'idle' | 'warning'>('idle');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center"><AlertTriangle size={14} /></div>
        <div>
          <h4 className="text-xs font-black text-gray-900">Clear Cache Matrix</h4>
          <p className="text-[10px] text-gray-400 font-medium">Flushes ephemeral local evaluation logs.</p>
        </div>
      </div>

      {stage === 'idle' ? (
        <button onClick={() => setStage('warning')} className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition text-xs font-black flex items-center gap-1">
          <Trash2 size={12} /> Clear Data
        </button>
      ) : (
        <div className="flex gap-1.5 animate-fadeIn">
          <button onClick={() => { alert('Local data registers purged clean.'); setStage('idle'); }} className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-black rounded-lg shadow-sm">
            Confirm Wipe
          </button>
          <button onClick={() => setStage('idle')} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold rounded-lg">
            Abandons
          </button>
        </div>
      )}
    </div>
  );
}