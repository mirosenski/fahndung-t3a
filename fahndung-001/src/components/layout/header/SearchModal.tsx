"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, X, Loader2, ChevronRight, Calendar, MapPin, 
  AlertCircle, Users, UserX, Skull, Package, Filter, Clock,
  Shield, ChevronDown, Info, Siren
} from 'lucide-react';

// Fahndungskategorien
const categories = [
  { id: 'all', label: 'Alle Fahndungen', icon: Shield, color: 'blue' },
  { id: 'urgent', label: 'Eilfahndung', icon: Siren, color: 'red', badge: 'EILIG' },
  { id: 'missing', label: 'Vermisste Personen', icon: Users, color: 'amber' },
  { id: 'wanted', label: 'Gesuchte Straftäter', icon: UserX, color: 'orange' },
  { id: 'unknown', label: 'Unbekannte Tote', icon: Skull, color: 'purple' },
  { id: 'items', label: 'Sachfahndung', icon: Package, color: 'green' }
];

// Regionen Baden-Württemberg
const regions = [
  'Alle Regionen',
  'Stuttgart',
  'Karlsruhe',
  'Freiburg',
  'Tübingen',
  'Heilbronn',
  'Ulm',
  'Mannheim',
  'Pforzheim',
  'Reutlingen',
  'Esslingen'
];

// Mock aktuelle Fahndungen
const currentAlerts = [
  { id: 1, type: 'urgent', title: 'Vermisste 15-Jährige aus Stuttgart', time: 'vor 2 Stunden' },
  { id: 2, type: 'wanted', title: 'Raubüberfall in Karlsruhe - Täter flüchtig', time: 'vor 5 Stunden' },
  { id: 3, type: 'missing', title: 'Senior aus Freiburg vermisst', time: 'vor 1 Tag' }
];

interface SearchModalProps {
  className?: string;
}

