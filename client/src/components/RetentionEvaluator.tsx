import React, { useState } from 'react';
import { Star, Smile, Frown, Meh, Sparkles } from 'lucide-react';

export default function RetentionEvaluator() {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  const choices = [
    { id: 'weak', label: 'Weak Retention', icon: <Frown size={14} />, color: 'hover:border-rose-300 hover:bg-rose-50 text-rose-600' },
    { id: 'medium', label: 'Average Recall', icon: <Meh size={14} />, color: 'hover:border-amber-300 hover:bg-amber-50 text-amber-600' },
    { id: 'strong', label: 'Long-Term Mastery', icon: <Smile size={14} />, color: 'hover:border-emerald-300 hover:bg-emerald-50 text-emerald-600' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm text-center space-y-3">
      <div className="space-y-0.5">
        <h4 className="text-xs font-black text-gray-900">How cleanly did you recall this answer?</h4>
        <p className="text-[10px] text-gray-400 font-medium">Your score alters the algorithm's calculation queue parameters.</p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {choices.map((c) => (
          <button
            key={c.id}
            onClick={() => { setSelectedRating(c.id); alert(`Retained under target classification: ${c.label}`); }}
            className={`p-2.5 border border-gray-200 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition ${c.color} ${
              selectedRating === c.id ? 'ring-2 ring-offset-1 ring-indigo-600 bg-slate-50' : ''
            }`}
          >
            {c.icon}
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}