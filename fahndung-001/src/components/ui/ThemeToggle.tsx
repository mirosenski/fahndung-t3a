"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "~/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          theme === "light"
            ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        }`}
      >
        <Sun className="h-4 w-4" />
        <span className="hidden sm:inline">Hell</span>
      </button>
      
      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          theme === "dark"
            ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        }`}
      >
        <Moon className="h-4 w-4" />
        <span className="hidden sm:inline">Dunkel</span>
      </button>
      
      <button
        onClick={() => setTheme("system")}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          theme === "system"
            ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        }`}
      >
        <Monitor className="h-4 w-4" />
        <span className="hidden sm:inline">System</span>
      </button>
    </div>
  );
} 