import { Geist } from 'next/font/google';
import { Inter } from 'next/font/google';
import { Lusitana } from 'next/font/google';

// Primary Font - Geist (bereits in layout.tsx verwendet)
export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

// Secondary Font - Inter (für UI-Elemente)
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Display Font - Lusitana (für Überschriften)
export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lusitana',
  display: 'swap',
}); 