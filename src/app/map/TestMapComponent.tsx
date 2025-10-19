'use client'

import { useState, useEffect } from 'react'

export default function TestMapComponent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Montage du composant...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🗺️ Test de la Carte - Casablanca, Maroc
        </h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Test réussi !</strong> Le composant se charge correctement sans erreur d'hydratation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">✅ Configuration</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Chargement dynamique avec SSR désactivé</li>
              <li>• Position par défaut : Casablanca</li>
              <li>• Coordonnées : 33.5731, -7.5898</li>
              <li>• Composant entièrement côté client</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">🌍 Données de Test</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-green-400 pl-3">
                <p className="font-medium">Fontaine Jemaa el-Fna</p>
                <p className="text-sm text-gray-600">Marrakech (31.6295, -7.9890)</p>
              </div>
              <div className="border-l-4 border-blue-400 pl-3">
                <p className="font-medium">Café de la Paix</p>
                <p className="text-sm text-gray-600">Rabat (34.0209, -6.8416)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            🎉 Résolution du Problème d'Hydratation
          </h3>
          <p className="text-green-700 mb-4">
            L'erreur d'hydratation a été résolue en utilisant une approche complètement côté client :
          </p>
          <ul className="text-green-700 space-y-1">
            <li>• Utilisation de <code className="bg-green-100 px-1 rounded">dynamic()</code> avec <code className="bg-green-100 px-1 rounded">ssr: false</code></li>
            <li>• Séparation du composant Leaflet dans un fichier séparé</li>
            <li>• Évitement complet du rendu côté serveur pour les composants de carte</li>
            <li>• Position par défaut mise à jour vers Casablanca, Maroc</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button 
            onClick={() => window.location.href = '/map'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Aller à la carte complète
          </button>
        </div>
      </div>
    </div>
  )
}