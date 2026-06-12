import React from 'react';
import { Radio, Users, Target, Activity } from 'lucide-react';

export default function LivePeerFeed() {
  const onlinePeersMock = [
    { id: 'u-1', alias: 'Vera_Node', action: 'Finished: TypeScript Basics', record: '90%', active: true },
    { id: 'u-2', alias: 'Dan_Codes', action: 'Unlocked: Syllabus Adept Badge', record: '+75 Coins', active: true },
    { id: 'u-3', alias: 'Clara_JS', action: 'Broke a 7-day recall streak', record: '1.4x Multiplier', active: false }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-gray-50 pb-2">
        <div className="flex items-center gap-1.5">
          <Radio size={14} className="text-emerald-500 animate-pulse" />
          <h4 className="text-xs font-extrabold text-gray-900 tracking-tight">Global Peer Stream</h4>
        </div>
        <span className="text-[9px] font-mono bg-emerald-50 border border-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-md font-black flex items-center gap-0.5">
          <Users size={10} /> 142 ONLINE
        </span>
      </div>

      <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-0.5">
        {onlinePeersMock.map((peer) => (
          <div key={peer.id} className="p-2 bg-slate-50/70 border border-slate-100 rounded-xl flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2 truncate max-w-[70%]">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${peer.active ? 'bg-emerald-400' : 'bg-gray-300'}`} />
              <p className="text-gray-700 truncate font-semibold">
                <span className="font-bold text-gray-900 mr-1">{peer.alias}</span> 
                {peer.action}
              </p>
            </div>
            <span className="font-mono text-[9px] font-black text-indigo-600 bg-indigo-50/60 px-1.5 py-0.2 rounded border border-indigo-100/40">
              {peer.record}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}