import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { mockLessons } from '../../data/lessons';
import { useUserStore } from '../../store/useStore';

export default function LessonViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Connect cleanly to our top-level store tracking parameters
  const completeLesson = useUserStore((state) => state.completeLesson);
  const loading = useUserStore((state) => state.loading);
  const lessonsFinished = useUserStore((state) => state.lessonsFinished);

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);

  // Fallback to the first lesson if the ID doesn't match
  const currentLesson = mockLessons.find((l) => l.id === id) || mockLessons[0];
  
  // Safety check: if currentLesson or steps don't exist yet, return null to prevent crashes
  if (!currentLesson || !currentLesson.steps) {
    return (
      <div className="flex justify-center p-12 text-gray-500 font-medium">
        Loading curriculum data...
      </div>
    );
  }

  const currentStep = currentLesson.steps[activeStepIdx];
  const isLastStep = activeStepIdx === currentLesson.steps.length - 1;

  const handleNextStep = () => {
    if (!isLastStep) {
      setActiveStepIdx((prev) => prev + 1);
    } else {
      handleCompleteAction();
    }
  };

  const handlePrevStep = () => {
    if (activeStepIdx > 0) {
      setActiveStepIdx((prev) => prev - 1);
    }
  };

  const handleCompleteAction = async () => {
    await completeLesson(currentLesson.id);
    setShowCompletionOverlay(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Return Navigation Anchor Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <Link 
          to="/lessons" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-sm"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </Link>
        <div className="text-right">
          <span className="text-[10px] uppercase font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            {currentLesson.difficulty || 'Standard'} Module
          </span>
          <p className="text-xs font-medium text-gray-400 mt-0.5">Global Units Mastered: <b>{lessonsFinished}</b></p>
        </div>
      </div>

      {/* Main Structural Step Presenter Grid */}
      <div className="grid gap-6 lg:grid-cols-4">
        
        {/* Navigation Step Deck Map Sidebar */}
        <div className="space-y-2 lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 px-1">Curriculum Steps</h3>
            <div className="space-y-1">
              {currentLesson.steps.map((step: any, idx: number) => {
                const isActive = activeStepIdx === idx;
                const isPassed = idx < activeStepIdx;

                return (
                  <button
                    key={step.id || idx}
                    onClick={() => {
                      setActiveStepIdx(idx);
                      setShowCompletionOverlay(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10' 
                        : isPassed 
                        ? 'bg-emerald-50 text-emerald-700 border border-transparent'
                        : 'bg-transparent text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md font-mono flex items-center justify-center text-[10px] border shrink-0 ${
                      isActive ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-white border-gray-200'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="truncate">{step.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Viewframe Display Engine */}
        <div className="lg:col-span-3">
          {showCompletionOverlay ? (
            <div className="bg-slate-900 text-white border border-slate-950 rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
              <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Award size={32} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black tracking-tight">Module Benchmark Completed!</h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Excellent work! Your knowledge base has been processed, rewarding you with <b>+50 XP</b> baseline credentials.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowCompletionOverlay(false);
                    setActiveStepIdx(0);
                  }}
                  className="text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-700 transition"
                >
                  Review Lesson
                </button>
                <button
                  onClick={() => navigate('/lessons')}
                  className="text-xs font-bold bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-500 shadow-md transition"
                >
                  Explore Next Course
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold font-mono tracking-widest text-indigo-600 uppercase">
                  Step Progress Framework Module
                </span>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">{currentStep?.title}</h2>
              </div>

              {/* Lesson Body Content Display */}
              <div className="text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-line bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                {currentStep?.content}
              </div>

              {/* Navigation Action Toolbar Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  disabled={activeStepIdx === 0}
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 disabled:opacity-40 transition py-2 px-3 rounded-xl hover:bg-gray-50"
                >
                  <ArrowLeft size={14} /> Back
                </button>

                <button
                  disabled={loading}
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl shadow-sm transition disabled:opacity-50"
                >
                  {loading ? 'Processing XP...' : isLastStep ? 'Complete Module Unit' : 'Advance Stage'}
                  {!loading && <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}