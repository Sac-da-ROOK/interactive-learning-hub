import React, { useState } from 'react';
import { Heart, Flame, ShieldAlert, RotateCcw, AlertTriangle } from 'lucide-react';

export default function EliminationArena() {
  const [heartsRemaining, setHeartsRemaining] = useState(3);
  const [score, setScore] = useState(0);

  const activeQuestionMock = {
    prompt: "Which array mutation model modifies the original baseline structural array inplace?",
    choices: ["arr.map()", "arr.filter()", "arr.splice()", "arr.concat()"],
    correctIndex: 2
  };

  const processChoiceEvaluation = (chosenIndex: number) => {
    if (heartsRemaining <= 0) return;

    if (chosenIndex === activeQuestionMock.correctIndex) {
      setScore(prev => prev + 10);
    } else {
      setHeartsRemaining(prev => prev - 1);
    }
  };

  return (
    <div className={`bg-white border rounded-3xl p-5 shadow-sm space-y-4 transition ${heartsRemaining === 0 ? 'border-rose-300 bg-rose-50/20' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
            <Heart size={16} className="fill-rose-50" />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Rapid Elimination Arena</h3>
            <p className="text-[10px] text-gray-400 font-medium">Wrong selections drop structural safety hearts. Survival scales accuracy variables.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-0.5 text-rose-500">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart key={i} size={14} fill={i < heartsRemaining ? "currentColor" : "none"} className={i >= heartsRemaining ? 'text-gray-200' : ''} />
            ))}
          </div>
          <span className="font-mono text-xs font-black bg-slate-900 text-slate-100 px-2 py-0.5 rounded-lg">SCORE: {score}</span>
        </div>
      </div>

      {heartsRemaining === 0 ? (
        <div className="text-center py-6 space-y-2">
          <AlertTriangle size={24} className="text-rose-500 mx-auto" />
          <h4 className="text-xs font-black text-gray-900">Arena Integrity Breached</h4>
          <p className="text-[10px] text-gray-400 max-w-xs mx-auto">All safety structural tokens expired. Flush the environment matrix to reset parameters.</p>
          <button onClick={() => { setHeartsRemaining(3); setScore(0); }} className="mx-auto inline-flex items-center gap-1 text-[10px] font-black bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl transition">
            <RotateCcw size={10} /> Reboot Arena Session
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-800 bg-slate-50 border border-slate-100 rounded-xl p-3 leading-relaxed">
            {activeQuestionMock.prompt}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {activeQuestionMock.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => processChoiceEvaluation(idx)}
                className="w-full text-left p-2.5 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-xs font-semibold rounded-xl transition"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}