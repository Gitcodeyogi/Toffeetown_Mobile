import React from 'react';
import type { PageId } from '../types/navigation';
import { useEconomy } from '../contexts/EconomyContext';

export default function ProfilePage({ navigate }: { navigate: (page: PageId) => void }) {
  const { coins, transactions } = useEconomy();

  const stats = [
    { label: 'Toffee Coins', val: coins.toLocaleString(), emoji: '🪙', color: '#ea580c' },
    { val: '42', label: 'Stars Earned', emoji: '⭐', color: '#7c3aed' },
    { label: 'Towns Visited', val: '7', emoji: '🏡', color: '#16a34a' },
    { val: '12', label: 'Stickers', emoji: '✨', color: '#db2777' },
  ];

  const stickers = [
    { emoji: '🍦', name: 'Creamwood Explorer' },
    { emoji: '🍫', name: 'Cocoa Knight' },
    { emoji: '🍯', name: 'Honey Scout' },
    { emoji: '🌰', name: 'Nutwood Nomad' },
    { emoji: '🍬', name: 'Sugar Seeker' },
    { emoji: '👑', name: 'Grand Traveler' },
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative bg-white/10 backdrop-blur-sm">
      
      {/* Soft Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-200 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-rose-200 rounded-full blur-[100px]" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pt-12 pb-36 relative z-10 text-center">
        
        {/* Profile Card (Glass Panel) */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border-2 border-white/60 p-8 shadow-xl mb-10">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-[2.5rem] bg-white p-1 rotate-3 shadow-xl">
                <div className="w-full h-full rounded-[2.2rem] bg-amber-50 flex items-center justify-center text-5xl">
                  👦
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-xl shadow-lg border-2 border-white text-white">
                ✨
              </div>
            </div>
            <h1 className="text-3xl text-amber-900 font-black tracking-tight mb-1" style={{ fontFamily: "'Fredoka One', cursive" }}>Milo Hero</h1>
            <p className="text-amber-700/60 text-[10px] font-black uppercase tracking-[0.4em]" style={{ fontFamily: "'Baloo 2', sans-serif" }}>Master Traveler · Lvl 12</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md border-2 border-white/80 p-5 rounded-[2.5rem] shadow-sm flex flex-col items-center">
              <div className="text-2xl mb-2 drop-shadow-sm">{s.emoji}</div>
              <div className="text-2xl font-black leading-none mb-1" style={{ color: s.color, fontFamily: "'Fredoka One', cursive" }}>{s.val}</div>
              <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500" style={{ fontFamily: "'Baloo 2', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Transaction Ledger */}
        <div className="bg-white/30 backdrop-blur-md rounded-[2.5rem] border-2 border-white/50 p-6 text-left mb-10">
          <h3 className="text-amber-900 text-lg font-black mb-6 flex items-center justify-between" style={{ fontFamily: "'Fredoka One', cursive" }}>
            <span>Coin Ledger</span>
            <span className="text-[10px] bg-amber-900/10 px-3 py-1 rounded-full text-amber-900/60 uppercase tracking-widest">{transactions.length} Records</span>
          </h3>
          
          {transactions.length === 0 ? (
            <div className="text-center py-6 text-amber-900/40 text-xs font-black uppercase tracking-widest" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              No transactions yet
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-white/50 border border-white/60 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-amber-900 font-black text-sm" style={{ fontFamily: "'Baloo 2', sans-serif" }}>{tx.description}</span>
                    <span className="text-amber-700/50 text-[9px] uppercase tracking-wider font-bold">
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`font-black text-lg ${tx.amount > 0 ? 'text-emerald-500' : 'text-rose-500'}`} style={{ fontFamily: "'Fredoka One', cursive" }}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticker Collection */}
        <div className="bg-white/30 backdrop-blur-md rounded-[2.5rem] border-2 border-white/50 p-6 text-left mb-10">
          <h3 className="text-amber-900 text-lg font-black mb-6 flex items-center justify-between" style={{ fontFamily: "'Fredoka One', cursive" }}>
            <span>Sticker Book</span>
            <span className="text-[10px] bg-amber-900/10 px-3 py-1 rounded-full text-amber-900/60 uppercase tracking-widest">6 / 24 Collected</span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {stickers.map((s, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-white/40 border border-white/60 flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform shadow-sm">
                <span className="text-3xl mb-1 filter grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all drop-shadow-md">{s.emoji}</span>
                <span className="text-[8px] text-center font-black uppercase text-amber-900/40 leading-tight" style={{ fontFamily: "'Baloo 2', sans-serif" }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => navigate('login')}
          className="w-full py-5 rounded-[2rem] bg-rose-500 text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Logout of Realm
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
      `}</style>
    </div>
  );
}
