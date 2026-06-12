import React, { useState } from 'react';
import { Volume2, VolumeX, ToggleLeft, ToggleRight, Music } from 'lucide-react';

export default function AudioToggleCenter() {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [ambientAudio, setAmbientAudio] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-1.5 border-b border-gray-50 pb-2">
        <Volume2 size={15} className="text-indigo-600" />
        <h4 className="text-xs font-black text-gray-900 tracking-tight">Audio System Adjustments</h4>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl">
          <span className="text-xs font-semibold text-gray-700">Audit Completion Sound Signals</span>
          <button onClick={() => setAlertsEnabled(!alertsEnabled)} className="text-indigo-600 transition">
            {alertsEnabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-300" />}
          </button>
        </div>

        <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl">
          <span className="text-xs font-semibold text-gray-700 flex items-center gap-1"><Music size={12} /> Ambient Focus Loop</span>
          <button onClick={() => setAmbientAudio(!ambientAudio)} className="text-indigo-600 transition">
            {ambientAudio ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-gray-300" />}
          </button>
        </div>
      </div>
    </div>
  );
}