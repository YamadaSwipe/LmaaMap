// Service pour récupérer les données de fontaines depuis OpenStreetMap via l'API Overpass

export interface OSMFountain {
  id: string
  name?: string
  lat: number
  lon: number
  tags: Record<string, string>
  type: 'node' | 'way' | 'relation'
}

export interface BoundingBox {
  south: number
  west: number
  north: number
  east: number
}

/**
 * Récupère les fontaines publiques dans une zone géographique donnée
 */
export async function getFountainsInBounds(bounds: BoundingBox): Promise<OSMFountain[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="drinking_water"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      node["amenity"="fountain"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      node["man_made"="water_tap"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
    );
    out geom;
  `

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`
    })

    if (!response.ok) {
      throw new Error(`Erreur API Overpass: ${response.status}`)
    }

    const data = await response.json()
    
    return data.elements.map((element: { id: string; type: 'node' | 'way' | 'relation'; lat: number; lon: number; tags: Record<string, string> }): OSMFountain => ({
      id: `osm-${element.type}-${element.id}`,
      name: element.tags?.name || element.tags?.description || 'Fontaine publique',
      lat: element.lat,
      lon: element.lon,
      tags: element.tags || {},
      type: element.type
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des fontaines OSM:', error)
    return []
  }
}

/**
 * Récupère les fontaines dans une ville spécifique
 */
export async function getFountainsInCity(cityName: string, countryCode: string = 'FR'): Promise<OSMFountain[]> {
  // D'abord, récupérer les limites de la ville
  const cityQuery = `
    [out:json][timeout:25];
    rel["name"="${cityName}"]["admin_level"~"^(8|9|10)$"]["place"~"^(city|town|village)$"];
    out geom;
  `

  try {
    const cityResponse = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(cityQuery)}`
    })

    if (!cityResponse.ok) {
      throw new Error(`Erreur lors de la recherche de la ville: ${cityResponse.status}`)
    }

    const cityData = await cityResponse.json()
    
    if (cityData.elements.length === 0) {
      console.warn(`Ville "${cityName}" non trouvée`)
      return []
    }

    // Utiliser la première ville trouvée pour récupérer les fontaines
    const fountainQuery = `
      [out:json][timeout:25];
      (
        node["amenity"="drinking_water"](area.city);
        node["amenity"="fountain"](area.city);
        node["man_made"="water_tap"](area.city);
      );
      (._;>;);
      out geom;
    `

    const fountainResponse = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(fountainQuery.replace('area.city', `rel(id:${cityData.elements[0].id})`))}`
    })

    if (!fountainResponse.ok) {
      throw new Error(`Erreur lors de la récupération des fontaines: ${fountainResponse.status}`)
    }

    const fountainData = await fountainResponse.json()
    
    return fountainData.elements
      .filter((element: any) => element.type === 'node' && element.lat && element.lon)
      .map((element: any): OSMFountain => ({
        id: `osm-${element.type}-${element.id}`,
        name: element.tags?.name || element.tags?.description || `Fontaine ${cityName}`,
        lat: element.lat,
        lon: element.lon,
        tags: element.tags || {},
        type: element.type
      }))
  } catch (error) {
    console.error(`Erreur lors de la récupération des fontaines pour ${cityName}:`, error)
    return []
  }
}

/**
 * Récupère les fontaines autour d'un point géographique
 */
