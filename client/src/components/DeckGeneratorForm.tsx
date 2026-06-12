import React, { useState } from 'react';
import { PlusCircle, FileText, HelpCircle, Save } from 'lucide-react';

export default function DeckGeneratorForm() {
  const [prompt, setPrompt] = useState('');
  const [solution, setSolution] = useState('');

  const executeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !solution.trim()) return;
    alert(`Card committed: "${prompt}" -> Synced to ephemeral background memory arrays.`);
    setPrompt('');
    setSolution('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
        <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><PlusCircle size={16} /></div>
        <div>
          <h3 className="text-sm font-black text-gray-900">Append Custom Reference Cards</h3>
          <p className="text-[10px] text-gray-400 font-medium">Manually construct technical prompt objects to target customized edge cases.</p>
        </div>
      </div>

      <form onSubmit={executeFormSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-0.5"><HelpCircle size={10} /> Prompt Question</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Explain Virtual DOM diffing steps"
            className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-0.5"><FileText size={10} /> Explanatory Solution</label>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="e.g., Compares structural elements using shallow memory reference hashes..."
            className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white transition h-16 resize-none"
            required
          />
        </div>

        <button type="submit" className="w-full inline-flex items-center justify-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition shadow-xs">
          <Save size={12} /> Inject Into Local Memory Array
        </button>
      </form>
    </div>
  );
}