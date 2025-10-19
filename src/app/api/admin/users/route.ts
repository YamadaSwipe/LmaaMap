import { NextRequest, NextResponse } from 'next/server'

// API pour récupérer les informations détaillées des utilisateurs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    // En mode développement, retourner des données simulées
    const mockUsers = [
      {
        id: 'user_1',
        email: 'mohammed.alami@gmail.com',
        firstName: 'Mohammed',
        lastName: 'Alami',
        phone: '+212 6XX XXX XXX',
        city: 'Casablanca',
        country: 'MA',
        credits: 15.50,
        totalSpent: 84.30,
        totalUsage: 281,
        joinDate: '2025-01-15T10:00:00Z',
        lastActivity: '2025-01-17T14:30:00Z',
        status: 'active',
        favoriteLocation: 'Anfa Place',
        monthlyUsage: 23,
        averagePerSession: 0.30,
        recharges: [
          { date: '2025-01-15T10:00:00Z', amount: 50.00, method: 'stripe' },
          { date: '2025-01-10T15:30:00Z', amount: 20.00, method: 'stripe' }
        ],
        usageHistory: [
          { date: '2025-01-17T14:30:00Z', location: 'Anfa Place', amount: 0.30 },
          { date: '2025-01-17T09:15:00Z', location: 'Mall of Morocco', amount: 0.25 },
          { date: '2025-01-16T16:45:00Z', location: 'Anfa Place', amount: 0.30 }
        ]
      },
      {
        id: 'user_2',
        email: 'fatima.benali@hotmail.com',
        firstName: 'Fatima',
        lastName: 'Benali',
        phone: '+212 6XX XXX XXX',
        city: 'Rabat',
        country: 'MA',
        credits: 8.75,
        totalSpent: 156.90,
        totalUsage: 627,
        joinDate: '2024-12-20T08:00:00Z',
        lastActivity: '2025-01-17T11:20:00Z',
        status: 'active',
        favoriteLocation: 'Mall of Morocco',
        monthlyUsage: 54,
        averagePerSession: 0.25,
        recharges: [
          { date: '2025-01-12T14:00:00Z', amount: 30.00, method: 'stripe' },
          { date: '2025-01-05T10:15:00Z', amount: 50.00, method: 'stripe' },
          { date: '2024-12-28T16:30:00Z', amount: 100.00, method: 'stripe' }
        ],
        usageHistory: [
          { date: '2025-01-17T11:20:00Z', location: 'Mall of Morocco', amount: 0.25 },
          { date: '2025-01-16T13:10:00Z', location: 'Mall of Morocco', amount: 0.25 },
          { date: '2025-01-15T18:30:00Z', location: 'Marina Mall', amount: 0.30 }
        ]
      },
      {
        id: 'user_3',
        email: 'youssef.tahiri@gmail.com',
        firstName: 'Youssef',
        lastName: 'Tahiri',
        phone: '+212 6XX XXX XXX',
        city: 'Marrakech',
        country: 'MA',
        credits: 2.20,
        totalSpent: 67.50,
        totalUsage: 225,
        joinDate: '2025-01-08T12:00:00Z',
        lastActivity: '2025-01-16T19:45:00Z',
        status: 'active',
        favoriteLocation: 'Marina Mall',
        monthlyUsage: 18,
        averagePerSession: 0.30,
        recharges: [
          { date: '2025-01-14T09:00:00Z', amount: 20.00, method: 'stripe' },
          { date: '2025-01-08T12:30:00Z', amount: 50.00, method: 'stripe' }
        ],
        usageHistory: [
          { date: '2025-01-16T19:45:00Z', location: 'Marina Mall', amount: 0.30 },
          { date: '2025-01-15T12:20:00Z', location: 'Marina Mall', amount: 0.30 },
          { date: '2025-01-14T17:15:00Z', location: 'Anfa Place', amount: 0.30 }
        ]
      },
      {
        id: 'user_4',
        email: 'sarah.lahlou@outlook.com',
        firstName: 'Sarah',
        lastName: 'Lahlou',
        phone: '+212 6XX XXX XXX',
        city: 'Casablanca',
        country: 'MA',
        credits: 42.80,
        totalSpent: 23.70,
        totalUsage: 79,
        joinDate: '2025-01-12T14:30:00Z',
        lastActivity: '2025-01-17T08:15:00Z',
        status: 'active',
        favoriteLocation: 'Anfa Place',
        monthlyUsage: 12,
        averagePerSession: 0.30,
        recharges: [
          { date: '2025-01-12T14:45:00Z', amount: 50.00, method: 'stripe' },
          { date: '2025-01-15T11:00:00Z', amount: 20.00, method: 'stripe' }
        ],
        usageHistory: [
          { date: '2025-01-17T08:15:00Z', location: 'Anfa Place', amount: 0.30 },
          { date: '2025-01-16T14:30:00Z', location: 'Anfa Place', amount: 0.30 },
          { date: '2025-01-15T16:45:00Z', location: 'Mall of Morocco', amount: 0.25 }
        ]
      },
      {
        id: 'user_5',
        email: 'ahmed.bennani@gmail.com',
        firstName: 'Ahmed',
        lastName: 'Bennani',
        phone: '+212 6XX XXX XXX',
        city: 'Tanger',
        country: 'MA',
        credits: 0.50,
        totalSpent: 94.25,
        totalUsage: 377,
        joinDate: '2024-12-15T09:00:00Z',
        lastActivity: '2025-01-17T12:00:00Z',
        status: 'low_balance',
        favoriteLocation: 'Mall of Morocco',
        monthlyUsage: 31,
        averagePerSession: 0.25,
        recharges: [
          { date: '2025-01-03T16:20:00Z', amount: 30.00, method: 'stripe' },
          { date: '2024-12-28T10:45:00Z', amount: 50.00, method: 'stripe' },
          { date: '2024-12-15T09:30:00Z', amount: 20.00, method: 'stripe' }
        ],
        usageHistory: [
          { date: '2025-01-17T12:00:00Z', location: 'Mall of Morocco', amount: 0.25 },
          { date: '2025-01-16T15:30:00Z', location: 'Mall of Morocco', amount: 0.25 },
          { date: '2025-01-15T20:15:00Z', location: 'Marina Mall', amount: 0.30 }
        ]
      }
    ]

    // Filtrer par recherche si nécessaire
    const filteredUsers = search 
      ? mockUsers.filter(user => 
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase())
        )
      : mockUsers

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    // Statistiques globales
    const totalUsers = mockUsers.length
    const totalRevenue = mockUsers.reduce((sum, user) => sum + user.totalSpent, 0)
    const totalCreditsInCirculation = mockUsers.reduce((sum, user) => sum + user.credits, 0)
    const averageUserSpending = totalRevenue / totalUsers
    const activeUsers = mockUsers.filter(user => user.status === 'active').length
    const lowBalanceUsers = mockUsers.filter(user => user.status === 'low_balance').length

    return NextResponse.json({
      success: true,
      users: paginatedUsers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalUsers: filteredUsers.length,
        hasNextPage: endIndex < filteredUsers.length,
        hasPrevPage: page > 1
      },
      stats: {
        totalUsers,
        totalRevenue,
        totalCreditsInCirculation,
        averageUserSpending,
        activeUsers,
        lowBalanceUsers,
        retentionRate: (activeUsers / totalUsers * 100).toFixed(1) + '%'
      }
    })

  } catch (error) {
    console.error('Erreur récupération utilisateurs:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
