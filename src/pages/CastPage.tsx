import React, { useState, useEffect } from 'react';
import type { PageId } from '../types/navigation';
import { BOSSES, REBELS } from '../data/chocobrookData';

function FlipCard({ char, isSelected, onClose, onClick }: { char: any, isSelected: boolean, onClose?: () => void, onClick: () => void }) {
  const [backTab, setBackTab] = useState<'stats' | 'details' | 'lore'>('details');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`relative w-full transition-all duration-700 preserve-3d ${isSelected ? 'h-[75vh] w-full max-w-lg z-50' : 'h-[280px] z-10 cursor-pointer mb-8'}`}
      style={{ perspective: '2000px' }}
      onClick={!isSelected ? onClick : undefined}
    >
      <div className={`relative w-full h-full transition-transform duration-1000 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* ── FRONT SIDE ── */}
        <div className="absolute inset-0 backface-hidden rounded-[3rem] border-2 overflow-hidden bg-zinc-950 flex flex-col shadow-2xl"
          style={{ borderColor: isSelected ? char.color : 'rgba(255,255,255,0.1)' }}>
          
          {isSelected && onClose && (
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white text-2xl backdrop-blur-md active:scale-90 transition-all"
            >
              ×
            </button>
          )}

          <div className={`${isSelected ? 'h-[65%]' : 'h-full'} w-full relative flex items-center justify-center bg-black/20 overflow-hidden`}>
            {char.image ? (
              <img src={char.image} alt={char.name} className="w-full h-full object-cover object-top" />
            ) : (
              <div className="text-6xl drop-shadow-lg">{char.emoji}</div>
            )}
            {!isSelected && (
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                 <h3 className="text-white text-2xl font-black uppercase tracking-widest text-center" style={{ fontFamily: "'Fredoka One', cursive" }}>{char.name}</h3>
                 <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] text-center mt-1">{char.role}</p>
               </div>
            )}
          </div>

          {isSelected && (
            <div className="flex-1 w-full bg-zinc-900/90 flex flex-col items-center justify-center px-10 py-8 border-t border-white/5 relative">
              <h3 className="text-3xl text-white font-black uppercase tracking-tighter mb-2" style={{ fontFamily: "'Fredoka One', cursive" }}>{char.name}</h3>
              <p className="text-amber-400 text-sm font-bold italic mb-8">{char.tagline}</p>
              <button 
                onClick={handleFlip}
                className="w-full py-5 rounded-[2rem] bg-white text-zinc-950 text-[12px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Reveal Secrets ✨
              </button>
            </div>
          )}
        </div>

        {/* ── BACK SIDE ── */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[3rem] border-4 overflow-hidden bg-zinc-950 p-8 flex flex-col shadow-2xl"
          style={{ borderColor: char.color }}>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border-2 shadow-2xl" style={{ borderColor: char.color }}>
              <span className="text-4xl">{char.emoji}</span>
            </div>
            <div>
              <h3 className="text-white text-2xl leading-tight" style={{ fontFamily: "'Fredoka One', cursive" }}>{char.name}</h3>
              <p className="text-[11px] font-black uppercase tracking-[0.4em]" style={{ color: char.color }}>{char.role}</p>
            </div>
          </div>

          <div className="flex gap-2 bg-white/5 p-1 rounded-2xl mb-8">
            {(['details', 'lore', 'stats'] as const).map(t => (
              <button 
                key={t}
                onClick={(e) => { e.stopPropagation(); setBackTab(t); }}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${backTab === t ? 'bg-white text-zinc-950' : 'text-white/30'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar text-left pr-4">
            {backTab === 'details' && <p className="text-white/80 text-base leading-relaxed">{char.desc}</p>}
            {backTab === 'lore' && <p className="text-amber-400/80 text-lg italic leading-relaxed">"{char.quote}"</p>}
            {backTab === 'stats' && (
              <div className="space-y-6 pt-2">
                {[
                  { l: 'Power', v: char.stats.influence, c: char.color },
                  { l: 'Mischief', v: char.stats.mischief, c: '#fb923c' }
                ].map(s => (
                  <div key={s.l} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>{s.l}</span><span>{s.v}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5">
                      <div className="h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ width: `${s.v}%`, background: s.c }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleFlip} className="mt-8 py-4 rounded-2xl border-2 border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Back to Front</button>
        </div>
      </div>
    </div>
  );
}

export default function CastPage({ navigate }: { navigate: (page: PageId) => void }) {
  const [isEntered, setIsEntered] = useState(false);
  const [clan, setClan] = useState<'bosses' | 'rebels'>('bosses');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const data = clan === 'bosses' ? BOSSES : REBELS;

  return (
    <div className="w-full h-full flex flex-col bg-[#070708] overflow-hidden relative">
      
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[150px] opacity-20" />
        
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cast-x-fixed" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 40 M 0 0 L 40 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cast-x-fixed)" />
        </svg>
      </div>

      {/* ── SPLASH HOME PAGE ── */}
      {!isEntered ? (
        <div className="flex-1 w-full flex flex-col items-center justify-center px-10 relative z-20 animate-fadeIn">
          <div className="w-72 h-72 relative mb-16 group">
             <div className="absolute inset-0 bg-red-600 blur-[100px] opacity-30 rounded-full animate-pulse group-hover:opacity-50 transition-all"></div>
             <img src="/Images/asher_glow.png" className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" alt="Cast Hero" />
          </div>
          
          <div className="text-center mb-16">
            <h1 className="text-5xl text-white font-black mb-4 tracking-tighter" style={{ fontFamily: "'Fredoka One', cursive" }}>Cast and Heroes</h1>
            <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.6em]" style={{ fontFamily: "'Baloo 2', sans-serif" }}>Dossiers of Imperial Legends</p>
          </div>

          <button 
            onClick={() => setIsEntered(true)}
            className="w-full py-8 rounded-[2.5rem] bg-amber-500 text-black text-[15px] font-black uppercase tracking-[0.3em] shadow-[0_25px_80px_rgba(245,158,11,0.4)] active:scale-95 transition-all flex items-center justify-center gap-4 border-2 border-white/30"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Enter Archive <span className="text-2xl">📕</span>
          </button>
        </div>
      ) : (
        /* ── MAIN ARCHIVE CONTENT ── */
        <div className="flex-1 w-full flex flex-col pt-24 pb-40 relative z-10 animate-fadeIn">
          
          {/* TITLE & TABS */}
          <div className={`px-10 mb-12 transition-all ${selectedId ? 'opacity-0 scale-95 blur-md' : 'opacity-100'}`}>
            <h1 className="text-4xl text-white font-black mb-8 tracking-tighter uppercase" style={{ fontFamily: "'Fredoka One', cursive" }}>
               {clan === 'bosses' ? 'Bosses Clan' : 'Rebels Clan'}
            </h1>
            
          <div className="flex p-1.5 rounded-[2.2rem] bg-white/5 border-2 border-white/10 relative backdrop-blur-3xl shadow-2xl">
              <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-[1.8rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${clan === 'bosses' ? 'left-1.5 bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.6)]' : 'left-[calc(50%+4.5px)] bg-amber-600 shadow-[0_0_30px_rgba(217,119,6,0.6)]'}`}></div>
              <button onClick={() => setClan('bosses')} className="relative z-10 flex-1 py-4 text-center">
                <span className={`text-[11px] font-black uppercase tracking-widest transition-all ${clan === 'bosses' ? 'text-black' : 'text-white/20'}`} style={{ fontFamily: "'Fredoka One', cursive" }}>Bosses</span>
              </button>
              <button onClick={() => setClan('rebels')} className="relative z-10 flex-1 py-4 text-center">
                <span className={`text-[11px] font-black uppercase tracking-widest transition-all ${clan === 'rebels' ? 'text-black' : 'text-white/20'}`} style={{ fontFamily: "'Fredoka One', cursive" }}>Rebels</span>
              </button>
            </div>
          </div>

          {/* CHARACTER LIST (ONE BY ONE) */}
          <div className="flex-1 overflow-y-auto px-10 custom-scrollbar relative">
            
            {selectedId && (
              <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8 animate-fadeIn">
                <FlipCard 
                  char={data.find(c => c.id === selectedId)} 
                  isSelected={true} 
                  onClose={() => setSelectedId(null)}
                  onClick={() => setSelectedId(null)} 
                />
              </div>
            )}

            <div className={`flex flex-col gap-2 transition-all duration-700 ${selectedId ? 'blur-3xl opacity-0 scale-90' : 'opacity-100'}`}>
              {data.map((char, index) => (
                <FlipCard 
                  key={char.id} 
                  char={char} 
                  isSelected={false} 
                  onClick={() => setSelectedId(char.id)} 
                />
              ))}
            </div>
            
            <div className="text-center py-24 opacity-20">
              <p className="text-[10px] text-white font-black uppercase tracking-[1em]">Imperial Records © 2026</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
