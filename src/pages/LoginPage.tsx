import React, { useState, useEffect } from 'react';
import type { PageId } from '../types/navigation';
import { useEconomy } from '../contexts/EconomyContext';

export default function LoginPage({ navigate }: { navigate: (page: PageId) => void }) {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'home' | 'login' | 'register'>('home');
  const [username, setUsername] = useState(localStorage.getItem('dev_user') || '');
  const [password, setPassword] = useState(localStorage.getItem('dev_pass') || '');
  const { grantInitialCoins } = useEconomy();
  
  useEffect(() => {
    setMounted(true);
    
    // Developer Auto-Login Logic
    const autoLogin = localStorage.getItem('dev_autologin');
    if (autoLogin === 'true' && username && password) {
      setTimeout(() => {
        navigate('explore');
      }, 1000);
    }
  }, [navigate, username, password]);

  const handleLoginAction = () => {
    localStorage.setItem('dev_user', username);
    localStorage.setItem('dev_pass', password);
    localStorage.setItem('dev_autologin', 'true');
    
    if (view === 'register') {
      grantInitialCoins();
    }
    navigate('explore');
  };

  return (
    <div className={`w-full h-full min-h-screen relative flex flex-col overflow-hidden transition-colors duration-1000 ${view === 'home' ? 'bg-[#b5c7d6]' : 'bg-[#0a0a0f]'}`}>
      
      {/* ========================================= */}
      {/* ── BACKGROUNDS (DYNAMIC BASED ON VIEW) ── */}
      {/* ========================================= */}

      {/* 1. HOME BACKGROUND (Full-Screen App Opening Image) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 bg-black ${view === 'home' ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none -z-10'} overflow-hidden`}>
        {/* Actual Image, filling top to bottom, aligned to top */}
        <img 
          src="/Images/App_Opening.png" 
          alt="Toffeetowns Opening" 
          className="absolute inset-0 w-full h-full object-cover object-top z-10"
        />
        {/* Subtle gradient overlay at the bottom only for the buttons */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* 2. LOGIN/REGISTER BACKGROUND (Dark with 3D Golden Shapes) */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${view !== 'home' ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
        {/* Top Right Black Sphere */}
        <div className="absolute top-10 right-10 w-24 h-24 rounded-full shadow-2xl animate-float-slow" 
          style={{ background: 'radial-gradient(circle at 30% 30%, #4a4a4a, #000000)' }}>
        </div>
        
        {/* Top Left Golden Cone */}
        <div className="absolute top-20 -left-10 w-40 h-40 animate-float" 
          style={{ 
            background: 'linear-gradient(135deg, #fcd34d 0%, #d97706 100%)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transform: 'rotate(-25deg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
        </div>

        {/* Bottom Right Golden Torus */}
        <div className="absolute bottom-10 -right-20 w-64 h-64 rounded-full border-[40px] border-amber-500 animate-float-slow" 
          style={{ 
            borderColor: '#d97706',
            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
            transform: 'rotate(-45deg)',
            boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.5)'
          }}>
          <div className="absolute inset-0 rounded-full border-[40px] border-amber-300 opacity-50 blur-sm mix-blend-overlay"></div>
        </div>

        {/* Bottom Left Golden Sphere */}
        <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full animate-float shadow-[0_20px_40px_rgba(0,0,0,0.6)]" 
          style={{ background: 'radial-gradient(circle at 30% 30%, #fde68a, #d97706)' }}>
        </div>
      </div>

      {/* ========================================= */}
      {/* ── FOREGROUND CONTENT ── */}
      {/* ========================================= */}

      <div className={`relative z-20 flex-1 flex flex-col w-full h-full transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
        
        {/* ========================================= */}
        {/* ── HOME VIEW (App Opening Image Overlay) ── */}
        {/* ========================================= */}
        {view === 'home' && (
          <div className="w-full h-full flex flex-col justify-between px-6 pt-16 pb-12 animate-fade-in-up relative z-20">
            
            {/* Title Section - Adjusted for perfect fit */}
            <div className="flex flex-col items-center justify-center text-center mt-6 w-full px-2">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,1)] bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm" style={{fontFamily: "'Baloo 2', sans-serif"}}>
                Bonbon Studios presents
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-wider w-full text-center" 
                  style={{
                    fontFamily: "'Fredoka One', cursive",
                    textShadow: "0 6px 15px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.4)"
                  }}>
                Toffeetowns
              </h1>
            </div>

            {/* Bottom Actions Section - Glassy & Beautiful */}
            <div className="w-full mx-auto mt-auto flex flex-row gap-4 pt-10">
              <button
                onClick={() => setView('login')}
                className="flex-1 bg-white/70 backdrop-blur-lg border-2 border-white text-pink-600 font-black py-4 rounded-[2rem] text-[15px] tracking-[0.2em] uppercase shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:bg-white active:scale-95 transition-all"
                style={{fontFamily: "'Fredoka One', cursive"}}
              >
                LOGIN
              </button>
              <button
                onClick={() => setView('register')}
                className="flex-1 bg-gradient-to-r from-rose-400/80 to-pink-500/80 backdrop-blur-lg border-2 border-pink-200 text-white font-black py-4 rounded-[2rem] text-[15px] tracking-[0.2em] uppercase shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all"
                style={{fontFamily: "'Fredoka One', cursive"}}
              >
                REGISTER
              </button>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* ── LOGIN / REGISTER VIEW (Dark Glass) ── */}
        {/* ========================================= */}
        {(view === 'login' || view === 'register') && (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 animate-fade-in-up relative perspective-1000">
            
            {/* THE PREMIUM GLASS PANEL */}
            <div 
              className="w-full max-w-[400px] bg-white/5 backdrop-blur-[24px] border border-white/20 rounded-[2rem] p-12 relative overflow-hidden"
              style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.05)' }}
            >
              
              {/* Subtle inner reflection */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
              
              <h2 className="text-4xl text-white text-center mb-12 tracking-[0.1em] drop-shadow-lg" style={{fontFamily: "'Playfair Display', serif", fontWeight: 400}}>
                {view === 'login' ? 'LOGIN' : 'REGISTER'}
              </h2>

              <div className="flex flex-col gap-10 relative z-10">
                {/* Username Input */}
                <div className="relative group">
                  <label className="absolute -top-5 left-0 text-[10px] font-sans text-white/70 uppercase tracking-widest transition-all group-focus-within:text-white group-focus-within:-top-6">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="custom-input w-full bg-transparent border-b border-white/30 py-2 text-white font-sans outline-none focus:border-white transition-all text-sm rounded-none"
                    autoComplete="off"
                  />
                </div>
                
                {/* Password Input */}
                <div className="relative group">
                  <label className="absolute -top-5 left-0 text-[10px] font-sans text-white/70 uppercase tracking-widest transition-all group-focus-within:text-white group-focus-within:-top-6">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input w-full bg-transparent border-b border-white/30 py-2 text-white font-sans outline-none focus:border-white transition-all text-sm rounded-none"
                    autoComplete="new-password"
                  />
                </div>

                {/* Confirm Password Input (Only for Register) */}
                {view === 'register' && (
                  <div className="relative group">
                    <label className="absolute -top-5 left-0 text-[10px] font-sans text-white/70 uppercase tracking-widest transition-all group-focus-within:text-white group-focus-within:-top-6">Confirm Password</label>
                    <input
                      type="password"
                      className="custom-input w-full bg-transparent border-b border-white/30 py-2 text-white font-sans outline-none focus:border-white transition-all text-sm rounded-none"
                    />
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={handleLoginAction}
                  className="w-full mt-4 py-4 bg-white text-black font-black text-[14px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.3)] rounded-sm"
                  style={{fontFamily: "'Nunito', sans-serif"}}
                >
                  {view === 'login' ? 'SIGN IN' : 'SIGN UP'}
                </button>
              </div>

              {/* Dots / Navigation */}
              <div className="flex justify-center items-center gap-3 mt-10">
                <button 
                  onClick={() => setView('home')}
                  className={`w-2.5 h-2.5 rounded-full transition-all border border-white/50 ${view as string === 'home' ? 'bg-white scale-125' : 'bg-transparent hover:bg-white/30'}`}
                />
                <button 
                  onClick={() => setView('login')}
                  className={`w-2.5 h-2.5 rounded-full transition-all border border-white/50 ${view === 'login' ? 'bg-white scale-125' : 'bg-transparent hover:bg-white/30'}`}
                />
                <button 
                  onClick={() => setView('register')}
                  className={`w-2.5 h-2.5 rounded-full transition-all border border-white/50 ${view === 'register' ? 'bg-white scale-125' : 'bg-transparent hover:bg-white/30'}`}
                />
              </div>
            </div>
            
            {/* Back Button (Text) */}
            <button 
              onClick={() => setView('home')}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white/40 text-[11px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors z-40"
              style={{fontFamily: "'Nunito', sans-serif"}}
            >
              ← Back to Home
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-25deg); }
          50% { transform: translateY(-20px) rotate(-20deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(-45deg); }
          50% { transform: translateY(15px) rotate(-50deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        
        /* FIX FOR UGLY BROWSER AUTOFILL BACKGROUNDS */
        .custom-input:-webkit-autofill,
        .custom-input:-webkit-autofill:hover, 
        .custom-input:-webkit-autofill:focus, 
        .custom-input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px transparent inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}



