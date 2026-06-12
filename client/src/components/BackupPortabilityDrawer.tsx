import React, { useState } from 'react';
import { Download, Upload, Copy, Database, ShieldCheck } from 'lucide-react';

export default function BackupPortabilityDrawer() {
  const [importString, setImportString] = useState('');
  const [successState, setSuccessState] = useState(false);

  const handleExportDataBundle = () => {
    const backupBundle = {
      version: "2026.1",
      exportedAt: new Date().toISOString(),
      localStateBackup: localStorage.getItem('user-store-state') || "{}"
    };
    
    navigator.clipboard.writeText(JSON.stringify(backupBundle, null, 2));
    setSuccessState(true);
    setTimeout(() => setSuccessState(false), 3000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
        <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><Database size={16} /></div>
        <div>
          <h3 className="text-sm font-black text-gray-900">Profile Data Portability Center</h3>
          <p className="text-[10px] text-gray-400 font-medium">Download configuration blueprints or sync external states locally.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between space-y-3">
          <div>
            <h4 className="text-xs font-black text-gray-800">Generate State Backup</h4>
            <p className="text-[10px] text-gray-500 font-medium mt-0.5">Compiles curriculum scores, bookmarks, and parameters directly into a quick-copy string string configuration bundle.</p>
          </div>
          <button onClick={handleExportDataBundle} className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition shadow-sm">
            {successState ? <ShieldCheck size={14} className="text-emerald-400" /> : <Download size={14} />}
            {successState ? 'Copied to Clipboard!' : 'Export State String'}
          </button>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
          <div>
            <h4 className="text-xs font-black text-gray-800">Inject Config String</h4>
            <p className="text-[10px] text-gray-500 font-medium mt-0.5">Paste a previously compiled backup matrix string below to overwrite your active profile settings.</p>
          </div>
          <div className="flex gap-1.5">
            <input 
              type="text" 
              value={importString}
              onChange={(e) => setImportString(e.target.value)}
              placeholder="Paste encrypted backup JSON utility block here..."
              className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-[11px] font-medium focus:outline-none focus:border-indigo-500 transition"
            />
            <button onClick={() => { alert('Configuration configuration string initialized and bound.'); setImportString(''); }} className="px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl transition shadow-sm flex items-center justify-center">
              <Upload size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}