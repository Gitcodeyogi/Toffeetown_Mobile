import React, { useState } from 'react';
import type { PageId } from '../types/navigation';

const PACKAGES = [
  { id: 'p1', label: 'Handful of Sweets',   coins: 300,  price: 'Rs. 149', bonus: null, emoji: '🍬', color: 'from-amber-400 to-orange-500' },
  { id: 'p2', label: 'Sack of Sweets',      coins: 600,  price: 'Rs. 299', bonus: null, emoji: '🛍️', color: 'from-orange-500 to-red-500' },
  { id: 'p3', label: 'Cart Full of Sweets', coins: 1000, price: 'Rs. 499', bonus: '100 Bonus', emoji: '🛒', color: 'from-purple-600 to-blue-600' },
];

export default function CoinsPage({ navigate }: { navigate: (page: PageId) => void }) {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0f] overflow-hidden relative">
      
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[150px] opacity-20" />
        
        {/* CROSS LINES PATTERN */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="coins-x-modern-3" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 60 M 0 0 L 60 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#coins-x-modern-3)" />
        </svg>
      </div>

      {/* ── SPLASH HOME PAGE ── */}
      {!isEntered ? (
        <div className="flex-1 w-full flex flex-col items-center justify-center px-10 relative z-20 animate-fadeIn">
          <div className="w-64 h-64 relative mb-16 group">
             <div className="absolute inset-0 bg-amber-600 blur-[100px] opacity-40 rounded-full animate-pulse group-hover:opacity-60 transition-all"></div>
             <div className="w-full h-full bg-white/5 backdrop-blur-3xl rounded-[3rem] border-2 border-white/20 flex items-center justify-center text-7xl shadow-2xl relative z-10">
                🪙
             </div>
          </div>
          
          <div className="text-center mb-16">
            <h1 className="text-5xl text-white font-black mb-4 tracking-tighter" style={{ fontFamily: "'Fredoka One', cursive" }}>Coin Bank</h1>
            <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.6em]" style={{ fontFamily: "'Baloo 2', sans-serif" }}>Imperial Treasury of ChocoBrook</p>
          </div>

          <button 
            onClick={() => setIsEntered(true)}
            className="w-full py-8 rounded-[2.5rem] bg-amber-600 text-white text-[15px] font-black uppercase tracking-[0.3em] shadow-[0_25px_80px_rgba(217,119,6,0.5)] active:scale-95 transition-all flex items-center justify-center gap-4 border-2 border-white/30"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            Open Vault <span className="text-2xl">🗝️</span>
          </button>
        </div>
      ) : (
        /* ── MAIN COINS CONTENT ── */
        <div className="flex-1 w-full flex flex-col pt-24 pb-12 px-6 relative z-10 animate-fadeIn overflow-y-auto custom-scrollbar">
            <div className="text-center mb-10">
               <h1 className="text-4xl text-white font-black mb-2 tracking-tighter" style={{ fontFamily: "'Fredoka One', cursive" }}>Imperial Vault</h1>
               <p className="text-white/40 text-xs font-black uppercase tracking-widest">Your Current Balance</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border-2 border-white/10 shadow-2xl flex flex-col items-center mb-12">
               <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl">💰</span>
                  <p className="text-white font-black text-5xl tracking-tighter">1,240</p>
               </div>
               <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest">Imperial Coins Secured</p>
            </div>

            <h2 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-center" style={{ fontFamily: "'Fredoka One', cursive" }}>Purchase More Sweets</h2>

            <div className="space-y-6 mb-12">
               {PACKAGES.map((pkg) => (
                  <button 
                    key={pkg.id}
                    onClick={() => navigate('payment')}
                    className="w-full relative overflow-hidden rounded-[2.5rem] border-2 border-white/10 shadow-2xl active:scale-95 transition-all group"
                  >
                     <div className={`absolute inset-0 bg-gradient-to-r ${pkg.color} opacity-80 group-hover:opacity-100 transition-all`} />
                     <div className="absolute inset-0 opacity-[0.1]">
                        <svg width="100%" height="100%"><path d="M-100 100 L100 -100 M 0 100 L 200 -100" stroke="white" strokeWidth="20" fill="none" /></svg>
                     </div>
                     <div className="relative z-10 flex items-center justify-between p-6 px-8">
                        <div className="flex items-center gap-5">
                           <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-3xl shadow-inner">
                              {pkg.emoji}
                           </div>
                           <div className="text-left">
                              <h3 className="text-white font-black text-lg leading-tight">{pkg.label}</h3>
                              <div className="flex items-center gap-2">
                                 <p className="text-white font-black uppercase text-[14px]">{pkg.coins}</p>
                                 {pkg.bonus && <span className="bg-white text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse">{pkg.bonus}</span>}
                              </div>
                           </div>
                        </div>
                        <div className="bg-white/20 px-5 py-3 rounded-2xl border border-white/30">
                           <span className="text-white font-black text-sm">{pkg.price}</span>
                        </div>
                     </div>
                  </button>
               ))}
            </div>

            <div className="pt-10 border-t border-white/5 text-center">
               <p className="text-white/20 text-[9px] font-black uppercase tracking-widest">Secure Payments via Imperial Gateway</p>
            </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
