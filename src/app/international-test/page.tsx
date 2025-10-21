'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

interface FountainCounts {
  database: number
  static: number
  osm: number
  total: number
}

interface FountainItem {
  id: string
  name: string
  address?: string
  country?: string
  latitude?: number
  longitude?: number
  source?: string
  // allow other dynamic fields
  [key: string]: any
}

interface ApiResponse {
  success: boolean
  message: string
  mode: {
    morocco: boolean
    france: boolean
    international: boolean
  }
  counts: FountainCounts
  data: FountainItem[]
}

function InternationalTestContent() {
  const [moroccoData, setMoroccoData] = useState<ApiResponse | null>(null)
  const [franceData, setFranceData] = useState<ApiResponse | null>(null)
  const [internationalData, setInternationalData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async (mode: 'morocco' | 'france' | 'international') => {
    setLoading(true)
    try {
      let url = '/api/fountains'
      
      switch (mode) {
        case 'morocco':
          url += '?includeOSM=true'
          break
        case 'france':
          url += '?includeFrance=true'
          break
        case 'international':
          url += '?international=true'
          break
      }
      
      const response = await fetch(url)
      const data = await response.json()
      
      switch (mode) {
        case 'morocco':
          setMoroccoData(data)
          break
        case 'france':
          setFranceData(data)
          break
        case 'international':
          setInternationalData(data)
          break
      }
    } catch (error) {
      console.error(`Erreur ${mode}:`, error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌍 LmaaMap International
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Extension internationale inspirée par watermap.fr
          </p>
          <p className="text-sm text-gray-500">
            Maroc par défaut + France pour une expérience utilisateur enrichie
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => fetchData('morocco')}
            disabled={loading}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            🇲🇦 Maroc (OpenStreetMap)
          </button>
          <button
            onClick={() => fetchData('france')}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            🇫🇷 France (Style watermap.fr)
          </button>
          <button
            onClick={() => fetchData('international')}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
          >
            🌍 International (Maroc + France)
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Récupération des données OpenStreetMap...</p>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Morocco Results */}
          {moroccoData && (
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🇲🇦 Maroc
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{moroccoData.message}</p>
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-semibold text-red-800">Total: {moroccoData.counts.total} fontaines</p>
                  <p className="text-sm text-red-600">Base: {moroccoData.counts.database} | Statiques: {moroccoData.counts.static} | OSM: {moroccoData.counts.osm}</p>
                </div>
              </div>
            </div>
          )}

          {/* France Results */}
          {franceData && (
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🇫🇷 France
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{franceData.message}</p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800">Total: {franceData.counts.total} fontaines</p>
                  <p className="text-sm text-blue-600">Base: {franceData.counts.database} | Statiques: {franceData.counts.static} | OSM: {franceData.counts.osm}</p>
                </div>
                <p className="text-xs text-blue-500 mt-2">Style watermap.fr avec 18 villes françaises</p>
              </div>
            </div>
          )}

          {/* International Results */}
          {internationalData && (
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🌍 International
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{internationalData.message}</p>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-semibold text-purple-800">Total: {internationalData.counts.total} fontaines</p>
                  <p className="text-sm text-purple-600">Base: {internationalData.counts.database} | Statiques: {internationalData.counts.static} | OSM: {internationalData.counts.osm}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Maroc: {internationalData.mode.morocco ? '✅' : '❌'}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">France: {internationalData.mode.france ? '✅' : '❌'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sample Data */}
        {internationalData && internationalData.data.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">📍 Exemples de fontaines</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {internationalData.data.slice(0, 6).map((fountain, index) => (
                <div key={fountain.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-800">{fountain.name}</h4>
                  <p className="text-sm text-gray-600">{fountain.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {fountain.country && `${fountain.country} • `}
                    Lat: {fountain.latitude.toFixed(4)}, Lon: {fountain.longitude.toFixed(4)}
                  </p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      fountain.source === 'openstreetmap' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {fountain.source || 'static'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🚰 LmaaMap - Plateforme marocaine avec extension internationale</p>
          <p>Données OpenStreetMap • Compatible watermap.fr • Expérience utilisateur enrichie</p>
        </div>
      </div>
    </div>
  )
}

// Export dynamique pour éviter l'hydratation côté serveur
const InternationalTest = dynamic(() => Promise.resolve(InternationalTestContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Chargement des tests internationaux...</p>
      </div>
    </div>
  )
})

export default InternationalTest