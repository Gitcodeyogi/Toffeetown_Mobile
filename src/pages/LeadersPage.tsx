import React, { useState } from 'react';
import type { PageId } from '../types/navigation';

export default function LeadersPage({ navigate }: { navigate: (page: PageId) => void }) {
  const [isEntered, setIsEntered] = useState(false);

  const leaders = [
    { rank: 1, name: 'Prince BonBon', coins: 4520, emoji: '🤴' },
    { rank: 2, name: 'Lady Caramel', coins: 3840, emoji: '👸' },
    { rank: 3, name: 'Sir Toffee', coins: 3120, emoji: '🛡️' },
    { rank: 4, name: 'Merchant Mallow', coins: 2900, emoji: '🧙' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0f] overflow-hidden relative">
      
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-20" />
        
        {/* CROSS LINES PATTERN */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaders-x" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 40 M 0 0 L 40 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaders-x)" />
        </svg>
      </div>

      {/* ── SPLASH HOME PAGE ── */}
      {!isEntered ? (
        <div className="flex-1 w-full flex flex-col items-center justify-center px-10 relative z-20 animate-fadeIn">
          <div className="w-64 h-64 relative mb-16 group">
             <div className="absolute inset-0 bg-indigo-600 blur-[100px] opacity-30 rounded-full animate-pulse group-hover:opacity-50 transition-all"></div>
             <div className="w-full h-full bg-white/5 backdrop-blur-3xl rounded-[3rem] border-2 border-white/20 flex items-center justify-center text-7xl shadow-2xl relative z-10">
                🏆
             </div>
          </div>
          
          <div className="text-center mb-16">
            <h1 className="text-5xl text-white font-black mb-4 tracking-tighter" style={{ fontFamily: "'Fredoka One', cursive" }}>Leaderboard</h1>
            <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.6em]" style={{ fontFamily: "'Baloo 2', sans-serif" }}>Grand Champions of ChocoBrook</p>
          </div>

          <button 
            onClick={() => setIsEntered(true)}
            className="w-full py-8 rounded-[2.5rem] bg-indigo-600 text-white text-[15px] font-black uppercase tracking-[0.3em] shadow-[0_25px_80px_rgba(79,70,229,0.5)] active:scale-95 transition-all flex items-center justify-center gap-4 border-2 border-white/30"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            View Standings <span className="text-2xl">📈</span>
          </button>
        </div>
      ) : (
        /* ── MAIN LEADERS CONTENT ── */
        <div className="flex-1 w-full flex flex-col pt-28 px-8 relative z-10 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-4xl text-white font-black mb-4 tracking-tighter" style={{ fontFamily: "'Fredoka One', cursive" }}>Top Citizens</h1>
            <p className="text-white/40 text-sm font-bold">The most successful legends of the realm.</p>
          </div>
          
          <div className="space-y-4">
             {leaders.map((l) => (
                <div key={l.rank} className="bg-white/5 backdrop-blur-3xl p-6 rounded-[2.5rem] border-2 border-white/10 flex items-center gap-6 shadow-xl">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl font-black text-indigo-400 border border-white/10">
                      {l.rank}
                   </div>
                   <div className="text-3xl">{l.emoji}</div>
                   <div className="flex-1 text-left">
                      <h3 className="text-white font-black text-lg leading-tight">{l.name}</h3>
                      <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">{l.coins} Coins</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
