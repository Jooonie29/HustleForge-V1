import React from 'react';
import { Card } from '../components/Card';
import { TrendingUp, Activity, Zap, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PersonaContent } from '../types';

interface DashboardProps {
  persona: PersonaContent;
}

const data = [
  { name: 'MON', score: 40 },
  { name: 'TUE', score: 55 },
  { name: 'WED', score: 85 },
  { name: 'THU', score: 60 },
  { name: 'FRI', score: 95 },
  { name: 'SAT', score: 70 },
  { name: 'SUN', score: 90 },
];

export const Dashboard: React.FC<DashboardProps> = ({ persona }) => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-800 pb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 font-header uppercase tracking-tighter break-words">
            FORGE YOUR <span className="text-forge-red">LEGACY</span>
          </h1>
          <p className="text-gray-400 font-mono text-xs md:text-sm tracking-wide">
             ID: <span className="text-white font-bold">{persona.type.toUpperCase()}</span> // STATUS: <span className="text-green-500">ACTIVE</span>
          </p>
        </div>
        <div className="text-left md:text-right w-full md:w-auto mt-2 md:mt-0">
           <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Current Directive</div>
           <div className="text-xl md:text-2xl font-bold text-white font-header uppercase">{persona.dashboardFocusLabel}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Weekly Focus', value: '94%', icon: Target },
          { label: 'Tasks Done', value: '12', icon: Zap },
          { label: 'Consistency', value: '8 Days', icon: Activity },
          { label: 'Growth', value: '+15%', icon: TrendingUp },
        ].map((stat, i) => (
          <Card key={i} className="flex items-center justify-between group hover:border-forge-red/30 transition-colors p-5">
             <div>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 font-header">{stat.label}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-header">{stat.value}</h3>
             </div>
             <div className="p-3 rounded bg-zinc-950 text-forge-red group-hover:bg-forge-red group-hover:text-white transition-all duration-300">
                <stat.icon size={20} strokeWidth={2} className="md:w-6 md:h-6" />
             </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <Card className="lg:col-span-2 min-h-[350px] md:min-h-[400px] flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg md:text-xl font-bold text-white font-header uppercase tracking-wide flex items-center gap-2">
              <span className="w-1 h-6 bg-forge-red block"></span>
              Productivity Output
            </h3>
            <div className="flex gap-2">
              <button className="text-xs font-bold bg-forge-red text-white px-3 py-1 rounded uppercase">This Week</button>
              <button className="text-xs font-bold bg-zinc-950 text-gray-500 px-3 py-1 rounded uppercase hover:text-white">Last Week</button>
            </div>
          </div>
          
          <div className="flex-1 w-full h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(220, 38, 38, 0.05)' }}
                  contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272a', borderRadius: '4px', color: '#fff', textTransform: 'uppercase', fontFamily: 'Oswald', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="score" 
                  fill="#DC2626" 
                  radius={[2, 2, 0, 0]} 
                  barSize={30}
                  activeBar={{ fill: '#EF4444' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Goals / Tasks Preview */}
        <Card className="flex flex-col h-full bg-gradient-to-b from-zinc-900 to-zinc-950">
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 font-header uppercase tracking-wide flex items-center gap-2">
              <span className="w-1 h-6 bg-forge-red block"></span>
              Mission Log
            </h3>
            <div className="space-y-4 flex-1">
              {[
                { title: 'Morning Protocol', completed: true },
                { title: 'Deep Work Session', completed: true },
                { title: 'Client Outreach', completed: false },
                { title: 'Financial Review', completed: false },
              ].map((goal, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors cursor-pointer group">
                   <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all flex-shrink-0 ${goal.completed ? 'bg-forge-red border-forge-red' : 'border-zinc-600 group-hover:border-forge-red'}`}>
                      {goal.completed && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                   </div>
                   <span className={`font-bold text-sm font-header uppercase tracking-wide ${goal.completed ? 'text-zinc-600 line-through' : 'text-gray-300'}`}>{goal.title}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 rounded bg-zinc-950 border border-zinc-800 text-gray-400 hover:text-white hover:border-forge-red transition-all text-xs font-bold uppercase tracking-widest font-header">
               View Full Protocol
            </button>
        </Card>
      </div>
    </div>
  );
};