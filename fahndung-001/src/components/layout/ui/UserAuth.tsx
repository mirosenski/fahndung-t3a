"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface UserAuthProps {
  variant?: 'desktop' | 'mobile';
  size?: 'default' | 'compact';
  className?: string;
}

/**
 * UserAuth Component (neu)
 * Zeigt je nach Login-Status Avatar/Initialen mit Dropdown oder Sign-In-Button.
 * Prinzip: Avatar (mit Dropdown) ODER Sign-In-Button, Styling flexibel anpassbar.
 */
export default function UserAuth({ 
  variant = "desktop", 
  size = "default",
  className = ""
}: UserAuthProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const demoSession = localStorage.getItem("demo-session");
    if (demoSession) {
      try {
        const sessionData = JSON.parse(demoSession) as { userImage?: string };
        setIsLoggedIn(true);
        setUserImage(sessionData.userImage ?? null);
      } catch {
        localStorage.removeItem("demo-session");
      }
    }
    // Reagiere auf Login/Logout in anderen Tabs oder nach Login-Redirect
    function handleSessionChange(e: Event) {
      if (e.type === "storage") {
        const storageEvent = e as StorageEvent;
        if (storageEvent.key !== "demo-session") return;
      }
      const session = localStorage.getItem("demo-session");
      if (session) {
        try {
          const sessionData = JSON.parse(session) as { userImage?: string };
          setIsLoggedIn(true);
          setUserImage(sessionData.userImage ?? null);
        } catch {
          setIsLoggedIn(false);
          setUserImage(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserImage(null);
      }
    }
    window.addEventListener("storage", handleSessionChange);
    window.addEventListener("demo-session-changed", handleSessionChange);
    return () => {
      window.removeEventListener("storage", handleSessionChange);
      window.removeEventListener("demo-session-changed", handleSessionChange);
    };
  }, []);

  // Dropdown schließt bei Klick außerhalb
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // Tastatursteuerung für Dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        avatarButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("demo-session");
    setIsLoggedIn(false);
    setUserImage(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  // Styling-Varianten
  const buttonSizeClasses = {
    default: "px-4 py-2 text-sm",
    compact: "px-3 py-1.5 text-xs"
  };
  const avatarSizeClasses = {
    default: "h-8 w-8 text-sm",
    compact: "h-7 w-7 text-xs"
  };
  const avatarBorder = "border-2 border-blue-700 dark:border-blue-400";

  // NICHT eingeloggt: Sign-In-Button
  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className={`rounded-full border border-gray-400 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${buttonSizeClasses[size]} ${className}`}
      >
        Anmelden
      </Link>
    );
  }

  // EINGELOGGT: Avatar/Initialen + Dropdown
  return (
    <div
      className={`flex items-center space-x-2 relative ${className}`}
      ref={dropdownRef}
      onMouseEnter={() => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setDropdownOpen(true);
      }}
      onMouseLeave={() => {
        closeTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
      }}
    >
      {/* Avatar oder Initialen */}
      <button
        ref={avatarButtonRef}
        className={`flex items-center justify-center rounded-full bg-blue-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all ${avatarSizeClasses[size]} ${avatarBorder}`}
        tabIndex={0}
        aria-label="Benutzermenü öffnen"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={() => setDropdownOpen((open) => !open)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDropdownOpen((open) => !open);
            setTimeout(() => firstMenuItemRef.current?.focus(), 0);
          }
        }}
      >
        {userImage ? (
          <img src={userImage} alt="Profilbild" className="rounded-full object-cover w-full h-full" />
        ) : (
          <span>D</span>
        )}
      </button>
      {/* Dropdown-Menü */}
      {dropdownOpen && (
        <div
          className="absolute right-0 top-10 z-20 min-w-[260px] rounded-xl bg-white dark:bg-gray-900 py-2 shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in focus:outline-none"
          role="menu"
          onMouseEnter={() => {
            if (closeTimeout.current) clearTimeout(closeTimeout.current);
            setDropdownOpen(true);
          }}
          onMouseLeave={() => {
            closeTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
          }}
        >
          {/* Neue Fahndung */}
          <Link
            href="/fahndung/erstellen"
            ref={firstMenuItemRef}
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-blue-50 dark:focus:bg-blue-900/30 outline-none"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium"><span>➕</span> Neue Fahndung</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">Fahndung erstellen</span>
          </Link>
          {/* Meine Fahndungen */}
          <Link
            href="/fahndung/meine"
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-blue-50 dark:focus:bg-blue-900/30 outline-none"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium"><span>🗂️</span> Meine Fahndungen</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">Übersicht anzeigen</span>
          </Link>
          {/* Hilfe */}
          <Link
            href="/hilfe"
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-blue-50 dark:focus:bg-blue-900/30 outline-none"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium"><span>❓</span> Hilfe</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">FAQ & Support</span>
          </Link>
          {/* Einstellungen */}
          <Link
            href="/profil/einstellungen"
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-blue-50 dark:focus:bg-blue-900/30 outline-none"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium"><span>⚙️</span> Einstellungen</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">Profil verwalten</span>
          </Link>
          {/* Profil verwalten */}
          <Link
            href="/profil"
            className="flex flex-col gap-0.5 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-blue-50 dark:focus:bg-blue-900/30 outline-none"
            tabIndex={0}
            role="menuitem"
          >
            <span className="flex items-center gap-2 font-medium"><span>👤</span> Profil verwalten</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">Persönliche Daten</span>
          </Link>
          <div className="border-t my-2 border-gray-200 dark:border-gray-700" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left focus:bg-red-100 dark:focus:bg-red-900/40 outline-none"
            tabIndex={0}
            role="menuitem"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      )}
    </div>
  );
} 