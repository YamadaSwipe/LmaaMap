import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Types pour les entités
interface User {
  id: string
  email: string
  name: string
  type: 'consumer' | 'partner' | 'admin'
  status: 'active' | 'suspended' | 'pending'
  createdAt: string
  lastLogin?: string
  totalScans?: number
}

interface Partner {
  id: string
  name: string
  email: string
  phone: string
  address: string
  type: 'hotel' | 'restaurant' | 'cafe' | 'other'
  status: 'active' | 'suspended' | 'pending'
  latitude: number
  longitude: number
  verificationStatus: 'verified' | 'pending' | 'rejected'
  createdAt: string
}

interface Fountain {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  type: 'public' | 'fountain'
  status: 'active' | 'maintenance' | 'closed'
  quality: 'excellent' | 'good' | 'fair'
  lastMaintenance: string
  reportedBy: string
  verified: boolean
}

// Données de démonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'ahmed@gmail.com',
    name: 'Ahmed Benali',
    type: 'consumer',
    status: 'active',
    createdAt: '2025-10-01',
    lastLogin: '2025-10-15',
    totalScans: 45
  },
  {
    id: '2', 
    email: 'fatima@hotmail.com',
    name: 'Fatima Zahra',
    type: 'consumer',
    status: 'active',
    createdAt: '2025-09-15',
    lastLogin: '2025-10-14',
    totalScans: 23
  },
  {
    id: '3',
    email: 'contact@riadatlas.ma',
    name: 'Riad Atlas Manager',
    type: 'partner',
    status: 'pending',
    createdAt: '2025-10-10',
    totalScans: 0
  }
]

const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Riad Atlas',
    email: 'contact@riadatlas.ma',
    phone: '+212 524 123456',
    address: 'Rue Riad Zitoun, Marrakech',
    type: 'hotel',
    status: 'active',
    latitude: 31.6275,
    longitude: -7.9885,
    verificationStatus: 'verified',
    createdAt: '2025-09-20'
  },
  {
    id: '2',
    name: 'Café de la Paix',
    email: 'info@cafedelapaix.ma',
    phone: '+212 537 654321',
    address: 'Avenue Mohammed V, Rabat',
    type: 'cafe',
    status: 'pending',
    latitude: 34.0209,
    longitude: -6.8416,
    verificationStatus: 'pending',
    createdAt: '2025-10-05'
  }
]

