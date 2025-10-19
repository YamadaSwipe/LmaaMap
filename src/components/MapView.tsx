'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

interface Partner {
  id: string | number
  name: string
  type: 'fountain' | 'hotel' | 'restaurant'
  latitude: number
  longitude: number
  address?: string
  hours?: string
}

export default function MapView() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get('/api/partners')
        setPartners(res.data.data)
      } catch (e) {
        console.error(e)
      } finally { 
        setLoading(false) 
      }
    }
    load()
  }, [])

  if (loading) return <div className="p-8">Chargement carte...</div>

  return (
    <MapContainer 
      center={[31.6300, -7.9900]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        attribution="&copy; OSM" 
      />
      {partners.map(p => (
        <Marker key={p.id} position={[p.latitude, p.longitude]}>
          <Popup>
            <div>
              <strong>{p.name}</strong>
              <p>{p.address}</p>
              <p>Type: {p.type}</p>
              <p>Horaires: {p.hours || 'N/A'}</p>
              <a 
                href={`/api/scan?partnerId=${p.id}`} 
                target="_blank" 
                rel="noreferrer"
              >
                Enregistrer remplissage
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}