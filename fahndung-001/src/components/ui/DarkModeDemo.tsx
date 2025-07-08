"use client";

import ThemeToggle from "./ThemeToggle";

export function DarkModeDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Theme Toggle Demo */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-100/5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Dark Mode Demo
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Diese Komponente demonstriert die Dark Mode Funktionalität nach Tailwind CSS 4.1 Regeln.
        </p>
        
        <div className="flex justify-center mb-8">
          <ThemeToggle />
        </div>
      </div>

      {/* Card Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring-1 shadow-xl ring-gray-900/5 dark:ring-gray-100/5">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500 dark:bg-blue-600 mb-4">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Schnelle Performance
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Optimierte Dark Mode Implementierung mit Tailwind CSS 4.1 für beste Performance und Benutzerfreundlichkeit.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring-1 shadow-xl ring-gray-900/5 dark:ring-gray-100/5">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500 dark:bg-green-600 mb-4">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            System Integration
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Automatische Erkennung der System-Einstellungen mit manueller Überschreibungsmöglichkeit.
          </p>
        </div>
      </div>

      {/* Text Demo */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-100/5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Text und Farben
        </h3>
        <div className="space-y-4">
          <p className="text-gray-900 dark:text-white">
            <strong>Primärer Text:</strong> Automatisch angepasst für optimale Lesbarkeit in beiden Modi.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Sekundärer Text:</strong> Reduzierte Kontrast für weniger wichtige Informationen.
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            <strong>Tertiärer Text:</strong> Noch schwächerer Kontrast für Hilfetext.
          </p>
        </div>
      </div>

      {/* Button Demo */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-100/5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Interaktive Elemente
        </h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            Primär Button
          </button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Sekundär Button
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Outline Button
          </button>
        </div>
      </div>
    </div>
  );
} 