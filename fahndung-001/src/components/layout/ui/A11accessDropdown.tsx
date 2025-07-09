"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

/**
 * A11accessDropdown Component
 * Barrierefreiheits-Menü mit Leichte Sprache & Gebärdensprache
 * Icons passen sich an Dark/Light-Mode an
 */
export default function A11accessDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  // Icon-Pfade
  const iconDefault = "/images/accessibility_icons_bw/icon-accessability.svg";
  const iconActive = "/images/accessibility_icons_bw/icon-accessability-fill.svg";
  const iconLeichteSpracheBlack = "/images/accessibility_icons_bw/icon_leichte_sprache_schwarz.svg";
  const iconLeichteSpracheWhite = "/images/accessibility_icons_bw/icon_leichte_sprache_weiss.svg";
  const iconGebärdeBlack = "/images/accessibility_icons_bw/icon_gebaerdensprache_schwarz.svg";
  const iconGebärdeWhite = "/images/accessibility_icons_bw/icon_gebaerdensprache_weiss.svg";

  // Kontrast- und Schriftgrößen-Logik (wie in A11nav)
  const toggleContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
    localStorage.setItem('high-contrast', document.documentElement.classList.contains('high-contrast').toString());
  };
  const increaseFontSize = () => {
    const currentSize = parseInt(localStorage.getItem('font-size') ?? '100');
    const newSize = Math.min(currentSize + 10, 150);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('font-size', newSize.toString());
  };
  const decreaseFontSize = () => {
    const currentSize = parseInt(localStorage.getItem('font-size') ?? '100');
    const newSize = Math.max(currentSize - 10, 80);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('font-size', newSize.toString());
  };
  const resetFontSize = () => {
    document.documentElement.style.fontSize = '100%';
    localStorage.setItem('font-size', '100');
  };

  // Theme-Toggle-Logik (wie im Original)
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches;
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark', newTheme);
      }
    };
    const savedTheme = localStorage.getItem('theme');
    const systemDark = mediaQuery.matches;
    let currentTheme: boolean;
    if (savedTheme) {
      currentTheme = savedTheme === 'dark';
    } else {
      currentTheme = systemDark;
    }
    setIsDark(currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme);
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);
  const toggleTheme = useCallback(() => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const root = document.documentElement;
    root.style.transition = 'color-scheme 0.3s ease, background-color 0.3s ease';
    root.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    const message = newTheme ? 'Dunkles Theme aktiviert' : 'Helles Theme aktiviert';
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
    setTimeout(() => {
      root.style.transition = '';
    }, 300);
  }, [isDark]);
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  }, [toggleTheme]);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center justify-center w-10 h-10 p-2 rounded-lg text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        aria-label="Barrierefreiheit-Menü"
        aria-expanded={isOpen}
        type="button"
      >
        {/* Icon: normal/active */}
        <img
          src={isOpen ? iconActive : iconDefault}
          alt="Barrierefreiheit"
          className="w-full h-full object-contain"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-10 z-20 min-w-[220px] rounded-lg bg-white dark:bg-gray-800 py-2 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
          {/* Leichte Sprache */}
          <button
            className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors group"
            type="button"
          >
            {/* Icon: passt sich an Theme an */}
            <span className="relative w-6 h-6 flex items-center justify-center">
              <img
                src={iconLeichteSpracheBlack}
                alt="Leichte Sprache Icon"
                className="w-6 h-6 block dark:hidden group-hover:hidden"
              />
              <img
                src={iconLeichteSpracheWhite}
                alt="Leichte Sprache Icon Hell"
                className="w-6 h-6 hidden dark:block group-hover:hidden"
              />
              {/* Hover/Active: immer weiß */}
              <img
                src={iconLeichteSpracheWhite}
                alt="Leichte Sprache Icon Hover"
                className="w-6 h-6 hidden group-hover:block"
              />
            </span>
            Leichte Sprache
          </button>

          <div className="border-t my-1 border-gray-200 dark:border-gray-700" />

          {/* Gebärdensprache */}
          <button
            className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors group"
            type="button"
          >
            <span className="relative w-6 h-6 flex items-center justify-center">
              <img
                src={iconGebärdeBlack}
                alt="Gebärdensprache Icon"
                className="w-6 h-6 block dark:hidden group-hover:hidden"
              />
              <img
                src={iconGebärdeWhite}
                alt="Gebärdensprache Icon Hell"
                className="w-6 h-6 hidden dark:block group-hover:hidden"
              />
              {/* Hover/Active: immer weiß */}
              <img
                src={iconGebärdeWhite}
                alt="Gebärdensprache Icon Hover"
                className="w-6 h-6 hidden group-hover:block"
              />
            </span>
            Gebärdensprache
          </button>

          {/* --- Theme & Schriftgröße --- */}
          <div className="border-t my-2 border-gray-200 dark:border-gray-700" />
          <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">Schriftgröße</div>
          <div className="flex items-center gap-2 px-4 py-2 justify-center">
            <button
              onClick={decreaseFontSize}
              className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Schriftgröße verkleinern"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={resetFontSize}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Reset
            </button>
            <button
              onClick={increaseFontSize}
              className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Schriftgröße vergrößern"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 