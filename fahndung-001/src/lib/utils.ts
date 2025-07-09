import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility-Funktion zum Kombinieren von CSS-Klassen
 * Kombiniert clsx und tailwind-merge für optimale Klassennamen-Verarbeitung
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 