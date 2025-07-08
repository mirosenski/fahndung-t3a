"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "~/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  }, [isDark, setTheme, mounted]);

  if (!mounted) return null;

  const handleToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative group"
      aria-label={isDark ? "Zu hellem Modus wechseln" : "Zu dunklem Modus wechseln"}
      role="switch"
      aria-checked={isDark}
    >
      {/* Glassmorphism Container */}
      <div className="relative w-[72px] h-[36px] rounded-full 
        bg-gradient-to-r from-blue-100/80 to-purple-100/80 
        dark:from-blue-900/40 dark:to-purple-900/40
        backdrop-blur-xl border border-white/30 dark:border-white/10
        shadow-inner shadow-black/10 dark:shadow-black/30
        overflow-hidden transition-all duration-500 ease-out
        hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-blue-500/20"
      >
        {/* Sliding Background */}
        <div className={`absolute inset-0 transition-all duration-700 ease-out
          bg-gradient-to-br ${isDark 
            ? 'from-indigo-600/30 via-purple-600/20 to-pink-600/30' 
            : 'from-yellow-400/30 via-orange-400/20 to-pink-400/30'
          }`} 
        />
        
        {/* Toggle Circle */}
        <div className={`absolute top-[3px] w-[30px] h-[30px] 
          bg-white dark:bg-gray-900
          rounded-full shadow-lg shadow-black/20
          transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
          flex items-center justify-center
          ${isDark ? 'translate-x-[39px] rotate-[360deg]' : 'translate-x-[3px] rotate-0'}`}
        >
          {/* Icons */}
          <div className="relative w-5 h-5">
            {/* Sun Icon (angepasst, stilisiert) */}
            <svg 
              className={`absolute inset-0 w-5 h-5 transition-all duration-500
                ${isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
              fill="none" 
              viewBox="0 0 24 24"
            >
              {/* Zentraler Kreis */}
              <circle cx="12" cy="12" r="5" fill="#FFA500" />
              {/* 8 Strahlen */}
              <g stroke="#FFA500" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="5.64" y1="5.64" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="18.36" y2="18.36" />
                <line x1="5.64" y1="18.36" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="18.36" y2="5.64" />
              </g>
            </svg>
            
            {/* Moon Icon */}
            <svg 
              className={`absolute inset-0 w-5 h-5 transition-all duration-500
                ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`}
              fill="none" 
              viewBox="0 0 24 24"
            >
              <path 
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
                className="fill-indigo-400 stroke-indigo-500"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        
        {/* Ambient Light Effect */}
        <div className={`absolute w-full h-full transition-opacity duration-700
          ${isDark ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="absolute top-1/2 left-[18px] -translate-x-1/2 -translate-y-1/2
            w-8 h-8 bg-yellow-300/30 rounded-full blur-xl animate-pulse" />
        </div>
        
        <div className={`absolute w-full h-full transition-opacity duration-700
          ${isDark ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute top-1/2 right-[18px] translate-x-1/2 -translate-y-1/2
            w-8 h-8 bg-indigo-400/30 rounded-full blur-xl animate-pulse" />
        </div>
      </div>
      
      {/* Hover Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 
        px-3 py-1.5 text-xs font-medium
        bg-gray-900/90 dark:bg-white/90 
        text-white dark:text-gray-900
        rounded-full opacity-0 group-hover:opacity-100
        transition-all duration-300 pointer-events-none
        whitespace-nowrap backdrop-blur-xl"
      >
        {isDark ? 'Hell' : 'Dunkel'}
      </span>
    </button>
  );
} 