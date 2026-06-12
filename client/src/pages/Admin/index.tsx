import React, { useState } from 'react';
import { ShieldAlert, BrainCircuit, Layers, BookOpen, Edit } from 'lucide-react';
import { mockQuizzes } from '../../data/quizzes';
import { mockDecks } from '../../data/flashcards';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'quizzes' | 'flashcards'>('quizzes');
  
  // Calculate total cards safely using the structured deck array
  const totalCards = mockDecks.reduce((sum, deck) => sum + deck.cards.length, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Container */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shadow-sm">
          <ShieldAlert size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Control Center</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage educational modules, active recall decks, and curriculum configurations.</p>
        </div>
      </div>

      {/* Metric Dashboard Display Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white p-5 border border-gray-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-400">Total Quizzes</span>
            <p className="text-2xl font-bold text-gray-900">{mockQuizzes.length}</p>
          </div>
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <BrainCircuit size={20} />
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-400">Total Flashcards</span>
            <p className="text-2xl font-bold text-gray-900">{totalCards}</p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Layers size={20} />
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-400">Active Decks</span>
            <p className="text-2xl font-bold text-gray-900">{mockDecks.length}</p>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <BookOpen size={20} />
          </div>
        </div>
      </div>

      {/* Main Structural Layout Element */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center text-center p-8">
        <div className="space-y-3 max-w-sm text-gray-500">
           <Edit size={48} className="mx-auto text-gray-300" />
           <h3 className="text-lg font-bold text-gray-900">Database Connection Active</h3>
           <p className="text-sm font-medium">Use the left sidebar modules to navigate to full CRUD operations once the backend API is wired up.</p>
        </div>
      </div>

    </div>
  );
}