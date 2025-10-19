import { NextRequest, NextResponse } from 'next/server'

interface FountainData {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  city: string
  isActive: boolean
  description: string
  qrCode: string
  scanCount: number
  lastScanned?: Date
}

// Données simulées des fontaines
const mockFountains: Record<string, FountainData> = {
  'fountain-001': {
    id: 'fountain-001',
    name: 'Fontaine Centrale',
    latitude: 48.8566,
    longitude: 2.3522,
    address: 'Place de la République',
    city: 'Paris 3e',
    isActive: true,
    description: 'Fontaine publique moderne avec système de filtration avancé',
    qrCode: 'qr-001',
    scanCount: 156,
    lastScanned: new Date('2024-01-25T14:30:00')
  },
  'fountain-002': {
    id: 'fountain-002',
    name: 'Fontaine Parc Municipal',
    latitude: 48.8606,
    longitude: 2.3376,
    address: 'Parc Municipal, 15 Avenue du Parc',
    city: 'Paris 11e',
    isActive: true,
    description: 'Fontaine écologique alimentée par énergie solaire',
    qrCode: 'qr-002',
    scanCount: 89,
    lastScanned: new Date('2024-01-24T16:45:00')
  },
  'fountain-003': {
    id: 'fountain-003',
    name: 'Restaurant Central - Point d\'eau',
    latitude: 48.8584,
    longitude: 2.3488,
    address: 'Restaurant Central, 15 Rue de Rivoli',
    city: 'Paris 1er',
    isActive: true,
    description: 'Point d\'eau partenaire disponible aux heures d\'ouverture',
    qrCode: 'qr-003',
    scanCount: 234,
    lastScanned: new Date('2024-01-25T12:15:00')
  },
  'fountain-004': {
    id: 'fountain-004',
    name: 'Fontaine Gare du Nord',
    latitude: 48.8796,
    longitude: 2.3544,
    address: 'Gare du Nord',
    city: 'Paris 10e',
    isActive: false,
    description: 'Fontaine temporairement hors service pour maintenance',
    qrCode: 'qr-004',
    scanCount: 45,
    lastScanned: new Date('2023-12-28T09:20:00')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { qrCode, fountainId, userLocation, userAgent } = body

    // Validation des données
    if (!qrCode && !fountainId) {
      return NextResponse.json(
        { error: 'QR code ou fountainId requis' },
        { status: 400 }
      )
    }

    // Obtenir l'adresse IP du client
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Trouver la fontaine par ID ou par QR code
    let fountain: FountainData | null = null
    
    if (fountainId) {
      fountain = mockFountains[fountainId] || null
    } else if (qrCode) {
      // Extraire l'ID du QR code
      const qrId = qrCode.split('/').pop()
      if (qrId) {
        const fountainId = qrId.replace('qr-', 'fountain-')
        fountain = mockFountains[fountainId] || null
      }
    }

    if (!fountain) {
      return NextResponse.json(
        { error: 'Fontaine non trouvée' },
        { status: 404 }
      )
    }

    // Vérifier si la fontaine est active
    if (!fountain.isActive) {
      return NextResponse.json(
        { error: 'Fontaine temporairement hors service' },
        { status: 423 }
      )
    }

    // Simuler l'enregistrement du scan
    const scanId = `scan-${Date.now()}`
    const scannedAt = new Date()

    // Incrémenter le compteur de scans (simulation)
    fountain.scanCount += 1
    fountain.lastScanned = scannedAt

    // Log du scan (simulation)
    console.log('Nouveau scan enregistré:', {
      scanId,
      fountainId: fountain.id,
      qrCode,
      scannedAt,
      ipAddress: ip,
      userAgent: userAgent || request.headers.get('user-agent'),
      userLocation
    })

    // Retourner les informations de la fontaine
    return NextResponse.json({
      success: true,
      scan: {
        id: scanId,
        scannedAt
      },
      fountain: {
        id: fountain.id,
        name: fountain.name,
        latitude: fountain.latitude,
        longitude: fountain.longitude,
        coordinates: {
          latitude: fountain.latitude,
          longitude: fountain.longitude
        },
        location: `${fountain.address}, ${fountain.city}`,
        address: fountain.address,
        city: fountain.city,
        isActive: fountain.isActive,
        description: fountain.description,
        qrCode: fountain.qrCode,
        scanCount: fountain.scanCount,
        lastScanned: fountain.lastScanned,
        features: fountain.id === 'fountain-001' 
          ? ['Eau filtrée', 'Accès PMR', 'Éclairage LED', 'Système anti-gel']
          : fountain.id === 'fountain-002'
          ? ['Énergie solaire', 'Eau de source', 'Design écologique']
          : ['Partenaire LmaaMap', 'Eau fraîche', 'Service gratuit'],
        averageRating: Math.random() * 2 + 3.5, // Note entre 3.5 et 5.5
        lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Dernière maintenance dans les 30 derniers jours
      }
    })

  } catch (error) {
    console.error('Erreur lors du scan QR:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const qrCode = searchParams.get('qr')
    const fountainId = searchParams.get('fountainId')

    if (!qrCode && !fountainId) {
      return NextResponse.json(
        { error: 'QR code ou fountainId requis' },
        { status: 400 }
      )
    }

    // Trouver la fontaine
    let fountain: FountainData | null = null
    
    if (fountainId) {
      fountain = mockFountains[fountainId] || null
    } else if (qrCode) {
      const qrId = qrCode.split('/').pop()
      if (qrId) {
        const fountainId = qrId.replace('qr-', 'fountain-')
        fountain = mockFountains[fountainId] || null
      }
    }

    if (!fountain) {
      return NextResponse.json(
        { error: 'Fontaine non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      fountain: {
        id: fountain.id,
        name: fountain.name,
        latitude: fountain.latitude,
        longitude: fountain.longitude,
        coordinates: {
          latitude: fountain.latitude,
          longitude: fountain.longitude
        },
        location: `${fountain.address}, ${fountain.city}`,
        address: fountain.address,
        city: fountain.city,
        isActive: fountain.isActive,
        description: fountain.description,
        qrCode: fountain.qrCode,
        scanCount: fountain.scanCount,
        lastScanned: fountain.lastScanned,
        features: fountain.id === 'fountain-001' 
          ? ['Eau filtrée', 'Accès PMR', 'Éclairage LED', 'Système anti-gel']
          : fountain.id === 'fountain-002'
          ? ['Énergie solaire', 'Eau de source', 'Design écologique']
          : ['Partenaire LmaaMap', 'Eau fraîche', 'Service gratuit'],
        averageRating: Math.random() * 2 + 3.5,
        lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      },
      stats: {
        totalScans: fountain.scanCount,
        recentScans: []
      }
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des données QR:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
