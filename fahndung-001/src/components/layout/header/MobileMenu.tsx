"use client";

import React, { useState, useRef, useEffect } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import { SearchBar } from './SearchBar';
import { navigationData } from '../../constants/navigationData';
import type { MenuSection } from '../../types/header';
import A11accessDropdown from '../ui/A11accessDropdown';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu Component
 * Full-Screen Mobile Navigation mit Accordion-Struktur
 * Focus-Trap und Keyboard Navigation
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Menu Data
  const menuSections: MenuSection[] = [
    {
      title: 'SICHERHEIT',
      items: navigationData.SICHERHEIT
    },
    {
      title: 'SERVICE',
      items: navigationData.SERVICE
    },
    {
      title: 'POLIZEI',
      items: navigationData.POLIZEI
    }
  ];

  // Focus Management
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  // Toggle Section
  const toggleSection = (sectionTitle: string) => {
    setExpandedSection(prev => prev === sectionTitle ? null : sectionTitle);
  };

  // Keyboard Navigation
  const handleSectionKeyDown = (e: React.KeyboardEvent, sectionTitle: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSection(sectionTitle);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Panel */}
      <div 
        ref={menuRef}
        className={`absolute inset-x-0 top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        id="mobile-menu"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <h2 id="mobile-menu-title" className="text-xl font-bold text-gray-900 dark:text-white">
              🔍 Fahndungsportal
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <A11accessDropdown />
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Menü schließen"
              type="button"
            >
              <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="max-h-[60vh] overflow-y-auto">
          {menuSections.map((section) => (
            <div key={section.title} className="border-b border-gray-200 dark:border-gray-700">
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200"
                onClick={() => toggleSection(section.title)}
                onKeyDown={(e) => handleSectionKeyDown(e, section.title)}
                aria-expanded={expandedSection === section.title}
                aria-controls={`mobile-menu-${section.title}`}
                aria-label={`${section.title} Menü ${expandedSection === section.title ? 'schließen' : 'öffnen'}`}
                type="button"
              >
                <span className="font-semibold text-gray-900 dark:text-white">{section.title}</span>
                <svg 
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                    expandedSection === section.title ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSection === section.title && (
                <div 
                  id={`mobile-menu-${section.title}`} 
                  className="pb-4" 
                  role="region" 
                  aria-label={`${section.title} Links`}
                >
                  {section.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-8 py-3 mx-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                        item.urgent 
                          ? 'hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20 border border-red-200 dark:border-red-800' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800'
                      }`}
                      onClick={onClose}
                      aria-label={item.urgent ? `${item.label} - Eiliger Fall` : item.label}
                    >
                      <div className={`w-5 h-5 flex-shrink-0 ${
                        item.urgent ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
                      }`}>
                        {item.urgent ? '⚠️' : '📄'}
                      </div>
                      <span className={`font-medium ${
                        item.urgent ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {item.label}
                        {item.urgent && (
                          <span className="ml-2 text-xs" aria-label="Eiliger Fall">
                            (EILIG)
                          </span>
                        )}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-end">
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              onClick={onClose}
            >
              Hinweis melden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}