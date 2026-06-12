import React, { useState } from 'react';
import { Shuffle, Star, Eye, EyeOff, Check, AlertTriangle, ShieldAlert } from 'lucide-react';

interface Card {
  id: string;
  front: string;
  back: string;
}

export default function FlashcardStudySuite({ initialCards = [] }: { initialCards?: Card[] }) {
  const [cards, setCards] = useState<Card[]>(initialCards.length ? initialCards : [
    { id: '1', front: 'What is the purpose of useEffect cleanups?', back: 'To clear subscriptions, intervals, and memory listeners when components unmount.' },
    { id: '2', front: 'What is the Virtual DOM?', back: 'An in-memory blueprint representation of the real DOM used for fast UI updates.' },
    { id: '3', front: 'What causes component re-renders?', back: 'Changes to state data inputs, direct prop adjustments, or structural parent mutations.' }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [starredIds, setStarredIds] = useState<string[]>([]);
  const [confidenceMetrics, setConfidenceMetrics] = useState<Record<string, 'weak' | 'strong'>>({});

  const currentCard = cards[currentIndex];

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const toggleStar = (id: string) => {
    setStarredIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const markConfidence = (id: string, tier: 'weak' | 'strong') => {
    setConfidenceMetrics(prev => ({ ...prev, [id]: tier }));
    handleNextCard();
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  if (!currentCard) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      
      {/* Structural Management Header Toolbelt Display */}
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-black text-gray-400">
          CARD INDEX: {currentIndex + 1} / {cards.length}
          {confidenceMetrics[currentCard.id] && (
            <span className={`ml-2 px-1.5 py-0.2 rounded text-[9px] uppercase ${
              confidenceMetrics[currentCard.id] === 'strong' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
              {confidenceMetrics[currentCard.id]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleStar(currentCard.id)}
            className={`p-1.5 rounded-xl border transition ${
              starredIds.includes(currentCard.id) 
                ? 'bg-amber-50 text-amber-500 border-amber-200' 
                : 'bg-white text-gray-400 border-gray-200 hover:text-gray-600'
            }`}
          >
            <Star size={13} fill={starredIds.includes(currentCard.id) ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={handleShuffle}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            <Shuffle size={12} /> Shuffle
          </button>
        </div>
      </div>

      {/* Central Interactive Flashcard Core Viewport */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className={`min-h-[140px] rounded-2xl p-6 flex flex-col justify-between cursor-pointer border select-none transition-all duration-300 ${
          isFlipped 
            ? 'bg-gradient-to-br from-indigo-50/60 to-slate-50 border-indigo-200 shadow-inner' 
            : 'bg-white border-gray-200 hover:border-indigo-300 shadow-sm'
        }`}
      >
        <div className="space-y-1.5">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-500">
            {isFlipped ? 'Answer Blueprint' : 'Active Query Prompt'}
          </span>
          <p className={`text-sm tracking-tight leading-relaxed font-bold ${isFlipped ? 'text-gray-800' : 'text-gray-900'}`}>
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
        </div>

        <div className="pt-4 flex items-center justify-end text-[10px] font-extrabold text-indigo-600 gap-1 opacity-70">
          {isFlipped ? <EyeOff size={12} /> : <Eye size={12} />}
          {isFlipped ? 'Click card to conceal response' : 'Click card to reveal answer'}
        </div>
      </div>

      {/* Confidence Grading Evaluation Controls Row */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => markConfidence(currentCard.id, 'weak')}
          className="inline-flex items-center justify-center gap-1.5 p-2 bg-rose-50 hover:bg-rose-100/80 border border-rose-100 text-rose-700 text-xs font-bold rounded-xl transition"
        >
          <AlertTriangle size={12} /> Weak Retention
        </button>
        <button
          onClick={() => markConfidence(currentCard.id, 'strong')}
          className="inline-flex items-center justify-center gap-1.5 p-2 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-xl transition"
        >
          <Check size={12} /> Confident
        </button>
      </div>

    </div>
  );
}