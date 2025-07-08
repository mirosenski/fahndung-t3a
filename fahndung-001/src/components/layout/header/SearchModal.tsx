"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Command, Loader2, ArrowRight, Clock, TrendingUp } from 'lucide-react';

// Mock data für Demo
const recentSearches = ["Vermisste Person Berlin", "Fahndung München", "Aktuelle Warnungen"];
const trendingSearches = ["Fahndung Autobahn", "Vermisst seit heute", "Polizei Meldung"];

interface SearchModalProps {
  className?: string;
}

export function SearchModal({ className = "" }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Kleines Delay für smoothe Animation
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + K zum Öffnen
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // ESC zum Schließen
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-search-modal]')) {
        handleClose();
      }
    };

    // Delay to prevent immediate close on open
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Navigation mit Keyboard
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const totalItems = recentSearches.length + trendingSearches.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < totalItems - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : totalItems - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const allItems = [...recentSearches, ...trendingSearches];
          const selectedItem = allItems[selectedIndex];
          if (selectedItem) {
            void handleSearch(selectedItem);
          }
        } else if (query.trim()) {
          void handleSearch(query);
        }
        break;
      case 'Tab':
        // Prevent tab from leaving modal
        if (!e.shiftKey && e.target === searchInputRef.current) {
          e.preventDefault();
        }
        break;
    }
  }, [selectedIndex, query]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search
    setTimeout(() => {
      console.log('Searching for:', searchQuery);
      setIsSearching(false);
      handleClose();
      // In real app: navigate to search results
      const searchUrl = `/suche?q=${encodeURIComponent(searchQuery.trim())}`;
      window.location.href = searchUrl;
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(-1);
    // Return focus to trigger
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 100);
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className={`
          relative group
          p-3 rounded-full
          bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
          border border-gray-200 dark:border-gray-700
          shadow-lg hover:shadow-xl
          transition-all duration-300 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${className}
        `}
        aria-label="Suche öffnen (Strg+K)"
        aria-keyshortcuts="Control+K"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Search className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors" />
        
        {/* Tooltip */}
        <span className="
          absolute -top-12 left-1/2 -translate-x-1/2
          px-3 py-1.5 text-xs text-white bg-gray-900 dark:bg-gray-700
          rounded-lg opacity-0 group-hover:opacity-100
          transition-opacity duration-200 pointer-events-none
          whitespace-nowrap
        ">
          Suche (⌘K)
        </span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/30 backdrop-blur-lg
            animate-in fade-in duration-200
          "
          aria-hidden="true"
        />
      )}

      {/* Search Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fahndungssuche"
          data-search-modal
          className="
            fixed left-1/2 -translate-x-1/2 top-10 w-full max-w-[95vw] z-50
            sm:left-1/2 sm:-translate-x-1/2 sm:top-[15%] sm:translate-y-0 sm:max-w-2xl
            animate-in slide-in-from-bottom-4 duration-300
            rounded-2xl
            shadow-2xl
            bg-white/70 dark:bg-gray-900/70
            backdrop-blur-2xl
            border border-white/30 dark:border-gray-700/50
          "
        >
          {/* Modal Content */}
          <div className="
            bg-white dark:bg-gray-900
            rounded-2xl shadow-2xl
            border border-gray-200 dark:border-gray-700
            overflow-hidden
          ">
            {/* Search Header */}
            <div className="
              flex items-center gap-4 p-4 
              border-b border-gray-100 dark:border-gray-800
            ">
              <Search className={`
                w-5 h-5 text-gray-400
                ${isSearching ? 'animate-pulse' : ''}
              `} />
              
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nach Fahndungen, Vermissten oder Warnungen suchen..."
                className="
                  flex-1 bg-transparent outline-none
                  text-lg text-gray-900 dark:text-white
                  placeholder-gray-500 dark:placeholder-gray-400
                "
                aria-label="Suchbegriff eingeben"
                aria-describedby="search-instructions"
                autoComplete="off"
                spellCheck="false"
              />

              {isSearching ? (
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              ) : (
                <button
                  onClick={handleClose}
                  className="
                    p-2 rounded-lg
                    text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                  aria-label="Suche schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Search Content */}
            <div className="max-h-[400px] overflow-y-auto">
              {/* Quick Actions */}
              {!query && (
                <>
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="p-4">
                      <h3 className="
                        flex items-center gap-2 text-sm font-medium 
                        text-gray-500 dark:text-gray-400 mb-3
                      ">
                        <Clock className="w-4 h-4" />
                        Zuletzt gesucht
                      </h3>
                      <ul role="list">
                        {recentSearches.map((search, index) => (
                          <li key={search} role="listitem">
                            <button
                              onClick={() => handleSearch(search)}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`
                                w-full flex items-center justify-between
                                px-3 py-2.5 -mx-3 rounded-lg
                                text-left text-gray-700 dark:text-gray-300
                                hover:bg-gray-100 dark:hover:bg-gray-800
                                transition-colors
                                ${selectedIndex === index ? 'bg-gray-100 dark:bg-gray-800' : ''}
                              `}
                            >
                              <span>{search}</span>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Trending Searches */}
                  <div className="p-4 pt-0">
                    <h3 className="
                      flex items-center gap-2 text-sm font-medium 
                      text-gray-500 dark:text-gray-400 mb-3
                    ">
                      <TrendingUp className="w-4 h-4" />
                      Häufig gesucht
                    </h3>
                    <ul role="list">
                      {trendingSearches.map((search, index) => (
                        <li key={search} role="listitem">
                          <button
                            onClick={() => handleSearch(search)}
                            onMouseEnter={() => setSelectedIndex(recentSearches.length + index)}
                            className={`
                              w-full flex items-center justify-between
                              px-3 py-2.5 -mx-3 rounded-lg
                              text-left text-gray-700 dark:text-gray-300
                              hover:bg-gray-100 dark:hover:bg-gray-800
                              transition-colors
                              ${selectedIndex === recentSearches.length + index ? 'bg-gray-100 dark:bg-gray-800' : ''}
                            `}
                          >
                            <span>{search}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Search Results würden hier erscheinen */}
              {query && (
                <div className="p-4">
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    Geben Sie Enter ein um nach &quot;{query}&quot; zu suchen
                  </p>
                </div>
              )}
            </div>

            {/* Footer mit Keyboard Shortcuts */}
            <div className="
              px-4 py-3 
              bg-gray-50 dark:bg-gray-800/50
              border-t border-gray-100 dark:border-gray-800
              flex items-center justify-between text-xs text-gray-500 dark:text-gray-400
            ">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">↑↓</kbd>
                  Navigation
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">⏎</kbd>
                  Auswählen
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">ESC</kbd>
                  Schließen
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" />K zum Öffnen
              </span>
            </div>
          </div>

          {/* Screen Reader Instructions */}
          <div id="search-instructions" className="sr-only">
            Verwenden Sie die Pfeiltasten zur Navigation durch die Vorschläge.
            Drücken Sie Enter zum Suchen oder Escape zum Schließen.
          </div>
        </div>
      )}

      {/* Live Region für Screen Reader Updates */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {isOpen && "Suchfenster geöffnet"}
        {isSearching && "Suche läuft..."}
      </div>
    </>
  );
} 