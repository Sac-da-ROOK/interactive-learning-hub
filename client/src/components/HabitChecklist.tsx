import React, { useState } from 'react';
import { CheckSquare, Square, ClipboardList, RefreshCw, Zap } from 'lucide-react';

export default function HabitChecklist() {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Review at least 5 Spaced Repetition flashcards', completed: true, points: 15 },
    { id: '2', text: 'Complete 1 curriculum catalog quiz module', completed: false, points: 30 },
    { id: '3', text: 'Run an isolated syntax test script inside the sandbox', completed: false, points: 10 },
  ]);

  const toggleTaskState = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const resetDailyChecklist = () => {
    setTasks(prev => prev.map(t => ({ ...t, completed: false })));
  };

  const finishedCount = tasks.filter(t => t.completed).length;
  const progressRatio = Math.round((finishedCount / tasks.length) * 100) || 0;
  const potentialXpGained = tasks.reduce((sum, t) => sum + (t.completed ? t.points : 0), 0);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><ClipboardList size={16} /></div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Daily Routine Checklist</h3>
            <p className="text-[10px] text-gray-400 font-medium">Fulfill routine criteria items daily to collect compounding experience points multipliers.</p>
          </div>
        </div>
        <button onClick={resetDailyChecklist} className="p-1.5 text-gray-400 hover:text-gray-600 transition rounded-lg hover:bg-gray-50" title="Reset checklist items">
          <RefreshCw size={13} />
        </button>
      </div>

      <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl p-3">
        <div className="space-y-1 flex-1">
          <div className="flex justify-between text-[10px] font-mono font-black text-gray-500">
            <span>COMPLETION RATE</span>
            <span>{progressRatio}% ({finishedCount}/{tasks.length})</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full transition-all duration-300" style={{ width: `${progressRatio}%` }} />
          </div>
        </div>
        <div className="ml-4 font-mono font-black text-center text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-2.5 py-1 text-xs shrink-0 flex items-center gap-0.5">
          <Zap size={12} fill="currentColor" /> +{potentialXpGained} XP
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => toggleTaskState(task.id)}
            className={`p-3 border rounded-xl flex items-center gap-3 transition cursor-pointer select-none ${task.completed ? 'bg-slate-50/60 border-slate-100 opacity-60' : 'bg-white border-gray-200 hover:border-emerald-200 shadow-2xs'}`}
          >
            <div className={task.completed ? 'text-emerald-500' : 'text-gray-300'}>
              {task.completed ? <CheckSquare size={16} /> : <Square size={16} />}
            </div>
            <div className="flex-1 flex justify-between items-center text-xs">
              <p className={`font-semibold tracking-tight ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.text}</p>
              <span className="font-mono text-[9px] font-extrabold bg-gray-100 text-gray-400 px-1.5 py-0.2 rounded-md">+{task.points} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}