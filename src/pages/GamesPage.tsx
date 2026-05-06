import React, { useState } from 'react';
import type { PageId } from '../types/navigation';
import TownTycoon from '../components/games/TownTycoon';

export default function GamesPage({ navigate }: { navigate: (page: PageId) => void }) {
  const [isEntered, setIsEntered] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'town-tycoon') {
    return <TownTycoon onBack={() => setActiveGame(null)} />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0f] overflow-hidden relative">
      
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-600 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[150px] opacity-20" />
        
        {/* CROSS LINES PATTERN */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="games-x" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 40 M 0 0 L 40 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#games-x)" />
        </svg>
      </div>

      {/* ── SPLASH HOME PAGE ── */}
      {!isEntered ? (
        <div className="flex-1 w-full flex flex-col items-center justify-center px-10 relative z-20 animate-fadeIn">
          <div className="w-64 h-64 relative mb-16 group">
             <div className="absolute inset-0 bg-emerald-600 blur-[100px] opacity-30 rounded-full animate-pulse group-hover:opacity-50 transition-all"></div>
             <div className="w-full h-full bg-white/5 backdrop-blur-3xl rounded-[3rem] border-2 border-white/20 flex items-center justify-center text-7xl shadow-2xl relative z-10">
                🎮
             </div>
          </div>
          
          <div className="text-center mb-16">
            <h1 className="text-5xl text-white font-black mb-4 tracking-tighter" style={{ fontFamily: "'Fredoka One', cursive" }}>Games Arena</h1>
            <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.6em]" style={{ fontFamily: "'Baloo 2', sans-serif" }}>Challenges of the Province</p>
          </div>

          <button 
            onClick={() => setIsEntered(true)}
            className="w-full py-8 rounded-[2.5rem] bg-amber-500 text-black text-[15px] font-black uppercase tracking-[0.3em] shadow-[0_25px_80px_rgba(245,158,11,0.4)] active:scale-95 transition-all flex items-center justify-center gap-4 border-2 border-white/30"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Enter Arena <span className="text-2xl">⚡</span>
          </button>
        </div>
      ) : (
        /* ── MAIN GAMES CONTENT ── */
        <div className="flex-1 w-full flex flex-col pt-24 px-6 pb-24 relative z-10 animate-fadeIn overflow-y-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl text-white font-black mb-2 tracking-tighter" style={{ fontFamily: "'Fredoka One', cursive" }}>Arena Lobby</h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Select Your Challenge</p>
          </div>

          <div className="space-y-6">
            {/* TOWN TYCOON CARD */}
            <button 
              onClick={() => setActiveGame('town-tycoon')}
              className="w-full relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/5 backdrop-blur-3xl p-6 rounded-[2.5rem] border-2 border-white/10 flex items-center gap-6 text-left shadow-2xl transition-all group-hover:border-amber-500/50">
                <div className="w-20 h-20 rounded-3xl bg-amber-500/20 flex items-center justify-center text-4xl shadow-inner border border-white/5">
                  🏰
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-xl font-black" style={{ fontFamily: "'Fredoka One', cursive" }}>Town Tycoon</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Imperial Expansion</p>
                  <p className="text-white/60 text-xs leading-tight">Master the economy of Toffee Town and build your empire!</p>
                </div>
                <div className="text-amber-500 text-2xl font-black">→</div>
              </div>
            </button>

            {/* PLACEHOLDER FOR NEXT GAME */}
            <div className="w-full bg-white/5 backdrop-blur-3xl p-6 rounded-[2.5rem] border-2 border-dashed border-white/10 opacity-40 flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-4xl filter grayscale">
                💎
              </div>
              <div className="flex-1">
                <h3 className="text-white/50 text-xl font-black" style={{ fontFamily: "'Fredoka One', cursive" }}>Jewel Quest</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Coming Soon</p>
              </div>
            </div>
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