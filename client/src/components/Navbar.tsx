import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, LayoutDashboard, BrainCircuit, Layers, ShieldAlert } from 'lucide-react';
import { useUserStore } from '../store/useStore';

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const xp = useUserStore((state) => state.xp);
  const level = useUserStore((state) => state.level);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 font-black text-lg tracking-tight text-indigo-400">
          <BrainCircuit size={22} />
          <span>LearningHub</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-300">
          <Link to="/" className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-800 transition">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link to="/lessons" className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-800 transition">
            <BookOpen size={16} /> Lessons
          </Link>
          <Link to="/quizzes" className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-800 transition">
            <BrainCircuit size={16} /> Quizzes
          </Link>
          <Link to="/flashcards" className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-800 transition">
            <Layers size={16} /> Flashcards
          </Link>
          <Link to="/admin" className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-800 text-red-400 transition">
            <ShieldAlert size={16} /> Admin
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-black text-slate-200">{user.username}</p>
          <p className="text-[10px] font-bold text-indigo-400">Lvl {level} • {xp} XP</p>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 bg-slate-800 hover:bg-red-950/40 border border-slate-700 text-slate-400 hover:text-red-400 rounded-xl transition"
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
}