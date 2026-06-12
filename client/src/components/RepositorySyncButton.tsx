import React, { useState } from 'react';
import { CloudLightning, Check, RefreshCw } from 'lucide-react';

export default function RepositorySyncButton() {
  const [syncState, setSyncState] = useState<'idle' | 'loading' | 'done'>('idle');

  const executeSyncSequence = () => {
    setSyncState('loading');
    setTimeout(() => {
      setSyncState('done');
      setTimeout(() => setSyncState('idle'), 2000);
    }, 1500);
  };

  return (
    <button
      disabled={syncState !== 'idle'}
      onClick={executeSyncSequence}
      className={`w-full font-black text-xs py-2.5 rounded-xl border transition flex items-center justify-center gap-1.5 shadow-3xs ${
        syncState === 'done' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
        syncState === 'loading' ? 'bg-slate-50 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-gray-200 text-gray-800 hover:border-indigo-300'
      }`}
    >
      {syncState === 'done' ? <Check size={13} strokeWidth={3} /> : <CloudLightning size={13} className={syncState === 'loading' ? 'animate-bounce' : ''} />}
      <span>{syncState === 'done' ? 'All Workspace Logs Merged' : syncState === 'loading' ? 'Uploading Changes Matrix...' : 'Merge Local Modifications to Cloud'}</span>
    </button>
  );
}