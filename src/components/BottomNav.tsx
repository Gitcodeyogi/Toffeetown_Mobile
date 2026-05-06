import React, { useState, useEffect, useCallback } from 'react';
import type { PageId } from '../types/navigation';

interface BottomNavProps {
  current: PageId;
  navigate: (page: PageId) => void;
}

export default function BottomNav({ current, navigate }: BottomNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lastAction, setLastAction] = useState(Date.now());

  const resetTimer = useCallback(() => {
    setLastAction(Date.now());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      const inactiveTime = Date.now() - lastAction;
      if (inactiveTime >= 25000) {
        setIsOpen(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, lastAction]);

  const navItems: { id: PageId; label: string; emoji: string }[] = [
    { id: 'explore', label: 'HUB', emoji: '🏰' },
    { id: 'home',    label: 'HOME', emoji: '🏡' },
    { id: 'profile', label: 'YOU', emoji: '👦' },
    { id: 'chat',    label: 'CHAT', emoji: '💬' },
  ];

  const handleNavClick = (id: PageId) => {
    navigate(id);
    setIsOpen(false);
    resetTimer();
  };

  return (
    /* ── CONTAINER: FIXED AT THE BOTTOM OF THE MOBILE FRAME VIEWPORT ── */
    <div className="fixed inset-x-0 bottom-8 z-[4000] px-8 pointer-events-none flex flex-col items-center">
      
      <div className="relative w-full max-w-[310px] flex flex-col items-center justify-end min-h-[70px]">
        
        {/* ── REFINED MINI BAR (Reduced Radius & Width) ── */}
        <div 
          onClick={resetTimer}
          className={`absolute bottom-0 inset-x-0 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-24 pointer-events-none'}`}
        >
          <div className="bg-black/95 backdrop-blur-3xl border-2 border-white/20 rounded-[2rem] p-1.5 flex justify-between items-center shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-4 rounded-[1.5rem] transition-all
                  ${current === item.id ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'text-white/40 border border-transparent'}`}
              >
                <span className="text-xl mb-1">{item.emoji}</span>
                <span className="text-[9px] font-black tracking-[0.2em]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── COMPACT "FOUR DOTS" TRIGGER (Reduced Radius & Size) ── */}
        <button 
          onClick={() => { setIsOpen(true); resetTimer(); }}
          className={`w-14 h-14 rounded-[1.5rem] bg-black border-[3px] border-white/20 flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto active:scale-90 transition-all z-50
            ${isOpen ? 'opacity-0 scale-50 rotate-180 pointer-events-none' : 'opacity-100 scale-100 rotate-0'}`}
        >
          <div className="grid grid-cols-2 gap-1 w-5 h-5">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </button>

      </div>

    </div>
  );
}
