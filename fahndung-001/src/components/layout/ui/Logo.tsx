"use client";

import React, { useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";  // Standard: "md"
  layout?: "horizontal" | "vertical";  // Standard: "horizontal"
  className?: string;
  href?: string;                       // Standard: "/"
  showText?: boolean;                  // Standard: true
  showSubtext?: boolean;              // Standard: true
  imageAlt?: string;                  // Standard: "Polizei Baden-Württemberg Logo"
  imageSrc?: string;                  // Standard: "/images/logo-pbw.svg"
}

/**
 * Logo Component
 * Responsive Logo mit Baden-Württemberg Branding
 * Anti-Flicker Design mit GPU-Optimierung und Width-Synchronisation
 * WCAG 2.2 AAA konform mit Screenreader Support
 */
export default function Logo({ 
  size = "md", 
  layout = "horizontal",
  className = "",
  href = "/",
  showText = true,
  showSubtext = true,
  imageAlt = "Polizei Baden-Württemberg Logo",
  imageSrc = "/images/logo-pbw.svg"
}: LogoProps) {
  const fahndungRef = useRef<HTMLSpanElement>(null);
  const polizeiRef = useRef<HTMLSpanElement>(null);

  // Width-Synchronisation: "POLIZEI BW" exakt so breit wie "FAHNDUNG"
  const syncWidth = useCallback(() => {
    if (fahndungRef.current && polizeiRef.current) {
      const fahndungWidth = fahndungRef.current.getBoundingClientRect().width;
      polizeiRef.current.style.width = `${fahndungWidth}px`;
    }
  }, []);

  useEffect(() => {
    syncWidth();
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, [syncWidth]);

  // Container-Größen (feste 64px Basis)
  const containerSizeClasses = {
    sm: "h-8 w-8",    // 32px via transform scale(0.5)
    md: "h-12 w-12",  // 48px via transform scale(0.75)
    lg: "h-16 w-16",  // 64px nativ
    xl: "h-20 w-20"   // 80px via transform scale(1.25)
  };

  // Transform-Skalen für GPU-Optimierung
  const transformScale = {
    sm: "scale-50",
    md: "scale-75", 
    lg: "scale-100",
    xl: "scale-125"
  };

  // Text-Größen (fluid responsive)
  const textSizeClasses = {
    sm: "clamp(0.625rem, 0.5rem + 0.5vw, 0.75rem)",
    md: "clamp(0.75rem, 0.625rem + 0.5vw, 0.875rem)",
    lg: "clamp(0.875rem, 0.75rem + 0.5vw, 1rem)",
    xl: "clamp(1rem, 0.875rem + 0.5vw, 1.125rem)"
  };

  // Layout-Klassen
  const layoutClasses = {
    horizontal: "flex items-center",
    vertical: "flex flex-col items-center"
  };

  const spacingClasses = {
    horizontal: {
      sm: "space-x-1",
      md: "space-x-2", 
      lg: "space-x-3",
      xl: "space-x-4"
    },
    vertical: {
      sm: "space-y-1",
      md: "space-y-2",
      lg: "space-y-3", 
      xl: "space-y-4"
    }
  };

  return (
    <Link 
      href={href} 
      className={`group flex items-center transition-all duration-300 ease-out transform-gpu ${layoutClasses[layout]} ${spacingClasses[layout][size]} ${className}`}
      aria-label="Polizei Baden-Württemberg Fahndungsportal"
      role="img"
    >
      {/* Logo Image Container - Layout-stabil mit festen Dimensionen */}
      <div className={`relative ${containerSizeClasses[size]} flex items-center justify-center transition-all duration-300 ease-out transform-gpu will-change-transform group-hover:scale-110`}>
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
        
        {/* Logo Image */}
        <Image 
          src={imageSrc}
          alt={imageAlt}
          width={64}
          height={64}
          className={`relative ${containerSizeClasses[size]} transition-all duration-300 ease-out transform-gpu ${transformScale[size]} object-contain`}
        />
      </div>
      
      {/* Logo Text Container */}
      {showText && (
        <div className={`flex flex-col transition-all duration-300 ease-out will-change-transform ${layout === 'vertical' ? 'items-center' : ''}`}>
          {/* Haupttext */}
          <span 
            ref={fahndungRef}
            className={`font-bold text-gray-900 dark:text-white transition-all duration-300 ease-out will-change-transform ${textSizeClasses[size]}`}
            style={{ fontSize: textSizeClasses[size] }}
          >
            FAHNDUNG
          </span>
          
          {/* Untertext */}
          {showSubtext && (
            <span 
              ref={polizeiRef}
              className={`font-light text-gray-600 dark:text-gray-300 transition-all duration-300 ease-out will-change-transform ${textSizeClasses[size]}`}
              style={{ fontSize: textSizeClasses[size] }}
            >
              POLIZEI BW
            </span>
          )}
        </div>
      )}
    </Link>
  );
} 