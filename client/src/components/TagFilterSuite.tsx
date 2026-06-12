import React, { useState } from 'react';
import { Layers, CheckCircle, SlidersHorizontal, Hash } from 'lucide-react';

export default function TagFilterSuite() {
  const [activeTags, setActiveTags] = useState<string[]>(['Closures']);

  const engineeringTagsInventory = [
    { id: 't1', label: 'Closures', totalLinked: 5 },
    { id: 't2', label: 'State Management', totalLinked: 8 },
    { id: 't3', label: 'Asynchronous', totalLinked: 4 },
    { id: 't4', label: 'Hooks Reference', totalLinked: 6 }
  ];

  const handleToggleTagFilterNode = (tagLabel: string) => {
    setActiveTags(prev => 
      prev.includes(tagLabel) ? prev.filter(t => t !== tagLabel) : [...prev, tagLabel]
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><SlidersHorizontal size={16} /></div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Curriculum Meta Filters</h3>
            <p className="text-[10px] text-gray-400 font-medium">Isolate study views down to highly specialized technological parameters.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {engineeringTagsInventory.map((tag) => {
          const isFilterActive = activeTags.includes(tag.label);
          return (
            <button
              key={tag.id}
              onClick={() => handleToggleTagFilterNode(tag.label)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition ${
                isFilterActive 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs' 
                  : 'bg-slate-50 border-gray-200 text-gray-600 hover:bg-slate-100'
              }`}
            >
              <Hash size={10} className={isFilterActive ? 'text-indigo-200' : 'text-gray-400'} />
              <span>{tag.label}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-black ${isFilterActive ? 'bg-indigo-700 text-indigo-200' : 'bg-gray-200/60 text-gray-500'}`}>
                {tag.totalLinked}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}