import React, { useState, useEffect } from 'react';
import type { PageId } from '../types/navigation';
import { theatreCategories } from '../data/theatreData';
import type { Story, StoryCategory } from '../data/theatreData';
import { useEconomy } from '../contexts/EconomyContext';
import TheatreStage from './TheatreStage';

function StoryFlipCard({ story, isUnlocked, onUnlock, onWatch }: { story: Story; isUnlocked: boolean; onUnlock: () => void; onWatch: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-[320px] h-[480px] perspective-1000 mb-12">
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => !isUnlocked && setIsFlipped(!isFlipped)}>

        {/* FRONT: POSTER */}
        <div className="absolute inset-0 backface-hidden rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-[#0a0a0f]">
          <img src={story.coverImage} className="w-full h-full object-cover" alt={story.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
            <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2">{story.mediaType === 'video' ? '▶ REEL' : '📖 TALE'}</p>
            <h3 className="text-white text-3xl font-black leading-tight mb-4" style={{ fontFamily: "'Fredoka One', cursive" }}>{story.title}</h3>
            {!isUnlocked && (
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md self-start px-5 py-2 rounded-full border border-white/10">
                <span className="text-amber-500 text-sm">🔒</span>
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Flip to Unlock</span>
              </div>
            )}
            {isUnlocked && (
              <button
                onClick={(e) => { e.stopPropagation(); onWatch(); }}
                className="w-full py-4 rounded-2xl bg-amber-500 text-black font-black text-sm uppercase tracking-widest active:scale-95 transition-all shadow-xl"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                WATCH NOW 🎬
              </button>
            )}
          </div>
        </div>

        {/* BACK: SYNOPSIS & PAY */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[3rem] overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-[#0a0a0f] p-10 flex flex-col items-center text-center justify-between">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%"><path d="M-100 100 L100 -100 M 0 100 L 200 -100" stroke="white" strokeWidth="20" fill="none" /></svg>
          </div>

          <div className="relative z-10 w-full">
            <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-3xl mb-8 mx-auto shadow-2xl">
              📖
            </div>
            <h3 className="text-white text-2xl font-black mb-6" style={{ fontFamily: "'Fredoka One', cursive" }}>{story.title}</h3>
            <p className="text-white/70 text-base font-bold leading-relaxed mb-8" style={{ fontFamily: "'Baloo 2', sans-serif" }}>{story.synopsis}</p>
          </div>

          <div className="relative z-10 w-full space-y-4">
            <button
              onClick={(e) => { e.stopPropagation(); onUnlock(); }}
              className="w-full py-5 rounded-2xl bg-amber-500 text-black font-black text-lg uppercase tracking-widest active:scale-95 transition-all shadow-xl"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              PROCEED TO PAY 🪙
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
              className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
            >
              ← Back to Poster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TheatrePage({ navigate }: { navigate: (page: PageId) => void }) {
  const { coins, unlockedStories, purchaseStory, addCoins } = useEconomy();

  const [view, setView] = useState<'hero' | 'archive' | 'category'>('hero');
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | null>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [showStage, setShowStage] = useState(false);
  const [error, setError] = useState('');

  // Refill
  useEffect(() => { if (coins < 1000) addCoins(1000 - coins); }, [coins, addCoins]);

  const handleOpenCategory = (cat: StoryCategory) => {
    setSelectedCategory(cat);
    setView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlock = (story: Story) => {
    const success = purchaseStory(story.id, story.title);
    if (success) {
      setActiveStory(story);
      setShowStage(true);
    } else {
      setError('Need 50 coins to unlock!');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="w-full h-full bg-[#0a0a0f] flex flex-col relative overflow-hidden">

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600 rounded-full blur-[150px]"></div>
      </div>

      {/* ── HERO VIEW ── */}
      {view === 'hero' && (
        <div className="w-full h-full flex flex-col items-center justify-between px-6 pt-24 pb-24 animate-fade-in relative z-10">
          <div className="flex flex-col items-center text-center">
            <p className="text-white text-2xl font-medium mb-1" style={{ fontFamily: "'Fredoka One', cursive" }}>Welcome to</p>
            <h1 className="text-[3rem] leading-none font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-amber-400 to-orange-500 animate-gradient" style={{ fontFamily: "'Fredoka One', cursive" }}>TOFFEE TOWN</h1>
            <div className="relative w-64 h-64 my-8 animate-float flex items-center justify-center">
              <img src="/Images/projector_hero.png" className="w-full h-full object-contain" alt="Cinema Projector" />
            </div>
            <button onClick={() => setView('archive')} className="bg-white/5 backdrop-blur-xl px-10 py-4 rounded-full border-2 border-amber-500/30 hover:border-amber-500 transition-all group active:scale-95 shadow-2xl">
              <span className="text-amber-400 text-2xl font-black tracking-[0.1em]" style={{ fontFamily: "'Fredoka One', cursive" }}>BOX OFFICE</span>
            </button>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative mx-10"><div className="absolute left-0 top-0 bottom-0 w-1/3 bg-amber-400 rounded-full animate-pulse"></div></div>
        </div>
      )}

      {/* ── ARCHIVE VIEW (LIST OF CATEGORIES) ── */}
      {view === 'archive' && (
        <div className="w-full h-full flex flex-col animate-fade-in relative z-10">
          <div className="px-6 pt-32 pb-8 flex justify-between items-end bg-gradient-to-b from-black/80 to-transparent">
            <h1 className="text-white text-4xl font-black" style={{ fontFamily: "'Fredoka One', cursive" }}>Story Files</h1>
            <div className="h-10 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center text-amber-400 font-black text-xs shadow-xl backdrop-blur-md">{coins} 🪙</div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar pb-40 px-6 space-y-6">
            {theatreCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleOpenCategory(cat)}
                className="w-full flex items-center justify-between p-8 rounded-[2.5rem] bg-white/5 border-2 border-white/5 hover:border-amber-500/50 transition-all group"
              >
                <div className="text-left">
                  <h2 className="text-white text-2xl font-black group-hover:text-amber-400 transition-colors" style={{ fontFamily: "'Fredoka One', cursive" }}>{cat.title}</h2>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">Explore {cat.stories.length} Tales</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <span className="text-xl">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── CATEGORY VIEW (VERTICAL FLIP CARDS) ── */}
      {view === 'category' && selectedCategory && (
        <div className="w-full h-full flex flex-col animate-fade-in relative z-10">
          <div className="sticky top-0 z-[100] px-6 pt-32 pb-8 bg-gradient-to-b from-black via-black/80 to-transparent flex justify-between items-end backdrop-blur-md">
            <div>
              <button onClick={() => setView('archive')} className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                <span>← Category List</span>
              </button>
              <h1 className="text-white text-4xl font-black" style={{ fontFamily: "'Fredoka One', cursive" }}>{selectedCategory.title}</h1>
            </div>
            <div className="h-10 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center text-amber-400 font-black text-xs shadow-xl">{coins} 🪙</div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pt-12 pb-40 px-6 flex flex-col items-center">
            {error && <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-rose-500 text-white px-8 py-3 rounded-full font-black shadow-2xl animate-bounce">⚠️ {error}</div>}

            {selectedCategory.stories.map(story => (
              <StoryFlipCard
                key={story.id}
                story={story}
                isUnlocked={unlockedStories.includes(story.id)}
                onUnlock={() => handleUnlock(story)}
                onWatch={() => { setActiveStory(story); setShowStage(true); }}
              />
            ))}
          </div>
        </div>
      )}

      {showStage && activeStory && <TheatreStage story={activeStory} onClose={() => setShowStage(false)} />}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes gradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        .animate-gradient { background-size: 200% auto; animation: gradient 3s linear infinite; }
      `}</style>
    </div>
  );
}
