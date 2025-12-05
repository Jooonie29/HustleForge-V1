import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-bold tracking-wide rounded-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm font-header";
  
  const variants = {
    primary: "bg-forge-red text-white hover:bg-forge-dark shadow-lg shadow-red-900/20",
    secondary: "bg-transparent border-2 border-zinc-700 text-gray-300 hover:border-forge-red hover:text-white",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
  };

  const padding = "px-6 py-3.5";
  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${padding} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};