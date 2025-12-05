import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-header">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-forge-red focus:ring-1 focus:ring-forge-red transition-all ${className}`}
        {...props}
      />
    </div>
  );
};