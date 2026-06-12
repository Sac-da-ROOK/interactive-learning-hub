import React, { useState } from 'react';
import { Search, Hash, CornerDownLeft } from 'lucide-react';

export default function ModuleQuickSearch() {
  const [query, setQuery] = useState('');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 flex items-center gap-2 shadow-2xs relative">
      <Search size={14} className="text-gray-400 shrink-0 ml-1" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Query modules (e.g., Array mutations, Context API hooks)..."
        className="flex-1 bg-transparent border-none text-xs font-semibold focus:outline-none placeholder-gray-400 text-gray-800"
      />
      {query && (
        <span className="font-mono text-[9px] font-black bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded flex items-center gap-0.5">
          <CornerDownLeft size={8} /> Enter to Filter
        </span>
      )}
    </div>
  );
}