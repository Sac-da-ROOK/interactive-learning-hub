import React, { useState } from 'react';
import { Layers, Binary, Database, Cpu, Globe } from 'lucide-react';

export default function DeckSwitcherDock() {
  const [selectedDeck, setSelectedDeck] = useState('js-core');

  const studyDecks = [
    { id: 'js-core', name: 'JavaScript Foundations', icon: <Binary size={14} />, cards: 42 },
    { id: 'db-rel', name: 'Database Architecture', icon: <Database size={14} />, cards: 28 },
    { id: 'sys-design', name: 'Distributed Systems', icon: <Cpu size={14} />, cards: 19 },
    { id: 'web-sec', name: 'Network Security Protocols', icon: <Globe size={14} />, cards: 31 }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm space-y-3">
      <div className="flex items-center gap-1.5 border-b border-gray-50 pb-2">
        <Layers size={14} className="text-indigo-600" />
        <h4 className="text-xs font-black text-gray-900 tracking-tight">Active Curriculum Repositories</h4>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {studyDecks.map((deck) => {
          const isActive = selectedDeck === deck.id;
          return (
            <button
              key={deck.id}
              onClick={() => setSelectedDeck(deck.id)}
              className={`p-3 rounded-xl border text-left transition relative overflow-hidden flex flex-col justify-between h-20 ${
                isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs' : 'bg-slate-50 border-gray-100 hover:bg-slate-100 text-gray-800'
              }`}
            >
              <div className={`p-1.5 rounded-lg w-fit ${isActive ? 'bg-indigo-700 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
                {deck.icon}
              </div>
              <div>
                <p className="text-[11px] font-black tracking-tight truncate w-full">{deck.name}</p>
                <p className={`text-[9px] font-mono font-bold ${isActive ? 'text-indigo-200' : 'text-gray-400'}`}>{deck.cards} Reference Cards</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}