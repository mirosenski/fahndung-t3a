"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prüfe Demo-Session
    const demoSession = localStorage.getItem("demo-session");
    if (!demoSession) {
      router.push("/login");
      return;
    }

    try {
      const sessionData = JSON.parse(demoSession) as { userName?: string };
      setUserName(sessionData.userName ?? "Demo User");
    } catch {
      router.push("/login");
      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Willkommen zurück, {userName}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 p-2">
                <span className="text-xl text-blue-600">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Aktive Fahndungen
                </p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="rounded-lg bg-green-100 p-2">
                <span className="text-xl text-green-600">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Gelöste Fälle
                </p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="rounded-lg bg-yellow-100 p-2">
                <span className="text-xl text-yellow-600">💡</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Neue Hinweise
                </p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Schnellaktionen
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              <a
                href="/fahndung/erstellen"
                className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <span className="mr-3 text-2xl">➕</span>
                <div>
                  <p className="font-medium text-gray-900">Neue Fahndung</p>
                  <p className="text-sm text-gray-600">Fahndung erstellen</p>
                </div>
              </a>

              <a
                href="/fahndung/meine"
                className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <span className="mr-3 text-2xl">🗂️</span>
                <div>
                  <p className="font-medium text-gray-900">Meine Fahndungen</p>
                  <p className="text-sm text-gray-600">Übersicht anzeigen</p>
                </div>
              </a>

              <a
                href="/hilfe"
                className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <span className="mr-3 text-2xl">❓</span>
                <div>
                  <p className="font-medium text-gray-900">Hilfe</p>
                  <p className="text-sm text-gray-600">FAQ & Support</p>
                </div>
              </a>

              <a
                href="/profil/einstellungen"
                className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <span className="mr-3 text-2xl">⚙️</span>
                <div>
                  <p className="font-medium text-gray-900">Einstellungen</p>
                  <p className="text-sm text-gray-600">Profil verwalten</p>
                </div>
              </a>

              <a
                href="/profil"
                className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <span className="mr-3 text-2xl">👤</span>
                <div>
                  <p className="font-medium text-gray-900">Profil verwalten</p>
                  <p className="text-sm text-gray-600">Persönliche Daten</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Letzte Aktivitäten
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Neue Fahndung &quot;Vermisste Person in Stuttgart&quot;
                    erstellt
                  </p>
                  <p className="text-xs text-gray-500">vor 2 Stunden</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Fahndung &quot;Diebstahl Fahrrad&quot; als gelöst markiert
                  </p>
                  <p className="text-xs text-gray-500">vor 1 Tag</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-yellow-600"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Neuer Hinweis für Fahndung &quot;Einbruch Freiburg&quot;
                    erhalten
                  </p>
                  <p className="text-xs text-gray-500">vor 2 Tagen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
