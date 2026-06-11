import React from 'react';
import { BookOpen, Sparkles, Code, Brain, Layout, ChevronRight, Play, Award } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  count: string;
  bgColor: string;
  iconColor: string;
  icon: React.ComponentType<any>;
}

export default function Home() {
  const categories: Category[] = [
    {
      id: 'html-css',
      name: 'HTML & CSS Basics',
      description: 'Learn how to structure and style beautiful web pages from scratch.',
      count: '8 Lessons',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
      icon: Layout,
    },
    {
      id: 'js-programming',
      name: 'JavaScript Essentials',
      description: 'Make pages interactive, work with dynamic logic, and build programs.',
      count: '12 Lessons',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      icon: Code,
    },
    {
      id: 'react-framework',
      name: 'React Fundamentals',
      description: 'Construct modern, state-driven interfaces using the React library.',
      count: '10 Lessons',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      icon: Sparkles,
    },
    {
      id: 'logic-puzzles',
      name: 'Logic & Problem Solving',
      description: 'Train your brain with cool algorithms, patterns, and interactive quizzes.',
      count: '6 Quizzes',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
      icon: Brain,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Explore Subjects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div key={category.id} className="p-4 bg-white border rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.bgColor} ${category.iconColor}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{category.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}