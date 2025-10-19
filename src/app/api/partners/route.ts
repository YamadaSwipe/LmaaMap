import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, city, website, description, type, employees, commitment } = body

    // Validation basique
    if (!name || !email || !city) {
      return NextResponse.json(
        { error: 'Les champs obligatoires sont manquants (nom, email, ville)' },
        { status: 400 }
      )
    }

    // Vérifier si l'email existe déjà
    const existingPartner = await prisma.partner.findUnique({
      where: { email }
    })

    if (existingPartner) {
      return NextResponse.json(
        { error: 'Cet email est déjà enregistré' },
        { status: 400 }
      )
    }

    // Créer le partenaire
    const partner = await prisma.partner.create({
      data: {
        name,
        email,
        phone: phone || null,
        address: address || null,
        city,
        website: website || null,
        description: description || null,
        type: type || 'OTHER',
        employees: employees || null,
        commitment: commitment || null,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Inscription partenaire réussie',
      partner: {
        id: partner.id,
        name: partner.name,
        email: partner.email,
        city: partner.city,
        type: partner.type
      }
    })

  } catch (error) {
    console.error('Erreur inscription partenaire:', error)
    
    // Gestion spécifique des erreurs Prisma
    if (error instanceof Error) {
      // Erreur de contrainte unique (email déjà existant)
      if (error.message.includes('Unique constraint failed')) {
        return NextResponse.json(
          { error: 'Cet email est déjà enregistré' },
          { status: 400 }
        )
      }
      
      // Erreur de champ requis
      if (error.message.includes('Required')) {
        return NextResponse.json(
          { error: 'Données manquantes ou invalides', details: error.message },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'inscription', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
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
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      partners,
      count: partners.length
    })

  } catch (error) {
    console.error('Erreur récupération partenaires:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}