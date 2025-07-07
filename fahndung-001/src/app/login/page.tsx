import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

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
          <div className="space-y-6">
            <div className="text-center">
              <p className="mb-4 text-sm text-gray-600">
                Wählen Sie eine Anmeldemethode:
              </p>

              <div className="space-y-3">
                <button className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                  <span className="sr-only">Mit Google anmelden</span>
                  🔍 Google
                </button>

                <button className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                  <span className="sr-only">Mit GitHub anmelden</span>
                  🐙 GitHub
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">oder</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Für Polizeibeamte: Verwenden Sie Ihre Dienst-E-Mail-Adresse
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
