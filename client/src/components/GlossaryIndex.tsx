import React, { useState } from 'react';
import { BookOpen, Hash, Search, ArrowUpRight } from 'lucide-react';

export default function GlossaryIndex() {
  const [searchString, setSearchString] = useState('');

  const terms = [
    { name: 'Lexical Scope', meaning: 'The structural mechanism where child blocks inherit outer variable bindings statically.' },
    { name: 'Pure Functions', meaning: 'Deterministic blocks returning consistent parameters without producing side effect side mutations.' },
    { name: 'Reconciliation', module: 'The virtual process mapping element differences to balance operational DOM node changes.' }
  ];

  const filteredTerms = terms.filter(t => t.name.toLowerCase().includes(searchString.toLowerCase()));

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <BookOpen size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Technical Lexicon Glossary</h3>
            <p className="text-[10px] text-gray-400 font-medium">Quick reference parameter dictionary targeting foundational programming keywords.</p>
          </div>
        </div>

        {/* Live Filter Search Input Slot */}
        <div className="relative flex items-center self-start sm:self-center">
          <Search size={12} className="absolute left-2.5 text-gray-400" />
          <input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search keyword..."
            className="bg-slate-50 border border-gray-200 rounded-xl pl-7 pr-3 py-1.5 text-[10px] font-medium focus:outline-none focus:bg-white focus:border-indigo-500 transition"
          />
        </div>
      </div>

      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
        {filteredTerms.map((t, idx) => (
          <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 hover:bg-slate-100/60 transition group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-900 flex items-center gap-0.5 group-hover:text-indigo-600 transition">
                <Hash size={10} className="text-gray-400" /> {t.name}
              </span>
              <ArrowUpRight size={10} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-[11px] text-gray-500 leading-normal font-medium">{t.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}