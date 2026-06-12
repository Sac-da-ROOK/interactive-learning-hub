import React, { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Sparkles, Monitor } from 'lucide-react';

export default function ThemeCustomizer() {
  const [activeTheme, setActiveTheme] = useState(() => localStorage.getItem('app-ui-theme') || 'slate');

  const themes = [
    { id: 'slate', name: 'Cyber Slate', Class: 'from-slate-900 to-slate-800 text-white border-slate-700' },
    { id: 'indigo', name: 'Neon Indigo', Class: 'from-indigo-950 to-indigo-900 text-indigo-200 border-indigo-500/30' },
    { id: 'emerald', name: 'Forest Mint', Class: 'from-emerald-950 to-teal-900 text-emerald-200 border-emerald-500/30' },
    { id: 'amber', name: 'Retro Amber', Class: 'from-amber-950 to-stone-900 text-amber-200 border-amber-500/30' }
  ];

  const selectTheme = (themeId: string) => {
    setActiveTheme(themeId);
    localStorage.setItem('app-ui-theme', themeId);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Palette size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Workspace Accent Canvas</h3>
            <p className="text-[10px] text-gray-400 font-medium">Dynamically recalibrate background ambient matrices across target screens.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => selectTheme(t.id)}
            className={`p-3 rounded-2xl border text-left bg-gradient-to-br transition-all relative overflow-hidden group ${t.Class} ${
              activeTheme === t.id ? 'ring-2 ring-offset-2 ring-indigo-600 shadow-sm' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 opacity-10 group-hover:scale-110 transition-transform">
              <Sparkles size={40} />
            </div>
            <p className="text-xs font-black tracking-tight">{t.name}</p>
            <span className="text-[9px] font-mono opacity-60 block mt-0.5">
              {activeTheme === t.id ? '● Active Profile' : '○ Standby'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}