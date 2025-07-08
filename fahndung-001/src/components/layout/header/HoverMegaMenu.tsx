"use client";

import React, { useState, useRef } from 'react';
import { useClickOutside } from './hooks/useClickOutside';

interface HoverMegaMenuProps {
  title: string;
}

interface MenuItem {
  label: string;
  href: string;
  description: string;
  urgent?: boolean;
}

/**
 * HoverMegaMenu Component
 * Desktop Dropdown mit Hover + Click Support
 * Keyboard Navigation und Focus Management
 */
export function HoverMegaMenu({ title }: HoverMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Click Outside Detection
  const menuRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  }, isOpen);

  // Menu Data
  const menuData: Record<string, MenuItem[]> = {
    'SICHERHEIT': [
      { 
        label: 'Aktuelle Fahndungen', 
        href: '/fahndungen/aktuell', 
        description: 'Öffentliche Fahndungen und Eilmeldungen', 
        urgent: true 
      },
      { 
        label: 'Vermisste Personen', 
        href: '/vermisste', 
        description: 'Vermisstenfälle in Baden-Württemberg'
      },
      { 
        label: 'Gesuchte Straftäter', 
        href: '/gesuchte', 
        description: 'Öffentliche Straftätersuche'
      },
      { 
        label: 'Sicherheitswarnungen', 
        href: '/warnungen', 
        description: 'Aktuelle Warnungen und Betrugsmeldungen'
      }
    ],
    'SERVICE': [
      { 
        label: 'Hinweise melden', 
        href: '/hinweise/melden', 
        description: 'Sichere Hinweisübermittlung'
      },
      { 
        label: 'Online-Anzeige', 
        href: '/anzeige/online', 
        description: 'Strafanzeige online erstatten'
      },
      { 
        label: 'Notruf & Kontakt', 
        href: '/kontakt', 
        description: 'Notrufnummern und Dienststellen'
      },
      { 
        label: 'Bürgerservice', 
        href: '/service', 
        description: 'Führungszeugnis und Services'
      }
    ],
    'POLIZEI': [
      { 
        label: 'Über die Polizei BW', 
        href: '/ueber-uns', 
        description: 'Organisation und Aufgaben'
      },
      { 
        label: 'Dienststellen', 
        href: '/dienststellen', 
        description: 'Standorte und Öffnungszeiten'
      },
      { 
        label: 'Karriere', 
        href: '/karriere', 
        description: 'Ausbildung und Stellenangebote'
      },
      { 
        label: 'Presse', 
        href: '/presse', 
        description: 'Pressemitteilungen und Medien'
      }
    ]
  };

  const items = menuData[title] ?? [];

  // Hover Handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  // Click Handler
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        if (isOpen) {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
        break;
      case 'ArrowDown':
        if (isOpen) {
          e.preventDefault();
          const firstLink = menuRef.current?.querySelector('a');
          firstLink?.focus();
        }
        break;
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent, index: number) => {
    const links = menuRef.current?.querySelectorAll('a');
    if (!links) return;

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextLink = links[index + 1] as HTMLElement;
        nextLink?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (index === 0) {
          buttonRef.current?.focus();
        } else {
          const prevLink = links[index - 1] as HTMLElement;
          prevLink?.focus();
        }
        break;
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 focus:text-blue-600 dark:focus:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${title} Menü ${isOpen ? 'schließen' : 'öffnen'}`}
        type="button"
      >
        {title}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl z-50">
          <div className="p-4" role="menu" aria-label={`${title} Untermenü`}>
            <div className="grid gap-1">
              {items.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onKeyDown={(e) => handleMenuKeyDown(e, index)}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                    item.urgent 
                      ? 'hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20 border border-red-200 dark:border-red-800' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800'
                  }`}
                  aria-describedby={`${title}-${index}-desc`}
                >
                  <div className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    item.urgent ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {item.urgent ? '⚠️' : '📄'}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-medium text-sm ${
                      item.urgent ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {item.label}
                      {item.urgent && (
                        <span className="ml-2 text-xs text-red-600 dark:text-red-400" aria-label="Eiliger Fall">
                          (EILIG)
                        </span>
                      )}
                    </span>
                    <span 
                      id={`${title}-${index}-desc`}
                      className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                    >
                      {item.description}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}