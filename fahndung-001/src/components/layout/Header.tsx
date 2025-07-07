"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

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
                className="w-full rounded-lg bg-blue-800 px-4 py-2 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform text-blue-300 hover:text-white"
              >
                🔍
              </button>
            </form>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700">
                    <span className="text-sm font-medium text-white">
                      {session.user?.name?.[0] || "U"}
                    </span>
                  </div>
                  <span className="hidden text-sm sm:block">
                    {session.user?.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm transition-colors hover:bg-red-700"
                >
                  Abmelden
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm transition-colors hover:bg-blue-700"
              >
                Anmelden
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
