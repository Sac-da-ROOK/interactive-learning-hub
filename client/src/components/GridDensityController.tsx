import React, { useState } from 'react';
import { LayoutGrid, Grid3X3, List, Layers, Sliders } from 'lucide-react';

export default function GridDensityController() {
  const [layoutMode, setLayoutMode] = useState<'focus' | 'grid' | 'dense'>('grid');

  const arrangementBlueprints = [
    { id: 'focus', name: 'Singular Focus', description: 'One query module visible.', icon: <Layers size={14} /> },
    { id: 'grid', name: 'Standard Grid', description: 'Balanced deck proportions.', icon: <Grid3X3 size={14} /> },
    { id: 'dense', name: 'Dense List View', description: 'Maximizes information payload.', icon: <List size={14} /> }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <LayoutGrid size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Deck Structural Layout Sizer</h3>
            <p className="text-[10px] text-gray-400 font-medium">Reconfigure structural density matrices matching individual readability parameters.</p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        {arrangementBlueprints.map((mode) => {
          const isActive = layoutMode === mode.id;
          return (
            <div
              key={mode.id}
              onClick={() => setLayoutMode(mode.id as any)}
              className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer select-none transition ${
                isActive ? 'bg-indigo-50/50 border-indigo-200 text-indigo-900' : 'bg-white border-gray-100 hover:bg-gray-50'
              }`}
            >
              <div className={`p-1.5 rounded-lg border ${isActive ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                {mode.icon}
              </div>
              <div>
                <p className="text-xs font-black">{mode.name}</p>
                <p className="text-[10px] text-gray-400 font-medium">{mode.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}