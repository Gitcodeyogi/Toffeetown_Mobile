import React, { useState } from 'react';

import MobileWrapper from './components/MobileWrapper';
import LoginPage    from './pages/LoginPage';
import ExplorePage  from './pages/ExplorePage';
import HomePage     from './pages/HomePage';
import TheatrePage  from './pages/TheatrePage';
import GamesPage    from './pages/GamesPage';
import CastPage     from './pages/CastPage';
import LeadersPage  from './pages/LeadersPage';
import CoinsPage    from './pages/CoinsPage';
import ProfilePage  from './pages/ProfilePage';
import PaymentPage  from './pages/PaymentPage';
import BottomNav    from './components/BottomNav';
import TopBar       from './components/TopBar';

import type { PageId } from './types/navigation';
import { EconomyProvider } from './contexts/EconomyContext';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('login');
  const [zoom, setZoom] = useState(1.0);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const mainPages: PageId[] = ['explore', 'home', 'profile', 'chat'];
  const showNav = mainPages.includes(currentPage);
  const showTopBar = true;

  const renderPage = () => {
    switch (currentPage) {
      case 'login':   return <LoginPage   navigate={setCurrentPage} />;
      case 'explore': return <ExplorePage navigate={setCurrentPage} />;
      case 'home':    return <HomePage    navigate={setCurrentPage} />;
      case 'theatre': return <TheatrePage navigate={setCurrentPage} />;
      case 'games':   return <GamesPage   navigate={setCurrentPage} />;
      case 'cast':    return <CastPage    navigate={setCurrentPage} />;
      case 'leaders': return <LeadersPage navigate={setCurrentPage} />;
      case 'coins':   return <CoinsPage   navigate={setCurrentPage} />;
      case 'profile': return <ProfilePage navigate={setCurrentPage} />;
      case 'chat':    return <ChatPage    navigate={setCurrentPage} />;
      case 'payment': return <PaymentPage navigate={setCurrentPage} />;
      default:        return <LoginPage   navigate={setCurrentPage} />;
    }
  };

  return (
    <EconomyProvider>
      {/* Root Container: Full screen, fixed, dead-center */}
      <div className="fixed inset-0 w-screen h-screen bg-[#050508] overflow-hidden flex items-center justify-center">
        
        {/* ── GLOBAL CONTROLS (DETACHED FROM FLEX FLOW) ── */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[20000] flex flex-col gap-4 items-center">
          <button 
            onClick={() => setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait')}
            className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center hover:bg-indigo-500/30 transition-all shadow-xl active:scale-90"
            title="Toggle Orientation"
          >
            <svg className={`w-8 h-8 transition-transform duration-500 ${orientation === 'landscape' ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
          
          <div className="h-4" />
          
          <button onClick={() => setZoom(prev => Math.min(prev + 0.1, 2.0))} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-white text-xl font-black shadow-2xl hover:bg-white/20 transition-all active:scale-90">+</button>
          <button onClick={() => setZoom(1.0)} className="px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 text-xs font-black uppercase shadow-xl hover:bg-amber-500/30 transition-all">100%</button>
          <button onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.3))} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-white text-xl font-black shadow-2xl hover:bg-white/20 transition-all active:scale-90">–</button>
        </div>

        {/* ── THE STABILIZED CENTERED PREVIEW ── */}
        <div 
          className="relative transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center pointer-events-auto z-[1000]"
          style={{ transform: `scale(${zoom})` }}
        >
          <MobileWrapper orientation={orientation}>
            <div className="w-full h-full relative">
              {/* PAGE CONTENT LAYER */}
              <div className="w-full h-full relative flex flex-col">
                {showTopBar && <TopBar current={currentPage} navigate={setCurrentPage} />}
                <div className="flex-1 w-full relative">
                  {renderPage()}
                </div>
              </div>
              
              {/* NAVIGATION OVERLAY LAYER (ALWAYS AT BOTTOM) */}
              {showNav && <BottomNav current={currentPage} navigate={setCurrentPage} />}
            </div>
          </MobileWrapper>
        </div>

      </div>

      <style>{`
        body { margin: 0; padding: 0; background: #050508; overflow: hidden; }
      `}</style>
    </EconomyProvider>
  );
}

export default App;
