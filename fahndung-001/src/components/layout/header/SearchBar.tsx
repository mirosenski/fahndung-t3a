"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBarProps {
  variant?: 'desktop' | 'mobile';
  size?: 'default' | 'compact' | 'large';
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
}

/**
 * SearchBar Component
 * Responsive Search mit Clear-Button und Keyboard Support
 * Live-Search und Accessibility
 */
export function SearchBar({ 
  variant = "desktop", 
  size = "default", 
  className = "",
  placeholder = "Suche",
  onSearch,
  onClear,
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Responsive width based on variant and size
  const getWidth = () => {
    if (variant === 'mobile') return 'w-full';
    if (size === 'compact') return 'w-44';
    return 'w-52';
  };

  // Debounced search function
  const debouncedSearch = useDebouncedCallback((term: string) => {
    if (term.trim()) {
      const searchUrl = `/suche?q=${encodeURIComponent(term.trim())}`;
      window.location.href = searchUrl;
    }
  }, 500);

  // Handle Input Change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch?.(newQuery);
    
    // Trigger debounced search
    debouncedSearch(newQuery);
  }, [onSearch, debouncedSearch]);

  // Handle Form Submit
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigation zur Suchseite mit Query-Parameter
      const searchUrl = `/suche?q=${encodeURIComponent(query.trim())}`;
      window.location.href = searchUrl;
    }
  }, [query]);

  // Handle Clear
  const handleClear = useCallback(() => {
    setQuery('');
    onClear?.();
    inputRef.current?.focus();
  }, [onClear]);

  // Keyboard Shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (query) {
        handleClear();
      } else {
        inputRef.current?.blur();
      }
    }
  }, [query, handleClear]);

  // Focus Handlers
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const iconSize = size === 'large' ? 'w-5 h-5' : 'w-4 h-4';
  const iconPosition = size === 'large' ? 'left-4' : 'left-3';
  const clearPosition = size === 'large' ? 'right-4' : 'right-3';

  const baseClasses = "relative flex items-center transition-all duration-200";
  const variantClasses = variant === 'desktop' 
    ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg focus-within:bg-white/95 dark:focus-within:bg-gray-900/95 focus-within:border-blue-500"
    : "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-blue-500";

  const sizeClasses = {
    default: "h-10",
    compact: "h-9",
    large: "h-12"
  };

  const inputSizeClasses = {
    default: "px-10 text-sm",
    compact: "px-9 text-sm",
    large: "px-12 text-base"
  };

  return (
    <form onSubmit={handleSubmit} className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} ${getWidth()} ${className}`}>
      {/* Search Icon */}
      <svg 
        className={`absolute text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-200 ${iconSize} ${iconPosition} ${isFocused ? "text-blue-500" : ""}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none ${inputSizeClasses[size]}`}
        autoComplete="off"
        spellCheck="false"
        autoFocus={autoFocus}
        aria-label="Fahndungsportal durchsuchen"
        aria-describedby="search-help"
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={handleClear}
          className={`absolute p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:text-gray-600 dark:focus:text-gray-300 rounded-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 ${clearPosition}`}
          aria-label="Suche löschen"
          type="button"
        >
          <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Screen Reader Help */}
      <span id="search-help" className="sr-only">
        Durchsuchen Sie Fahndungen, Vermisste und Sicherheitsmeldungen. 
        Drücken Sie Escape zum Löschen.
      </span>
    </form>
  );
}