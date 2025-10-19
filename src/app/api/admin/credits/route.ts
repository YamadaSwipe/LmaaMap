import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
      include: { credits: true }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    const stats = user.credits.reduce((acc: { total: number; count: number }, stat: { amount: number; _count: number }) => {
      acc.total += stat.amount
      acc.count += stat._count
      return acc
    }, { total: 0, count: 0 })

    return NextResponse.json({ success: true, stats })
  } catch (error) {
    console.error('Erreur dans l’API admin credits:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, amount } = body

    if (!userId || !amount) {
      return NextResponse.json(
        { success: false, error: 'ID utilisateur et montant requis' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: {
          credits: {
            create: { amount }
          }
        }
      })

      return user
    })

    return NextResponse.json({ success: true, updatedUser })
  } catch (error) {
    console.error('Erreur dans l’API admin credits POST:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}