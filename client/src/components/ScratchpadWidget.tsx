import React, { useState } from 'react';
import { FileEdit, ShieldCheck, FileText, Trash2 } from 'lucide-react';

export default function ScratchpadWidget() {
  const [memoText, setMemoText] = useState(() => localStorage.getItem('scratchpad-buffer-data') || '');
  const [isSavedFlag, setIsSavedFlag] = useState(false);

  const handleTextMutation = (textValue: string) => {
    setMemoText(textValue);
    localStorage.setItem('scratchpad-buffer-data', textValue);
    setIsSavedFlag(true);
    setTimeout(() => setIsSavedFlag(false), 1500);
  };

  const wordCount = memoText.trim() ? memoText.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-gray-50 pb-2">
        <div className="flex items-center gap-1.5">
          <FileEdit size={14} className="text-indigo-600" />
          <h4 className="text-xs font-extrabold text-gray-900 tracking-tight">Active Learning Scratchpad</h4>
        </div>
        <div className="flex items-center gap-2">
          {isSavedFlag && <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5"><ShieldCheck size={10} /> Auto-Saved</span>}
          {memoText && (
            <button onClick={() => handleTextMutation('')} className="text-gray-400 hover:text-rose-600 transition">
              <Trash2 size={12} />
            </button>
          )}
        </div>
      </div>

      <textarea
        value={memoText}
        onChange={(e) => handleTextMutation(e.target.value)}
        placeholder="Jot down algorithm shortcuts, code snippets, or notes from your reading session..."
        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:bg-white focus:border-indigo-500 transition h-24 resize-none leading-relaxed text-gray-700"
      />

      <div className="flex items-center justify-between text-[9px] font-mono font-black text-gray-400 pt-0.5">
        <span className="flex items-center gap-0.5"><FileText size={10} /> TELEMETRY MONITOR</span>
        <span>{wordCount} WORDS / {memoText.length} CHARS</span>
      </div>
    </div>
  );
}