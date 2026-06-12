import React, { useState } from 'react';
import { RefreshCcw, HelpCircle, FileText } from 'lucide-react';

export default function FlipPreviewCard() {
  const [faceSide, setFaceSide] = useState<'front' | 'back'>('front');

  return (
    <div 
      onClick={() => setFaceSide(prev => prev === 'front' ? 'back' : 'front')}
      className={`p-5 rounded-3xl border cursor-pointer select-none transition-all duration-300 min-h-[120px] flex flex-col justify-between ${
        faceSide === 'front' ? 'bg-white border-gray-200 shadow-sm' : 'bg-slate-900 border-slate-900 text-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-black uppercase tracking-wider opacity-50 flex items-center gap-0.5">
          {faceSide === 'front' ? <HelpCircle size={10} /> : <FileText size={10} />}
          {faceSide === 'front' ? 'Prompt Query Frame' : 'Solution Output Block'}
        </span>
        <RefreshCcw size={12} className="opacity-40 animate-spin-slow" />
      </div>

      <p className={`text-xs font-bold leading-relaxed pt-2 ${faceSide === 'front' ? 'text-gray-800' : 'text-slate-200'}`}>
        {faceSide === 'front' ? 'What does Object.entries() produce from a target payload string object map?' : 'An iterable array tracking multi-dimensional [key, value] pairs coordinate sets.'}
      </p>

      <span className="text-[9px] font-mono text-right opacity-40 block pt-1">Click layer block to flip over</span>
    </div>
  );
}