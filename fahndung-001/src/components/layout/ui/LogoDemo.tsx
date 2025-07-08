import React from 'react';
import Logo from './Logo';

/**
 * Logo Demo Component
 * Zeigt alle verfügbaren Logo-Varianten und Konfigurationen
 */
export default function LogoDemo() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Logo-Varianten Demo</h2>
      
      {/* Größen-Varianten */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Größen-Varianten</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <Logo size="sm" />
            <p className="text-sm text-gray-600 mt-2">Small (sm)</p>
          </div>
          <div className="text-center">
            <Logo size="md" />
            <p className="text-sm text-gray-600 mt-2">Medium (md)</p>
          </div>
          <div className="text-center">
            <Logo size="lg" />
            <p className="text-sm text-gray-600 mt-2">Large (lg)</p>
          </div>
          <div className="text-center">
            <Logo size="xl" />
            <p className="text-sm text-gray-600 mt-2">Extra Large (xl)</p>
          </div>
        </div>
      </div>

      {/* Layout-Varianten */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Layout-Varianten</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <Logo layout="horizontal" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Horizontal</p>
          </div>
          <div className="text-center">
            <Logo layout="vertical" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Vertical</p>
          </div>
        </div>
      </div>

      {/* Text-Konfigurationen */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Text-Konfigurationen</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <Logo showText={true} showSubtext={true} size="lg" />
            <p className="text-sm text-gray-600 mt-2">Vollständig</p>
          </div>
          <div className="text-center">
            <Logo showText={true} showSubtext={false} size="lg" />
            <p className="text-sm text-gray-600 mt-2">Nur Haupttext</p>
          </div>
          <div className="text-center">
            <Logo showText={false} size="lg" />
            <p className="text-sm text-gray-600 mt-2">Nur Icon</p>
          </div>
        </div>
      </div>

      {/* Hover-Effekte */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Hover-Effekte (Mouse über Logo bewegen)</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <Logo size="lg" />
            <p className="text-sm text-gray-600 mt-2">Standard mit Hover</p>
          </div>
        </div>
      </div>

      {/* Responsive Test */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Responsive Test</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Logo size="sm" />
          <Logo size="md" />
          <Logo size="lg" />
          <Logo size="xl" />
        </div>
      </div>
    </div>
  );
} 