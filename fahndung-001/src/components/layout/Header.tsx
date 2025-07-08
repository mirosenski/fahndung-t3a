"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <span className="text-sm font-bold text-blue-900">BW</span>
              </div>
              <span className="text-xl font-bold">
                Polizei Baden-Württemberg
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden space-x-8 md:flex">
            <Link href="/" className="transition-colors hover:text-blue-200">
              SICHERHEIT
            </Link>
            <Link
              href="/hilfe"
              className="transition-colors hover:text-blue-200"
            >
              SERVICE
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-blue-200"
            >
              POLIZEI
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="mx-8 max-w-md flex-1">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Fahndung suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-blue-800 px-4 py-2 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2 -translate-y-1/2 transform text-blue-300 hover:text-white"
              >
                🔍
              </button>
            </form>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div
                className="flex items-center space-x-3 relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                {/* Avatar und Name als Dropdown-Trigger */}
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  tabIndex={0}
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700">
                    <span className="text-sm font-medium text-white">
                      {userName[0] ?? "U"}
                    </span>
                  </div>
                  <span className="hidden text-sm sm:block">
                    {userName}
                  </span>
                  <svg className="ml-1 h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {/* Dropdown-Menü */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 top-10 z-10 min-w-[220px] rounded-lg bg-white py-2 shadow-lg border border-blue-100 animate-fade-in"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href="/fahndung/erstellen"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:bg-blue-50"
                    >
                      <span>➕</span> Neue Fahndung
                    </Link>
                    <Link
                      href="/fahndung/meine"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:bg-blue-50"
                    >
                      <span>🗂️</span> Meine Fahndungen
                    </Link>
                    <div className="border-t my-2 border-blue-100" />
                    <Link
                      href="/hilfe"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:bg-blue-50"
                    >
                      <span>❓</span> Hilfe
                    </Link>
                    <Link
                      href="/hilfe/faq"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:bg-blue-50"
                    >
                      <span>❓</span> FAQ & Support
                    </Link>
                    <div className="border-t my-2 border-blue-100" />
                    <Link
                      href="/profil/einstellungen"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:bg-blue-50"
                    >
                      <span>⚙️</span> Einstellungen
                    </Link>
                    <Link
                      href="/profil"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-900 hover:bg-blue-50"
                    >
                      <span>👤</span> Profil verwalten
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => {
                    localStorage.removeItem("demo-session");
                    setIsLoggedIn(false);
                    setUserName("");
                    window.location.href = "/";
                  }}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm transition-colors hover:bg-red-700 ml-2"
                >
                  Abmelden
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm transition-colors hover:bg-blue-700"
              >
                Anmelden
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
