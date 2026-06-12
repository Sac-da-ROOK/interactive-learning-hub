import React, { useState } from 'react';
import { Layout, Shield, GraduationCap, Settings } from 'lucide-react';

export default function WorkspaceTabs() {
  const [activeTab, setActiveTab] = useState('curriculum');

  const navigationOptions = [
    { id: 'curriculum', label: 'Study Center', icon: <GraduationCap size={14} /> },
    { id: 'sandbox', label: 'Console Matrix', icon: <Layout size={14} /> },
    { id: 'config', label: 'System Settings', icon: <Settings size={14} /> }
  ];

  return (
    <div className="bg-slate-100 border border-slate-200/60 p-1.5 rounded-2xl flex items-center gap-1 max-w-md">
      {navigationOptions.map((opt) => {
        const isCurrent = activeTab === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setActiveTab(opt.id)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-black rounded-xl transition-all ${
              isCurrent ? 'bg-white text-indigo-600 shadow-xs border border-gray-100' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}