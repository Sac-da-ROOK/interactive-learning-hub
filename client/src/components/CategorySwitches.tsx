import React, { useState } from 'react';
import { SlidersHorizontal, ToggleLeft, ToggleRight } from 'lucide-react';

export default function CategorySwitches() {
  const [showMethods, setShowMethods] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 flex items-center justify-between gap-4 shadow-3xs">
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={13} className="text-indigo-600" />
        <span className="text-xs font-bold text-gray-700">Display Built-in Native Methods</span>
      </div>
      <button onClick={() => setShowMethods(!showMethods)} className="text-indigo-600 transition">
        {showMethods ? <ToggleRight size={22} /> : <ToggleLeft size={22} className="text-gray-300" />}
      </button>
    </div>
  );
}