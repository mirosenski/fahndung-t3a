"use client";

import React from "react";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import A11nav from "../ui/a11nav";
import UserAuth from "../ui/UserAuth";
import { SearchModal } from "./SearchModal";

interface MobileHeaderProps {
  onMenuToggle: () => void;
  isOpen: boolean;
  breadcrumb?: React.ReactNode;
}

/**
 * MobileHeader Component
 * Mobile Navigation Bar (unter 1024px)
 * Kompakte Header-Leiste mit Hamburger Menu und Breadcrumbs
 */
export function MobileHeader({
  onMenuToggle,
  isOpen,
  breadcrumb,
}: MobileHeaderProps) {
  return (
    <div className="w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm lg:hidden dark:border-gray-700 dark:bg-gray-900/95">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Logo size="md" />

        {/* Mobile Controls */}
        <div className="flex items-center gap-3">
          <SearchModal size="compact" />
          <UserAuth variant="mobile" size="compact" />

          {/* Hamburger Menu Button */}
          <button
            onClick={onMenuToggle}
            className="rounded-md p-2 text-gray-900 transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-white dark:hover:bg-gray-800"
            aria-label="Mobilmenü öffnen"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Breadcrumbs - unter der Hauptnavigation */}
      {breadcrumb && (
        <div className="border-t border-gray-100 px-6 pb-3 dark:border-gray-800">
          <div className="pt-3">{breadcrumb}</div>
        </div>
      )}
    </div>
  );
}
