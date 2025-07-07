import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import Header from "~/components/layout/Header";
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
    <html lang="de" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <SessionProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
