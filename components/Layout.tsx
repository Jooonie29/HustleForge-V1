import React from 'react';
import { LayoutDashboard, Briefcase, Bot, CalendarCheck, Settings, LogOut, Flame } from 'lucide-react';
import { NavigationTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onLogout: () => void;
  userTitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onLogout, userTitle = "Hustler" }) => {
  const navItems = [
    { icon: LayoutDashboard, label: NavigationTab.DASHBOARD },
    { icon: Briefcase, label: NavigationTab.HUSTLE },
    { icon: Bot, label: NavigationTab.COACH },
    { icon: CalendarCheck, label: NavigationTab.ROUTINE },
    { icon: Settings, label: NavigationTab.SETTINGS },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-zinc-900 bg-zinc-950 sticky top-0 h-screen z-20">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-forge-red text-white p-2 rounded shadow-lg shadow-red-900/20">
             <Flame size={24} strokeWidth={2.5} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tighter leading-none font-header uppercase">HustleForge</h1>
            <span className="text-[10px] text-forge-red font-bold uppercase tracking-[0.2em]">{userTitle} Mode</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onTabChange(item.label)}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-md transition-all duration-200 group
                ${activeTab === item.label 
                  ? 'bg-zinc-900 border-l-4 border-forge-red text-white' 
                  : 'text-gray-500 hover:bg-zinc-900 hover:text-gray-300 border-l-4 border-transparent'
                }
              `}
            >
              <item.icon size={20} className={activeTab === item.label ? 'text-forge-red' : 'group-hover:text-gray-300 transition-colors'} />
              <span className={`font-bold text-sm tracking-wide uppercase font-header ${activeTab === item.label ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-900">
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-red-950/20 hover:text-red-500 rounded-md transition-all"
           >
             <LogOut size={20} />
             <span className="font-bold text-sm uppercase tracking-wide font-header">Logout</span>
           </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-900 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
           <div className="text-forge-red">
             <Flame size={24} fill="currentColor" />
           </div>
           <span className="font-bold text-xl text-white font-header uppercase tracking-tight">HustleForge</span>
        </div>
        <button onClick={onLogout} className="text-gray-500 p-2 active:bg-zinc-900 rounded hidden">
          <LogOut size={20} />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 pb-24 md:pb-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-900 px-4 py-2 flex justify-between z-30 safe-area-bottom pb-4 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onTabChange(item.label)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === item.label ? 'text-forge-red' : 'text-zinc-600 active:text-zinc-400'}`}
          >
            <item.icon size={22} strokeWidth={activeTab === item.label ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase font-header tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};