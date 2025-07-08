import LogoDemo from "~/components/layout/ui/LogoDemo";

export default function LogoDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Logo-Implementierung Demo
        </h1>
        <LogoDemo />
      </div>
    </div>
  );
} 