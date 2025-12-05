import React, { useState } from 'react';
import { Card } from '../components/Card';
import { PersonaContent } from '../types';
import { Check, Clock, Square, Target } from 'lucide-react';

interface RoutineProps {
  persona: PersonaContent;
}

export const Routine: React.FC<RoutineProps> = ({ persona }) => {
  const [tasks, setTasks] = useState(persona.defaultRoutine || []);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-10 animate-fade-in">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 md:pb-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-header uppercase tracking-tighter">Today's Quest</h1>
                <p className="text-gray-400 font-medium text-sm md:text-base">Optimized for <span className="text-forge-red font-bold">{persona.type}</span> performance.</p>
            </div>
            <div className="text-right">
                <div className="text-4xl md:text-5xl font-black text-forge-red font-header">
                    {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
                </div>
                <div className="text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-widest">Efficiency Rate</div>
            </div>
        </div>

        <div className="space-y-3 md:space-y-4">
            {tasks.map((task) => (
                <Card 
                    key={task.id} 
                    onClick={() => toggleTask(task.id)}
                    className={`
                        flex items-center justify-between p-4 md:p-6 cursor-pointer group transition-all
                        ${task.completed ? 'bg-zinc-950 border-zinc-900' : 'hover:bg-zinc-850 hover:border-zinc-700'}
                    `}
                >
                    <div className="flex items-center gap-4 md:gap-8 w-full">
                        <div className={`
                            w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border-2 rounded-sm transition-all flex-shrink-0
                            ${task.completed ? 'bg-forge-red border-forge-red text-white' : 'border-zinc-600 group-hover:border-white'}
                        `}>
                            {task.completed && <Check size={16} strokeWidth={4} className="md:w-5 md:h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className={`text-lg md:text-xl font-bold font-header uppercase tracking-wide mb-1 transition-colors truncate ${task.completed ? 'text-zinc-600 line-through' : 'text-white'}`}>
                                {task.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
                                <span className={`flex items-center gap-1 ${task.completed ? 'text-zinc-700' : 'text-forge-red'}`}>
                                    <Clock size={12} /> {task.time}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800">{task.category}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
};