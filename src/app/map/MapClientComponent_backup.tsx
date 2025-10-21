'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Navigation, Search, Filter, Plus, Menu } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

// Interface pour les points d'eau
interface WaterPoint {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  type: 'fountain' | 'partner' | 'public'
  status: 'active' | 'maintenance' | 'closed'
  hours?: string
  description?: string
  email?: string
  phone?: string
}

export default function MapClientComponent() {
  const [mounted, setMounted] = useState(false)
  const [waterPoints, setWaterPoints] = useState<WaterPoint[]>([])
  const [selectedPoint, setSelectedPoint] = useState<WaterPoint | null>(null)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'fountain' | 'partner' | 'public'>('all')
  const [showSidebar, setShowSidebar] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 33.5731, lng: -7.5898 }) // Casablanca par défaut
  const [isGeolocating, setIsGeolocating] = useState(false)

  // Vérifier si le composant est monté côté client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Charger les données des points d'eau depuis l'API
  useEffect(() => {
    async function loadWaterPoints() {
      try {
        setLoading(true)
        
        // Données de démonstration pour un affichage immédiat
        const fallbackData: WaterPoint[] = [
          {
            id: '1',
            name: 'Fontaine Jemaa el-Fna',
            latitude: 31.6295,
            longitude: -7.9890,
            address: 'Place Jemaa el-Fna, Marrakech',
            type: 'fountain',
            status: 'active',
            description: 'Fontaine principale de la place historique'
          },
          {
            id: '2',
            name: 'Café de la Paix - Rabat',
            latitude: 34.0209,
            longitude: -6.8416,
            address: 'Avenue Mohammed V, Rabat',
            type: 'partner',
            status: 'active',
            hours: '7h-20h'
          },
          {
            id: '3',
            name: 'Hotel Atlas - Casablanca',
            latitude: 33.5731,
            longitude: -7.5898,
            address: 'Boulevard Mohammed V, Casablanca',
            type: 'partner',
            status: 'active',
            hours: '24h/24'
          },
          {
            id: '4',
            name: 'Fontaine Publique - Fès',
            latitude: 34.0181,
            longitude: -5.0078,
            address: 'Médina de Fès',
            type: 'fountain',
            status: 'active'
          }
        ]
        
        // Charger d'abord les données de fallback
        setWaterPoints(fallbackData)
        setLoading(false)
        console.log('🗺️ Données de démonstration chargées:', fallbackData.length)
        
        // Ensuite essayer de charger les vraies données en arrière-plan
        try {
          // Timeout réduit pour éviter l'attente
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout API')), 5000)
          )
          
          const [partnersResponse, fountainsResponse] = await Promise.race([
            Promise.all([
              fetch('/api/partners'),
              fetch('/api/fountains?international=true')
            ]),
            timeoutPromise
          ]) as [Response, Response]
          
          const partnersData = await partnersResponse.json()
          const fountainsData = await fountainsResponse.json()
          
          let allWaterPoints: WaterPoint[] = []
          
          // Ajouter les partenaires
          if (partnersData.success && partnersData.data) {
            allWaterPoints = [...allWaterPoints, ...partnersData.data]
            console.log('✅ Partenaires API chargés:', partnersData.data.length)
          }
          
          // Ajouter les fontaines publiques
          if (fountainsData.success && fountainsData.data) {
            allWaterPoints = [...allWaterPoints, ...fountainsData.data]
            console.log('✅ Fontaines API chargées:', fountainsData.data.length)
          }
          
          // Mettre à jour avec les vraies données si disponibles
          if (allWaterPoints.length > 0) {
            setWaterPoints(allWaterPoints)
            console.log('🔄 Données API mises à jour:', allWaterPoints.length)
          }
          
        } catch (apiError) {
          console.log('⚠️ APIs indisponibles, utilisation des données de démonstration')
          // On garde les données de fallback déjà chargées
        }
        
      } catch (error) {
        console.error('❌ Erreur chargement points d\'eau:', error)
        // En cas d'erreur totale, on utilise des données minimales
        const minimalData: WaterPoint[] = [
          {
            id: 'demo-1',
            name: 'Point d\'eau de démonstration',
            latitude: 33.5731,
            longitude: -7.5898,
            address: 'Casablanca, Maroc',
            type: 'fountain',
            status: 'active'
          }
        ]
        setWaterPoints(minimalData)
        setLoading(false)
      }
    }

    loadWaterPoints()
  }, [])

  // Fonction pour obtenir la localisation de l'utilisateur à la demande
  const requestGeolocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('La géolocalisation n\'est pas supportée par votre navigateur')
      return
    }

    setIsGeolocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newUserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setUserLocation(newUserLocation)
        setMapCenter(newUserLocation) // Centrer la carte sur la position utilisateur
        setIsGeolocating(false)
        console.log('✅ Position utilisateur obtenue:', newUserLocation)
      },
      (error) => {
        console.log('❌ Erreur géolocalisation:', error)
        setIsGeolocating(false)
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert('Permission de géolocalisation refusée')
            break
          case error.POSITION_UNAVAILABLE:
            alert('Position non disponible')
            break
          case error.TIMEOUT:
            alert('Timeout de géolocalisation')
            break
          default:
            alert('Erreur de géolocalisation')
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  // Filtrer les points d'eau
  const filteredPoints = waterPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         point.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || point.type === filterType
    return matchesSearch && matchesFilter
  })

  // Calculer la distance entre deux points
  function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371 // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fountain': return '#3B82F6' // Bleu pour fontaines
      case 'partner': return '#10B981' // Vert pour partenaires
      case 'public': return '#F59E0B'  // Orange pour lieux publics
      default: return '#6B7280'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fountain': return 'Fontaine'
      case 'partner': return 'Partenaire'
      case 'public': return 'Lieu public'
      default: return 'Autre'
    }
  }

  // Icône personnalisée pour les marqueurs
  const createIcon = (color: string) => {
    if (typeof window === 'undefined' || !L) {
      return null
    }
    try {
      return L.divIcon({
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        className: 'custom-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })
    } catch (error) {
      console.warn('Erreur création icône Leaflet:', error)
      return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Chargement de la carte
          </h2>
          <p className="text-gray-600 mb-4">
            Récupération des fontaines et partenaires...
          </p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>Localisation des points d'eau en cours</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header avec navigation et contrôles */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Retour</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">LmaaMap</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Bouton géolocalisation */}
            <button
              onClick={requestGeolocation}
              disabled={isGeolocating}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isGeolocating 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : userLocation 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isGeolocating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="hidden sm:inline">Localisation...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {userLocation ? 'Ma position' : 'Me localiser'}
                  </span>
                </>
              )}
            </button>

            {/* Bouton toggle sidebar */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Bouton ajouter point - Contact admin */}
            <button 
              onClick={() => alert('Pour signaler un nouveau point d\'eau, veuillez contacter l\'administration.')}
              className="flex items-center space-x-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors cursor-not-allowed opacity-70"
              title="Contactez l'administration pour signaler un nouveau point"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Signaler un point</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar coulissante */}
      <div className={`absolute top-16 left-0 h-full w-80 bg-white shadow-lg z-[999] transform transition-transform duration-300 ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Points d'eau</h2>
          
          {/* Barre de recherche */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un point d'eau..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtres */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de point d'eau</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'fountain' | 'partner' | 'public')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              <option value="fountain">Fontaines</option>
              <option value="partner">Partenaires</option>
              <option value="public">Lieux publics</option>
            </select>
          </div>
        </div>

        {/* Liste des points d'eau */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredPoints.map((point) => (
            <div
              key={point.id}
              onClick={() => setSelectedPoint(point)}
              className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div 
                  className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: getTypeColor(point.type) }}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{point.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{point.address}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {getTypeLabel(point.type)}
                    </span>
                    {userLocation && (
                      <span className="text-xs text-gray-500">
                        {calculateDistance(
                          userLocation.lat, 
                          userLocation.lng, 
                          point.latitude, 
                          point.longitude
                        ).toFixed(1)} km
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carte principale */}
      <div className="pt-16 h-screen">
        {!mounted ? (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        ) : (
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Marqueurs des points d'eau */}
            {filteredPoints.map((point) => (
              <Marker
                key={point.id}
                position={[point.latitude, point.longitude]}
                icon={createIcon(getTypeColor(point.type))}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold text-gray-900 mb-2">{point.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{point.address}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium">{getTypeLabel(point.type)}</span>
                      </div>
                      {point.hours && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Horaires:</span>
                          <span className="font-medium">{point.hours}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Statut:</span>
                        <span className={`font-medium ${
                          point.status === 'active' ? 'text-green-600' : 
                          point.status === 'maintenance' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {point.status === 'active' ? 'Actif' : 
                           point.status === 'maintenance' ? 'Maintenance' : 'Fermé'}
                        </span>
                      </div>
                    </div>
                    {userLocation && (
                      <div className="mt-3 pt-2 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Distance:</span>
                          <span className="text-sm font-medium text-blue-600">
                            {calculateDistance(
                              userLocation.lat, 
                              userLocation.lng, 
                              point.latitude, 
                              point.longitude
                            ).toFixed(1)} km
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Marqueur position utilisateur */}
            {userLocation && (
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={createIcon('#EF4444')} // Rouge pour position utilisateur
              >
                <Popup>
                  <div className="text-center p-2">
                    <p className="font-medium text-gray-900">Votre position</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  )
}