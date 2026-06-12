import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, GraduationCap } from 'lucide-react';
import { mockLessons } from '../../data/lessons';

export default function Lessons() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Catalog Title Section Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
          <BookOpen size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Curriculum Catalog</h1>
          <p className="text-xs text-gray-500 mt-0.5">Select a structured learning module to build foundational credentials.</p>
        </div>
      </div>

      {/* Card Map Grid Panel Loop */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockLessons.map((lesson) => (
          <div 
            key={lesson.id} 
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-indigo-200 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  {lesson.category}
                </span>
                <span className="text-[10px] font-bold text-gray-400">
                  {lesson.difficulty}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 line-clamp-1">{lesson.title}</h3>
                <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-2 leading-relaxed">{lesson.description}</p>
              </div>
            </div>

            {/* Metadata Footer Action Control Container */}
            <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                <GraduationCap size={12} /> {lesson.steps?.length || 0} Modules
              </span>
              <Link
                to={`/lessons/${lesson.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-indigo-500 transition"
              >
                Start Course <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}