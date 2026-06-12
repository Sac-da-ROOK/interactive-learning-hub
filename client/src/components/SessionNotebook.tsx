import React, { useState } from 'react';
import { NotebookTabs, FileText, Plus, Trash2, CheckCircle } from 'lucide-react';

export default function SessionNotebook() {
  const [activeTab, setActiveTab] = useState<'syntax' | 'architecture'>('syntax');
  const [notesState, setNotesState] = useState({
    syntax: "Ensure async functions always prepend the await operational binding execution block parameter.",
    architecture: "State changes drop downstream mutations. Enforce immutable model hooks everywhere."
  });

  const handleUpdateNotesPayload = (categoryKey: 'syntax' | 'architecture', inputPayload: string) => {
    setNotesState(prev => ({ ...prev, [categoryKey]: inputPayload }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <NotebookTabs size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Modular Session Notebook</h3>
            <p className="text-[10px] text-gray-400 font-medium">Categorized context frames designed to isolate temporary layout parameter markers.</p>
          </div>
        </div>
      </div>

      {/* Tab Control Buttons Layout Toggle */}
      <div className="flex gap-1 bg-slate-50 border border-slate-100 p-1 rounded-xl">
        {(['syntax', 'architecture'] as const).map(tabKey => (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={`flex-1 text-center py-1.5 text-xs font-black capitalize rounded-lg transition-all ${
              activeTab === tabKey ? 'bg-white text-indigo-600 border border-gray-100 shadow-3xs' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tabKey} Log
          </button>
        ))}
      </div>

      <textarea
        value={notesState[activeTab]}
        onChange={(e) => handleUpdateNotesPayload(activeTab, e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs font-semibold focus:outline-none focus:bg-white focus:border-indigo-500 transition h-20 resize-none leading-relaxed text-gray-700"
        placeholder="Input notes content descriptors here..."
      />
    </div>
  );
}