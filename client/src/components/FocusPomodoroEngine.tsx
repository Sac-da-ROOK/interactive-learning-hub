import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, ShieldCheck } from 'lucide-react';

export default function FocusPomodoroEngine() {
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isActiveLoop, setIsActiveLoop] = useState(false);

  useEffect(() => {
    let focusTimerIntervalRef: any = null;
    if (isActiveLoop && secondsRemaining > 0) {
      focusTimerIntervalRef = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsActiveLoop(false);
      alert('Focus session parameters successfully reached! Take a system buffer break.');
    }
    return () => clearInterval(focusTimerIntervalRef);
  }, [isActiveLoop, secondsRemaining]);

  const formatDisplayTimeCoordinates = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-white rounded-3xl p-5 shadow-xl flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
      
      <div className="space-y-0.5">
        <span className="text-[9px] font-extrabold uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 tracking-widest px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock size={10} /> Deep Work Protocol Active
        </span>
      </div>

      <p className="font-mono text-4xl font-black tracking-tight text-slate-100 select-none">
        {formatDisplayTimeCoordinates(secondsRemaining)}
      </p>

      <div className="flex gap-2 w-full pt-1">
        <button
          onClick={() => setIsActiveLoop(!isActiveLoop)}
          className={`flex-1 text-xs font-black py-2 rounded-xl transition shadow-xs flex items-center justify-center gap-1 ${
            isActiveLoop ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          {isActiveLoop ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
          {isActiveLoop ? 'Pause Cycle' : 'Initialize Focus'}
        </button>
        <button
          onClick={() => { setIsActiveLoop(false); setSecondsRemaining(25 * 60); }}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl transition"
          title="Reset back to baseline loop duration parameters"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </div>
  );
}