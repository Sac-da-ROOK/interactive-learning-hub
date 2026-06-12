import React, { useState } from 'react';
import { Bookmark, Link2, Plus, Trash2, ExternalLink } from 'lucide-react';

export default function ResourceBookmarks() {
  const [links, setLinks] = useState([
    { id: 'l-1', label: 'MDN: Lexical Scoping Guide', url: 'https://developer.mozilla.org' },
    { id: 'l-2', label: 'React Infrastructure Architecture', url: 'https://react.dev' }
  ]);
  const [inputLabel, setInputLabel] = useState('');
  const [inputUrl, setInputUrl] = useState('');

  const commitNewBookmarkLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLabel.trim() || !inputUrl.trim()) return;

    setLinks([...links, { id: `link-${Date.now()}`, label: inputLabel, url: inputUrl }]);
    setInputLabel('');
    setInputUrl('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
        <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          <Bookmark size={16} />
        </div>
        <div>
          <h3 className="text-sm font-black text-gray-900">Syllabus Reference Ledger</h3>
          <p className="text-[10px] text-gray-400 font-medium">Bookmark key technical documentation links and repos right beside your notes workspace.</p>
        </div>
      </div>

      <form onSubmit={commitNewBookmarkLink} className="grid gap-2 sm:grid-cols-3 bg-slate-50 border border-slate-100 p-2.5 rounded-2xl">
        <input
          type="text"
          value={inputLabel}
          onChange={(e) => setInputLabel(e.target.value)}
          placeholder="Label: e.g., MDN Closures"
          className="bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold focus:outline-none focus:border-indigo-500 transition"
        />
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Target Destination URL"
          className="bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold focus:outline-none focus:border-indigo-500 transition"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1 py-1.5">
          <Plus size={12} /> Pin Reference
        </button>
      </form>

      <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
        {links.map((link) => (
          <div key={link.id} className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-xl shadow-3xs hover:border-indigo-200 transition">
            <div className="flex items-center gap-2 truncate max-w-[80%]">
              <Link2 size={12} className="text-gray-400 shrink-0" />
              <a href={link.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-gray-800 hover:text-indigo-600 transition truncate flex items-center gap-1">
                {link.label} <ExternalLink size={10} className="opacity-40" />
              </a>
            </div>
            <button onClick={() => setLinks(links.filter(l => l.id !== link.id))} className="text-gray-400 hover:text-rose-600 transition">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}