export function SearchModal({ className = "" }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Alle Regionen');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
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

  const handleSearch = async () => {
    if (!query.trim() && selectedCategory === 'all') return;
    
    setIsSearching(true);
    
    // Simulate search
    setTimeout(() => {
      console.log('Searching:', { query, selectedCategory, selectedRegion, dateRange });
      setIsSearching(false);
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setSelectedCategory('all');
    setShowFilters(false);
    // Return focus to trigger
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 100);
  };

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
      orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    };
    return colors[color] ?? colors.blue;
  };

  const getAlertTypeIcon = (type: string) => {
    const cat = categories.find(c => c.id === type);
    return cat ? cat.icon : Shield;
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className={`
          relative group
          p-3 rounded-xl
          bg-white dark:bg-gray-900 
          border-2 border-gray-200 dark:border-gray-700
          shadow-lg hover:shadow-xl
          transition-all duration-300 hover:scale-105
          hover:border-blue-500 dark:hover:border-blue-400
          focus:outline-none focus:ring-4 focus:ring-blue-500/20
          ${className}
        `}
        aria-label="Fahndungssuche öffnen (Strg+K)"
        aria-keyshortcuts="Control+K"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Search className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors" />
        
        {/* Professional Tooltip */}
        <span className="
          absolute -top-14 left-1/2 -translate-x-1/2
          px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700
          rounded-lg opacity-0 group-hover:opacity-100
          transition-opacity duration-200 pointer-events-none
          whitespace-nowrap shadow-lg
        ">
          Fahndungssuche (⌘K)
        </span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/60 backdrop-blur-md
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
          aria-label="Fahndungssuche Baden-Württemberg"
          data-search-modal
          className="
            fixed left-1/2 -translate-x-1/2 top-4 w-full max-w-[95vw] z-50
            sm:left-1/2 sm:-translate-x-1/2 sm:top-[5%] sm:translate-y-0 sm:max-w-4xl
            animate-in slide-in-from-bottom-4 duration-300
            rounded-2xl
            shadow-2xl
            bg-white/70 dark:bg-gray-900/70
            backdrop-blur-2xl
            border border-white/30 dark:border-gray-700/50
            max-h-[85vh] sm:max-h-[85vh]
            overflow-hidden
            flex flex-col
          "
        >
          {/* Modal Content */}
          <div className="
            bg-white dark:bg-gray-900
            rounded-2xl shadow-2xl
            border border-gray-200 dark:border-gray-700
            overflow-hidden
            flex flex-col h-full
          ">
            {/* Header with Baden-Württemberg Branding */}
            <div className="
              bg-gradient-to-r from-blue-600 to-blue-700
              dark:from-blue-700 dark:to-blue-800
              p-4 text-white flex-shrink-0
            ">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  <div>
                    <h2 className="text-lg font-bold">Polizei Baden-Württemberg</h2>
                    <p className="text-sm text-blue-100">Fahndungsdatenbank</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="
                    p-2 rounded-lg
                    text-white/80 hover:text-white
                    hover:bg-white/10
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-white/50
                  "
                  aria-label="Suche schließen"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="p-4 sm:p-6 pb-0 flex-shrink-0">
              <div className="
                flex items-center gap-2 sm:gap-4 
                bg-gray-50 dark:bg-gray-800
                border-2 border-gray-200 dark:border-gray-700
                rounded-xl px-3 sm:px-4 py-2.5 sm:py-3
                focus-within:border-blue-500 dark:focus-within:border-blue-400
                transition-colors
              ">
                <Search className={`
                  w-5 h-5 text-gray-500
                  ${isSearching ? 'animate-pulse' : ''}
                `} />
                
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Suche nach Namen, Ort, Fallnummer oder Beschreibung..."
                  className="
                    flex-1 bg-transparent outline-none
                    text-lg text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                  "
                  aria-label="Suchbegriff eingeben"
                  autoComplete="off"
                  spellCheck="false"
                />

                {isSearching && (
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                )}

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`
                    flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg
                    text-xs sm:text-sm font-medium
                    ${showFilters 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }
                    hover:bg-blue-100 dark:hover:bg-blue-900/30
                    transition-colors
                  `}
                  aria-label="Filter anzeigen"
                  aria-expanded={showFilters}
                >
                  <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Filter</span>
                  <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {/* Region Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Region
                      </label>
                      <select 
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="
                          w-full px-3 py-2 rounded-lg
                          bg-white dark:bg-gray-700
                          border border-gray-300 dark:border-gray-600
                          text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        "
                      >
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date From */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Von Datum
                      </label>
                      <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                        className="
                          w-full px-3 py-2 rounded-lg
                          bg-white dark:bg-gray-700
                          border border-gray-300 dark:border-gray-600
                          text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        "
                      />
                    </div>

                    {/* Date To */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Bis Datum
                      </label>
                      <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                        className="
                          w-full px-3 py-2 rounded-lg
                          bg-white dark:bg-gray-700
                          border border-gray-300 dark:border-gray-600
                          text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        "
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scrollbarer Content ab hier */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {/* Advanced Filters, falls sichtbar */}
              {showFilters && (
                <div className="mt-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {/* Region Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Region
                      </label>
                      <select 
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="
                          w-full px-3 py-2 rounded-lg
                          bg-white dark:bg-gray-700
                          border border-gray-300 dark:border-gray-600
                          text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        "
                      >
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date From */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Von Datum
                      </label>
                      <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                        className="
                          w-full px-3 py-2 rounded-lg
                          bg-white dark:bg-gray-700
                          border border-gray-300 dark:border-gray-600
                          text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        "
                      />
                    </div>

                    {/* Date To */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Bis Datum
                      </label>
                      <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                        className="
                          w-full px-3 py-2 rounded-lg
                          bg-white dark:bg-gray-700
                          border border-gray-300 dark:border-gray-600
                          text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        "
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="p-4 sm:p-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                  FAHNDUNGSKATEGORIEN
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`
                          relative flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl
                          border-2 transition-all duration-200
                          ${isSelected 
                            ? `border-${category.color}-500 ${getCategoryColor(category.color)} shadow-lg` 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }
                          hover:shadow-md
                          focus:outline-none focus:ring-2 focus:ring-${category.color}-500/50
                        `}
                        aria-pressed={isSelected}
                        aria-label={`Kategorie ${category.label} auswählen`}
                      >
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? `text-${category.color}-600` : 'text-gray-500'}`} />
                        <span className={`text-sm sm:text-base font-medium ${isSelected ? `text-${category.color}-700 dark:text-${category.color}-300` : 'text-gray-700 dark:text-gray-300'}`}>
                          {category.label}
                        </span>
                        {category.badge && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded animate-pulse">
                            {category.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Alerts */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  AKTUELLE FAHNDUNGEN
                </h3>
                <div className="space-y-2">
                  {currentAlerts.map((alert) => {
                    const Icon = getAlertTypeIcon(alert.type);
                    return (
                      <button
                        key={alert.id}
                        className="
                          w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4
                          bg-gray-50 dark:bg-gray-800
                          hover:bg-gray-100 dark:hover:bg-gray-700
                          rounded-xl transition-colors
                          text-left group
                        "
                        onClick={() => console.log('Open alert:', alert.id)}
                      >
                        <div className={`p-2 rounded-lg ${getCategoryColor(categories.find(c => c.id === alert.type)?.color ?? 'blue')}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {alert.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.time}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="
                px-4 sm:px-6 py-3 sm:py-4 
                bg-gray-50 dark:bg-gray-800/50
                border-t border-gray-200 dark:border-gray-700
                flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0
                flex-shrink-0
              ">
                <div className="flex items-center gap-4 sm:gap-6 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">⌘K</kbd>
                    Öffnen
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">ESC</kbd>
                    Schließen
                  </span>
                </div>
                <button
                  onClick={handleSearch}
                  disabled={!query.trim() && selectedCategory === 'all'}
                  className="
                    w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-medium
                    bg-blue-600 hover:bg-blue-700 
                    text-white
                    disabled:bg-gray-300 dark:disabled:bg-gray-700
                    disabled:cursor-not-allowed
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  "
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                      Suche läuft...
                    </>
                  ) : (
                    'Suche starten'
                  )}
                </button>
              </div>

              {/* Info Banner */}
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-b-xl border border-blue-200 dark:border-blue-800 flex-shrink-0">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-medium mb-1">Hinweis zur Fahndung</p>
                    <p className="leading-relaxed">Bei Hinweisen zu gesuchten Personen wenden Sie sich bitte umgehend an die nächste Polizeidienststelle oder wählen Sie den Notruf 110.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Region für Screen Reader */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {isOpen && "Fahndungssuche geöffnet"}
        {isSearching && "Suche läuft..."}
      </div>
    </>
  );
} 