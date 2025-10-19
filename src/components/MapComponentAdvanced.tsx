'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Search, 
  Filter, 
  Layers, 
  MapPin, 
  Navigation, 
  Droplets,
  Clock,
  Phone,
  Star,
  X,
  Settings
} from 'lucide-react'

// Types pour les fontaines et filtres
interface Fountain {
  id: string
  name: string
  latitude: number
  longitude: number
  address?: string
  city?: string
  description?: string
  isActive: boolean
  qrCode?: string
  ratings?: number
  lastMaintenance?: string
  type?: 'public' | 'partner' | 'premium'
}

interface MapFilters {
  showActive: boolean
  showInactive: boolean
  fountainType: 'all' | 'public' | 'partner' | 'premium'
  searchRadius: number
  showHeatmap: boolean
  enableClustering: boolean
}

const MapComponentAdvanced = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const clusterGroupRef = useRef<any>(null)
  const heatLayerRef = useRef<any>(null)
  
  const [loading, setLoading] = useState(true)
  const [fountains, setFountains] = useState<Fountain[]>([])
  const [filteredFountains, setFilteredFountains] = useState<Fountain[]>([])
  const [selectedFountain, setSelectedFountain] = useState<Fountain | null>(null)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [mapType, setMapType] = useState<'street' | 'satellite'>('street')
  
  const [filters, setFilters] = useState<MapFilters>({
    showActive: true,
    showInactive: false,
    fountainType: 'all',
    searchRadius: 5000, // 5km
    showHeatmap: false,
    enableClustering: true
  })

  // Initialisation de la carte
  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      initializeMap()
    }
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Chargement des données de fontaines
  useEffect(() => {
    loadFountains()
    getUserLocation()
  }, [])

  // Filtrage des fontaines
  useEffect(() => {
    filterFountains()
  }, [fountains, filters, searchTerm, userLocation])

  // Mise à jour de la carte quand les fontaines filtrées changent
  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMapMarkers()
    }
  }, [filteredFountains, filters.enableClustering, filters.showHeatmap])

  async function initializeMap() {
    try {
      // Importation dynamique de Leaflet et des plugins
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      await import('leaflet.markercluster/dist/MarkerCluster.css')
      await import('leaflet.markercluster/dist/MarkerCluster.Default.css')
      await import('leaflet.markercluster')
      
      // Configuration des icônes
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      })

      // Création de la carte
      const map = L.map(mapRef.current).setView([33.5731, -7.5898], 13) // Casablanca, Maroc par défaut

      // Couches de base
      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      })

      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri'
      })

      // Ajout de la couche par défaut
      streetLayer.addTo(map)

      // Contrôle des couches
      const baseLayers = {
        'Street': streetLayer,
        'Satellite': satelliteLayer
      }
      L.control.layers(baseLayers).addTo(map)

      // Groupe de clustering
      clusterGroupRef.current = (L as any).markerClusterGroup({
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster: any) {
          const count = cluster.getChildCount()
          let className = 'marker-cluster marker-cluster-'
          if (count < 10) className += 'small'
          else if (count < 100) className += 'medium'
          else className += 'large'
          
          return L.divIcon({
            html: `<div><span>${count}</span></div>`,
            className: className,
            iconSize: L.point(40, 40)
          })
        }
      })

      mapInstanceRef.current = map
      setLoading(false)

      // Gestion du changement de couches
      map.on('baselayerchange', (e: any) => {
        setMapType(e.name === 'Satellite' ? 'satellite' : 'street')
      })

    } catch (error) {
      console.error('Erreur initialisation carte:', error)
      setLoading(false)
    }
  }

  async function loadFountains() {
    try {
      // Simulation de données de fontaines avec plus de détails
      const mockFountains: Fountain[] = [
        {
          id: '1',
          name: 'Fontaine Centrale',
          latitude: 48.8566,
          longitude: 2.3522,
          address: '1 Place de la République',
          city: 'Paris',
          description: 'Fontaine publique au cœur de Paris',
          isActive: true,
          type: 'public',
          ratings: 4.5,
          lastMaintenance: '2024-01-15'
        },
        {
          id: '2',
          name: 'Fontaine Parc Municipal',
          latitude: 48.8606,
          longitude: 2.3376,
          address: 'Jardin du Luxembourg',
          city: 'Paris',
          description: 'Fontaine dans le parc, eau fraîche',
          isActive: true,
          type: 'public',
          ratings: 4.2,
          lastMaintenance: '2024-01-10'
        },
        {
          id: '3',
          name: 'Restaurant Central - Fontaine',
          latitude: 48.8584,
          longitude: 2.3488,
          address: '15 Rue de Rivoli',
          city: 'Paris',
          description: 'Fontaine partenaire - Restaurant Central',
          isActive: true,
          type: 'partner',
          ratings: 4.7,
          lastMaintenance: '2024-01-20'
        },
        {
          id: '4',
          name: 'Fontaine Gare du Nord',
          latitude: 48.8809,
          longitude: 2.3553,
          address: 'Gare du Nord',
          city: 'Paris',
          description: 'Fontaine dans la gare',
          isActive: false,
          type: 'public',
          ratings: 3.8,
          lastMaintenance: '2023-12-01'
        },
        {
          id: '5',
          name: 'Fontaine Premium Louvre',
          latitude: 48.8606,
          longitude: 2.3376,
          address: 'Musée du Louvre',
          city: 'Paris',
          description: 'Fontaine premium avec filtration avancée',
          isActive: true,
          type: 'premium',
          ratings: 4.9,
          lastMaintenance: '2024-01-25'
        }
      ]

      setFountains(mockFountains)
    } catch (error) {
      console.error('Erreur chargement fontaines:', error)
    }
  }

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 15)
          }
        },
        (error) => {
          console.log('Géolocalisation non disponible:', error)
        }
      )
    }
  }

  function filterFountains() {
    let filtered = fountains

    // Filtre par statut
    if (!filters.showActive && filters.showInactive) {
      filtered = filtered.filter(f => !f.isActive)
    } else if (filters.showActive && !filters.showInactive) {
      filtered = filtered.filter(f => f.isActive)
    }

    // Filtre par type
    if (filters.fountainType !== 'all') {
      filtered = filtered.filter(f => f.type === filters.fountainType)
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.city?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtre par rayon (si position utilisateur disponible)
    if (userLocation && filters.searchRadius > 0) {
      filtered = filtered.filter(f => {
        const distance = calculateDistance(
          userLocation.lat, userLocation.lng,
          f.latitude, f.longitude
        )
        return distance <= filters.searchRadius
      })
    }

    setFilteredFountains(filtered)
  }

  function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371e3 // Rayon de la Terre en mètres
    const φ1 = lat1 * Math.PI/180
    const φ2 = lat2 * Math.PI/180
    const Δφ = (lat2-lat1) * Math.PI/180
    const Δλ = (lng2-lng1) * Math.PI/180

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    return R * c
  }

  async function updateMapMarkers() {
    if (!mapInstanceRef.current) return

    const L = (await import('leaflet')).default

    // Nettoyer les marqueurs existants
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker)
    })
    markersRef.current = []

    if (clusterGroupRef.current) {
      clusterGroupRef.current.clearLayers()
      mapInstanceRef.current.removeLayer(clusterGroupRef.current)
    }

    if (heatLayerRef.current) {
      mapInstanceRef.current.removeLayer(heatLayerRef.current)
      heatLayerRef.current = null
    }

    // Créer les nouveaux marqueurs
    const markers = filteredFountains.map(fountain => {
      const iconColor = fountain.isActive ? 
        (fountain.type === 'premium' ? 'gold' : 
         fountain.type === 'partner' ? 'green' : 'blue') : 'red'

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-pin" style="background-color: ${iconColor}">
            <svg class="marker-icon" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      })

      const marker = L.marker([fountain.latitude, fountain.longitude], { icon })
        .bindPopup(createPopupContent(fountain))
        .on('click', () => setSelectedFountain(fountain))

      return marker
    })

    markersRef.current = markers

    // Ajouter les marqueurs avec ou sans clustering
    if (filters.enableClustering && clusterGroupRef.current) {
      clusterGroupRef.current.addLayers(markers)
      mapInstanceRef.current.addLayer(clusterGroupRef.current)
    } else {
      markers.forEach(marker => marker.addTo(mapInstanceRef.current))
    }

    // Ajouter la heatmap si activée
    if (filters.showHeatmap && filteredFountains.length > 0) {
      try {
        await import('leaflet.heat')
        const heatData = filteredFountains.map(f => [f.latitude, f.longitude, 1])
        heatLayerRef.current = (L as any).heatLayer(heatData, {
          radius: 25,
          blur: 15,
          maxZoom: 17
        })
        mapInstanceRef.current.addLayer(heatLayerRef.current)
      } catch (error) {
        console.error('Erreur chargement heatmap:', error)
      }
    }
  }

  function createPopupContent(fountain: Fountain): string {
    const statusColor = fountain.isActive ? 'green' : 'red'
    const statusText = fountain.isActive ? 'Active' : 'Hors service'
    
    return `
      <div class="fountain-popup">
        <h3 style="margin: 0 0 8px 0; color: #333;">${fountain.name}</h3>
        <div style="margin-bottom: 6px;">
          <span style="color: ${statusColor}; font-weight: bold;">● ${statusText}</span>
        </div>
        ${fountain.address ? `<p style="margin: 4px 0; color: #666;"><strong>📍</strong> ${fountain.address}</p>` : ''}
        ${fountain.description ? `<p style="margin: 4px 0; color: #666;">${fountain.description}</p>` : ''}
        ${fountain.ratings ? `<p style="margin: 4px 0; color: #666;"><strong>⭐</strong> ${fountain.ratings}/5</p>` : ''}
        <div style="margin-top: 8px;">
          <button onclick="window.open('https://maps.google.com/maps?daddr=${fountain.latitude},${fountain.longitude}', '_blank')" 
                  style="background: #4285f4; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">
            Itinéraire
          </button>
        </div>
      </div>
    `
  }

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Chargement de la carte...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
      {/* Contrôles de la carte */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        {/* Recherche */}
        <div className="bg-white rounded-lg shadow-md p-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une fontaine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Boutons de contrôle */}
        <div className="bg-white rounded-lg shadow-md p-2 space-y-1">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
          </button>
          
          <button
            onClick={getUserLocation}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Navigation className="w-4 h-4" />
            <span>Ma position</span>
          </button>
        </div>
      </div>

      {/* Panneau de filtres */}
      {showFilters && (
        <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-4 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Filtres de la carte</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Statut des fontaines */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showActive}
                    onChange={(e) => setFilters({...filters, showActive: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">Fontaines actives</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showInactive}
                    onChange={(e) => setFilters({...filters, showInactive: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">Fontaines hors service</span>
                </label>
              </div>
            </div>

            {/* Type de fontaines */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.fountainType}
                onChange={(e) => setFilters({...filters, fountainType: e.target.value as any})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">Tous types</option>
                <option value="public">Publiques</option>
                <option value="partner">Partenaires</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            {/* Rayon de recherche */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rayon: {filters.searchRadius/1000}km
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={filters.searchRadius}
                onChange={(e) => setFilters({...filters, searchRadius: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>

            {/* Options d'affichage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Affichage</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.enableClustering}
                    onChange={(e) => setFilters({...filters, enableClustering: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">Regroupement des marqueurs</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showHeatmap}
                    onChange={(e) => setFilters({...filters, showHeatmap: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">Carte de densité</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques rapides */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-md p-3">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Droplets className="w-4 h-4 text-blue-600" />
            <span>{filteredFountains.length} fontaines</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{filteredFountains.filter(f => f.isActive).length} actives</span>
          </div>
        </div>
      </div>

      {/* La carte */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Styles pour les marqueurs personnalisés */}
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .marker-icon {
          width: 16px;
          height: 16px;
          transform: rotate(45deg);
        }
        
        .marker-cluster {
          background: rgba(59, 130, 246, 0.6);
          border: 2px solid rgba(59, 130, 246, 0.8);
          border-radius: 50%;
          color: white;
          font-weight: bold;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .marker-cluster-small {
          background: rgba(59, 130, 246, 0.6);
        }
        
        .marker-cluster-medium {
          background: rgba(34, 197, 94, 0.6);
        }
        
        .marker-cluster-large {
          background: rgba(239, 68, 68, 0.6);
        }
        
        .fountain-popup {
          min-width: 200px;
        }
      `}</style>
    </div>
  )
}

export default MapComponentAdvanced