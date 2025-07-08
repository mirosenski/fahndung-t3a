export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rechnungen</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Verwalten Sie Ihre Rechnungen und Zahlungen
        </p>
      </div>

      <div className="rounded-lg bg-white dark:bg-gray-800 shadow">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Rechnungsliste
          </h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Hier werden die Rechnungen angezeigt...
          </p>
        </div>
      </div>
    </div>
  );
} 