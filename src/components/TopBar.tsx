import React, { useState } from 'react';
import type { PageId } from '../types/navigation';

interface TopBarProps {
  current: PageId;
  navigate: (page: PageId) => void;
}

export default function TopBar({ current, navigate }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const PAGE_THEMES: Record<string, string> = {
    explore: 'bg-teal-600',
    theatre: 'bg-purple-600',
    games:   'bg-emerald-600',
    cast:    'bg-red-600',
    chat:    'bg-amber-500',
    profile: 'bg-zinc-800',
    home:    'bg-amber-600',
    login:   'bg-zinc-900'
  };

  const navItems: { id: PageId; label: string; emoji: string }[] = [
    { id: 'explore', label: 'Hub', emoji: '🏰' },
    { id: 'theatre', label: 'Theatre', emoji: '🎬' },
    { id: 'games',   label: 'Games', emoji: '🎮' },
    { id: 'cast',    label: 'Cast', emoji: '🦸' },
    { id: 'leaders', label: 'Leaderboard', emoji: '🏆' },
    { id: 'coins',   label: 'Coins', emoji: '🪙' },
    { id: 'profile', label: 'My Profile', emoji: '👦' },
    { id: 'chat',    label: 'Chat', emoji: '💬' },
  ];

  const currentTheme = PAGE_THEMES[current] || 'bg-red-600';

  return (
    <div className="absolute top-0 left-0 right-0 z-[1100] px-6 pt-8 pointer-events-none">
      
      {/* ── COMMAND PILL ON THE EDGES ── */}
      <div className="flex justify-start items-center w-full pointer-events-none">
        
        <div className={`flex items-center pointer-events-auto ${currentTheme} rounded-full border-2 border-white shadow-2xl overflow-hidden h-11 transition-all active:scale-95`}>
          <button 
            onClick={() => navigate('explore')} 
            className="w-11 h-full flex items-center justify-center text-white hover:brightness-110 transition-all px-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M15 19l-7-7 7-7"/></svg>
          </button>
          
          <div className="w-[1.5px] h-5 bg-white/30 shrink-0"></div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`w-11 h-full flex flex-col items-center justify-center gap-1 hover:brightness-110 transition-all px-2 ${isMenuOpen ? 'brightness-75' : ''}`}
          >
            <div className="w-4 h-0.5 bg-white rounded-full"></div>
            <div className="w-4 h-0.5 bg-white rounded-full"></div>
            <div className="w-4 h-0.5 bg-white rounded-full"></div>
          </button>
        </div>
      </div>

      {/* ── DROP-DOWN MENU ── */}
      {isMenuOpen && (
        <div className="absolute top-24 left-6 right-6 z-[1200] pointer-events-auto animate-fade-in-down">
          <div className="bg-black/95 backdrop-blur-3xl border-2 border-white/10 rounded-[2rem] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.8)] flex flex-col gap-1 overflow-hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-5 p-4 rounded-[1.5rem] transition-all group
                  ${current === item.id ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${current === item.id ? 'bg-white/10' : 'bg-white/5'}`}>
                  {item.emoji}
                </div>
                <div className="flex flex-col text-left">
                  <span className={`text-[11px] font-black uppercase tracking-widest ${current === item.id ? 'text-white' : 'text-white/60'}`}>
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fadeInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
