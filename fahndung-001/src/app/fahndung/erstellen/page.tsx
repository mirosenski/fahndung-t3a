import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import FahndungForm from "~/components/fahndung/FahndungForm";

export default async function FahndungErstellenPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Neue Fahndung erstellen
          </h1>
          <p className="mt-2 text-gray-600">
            Erstellen Sie eine neue Fahndung für die Polizei Baden-Württemberg
          </p>
        </div>

        <FahndungForm />
      </div>
    </div>
  );
}
