import React from 'react';
import { BookOpen, Award, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  // Mock data for user progress
  const stats = [
    { id: 1, name: 'Lessons Completed', value: '4', icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50' },
    { id: 2, name: 'Hours Learned', value: '6.5h', icon: Clock, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 3, name: 'Quizzes Passed', value: '3', icon: Award, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  ];

  const recentLessons = [
    { id: 'react-basics', title: 'React Basics', category: 'React Fundamentals', progress: 40 },
    { id: 'js-variables', title: 'Variables & Data Types', category: 'JavaScript Essentials', progress: 100 },
    { id: 'html-tags', title: 'HTML Document Structure', category: 'HTML & CSS Basics', progress: 100 },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-500">Track your progress, view stats, and jump back into your coding modules.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Your Learning Progress</h2>
        
        <div className="divide-y divide-gray-100">
          {recentLessons.map((lesson) => (
            <div key={lesson.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                <p className="text-xs text-gray-400">{lesson.category}</p>
              </div>
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 h-2 rounded-full hidden xs:block">
                    <div 
                      className={`h-2 rounded-full ${lesson.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 min-w-[35px] text-right">
                    {lesson.progress}%
                  </span>
                </div>

                <a 
                  href={`/lessons/${lesson.id}`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {lesson.progress === 100 ? 'Review' : 'Resume'} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}