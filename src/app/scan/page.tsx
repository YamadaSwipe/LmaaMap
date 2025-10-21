'use client'

import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  QrCode, 
  MapPin, 
  Clock, 
  Check, 
  X, 
  Camera,
  ExternalLink,
  Navigation,
  Info
} from 'lucide-react'
import QRScanner from '../../components/QRScanner'

interface FountainData {
  id: string
  name: string
  location: string
  coordinates: {
    latitude: number
    longitude: number
  }
  isActive: boolean
  description?: string
  features: string[]
  lastMaintenance: Date
  averageRating: number
  scanCount: number
}

interface ScanSession {
  qrCode: string
  fountainId: string
  scannedAt: Date
  isValid: boolean
  userLocation?: {
    latitude: number
    longitude: number
  }
}

export default function ScanPage() {
  return (
    <Suspense fallback={<div>Chargement du scan...</div>}>
      <ScanPageContent />
    </Suspense>
  )
}

function ScanPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const qrCodeParam = searchParams.get('qr')
  const [showScanner, setShowScanner] = useState(!qrCodeParam)
  const [fountainData, setFountainData] = useState<FountainData | null>(null)
  const [scanSession, setScanSession] = useState<ScanSession | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null)

  useEffect(() => {
    // Obtenir la géolocalisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation(position),
        (error) => console.warn('Géolocalisation non disponible:', error)
      )
    }

    // Si un QR code est fourni dans l'URL, le traiter directement
    if (qrCodeParam) {
      handleQRScan(qrCodeParam)
    }
  }, [qrCodeParam])

  async function handleQRScan(qrData: string) {
    setLoading(true)
    setError(null)
    
    try {
      // Envoyer la requête à l'API
      const response = await fetch('/api/qr-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          qrCode: qrData,
          userLocation: userLocation ? {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude
          } : null,
          userAgent: navigator.userAgent
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du scan')
      }

      if (data.fountain) {
        setFountainData(data.fountain)
        
        // Enregistrer la session de scan
        const session: ScanSession = {
          qrCode: qrData,
          fountainId: data.fountain.id,
          scannedAt: new Date(data.scan.scannedAt),
          isValid: true,
          userLocation: userLocation ? {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude
          } : undefined
        }
        
        setScanSession(session)
        setShowScanner(false)
      } else {
        throw new Error('Fontaine non trouvée')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'QR Code invalide ou fontaine non trouvée'
      setError(errorMessage)
      console.error('Erreur scan:', err)
    } finally {
      setLoading(false)
    }
  }



  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  function openInMaps() {
    if (fountainData) {
      const { latitude, longitude } = fountainData.coordinates
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
      window.open(url, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Traitement du QR Code...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur de scan</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => {
                setError(null)
                setShowScanner(true)
              }}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Réessayer
            </button>
            <button
              onClick={() => router.push('/map')}
              className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Voir la carte
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showScanner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <QRScanner
          onScan={handleQRScan}
          onError={(error) => setError(error)}
          onClose={() => router.push('/map')}
          isActive={true}
        />
      </div>
    )
  }

  if (fountainData) {
    const distance = userLocation ? calculateDistance(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      fountainData.coordinates.latitude,
      fountainData.coordinates.longitude
    ) : null

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header de succès */}
        <div className="bg-green-600 text-white">
          <div className="max-w-md mx-auto px-4 py-6 text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl font-bold mb-2">Scan réussi !</h1>
            <p className="text-green-100">Fontaine trouvée et vérifiée</p>
          </div>
        </div>

        {/* Informations de la fontaine */}
        <div className="max-w-md mx-auto">
          {/* Carte de la fontaine */}
          <div className="bg-white border-b">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {fountainData.name}
                  </h2>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{fountainData.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < Math.floor(fountainData.averageRating)
                          ? 'bg-yellow-400'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {fountainData.averageRating}
                  </span>
                </div>
              </div>

              {distance && (
                <div className="flex items-center text-blue-600 text-sm mb-3">
                  <Navigation className="w-4 h-4 mr-1" />
                  <span>À {distance.toFixed(1)} km de votre position</span>
                </div>
              )}

              {fountainData.description && (
                <p className="text-gray-600 text-sm mb-3">
                  {fountainData.description}
                </p>
              )}

              {/* Caractéristiques */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Caractéristiques</h4>
                <div className="flex flex-wrap gap-1">
                  {fountainData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Dernière maintenance</span>
                  </div>
                  <p className="text-gray-900">
                    {fountainData.lastMaintenance.toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <QrCode className="w-4 h-4 mr-1" />
                    <span>Scans total</span>
                  </div>
                  <p className="text-gray-900">{fountainData.scanCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white border-b p-4">
            <div className="space-y-3">
              <button
                onClick={openInMaps}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
              >
                <Navigation className="w-5 h-5" />
                <span>Itinéraire vers la fontaine</span>
              </button>

              <button
                onClick={() => setShowScanner(true)}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
              >
                <Camera className="w-5 h-5" />
                <span>Scanner un autre QR Code</span>
              </button>

              <button
                onClick={() => router.push('/map')}
                className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700"
              >
                <MapPin className="w-5 h-5" />
                <span>Voir toutes les fontaines</span>
              </button>
            </div>
          </div>

          {/* Informations de scan */}
          {scanSession && (
            <div className="bg-white p-4">
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <Info className="w-4 h-4" />
                <span>
                  Scanné le {scanSession.scannedAt.toLocaleString('fr-FR')}
                </span>
              </div>
            </div>
          )}

          {/* Statut de la fontaine */}
          <div className="bg-white border-t">
            <div className="p-4">
              <div className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-lg ${
                fountainData.isActive 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  fountainData.isActive ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm font-medium">
                  {fountainData.isActive ? 'Fontaine opérationnelle' : 'Fontaine hors service'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
