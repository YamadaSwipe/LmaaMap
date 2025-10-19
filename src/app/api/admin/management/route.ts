import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const entity = searchParams.get('entity')
    const action = searchParams.get('action')

    if (action === 'stats') {
      // Récupérer les vraies statistiques depuis la base
      const userCount = await prisma.user.count()
      const partnerCount = await prisma.partner.count()
      
      return NextResponse.json({
        success: true,
        stats: {
          users: {
            total: userCount,
            active: userCount,
            pending: 0,
            suspended: 0
          },
          partners: {
            total: partnerCount,
            active: partnerCount,
            pending: 0,
            suspended: 0
          },
          fountains: {
            total: 0,
            active: 0,
            maintenance: 0,
            inactive: 0
          },
          activity: {
            totalScans: 0,
            todayScans: 0,
            weeklyGrowth: 0,
            avgDailyScans: 0
          },
          recent: {
            newUsers: 0,
            newPartners: 0,
            maintenanceAlerts: 0,
            pendingApprovals: 0
          }
        }
      })
    }

    if (entity === 'users') {
      // Récupérer les vrais utilisateurs
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50 // Limiter à 50 utilisateurs pour la performance
      })

      const formattedUsers = users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name || 'Utilisateur sans nom',
        type: user.role === 'ADMIN' ? 'admin' : (user.role === 'PARTNER' ? 'partner' : 'consumer'),
        status: 'active',
        createdAt: user.createdAt.toISOString(),
        lastLogin: user.updatedAt.toISOString(),
        totalScans: 0
      }))

      return NextResponse.json({
        success: true,
        data: formattedUsers,
        total: formattedUsers.length
      })
    }

    if (entity === 'partners') {
      // Récupérer les vrais partenaires
      const partners = await prisma.partner.findMany({
        orderBy: { createdAt: 'desc' }
      })

      const formattedPartners = partners.map(partner => ({
        id: partner.id,
        name: partner.name,
        email: partner.email,
        phone: partner.phone || 'Non renseigné',
        address: partner.address || 'Non renseigné',
        type: partner.type || 'other',
        status: 'active',
        latitude: 0,
        longitude: 0,
        verificationStatus: 'verified',
        createdAt: partner.createdAt.toISOString()
      }))

      return NextResponse.json({
        success: true,
        data: formattedPartners,
        total: formattedPartners.length
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Action non supportée'
    }, { status: 400 })

  } catch (error) {
    console.error('Erreur API admin:', error)
    return NextResponse.json({
      success: false,
      error: 'Erreur serveur'
    }, { status: 500 })
  }
}