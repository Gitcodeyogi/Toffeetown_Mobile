import React, { useState, useEffect } from 'react';
import type { PageId } from '../types/navigation';
import { theatreCategories } from '../data/theatreData';

const REALM_NEWS = [
  '🏰 Toffee Town holds the Grand Toffee Pull every harvest moon!',
  '⚓ Praline Port ships nougat to 9 distant kingdoms this season!',
  '🎨 Sprinkle Sands in Honeywood County discovered rare rainbow sugar crystals!',
  '🍫 Cocoawood County unveils the ancient Cocoa Canyon King ruins!',
  '🍦 Creamwood County\'s Peppermint Peak opens a new mint research facility!',
];

// POSTERS TO ROTATE
const ROTATING_POSTERS = [
  '/Images/thesecretsip.png',
  '/Images/Thehiddenleaf.png',
  '/Images/asher_glow.png',
  '/Images/milo_spark.png'
];

export default function HomePage({ navigate }: { navigate: (page: PageId) => void }) {
  const [newsIdx, setNewsIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // 4-HOUR ROTATION LOGIC (SIMULATED)
  const currentPosterIdx = Math.floor(Date.now() / (1000 * 60 * 60 * 4)) % ROTATING_POSTERS.length;
  const currentPoster = ROTATING_POSTERS[currentPosterIdx];

  useEffect(() => {
    setMounted(true);
    const t1 = setInterval(() => setNewsIdx(i => (i + 1) % REALM_NEWS.length), 4000);
    return () => { clearInterval(t1); };
  }, []);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{background:'linear-gradient(160deg, #1c0a00 0%, #2d1200 40%, #1a0800 100%)'}}>
      
      {/* ── AMBIENT GLOW ── */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{background:'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)'}}></div>
      <div className="absolute bottom-20 right-0 w-64 h-64 rounded-full pointer-events-none" style={{background:'radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)'}}></div>

      {/* ── HEADER ── */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-8 pb-4 shrink-0">
        <button onClick={() => navigate('explore')}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-white/5 border-2 border-white/10 hover:scale-110 transition-transform active:scale-95 shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div className="text-center">
          <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.4em] mb-1" style={{fontFamily: "'Baloo 2', sans-serif"}}>BonBon Studios</p>
          <h1 className="text-white text-2xl leading-none" style={{fontFamily: "'Fredoka One', cursive"}}>World Hub</h1>
        </div>
        <button onClick={() => navigate('login')}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-amber-500/10 border-2 border-amber-500/20 shadow-lg animate-pulse">🔑</button>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-6 custom-scrollbar">
        
        {/* ROTATING HERO BANNER (4-HOUR CYCLE) */}
        <div className={`relative transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="absolute -inset-1 bg-amber-400/20 rounded-[3rem] blur-xl opacity-30"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl h-[450px]">
             {/* THE ROTATING POSTER IMAGE */}
             <img src={currentPoster} className="absolute inset-0 w-full h-full object-cover animate-pulse-slow" alt="Rotating Hero" />
             
             {/* OVERLAY CONTENT */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                <p className="text-amber-300 text-[10px] font-black uppercase tracking-[0.5em] mb-2" style={{fontFamily: "'Baloo 2', sans-serif"}}>Featured Imperial Tale</p>
                <h2 className="text-white text-4xl leading-tight mb-6" style={{fontFamily: "'Fredoka One', cursive"}}>Welcome to<br/><span className="text-amber-400">ChocoBrook!</span></h2>
                
                <div className="flex gap-3">
                  <button onClick={() => navigate('theatre')}
                    className="flex-1 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
                    style={{fontFamily: "'Fredoka One', cursive", background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#1c0a00'}}>
                    🎬 Watch Now
                  </button>
                  <button onClick={() => navigate('cast')}
                    className="flex-1 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 border-2 border-white/20 bg-white/5 text-white backdrop-blur-md"
                    style={{fontFamily: "'Fredoka One', cursive"}}>
                    🦸 Cast
                  </button>
                </div>
             </div>
          </div>
        </div>

        {/* Live Ticker */}
        <div className="rounded-3xl p-5 flex items-center gap-4 border-2 relative overflow-hidden" style={{background:'rgba(251,191,36,0.08)', borderColor:'rgba(251,191,36,0.15)'}}>
          <div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center border border-red-400/50 shrink-0 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-amber-300/60 text-[9px] font-black uppercase tracking-[0.3em] mb-1" style={{fontFamily:"'Baloo 2', sans-serif"}}>Imperial News Ticker</p>
            <p className="text-amber-100 text-xs font-bold leading-snug" style={{fontFamily: "'Baloo 2', sans-serif"}}>
              {REALM_NEWS[newsIdx]}
            </p>
          </div>
        </div>

        {/* Explore Hub Shortcut */}
        <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border-2 border-white/10 flex items-center justify-between shadow-2xl">
           <div className="text-left">
              <h3 className="text-white text-xl font-black" style={{fontFamily: "'Fredoka One', cursive"}}>Imperial Hub</h3>
              <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-1">Navigate the 17 Towns</p>
           </div>
           <button onClick={() => navigate('explore')} className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-2xl shadow-xl active:scale-90 transition-all">🗺️</button>
        </div>

        {/* Footer Link Filler */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          {[
            { label: 'Leaders', emoji: '🏆', page: 'leaders' as PageId, color: '#fbbf24' },
            { label: 'Coins', emoji: '🪙', page: 'coins' as PageId, color: '#38bdf8' },
            { label: 'Theatre', emoji: '🎬', page: 'theatre' as PageId, color: '#f472b6' }
          ].map((item) => (
            <button key={item.label} onClick={() => navigate(item.page)}
              className="flex flex-col items-center gap-2 p-5 rounded-[2rem] border-2 bg-white/5 border-white/5 hover:border-white/10 transition-all active:scale-95">
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60" style={{fontFamily: "'Baloo 2', sans-serif"}}>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="text-center py-10 opacity-20">
          <p className="text-xs text-white font-black uppercase tracking-[0.5em]" style={{fontFamily: "'Baloo 2', sans-serif"}}>© 2026 toffeetowns.fun</p>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        @keyframes pulseSlow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .animate-pulse-slow { animation: pulseSlow 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
