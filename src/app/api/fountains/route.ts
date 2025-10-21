export const revalidate = 60; // Revalidation toutes les 60 secondes
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getFountainsAroundPoint, getMoroccanFountains, getFrenchFountains, getInternationalFountains, MOROCCO_CITIES } from '@/lib/overpass';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeOSM = searchParams.get('includeOSM') === 'true';
    const includeFrance = searchParams.get('includeFrance') === 'true';
    const international = searchParams.get('international') === 'true';

    // 1. Récupérer les fontaines de la base de données (créées via admin)
    const databaseFountains = await prisma.fountain.findMany();

    // Convertir les fontaines de la base de données au format de l'API
    const dbFountainsFormatted = databaseFountains.map((fountain: {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
      address?: string;
      city?: string;
      description?: string;
      createdAt: Date;
    }) => ({
      id: fountain.id,
      name: fountain.name,
      latitude: fountain.latitude,
      longitude: fountain.longitude,
      address: fountain.address || `${fountain.city || 'Ville non spécifiée'}`,
      description: fountain.description || 'Fontaine créée via administration',
      maintenance: `Créée le: ${new Date(fountain.createdAt).toLocaleDateString('fr-FR')}`
    }))

    // 2. Données des fontaines publiques statiques au Maroc
    const staticFountains = [
      {
        id: 'fountain-1',
        name: 'Fontaine Jemaa el-Fna',
        type: 'fountain',
        latitude: 31.6295,
        longitude: -7.9890,
        address: 'Place Jemaa el-Fna, Marrakech',
        hours: '24h/24',
        status: 'active',
        description: 'Fontaine publique historique au cœur de la médina de Marrakech',
        quality: 'excellente',
        maintenance: 'Dernière maintenance: 15 Oct 2025'
      },
      {
        id: 'fountain-2', 
        name: 'Fontaine Hassan II',
        type: 'fountain',
        latitude: 33.5731,
        longitude: -7.5898,
        address: 'Boulevard Mohammed V, Casablanca',
        hours: '24h/24',
        status: 'active',
        description: 'Fontaine moderne près de la mosquée Hassan II',
        quality: 'bonne',
        maintenance: 'Dernière maintenance: 10 Oct 2025'
      },
      {
        id: 'fountain-3',
        name: 'Fontaine Kasbah des Oudayas',
        type: 'fountain',
        latitude: 34.0263,
        longitude: -6.8326,
        address: 'Kasbah des Oudayas, Rabat',
        hours: '6h-22h',
        status: 'active',
        description: 'Fontaine traditionnelle dans la kasbah historique',
        quality: 'bonne',
        maintenance: 'Dernière maintenance: 12 Oct 2025'
      },
      {
        id: 'public-1',
        name: 'Point d\'eau Municipal Agdal',
        type: 'public',
        latitude: 31.6067,
        longitude: -7.9900,
        address: 'Quartier Agdal, Marrakech',
        hours: '6h-23h',
        status: 'active',
        description: 'Point d\'eau municipal gratuit - Zone résidentielle',
        quality: 'excellente',
        maintenance: 'Dernière maintenance: 14 Oct 2025'
      },
      {
        id: 'fountain-laayoune-1',
        name: 'Fontaine Place Al Massira',
        type: 'fountain',
        latitude: 27.1561,
        longitude: -13.2019,
        address: 'Place Al Massira, Laayoune',
        hours: '24h/24',
        status: 'active',
        description: 'Fontaine publique moderne au centre de Laayoune',
        quality: 'bonne',
        maintenance: 'Dernière maintenance: 16 Oct 2025'
      },
      {
        id: 'fountain-laayoune-2',
        name: 'Point d\'eau Quartier Zakat',
        type: 'public',
        latitude: 27.1734,
        longitude: -13.1887,
        address: 'Quartier Zakat, Laayoune',
        hours: '6h-22h',
        status: 'active',
        description: 'Point d\'eau municipal dans le quartier résidentiel Zakat',
        quality: 'excellente',
        maintenance: 'Dernière maintenance: 15 Oct 2025'
      },
      {
        id: 'fountain-dakhla-1',
        name: 'Fontaine Port de Dakhla',
        type: 'fountain',
        latitude: 23.7181,
        longitude: -15.9573,
        address: 'Avenue du Port, Dakhla',
        hours: '24h/24',
        status: 'active',
        description: 'Fontaine près du port de pêche de Dakhla',
        quality: 'bonne',
        maintenance: 'Dernière maintenance: 16 Oct 2025'
      },
      {
        id: 'fountain-dakhla-2',
        name: 'Point d\'eau Lagune Blanche',
        type: 'public',
        latitude: 23.6850,
        longitude: -15.9400,
        address: 'Route de la Lagune, Dakhla',
        hours: '6h-20h',
        status: 'active',
        description: 'Point d\'eau public près de la célèbre lagune blanche',
        quality: 'excellente',
        maintenance: 'Dernière maintenance: 14 Oct 2025'
      },
      // CASABLANCA - Nouvelles fontaines
      {
        id: 'fountain-casa-corniche',
        name: 'Fontaine Corniche Ain Diab',
        type: 'fountain',
        latitude: 33.5942,
        longitude: -7.6669,
        address: 'Corniche Ain Diab, Casablanca',
        hours: '24h/24',
        status: 'active',
        description: 'Fontaine publique moderne au centre de Casablanca',
        quality: 'excellente',
        maintenance: 'Dernière maintenance: 15 Oct 2025'
      },
      {
        id: 'fountain-marseille-notre-dame',
        name: 'Point d\'eau Notre-Dame de la Garde',
        type: 'public',
        latitude: 43.2842,
        longitude: 5.3714,
        address: 'Basilique Notre-Dame de la Garde, 13004 Marseille',
        hours: '7h-19h',
        status: 'active',
        description: 'Point d\'eau près de la basilique Notre-Dame de la Garde',
        quality: 'excellente',
        maintenance: 'Dernière maintenance: 14 Oct 2025'
      },
      // FRANCE - Fontaines à boire Paris (source: OpenData Paris API)
      {
        id: 'fountain-paris-rigoles',
        name: 'Borne Fontaine Rue des Rigoles',
        type: 'fountain',
        latitude: 48.87378920134511,
        longitude: 2.3896907874285245,
        address: '88F Rue des Rigoles, 75020 Paris',
        hours: '24h/24',
        status: 'active',
        description: 'Borne fontaine Rue des Rigoles',
        quality: 'excellente',
        maintenance: 'Dernière maintenance: 13 Oct 2025'
      },
      {
        id: 'fountain-paris-pantheon',
        name: 'Fontaine Arceau Place du Panthéon',
        type: 'fountain',
        latitude: 48.847017762172186,
        longitude: 2.3453969832890365,
        address: 'Place du Panthéon, 75005 Paris',
        hours: '24h/24',
        status: 'active',
        description: 'Fontaine Arceau face au Panthéon',
        quality: 'excellente',
        maintenance: 'Dernière maintenance: 13 Oct 2025'
      },
      {
        id: 'fountain-paris-quai-marne',
        name: 'Fontaine 2en1 Quai de la Marne',
        type: 'fountain',
        latitude: 48.891446952575826,
        longitude: 2.3863813550889987,
        address: 'Quai de la Marne, 75019 Paris',
        hours: '24h/24',
        status: 'active',
        description: 'Fontaine Mât source près du Canal de l\'Ourcq',
        quality: 'excellente',
        maintenance: 'Dernière maintenance: 10 Oct 2025'
      },
    ];

    // 3. Récupérer les fontaines OSM autour du point donné (si fourni)
    let osmFountains = [];
    if (includeOSM) {
      const { searchParams } = new URL(request.url);
      const latitude = parseFloat(searchParams.get('latitude') || '');
      const longitude = parseFloat(searchParams.get('longitude') || '');
      const radius = parseInt(searchParams.get('radius') || '500');

      if (!isNaN(latitude) && !isNaN(longitude)) {
        // Récupérer les fontaines OSM autour du point
        osmFountains = await getFountainsAroundPoint(latitude, longitude, radius);
      }
    }

    // 4. Récupérer les fontaines marocaines (OSM) si demandé
    let marocFountains = [];
    if (international) {
      marocFountains = await getMoroccanFountains();
    }

    // 5. Récupérer les fontaines françaises (OSM) si demandé
    let franceFountains = [];
    if (includeFrance) {
      franceFountains = await getFrenchFountains();
    }

    // 6. Fusionner toutes les fontaines
    const allFountains = [
      ...dbFountainsFormatted,
      ...staticFountains,
      ...osmFountains,
      ...marocFountains,
      ...franceFountains
    ];

    return NextResponse.json({ fountains: allFountains });
  } catch (error) {
    console.error('Error fetching fountains:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des fontaines.' }, { status: 500 });
  }
}