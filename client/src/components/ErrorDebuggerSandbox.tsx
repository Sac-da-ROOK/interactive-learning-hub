import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, XCircle, Code2, Sparkles } from 'lucide-react';

export default function ErrorDebuggerSandbox() {
  const [userInput, setUserInput] = useState('const obj = { age: 24 }');
  const [hasValidated, setHasValidated] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const brokenSnippet = `// Buggy Code: Object is sealed but values try to append\nconst obj = Object.freeze({ age: 21 });\nobj.age = 24; // Throws error error`;
  const objectiveExplanation = "Fix the syntax expression so 'obj' properties can scale or alter variables properly.";

  const testCodeResolution = () => {
    setHasValidated(true);
    // Simple expression string checking simulation logic code parameter matrix
    if (!userInput.includes('freeze') && (userInput.includes('const obj') || userInput.includes('let obj'))) {
      setIsSuccessful(true);
    } else {
      setIsSuccessful(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Code2 size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Syntax Error Debugging Core</h3>
            <p className="text-[10px] text-gray-400 font-medium">Deconstruct broken architectural fragments to verify accurate execution compilation.</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl text-[10px] font-mono text-rose-800 whitespace-pre leading-relaxed">
          {brokenSnippet}
        </div>
        <p className="text-[11px] font-bold text-gray-600 italic bg-gray-50 p-2 border border-gray-100 rounded-xl">
          Objective: {objectiveExplanation}
        </p>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => { setUserInput(e.target.value); setHasValidated(false); }}
          className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <button onClick={testCodeResolution} className="w-full text-xs font-black bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl transition shadow-xs">
          Compile Configuration & Verify Pipeline Patch
        </button>
      </div>

      {hasValidated && (
        <div className={`p-3 rounded-xl border text-center transition animate-fadeIn ${
          isSuccessful ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center justify-center gap-1.5 text-xs font-black">
            {isSuccessful ? <CheckCircle size={14} className="text-emerald-600" /> : <XCircle size={14} className="text-rose-600" />}
            <span>{isSuccessful ? 'Patch Validation Approved! +50 XP Collected.' : 'Runtime evaluation failure. Review parameter restrictions.'}</span>
          </div>
        </div>
      )}
    </div>
  );
}