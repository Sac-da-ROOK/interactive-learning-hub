import React, { useState } from 'react';
import { Bell, Sparkles, Flame, CheckCircle2, Trash2 } from 'lucide-react';

export default function NotificationHub() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'xp', text: 'Earned +50 XP for finishing Asynchronous JS', time: 'Just now', icon: <Sparkles size={12} className="text-amber-500" />, unread: true },
    { id: 2, type: 'streak', text: '5-Day Retention Streak achieved!', time: '10 mins ago', icon: <Flame size={12} className="text-orange-500" />, unread: true },
    { id: 3, type: 'quiz', text: 'Perfect score 100% on React State Quiz logged', time: '1 hour ago', icon: <CheckCircle2 size={12} className="text-emerald-500" />, unread: false }
  ]);

  const clearAll = () => setNotifications([]);
  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
      
      {/* Activity Monitor Section Header Bar */}
      <div className="flex items-center justify-between border-b border-gray-50 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
            <Bell size={14} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
            )}
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-gray-900 tracking-tight">Activity Log</h3>
            <p className="text-[9px] text-gray-400 font-medium">Real-time systemic actions feed notification drawer.</p>
          </div>
        </div>
        
        {notifications.length > 0 && (
          <button 
            onClick={clearAll}
            className="p-1 text-gray-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50"
          >
            <Trash2 size={13} />
          </button>
        )}
      </div>

      {/* Main Realtime Notifications Feed Iteration Row */}
      <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-0.5">
        {notifications.length === 0 ? (
          <div className="text-center py-6 space-y-1">
            <p className="text-xs font-bold text-gray-400">All caught up!</p>
            <p className="text-[10px] text-gray-400">Complete tasks to fire upcoming status log updates.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div 
              key={item.id}
              onClick={() => markAsRead(item.id)}
              className={`p-2 rounded-xl border flex items-start gap-2.5 transition cursor-pointer relative ${
                item.unread 
                  ? 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-50' 
                  : 'bg-white border-gray-100 hover:bg-gray-50'
              }`}
            >
              {item.unread && (
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full absolute top-3.5 left-2" />
              )}
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                item.unread ? 'bg-white shadow-sm' : 'bg-gray-50'
              }`}>
                {item.icon}
              </div>
              <div className="flex-1 space-y-0.5 min-w-0 pl-1">
                <p className={`text-[11px] leading-tight tracking-tight text-gray-700 truncate ${item.unread ? 'font-bold text-gray-900' : 'font-medium'}`}>
                  {item.text}
                </p>
                <span className="text-[9px] font-bold text-gray-400 font-mono block">{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}