import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glowing?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, glowing = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-zinc-900
        border border-zinc-800
        rounded-lg p-6 
        shadow-xl
        transition-all duration-300
        relative overflow-hidden
        ${onClick ? 'cursor-pointer hover:border-forge-red/50 hover:bg-zinc-850' : ''}
        ${glowing ? 'border-forge-red/40 shadow-[0_0_20px_rgba(220,38,38,0.1)]' : ''}
        ${className}
      `}
    >
      {/* Subtle top highlight for depth */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5 pointer-events-none"></div>
      {children}
    </div>
  );
};