const mockFountains: Fountain[] = [
  {
    id: '1',
    name: 'Fontaine Jemaa el-Fna',
    address: 'Place Jemaa el-Fna, Marrakech',
    latitude: 31.6295,
    longitude: -7.9890,
    type: 'fountain',
    status: 'active',
    quality: 'excellent',
    lastMaintenance: '2025-10-01',
    reportedBy: 'ahmed@gmail.com',
    verified: true
  },
  {
    id: '2',
    name: 'Point deau Municipal Agdal',
    address: 'Quartier Agdal, Marrakech',
    latitude: 31.6067,
    longitude: -7.9900,
    type: 'public',
    status: 'maintenance',
    quality: 'good',
    lastMaintenance: '2025-09-15',
    reportedBy: 'fatima@hotmail.com',
    verified: false
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const entity = searchParams.get('entity') // 'users' | 'partners' | 'fountains'
  
  try {
    switch (entity) {
      case 'users':
        // Récupérer les vraies données des utilisateurs depuis la base
        const users = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            city: true,
            country: true,
            phone: true,
            engagement: true,
            credits: true,
            createdAt: true,
            updatedAt: true
          },
          orderBy: { createdAt: 'desc' }
        })
        
        // Transformer les données pour correspondre à l'interface User
        const transformedUsers = users.map(user => ({
          id: user.id,
          email: user.email,
          name: user.name || 'Nom non défini',
          type: user.role === 'ADMIN' ? 'admin' : (user.role === 'PARTNER' ? 'partner' : 'consumer'),
          status: 'active', // Tous les utilisateurs créés sont actifs par défaut
          createdAt: new Date(user.createdAt).toISOString(),
          lastLogin: undefined, // Pas encore implémenté
          totalScans: 0, // À calculer si nécessaire
          city: user.city,
          country: user.country,
          phone: user.phone,
          engagement: user.engagement,
          credits: user.credits
        }))
        
        return NextResponse.json({
          success: true,
          data: transformedUsers,
          total: transformedUsers.length,
          stats: {
            active: transformedUsers.filter(u => u.status === 'active').length,
            suspended: transformedUsers.filter(u => u.status === 'suspended').length,
            pending: transformedUsers.filter(u => u.status === 'pending').length
          }
        })
        
      case 'partners':
        // Récupérer les vraies données des partenaires depuis la base
        const partners = await prisma.partner.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            city: true,
            website: true,
            description: true,
            type: true,
            employees: true,
            commitment: true,
            createdAt: true,
            updatedAt: true
          },
          orderBy: { createdAt: 'desc' }
        })
        
        // Transformer les données pour correspondre à l'interface Partner
        const transformedPartners = partners.map(partner => ({
          id: partner.id,
          name: partner.name,
          email: partner.email,
          phone: partner.phone || 'Non renseigné',
          address: partner.address || 'Non renseignée',
          type: partner.type?.toLowerCase() || 'other',
          status: 'active', // Tous les partenaires créés sont actifs par défaut
          latitude: 0, // À remplir si coordonnées disponibles
          longitude: 0, // À remplir si coordonnées disponibles
          verificationStatus: 'pending', // Par défaut en attente de vérification
          createdAt: new Date(partner.createdAt).toISOString(),
          city: partner.city,
          website: partner.website,
          description: partner.description,
          employees: partner.employees,
          commitment: partner.commitment
        }))
        
        return NextResponse.json({
          success: true,
          data: transformedPartners,
          total: transformedPartners.length,
          stats: {
            active: transformedPartners.filter(p => p.status === 'active').length,
            pending: transformedPartners.filter(p => p.status === 'pending').length,
            suspended: transformedPartners.filter(p => p.status === 'suspended').length
          }
        })
        
      case 'fountains':
        return NextResponse.json({
          success: true,
          data: mockFountains,
          total: mockFountains.length,
          stats: {
            active: mockFountains.filter(f => f.status === 'active').length,
            maintenance: mockFountains.filter(f => f.status === 'maintenance').length,
            closed: mockFountains.filter(f => f.status === 'closed').length
          }
        })
        
      default:
        // Dashboard global stats
        return NextResponse.json({
          success: true,
          data: {
            users: {
              total: mockUsers.length,
              active: mockUsers.filter(u => u.status === 'active').length,
              newThisMonth: 2
            },
            partners: {
              total: mockPartners.length,
              active: mockPartners.filter(p => p.status === 'active').length,
              pending: mockPartners.filter(p => p.status === 'pending').length
            },
            fountains: {
              total: mockFountains.length,
              active: mockFountains.filter(f => f.status === 'active').length,
              needsMaintenance: mockFountains.filter(f => f.status === 'maintenance').length
            },
            activity: {
              totalScans: mockUsers.reduce((sum, u) => sum + (u.totalScans || 0), 0),
              scansToday: 12,
              scansThisWeek: 89
            }
          }
        })
    }
  } catch (error) {
    console.error('Erreur API admin:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, entity, id, data } = body
    
    console.log(`Action admin: ${action} sur ${entity} ${id}`)
    
    // Simulation des actions CRUD
    switch (action) {
      case 'approve':
        return NextResponse.json({
          success: true,
          message: `${entity} ${id} approuvé avec succès`
        })
        
      case 'suspend':
        return NextResponse.json({
          success: true,
          message: `${entity} ${id} suspendu avec succès`
        })
        
      case 'delete':
        return NextResponse.json({
          success: true,
          message: `${entity} ${id} supprimé avec succès`
        })
        
      case 'update':
        return NextResponse.json({
          success: true,
          message: `${entity} ${id} mis à jour avec succès`,
          data
        })
        
      default:
        return NextResponse.json(
          { error: 'Action non reconnue' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Erreur action admin:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la action' },
      { status: 500 }
    )
  }
}