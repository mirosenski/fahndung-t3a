"use client";

import React from 'react';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import A11nav from '../ui/a11nav';
import UserAuth from '../ui/UserAuth';
import { HoverMegaMenu } from './HoverMegaMenu';
import { SearchModal } from './SearchModal';

interface DesktopHeaderProps {
  isScrolled: boolean;
}

/**
 * DesktopHeader Component
 * Desktop Navigation (1024px+) mit Glassmorphism
 * Scroll-adaptive Größe und Schatten
 */
export default function DesktopHeader({ isScrolled }: DesktopHeaderProps) {
  return (
    <div className={`hidden lg:block mx-auto w-full max-w-[1273px] rounded-[10px] border border-gray-300/70 dark:border-white/20 backdrop-blur-[50px] bg-white/60 dark:bg-gray-900/40 px-6 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'mt-2 h-[80px] shadow-xl shadow-black/10 bg-white/80 dark:bg-gray-900/50' 
        : 'mt-4 h-[106px] shadow-lg shadow-black/5'
    }`}>
      <div className="w-full h-full flex items-center justify-between">
        
        {/* Logo */}
        <Logo size={isScrolled ? "md" : "lg"} />

        {/* Navigation */}
        <nav 
          className="flex items-center gap-4" 
          role="navigation" 
          aria-label="Hauptnavigation Desktop"
        >
          {/* Mega Menu Items */}
          <HoverMegaMenu title="SICHERHEIT" />
          <HoverMegaMenu title="SERVICE" />
          <HoverMegaMenu title="POLIZEI" />
          
          {/* Right Actions */}
          <div className="flex items-center gap-3 ml-6">
            <SearchModal />
            <UserAuth variant="desktop" size={isScrolled ? 'compact' : 'default'} />
            <ThemeToggle />
            <A11nav />
          </div>
        </nav>
      </div>
    </div>
  );
}