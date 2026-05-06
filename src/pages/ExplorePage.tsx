import React, { useState, useEffect } from 'react';
import type { PageId } from '../types/navigation';
import { KINGDOM_DATA } from '../data/kingdomData';

const pages: {
  id: PageId; label: string; emoji: string; desc: string;
  from: string; to: string;
}[] = [
    { id: 'home',    label: 'ToffeeTown Home', emoji: '🏡', desc: 'The Golden Gate', from: '#0ea5e9', to: '#2dd4bf' },
    { id: 'theatre', label: 'Theatre Deck',    emoji: '🎬', desc: 'Reels & Legends', from: '#6366f1', to: '#a855f7' },
    { id: 'games',   label: 'Games Arena',     emoji: '🎮', desc: 'Challenges & Coins', from: '#10b981', to: '#3b82f6' },
    { id: 'cast',    label: 'Cast & Heroes',   emoji: '🦸', desc: 'Dossiers of Legends', from: '#f59e0b', to: '#ef4444' },
    { id: 'leaders', label: 'Leaderboard',     emoji: '🏆', desc: 'Grand Champions', from: '#94a3b8', to: '#475569' },
    { id: 'coins',   label: 'Coin Bank',       emoji: '🪙', desc: 'Imperial Wealth', from: '#fbbf24', to: '#d97706' },
  ];

