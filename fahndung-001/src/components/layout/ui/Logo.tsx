import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

/**
 * Logo Component
 * Responsive Logo mit Baden-Württemberg Branding
 * WCAG 2.2 AAA konform mit Screenreader Support
 */
export default function Logo({ 
  size = "md", 
  className = "",
  showText = true 
}: LogoProps) {
  const sizeClasses = {
    sm: "space-x-1",
    md: "space-x-2", 
    lg: "space-x-3"
  };

  const iconSizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };

  return (
    <Link 
      href="/" 
      className={`flex items-center space-x-2 transition-all duration-300 ${sizeClasses[size]} ${className}`}
      aria-label="Zur Startseite - Polizei Baden-Württemberg"
    >
      {/* Logo Icon */}
      <div className={`flex items-center justify-center rounded-full bg-blue-600 text-white font-bold transition-all duration-300 ${iconSizeClasses[size]}`}>
        <span>BW</span>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <span className={`font-bold text-gray-900 dark:text-white transition-all duration-300 ${textSizeClasses[size]}`}>
          Polizei Baden-Württemberg
        </span>
      )}
    </Link>
  );
} 