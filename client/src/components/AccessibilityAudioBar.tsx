import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Square, Settings2 } from 'lucide-react';

export default function AccessibilityAudioBar({ targetText = "Welcome to your interactive study workspace." }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const triggerSpeechPlayback = () => {
    window.speechSynthesis.cancel(); // Flush existing queue
    if (!targetText) return;

    const speechNode = new SpeechSynthesisUtterance(targetText);
    speechNode.rate = playbackSpeed;
    speechNode.onend = () => setIsPlaying(false);
    speechNode.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(speechNode);
  };

  const haltSpeechPlayback = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isPlaying ? 'bg-indigo-600 text-white animate-pulse' : 'bg-white text-gray-500 border border-gray-200'}`}>
          {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </div>
        <p className="text-[11px] font-bold text-gray-700 truncate max-w-[200px] sm:max-w-md">
          {isPlaying ? `Reading: "${targetText}"` : "Text-to-Speech Companion Active"}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-500">
          <Settings2 size={10} />
          <select value={playbackSpeed} onChange={(e) => setPlaybackSpeed(Number(e.target.value))} className="bg-transparent focus:outline-none cursor-pointer">
            <option value="0.75">0.75x</option>
            <option value="1">1.0x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
          </select>
        </div>

        {!isPlaying ? (
          <button onClick={triggerSpeechPlayback} className="p-1.5 bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50 rounded-lg transition text-xs font-bold flex items-center gap-1 shadow-2xs">
            <Play size={12} fill="currentColor" /> Read Section
          </button>
        ) : (
          <button onClick={haltSpeechPlayback} className="p-1.5 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-lg transition text-xs font-bold flex items-center gap-1 shadow-2xs">
            <Square size={12} fill="currentColor" /> Silence
          </button>
        )}
      </div>
    </div>
  );
}