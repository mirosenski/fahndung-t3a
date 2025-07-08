"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Hinweise helfen
              </h1>
              <p className="text-xl leading-relaxed text-blue-100 md:text-2xl">
                Unterstützen Sie die Polizei Baden-Württemberg bei der
                Aufklärung von Straftaten. Jeder Hinweis kann entscheidend sein.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/fahndung"
                className="rounded-lg bg-white px-8 py-4 text-center font-semibold text-blue-900 transition-colors hover:bg-blue-50"
              >
                Fahndungen anzeigen
              </Link>
              <Link
                href="/hilfe"
                className="rounded-lg border-2 border-white px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-white hover:text-blue-900"
              >
                Wie kann ich helfen?
              </Link>
            </div>

            <div className="rounded-lg bg-blue-800/50 p-6">
              <h3 className="mb-2 text-lg font-semibold">Wichtiger Hinweis</h3>
              <p className="text-blue-100">
                Bei akuten Notfällen wenden Sie sich bitte direkt an die
                Notrufnummer 110. Diese Plattform dient der Unterstützung bei
                laufenden Fahndungen.
              </p>
            </div>
          </div>

          {/* Right Side - Hero Images */}
          <div className="relative">
            {/* Desktop Hero Image */}
            <div className="hidden md:block">
              <Image
                src="/images/hero-desktop.png"
                width={1000}
                height={760}
                alt="Fahndungsportal Desktop-Version - Polizei Baden-Württemberg"
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
            
            {/* Mobile Hero Image */}
            <div className="md:hidden">
              <Image
                src="/images/hero-mobile.png"
                width={560}
                height={620}
                alt="Fahndungsportal Mobile-Version - Polizei Baden-Württemberg"
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
