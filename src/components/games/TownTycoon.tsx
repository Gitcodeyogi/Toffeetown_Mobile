/* 
  DESIGN STANDARD: TOFFEETOWN WHIMSICAL 3D
  - Style: Semi-realistic 3D stylized renders.
  - No photographic or internet images allowed.
  - All parts must look 'Lovely', rounded, and high-fidelity.
*/

import React, { useState, useEffect } from 'react';
import { useEconomy } from '../../contexts/EconomyContext';

interface Stage {
  id: string;
  name: string;
  zoomedImage: string;
  problem: string;
  requiredTool: string;
}

interface Level {
  id: number;
  name: string;
  difficulty: string;
  poster: string;
  story: string;
  stages: Stage[];
}

interface CouncilMember {
  id: string;
  name: string;
  image: string;
  clan: "Bosses" | "Rebels" | "The Merchants";
  advice: string;
  stars: number;
}

const TOOLS = [
  { id: 'clock_oil', name: 'Clock Oil', icon: '💧', stars: 10, type: 'basic', description: 'Essential for lubricating weeping brass joints and reducing friction in the mainspring.' },
  { id: 'heavy_wrench', name: 'Heavy Wrench', icon: '🔧', stars: 10, type: 'basic', description: 'Provides the massive torque required to tighten the century-old steel foundation bolts.' },
  { id: 'brass_screw', name: 'Brass Screw', icon: '🔩', stars: 10, type: 'basic', description: 'A precision-milled fastener designed to replace the stripped anchors in the escapement wheel.' },
  { id: 'rebel_tape', name: 'Rebel Tape', icon: '🎗️', stars: 10, type: 'basic', description: 'A versatile, sticky solution for temporary patches on non-load-bearing mechanical cracks.' },
];

const COUNCIL_MEMBERS: CouncilMember[] = [
  { 
    id: 'theo', 
    name: 'Theo Cliff', 
    clan: 'Bosses', 
    advice: "Listen closely, Sovereign! I've calculated the torque using ancient boss-logic. It requires a Brass Screw! Fail this, and it's because you didn't believe in the official decree. Now, stop trembling and just pick something heavy!", 
    image: '/games/TownTycoon/Theo_Cliff.jpg', 
    stars: 50 
  },
  { 
    id: 'merchant_a', 
    name: 'Baron Brass', 
    clan: 'The Merchants', 
    advice: "My ledgers suggest Clock Oil is the answer! If the gears jam, sugar prices spike. Don't blame me when quarterly yields drop, just use the oil!", 
    image: '/games/TownTycoon/merchant.png', 
    stars: 40 
  },
  { 
    id: 'rebel_z', 
    name: 'Ziggy Spark', 
    clan: 'Rebels', 
    advice: "The system is rigged! Use Rebel Tape! Wrap it, slap it, and hope it doesn't snap! Kick it and see what happens—precision is for people with too much time!", 
    image: '/games/TownTycoon/merchant.png', 
    stars: 30 
  },
];

