import React, { useState } from 'react';
import { ShieldAlert, Send, CheckCircle, MessageSquare } from 'lucide-react';

export default function CardReportingDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [issueType, setIssueType] = useState('Typo Error');
  const [customCommentText, setCustomCommentText] = useState('');
  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  const processFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionCompleted(true);
    setTimeout(() => {
      setSubmissionCompleted(false);
      setCustomCommentText('');
      setIsOpen(false);
    }, 2500);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-gray-900 tracking-tight">
          <ShieldAlert size={14} className="text-amber-500" />
          <span>Curriculum Audit Utility</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg hover:bg-slate-100 transition"
        >
          {isOpen ? 'Close Ticket Form' : 'Flag Current Prompt'}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={processFormSubmission} className="space-y-2.5 pt-1 border-t border-gray-50 animate-fadeIn">
          {submissionCompleted ? (
            <div className="text-center py-4 space-y-1 bg-emerald-50/50 border border-emerald-100 rounded-xl">
              <CheckCircle size={18} className="text-emerald-500 mx-auto" />
              <p className="text-[11px] font-bold text-emerald-900">Ticket Dispatched Successfully</p>
              <p className="text-[9px] text-emerald-600">Audit logs have been sent to local curators.</p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Classification Criteria</label>
                <select 
                  value={issueType} 
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-2 py-1.5 text-xs font-semibold focus:outline-none focus:border-indigo-500"
                >
                  <option value="Typo Error">Typo or Syntax Bug</option>
                  <option value="Outdated Syntax">Outdated Documentation Frame</option>
                  <option value="Logical Fallacy">Inaccurate Solution Explanation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-0.5"><MessageSquare size={10} /> Explanation Note</label>
                <input 
                  type="text" 
                  value={customCommentText}
                  onChange={(e) => setCustomCommentText(e.target.value)}
                  placeholder="e.g., Array slicing returns a shallow copy copy..."
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <button type="submit" className="w-full inline-flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-black py-1.5 rounded-xl transition shadow-xs">
                <Send size={10} /> Dispatch System Notice
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}