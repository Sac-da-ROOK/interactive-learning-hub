import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Lock, Mail, ArrowRight } from 'lucide-react';
import { useUserStore } from '../../store/useStore';

export default function Login() {
  const login = useUserStore((state) => state.login);
  const error = useUserStore((state) => state.error);
  const clearError = useUserStore((state) => state.clearError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    clearError();

    // Map your local password text variable into fontPassword to satisfy your store signature
    const success = await login({ email, fontPassword: password });
    setLocalLoading(false);

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <BrainCircuit size={26} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Sign In to Dashboard</h2>
          <p className="text-xs text-gray-400 font-medium">Enter your student verification credentials to access modules.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400 shrink-0" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Security Access Token</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400 shrink-0" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={localLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 text-sm mt-2 disabled:opacity-50"
          >
            {localLoading ? 'Authorizing Secure Pipeline...' : 'Initialize Portal Session'}
            {!localLoading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}