export async function getFountainsAroundPoint(lat: number, lon: number, radiusMeters: number = 5000): Promise<OSMFountain[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="drinking_water"](around:${radiusMeters},${lat},${lon});
      node["amenity"="fountain"](around:${radiusMeters},${lat},${lon});
      node["man_made"="water_tap"](around:${radiusMeters},${lat},${lon});
    );
    out geom;
  `

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`
    })

    if (!response.ok) {
      throw new Error(`Erreur API Overpass: ${response.status}`)
    }

    const data = await response.json()
    
    return data.elements.map((element: { id: string; type: 'node' | 'way' | 'relation'; lat: number; lon: number; tags: Record<string, string> }): OSMFountain => ({
      id: `osm-${element.type}-${element.id}`,
      name: element.tags?.name || element.tags?.description || 'Fontaine publique',
      lat: element.lat,
      lon: element.lon,
      tags: element.tags || {},
      type: element.type
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des fontaines OSM:', error)
    return []
  }
}

/**
 * Coordonnées prédéfinies pour les principales villes du Maroc
 */
export const MOROCCO_CITIES = {
  'Casablanca': { lat: 33.5731, lon: -7.5898 },
  'Rabat': { lat: 34.0209, lon: -6.8416 },
  'Marrakech': { lat: 31.6295, lon: -7.9811 },
  'Fès': { lat: 34.0181, lon: -5.0078 },
  'Tanger': { lat: 35.7595, lon: -5.8340 },
  'Agadir': { lat: 30.4278, lon: -9.5981 },
  'Meknès': { lat: 33.8935, lon: -5.5473 },
  'Oujda': { lat: 34.6867, lon: -1.9114 },
  'Kenitra': { lat: 34.2610, lon: -6.5802 },
  'Tétouan': { lat: 35.5889, lon: -5.3626 }
}

/**
 * Coordonnées prédéfinies pour les principales villes de France
 * Basé sur les données de watermap.fr et OpenStreetMap
 */
export const FRANCE_CITIES = {
  'Paris': { lat: 48.8566, lon: 2.3522 },
  'Marseille': { lat: 43.2965, lon: 5.3698 },
  'Lyon': { lat: 45.7640, lon: 4.8357 },
  'Toulouse': { lat: 43.6047, lon: 1.4442 },
  'Nice': { lat: 43.7102, lon: 7.2620 },
  'Nantes': { lat: 47.2184, lon: -1.5536 },
  'Strasbourg': { lat: 48.5734, lon: 7.7521 },
  'Montpellier': { lat: 43.6110, lon: 3.8767 },
  'Bordeaux': { lat: 44.8378, lon: -0.5792 },
  'Lille': { lat: 50.6292, lon: 3.0573 },
  'Rennes': { lat: 48.1173, lon: -1.6778 },
  'Reims': { lat: 49.2583, lon: 4.0317 },
  'Le Havre': { lat: 49.4944, lon: 0.1079 },
  'Saint-Étienne': { lat: 45.4397, lon: 4.3872 },
  'Toulon': { lat: 43.1242, lon: 5.9280 },
  'Angers': { lat: 47.4784, lon: -0.5632 },
  'Grenoble': { lat: 45.1885, lon: 5.7245 },
  'Dijon': { lat: 47.3220, lon: 5.0415 }
}

/**
 * Récupère les fontaines pour les principales villes du Maroc
 */
export async function getMoroccanFountains(): Promise<OSMFountain[]> {
  const allFountains: OSMFountain[] = []
  
  for (const [cityName, coords] of Object.entries(MOROCCO_CITIES)) {
    try {
      console.log(`Récupération des fontaines pour ${cityName}...`)
      const cityFountains = await getFountainsAroundPoint(coords.lat, coords.lon, 10000) // 10km radius
      
      // Ajouter le nom de la ville aux fontaines
      const enhancedFountains = cityFountains.map(fountain => ({
        ...fountain,
        name: fountain.name && fountain.name.includes(cityName) ? fountain.name : `${fountain.name || 'Fontaine'} - ${cityName}`,
        tags: { ...fountain.tags, city: cityName, country: 'Morocco' }
      }))
      
      allFountains.push(...enhancedFountains)
      
      // Pause pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Erreur pour ${cityName}:`, error)
    }
  }
  
  return allFountains
}

/**
 * Récupère les fontaines pour les principales villes de France
 * Compatible avec les données de watermap.fr
 */
export async function getFrenchFountains(): Promise<OSMFountain[]> {
  const allFountains: OSMFountain[] = []
  
  for (const [cityName, coords] of Object.entries(FRANCE_CITIES)) {
    try {
      console.log(`Récupération des fontaines pour ${cityName}, France...`)
      const cityFountains = await getFountainsAroundPoint(coords.lat, coords.lon, 12000) // 12km radius pour les villes françaises
      
      // Ajouter le nom de la ville aux fontaines
      const enhancedFountains = cityFountains.map(fountain => ({
        ...fountain,
        name: fountain.name && fountain.name.includes(cityName) ? fountain.name : `${fountain.name || 'Fontaine'} - ${cityName}`,
        tags: { ...fountain.tags, city: cityName, country: 'France' }
      }))
      
      allFountains.push(...enhancedFountains)
      
      // Pause pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Erreur pour ${cityName}:`, error)
    }
  }
  
  console.log(`✅ ${allFountains.length} fontaines récupérées en France`)
  return allFountains
}

/**
 * Récupère les fontaines pour le Maroc ET la France
 * Offre une expérience internationale enrichie
 */
export async function getInternationalFountains(): Promise<OSMFountain[]> {
  const allFountains: OSMFountain[] = []
  
  try {
    // Récupérer les fontaines du Maroc (priorité)
    console.log('🇲🇦 Récupération des fontaines du Maroc...')
    const moroccanFountains = await getMoroccanFountains()
    allFountains.push(...moroccanFountains)
    
    // Récupérer les fontaines de France
    console.log('🇫🇷 Récupération des fontaines de France...')
    const frenchFountains = await getFrenchFountains()
    allFountains.push(...frenchFountains)
    
    console.log(`🌍 Total: ${allFountains.length} fontaines internationales (Maroc: ${moroccanFountains.length}, France: ${frenchFountains.length})`)
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération internationale:', error)
  }
  
  return allFountains
}