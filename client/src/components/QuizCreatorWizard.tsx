import React, { useState } from 'react';
import { Settings, Plus, Trash2, Code, Eye, ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface QuestionSchema {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export default function QuizCreatorWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Quiz General Meta State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('JavaScript');
  const [difficulty, setDifficulty] = useState('Intermediate');

  // Question Set Compilation Array State
  const [questions, setQuestions] = useState<QuestionSchema[]>([]);
  
  // Active Question Workspace State Buffer
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [choices, setChoices] = useState<string[]>(['', '']);
  const [correctChoiceIndex, setCorrectChoiceIndex] = useState<number>(0);

  // Dynamic Array Handlers for Choice Configurations
  const handleAddChoiceOption = () => {
    if (choices.length < 6) setChoices([...choices, '']);
  };

  const handleRemoveChoiceOption = (indexToRemove: number) => {
    if (choices.length > 2) {
      setChoices(choices.filter((_, i) => i !== indexToRemove));
      if (correctChoiceIndex >= choices.length - 1) setCorrectChoiceIndex(0);
    }
  };

  const handleChoiceValueChange = (index: number, textValue: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = textValue;
    setChoices(updatedChoices);
  };

  // Compile question into the workspace state array
  const handleCommitQuestionToPool = () => {
    if (!currentQuestionText.trim() || choices.some(c => !c.trim())) {
      alert('Please fill out the question prompt text and all choice fields.');
      return;
    }

    const payload: QuestionSchema = {
      id: `custom-q-${Date.now()}`,
      question: currentQuestionText,
      options: [...choices],
      correctAnswerIndex: correctChoiceIndex
    };

    setQuestions([...questions, payload]);
    
    // Clear buffer for the next question item
    setCurrentQuestionText('');
    setChoices(['', '']);
    setCorrectChoiceIndex(0);
  };

  const handleFinalCompilationSubmit = () => {
    const finalQuizObject = {
      id: `quiz-compiled-${Date.now()}`,
      title,
      description,
      category,
      difficulty,
      questions
    };
    
    navigator.clipboard.writeText(JSON.stringify(finalQuizObject, null, 2));
    alert('Quiz Schema compiled perfectly! JSON definition string has been copied straight to your clipboard clipboard.');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6 max-w-3xl mx-auto">
      
      {/* Wizard Progress Stepper Ribbon Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Settings size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-900">Custom Quiz Creator Studio</h3>
            <p className="text-[10px] text-gray-400 font-medium">Dynamic multi-step learning curriculum schema model compiler.</p>
          </div>
        </div>

        {/* Dynamic Context Stepper Progress Indicators */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-gray-400">
          <span className={step === 1 ? 'text-indigo-600 font-black' : ''}>1. Meta</span>
          <span>&rarr;</span>
          <span className={step === 2 ? 'text-indigo-600 font-black' : ''}>2. Questions ({questions.length})</span>
          <span>&rarr;</span>
          <span className={step === 3 ? 'text-indigo-600 font-black' : ''}>3. Review</span>
        </div>
      </div>

      {/* STEP 1: Quiz Meta-Parameters Initialization Configuration Form */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Quiz Title Banner</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Advanced JavaScript Closures" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Syllabus Summary Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a breakdown of what this customized module covers..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition h-20 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Category Tag</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition">
                <option value="JavaScript">JavaScript</option>
                <option value="React">React Infrastructure</option>
                <option value="TypeScript">TypeScript Structural</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Difficulty Threshold</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition">
                <option value="Beginner">Beginner Baseline</option>
                <option value="Intermediate">Intermediate Core</option>
                <option value="Advanced">Advanced Mastery</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Interactive Problem/Option Matrix Deck Assembly Workspace Form */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-1.5 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
            <label className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">Question Content Prompt Text</label>
            <input 
              type="text" 
              value={currentQuestionText} 
              onChange={(e) => setCurrentQuestionText(e.target.value)}
              placeholder="What evaluates to true when compiling lexical closures?" 
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition"
            />
            
            {/* Dynamic Custom Choice Array Mapping Node */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400">Multi-Choice Option Items Mapping</label>
                <button 
                  onClick={handleAddChoiceOption}
                  disabled={choices.length >= 6}
                  className="text-[9px] font-bold text-indigo-600 bg-white border border-gray-200 px-2 py-1 rounded-md hover:bg-gray-50 transition disabled:opacity-40"
                >
                  <Plus size={10} className="inline mr-0.5" /> Add Option Slot
                </button>
              </div>
              
              {choices.map((choice, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="correct-choice-selector"
                    checked={correctChoiceIndex === index}
                    onChange={() => setCorrectChoiceIndex(index)}
                    className="text-indigo-600 focus:ring-transparent h-3.5 w-3.5"
                    title="Mark option item as the mathematically correct target criteria answer"
                  />
                  <input 
                    type="text" 
                    value={choice} 
                    onChange={(e) => handleChoiceValueChange(index, e.target.value)}
                    placeholder={`Response text placeholder choice parameter #${index + 1}`} 
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition"
                  />
                  {choices.length > 2 && (
                    <button 
                      onClick={() => handleRemoveChoiceOption(index)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 transition"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={handleCommitQuestionToPool}
              className="w-full mt-3 text-[11px] font-black text-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl transition shadow-sm"
            >
              Commit Configuration and Add Question to Deployed Quiz Pool Array
            </button>
          </div>

          {/* Staged Content Inventory Queue Review Frame */}
          {questions.length > 0 && (
            <div className="border border-gray-100 rounded-xl p-3 bg-gray-50/50 space-y-1.5">
              <span className="text-[9px] uppercase font-extrabold text-gray-400 tracking-wider">Configured Problem Pool ({questions.length})</span>
              <div className="max-h-[110px] overflow-y-auto space-y-1 pr-1">
                {questions.map((q, idx) => (
                  <div key={q.id} className="flex items-center justify-between text-[11px] bg-white p-2 border border-gray-200/60 rounded-lg shadow-2xs">
                    <p className="font-bold text-gray-700 truncate max-w-[80%]">{idx + 1}. {q.question}</p>
                    <span className="font-mono text-[9px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{q.options.length} Choices</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: Structural JSON Verification Summary Review Display Screen Frame */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="text-center p-4 bg-emerald-50/40 border border-emerald-100 rounded-2xl space-y-1">
            <CheckCircle2 size={24} className="text-emerald-500 mx-auto" />
            <h4 className="text-xs font-black text-gray-900">Quiz Structure Validated Effectively</h4>
            <p className="text-[10px] text-gray-500 font-medium">Data structures are fully synchronized and compiled into dynamic framework objects ready to serialize.</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1"><Code size={12} /> Live Compiled JSON Schema Model Output Stream Mirror</span>
            <pre className="bg-slate-900 text-slate-200 text-[10px] font-mono p-4 rounded-xl max-h-[160px] overflow-y-auto leading-normal border border-slate-950 shadow-inner">
{JSON.stringify({ title, description, category, difficulty, questionCount: questions.length, questions }, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Navigation Router Controller Footer Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          disabled={step === 1}
          onClick={() => setStep((prev) => (prev === 3 ? 2 : 1) as any)}
          className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-900 disabled:opacity-30 transition"
        >
          <ArrowLeft size={12} /> Back Stage
        </button>

        {step < 3 ? (
          <button
            disabled={step === 1 && !title.trim()}
            onClick={() => setStep((prev) => (prev === 1 ? 2 : 3) as any)}
            className="inline-flex items-center gap-1 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 px-4 py-2 rounded-xl transition shadow-sm"
          >
            Advance Module <ArrowRight size={12} />
          </button>
        ) : (
          <button
            onClick={handleFinalCompilationSubmit}
            disabled={questions.length === 0}
            className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 px-5 py-2.5 rounded-xl transition shadow-md"
          >
            <Sparkles size={13} className="text-amber-400 fill-amber-400" /> Compile Schema & Copy JSON Utility
          </button>
        )}
      </div>

    </div>
  );
}