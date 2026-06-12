import React, { useState, useEffect } from 'react';
import { Hourglass, AlertCircle, RefreshCw, Zap } from 'lucide-react';

export default function QuizSpeedTimer({ durationSeconds = 30 }) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isAlertState, setIsAlertState] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const sessionCountdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 6) setIsAlertState(true);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(sessionCountdown);
  }, [timeLeft]);

  const restartTimerTrack = () => {
    setIsAlertState(false);
    setTimeLeft(durationSeconds);
  };

  return (
    <div className={`border rounded-2xl p-4 transition-all duration-300 flex items-center justify-between ${
      timeLeft === 0 
        ? 'bg-rose-50 border-rose-200 animate-headShake' 
        : isAlertState 
        ? 'bg-amber-50 border-amber-200 animate-pulse' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${
          timeLeft === 0 ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-slate-50 text-slate-700 border-slate-200'
        }`}>
          <Hourglass size={14} className={timeLeft > 0 && timeLeft <= 6 ? 'animate-spin' : ''} />
        </div>
        <div>
          <h4 className="text-xs font-black text-gray-900">
            {timeLeft === 0 ? 'Assessment Matrix Terminated' : 'Speed-Run Mode Window'}
          </h4>
          <p className="text-[9px] text-gray-400 font-medium">Lock in responses before expiration parameters take effect.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className={`font-mono text-xl font-black ${timeLeft <= 6 ? 'text-rose-600' : 'text-gray-900'}`}>
            {timeLeft}s
          </p>
        </div>
        <button onClick={restartTimerTrack} className="p-1.5 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-500 rounded-xl transition">
          <RefreshCw size={12} />
        </button>
      </div>
    </div>
  );
}