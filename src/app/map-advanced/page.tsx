'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, Map, Layers, Info, Settings } from 'lucide-react'

// Import dynamique pour éviter les erreurs SSR
const MapComponentAdvanced = dynamic(() => import('../../components/MapComponentAdvanced'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-2">Chargement de la carte...</p>
      </div>
    </div>
  )
})

export default function MapAdvancedPage() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Carte Interactive Avancée</h1>
                <p className="text-gray-600 mt-1">Localisation et gestion des fontaines avec filtres avancés</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Info className="w-4 h-4" />
                <span>Aide</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Panneau d'informations */}
        {showInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">Guide d'utilisation</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
              <div>
                <h4 className="font-semibold mb-2">🗺️ Navigation</h4>
                <ul className="space-y-1">
                  <li>• Utilisez la molette pour zoomer/dézoomer</li>
                  <li>• Cliquez et glissez pour déplacer la carte</li>
                  <li>• Cliquez sur "Ma position" pour vous localiser</li>
                  <li>• Changez entre vue satellite et plan</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">🔍 Filtres</h4>
                <ul className="space-y-1">
                  <li>• Recherchez par nom ou adresse</li>
                  <li>• Filtrez par type de fontaine</li>
                  <li>• Ajustez le rayon de recherche</li>
                  <li>• Activez la carte de densité</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">📍 Marqueurs</h4>
                <ul className="space-y-1">
                  <li>• 🔵 Bleu : Fontaines publiques</li>
                  <li>• 🟢 Vert : Fontaines partenaires</li>
                  <li>• 🟡 Or : Fontaines premium</li>
                  <li>• 🔴 Rouge : Fontaines hors service</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">⚡ Fonctionnalités</h4>
                <ul className="space-y-1">
                  <li>• Regroupement automatique des marqueurs</li>
                  <li>• Popups détaillées avec infos</li>
                  <li>• Calcul d'itinéraires vers Google Maps</li>
                  <li>• Géolocalisation en temps réel</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Map className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Fontaines</p>
                <p className="text-xl font-bold text-blue-600">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="w-5 h-5 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Actives</p>
                <p className="text-xl font-bold text-green-600">4</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <div className="w-5 h-5 bg-yellow-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Partenaires</p>
                <p className="text-xl font-bold text-yellow-600">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="w-5 h-5 bg-red-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hors Service</p>
                <p className="text-xl font-bold text-red-600">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carte principale */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="h-[600px]">
            <MapComponentAdvanced />
          </div>
        </div>

        {/* Légende */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Légende de la carte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Fontaines publiques</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Fontaines partenaires</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Fontaines premium</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Hors service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}