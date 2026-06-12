import React from 'react';
import { Activity, Cpu, HardDrive, ShieldCheck } from 'lucide-react';

export default function TelemetryStats() {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><Activity size={16} /></div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Workspace Execution Telemetry</h3>
            <p className="text-[10px] text-gray-400 font-medium">Real-time compilation parameters tracking UI thread processing efficiency.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-3">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-0.5"><Cpu size={10} /> Heap Load</span>
          <p className="font-mono text-base font-black text-slate-800">14.2 MB</p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-0.5"><HardDrive size={10} /> Cache Hit</span>
          <p className="font-mono text-base font-black text-indigo-600">99.4%</p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-0.5"><ShieldCheck size={10} /> Sandbox</span>
          <p className="font-mono text-base font-black text-emerald-600">Isolate</p>
        </div>
      </div>
    </div>
  );
}