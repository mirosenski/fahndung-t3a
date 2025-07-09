import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * useClickOutside Hook
 * Erkennt Klicks außerhalb eines Elements
 * Für Mega-Menüs und Dropdowns
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  enabled = true
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Prüfe ob Element existiert und Klick außerhalb war
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Verzögerung für gleichzeitige Klick-Events
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback, enabled]);

  return ref as RefObject<T>;
}

/**
 * Enhanced Version für mehrere Refs
 */
export function useClickOutsideMultiple<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  enabled = true
) {
  const refs = useRef<T[]>([]);

  const addRef = (element: T | null) => {
    if (element && !refs.current.includes(element)) {
      refs.current.push(element);
    }
  };

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const isOutside = refs.current.every(
        ref => !ref.contains(event.target as Node)
      );
      
      if (isOutside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback, enabled]);

  return { addRef, refs: refs.current };
}