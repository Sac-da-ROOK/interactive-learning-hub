import React, { useState } from 'react';
import { BrainCircuit, CheckCircle, AlertTriangle, ArrowRight, Award, HelpCircle } from 'lucide-react';
import { mockQuizzes } from '../../data/quizzes';
import { useUserStore } from '../../store/useStore';

export default function QuizView() {
  const submitQuizAttempt = useUserStore((state) => state.submitQuizAttempt);
  const loading = useUserStore((state) => state.loading);

  const [activeQuizIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const activeQuiz = mockQuizzes[activeQuizIdx];
  const currentQuestion = activeQuiz?.questions[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    setSelectedOptionIdx(idx);
  };

  const handleNext = async () => {
    if (selectedOptionIdx === null) return;

    if (selectedOptionIdx === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }

    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < activeQuiz.questions.length) {
      setCurrentQuestionIdx(nextIdx);
      setSelectedOptionIdx(null);
    } else {
      const finalScore = selectedOptionIdx === currentQuestion.correctIndex ? score + 1 : score;
      setQuizComplete(true);
      
      try {
        await submitQuizAttempt(activeQuiz.id, finalScore, activeQuiz.questions.length);
      } catch (err) {
        console.error('Failed to submit scores:', err);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const passed = score >= activeQuiz.questions.length / 2;
    return (
      <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-sm space-y-6">
        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
          passed ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
        }`}>
          {passed ? <Award size={36} /> : <AlertTriangle size={36} />}
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900">Quiz Assessment Finished</h2>
          <p className="text-sm text-gray-500 font-medium">
            You got <b className="text-gray-900 font-bold">{score}</b> out of <b className="text-gray-900 font-bold">{activeQuiz.questions.length}</b> questions right.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-semibold text-gray-600 flex justify-between items-center">
          <span>Status Tracked:</span>
          <span className={`px-2.5 py-1 rounded-md uppercase tracking-wider font-bold ${
            passed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
          }`}>
            {passed ? 'Passed (+50 XP)' : 'Needs Revision'}
          </span>
        </div>

        <button
          onClick={handleRestart}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-sm text-sm"
        >
          Try Evaluation Reset
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-3">
      
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-fit space-y-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <BrainCircuit size={20} />
          <h2 className="font-bold text-gray-900 text-sm">Active Evaluation</h2>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-gray-800 leading-snug">{activeQuiz.title}</h3>
          <p className="text-xs text-gray-400 font-medium">{activeQuiz.description}</p>
        </div>
        <div className="pt-3 border-t border-gray-100 flex justify-between text-xs font-bold text-gray-500">
          <span>Quest Potential:</span>
          <span className="text-orange-600">+{activeQuiz.xpReward} XP</span>
        </div>
      </div>

      <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[350px]">
        
        <div className="space-y-5">
          <div className="flex justify-between items-center border-b border-gray-50 pb-3 text-xs text-gray-400 font-bold">
            <span className="flex items-center gap-1"><HelpCircle size={14} /> QUESTION CRITERIA</span>
            <span>{currentQuestionIdx + 1} / {activeQuiz.questions.length}</span>
          </div>

          <h2 className="text-lg font-bold text-gray-900 leading-snug">
            {currentQuestion.questionText}
          </h2>

          <div className="space-y-2.5 pt-2">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                  selectedOptionIdx === idx
                    ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900 ring-2 ring-indigo-600/10'
                    : 'border-gray-200 bg-gray-50/50 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <span>{option}</span>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0 ml-4 ${
                  selectedOptionIdx === idx ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300 bg-white'
                }`}>
                  {selectedOptionIdx === idx && <CheckCircle size={10} className="stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={selectedOptionIdx === null || loading}
          onClick={handleNext}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:pointer-events-none font-bold py-3 px-5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 text-sm"
        >
          {loading ? 'Registering System Records...' : currentQuestionIdx + 1 === activeQuiz.questions.length ? 'Submit Final Review' : 'Proceed Forward'}
          {!loading && <ArrowRight size={16} />}
        </button>

      </div>
    </div>
  );
}