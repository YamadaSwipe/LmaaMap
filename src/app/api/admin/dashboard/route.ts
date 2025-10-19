import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Simulation de données réelles - à remplacer par des vraies requêtes Prisma
    const stats = {
      users: {
        total: 156,
        active: 142,
        new_this_week: 12,
        pending: 3,
        suspended: 1
      },
      partners: {
        total: 23,
        active: 21,
        pending: 2,
        suspended: 0
      },
      fountains: {
        total: 89,
        active: 84,
        maintenance: 5,
        inactive: 0
      },
      scans: {
        total: 2847,
        today: 47,
        weekly_growth: 15.3,
        avg_daily: 95
      },
      recent_activities: [
        {
          id: 1,
          type: 'qr_scan',
          description: 'Nouveau scan QR - Fontaine #12',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          user: 'user_123'
        },
        {
          id: 2,
          type: 'new_user',
          description: 'Nouvel utilisateur inscrit: Marie Dubois',
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          user: 'user_157'
        },
        {
          id: 3,
          type: 'maintenance',
          description: 'Fontaine #7 signalée en maintenance',
          timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
          user: 'partner_5'
        },
        {
          id: 4,
          type: 'new_partner',
          description: 'Nouveau partenaire: Café Central',
          timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
          user: 'partner_24'
        },
        {
          id: 5,
          type: 'qr_scan',
          description: 'Multiple scans - Fontaine #3 (Zone Centre)',
          timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
          user: 'multiple'
        }
      ],
      alerts: {
        pending_approvals: 2,
        maintenance_alerts: 5,
        low_water_pressure: 1,
        offline_fountains: 0
      },
      performance: {
        uptime: 99.8,
        response_time: 245,
        error_rate: 0.1
      }
    }

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Erreur API dashboard:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors du chargement des statistiques' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    if (action === 'refresh') {
      // Trigger a refresh of all statistics
      return NextResponse.json({
        success: true,
        message: 'Statistiques rafraîchies'
      })
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Action non supportée' 
      },
      { status: 400 }
    )

  } catch (error) {
    console.error('Erreur API dashboard POST:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur serveur' 
      },
      { status: 500 }
    )
  }
}