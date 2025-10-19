import { NextRequest, NextResponse } from 'next/server'
import { getFountainsAroundPoint, getMoroccanFountains, MOROCCO_CITIES } from '@/lib/overpass'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const city = searchParams.get('city')
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')
    const radius = searchParams.get('radius')

    if (action === 'morocco') {
      // Récupérer toutes les fontaines du Maroc
      const fountains = await getMoroccanFountains()
      
      return NextResponse.json({
        success: true,
        data: fountains.map(fountain => ({
          id: fountain.id,
          name: fountain.name,
          type: 'fountain',
          latitude: fountain.lat,
          longitude: fountain.lon,
          address: `${fountain.tags.city || 'Maroc'}`,
          hours: fountain.tags.opening_hours || '24h/24',
          status: 'active',
          description: `Fontaine publique OpenStreetMap - ${fountain.tags.city || 'Maroc'}`,
          quality: 'bonne',
          maintenance: 'Données OpenStreetMap',
          source: 'openstreetmap'
        }))
      })
    }

    if (action === 'around' && lat && lon) {
      // Récupérer les fontaines autour d'un point
      const latitude = parseFloat(lat)
      const longitude = parseFloat(lon)
      const radiusMeters = radius ? parseInt(radius) : 5000

      const fountains = await getFountainsAroundPoint(latitude, longitude, radiusMeters)
      
      return NextResponse.json({
        success: true,
        data: fountains.map(fountain => ({
          id: fountain.id,
          name: fountain.name,
          type: 'fountain',
          latitude: fountain.lat,
          longitude: fountain.lon,
          address: fountain.tags.addr || 'Adresse non spécifiée',
          hours: fountain.tags.opening_hours || '24h/24',
          status: 'active',
          description: `Fontaine publique OpenStreetMap`,
          quality: 'bonne',
          maintenance: 'Données OpenStreetMap',
          source: 'openstreetmap'
        }))
      })
    }

    if (action === 'cities') {
      // Retourner la liste des villes marocaines disponibles
      return NextResponse.json({
        success: true,
        data: Object.entries(MOROCCO_CITIES).map(([name, coords]) => ({
          name,
          latitude: coords.lat,
          longitude: coords.lon
        }))
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Action non supportée. Utilisez: morocco, around, ou cities'
    }, { status: 400 })

  } catch (error) {
    console.error('Erreur API OSM:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des données OpenStreetMap'
    }, { status: 500 })
  }
}