const GENERATE_STAGES = (levelId: number): Stage[] => {
  const baseImage = `/games/TownTycoon/level${levelId}_poster.png`;
  const stages: Record<number, Stage[]> = {
    1: [
      { id: '1-s1', name: "Mainspring Weeping", problem: "The brass oil has oxidized, causing the mainspring to slip.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '1-s2', name: "Escape Wheel Shudder", problem: "A loose screw is causing the escapement to vibrate dangerously.", requiredTool: "brass_screw", zoomedImage: baseImage },
      { id: '1-s3', name: "Support Cracking", problem: "The gingerbread beams are bowing under the weight of time.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '1-s4', name: "Gear Jam", problem: "Caramel residue has fused the ventilation gears solid.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '1-s5', name: "Pivot Friction", problem: "Dust from the toffee factory has entered the pivot holes.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '1-s6', name: "Housing Alignment", problem: "The brass housing has shifted 2mm to the left.", requiredTool: "brass_screw", zoomedImage: baseImage },
      { id: '1-s7', name: "Rattle in the Cage", problem: "A rebel spy left a metal fragment in the clock cage.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '1-s8', name: "Final Sync", problem: "The hands are out of phase with the sun's position.", requiredTool: "rebel_tape", zoomedImage: baseImage },
    ],
    2: [
      { id: '2-s1', name: "Beam Fracture", problem: "The central wafer beam has a hairline fracture from over-torque.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '2-s2', name: "Bolt Slippage", problem: "A foundation bolt on the bridge is vibrating loose.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '2-s3', name: "Anchor Rust", problem: "Sugar-mist has oxidized the primary anchors.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '2-s4', name: "Pin Alignment", problem: "The retention pin is slightly bent out of its slot.", requiredTool: "brass_screw", zoomedImage: baseImage },
      { id: '2-s5', name: "Splice Repair", problem: "The emergency rope has frayed near the support hook.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '2-s6', name: "Base Compression", problem: "The stone base is compressing the copper shims.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '2-s7', name: "Oil Leak", problem: "A reservoir seal has failed near the pedestrian path.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '2-s8', name: "Cap Securing", problem: "The decorative brass cap is rattling in the wind.", requiredTool: "brass_screw", zoomedImage: baseImage },
    ],
    3: [
      { id: '3-s1', name: "Vent Clog", problem: "A massive caramel buildup is blocking the main air vent.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '3-s2', name: "Filter Tear", problem: "The fine-mesh sugar filter has a large rip.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '3-s3', name: "Shaft Friction", problem: "The vertical drive shaft is grinding against its housing.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '3-s4', name: "Panel Loose", problem: "The inspection panel screws have been rattled loose.", requiredTool: "brass_screw", zoomedImage: baseImage },
      { id: '3-s5', name: "Seal Burst", problem: "The high-pressure syrup seal has developed a leak.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '3-s6', name: "Valve Jam", problem: "The main intake valve is stuck in the 45-degree position.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '3-s7', name: "Bearing Grind", problem: "The secondary bearing is overheating from lack of lubricant.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '3-s8', name: "Handle Mount", problem: "The manual override handle mount is unstable.", requiredTool: "brass_screw", zoomedImage: baseImage },
    ],
    4: [
      { id: '4-s1', name: "Sump Failure", problem: "The foundation sump pump has stopped due to a loose belt.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '4-s2', name: "Bracket Snap", problem: "A heavy-duty mounting bracket has snapped under tension.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '4-s3', name: "Joint Stiffness", problem: "The articulated foundation joints are seizing up.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '4-s4', name: "Clamp Drift", problem: "The primary leveling clamp has drifted by 5 degrees.", requiredTool: "brass_screw", zoomedImage: baseImage },
      { id: '4-s5', name: "Hose Leak", problem: "The hydraulic marsh-pressure hose is spraying fluid.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '4-s6', name: "Grate Obstruction", problem: "A large candy-stone is wedged in the drainage grate.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '4-s7', name: "Link Lubrication", problem: "The suspension links are squeaking loudly.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '4-s8', name: "Plate Securing", problem: "The nameplate is falling off the foundation block.", requiredTool: "brass_screw", zoomedImage: baseImage },
    ],
    5: [
      { id: '5-s1', name: "Belt Fray", problem: "The main sorting belt is starting to unravel at the seam.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '5-s2', name: "Pulley Stiff", problem: "The master pulley is resisting rotation.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '5-s3', name: "Gear Squeal", problem: "The labyrinth's internal gear train is bone dry.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '5-s4', name: "Screw Loose", problem: "A tiny screw has fallen into the sorting logic gate.", requiredTool: "brass_screw", zoomedImage: baseImage },
      { id: '5-s5', name: "Guide Patch", problem: "The licorice guide rail has a sharp, jagged edge.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '5-s6', name: "Lever Jam", problem: "The direction-swap lever is wedged solid.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '5-s7', name: "Axle Lube", problem: "The carousel axle is running hot and needs attention.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '5-s8', name: "Bracket Mount", problem: "The sensor bracket is vibrating out of alignment.", requiredTool: "brass_screw", zoomedImage: baseImage },
    ],
    6: [
      { id: '6-s1', name: "Steam Crack", problem: "The high-temp reservoir pipe has a visible steam leak.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '6-s2', name: "Flange Bolt", problem: "A main flange bolt is on the verge of snapping off.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '6-s3', name: "Valve Friction", problem: "The emergency shut-off valve is difficult to turn.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '6-s4', name: "Gasket Screw", problem: "The gasket retention screw is stripped and loose.", requiredTool: "brass_screw", zoomedImage: baseImage },
      { id: '6-s5', name: "Wrap Repair", problem: "The insulation wrap has fallen off the hot pipe.", requiredTool: "rebel_tape", zoomedImage: baseImage },
      { id: '6-s6', name: "Wrench Torque", problem: "The pressure regulator needs a full turn of torque.", requiredTool: "heavy_wrench", zoomedImage: baseImage },
      { id: '6-s7', name: "Pump Prime", problem: "The cooling pump needs lubricant to prime correctly.", requiredTool: "clock_oil", zoomedImage: baseImage },
      { id: '6-s8', name: "Plate Fix", problem: "The warning plate is rattling against the boiler.", requiredTool: "brass_screw", zoomedImage: baseImage },
    ]
  };
  return stages[levelId] || stages[1];
};

const LEVELS: Level[] = [
  { id: 1, name: "Clockwork Chaos", difficulty: "Rookie", poster: "/games/TownTycoon/level1_poster.png", story: "The mainspring is weeping brass oil! If we don't lubricate the escape wheel, the city's heart will stop forever.", stages: GENERATE_STAGES(1) },
  { id: 2, name: "Ginger Bridge", difficulty: "Novice", poster: "/games/TownTycoon/level2_poster.png", story: "The gingerbread supports are cracking under the weight of the toffee carts. We need structural reinforcement immediately.", stages: GENERATE_STAGES(2) },
  { id: 3, name: "Caramel Caverns", difficulty: "Expert", poster: "/games/TownTycoon/level3_poster.png", story: "A massive caramel leak has fused the lower ventilation gears. We must break the seal without shattering the machinery.", stages: GENERATE_STAGES(3) },
  { id: 4, name: "Marshmallow Marsh", difficulty: "Advanced", poster: "/games/TownTycoon/level4_poster.png", story: "The marsh foundation is softening! The steam vents are sinking into the sugar-mud. We need a foundation patch.", stages: GENERATE_STAGES(4) },
  { id: 5, name: "Licorice Labyrinth", difficulty: "Master", poster: "/games/TownTycoon/level5_poster.png", story: "The long-range drive belts are tangled in the sorting labyrinth. One wrong pull could snap the entire system.", stages: GENERATE_STAGES(5) },
  { id: 6, name: "Toffee Tunnels", difficulty: "Legend", poster: "/games/TownTycoon/level6_poster.png", story: "A subterranean steam pipe has burst near the central reservoir. The heat is melting the foundations of the palace!", stages: GENERATE_STAGES(6) },
];

export default function TownTycoon({ onBack }: { onBack: () => void }) {
  const { coins, addCoins } = useEconomy();
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [view, setView] = useState<"picking" | "briefing" | "playing">("picking");
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [flippedLevelId, setFlippedLevelId] = useState<number | null>(null);
  
  const [inventory, setInventory] = useState<string[]>([]);
  const [hiredMember, setHiredMember] = useState<CouncilMember | null>(null);
  const [pendingTool, setPendingTool] = useState<string | null>(null);
  
  const [flashcard, setFlashcard] = useState<string | null>(null);
  const [tourStep, setTourStep] = useState(-1);
  const [showProblemDetail, setShowProblemDetail] = useState(false);
  const [showCouncilAdvice, setShowCouncilAdvice] = useState(false);
  const [hasConsultedCouncil, setHasConsultedCouncil] = useState(false);
  const [ignoredCouncil, setIgnoredCouncil] = useState(false);
  const [showCouncilPicker, setShowCouncilPicker] = useState(false);
  const [showWorkshop, setShowWorkshop] = useState(false);
  const [showBudgetPlanner, setShowBudgetPlanner] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [showReadinessModal, setShowReadinessModal] = useState(false);
  
  const [hasReadProclamation, setHasReadProclamation] = useState(false);
  const [hasVisitedLedger, setHasVisitedLedger] = useState(false);

  const [missionStars, setMissionStars] = useState(100);
  const [leaderboardHistory, setLeaderboardHistory] = useState<{ source: string, amount: number, type: string }[]>([]);

  const hireCouncil = (member: CouncilMember) => {
    let balance = missionStars;
    if (hiredMember) balance += hiredMember.stars;
    if (balance >= member.stars) {
      setMissionStars(balance - member.stars);
      setHiredMember(member);
    }
  };

  const buyTool = (tool: typeof TOOLS[0]) => {
    if (missionStars >= tool.stars) {
      setMissionStars(prev => prev - tool.stars);
      setInventory(prev => [...prev, tool.id]);
    }
  };

  const removeTool = (toolId: string) => {
    const tool = TOOLS.find(t => t.id === toolId);
    if (tool) {
      setMissionStars(prev => prev + tool.stars);
      setInventory(prev => {
        const idx = prev.indexOf(toolId);
        if (idx === -1) return prev;
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      });
    }
  };

  const getSpotlightStyles = (step: number) => {
    const targets = [
      { top: '220px', left: '50%', width: '380px', height: '550px' },
      { top: '800px', left: '50%', width: '380px', height: '550px' },
      { top: '1380px', left: '50%', width: '380px', height: '550px' },
      { top: '1960px', left: '50%', width: '380px', height: '550px' },
      { top: '2400px', left: '50%', width: '400px', height: '150px' },
    ];
    const s = targets[step] || targets[0];
    return {
      top: s.top, left: s.left, width: s.width, height: s.height,
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.9)', 
      borderRadius: '5rem',
      border: '4px solid #f59e0b',
    };
  };

  const getCouncilSuggestion = (stageIdx: number): string => {
    const tools = ['clock_oil', 'brass_screw', 'rebel_tape', 'heavy_wrench', 'clock_oil', 'brass_screw', 'heavy_wrench', 'rebel_tape'];
    return tools[stageIdx] || "rebel_tape";
  };

  const currentLevel = LEVELS.find(l => l.id === currentLevelId) || LEVELS[0];
  const currentStage = currentLevel.stages[currentStageIdx];

  const handleToolClick = (toolId: string) => {
    setPendingTool(toolId);
    resolveToolUse("THINK", toolId);
  };

  const resolveToolUse = (decision: "THINK" | "TRUST", toolId?: string) => {
    const toolToUse = decision === "TRUST" ? getCouncilSuggestion(currentStageIdx) : (toolId || "");
    const isSuccess = toolToUse === currentStage.requiredTool;
    
    let reward = isSuccess ? 20 : -15;
    if (decision === "TRUST" && isSuccess) reward = 40;
    
    setFlashcard(isSuccess ? "SUCCESS! INVESTIGATION ADVANCING" : "FAILURE! TRY AGAIN");
    
    const logEntry = {
      source: `Mission ${currentLevelId} - Stage ${currentStageIdx + 1}`,
      amount: reward,
      type: decision === "THINK" ? "Sovereign Thought" : "Council Advice"
    };
    setLeaderboardHistory(prev => [logEntry, ...prev].slice(0, 5));
    setMissionStars(prev => prev + reward);
    
    setTimeout(() => {
      setFlashcard(null);
      if (isSuccess) {
        if (currentStageIdx < currentLevel.stages.length - 1) {
          setCurrentStageIdx(prev => prev + 1);
        } else {
          setView("picking");
          setCurrentStageIdx(0);
        }
      }
    }, 1500);
  };

  const BRIEFING_TOUR = [
    "Welcome to the WAR ROOM! Consult the Proclamation for tactical data.",
    "Recruitment! Pick an advisor. They're expensive, but know which way a gear turns.",
    "The Workshop. Buy tools! A cheap wrench is just a heavy paperweight.",
    "The Ledger. If numbers turn red, we're in trouble. hit 'ENTER MISSION' to begin!"
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-[#050508] flex items-center justify-center overflow-hidden z-[1500]">
      
      {/* GRAND ARCHITECTURAL BACKGROUND */}
      <div className="absolute inset-0 z-0 scale-105 pointer-events-none">
        <img src="/games/TownTycoon/landscape.png" className="w-full h-full object-cover opacity-30 blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-black/90"></div>
      </div>

      <div className="relative z-10 w-full max-w-[430px] h-full max-h-[900px] flex flex-col bg-[#0b0b12]/90 backdrop-blur-md border-x border-white/5 overflow-hidden md:rounded-[4rem] shadow-[0_50px_200px_rgba(0,0,0,1)]">
        
        {/* SOVEREIGN NAVIGATION TAB */}
        <div className="absolute top-10 left-0 z-[5000] flex items-center">
           <div 
             onClick={() => setIsNavOpen(!isNavOpen)}
             className={`h-14 flex items-center bg-amber-500 rounded-r-[2rem] shadow-[20px_0_50px_rgba(0,0,0,0.8)] border-y border-r border-white/40 cursor-pointer transition-all duration-500 ${isNavOpen ? 'px-8 gap-8' : 'w-12 justify-center'}`}
           >
              {isNavOpen ? (
                <>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (view === "playing") setView("briefing");
                      else if (view === "briefing") setView("picking");
                      else onBack();
                    }} 
                    className="text-black text-3xl font-black hover:scale-125 active:scale-90 transition-all"
                  >
                    ←
                  </button>
                  <div className="w-px h-6 bg-black/20"></div>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col gap-1.5 group active:scale-95 transition-all"
                  >
                    <div className="w-6 h-1 bg-black rounded-full group-hover:bg-black/60 transition-colors"></div>
                    <div className="w-4 h-1 bg-black rounded-full group-hover:bg-black/60 transition-colors"></div>
                    <div className="w-6 h-1 bg-black rounded-full group-hover:bg-black/60 transition-colors"></div>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-1.5">
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse delay-150"></div>
                </div>
              )}
           </div>
        </div>

        <div className="absolute top-10 right-6 z-[5000]">
           <div className="bg-amber-500 rounded-2xl px-4 py-2 shadow-xl border border-white/20">
              <span className="text-black font-black text-sm">🪙 {Math.floor(coins)}</span>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <div className="pt-24 pb-4 px-10 text-center">
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.6em] drop-shadow-md">Toffeetown</p>
            <h2 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-2xl">
              {view === "picking" ? "Story Board" : view === "briefing" ? "WAR ROOM" : currentLevel.name}
            </h2>
          </div>

          {view === "picking" && (
            <div className="flex flex-col gap-14 pt-12 pb-32 animate-in fade-in slide-in-from-bottom-10 duration-700">
               {LEVELS.map((lvl, idx) => (
                 <div key={lvl.id} className="relative w-full h-[300px] px-8 perspective-1000">
                    
                    {/* FLOATING SOVEREIGN BADGE (OUTSIDE & ON TOP) */}
                    <div className="absolute -top-6 left-4 z-40 flex flex-col items-center pointer-events-none">
                       <div className="bg-amber-500 text-black px-6 py-2 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_15px_40px_rgba(245,158,11,0.5)] border-2 border-white/20">
                          {lvl.difficulty}
                       </div>
                       <div className="bg-black/60 backdrop-blur-md text-amber-500/60 px-3 py-1 rounded-b-xl text-[7px] font-black uppercase tracking-widest border-x border-b border-white/10">
                          MISSION 0{idx + 1}
                       </div>
                    </div>

                    <div 
                      className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${flippedLevelId === lvl.id ? 'rotate-y-180' : ''}`}
                      onClick={() => setFlippedLevelId(flippedLevelId === lvl.id ? null : lvl.id)}
                    >
                       {/* FRONT: 50/50 POSTER + COMMAND */}
                       <div className={`absolute inset-0 backface-hidden transition-opacity duration-300 ${flippedLevelId === lvl.id ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                          <div className="w-full h-full bg-white/5 rounded-[4rem] border-2 border-white/20 flex overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                             
                             {/* LEFT 50%: POSTER */}
                             <div className="w-1/2 h-full relative shrink-0 border-r border-white/10 overflow-hidden bg-black">
                                <img src={lvl.poster} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                             </div>

                             {/* RIGHT 50%: COMMAND */}
                             <div className="w-1/2 p-8 flex flex-col justify-between bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                                <div className="space-y-3">
                                   <div className="flex items-center gap-3">
                                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
                                      <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.4em] drop-shadow-md">Strategy Hub</p>
                                   </div>
                                   <h4 className="text-xl font-black uppercase text-white tracking-tighter italic leading-[0.9] drop-shadow-2xl">
                                      {lvl.name}
                                   </h4>
                                </div>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setCurrentLevelId(lvl.id); setView("briefing"); }}
                                  className="w-full py-6 bg-gradient-to-b from-amber-400 to-amber-600 text-black rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.1em] shadow-[0_20px_50px_rgba(245,158,11,0.4)] active:scale-95 transition-all border-t border-white/20"
                                >
                                  AUTHORIZE MISSION →
                                </button>
                             </div>
                          </div>
                       </div>

                       {/* BACK: STRATEGIC BRIEFING */}
                       <div className={`absolute inset-0 backface-hidden rotate-y-180 transition-opacity duration-300 ${flippedLevelId === lvl.id ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                          <div className="w-full h-full bg-black/98 backdrop-blur-3xl rounded-[4rem] border-2 border-amber-500/30 p-12 flex flex-col justify-center text-center space-y-6 shadow-[0_0_200px_rgba(0,0,0,1)]">
                             <div className="w-20 h-20 bg-amber-500/10 rounded-full mx-auto flex items-center justify-center text-4xl border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.1)]">📜</div>
                             <div className="space-y-4">
                                <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.6em]">Strategic Briefing</p>
                                <p className="text-sm text-white/80 italic leading-relaxed px-4 font-medium">"{lvl.story}"</p>
                             </div>
                             <div className="pt-6">
                                <p className="text-[10px] font-black text-amber-500/40 uppercase tracking-[0.4em] animate-pulse">Tap to close dossier</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}

          {view === "briefing" && (
            <div className="space-y-12 pb-32 px-10 flex flex-col items-center">
               <button onClick={() => setShowProblemDetail(true)} className="relative w-full aspect-[2/3] rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-2xl group active:scale-95 transition-all">
                  <img src={currentLevel.poster} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 inset-x-10 text-left">
                     <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Dossier I</p>
                     <h4 className="text-4xl font-black text-white italic uppercase">Proclamation</h4>
                  </div>
               </button>

               <button onClick={() => setShowCouncilPicker(true)} className="relative w-full aspect-[2/3] rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-2xl group active:scale-95 transition-all">
                  <img src={hiredMember ? hiredMember.image : "/games/TownTycoon/Theo_Cliff_1.png"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 inset-x-10 text-left">
                     <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Dossier II</p>
                     <h4 className="text-4xl font-black text-white italic uppercase">{hiredMember ? hiredMember.name : "Recruitment"}</h4>
                  </div>
               </button>

               <button onClick={() => setShowWorkshop(true)} className="relative w-full aspect-[2/3] rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-2xl group active:scale-95 transition-all">
                  <img src="/games/TownTycoon/toffee_press.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 inset-x-10 text-left">
                     <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Dossier III</p>
                     <h4 className="text-4xl font-black text-white italic uppercase">Workshop</h4>
                  </div>
               </button>

               <button 
                  onClick={() => setShowBudgetPlanner(true)}
                  className="relative w-full aspect-[2/3] rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-2xl group active:scale-95 transition-all bg-black/20"
               >
                  <img src="/games/TownTycoon/treasure_chest.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 inset-x-10 text-left">
                     <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Dossier IV</p>
                     <h4 className="text-4xl font-black text-white italic uppercase">Ledger</h4>
                  </div>
               </button>

               <button 
                  onClick={() => {
                    const isReady = hasReadProclamation && hiredMember && inventory.length > 0 && hasVisitedLedger;
                    if(isReady) setShowFinalSummary(true);
                    else setShowReadinessModal(true);
                  }} 
                  className="group relative w-full h-32 rounded-[4rem] transition-all duration-500 mt-10 active:scale-95 shadow-[0_20px_60px_rgba(245,158,11,0.3)]"
                >
                   <div className="absolute inset-0 bg-gradient-to-b rounded-[4rem] shadow-3xl from-amber-400 via-amber-600 to-amber-800"></div>
                   <div className="absolute inset-2 border-2 border-white/10 rounded-[3.5rem] flex items-center justify-center">
                      <p className="font-black uppercase text-2xl tracking-[0.2em] italic text-black">
                         PROCEED →
                      </p>
                   </div>
                   {!(hasReadProclamation && hiredMember && inventory.length > 0 && hasVisitedLedger) && (
                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-bounce shadow-2xl">
                        Strategic Gaps Detected
                     </div>
                   )}
                </button>
            </div>
          )}

          {view === "playing" && (
            <div className="flex-1 flex flex-col p-8 pt-28 animate-in fade-in zoom-in duration-700 relative overflow-hidden h-full">
               {/* NATURE BACKGROUND */}
               <div className="absolute inset-0 z-0 opacity-30 pointer-events-none scale-110">
                  <img src="/games/TownTycoon/landscape.png" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl"></div>
               </div>

               <div className="relative z-10 flex flex-col h-full gap-8">
                  {/* TACTICAL COMMS HEADER - THE THEO CALL */}
                  <div className="flex items-center gap-6 bg-white/5 backdrop-blur-3xl p-6 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                     <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.4)] shrink-0 relative">
                        <img src={hiredMember?.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border-4 border-black/20 rounded-full"></div>
                     </div>
                     <div className="text-left space-y-1">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                           <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.4em]">Signal Active</p>
                        </div>
                        <h4 className="text-2xl font-black text-white uppercase italic leading-none tracking-tighter">{hiredMember?.name}</h4>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest italic">{hiredMember?.clan} Tactical Lead</p>
                     </div>
                  </div>

                  {/* ADVISOR ADVICE BUBBLE */}
                  <div className="bg-amber-500/10 backdrop-blur-md p-7 rounded-[3rem] border border-amber-500/30 shadow-inner relative animate-in slide-in-from-left-5 duration-1000">
                     <div className="absolute -top-3 left-12 w-6 h-6 bg-black/40 backdrop-blur-md border-l border-t border-amber-500/30 rotate-45"></div>
                     <p className="text-base text-white/90 italic font-medium leading-relaxed">
                        "Welcome to the field, Sovereign. {hiredMember?.advice}"
                     </p>
                  </div>

                  {/* PROGRESS STRIP */}
                  <div className="flex justify-between px-2">
                     {currentLevel.stages.map((_, i) => (
                       <div key={i} className={`w-9 h-9 rounded-2xl border-2 flex items-center justify-center text-[11px] font-black transition-all duration-500 ${i === currentStageIdx ? 'border-amber-500 bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-110' : i < currentStageIdx ? 'border-amber-500 bg-amber-500/20 text-amber-500 opacity-50' : 'border-white/10 text-white/20'}`}>
                          {i + 1}
                       </div>
                     ))}
                  </div>

                  {/* PROBLEM DOSSIER */}
                  <div className="flex-1 bg-white/5 backdrop-blur-3xl rounded-[4.5rem] border-2 border-white/10 p-12 flex flex-col justify-center items-center shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative group overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none"></div>
                     
                     <div className="text-center space-y-8 relative z-10">
                        <div className="space-y-3">
                           <div className="inline-block px-4 py-1.5 bg-amber-500 text-black rounded-full text-[9px] font-black uppercase tracking-widest mb-2 shadow-xl">Critical Objective</div>
                           <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter drop-shadow-2xl leading-tight">
                              {currentStage.name}
                           </h4>
                        </div>
                        <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full opacity-50"></div>
                        <p className="text-xl text-white/90 italic leading-relaxed font-medium px-4 drop-shadow-lg">
                           "{currentStage.problem}"
                        </p>
                     </div>

                     {flashcard && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center p-10 animate-in zoom-in-95 duration-300">
                           <div className="bg-amber-500 text-black p-12 rounded-[4rem] shadow-[0_0_100px_rgba(245,158,11,0.5)] text-center transform -rotate-2">
                              <p className="text-4xl font-black uppercase tracking-tighter italic">{flashcard}</p>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* LOGISTICS MANIFEST STRIP */}
                  <div className="space-y-6 pb-10">
                     <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.6em] text-center italic">Deploy Logistics</p>
                     <div className="flex justify-center gap-5 overflow-x-auto custom-scrollbar pb-4 px-4">
                        {[...new Set(inventory)].map(tid => {
                           const tool = TOOLS.find(t => t.id === tid);
                           return (
                             <button 
                               key={tid} 
                               onClick={() => handleToolClick(tid)}
                               className="w-24 h-28 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border-2 border-white/10 flex flex-col items-center justify-center gap-3 active:scale-90 transition-all shadow-2xl group shrink-0"
                             >
                                <span className="text-5xl group-hover:scale-110 transition-transform">{tool?.icon}</span>
                                <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">DEPLOY</span>
                             </button>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* MODALS SECTION */}
        {showLeaderboard && (
          <div className="fixed inset-0 z-[2200] bg-black/98 backdrop-blur-[100px] p-8 pt-24 flex flex-col animate-in fade-in duration-500">
             <div className="flex justify-between items-center mb-10">
                <div>
                   <h3 className="text-4xl font-black text-amber-500 italic uppercase">Leaderboard</h3>
                   <p className="text-[10px] text-white/40 uppercase tracking-widest">Strategic Growth & History</p>
                </div>
                <button onClick={() => setShowLeaderboard(false)} className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl font-black border border-white/20">×</button>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar space-y-8">
                <div className="bg-white/5 rounded-[4rem] border-2 border-white/10 p-10">
                   <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-center">Last 5 Tactical Gains</p>
                   <div className="space-y-6">
                      {leaderboardHistory.map((log, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 bg-black/40 rounded-3xl border border-white/10">
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${log.amount > 0 ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                              {log.amount > 0 ? '+' : ''}{log.amount}
                           </div>
                           <div className="flex-1">
                              <p className="text-xs font-black text-white uppercase tracking-widest">{log.source}</p>
                              <p className="text-[9px] text-white/40 font-bold italic">{log.type}</p>
                           </div>
                        </div>
                      ))}
                      {leaderboardHistory.length === 0 && <p className="text-center text-white/20 italic">No tactical data logged yet...</p>}
                   </div>
                </div>
             </div>
          </div>
        )}

        {showProblemDetail && (
          <div className="fixed inset-0 z-[2100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8 animate-in fade-in">
             <div className="bg-white/10 border-2 border-white/20 rounded-[5rem] p-12 pt-24 w-full shadow-2xl relative max-w-[400px]">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500 rounded-full flex items-center justify-center text-7xl shadow-2xl">📜</div>
                <div className="text-center space-y-8">
                   <h4 className="text-3xl font-black uppercase tracking-widest text-amber-500 italic">Official Proclamation</h4>
                   <p className="text-sm text-white/80 leading-relaxed italic font-medium h-[200px] overflow-y-auto custom-scrollbar">"{currentLevel.story}"</p>
                   <button onClick={() => { setShowProblemDetail(false); setHasReadProclamation(true); }} className="w-full py-6 bg-amber-500 text-black font-black rounded-full uppercase tracking-widest text-xs shadow-xl">I Accept</button>
                </div>
             </div>
          </div>
        )}

        {showCouncilPicker && (
          <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-[50px] p-8 pt-32 flex flex-col animate-in fade-in overflow-hidden">
             {/* NATURE BACKGROUND */}
             <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <img src="/games/TownTycoon/landscape.png" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
             </div>

             <div className="relative z-10 flex flex-col h-full px-10">
                <div className="flex justify-between items-center mb-8">
                   <div className="space-y-1">
                      <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Recruitment</p>
                      <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Sovereign Council</h3>
                   </div>
                   <button onClick={() => setShowCouncilPicker(false)} className="w-14 h-14 rounded-full bg-white/10 text-white text-3xl font-black border border-white/20 active:scale-90 transition-all">×</button>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-20">
                   {COUNCIL_MEMBERS.map(m => (
                      <button 
                        key={m.id} 
                        onClick={() => { hireCouncil(m); setShowCouncilPicker(false); }}
                        className={`w-full bg-white/5 backdrop-blur-md rounded-[3.5rem] p-6 border-2 flex items-center gap-6 active:scale-95 transition-all duration-300 ${hiredMember?.id === m.id ? 'border-amber-500 bg-amber-500/20' : 'border-white/10'}`}
                      >
                         <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500 shrink-0 shadow-2xl">
                            <img src={m.image} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1 text-left">
                            <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1">{m.clan}</p>
                            <h4 className="text-xl font-black text-white uppercase italic">{m.name}</h4>
                            <p className="text-amber-500 font-black text-xs mb-2">{m.stars} ⭐</p>
                            <p className="text-[10px] text-white/50 leading-relaxed italic line-clamp-2">"{m.advice}"</p>
                         </div>
                      </button>
                   ))}
                </div>
             </div>
          </div>
        )}

        {showWorkshop && (
          <div className="fixed inset-0 z-[2200] bg-black/60 backdrop-blur-[50px] p-8 pt-32 pb-10 flex flex-col animate-in slide-in-from-bottom-10 duration-500 overflow-hidden">
             {/* NATURE BACKGROUND */}
             <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <img src="/games/TownTycoon/landscape.png" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
             </div>

             <div className="relative z-10 flex flex-col h-full px-10">
                <div className="flex justify-between items-center mb-8">
                   <div className="space-y-1">
                      <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Logistics</p>
                      <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Workshop</h3>
                   </div>
                   <button onClick={() => setShowWorkshop(false)} className="w-14 h-14 rounded-full bg-white/10 text-white text-3xl font-black border border-white/20 active:scale-90 transition-all">×</button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-5 pr-2">
                   {TOOLS.map(t => {
                      const isSelected = inventory.includes(t.id);
                      return (
                       <button 
                         key={t.id} 
                         onClick={() => {
                           if (isSelected) {
                             setInventory(prev => prev.filter(id => id !== t.id));
                             setMissionStars(prev => prev + t.stars);
                           } else if (missionStars >= t.stars) {
                             setInventory(prev => [...prev, t.id]);
                             setMissionStars(prev => prev - t.stars);
                           }
                         }} 
                         className={`w-full bg-white/5 backdrop-blur-md rounded-[3.5rem] p-6 flex items-center gap-6 active:scale-95 transition-all duration-300 border-2 ${isSelected ? 'border-amber-500 bg-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.2)]' : 'border-white/10'}`}
                       >
                          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shrink-0 transition-transform duration-500 ${isSelected ? 'scale-110' : ''}`}>
                             {t.icon}
                          </div>
                          <div className="flex-1 text-left">
                             <h4 className={`text-lg font-black uppercase italic ${isSelected ? 'text-white' : 'text-white/60'}`}>{t.name}</h4>
                             <div className="flex items-center gap-2">
                                <span className="text-amber-500 font-black text-sm">{t.stars} ⭐</span>
                                {isSelected && <span className="bg-amber-500 text-black px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter animate-in fade-in zoom-in">EQUIPPED ✓</span>}
                             </div>
                          </div>
                          {isSelected && (
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-black text-xl border border-amber-500/40">×</div>
                          )}
                       </button>
                      );
                   })}
                </div>

                <div className="mt-8 space-y-6 pt-6 border-t border-white/10">
                   <div className="flex justify-between items-end px-6">
                      <div className="space-y-1">
                         <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">Strategic Investment</p>
                         <p className="text-2xl font-black text-white italic">{inventory.reduce((acc, id) => acc + (TOOLS.find(t => t.id === id)?.stars || 0), 0)} ⭐</p>
                      </div>
                      <div className="text-right space-y-1">
                         <p className="text-amber-500/40 text-[9px] font-black uppercase tracking-widest">Reserve Balance</p>
                         <p className="text-2xl font-black text-amber-500 italic">{missionStars} ⭐</p>
                      </div>
                   </div>

                   <button 
                     onClick={() => setShowWorkshop(false)}
                     className="w-full py-8 bg-gradient-to-b from-amber-400 to-amber-700 text-black rounded-[3rem] font-black text-xl uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(245,158,11,0.4)] active:scale-95 transition-all border-t border-white/20"
                   >
                     GOOD TO GO! →
                   </button>
                </div>
             </div>
          </div>
        )}

        {showBudgetPlanner && (
          <div className="fixed inset-0 z-[2200] bg-black/60 backdrop-blur-[50px] p-8 pt-32 pb-10 flex flex-col animate-in fade-in overflow-hidden">
             {/* NATURE BACKGROUND */}
             <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <img src="/games/TownTycoon/landscape.png" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
             </div>

             <div className="relative z-10 flex flex-col h-full px-10">
                <div className="flex justify-between items-center mb-8">
                   <div className="space-y-1">
                      <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Audit</p>
                      <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Mission Ledger</h3>
                   </div>
                   <button onClick={() => { setShowBudgetPlanner(false); setHasVisitedLedger(true); }} className="w-14 h-14 rounded-full bg-white/10 text-white text-3xl font-black border border-white/20 active:scale-90 transition-all">×</button>
                </div>
                
                <div className="flex-1 bg-white/5 backdrop-blur-md rounded-[5rem] border-2 border-white/10 p-10 overflow-hidden relative shadow-2xl">
                   <div className="overflow-y-auto custom-scrollbar h-full pb-32 space-y-10">
                      <div className="space-y-4">
                         <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest text-center">Current Allocation</p>
                         {hiredMember && (
                            <div className="flex items-center gap-6 p-6 bg-amber-500/10 rounded-3xl border border-amber-500/20">
                               <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500 shrink-0"><img src={hiredMember.image} className="w-full h-full object-cover" /></div>
                               <div className="flex-1">
                                  <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest">{hiredMember.clan}</p>
                                  <p className="text-sm font-black text-white uppercase italic">{hiredMember.name}</p>
                               </div>
                               <span className="text-amber-500 font-black">{hiredMember.stars} ⭐</span>
                            </div>
                         )}
                         {inventory.map((tid, idx) => {
                            const tool = TOOLS.find(t => t.id === tid);
                            return (
                              <div key={idx} className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                                 <div className="text-4xl filter drop-shadow-lg">{tool?.icon}</div>
                                 <div className="flex-1"><p className="text-xs font-black text-white/70 uppercase tracking-widest">{tool?.name}</p></div>
                                 <span className="text-amber-500 font-black">{tool?.stars} ⭐</span>
                              </div>
                            );
                         })}
                      </div>

                      <div className="space-y-4">
                         <p className="text-white/30 text-[10px] font-black uppercase tracking-widest text-center">Tactical History (Last 5)</p>
                         <div className="space-y-3">
                            {leaderboardHistory.slice(-5).reverse().map((h, i) => (
                              <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                                 <div className="text-left">
                                    <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">{h.source}</p>
                                    <p className="text-[10px] text-amber-500 italic font-medium">{h.type}</p>
                                 </div>
                                 <span className={`font-black text-sm ${h.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {h.amount >= 0 ? '+' : ''}{h.amount} ⭐
                                 </span>
                              </div>
                            ))}
                            {leaderboardHistory.length === 0 && <p className="text-center text-white/20 text-[10px] uppercase font-black tracking-widest py-10">No history recorded</p>}
                         </div>
                      </div>
                   </div>
                   <div className="absolute bottom-6 inset-x-6 bg-amber-500 text-black px-10 py-6 rounded-full shadow-2xl flex justify-between items-center border-t border-white/20">
                      <span className="font-black text-xs uppercase tracking-widest">Remaining</span>
                      <span className="text-3xl font-black">{missionStars} ⭐</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {showFinalSummary && (
          <div className="fixed inset-0 z-[6000] bg-black/98 backdrop-blur-[100px] p-8 flex flex-col items-center justify-center animate-in fade-in duration-500">
             <div className="bg-white/10 border-2 border-amber-500/50 rounded-[5rem] p-12 w-full max-w-[400px] text-center space-y-10 shadow-[0_0_150px_rgba(245,158,11,0.2)] relative overflow-hidden">
                
                <div className="space-y-2">
                   <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] drop-shadow-md">Clearance Level: Legend</p>
                   <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Strategic Confirmation</h3>
                </div>

                <div className="space-y-8 w-full">
                   {/* ADVISOR SECTION */}
                   <div className="space-y-4">
                      <p className="text-white/40 text-[9px] font-black uppercase tracking-widest text-left px-4 italic">I. Assigned Advisor</p>
                      <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 shadow-xl text-left">
                         <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest mb-1">{hiredMember?.clan}</p>
                         <p className="text-2xl font-black text-white uppercase italic leading-tight">{hiredMember?.name}</p>
                      </div>
                   </div>

                   {/* LOGISTICS SECTION */}
                   <div className="space-y-4">
                      <p className="text-white/40 text-[9px] font-black uppercase tracking-widest text-left px-4 italic">II. Logistics Manifest</p>
                      <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 space-y-4 max-h-[200px] overflow-y-auto custom-scrollbar shadow-inner">
                         {inventory.map((tid, idx) => {
                            const tool = TOOLS.find(t => t.id === tid);
                            return (
                              <div key={idx} className="flex items-center gap-4 text-left border-b border-white/5 pb-3">
                                 <span className="text-3xl filter drop-shadow-lg">{tool?.icon}</span>
                                 <p className="text-xs font-black text-white/70 uppercase tracking-widest">{tool?.name}</p>
                              </div>
                            );
                         })}
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-5 pt-4">
                   <button 
                     onClick={() => { setShowFinalSummary(false); setView("playing"); setCurrentStageIdx(0); }}
                     className="w-full py-8 bg-gradient-to-b from-amber-400 to-amber-700 text-black rounded-[3rem] font-black text-2xl uppercase tracking-[0.2em] shadow-[0_30px_70px_rgba(245,158,11,0.4)] active:scale-95 transition-all border-t border-white/20"
                   >
                     ENTER MISSION →
                   </button>
                   <button 
                     onClick={() => setShowFinalSummary(false)} 
                     className="text-white/30 font-black text-[10px] uppercase tracking-widest hover:text-white/60 transition-colors"
                   >
                     Return to Strategy Hub
                   </button>
                </div>
             </div>
           </div>
        )}
        {showReadinessModal && (
          <div className="fixed inset-0 z-[7000] bg-black/98 backdrop-blur-[100px] p-8 flex flex-col items-center justify-center animate-in fade-in duration-500">
             <div className="bg-white/10 border-2 border-amber-500/50 rounded-[5rem] p-12 w-full max-w-[400px] text-center space-y-10 shadow-[0_0_150px_rgba(245,158,11,0.2)] relative">
                
                <div className="space-y-2">
                   <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] drop-shadow-md">Strategic Gaps Detected</p>
                   <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Readiness Checklist</h3>
                </div>

                <div className="space-y-4 w-full text-left">
                   {[
                     { label: "Read the Proclamation", done: hasReadProclamation },
                     { label: "Appoint Strategic Council", done: hiredMember !== null },
                     { label: "Procure Logistics Tools", done: inventory.length > 0 },
                     { label: "Finalize Mission Ledger", done: hasVisitedLedger }
                   ].map((step, i) => (
                     <div key={i} className={`flex items-center gap-4 p-5 rounded-3xl border transition-all duration-500 ${step.done ? 'bg-amber-500/10 border-amber-500/20 opacity-100' : 'bg-red-500/10 border-red-500/20 opacity-60 shadow-[0_0_30px_rgba(239,68,68,0.1)]'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-lg transition-colors duration-500 ${step.done ? 'bg-amber-500 text-black' : 'bg-red-500 text-white'}`}>
                           {step.done ? '✓' : '!'}
                        </div>
                        <p className={`text-xs font-black uppercase tracking-widest transition-colors duration-500 ${step.done ? 'text-amber-500' : 'text-red-500'}`}>
                           {step.label}
                        </p>
                     </div>
                   ))}
                </div>

                <div className="pt-4 w-full">
                  <button 
                    onClick={() => setShowReadinessModal(false)}
                    className="w-full py-6 bg-gradient-to-b from-amber-400 to-amber-700 text-black rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(245,158,11,0.3)] active:scale-95 transition-all"
                  >
                    Return to Strategy Hub
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
