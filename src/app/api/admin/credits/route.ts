import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'ID utilisateur requis' },
        { status: 400 }
      )
    }

    // Récupérer l'utilisateur avec son solde
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        credits: true,
        createdAt: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Récupérer l'historique des transactions
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    })

    // Statistiques
    const stats = await prisma.transaction.groupBy({
      by: ['type'],
      where: { userId },
      _sum: { amount: true },
      _count: true
    })

    return NextResponse.json({
      success: true,
      data: {
        user,
        transactions,
        statistics: stats.reduce((acc, stat) => {
          acc[stat.type] = {
            count: stat._count,
            total: stat._sum.amount || 0
          }
          return acc
        }, {} as Record<string, { count: number; total: number }>)
      }
    })

  } catch (error) {
    console.error('Erreur API credits GET:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, amount, type, description, adminId } = await request.json()

    if (!userId || !amount || !type) {
      return NextResponse.json(
        { success: false, error: 'Données manquantes: userId, amount, type requis' },
        { status: 400 }
      )
    }

    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Pour les débits, vérifier qu'il y a assez de crédits
    if (amount < 0 && user.credits < Math.abs(amount)) {
      return NextResponse.json(
        { success: false, error: 'Crédits insuffisants' },
        { status: 400 }
      )
    }

    // Effectuer la transaction
    const result = await prisma.$transaction(async (tx) => {
      // Mettre à jour le solde
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { 
          credits: { 
            increment: amount 
          } 
        }
      })

      // Créer l'enregistrement de transaction
      const transaction = await tx.transaction.create({
        data: {
          userId,
          type,
          amount,
          description: description || `${type}: ${amount > 0 ? '+' : ''}${amount} crédits`
        }
      })

      return { updatedUser, transaction }
    })

    return NextResponse.json({
      success: true,
      message: 'Transaction effectuée avec succès',
      data: {
        user: {
          id: result.updatedUser.id,
          name: result.updatedUser.name,
          credits: result.updatedUser.credits
        },
        transaction: result.transaction
      }
    })

  } catch (error) {
    console.error('Erreur API credits POST:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, newBalance, reason, adminId } = await request.json()

    if (!userId || newBalance === undefined) {
      return NextResponse.json(
        { success: false, error: 'userId et newBalance requis' },
        { status: 400 }
      )
    }

    // Vérifier l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    const difference = newBalance - user.credits

    // Effectuer l'ajustement
    const result = await prisma.$transaction(async (tx) => {
      // Mettre à jour le solde
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { credits: newBalance }
      })

      // Créer l'enregistrement de transaction
      const transaction = await tx.transaction.create({
        data: {
          userId,
          type: difference > 0 ? 'ADMIN_ADD' : 'ADMIN_REMOVE',
          amount: difference,
          description: reason || `Ajustement admin: solde modifié de ${user.credits} à ${newBalance}`
        }
      })

      return { updatedUser, transaction }
    })

    return NextResponse.json({
      success: true,
      message: 'Solde ajusté avec succès',
      data: {
        user: {
          id: result.updatedUser.id,
          name: result.updatedUser.name,
          previousBalance: user.credits,
          newBalance: result.updatedUser.credits,
          adjustment: difference
        },
        transaction: result.transaction
      }
    })

  } catch (error) {
    console.error('Erreur API credits PUT:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}