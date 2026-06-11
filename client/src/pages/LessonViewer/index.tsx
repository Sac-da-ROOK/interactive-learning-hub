import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function LessonViewer() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
      <a href="/lessons" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Lessons
      </a>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">HTML Document Structure</h1>
        <p className="text-gray-600 leading-relaxed">
          Every HTML page has a basic backbone. It starts with a declaration, followed by the main structural tags that tell the browser how to lay out the page content.
        </p>
      </div>
      <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">
        <CheckCircle className="w-5 h-5" /> Mark as Complete
      </button>
    </div>
  );
}