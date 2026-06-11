import React from 'react';
import { BookOpen, Play, CheckCircle } from 'lucide-react';

export default function Lessons() {
  const modules = [
    { id: 'html-basics', title: 'HTML Document Structure', duration: '15 mins', status: 'Completed' },
    { id: 'css-styling', title: 'Introduction to CSS', duration: '20 mins', status: 'In Progress' },
    { id: 'js-variables', title: 'Variables & Data Types', duration: '25 mins', status: 'Not Started' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Lessons</h1>
        <p className="text-gray-500">Select a lesson below to continue your learning journey.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-100">
        {modules.map((module) => (
          <div key={module.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{module.title}</h3>
                <p className="text-xs text-gray-500">{module.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                module.status === 'Completed' ? 'bg-green-50 text-green-700' :
                module.status === 'In Progress' ? 'bg-yellow-50 text-yellow-700' :
                'bg-gray-50 text-gray-600'
              }`}>
                {module.status}
              </span>
              <a
                href={`/lessons/${module.id}`}
                className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}