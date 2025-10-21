'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet';
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
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const heatLayerRef = useRef<L.Layer | null>(null)
  
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

  // Correction de la syntaxe et ajout des fonctions manquantes
  async function initializeMap() {
    if (!mapRef.current) return // Vérification ajoutée

    try {
      // Importation dynamique de Leaflet et des plugins
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      await import('leaflet.markercluster/dist/MarkerCluster.css')
      await import('leaflet.markercluster/dist/MarkerCluster.Default.css')
      await import('leaflet.markercluster')

      // Configuration des icônes
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl
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
      clusterGroupRef.current = (L as typeof import('leaflet')).markerClusterGroup({
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster: import('leaflet').MarkerCluster) {
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
      map.on('baselayerchange', (e: import('leaflet').LayersControlEvent) => {
        setMapType(e.name === 'Satellite' ? 'satellite' : 'street')
      })

    } catch (error) {
      console.error('Erreur initialisation carte:', error)
      setLoading(false)
    }
  }

  function loadFountains() {
    console.log('Chargement des fontaines...')
  }

  function getUserLocation() {
    console.log('Obtention de la localisation utilisateur...')
  }

  function filterFountains() {
    console.log('Filtrage des fontaines...')
  }

  function updateMapMarkers() {
    console.log('Mise à jour des marqueurs sur la carte...')
  }

  return (
    <div>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
      {loading && <div>Loading map...</div>}
    </div>
  )
}

export default MapComponentAdvanced