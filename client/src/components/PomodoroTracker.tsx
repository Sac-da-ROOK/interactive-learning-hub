import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Coffee } from 'lucide-react';

export default function PomodoroTracker() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer expired logic
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5);
            setSeconds(0);
            setIsActive(false);
            alert(isBreak ? "Break over! Time to focus." : "Focus session completed! Take a 5-minute break.");
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-gray-50 pb-2">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          {isBreak ? <Coffee size={14} className="text-emerald-500" /> : <Clock size={14} className="text-indigo-600" />}
          {isBreak ? 'Interval Break' : 'Focus Session'}
        </h3>
        <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
          +25 XP Reward
        </span>
      </div>

      <div className="text-center font-mono text-3xl font-black text-gray-900 tracking-tight py-1">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={toggleTimer}
          className={`flex-1 inline-flex items-center justify-center gap-1 p-1.5 text-xs font-bold text-white rounded-xl transition ${
            isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          {isActive ? <Pause size={12} /> : <Play size={12} />}
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="p-1.5 text-xs font-bold bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-xl transition"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </div>
  );
}