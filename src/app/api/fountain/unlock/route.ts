import { NextRequest, NextResponse } from 'next/server'
export const revalidate = 60; // Revalidation toutes les 60 secondes
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const { fountainId, userId, qrCode } = await request.json()

    if (!fountainId && !qrCode) {
      return NextResponse.json(
        { success: false, error: 'ID de fontaine ou QR code requis' },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'ID utilisateur requis' },
        { status: 400 }
      )
    }

    // Trouver la fontaine
    const fountain = await prisma.fountain.findFirst({
      where: qrCode ? { qrCode } : { id: fountainId }
    })

    if (!fountain) {
      return NextResponse.json(
        { success: false, error: 'Fontaine non trouvée' },
        { status: 404 }
      )
    }

    if (!fountain.isActive) {
      return NextResponse.json(
        { success: false, error: 'Fontaine non disponible (maintenance)' },
        { status: 400 }
      )
    }

    // Vérifier l'utilisateur et ses crédits
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    const cost = fountain.costPerUse || 0.50

    if (user.credits < cost) {
      // Créer un scan échoué
      await prisma.scan.create({
        data: {
          fountainId: fountain.id,
          userId: user.id,
          amount: 0,
          status: 'INSUFFICIENT_CREDITS',
          userAgent: request.headers.get('user-agent') || undefined,
          ipAddress: request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
        }
      })

      return NextResponse.json(
        { 
          success: false, 
          error: 'Crédits insuffisants',
          userCredits: user.credits,
          requiredCredits: cost,
          shortfall: cost - user.credits
        },
        { status: 400 }
      )
    }

    // Effectuer la transaction dans une transaction de base de données
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Débiter l'utilisateur
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { credits: { decrement: cost } }
      })

      // Créer l'enregistrement de scan
      const scan = await tx.scan.create({
        data: {
          fountainId: fountain.id,
          userId: user.id,
          amount: cost,
          status: 'SUCCESS',
          userAgent: request.headers.get('user-agent') || undefined,
          ipAddress: request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
        }
      })

      // Créer l'enregistrement de transaction
      const transaction = await tx.transaction.create({
        data: {
          userId: user.id,
          type: 'USAGE',
          amount: -cost,
          description: `Utilisation fontaine: ${fountain.name}`,
          relatedId: scan.id
        }
      })

      return { updatedUser, scan, transaction }
    })

    return NextResponse.json({
      success: true,
      message: 'Fontaine déverrouillée avec succès',
      data: {
        fountain: {
          id: fountain.id,
          name: fountain.name,
          address: fountain.address
        },
        user: {
          id: result.updatedUser.id,
          name: result.updatedUser.name,
          remainingCredits: result.updatedUser.credits
        },
        transaction: {
          id: result.scan.id,
          cost: cost,
          timestamp: result.scan.scannedAt
        }
      }
    })

  } catch (error) {
    console.error('Erreur API fountain/unlock:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur serveur lors du déverrouillage' 
      },
      { status: 500 }
    )
  }
}

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

    // Récupérer l'historique des utilisations
    const userScans = await prisma.scan.findMany({
      where: { 
        userId,
        status: 'SUCCESS'
      },
      include: {
        fountain: {
          select: {
            id: true,
            name: true,
            address: true
          }
        }
      },
      orderBy: { scannedAt: 'desc' },
      take: 20
    })

    // Récupérer les statistiques
    const totalUsage = await prisma.scan.aggregate({
      where: { 
        userId,
        status: 'SUCCESS'
      },
      _sum: { amount: true },
      _count: true
    })

    return NextResponse.json({
      success: true,
      data: {
        recentScans: userScans,
        statistics: {
          totalScans: totalUsage._count,
          totalSpent: totalUsage._sum.amount || 0
        }
      }
    })

  } catch (error) {
    console.error('Erreur API fountain/unlock GET:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur serveur' 
      },
      { status: 500 }
    )
  }
}