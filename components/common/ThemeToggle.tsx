'use client';

import React from 'react';
import { useTheme } from '@/lib/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
  variant?: 'icon' | 'pill' | 'switch';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  showLabel = false, 
  className = '',
  variant = 'icon'
}) => {
  const { theme, toggleTheme, isMounted } = useTheme();

  // Guard against hydration mismatch before mount
  if (!isMounted) {
    return (
      <div 
        className={`w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse ${className}`}
        aria-hidden="true" 
      />
    );
  }

  const isDark = theme === 'dark';

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
          isDark
            ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 shadow-sm'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 shadow-sm'
        } ${className}`}
      >
        {isDark ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-in spin-in-180 duration-300" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-blue-600 animate-in spin-in-180 duration-300" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
          isDark ? 'bg-blue-600' : 'bg-slate-300'
        } ${className}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
            isDark ? 'translate-x-5 text-blue-600' : 'translate-x-0 text-amber-500'
          }`}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-blue-600" />
          ) : (
            <Sun className="w-3 h-3 text-amber-500" />
          )}
        </span>
      </button>
    );
  }

  // Default: sleek icon button with tooltip
  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative p-2 rounded-lg transition-all duration-200 border flex items-center justify-center gap-1.5 text-xs font-medium group ${
        isDark
          ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 hover:border-slate-600'
          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
      
      {showLabel && (
        <span className="text-xs">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
