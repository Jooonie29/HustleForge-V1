import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Flame, ArrowRight, ArrowLeft, User } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [view, setView] = useState<'welcome' | 'auth'>('welcome');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center p-4 md:p-6 relative font-sans overflow-hidden">
      
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-80 grayscale mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/90 to-[#09090B]/60 pointer-events-none"></div>

      <div className="w-full max-w-md z-10 animate-fade-in relative">
        <div className="text-center mb-8 md:mb-12">
           <div className="inline-flex items-center justify-center bg-forge-red text-white p-3 md:p-4 rounded mb-6 shadow-2xl shadow-red-900/50">
             <Flame size={32} className="md:w-10 md:h-10" fill="currentColor" />
           </div>
           
           <div className="space-y-2">
             <h2 className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Forging Elite Strength Since 2024</h2>
             <h1 className="text-5xl md:text-7xl font-bold text-white font-header uppercase leading-[0.9] tracking-tighter">
              Forge Your<br/>Legacy
             </h1>
           </div>
           
           <p className="text-gray-400 font-medium mt-6 max-w-xs mx-auto leading-relaxed text-xs md:text-sm">
             Raw strength. Unmatched discipline. The training ground for those who refuse mediocrity. Enter the void and build yourself anew.
           </p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 md:p-8 shadow-2xl">
          {view === 'welcome' ? (
            <div className="space-y-4">
                <button 
                  onClick={() => setView('auth')}
                  className="w-full group bg-forge-red hover:bg-red-700 p-4 md:p-5 rounded flex items-center justify-between transition-all shadow-lg shadow-red-900/20"
                >
                    <div className="text-left">
                        <div className="font-bold text-base md:text-lg text-white font-header uppercase tracking-wide">Join The Ranks</div>
                        <div className="text-[10px] text-red-100 opacity-80 uppercase tracking-widest font-bold">Full Access Protocol</div>
                    </div>
                    <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={20} />
                </button>

                <button 
                  onClick={onLogin}
                  className="w-full group bg-transparent border-2 border-zinc-700 hover:border-white p-4 md:p-5 rounded flex items-center justify-between transition-all"
                >
                    <div className="text-left">
                        <div className="font-bold text-base md:text-lg text-gray-300 group-hover:text-white font-header uppercase tracking-wide">Explore Facility</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Guest Access</div>
                    </div>
                    <User className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                </button>
            </div>
          ) : (
             <div className="animate-slide-up w-full">
                <button onClick={() => setView('welcome')} className="mb-6 text-gray-500 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={14}/> Back to Base
                </button>

                <div className="space-y-4 md:space-y-6">
                    {!isLogin && <Input label="Callsign (Name)" placeholder="e.g. TITAN" />}
                    <Input label="Comms (Email)" type="email" placeholder="you@hustleforge.com" />
                    <Input label="Access Code (Password)" type="password" placeholder="••••••••" />
                    
                    <Button fullWidth onClick={onLogin} className="mt-4 py-4 text-base shadow-red-900/30">
                        {isLogin ? 'Initiate Sequence' : 'Register Profile'}
                    </Button>
                </div>
                
                <div className="mt-8 text-center border-t border-zinc-800 pt-4">
                    <button onClick={() => setIsLogin(!isLogin)} className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-forge-red transition-colors">
                        {isLogin ? "Join The Ranks" : 'Already Enlisted? Login'}
                    </button>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};