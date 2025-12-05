import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, Bell, Shield, CreditCard, ChevronRight, Flame } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-white font-header uppercase tracking-tighter border-b border-zinc-800 pb-6">Account Settings</h1>

      <div className="flex items-center gap-6 mb-8 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <div className="w-20 h-20 rounded bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-zinc-600 relative overflow-hidden group cursor-pointer hover:border-forge-red transition-colors">
           <User size={40} />
           <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white font-bold uppercase tracking-widest">Edit</div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white font-header uppercase">Alex Hustler</h2>
          <p className="text-gray-500 text-sm mb-3">alex@hustleforge.com</p>
          <span className="bg-forge-red text-white px-3 py-1 rounded-sm text-xs font-header uppercase tracking-widest font-bold">
            Elite Tier
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { icon: User, label: 'Profile Information', desc: 'Update identity parameters' },
          { icon: Bell, label: 'Notifications', desc: 'Alert configuration' },
          { icon: Shield, label: 'Security', desc: 'Encryption and access control' },
          { icon: CreditCard, label: 'Membership', desc: 'Manage billing cycle' },
        ].map((item, i) => (
          <Card key={i} className="flex items-center justify-between group cursor-pointer hover:bg-zinc-850 p-5 bg-zinc-900 border border-zinc-800">
             <div className="flex items-center gap-5">
               <div className="p-3 bg-zinc-950 rounded text-gray-500 group-hover:text-forge-red transition-colors border border-zinc-800">
                 <item.icon size={20} />
               </div>
               <div>
                 <h3 className="text-white font-bold uppercase font-header tracking-wide text-lg">{item.label}</h3>
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.desc}</p>
               </div>
             </div>
             <ChevronRight size={20} className="text-zinc-700 group-hover:text-white transition-colors" />
          </Card>
        ))}
      </div>

      <div className="pt-8 border-t border-zinc-800">
        <h3 className="text-white font-bold mb-4 font-header uppercase">Danger Zone</h3>
        <Button variant="secondary" className="border-red-900/50 text-red-700 hover:bg-red-950 hover:border-red-800 hover:text-red-500 w-full justify-start">
          Deactivate Protocol
        </Button>
      </div>
    </div>
  );
};