function TiltCard({ page, index, onClick }: { page: any; index: number; onClick: () => void; }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onClick={onClick}
      className={`w-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer active:-translate-y-3 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div
        className="relative w-full overflow-hidden rounded-[2.5rem] border-2 border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] border-b-8 transition-all hover:-translate-y-1 active:border-b-2"
        style={{ height: '90px', background: `linear-gradient(135deg, ${page.from}, ${page.to})`, borderBottomColor: 'rgba(0,0,0,0.3)' }}
      >
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
           <svg width="100%" height="100%"><path d="M-100 100 L100 -100 M 0 100 L 200 -100" stroke="white" strokeWidth="20" fill="none" opacity="0.1"/></svg>
        </div>
        <div className="relative z-10 flex items-center gap-5 h-full px-8">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-4xl shadow-inner border border-white/30 shrink-0">
             {page.emoji}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-xl leading-tight text-white font-black drop-shadow-lg" style={{ fontFamily: "'Fredoka One', cursive" }}>{page.label}</h3>
            <p className="text-[10px] font-black text-white/70 tracking-widest uppercase truncate" style={{ fontFamily: "'Baloo 2', sans-serif" }}>{page.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage({ navigate }: { navigate: (page: PageId) => void }) {
  const [expandedCounty, setExpandedCounty] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center bg-[#0d2b31]">
      
      {/* ── MODERN CRISS-CROSS BACKGROUND (LONG SWEEPING LINES) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] via-[#0d2b31] to-[#1d4ed8] opacity-90" />
        
        {/* LARGE ASYMMETRIC CRISS-CROSS OVERLAY */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#22d3ee" />
               <stop offset="50%" stopColor="#4ade80" />
               <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <pattern id="modern-x" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
               <line x1="0" y1="0" x2="200" y2="200" stroke="url(#line-grad)" strokeWidth="1" />
               <line x1="200" y1="0" x2="0" y2="200" stroke="url(#line-grad)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#modern-x)" />
        </svg>

        {/* Dynamic Sweeping Glows */}
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[100%] border-[1px] border-white/5 rounded-[50%] blur-[1px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[100%] border-[1px] border-white/5 rounded-[50%] blur-[1px]" />
      </div>

      <div className="flex-1 w-full overflow-y-auto custom-scrollbar px-6 pt-24 pb-12 relative z-10">
        
        {/* ── HEADER ── */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-3 mb-6 shadow-xl">
            <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em]" style={{ fontFamily: "'Fredoka One', cursive" }}>Imperial Hub</p>
          </div>
          <h1 className="text-4xl text-white font-black mb-3 tracking-tighter" style={{ fontFamily: "'Fredoka One', cursive" }}>Toffee Town Hub 🌌</h1>
          <p className="text-white/60 text-sm font-bold" style={{ fontFamily: "'Baloo 2', sans-serif" }}>Imperial Legends of 17 Towns</p>
        </div>

        {/* ── 3D BUTTONS ── */}
        <div className="space-y-6 mb-20">
          {pages.map((page, index) => (
            <TiltCard key={page.id} page={page} index={index} onClick={() => navigate(page.id)} />
          ))}
        </div>

        {/* ── 3 ROWS OF STATISTICS (MODERN CONTAINERS) ── */}
        <div className="space-y-12 mb-24 px-2">
          
          {/* ROW 1: IMPERIAL ASSETS */}
          <div className="bg-black/20 backdrop-blur-3xl p-10 rounded-[3.5rem] border-2 border-white/10 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#modern-x)" /></svg>
             </div>
             <h4 className="text-emerald-400 text-[11px] font-black uppercase tracking-[0.4em] text-center mb-10 relative z-10" style={{ fontFamily: "'Fredoka One', cursive" }}>Imperial Assets</h4>
             <div className="grid grid-cols-4 gap-2 relative z-10">
               {[{ v: '3', l: 'Ports', e: '⚓' }, { v: '3', l: 'Agri', e: '🌾' }, { v: '3', l: 'Mines', e: '⛏️' }, { v: '4', l: 'Nodes', e: '⚒️' }].map((s,i) => (
                  <div key={i} className="flex flex-col items-center">
                     <span className="text-4xl mb-4 drop-shadow-2xl">{s.e}</span>
                     <p className="text-white font-black text-4xl leading-none drop-shadow-xl">{s.v}</p>
                     <p className="text-[9px] text-white/50 uppercase font-black mt-2 tracking-widest text-center">{s.l}</p>
                  </div>
               ))}
             </div>
          </div>

          {/* ROW 2: NATURE & WONDERS */}
          <div className="bg-black/20 backdrop-blur-3xl p-10 rounded-[3.5rem] border-2 border-white/10 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#modern-x)" /></svg>
             </div>
             <h4 className="text-cyan-400 text-[11px] font-black uppercase tracking-[0.4em] text-center mb-10 relative z-10" style={{ fontFamily: "'Fredoka One', cursive" }}>Nature & Wonders</h4>
             <div className="grid grid-cols-4 gap-2 relative z-10">
               {[{ v: '3', l: 'Falls', e: '🌊' }, { v: '2', l: 'Peaks', e: '⛰️' }, { v: '2', l: 'Sands', e: '🏖️' }, { v: '1', l: 'Lake', e: '🛶' }].map((s,i) => (
                  <div key={i} className="flex flex-col items-center">
                     <span className="text-4xl mb-4 drop-shadow-2xl">{s.e}</span>
                     <p className="text-white font-black text-4xl leading-none drop-shadow-xl">{s.v}</p>
                     <p className="text-[9px] text-white/50 uppercase font-black mt-2 tracking-widest text-center">{s.l}</p>
                  </div>
               ))}
             </div>
          </div>

          {/* ROW 3: CITIZEN CLANS */}
          <div className="bg-black/20 backdrop-blur-3xl p-10 rounded-[3.5rem] border-2 border-white/10 relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#modern-x)" /></svg>
             </div>
             <h4 className="text-amber-400 text-[11px] font-black uppercase tracking-[0.4em] text-center mb-10 relative z-10" style={{ fontFamily: "'Fredoka One', cursive" }}>Citizen Clans</h4>
             <div className="grid grid-cols-4 gap-2 relative z-10">
               {[{ v: '12', l: 'Bosses', e: '👑' }, { v: '12', l: 'Rebels', e: '✊' }, { v: '2', l: 'Clans', e: '🛡️' }, { v: '17', l: 'Towns', e: '🏘️' }].map((s,i) => (
                  <div key={i} className="flex flex-col items-center">
                     <span className="text-4xl mb-4 drop-shadow-2xl">{s.e}</span>
                     <p className="text-white font-black text-4xl leading-none drop-shadow-xl">{s.v}</p>
                     <p className="text-[9px] text-white/50 uppercase font-black mt-2 tracking-widest text-center">{s.l}</p>
                  </div>
               ))}
             </div>
          </div>

        </div>

        {/* ── 4 COUNTIES ── */}
        <div className="space-y-8 mb-24">
          <h4 className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] text-center mb-10" style={{ fontFamily: "'Fredoka One', cursive" }}>County Spotlight</h4>
          {KINGDOM_DATA.map((c) => {
            const isExpanded = expandedCounty === c.name;
            return (
              <div key={c.name} onClick={() => setExpandedCounty(isExpanded ? null : c.name)} 
                className="group bg-black/20 backdrop-blur-3xl rounded-[3.5rem] border-2 border-white/10 overflow-hidden transition-all shadow-xl mb-8 relative">
                <div className="h-[100px] flex items-center gap-6 px-10 cursor-pointer relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-2xl transition-all group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${c.color}, #000)` }}>
                    {c.emoji}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Fredoka One', cursive" }}>{c.name}</h3>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">{c.desc}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <span className="text-white text-xl">↓</span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-10 pb-12 pt-4 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-700 relative z-10">
                    {c.towns.map((town, idx) => (
                      <div key={idx} className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 text-left flex items-center justify-between shadow-inner">
                        <div className="flex items-center gap-5">
                           <div className="w-1.5 h-10 rounded-full bg-cyan-400" />
                           <div><h5 className="text-[15px] font-black text-white leading-tight" style={{ fontFamily: "'Fredoka One', cursive" }}>{town.name}</h5></div>
                        </div>
                        <span className="text-white/20 font-black text-xl">→</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── FOOTER ── */}
        <div className="pt-12 pb-6 px-8 text-center border-t border-white/5">
          <div className="bg-cyan-400/10 border-2 border-cyan-400/20 rounded-[3rem] p-8 mb-10">
             <p className="text-cyan-400 text-[11px] font-black uppercase tracking-[0.4em] mb-4">Imperial Disclaimer</p>
             <p className="text-white font-black text-[12px] leading-relaxed">
               All digital BonBons are the property of BonBon Studios and the ChocoBrook Crown. Any unauthorized duplication is strictly prohibited by the Imperial Council.
             </p>
          </div>
          <p className="text-[12px] font-black uppercase tracking-[0.5em] text-white/40">© 2026 toffeetowns.fun</p>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; height: 0px; }
      `}</style>
    </div>
  );
}
