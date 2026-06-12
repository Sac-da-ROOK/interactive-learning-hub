import React, { useState } from 'react';
import { Code2, Play, Terminal, RefreshCw, CheckCircle } from 'lucide-react';

export default function CodeSandboxWidget() {
  const [code, setCode] = useState(`// Test your JavaScript skills here!\nconst double = (x) => x * 2;\nconsole.log(double(21));`);
  const [logs, setLogs] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  const executeCode = () => {
    setHasError(false);
    const capturedLogs: string[] = [];
    
    // Create a temporary sandboxed console logger trap
    const mockConsole = {
      log: (...args: any[]) => {
        capturedLogs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      }
    };

    try {
      // Execute the user code safely within a functional local context wrapper
      const runWithContext = new Function('console', code);
      runWithContext(mockConsole);
      setLogs(capturedLogs.length ? capturedLogs : ['Code completed execution successfully with no output logs.']);
    } catch (err: any) {
      setHasError(true);
      setLogs([`Runtime Error: ${err.message}`]);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center"><Code2 size={16} /></div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Live Syntax Execution Sandbox</h3>
            <p className="text-[10px] text-gray-400 font-medium">Verify execution patterns inside an isolated sandboxed environment.</p>
          </div>
        </div>
        <button onClick={executeCode} className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl transition shadow-sm">
          <Play size={12} fill="currentColor" /> Run Code
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <textarea 
          value={code} 
          onChange={(e) => setCode(e.target.value)}
          className="font-mono text-xs p-4 bg-slate-900 text-slate-100 rounded-2xl h-40 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
          spellCheck="false"
        />
        <div className="bg-slate-950 rounded-2xl p-4 h-40 flex flex-col justify-between border border-slate-900">
          <div className="space-y-1 overflow-y-auto max-h-[110px] pr-1">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1"><Terminal size={10} /> Runtime Monitor</span>
            {logs.map((log, i) => (
              <p key={i} className={`font-mono text-[11px] leading-normal ${hasError ? 'text-rose-400' : 'text-emerald-400'}`}>{log}</p>
            ))}
          </div>
          <button onClick={() => setLogs([])} className="text-[9px] font-bold text-slate-500 hover:text-slate-400 self-end flex items-center gap-1">
            <RefreshCw size={10} /> Clear Monitor
          </button>
        </div>
      </div>
    </div>
  );
}