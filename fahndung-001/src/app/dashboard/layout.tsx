import type { ReactNode } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Search, 
  FileText, 
  Users, 
  Settings, 
  HelpCircle,
  Plus,
  FolderOpen
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Übersicht & Statistiken'
    },
    {
      name: 'Neue Fahndung',
      href: '/fahndung/erstellen',
      icon: Plus,
      description: 'Fahndung erstellen'
    },
    {
      name: 'Meine Fahndungen',
      href: '/fahndung/meine',
      icon: FolderOpen,
      description: 'Eigene Fahndungen'
    },
    {
      name: 'Fahndungen suchen',
      href: '/suche',
      icon: Search,
      description: 'Erweiterte Suche'
    },
    {
      name: 'Vermisste Personen',
      href: '/fahndung/vermisst',
      icon: Users,
      description: 'Vermisstenfälle'
    },
    {
      name: 'Dokumentation',
      href: '/hilfe',
      icon: FileText,
      description: 'Hilfe & FAQ'
    },
    {
      name: 'Einstellungen',
      href: '/profil/einstellungen',
      icon: Settings,
      description: 'Profil verwalten'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              🔍 Fahndungsportal
            </Link>
          </div>
          
          {/* Navigation */}
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">P</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Polizei BW
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 