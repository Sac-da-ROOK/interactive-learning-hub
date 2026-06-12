import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, BrainCircuit, Layers, Home, Settings } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Lessons', path: '/lessons', icon: BookOpen },
    { name: 'Quizzes', path: '/quiz', icon: BrainCircuit },
    { name: 'Flashcards', path: '/flashcards', icon: Layers },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full shadow-xl">
      {/* App Logo/Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen size={18} className="text-white" />
          </div>
          <span>Learning Hub</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Menu
        </div>
        
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path || 
                           (link.path === '/lessons' && location.pathname.includes('/lesson-viewer'));

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 font-medium text-sm ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Admin Link */}
      <div className="p-4 border-t border-gray-800">
        <Link 
          to="/admin"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm font-medium"
        >
          <Settings size={18} />
          Admin Panel
        </Link>
      </div>
    </div>
  );
}