"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface UserAuthProps {
  variant?: 'desktop' | 'mobile';
  size?: 'default' | 'compact';
  className?: string;
}

/**
 * UserAuth Component
 * Login/Logout Funktionalität mit User-Dropdown
 * Session-Management und Demo-Authentifizierung
 */
export default function UserAuth({ 
  variant = "desktop", 
  size = "default",
  className = ""
}: UserAuthProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Prüfe, ob Benutzer eingeloggt ist (Demo-Session)
    const demoSession = localStorage.getItem("demo-session");
    if (demoSession) {
      try {
        const sessionData = JSON.parse(demoSession) as { userName?: string };
        setIsLoggedIn(true);
        setUserName(sessionData.userName ?? "Demo User");
      } catch {
        // Bei ungültigem JSON zurücksetzen
        localStorage.removeItem("demo-session");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("demo-session");
    setIsLoggedIn(false);
    setUserName("");
    setDropdownOpen(false);
    window.location.href = "/";
  };

  const buttonSizeClasses = {
    default: "px-4 py-2 text-sm",
    compact: "px-3 py-1.5 text-xs"
  };

  const avatarSizeClasses = {
    default: "h-8 w-8 text-sm",
    compact: "h-7 w-7 text-xs"
  };

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className={`rounded-lg bg-blue-600 px-4 py-2 text-sm transition-colors hover:bg-blue-700 text-white ${buttonSizeClasses[size]} ${className}`}
      >
        Anmelden
      </Link>
    );
  }

  return (
    <div className={`flex items-center space-x-3 relative ${className}`}>
      {/* Avatar+Name als Link zum Dashboard */}
      <Link
        href="/dashboard"
        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-lg"
        tabIndex={0}
        aria-label="Zum Dashboard"
        role="link"
      >
        <div className={`flex items-center justify-center rounded-full bg-blue-700 text-white font-medium ${avatarSizeClasses[size]}`}>
          <span>{userName[0] ?? "U"}</span>
        </div>
        {variant === 'desktop' && (
          <span className="hidden text-sm sm:block text-gray-900 dark:text-white">
            {userName}
          </span>
        )}
      </Link>
      
      {/* Chevron als eigener Button für Dropdown */}
      <button
        className="ml-1 h-8 w-8 flex items-center justify-center focus:outline-none"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        aria-label="Menü öffnen"
        onClick={() => setDropdownOpen((open) => !open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDropdownOpen((open) => !open);
          }
        }}
      >
        <svg className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown-Menü */}
      {dropdownOpen && (
        <div
          className="absolute right-0 top-10 z-10 min-w-[220px] rounded-lg bg-white dark:bg-gray-800 py-2 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link
            href="/fahndung/erstellen"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>➕</span> Neue Fahndung
          </Link>
          <Link
            href="/fahndung/meine"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>🗂️</span> Meine Fahndungen
          </Link>
          <div className="border-t my-2 border-gray-200 dark:border-gray-600" />
          <Link
            href="/hilfe"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>❓</span> Hilfe
          </Link>
          <Link
            href="/hilfe/faq"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>❓</span> FAQ & Support
          </Link>
          <div className="border-t my-2 border-gray-200 dark:border-gray-600" />
          <Link
            href="/profil/einstellungen"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>⚙️</span> Einstellungen
          </Link>
          <Link
            href="/profil"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span>👤</span> Profil verwalten
          </Link>
          <div className="border-t my-2 border-gray-200 dark:border-gray-600" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
          >
            <span>🚪</span> Abmelden
          </button>
        </div>
      )}
    </div>
  );
} 