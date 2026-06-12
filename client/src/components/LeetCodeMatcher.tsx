import React, { useState } from 'react';
import { Terminal, Check, AlertTriangle, Code, ArrowRight } from 'lucide-react';

export default function LeetCodeMatcher() {
  const [selectedPair, setSelectedPair] = useState<{ snippetId: string | null; definitionId: string | null }>({ snippetId: null, definitionId: null });
  const [solvedPairs, setSolvedPairs] = useState<string[]>([]);

  const snippets = [
    { id: 's1', text: 'arr.reduce((acc, curr) => acc + curr, 0)' },
    { id: 's2', text: 'Object.freeze(configObj)' },
    { id: 's3', text: 'setTimeout(() => {}, 0)' }
  ];

  const definitions = [
    { id: 'd2', text: 'Prevents structural modification or modification of existing object properties.' },
    { id: 'd1', text: 'Aggregates an array down to a single mathematical value or composite layout.' },
    { id: 'd3', text: 'Pushes execution block parameters onto the end of the event loop callback queue.' }
  ];

  // Manual matching mapping verification coordinates
  const goldenKeyMap: Record<string, string> = { s1: 'd1', s2: 'd2', s3: 'd3' };

  const handleSelectElement = (type: 'snippet' | 'definition', id: string) => {
    const updated = { ...selectedPair };
    if (type === 'snippet') updated.snippetId = id;
    if (type === 'definition') updated.definitionId = id;

    if (updated.snippetId && updated.definitionId) {
      if (goldenKeyMap[updated.snippetId] === updated.definitionId) {
        setSolvedPairs([...solvedPairs, updated.snippetId]);
      } else {
        alert('Syntax mismatch detected! Re-evaluate structural execution paths.');
      }
      updated.snippetId = null;
      updated.definitionId = null;
    }
    setSelectedPair(updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Terminal size={16} /></div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Syntax Reference Matcher Matrix</h3>
            <p className="text-[10px] text-gray-400 font-medium">Coordinate logic expressions directly to their corresponding runtime operational descriptions.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Left Side Code Fragments Deck */}
        <div className="space-y-2">
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider block">Expression Snippets</span>
          {snippets.map(s => {
            const isDone = solvedPairs.includes(s.id);
            const isChosen = selectedPair.snippetId === s.id;
            return (
              <button
                key={s.id}
                disabled={isDone}
                onClick={() => handleSelectElement('snippet', s.id)}
                className={`w-full p-2.5 text-left font-mono text-[11px] rounded-xl border transition ${
                  isDone ? 'bg-emerald-50 text-emerald-700 border-emerald-100 line-through opacity-50' :
                  isChosen ? 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-1 ring-indigo-500' : 'bg-slate-900 text-slate-100 hover:bg-slate-800'
                }`}
              >
                {s.text}
              </button>
            );
          })}
        </div>

        {/* Right Side Operational Definition Layout Grid */}
        <div className="space-y-2">
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider block">Runtime Definitions</span>
          {definitions.map(d => {
            const isDone = solvedPairs.some(sid => goldenKeyMap[sid] === d.id);
            const isChosen = selectedPair.definitionId === d.id;
            return (
              <button
                key={d.id}
                disabled={isDone}
                onClick={() => handleSelectElement('definition', d.id)}
                className={`w-full p-2.5 text-left text-xs font-semibold rounded-xl border transition ${
                  isDone ? 'bg-emerald-50 text-emerald-700 border-emerald-100 opacity-50' :
                  isChosen ? 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-1 ring-indigo-500' : 'bg-slate-50 border-slate-100 text-gray-700 hover:bg-slate-100'
                }`}
              >
                {d.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}