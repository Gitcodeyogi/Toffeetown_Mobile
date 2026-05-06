import React from 'react';

export default function MobileWrapper({ 
  children, 
  orientation = 'portrait' 
}: { 
  children: React.ReactNode, 
  orientation?: 'portrait' | 'landscape' 
}) {
  const isLandscape = orientation === 'landscape';

  return (
    <div className="w-full h-full flex items-center justify-center p-10 select-none">
      
      {/* Main Phone Frame */}
      <div 
        className={`relative shadow-[0_60px_150px_rgba(0,0,0,1)] bg-[#050508] origin-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 border-[12px] border-[#131317] rounded-[4rem]
          ${isLandscape ? 'w-[844px] h-[390px]' : 'w-[390px] h-[844px]'}`}
        style={{ isolation: 'isolate', overflow: 'hidden' }}
      >
        {/* Force Clipping Layer */}
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden z-0">
          
           {/* The App Content - CONTAINED */}
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden flex flex-col custom-scrollbar z-10 bg-[#0a0a0f]" style={{ contain: 'layout' }}>
             {children}
           </div>

           {/* Inner Ambient Depth */}
           <div className="absolute inset-0 bg-indigo-900/10 blur-[100px] z-20 pointer-events-none"></div>

           {/* Subtle Bezel Glow - TOP LAYER */}
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/60 pointer-events-none z-[10000]"></div>
        </div>

        {/* Outer Frame Reflection (Glassy Highlight) - TOP LAYER */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-45 pointer-events-none z-[10001]"></div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; height: 0px; }
      `}</style>
    </div>
  );
}
