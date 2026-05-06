import React, { useState, useRef, useEffect } from 'react';
import type { PageId } from '../types/navigation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'companion';
  timestamp: number;
}

interface Companion {
  id: string;
  name: string;
  role: string;
  image: string;
  greeting: string;
  font: string;
  color: string;
}

const COMPANIONS: Companion[] = [
  { 
    id: 'asher', name: 'Asher', role: 'Imperial Treasurer', 
    image: '/Images/asher_glow.png', 
    greeting: 'Welcome, traveler. I am Asher. I can help you with payments, your coin balance, or navigating the towns.',
    font: "'Baloo 2', sans-serif", color: '#fbbf24'
  },
  { 
    id: 'milo', name: 'Milo', role: 'Grand Architect', 
    image: '/Images/milo_spark.png', 
    greeting: 'Hey there! I am Milo. I design the whimsical structures of ChocoBrook. Want to build something sweet?',
    font: "'Fredoka One', cursive", color: '#f472b6'
  },
  { 
    id: 'celia', name: 'Celia', role: 'Royal Archivist', 
    image: '/Images/celia_shine.png', 
    greeting: 'Greetings. I am Celia. I preserve the legends of the Imperial Archive. Which story shall we unseal today?',
    font: "'Lora', serif", color: '#c084fc'
  },
  { 
    id: 'nella', name: 'Nella', role: 'Royal Messenger', 
    image: '/Images/nella_nudgepot.png', 
    greeting: 'Quickly now! I am Nella. I deliver the fastest news across the provinces. What is the urgent word?',
    font: "'Fredoka One', cursive", color: '#4ade80'
  }
];

export default function ChatPage({ navigate }: { navigate: (page: PageId) => void }) {
  const [selectedCompanion, setSelectedCompanion] = useState<Companion>(COMPANIONS[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: COMPANIONS[0].greeting, sender: 'companion', timestamp: Date.now() }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: inputText, sender: 'user', timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const resp: Message = { 
        id: (Date.now() + 1).toString(), 
        text: `The ${selectedCompanion.name} acknowledges your request. We shall proceed with the imperial protocol.`, 
        sender: 'companion', 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, resp]);
    }, 1000);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#f3f4f6] flex flex-col">
      
      {/* ── TOP SECTION: CHARACTER FACE AREA (REDUCED HEIGHT) ── */}
      <div className="relative w-full h-[38%] shrink-0 overflow-hidden bg-zinc-900">
        <img 
          src={selectedCompanion.image} 
          className="w-full h-full object-cover object-top" 
          alt={selectedCompanion.name} 
        />
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* ── COMPANION SELECTOR (TOP RIGHT) ── */}
        <div className="absolute top-28 right-8 z-30 flex flex-col gap-4">
          {COMPANIONS.map(comp => (
            <button 
              key={comp.id}
              onClick={() => {
                setSelectedCompanion(comp);
                setMessages([{ id: Date.now().toString(), text: comp.greeting, sender: 'companion', timestamp: Date.now() }]);
              }}
              className={`w-14 h-14 rounded-2xl border-2 transition-all shadow-2xl active:scale-90 overflow-hidden
                ${selectedCompanion.id === comp.id ? 'border-amber-500 scale-110' : 'border-white/20 opacity-60'}`}
            >
              <img src={comp.image} className="w-full h-full object-cover" alt={comp.name} />
            </button>
          ))}
        </div>
      </div>

      {/* ── DIVIDER: ELEGANT CROSS LINES ── */}
      <div className="w-full h-10 relative z-20 -mt-5 bg-[#f3f4f6] rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden border-t border-white/50">
         <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="chat-cross" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 20 M 0 0 L 20 20" fill="none" stroke="black" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chat-cross)" />
          </svg>
          <div className="w-16 h-1.5 bg-zinc-200 rounded-full"></div>
      </div>

      {/* ── BOTTOM SECTION: BRIGHT & SPACIOUS CHAT ── */}
      <div className="flex-1 w-full relative flex flex-col overflow-hidden bg-[#f3f4f6]">
        
        {/* Background Cross Lines for Chat Area */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
           <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#chat-cross)" /></svg>
        </div>

        {/* CHAT BUBBLES AREA (With Scroll) */}
        <div 
          ref={scrollRef}
          className="flex-1 w-full overflow-y-auto px-8 pt-6 pb-40 flex flex-col gap-8 custom-scrollbar scroll-smooth relative z-10"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[90%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start animate-fade-in'}`}
            >
              <div 
                className={`p-6 rounded-[2.5rem] shadow-xl border-2 transition-all
                  ${msg.sender === 'user' 
                    ? 'bg-amber-500 text-white border-amber-600 rounded-tr-none' 
                    : 'bg-white text-zinc-800 border-white rounded-tl-none'}`}
                style={{ fontFamily: msg.sender === 'companion' ? selectedCompanion.font : "'Baloo 2', sans-serif" }}
              >
                <p className="text-[16px] leading-relaxed font-bold">{msg.text}</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-3 px-4">
                {msg.sender === 'user' ? 'You' : selectedCompanion.name}
              </span>
            </div>
          ))}
        </div>

        {/* ── FIXED BRIGHTER INPUT BAR (RESOLVES DISAPPEARING ISSUE) ── */}
        <div className="absolute bottom-10 left-0 right-0 px-8 py-6 z-50">
          <div className="flex items-center gap-4 bg-white border-2 border-zinc-100 rounded-[3rem] p-2 pl-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all focus-within:border-amber-400">
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Message ${selectedCompanion.name}...`}
              className="flex-1 bg-transparent border-none outline-none text-zinc-800 text-base py-4 font-black placeholder:text-zinc-300"
            />
            <button 
              onClick={handleSendMessage}
              className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-amber-600 transition-all active:scale-90 shadow-2xl"
            >
              <svg className="w-6 h-6 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
