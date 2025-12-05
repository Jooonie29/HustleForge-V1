import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { UserOnboardingData } from '../types';
import { ArrowRight, Check, Crown, Zap, Heart, Users, Flame, Skull, Target, Hexagon } from 'lucide-react';

interface PersonaQuizProps {
  onComplete: (data: UserOnboardingData) => void;
}

const STEPS = 4;

export const PersonaQuiz: React.FC<PersonaQuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<UserOnboardingData>({
    occupation: '',
    age: '',
    mood: '',
    motivation: '',
    feeling: '',
    title: ''
  });

  const handleNext = () => {
    if (step < STEPS) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const updateData = (key: keyof UserOnboardingData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return data.occupation.length > 0 && data.age.length > 0;
      case 2: return data.motivation.length > 0;
      case 3: return data.feeling.length > 0;
      case 4: return data.title.length > 0;
      default: return false;
    }
  };

  const QuizOption = ({ 
    selected, 
    onClick, 
    icon: Icon, 
    label, 
    sub 
  }: { 
    selected: boolean; 
    onClick: () => void; 
    icon: any; 
    label: string; 
    sub?: string 
  }) => (
    <button 
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-xl border flex items-center gap-4 group
        transition-all duration-300 ease-in-out
        active:scale-95
        ${selected 
          ? 'bg-forge-red/10 border-forge-red text-white shadow-[0_0_15px_rgba(220,38,38,0.15)]' 
          : 'bg-zinc-900 border-zinc-800 text-gray-400 hover:bg-forge-red hover:border-forge-red hover:text-white active:bg-forge-red'
        }
      `}
    >
      <div className={`
        p-3 rounded-lg transition-colors duration-300 
        ${selected 
          ? 'bg-forge-red text-white' 
          : 'bg-zinc-950 text-gray-500 group-hover:text-white group-hover:bg-white/20'
        }
      `}>
        <Icon size={20} />
      </div>
      <div>
        <div className={`font-bold transition-colors duration-300 ${selected ? 'text-forge-red' : 'text-gray-300 group-hover:text-white'}`}>
          {label}
        </div>
        {sub && (
          <div className={`text-xs mt-0.5 transition-colors duration-300 ${selected ? 'text-gray-500' : 'text-gray-500 group-hover:text-white/80'}`}>
            {sub}
          </div>
        )}
      </div>
      {selected && <Check className="ml-auto text-forge-red" size={20} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-2 bg-zinc-900">
        <div 
          className="h-full bg-forge-red transition-all duration-500 ease-out shadow-[0_0_10px_#DC2626]" 
          style={{ width: `${(step / STEPS) * 100}%` }}
        ></div>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <Hexagon className="w-12 h-12 text-forge-red mx-auto mb-4 fill-red-500/5" strokeWidth={1.5} />
          <h2 className="text-xs font-mono text-forge-red uppercase tracking-[0.3em] mb-2">Initialize Protocol</h2>
          <h1 className="text-3xl font-bold text-white">
            {step === 1 && "Identity Verification"}
            {step === 2 && "Core Driver Analysis"}
            {step === 3 && "Emotional Fuel Source"}
            {step === 4 && "Designation Protocol"}
          </h1>
        </div>

        <div className="min-h-[400px]">
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <Input 
                label="Current Occupation" 
                placeholder="e.g. Student, Software Engineer, Founder" 
                value={data.occupation}
                onChange={(e) => updateData('occupation', e.target.value)}
                autoFocus
              />
              <Input 
                label="Age" 
                placeholder="e.g. 24" 
                type="number"
                value={data.age}
                onChange={(e) => updateData('age', e.target.value)}
              />
              <div className="p-4 bg-zinc-900 rounded-xl border border-dashed border-zinc-800 text-sm text-gray-400">
                <span className="text-forge-red font-bold">Note:</span> Data is used solely to calibrate your AI coach.
              </div>
            </div>
          )}

          {/* STEP 2: Motivation */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-gray-400 text-sm mb-4">What forces you out of bed in the morning?</p>
              <QuizOption 
                selected={data.motivation === 'Family'} 
                onClick={() => updateData('motivation', 'Family')}
                icon={Heart}
                label="Family & Legacy"
                sub="Providing for blood. Building a dynasty."
              />
              <QuizOption 
                selected={data.motivation === 'Relationship'} 
                onClick={() => updateData('motivation', 'Relationship')}
                icon={Users}
                label="Relationship"
                sub="Building a future for a partner."
              />
              <QuizOption 
                selected={data.motivation === 'Peer Pressure'} 
                onClick={() => updateData('motivation', 'Peer Pressure')}
                icon={Flame}
                label="Social Status / Peer Pressure"
                sub="Proving you are better than the rest."
              />
            </div>
          )}

          {/* STEP 3: Feeling */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-gray-400 text-sm mb-4">What emotion burns hottest inside you?</p>
              <QuizOption 
                selected={data.feeling === 'Anger'} 
                onClick={() => updateData('feeling', 'Anger')}
                icon={Flame}
                label="Anger / Frustration"
                sub="Dissatisfaction with the current state."
              />
              <QuizOption 
                selected={data.feeling === 'Revenge'} 
                onClick={() => updateData('feeling', 'Revenge')}
                icon={Skull}
                label="Revenge / Spite"
                sub="They doubted me. They will pay."
              />
              <QuizOption 
                selected={data.feeling === 'Eager to success'} 
                onClick={() => updateData('feeling', 'Eager to success')}
                icon={Target}
                label="Pure Ambition"
                sub="An unexplainable hunger for more."
              />
            </div>
          )}

          {/* STEP 4: Title */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-gray-400 text-sm mb-4">How should the system address you?</p>
              <QuizOption 
                selected={data.title === 'Liege'} 
                onClick={() => updateData('title', 'Liege')}
                icon={Crown}
                label="Liege"
                sub="Royal. Commanding. Old world power."
              />
              <QuizOption 
                selected={data.title === 'Master'} 
                onClick={() => updateData('title', 'Master')}
                icon={Zap}
                label="Master"
                sub="Disciplined. Skilled. In control."
              />
              <QuizOption 
                selected={data.title === 'Boss'} 
                onClick={() => updateData('title', 'Boss')}
                icon={Users}
                label="Boss"
                sub="Modern. Corporate. The one in charge."
              />
              <QuizOption 
                selected={data.title === 'Hustler'} 
                onClick={() => updateData('title', 'Hustler')}
                icon={Flame}
                label="Hustler"
                sub="Gritty. Relentless. On the grind."
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleNext} 
            disabled={!isStepValid()}
            className="group shadow-lg shadow-red-900/20"
          >
            {step === STEPS ? 'Initialize Forge' : 'Next Step'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};