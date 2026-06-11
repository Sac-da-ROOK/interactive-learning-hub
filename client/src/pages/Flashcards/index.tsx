import React from 'react';
import { Layers, RotateCw } from 'lucide-react';

export default function Flashcards() {
  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Study Flashcards</h1>
        <p className="text-gray-500 text-sm">Flip the card to test your memory on key terms.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl h-64 shadow-md flex flex-col items-center justify-center p-6 cursor-pointer hover:shadow-lg transition-shadow relative">
        <Layers className="w-8 h-8 text-blue-500 absolute top-4 left-4" />
        <p className="text-xl font-semibold text-gray-800">What does CSS stand for?</p>
        <div className="absolute bottom-4 text-xs font-semibold text-gray-400 flex items-center gap-1">
          <RotateCw className="w-3 h-3" /> Click to flip
        </div>
      </div>
    </div>
  );
}