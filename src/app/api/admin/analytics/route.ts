import { NextRequest, NextResponse } from 'next/server'
export const revalidate = 60; // Revalidation toutes les 60 secondes
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '7'
    const days = parseInt(timeRange)

    // Calculer les dates
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000))

    // Statistiques générales
    const totalUsers = await prisma.user.count()
    const totalFountains = await prisma.fountain.count()

    // Compter les partenaires (utilisateurs avec role PARTNER)
    const totalPartners = await prisma.user.count({
      where: {
        role: 'PARTNER'
      }
    })

    // Utilisateurs actifs (ceux créés récemment)
    const activeUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // Nouveaux utilisateurs par jour
    const userGrowthData = []
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000))
      const nextDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000))
      
      const newUsersCount = await prisma.user.count({
        where: {
          createdAt: {
            gte: currentDate,
            lt: nextDate
          }
        }
      })

      const totalUsersUpToDate = await prisma.user.count({
        where: {
          createdAt: {
            lt: nextDate
          }
        }
      })

      userGrowthData.push({
        date: currentDate.toISOString().split('T')[0],
        users: totalUsersUpToDate,
        newUsers: newUsersCount
      })
    }

    // Activité des scans simulée (à remplacer par vraies données)
    const scansActivity = []
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000))
      scansActivity.push({
        date: currentDate.toISOString().split('T')[0],
        scans: Math.floor(Math.random() * 200) + 150,
        fountains: totalFountains
      })
    }

    // Top fontaines (simulé)
    const topFountains = [
      { name: 'Fontaine Centrale', scans: 1250, location: 'Centre-ville' },
      { name: 'Parc Municipal', scans: 980, location: 'Parc' },
      { name: 'Gare SNCF', scans: 756, location: 'Transport' },
      { name: 'Campus Université', scans: 642, location: 'Éducation' },
      { name: 'Marché Central', scans: 534, location: 'Commerce' }
    ]

    // Types d'utilisateurs
    const regularUsersCount = totalUsers - totalPartners
    const userTypes = [
      { 
        name: 'Consommateurs', 
        value: regularUsersCount, 
        color: '#3B82F6' 
      },
      { 
        name: 'Partenaires', 
        value: totalPartners, 
        color: '#10B981' 
      },
      { 
        name: 'Administrateurs', 
        value: 3, // Nombre fixe d'admins
        color: '#F59E0B' 
      }
    ]

    // Statistiques de la semaine
    const weeklyStats = {
      totalScans: 4230, // Simulé
      activeUsers: activeUsers,
      newFountains: totalFountains,
      avgScanPerUser: totalUsers > 0 ? (4230 / totalUsers).toFixed(1) : 0
    }

    return NextResponse.json({
      success: true,
      data: {
        userGrowth: userGrowthData,
        scansActivity: scansActivity,
        topFountains: topFountains,
        userTypes: userTypes,
        weeklyStats: weeklyStats,
        summary: {
          totalUsers,
          totalPartners,
          totalFountains,
          activeUsers
        }
      }
    })

  } catch (error) {
    console.error('Erreur API analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des analytics' },
      { status: 500 }
    )
  }
}