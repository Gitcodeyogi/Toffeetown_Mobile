import React, { useState, useEffect } from 'react';
import type { Story } from '../data/theatreData';

interface TheatreStageProps {
  story: Story;
  onClose: () => void;
}

export default function TheatreStage({ story, onClose }: TheatreStageProps) {
  const [curtainRaised, setCurtainRaised] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Attempt system orientation lock (might fail in some previews)
    const lockOrientation = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
        }
      } catch (err) {
        console.warn('System orientation lock failed:', err);
      }
    };
    
    lockOrientation();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const handleExit = () => {
    if (!showFeedback && curtainRaised) {
      setShowFeedback(true);
    } else {
      onClose();
    }
  };

  // Forced Rotation Style for Previews
  const rotationStyle: React.CSSProperties = isPortrait ? {
    width: '100vh',
    height: '100vw',
    position: 'absolute',
    top: '0',
    left: '100vw',
    transform: 'rotate(90deg)',
    transformOrigin: 'top left',
    overflow: 'hidden'
  } : {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    overflow: 'hidden'
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black text-white overflow-hidden font-sans">
      
      {/* ── FORCED LANDSCAPE WRAPPER ── */}
      <div style={rotationStyle} className="flex flex-col">
        
        {/* ── STAGE CONTENT ── */}
        <div className={`absolute inset-0 flex flex-col transition-opacity duration-1000 ${curtainRaised ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Top Controls Overlay */}
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/90 to-transparent">
            <button 
              onClick={handleExit}
              className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-xl border-2 border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-2xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            
            <div className="text-center">
              <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.5em] mb-1">Now Playing</p>
              <h3 className="text-white text-xl font-black tracking-wide" style={{fontFamily: "'Fredoka One', cursive"}}>{story.title}</h3>
            </div>

            <div className="w-12 h-12"></div>
          </div>

          {/* Media Canvas */}
          <div className="flex-1 flex items-center justify-center relative bg-[#050505]">
            {story.mediaType === 'video' ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                 <div className="w-32 h-32 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse border-4 border-amber-500/20">
                    <span className="text-6xl">🎞️</span>
                 </div>
                 <p className="text-amber-500/40 font-black uppercase tracking-[0.5em]">Projecting {story.title}...</p>
              </div>
            ) : (
              <img src={story.mediaUrl} alt={story.title} className="w-full h-full object-contain" />
            )}

            {/* Subtitles */}
            {story.mediaType === 'image' && story.script && (
              <div className="absolute bottom-10 left-10 right-10 flex justify-center animate-fade-in-up">
                <div className="bg-black/60 backdrop-blur-2xl border-2 border-white/10 rounded-[2.5rem] px-12 py-6 max-w-3xl shadow-2xl">
                  <p className="text-white text-2xl font-bold italic text-center leading-relaxed" style={{fontFamily: "'Baloo 2', sans-serif"}}>
                    "{story.script[0]}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── THE VELVET CURTAIN ── */}
        <div 
          className={`absolute inset-0 z-40 bg-[#3b0808] transition-all duration-[2000ms] ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col items-center justify-center
            ${curtainRaised ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.6) 100%), repeating-linear-gradient(90deg, #2d0606 0px, #450a0a 40px, #2d0606 80px)',
            boxShadow: 'inset 0 -50px 100px rgba(0,0,0,0.9)'
          }}
        >
          {/* Golden Trim */}
          <div className="absolute bottom-0 w-full h-12 bg-gradient-to-b from-amber-600 to-amber-900 border-t-4 border-amber-300 shadow-[0_20px_50px_rgba(0,0,0,1)]"></div>
          
          {!curtainRaised && (
            <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-12 animate-fade-in">
              <p className="text-amber-500/60 text-xs font-black uppercase tracking-[0.6em] mb-4">ChocoBrook Imperial Theatre Presents</p>
              
              <h1 className="text-white text-7xl font-black text-center mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,1)]" style={{fontFamily: "'Fredoka One', cursive"}}>
                {story.title}
              </h1>

              <div className="flex flex-col items-center gap-6 mb-12">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">Featuring</p>
                <div className="flex gap-8">
                  {['👦 Milo', '👸 Princess', '🧙‍♂️ Wizard', '🦊 Lumi'].map((star, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-20 h-20 bg-white/5 border-2 border-white/10 rounded-3xl flex items-center justify-center text-4xl shadow-xl">
                        {star.split(' ')[0]}
                      </div>
                      <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">{star.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setCurtainRaised(true)}
                className="group relative px-20 py-8 overflow-hidden rounded-full transition-all hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 animate-[gradient: 3s linear infinite] bg-[length:200%_auto]"></div>
                <span className="relative text-black font-black uppercase tracking-[0.4em] text-2xl" style={{fontFamily: "'Fredoka One', cursive"}}>
                  Raise Curtain
                </span>
              </button>
            </div>
          )}
        </div>

        {/* ── FEEDBACK OVERLAY ── */}
        {showFeedback && (
          <div className="absolute inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 animate-fade-in text-center">
            <h2 className="text-5xl text-white font-black mb-12" style={{fontFamily: "'Fredoka One', cursive"}}>
              How was the show?
            </h2>
            <div className="flex gap-8 mb-16">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className={`text-7xl transition-all hover:scale-125 ${rating >= star ? 'text-amber-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.8)]' : 'text-zinc-800'}`}>⭐</button>
              ))}
            </div>
            <div className="flex gap-6 w-full max-w-xl">
              <button onClick={onClose} className="flex-1 py-6 bg-white text-black font-black uppercase tracking-widest rounded-[2rem] shadow-2xl hover:bg-amber-400 transition-all text-lg" style={{fontFamily: "'Fredoka One', cursive"}}>Finish Review</button>
              <button onClick={onClose} className="flex-1 py-6 bg-white/5 border-2 border-white/10 text-white font-black uppercase tracking-widest rounded-[2rem] hover:bg-white/10 transition-all text-lg">Close stage</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes gradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
