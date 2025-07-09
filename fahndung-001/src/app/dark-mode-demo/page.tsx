import { DarkModeDemo } from "~/components/ui/DarkModeDemo";

export default function DarkModeDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dark Mode Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Testen Sie die Dark Mode Funktionalität nach Tailwind CSS 4.1 Regeln
          </p>
        </div>
        
        <DarkModeDemo />
      </div>
    </div>
  );
} 