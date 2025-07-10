"use client";

import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { cn } from "~/lib/utils";
import ThemeToggle from "../ui/ThemeToggle";
import A11accessDropdown from "../ui/A11accessDropdown";
import { navigation } from "~/lib/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu Component
 * Full-Screen Mobile Navigation mit Accordion-Struktur
 * Focus-Trap und Keyboard Navigation
 * Jetzt mit Schadcn/UI Dialog und Accordion
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Menu Data

  // Focus Management
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        id="mobile-menu"
        className="!fixed !inset-0 !top-0 !left-0 z-[9999] !h-screen !w-screen !max-w-none !translate-x-0 !translate-y-0 !rounded-none border-0 bg-white p-0 lg:hidden dark:bg-gray-900"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="flex flex-col items-center justify-center gap-2 border-b border-gray-200 pt-3 pb-6 dark:border-gray-700">
          <DialogTitle className="mt-0 mb-3 text-center text-xl font-bold text-gray-900 dark:text-white">
            Fahndungsportal
          </DialogTitle>
          <div className="mb-0 flex w-full flex-row items-center justify-center gap-6">
            <ThemeToggle />
            <div className="relative inline-block">
              <A11accessDropdown centered onClose={onClose} />
            </div>
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:hover:bg-gray-800"
              aria-label="Menü schließen"
              type="button"
            >
              <svg
                className="h-6 w-6 text-gray-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </DialogHeader>

        {/* Menu Sections */}
        <div className="max-h-[60vh] flex-1 overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {navigation.map((section) => (
              <AccordionItem
                key={section.title}
                value={section.title}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left transition-colors duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset dark:hover:bg-gray-800 dark:focus:bg-gray-800">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div
                    className="px-4"
                    role="region"
                    aria-label={`${section.title} Links`}
                  >
                    {section.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "mx-4 flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none",
                          item.urgent
                            ? "border border-red-200 hover:bg-red-50 focus:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20 dark:focus:bg-red-900/20"
                            : "hover:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800",
                        )}
                        onClick={onClose}
                        aria-label={
                          item.urgent
                            ? `${item.label} - Eiliger Fall`
                            : item.label
                        }
                      >
                        <div
                          className={cn(
                            "h-5 w-5 flex-shrink-0",
                            item.urgent
                              ? "text-red-500"
                              : "text-gray-400 dark:text-gray-500",
                          )}
                        >
                          {item.urgent ? "⚠️" : "📄"}
                        </div>
                        <span
                          className={cn(
                            "font-medium",
                            item.urgent
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-900 dark:text-white",
                          )}
                        >
                          {item.label}
                          {item.urgent && (
                            <span
                              className="ml-2 text-xs"
                              aria-label="Eiliger Fall"
                            >
                              (EILIG)
                            </span>
                          )}
                        </span>
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-6 dark:bg-gray-800">
          <div className="flex justify-end">
            <button
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              onClick={onClose}
            >
              Hinweis melden
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
