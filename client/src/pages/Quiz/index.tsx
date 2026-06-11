import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function Quiz() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Module Quiz</h1>
        <p className="text-gray-500">Test your knowledge on the concepts you just learned.</p>
      </div>
      <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm space-y-4">
        <div className="flex gap-2 items-start">
          <HelpCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
          <h2 className="text-lg font-semibold text-gray-900">Which HTML tag is used to define the absolute main heading of a page?</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-2">
          {['<heading>', '<h6>', '<h1>', '<head>'].map((option, idx) => (
            <button key={idx} className="text-left w-full p-3 border rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all font-medium text-gray-700">
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}