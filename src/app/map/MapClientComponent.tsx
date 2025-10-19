'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Navigation, Search, Filter, Plus, Menu } from 'lucide-react'
import { staticWaterPoints } from './staticData'

// Types pour éviter les erreurs d'import
type MapContainerType = any
type TileLayerType = any  
type MarkerType = any
type PopupType = any

// Imports conditionnels pour éviter les erreurs SSR
let MapContainer: MapContainerType, TileLayer: TileLayerType, Marker: MarkerType, Popup: PopupType, L: any

if (typeof window !== 'undefined') {
  const leaflet = require('react-leaflet')
  MapContainer = leaflet.MapContainer
  TileLayer = leaflet.TileLayer
  Marker = leaflet.Marker
  Popup = leaflet.Popup
  
  // Import de Leaflet core
  L = require('leaflet')
  
  // Import CSS seulement côté client
  require('leaflet/dist/leaflet.css')
  require('./map.css')
}

// Interface pour les points d'eau et établissements
interface WaterPoint {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  type: 'fountain' | 'partner' | 'greenyou'
  status: 'active' | 'maintenance' | 'closed'
  hours?: string
  description?: string
  email?: string
  phone?: string
  category?: string // Pour GreenYou: "Hébergement", "Restauration", etc.
}

export default function MapClientComponent() {
  const [mounted, setMounted] = useState(false)
  const [waterPoints, setWaterPoints] = useState<WaterPoint[]>([])
  const [selectedPoint, setSelectedPoint] = useState<WaterPoint | null>(null)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'fountain' | 'partner' | 'greenyou'>('all')
  const [showSidebar, setShowSidebar] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 33.5731, lng: -7.5898 }) // Casablanca par défaut
  const [isGeolocating, setIsGeolocating] = useState(false)
  const [isLoadingAPI, setIsLoadingAPI] = useState(false)

  // Vérifier si le composant est monté côté client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Charger les données des points d'eau
  useEffect(() => {
    async function loadWaterPoints() {
      try {
        setLoading(true)
        
        // Données enrichies - Utilisation des données statiques + quelques points personnalisés
        const fallbackData: WaterPoint[] = [
          // Données statiques riches (50+ points)
          ...(staticWaterPoints as WaterPoint[]),
          // Points personnalisés supplémentaires
          {
            id: 'custom-001',
            name: 'Fontaine Cyberpunk - Casablanca Tech',
            latitude: 33.5650,
            longitude: -7.6033,
            address: 'Quartier des Affaires, Casablanca',
            type: 'fountain' as const,
            status: 'active' as const,
            description: 'Point d\'eau moderne avec technologie IoT'
          }
        ]
        
        // Charger les données de démonstration immédiatement
        setWaterPoints(fallbackData)
        setLoading(false)
        console.log('🗺️ Données de démonstration chargées:', fallbackData.length, 'points')
        
        // Essayer de charger les vraies données en arrière-plan avec timeout plus long
        try {
          setIsLoadingAPI(true)
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout API')), 15000) // 15 secondes
          )
          
          const [partnersResponse, fountainsResponse, greenYouResponse] = await Promise.race([
            Promise.all([
              fetch('/api/partners'),
              fetch('/api/fountains?international=true'),
              fetch('/api/greenyou-places') // API des lieux GreenYou validés
            ]),
            timeoutPromise
          ]) as [Response, Response, Response]
          
          const partnersData = await partnersResponse.json()
          const fountainsData = await fountainsResponse.json()
          const greenYouData = await greenYouResponse.json()
          
          let allWaterPoints: WaterPoint[] = []
          
          if (partnersData.success && partnersData.data) {
            allWaterPoints = [...allWaterPoints, ...partnersData.data]
            console.log('✅ Partenaires API chargés:', partnersData.data.length)
          }
          
          if (fountainsData.success && fountainsData.data) {
            allWaterPoints = [...allWaterPoints, ...fountainsData.data]
            console.log('✅ Fontaines API chargées:', fountainsData.data.length)
          }
          
          // Ajouter les établissements GreenYou validés
          if (greenYouData.success && Array.isArray(greenYouData.places)) {
            const greenYouPoints: WaterPoint[] = greenYouData.places
              .filter((place: any) => place.isActive && place.latitude && place.longitude)
              .map((place: any) => ({
                id: place.id,
                name: place.nom,
                latitude: parseFloat(place.latitude),
                longitude: parseFloat(place.longitude),
                address: `${place.adresse}, ${place.ville}`,
                type: 'greenyou' as const,
                status: 'active' as const,
                description: place.description,
                email: place.email,
                phone: place.telephone,
                category: place.type
              }))
            allWaterPoints = [...allWaterPoints, ...greenYouPoints]
            console.log('✅ Établissements GreenYou chargés:', greenYouPoints.length)
          }
          
          if (allWaterPoints.length > 0) {
            setWaterPoints(allWaterPoints)
            console.log('🔄 Données API mises à jour:', allWaterPoints.length, 'points au total')
          }
          
        } catch (apiError) {
          console.log('⚠️ APIs indisponibles, utilisation des données de démonstration')
        } finally {
          setIsLoadingAPI(false)
        }
        
      } catch (error) {
        console.error('❌ Erreur chargement points d\'eau:', error)
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

  // Fonction pour obtenir la localisation
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
        setMapCenter(newUserLocation)
        setIsGeolocating(false)
        console.log('✅ Position utilisateur obtenue:', newUserLocation)
      },
      (error) => {
        console.log('❌ Erreur géolocalisation:', error)
        setIsGeolocating(false)
        alert('Erreur de géolocalisation')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
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

  // Calculer la distance
  function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371
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
      case 'partner': return '#10B981' // Vert émeraude pour partenaires
      case 'greenyou': return '#16a34a' // Vert GreenYou (brand color)
      case 'public': return '#F59E0B'
      default: return '#6B7280'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fountain': return 'Fontaine'
      case 'partner': return 'Partenaire'
      case 'greenyou': return '🌿 GreenYou'
      case 'public': return 'Public'
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chargement de la carte</h2>
          <p className="text-gray-600">Récupération des points d'eau...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link 
              href="/" 
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              ParenteseYou
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-lg font-semibold text-gray-900">
              Carte des points d'eau
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredPoints.length} points)
              </span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {isLoadingAPI && (
              <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <div className="animate-spin rounded-full h-3 w-3 border border-blue-600 border-t-transparent mr-2"></div>
                Chargement données...
              </div>
            )}
            <button
              onClick={requestGeolocation}
              disabled={isGeolocating}
              className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Navigation className="w-4 h-4 mr-1" />
              {isGeolocating ? 'Localisation...' : 'Me localiser'}
            </button>
          </div>
        </div>
        
        {/* Filtres et recherche */}
        <div className="px-4 pb-3 border-t bg-gray-50">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un point d'eau..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              <option value="fountain">Fontaines (LmaaMap)</option>
              <option value="partner">Partenaires</option>
              <option value="greenyou">Établissements éco-responsables (GreenYou)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Carte principale */}
      <div className="pt-32 h-screen">
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
                  <div className="p-2 min-w-[250px]">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      {point.type === 'greenyou' && <span>🌿</span>}
                      {point.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{point.address}</p>
                    
                    {point.type === 'greenyou' && point.category && (
                      <div className="mb-2 px-2 py-1 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                        {point.category}
                      </div>
                    )}
                    
                    {point.description && (
                      <p className="text-xs text-gray-500 mb-2 italic line-clamp-2">{point.description}</p>
                    )}
                    
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium">{getTypeLabel(point.type)}</span>
                      </div>
                      {point.phone && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tél:</span>
                          <a href={`tel:${point.phone}`} className="font-medium text-blue-600 hover:underline">{point.phone}</a>
                        </div>
                      )}
                      {point.email && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email:</span>
                          <a href={`mailto:${point.email}`} className="font-medium text-blue-600 hover:underline text-xs truncate max-w-[150px]">{point.email}</a>
                        </div>
                      )}
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
                icon={createIcon('#EF4444')}
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