import { NextRequest, NextResponse } from 'next/server'
export const revalidate = 60; // Revalidation toutes les 60 secondes

// API pour récupérer les statistiques financières des fontaines
export async function GET(request: NextRequest) {
  try {
    // En mode développement, retourner des données simulées
    const mockFountainStats = [
      {
        id: 'fountain_1',
        name: 'Fontaine Anfa Place',
        location: 'Casablanca, Anfa',
        totalRevenue: 1247.50,
        totalUsage: 4158,
        averagePerUse: 0.30,
        dailyAverage: 89.50,
        monthlyTrend: 12.5, // pourcentage d'augmentation
        topUsers: [
          { email: 'user1@example.com', usage: 45, spent: 13.50 },
          { email: 'user2@example.com', usage: 38, spent: 11.40 },
          { email: 'user3@example.com', usage: 32, spent: 9.60 }
        ],
        dailyStats: [
          { date: '2025-01-10', revenue: 78.30, usage: 261 },
          { date: '2025-01-11', revenue: 84.60, usage: 282 },
          { date: '2025-01-12', revenue: 91.20, usage: 304 },
          { date: '2025-01-13', revenue: 87.90, usage: 293 },
          { date: '2025-01-14', revenue: 93.15, usage: 311 },
          { date: '2025-01-15', revenue: 96.45, usage: 321 },
          { date: '2025-01-16', revenue: 89.70, usage: 299 }
        ]
      },
      {
        id: 'fountain_2',
        name: 'Fontaine Mall of Morocco',
        location: 'Rabat, Souissi',
        totalRevenue: 2156.80,
        totalUsage: 8627,
        averagePerUse: 0.25,
        dailyAverage: 154.77,
        monthlyTrend: 18.3,
        topUsers: [
          { email: 'user4@example.com', usage: 67, spent: 16.75 },
          { email: 'user5@example.com', usage: 54, spent: 13.50 },
          { email: 'user6@example.com', usage: 49, spent: 12.25 }
        ],
        dailyStats: [
          { date: '2025-01-10', revenue: 142.50, usage: 570 },
          { date: '2025-01-11', revenue: 156.25, usage: 625 },
          { date: '2025-01-12', revenue: 148.75, usage: 595 },
          { date: '2025-01-13', revenue: 163.50, usage: 654 },
          { date: '2025-01-14', revenue: 159.25, usage: 637 },
          { date: '2025-01-15', revenue: 171.00, usage: 684 },
          { date: '2025-01-16', revenue: 167.75, usage: 671 }
        ]
      },
      {
        id: 'fountain_3',
        name: 'Fontaine Marina Mall',
        location: 'Casablanca, Marina',
        totalRevenue: 892.40,
        totalUsage: 2974,
        averagePerUse: 0.30,
        dailyAverage: 64.15,
        monthlyTrend: -3.2, // en baisse
        topUsers: [
          { email: 'user7@example.com', usage: 28, spent: 8.40 },
          { email: 'user8@example.com', usage: 25, spent: 7.50 },
          { email: 'user9@example.com', usage: 22, spent: 6.60 }
        ],
        dailyStats: [
          { date: '2025-01-10', revenue: 58.20, usage: 194 },
          { date: '2025-01-11', revenue: 62.10, usage: 207 },
          { date: '2025-01-12', revenue: 67.80, usage: 226 },
          { date: '2025-01-13', revenue: 64.50, usage: 215 },
          { date: '2025-01-14', revenue: 69.30, usage: 231 },
          { date: '2025-01-15', revenue: 71.40, usage: 238 },
          { date: '2025-01-16', revenue: 66.90, usage: 223 }
        ]
      }
    ]

    return NextResponse.json({ 
      success: true, 
      fountains: mockFountainStats,
      totalRevenue: mockFountainStats.reduce((sum, f) => sum + f.totalRevenue, 0),
      totalUsage: mockFountainStats.reduce((sum, f) => sum + f.totalUsage, 0),
      averageRevenue: mockFountainStats.reduce((sum, f) => sum + f.totalRevenue, 0) / mockFountainStats.length
    })

  } catch (error) {
    console.error('Erreur récupération stats fontaines:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}