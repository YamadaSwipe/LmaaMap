'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Types pour les props
interface WaterPoint {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  type: 'fountain' | 'partner'
  status: 'active' | 'maintenance' | 'closed'
  hours?: string
}

interface UserLocation {
  lat: number
  lng: number
}

interface MapComponentProps {
  filteredPoints: WaterPoint[]
  userLocation: UserLocation | null
  createIcon: (color: string) => L.Icon
  getTypeColor: (type: string) => string
  getTypeLabel: (type: string) => string
  calculateDistance: (lat1: number, lng1: number, lat2: number, lng2: number) => number
}

export default function MapComponent({
  filteredPoints,
  userLocation,
  createIcon,
  getTypeColor,
  getTypeLabel,
  calculateDistance
}: MapComponentProps) {
  return (
    <MapContainer
      center={[31.6300, -7.9900]}
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
  )
}