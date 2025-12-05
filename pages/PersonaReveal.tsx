import React, { useEffect, useState } from 'react';
import { PersonaContent } from '../types';
import { Button } from '../components/Button';
import { Hexagon, Zap, Shield, Crown, Eye, Activity, Flame } from 'lucide-react';

interface PersonaRevealProps {
  persona: PersonaContent;
  onContinue: () => void;
}

export const PersonaReveal: React.FC<PersonaRevealProps> = ({ persona, onContinue }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const getIcon = () => {
    switch(persona.type) {
      case 'The Conqueror': return <Crown size={60} strokeWidth={1} className="text-forge-red md:w-20 md:h-20" />;
      case 'The Architect': return <Hexagon size={60} strokeWidth={1} className="text-forge-red md:w-20 md:h-20" />;
      case 'The Visionary': return <Eye size={60} strokeWidth={1} className="text-forge-red md:w-20 md:h-20" />;
      case 'The Monk': return <Shield size={60} strokeWidth={1} className="text-forge-red md:w-20 md:h-20" />;
      case 'The Operator': return <Activity size={60} strokeWidth={1} className="text-forge-red md:w-20 md:h-20" />;
      default: return <Zap size={60} strokeWidth={1} className="text-forge-red md:w-20 md:h-20" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden font-sans p-4">
        
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 opacity-50"></div>

        {/* Loading Stage */}
        <div className={`transition-all duration-700 absolute z-10 flex flex-col items-center justify-center ${stage < 2 ? 'opacity-100 blur-0' : 'opacity-0 blur-xl scale-150 pointer-events-none'}`}>
            <div className="text-xs font-bold text-forge-red uppercase tracking-[0.3em] mb-4 animate-pulse">Running Diagnostics...</div>
            <div className="w-48 md:w-64 h-1 bg-zinc-900">
                <div className={`h-full bg-forge-red transition-all duration-[1500ms] ease-out ${stage > 0 ? 'w-full' : 'w-0'}`}></div>
            </div>
        </div>

        {/* Reveal Stage */}
        <div className={`relative z-20 flex flex-col items-center max-w-4xl w-full transition-all duration-1000 transform ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8 md:mb-10 p-8 md:p-10 bg-zinc-900 rounded-full shadow-2xl shadow-red-900/20 border border-zinc-800 animate-fade-in">
                {getIcon()}
            </div>
            
            <h2 className="text-gray-500 font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs mb-4">Identity Confirmed</h2>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 text-center font-header uppercase tracking-tighter leading-none">
                {persona.type.split(' ')[1] || persona.type}
            </h1>
            
            <div className={`transition-all duration-1000 delay-500 flex flex-col items-center w-full px-4 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="w-16 md:w-20 h-1 bg-forge-red mb-6 md:mb-8"></div>
                <p className="text-lg md:text-xl text-gray-400 italic mb-10 md:mb-12 text-center max-w-2xl font-light font-serif">
                    "{persona.tagline}"
                </p>
                <Button 
                    onClick={onContinue} 
                    className="w-auto px-8 md:px-16 py-4 md:py-5 text-base md:text-lg shadow-2xl shadow-red-900/40 hover:shadow-red-700/50"
                >
                    Enter The Forge
                </Button>
            </div>
        </div>
    </div>
  );
};