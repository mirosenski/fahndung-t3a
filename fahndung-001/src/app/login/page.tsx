"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Demo-Login-Daten
    const demoCredentials = {
      email: "demo@polizei-bw.de",
      password: "demo123",
    };

    // Simuliere API-Aufruf
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (formData.email === demoCredentials.email && formData.password === demoCredentials.password) {
      // Demo-Session setzen
      const sessionData = {
        userName: "Demo Polizeibeamter",
        email: formData.email,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("demo-session", JSON.stringify(sessionData));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('demo-session-changed'));
      // Erfolgreiche Anmeldung - Weiterleitung zum Dashboard
      router.push("/dashboard");
    } else {
      setError("Ungültige E-Mail oder Passwort");
    }

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900">
            <span className="text-sm font-bold text-white">BW</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Anmelden
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Melden Sie sich an, um Fahndungen zu erstellen und zu verwalten
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-Mail-Adresse
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="ihre.email@polizei-bw.de"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Passwort
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Anmeldung läuft..." : "Anmelden"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Demo-Zugangsdaten</span>
              </div>
            </div>

            <div className="mt-4 rounded-md bg-blue-50 p-4">
              <div className="text-sm text-blue-800">
                <p className="font-medium">Demo-Zugangsdaten:</p>
                <p className="mt-1">
                  <strong>E-Mail:</strong> demo@polizei-bw.de<br />
                  <strong>Passwort:</strong> demo123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
