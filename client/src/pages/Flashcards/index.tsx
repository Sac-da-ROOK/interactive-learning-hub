import React, { useState, useMemo } from 'react';
import { Layers, RotateCw, CheckCircle, HelpCircle, ArrowLeft, ArrowRight, RefreshCw, Inbox, CalendarDays, Archive } from 'lucide-react';
import { mockDecks } from '../../data/flashcards';
import { useUserStore } from '../../store/useStore';

export default function Flashcards() {
  const incrementFlashcardProgress = useUserStore((state) => state.incrementFlashcardProgress);

  const [activeDeckIdx, setActiveDeckIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  // --- Feature 5: Leitner Spaced Repetition State ---
  // Tracks which box each card ID belongs to. Default is Box 1 (untracked).
  const [cardBoxes, setCardBoxes] = useState<Record<string, number>>({});
  const [activeBoxFilter, setActiveBoxFilter] = useState<number>(1); // 1 = Daily, 2 = Weekly, 3 = Mastered
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  const activeDeck = mockDecks[activeDeckIdx];

  // Dynamically filter the deck based on the selected Spaced Repetition Box
  const activeCards = useMemo(() => {
    if (!activeDeck) return [];
    return activeDeck.cards.filter(card => {
      const box = cardBoxes[card.id] || 1;
      return box === activeBoxFilter;
    });
  }, [activeDeck, cardBoxes, activeBoxFilter]);

  const currentCard = activeCards[currentCardIdx];

  const handleDeckChange = (idx: number) => {
    setActiveDeckIdx(idx);
    setActiveBoxFilter(1);
    setCurrentCardIdx(0);
    setIsFlipped(false);
    setKnownCount(0);
  };

  const advanceCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      // If we are at the end of the filtered array, just stay on the last index (it will disappear on re-render anyway)
      if (currentCardIdx + 1 < activeCards.length) {
        setCurrentCardIdx((prev) => prev); 
      } else {
        setCurrentCardIdx(0);
      }
    }, 150);
  };

  const handleMarkAsKnown = () => {
    if (!currentCard) return;
    setKnownCount((prev) => prev + 1);
    incrementFlashcardProgress();
    
    // Feature 5 Logic: Graduate card to the next box (Max Box 3)
    setCardBoxes(prev => {
      const currentBox = prev[currentCard.id] || 1;
      return { ...prev, [currentCard.id]: Math.min(currentBox + 1, 3) };
    });
    
    advanceCard();
  };

  const handleMissed = () => {
    if (!currentCard) return;
    
    // Feature 5 Logic: Demote card back to Box 1 for immediate review
    setCardBoxes(prev => ({ ...prev, [currentCard.id]: 1 }));
    advanceCard();
  };

  const handleResetDeck = () => {
    setCurrentCardIdx(0);
    setIsFlipped(false);
    setKnownCount(0);
    // Reset all cards in this deck back to Box 1
    const resetBoxes = { ...cardBoxes };
    activeDeck.cards.forEach(c => delete resetBoxes[c.id]);
    setCardBoxes(resetBoxes);
  };

  // Helper to count cards in boxes for the UI
  const getBoxCount = (boxNum: number) => {
    return activeDeck?.cards.filter(c => (cardBoxes[c.id] || 1) === boxNum).length || 0;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Deck Switching Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <Layers size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Active Recall Hub</h1>
            <p className="text-xs text-gray-500 mt-0.5">Spaced repetition schedules optimized dynamically.</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto py-1">
          {mockDecks.map((deck, idx) => (
            <button
              key={deck.id}
              onClick={() => handleDeckChange(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition shrink-0 ${
                activeDeckIdx === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {deck.title.split(' ')[0]} Deck
            </button>
          ))}
        </div>
      </div>

      {/* Feature 5: Leitner Box Filtering Tabs */}
      <div className="flex gap-3 bg-gray-50/80 p-2 rounded-2xl border border-gray-100 w-full overflow-x-auto">
        <button 
          onClick={() => { setActiveBoxFilter(1); setCurrentCardIdx(0); setIsFlipped(false); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            activeBoxFilter === 1 ? 'bg-white text-indigo-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Inbox size={14} /> Box 1 (Daily) 
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md ml-1">{getBoxCount(1)}</span>
        </button>
        <button 
          onClick={() => { setActiveBoxFilter(2); setCurrentCardIdx(0); setIsFlipped(false); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            activeBoxFilter === 2 ? 'bg-white text-amber-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <CalendarDays size={14} /> Box 2 (Weekly)
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md ml-1">{getBoxCount(2)}</span>
        </button>
        <button 
          onClick={() => { setActiveBoxFilter(3); setCurrentCardIdx(0); setIsFlipped(false); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            activeBoxFilter === 3 ? 'bg-white text-emerald-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Archive size={14} /> Box 3 (Mastered)
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md ml-1">{getBoxCount(3)}</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Sidebar Tracking Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5 h-fit">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
              {activeDeck?.category} Track
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-2">{activeDeck?.title}</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">{activeDeck?.description}</p>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3 text-xs">
            <div className="flex justify-between font-semibold text-gray-500">
              <span>Deck Mastery Rating</span>
              <span className="text-gray-900">{Math.round((getBoxCount(3) / activeDeck?.cards.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden flex">
              <div className="bg-indigo-400 h-full transition-all duration-300" style={{ width: `${(getBoxCount(1) / activeDeck?.cards.length) * 100}%` }} title="Box 1"></div>
              <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${(getBoxCount(2) / activeDeck?.cards.length) * 100}%` }} title="Box 2"></div>
              <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${(getBoxCount(3) / activeDeck?.cards.length) * 100}%` }} title="Box 3"></div>
            </div>
          </div>

          <button
            onClick={handleResetDeck}
            className="w-full mt-2 flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 font-bold bg-gray-50 hover:bg-gray-100 py-2 rounded-xl transition"
          >
            <RefreshCw size={12} /> Reset Algorithm
          </button>
        </div>

        {/* Interactive 3D CSS Canvas */}
        <div className="md:col-span-2 space-y-5">
          {activeCards.length === 0 ? (
            <div className="w-full h-72 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center space-y-3 p-8">
              <CheckCircle size={48} className="text-emerald-400 mb-2" />
              <h3 className="text-lg font-bold text-gray-900">Box Complete!</h3>
              <p className="text-sm text-gray-500 font-medium max-w-sm">
                You've cleared all cards in this Spaced Repetition tier. Switch boxes or select a new deck to keep studying.
              </p>
            </div>
          ) : (
            <>
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="group relative w-full h-72 cursor-pointer [perspective:1000px]"
              >
                <div 
                  className={`relative w-full h-full duration-500 [transform-style:preserve-3d] transition-transform ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* Card Face: Front Question View */}
                  <div className="absolute inset-0 w-full h-full bg-white border-2 border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm [backface-visibility:hidden] group-hover:border-indigo-300 transition-colors">
                    <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
                      <span className="flex items-center gap-1"><HelpCircle size={14} /> {activeBoxFilter === 1 ? 'DAILY RECALL' : activeBoxFilter === 2 ? 'WEEKLY REVIEW' : 'MASTERED VAULT'}</span>
                      <span>{currentCardIdx + 1} / {activeCards.length}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 text-center leading-snug px-4">
                      {currentCard?.question}
                    </h2>
                    <div className="text-center text-xs text-indigo-600 font-bold flex items-center justify-center gap-1 bg-indigo-50/50 max-w-fit mx-auto px-4 py-1.5 rounded-xl">
                      <RotateCw size={12} /> Flip Card to See Answer
                    </div>
                  </div>

                  {/* Card Face: Back Answer View */}
                  <div className="absolute inset-0 w-full h-full bg-slate-900 text-white border-2 border-slate-900 rounded-3xl p-8 flex flex-col justify-between shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="flex justify-between items-center text-xs text-indigo-400 font-semibold tracking-wide">
                      <span className="flex items-center gap-1"><CheckCircle size={14} /> CONFIRMED VERIFICATION MODEL</span>
                      <span>MAPPED RECALL</span>
                    </div>
                    <p className="text-base md:text-md text-slate-200 text-center leading-relaxed font-medium px-4">
                      {currentCard?.answer}
                    </p>
                    <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Evaluation Complete
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Interface Row Toolbar */}
              <div className="flex gap-2 w-full">
                <button
                  onClick={handleMissed}
                  className="flex-1 text-xs font-bold text-gray-600 hover:text-rose-700 bg-white border border-gray-200 hover:border-rose-200 px-4 py-3 rounded-xl transition hover:bg-rose-50 shadow-sm"
                >
                  Missed It (Send to Box 1)
                </button>
                <button
                  onClick={handleMarkAsKnown}
                  className="flex-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl shadow-sm transition"
                >
                  Mastered! (Graduate Card)
                </button>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
{/* Feature 2.1: Spaced Repetition System (SRS) Leitner Distribution Analytics Grid */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner mb-6">
  <div className="bg-white p-3 border border-slate-200/60 rounded-xl space-y-1">
    <span className="text-[10px] uppercase font-extrabold text-red-500">Box 1: New Cards</span>
    <div className="flex items-baseline gap-1.5">
      <p className="text-xl font-black text-slate-900 font-mono">12</p>
      <span className="text-[9px] text-gray-400 font-medium">Review Daily</span>
    </div>
  </div>
  <div className="bg-white p-3 border border-slate-200/60 rounded-xl space-y-1">
    <span className="text-[10px] uppercase font-extrabold text-amber-500">Box 2: Reviewing</span>
    <div className="flex items-baseline gap-1.5">
      <p className="text-xl font-black text-slate-900 font-mono">8</p>
      <span className="text-[9px] text-gray-400 font-medium">Every 3 Days</span>
    </div>
  </div>
  <div className="bg-white p-3 border border-slate-200/60 rounded-xl space-y-1">
    <span className="text-[10px] uppercase font-extrabold text-indigo-500">Box 3: Advanced</span>
    <div className="flex items-baseline gap-1.5">
      <p className="text-xl font-black text-slate-900 font-mono">15</p>
      <span className="text-[9px] text-gray-400 font-medium">Weekly Cycle</span>
    </div>
  </div>
  <div className="bg-white p-3 border border-slate-200/60 rounded-xl space-y-1">
    <span className="text-[10px] uppercase font-extrabold text-emerald-600">Box 4: Mastered</span>
    <div className="flex items-baseline gap-1.5">
      <p className="text-xl font-black text-slate-900 font-mono">24</p>
      <span className="text-[9px] text-gray-400 font-medium">Retained Permanently</span>
    </div>
  </div>
</div>