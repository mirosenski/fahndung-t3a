import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Theme } from "@radix-ui/themes";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "~/components/providers/ThemeProvider";
import { ThemeScript } from "~/components/providers/ThemeScript";
import Header from "~/components/layout/header/Header";
import Footer from "~/components/layout/Footer";

export const metadata: Metadata = {
  title: "Fahndung - Polizei Baden-Württemberg",
  description: "Offizielle Fahndungsplattform der Polizei Baden-Württemberg",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geist.variable} light`} suppressHydrationWarning={true}>
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning={true}>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <TRPCReactProvider>
            <SessionProvider>
              <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">
                <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
                  <Header />
                  <main id="main-content" className="flex-1 pt-32 lg:pt-36">{children}</main>
                  <Footer />
                </div>
              </Theme>
            </SessionProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
