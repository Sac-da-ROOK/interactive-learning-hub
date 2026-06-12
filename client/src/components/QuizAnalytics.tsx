import React, { useState } from 'react';
import { BarChart2, Clock, Award, CheckCircle2, AlertCircle } from 'lucide-react';

export default function QuizAnalytics() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const historyMock = [
    { id: 1, quizTitle: 'Asynchronous JS Basics', score: 80, date: '2 hours ago', duration: '4m 12s', category: 'JavaScript' },
    { id: 2, quizTitle: 'React State Lifecycles', score: 100, date: 'Yesterday', duration: '2m 45s', category: 'React' },
    { id: 3, quizTitle: 'CSS Grid & Flexbox Mastery', score: 60, date: '3 days ago', duration: '7m 10s', category: 'CSS' },
    { id: 4, quizTitle: 'TypeScript Generics Pro', score: 90, date: '4 days ago', duration: '5m 01s', category: 'TypeScript' },
  ];

  const filteredHistory = selectedCategory === 'All' 
    ? historyMock 
    : historyMock.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">
      
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
            <BarChart2 size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Performance Metrics Dashboard</h3>
            <p className="text-[10px] text-gray-500 font-medium">Real-time compilation of historical quiz assessments.</p>
          </div>
        </div>

        {/* Dynamic Category Filtering Control Toggle */}
        <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100 self-start sm:self-center">
          {['All', 'JavaScript', 'React'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${
                selectedCategory === cat ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Visual Score Bar Target Matrix Chart */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-extrabold text-gray-400 tracking-wider">Historical Trend Accuracy</span>
        <div className="h-24 flex items-end gap-3 pt-4 border-b border-gray-100 pb-1 px-2">
          {filteredHistory.map((run) => (
            <div key={run.id} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
              {/* Tooltip Overlay Indicator */}
              <div className="absolute -top-6 bg-slate-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {run.score}% Accuracy
              </div>
              <div 
                className={`w-full rounded-t-md transition-all duration-500 ${
                  run.score >= 80 ? 'bg-emerald-400 group-hover:bg-emerald-500' : run.score >= 70 ? 'bg-amber-400 group-hover:bg-amber-500' : 'bg-rose-400 group-hover:bg-rose-500'
                }`}
                style={{ height: `${run.score}%` }}
              />
              <span className="text-[9px] text-gray-400 font-bold truncate max-w-[60px]">{run.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* History Output Table Feed */}
      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
        {filteredHistory.map((run) => (
          <div key={run.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100/70 transition">
            <div className="space-y-0.5 max-w-[70%]">
              <p className="text-xs font-bold text-gray-900 truncate">{run.quizTitle}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                <span className="flex items-center gap-0.5"><Clock size={10} /> {run.duration}</span>
                <span>•</span>
                <span>{run.date}</span>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                run.score >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}>
                {run.score >= 80 ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                {run.score}%
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}