import ThemeToggle from "~/components/ui/ThemeToggle";

export default function ThemeToggleDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Theme Toggle Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Testen Sie den neuen eleganten Theme Toggle mit Glassmorphism
          </p>
        </div>
        
        {/* Theme Toggle Demo */}
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-100/5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Eleganter Theme Toggle
            </h2>
            
            <div className="flex justify-center mb-8">
              <ThemeToggle />
            </div>
            
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="text-center">
                ✨ <strong>Features:</strong>
              </p>
              <ul className="space-y-2">
                <li>• Glassmorphism Design</li>
                <li>• Smooth Animations</li>
                <li>• Ambient Light Effects</li>
                <li>• Hover Tooltip</li>
                <li>• Dark Mode Anpassungen</li>
                <li>• System Theme Integration</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-100/5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Technische Details
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong>Glassmorphism:</strong> Transparenter Hintergrund mit Blur-Effekt
              </p>
              <p>
                <strong>Animations:</strong> Cubic-bezier Easing für natürliche Bewegungen
              </p>
              <p>
                <strong>Icons:</strong> SVG-basierte Sonne und Mond mit Farbverläufen
              </p>
              <p>
                <strong>Responsive:</strong> Funktioniert auf allen Bildschirmgrößen
              </p>
              <p>
                <strong>Accessibility:</strong> ARIA-Labels und Keyboard-Navigation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 