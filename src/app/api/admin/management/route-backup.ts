import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client';

// Types pour les entités
interface Partner {
  id: string
  name: string
  type?: string
  createdAt: string
}

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany()
    const transformedUsers = users.map((user: Prisma.UserGetPayload<{}>) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role, // role selon schema Prisma (ex: "CONSUMER", "PARTNER", "ADMIN")
      createdAt: user.createdAt,
    }))

    const userStats = {
      consumers: transformedUsers.filter((u) => u.role === 'CONSUMER').length,
      partners: transformedUsers.filter((u) => u.role === 'PARTNER').length,
      admins: transformedUsers.filter((u) => u.role === 'ADMIN').length,
    }

    const partners = await prisma.partner.findMany()
    const transformedPartners = partners.map((partner) => ({
      id: partner.id,
      name: partner.name,
      type: partner.type,
      createdAt: partner.createdAt
    }))

    const partnerStats = {
      total: transformedPartners.length
    }

    return NextResponse.json({
      success: true,
      userStats,
      partnerStats
    })
  } catch (error) {
    console.error('Erreur dans l’API admin management backup:', error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}