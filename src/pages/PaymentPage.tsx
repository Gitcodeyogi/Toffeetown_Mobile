import React, { useState } from 'react';
import type { PageId } from '../types/navigation';

export default function PaymentPage({ navigate }: { navigate: (page: PageId) => void }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('coins');
      }, 2000);
    }, 2500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#050508] overflow-hidden relative">
      
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="flex-1 w-full flex flex-col pt-32 px-8 relative z-10 animate-fadeIn">
        
        <div className="text-center mb-12">
          <button onClick={() => navigate('coins')} className="absolute top-10 left-8 text-amber-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
             <span>← Back to Shop</span>
          </button>
          <h1 className="text-4xl text-white font-black mb-2 tracking-tighter" style={{ fontFamily: "'Fredoka One', cursive" }}>Imperial Checkout</h1>
          <p className="text-amber-500/40 text-[9px] font-black uppercase tracking-[0.4em]">Secure Imperial Gateway</p>
        </div>

        {isSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-fadeIn">
             <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-5xl mb-8 animate-bounce shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                ✅
             </div>
             <h2 className="text-3xl text-white font-black mb-4 uppercase italic" style={{ fontFamily: "'Fredoka One', cursive" }}>Success!</h2>
             <p className="text-amber-200/50 text-sm font-bold">Your imperial coins are being delivered...</p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-10">
            <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border-2 border-white/10 shadow-2xl space-y-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Card Number</label>
                  <input required type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-5 px-6 text-white text-sm font-bold focus:border-amber-500 transition-all outline-none shadow-inner" />
               </div>
               
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Expiry</label>
                     <input required type="text" placeholder="MM / YY" className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-5 px-6 text-white text-sm font-bold focus:border-amber-500 transition-all outline-none shadow-inner" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">CVV</label>
                     <input required type="password" placeholder="***" className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-5 px-6 text-white text-sm font-bold focus:border-amber-500 transition-all outline-none shadow-inner" />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Cardholder Name</label>
                  <input required type="text" placeholder="NAME ON CARD" className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-5 px-6 text-white text-sm font-bold focus:border-amber-500 transition-all outline-none shadow-inner uppercase" />
               </div>
            </div>

            <button 
              disabled={isProcessing}
              type="submit"
              className="w-full py-8 rounded-[3rem] bg-gradient-to-b from-amber-400 to-amber-600 text-black text-[14px] font-black uppercase tracking-[0.2em] shadow-[0_30px_70px_rgba(245,158,11,0.4)] active:scale-95 transition-all flex items-center justify-center gap-4 border-t-2 border-white/20 disabled:opacity-50"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              {isProcessing ? 'Verifying Imperial Seals...' : 'Authorize Transaction 🪙'}
            </button>
            
            <p className="text-center text-white/10 text-[9px] font-black uppercase tracking-widest italic">Imperial Seal of Security 🛡️</p>
          </form>
        )}

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
