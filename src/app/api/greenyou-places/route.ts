import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const places = await prisma.greenYouPlace.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      places
    })

  } catch (error) {
    console.error('Erreur récupération lieux GreenYou:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      referencementId, 
      nom, 
      type,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      pays,
      latitude, 
      longitude, 
      description, 
      pratiquesEco,
      labelsCertifications,
      siteWeb,
      reseauxSociaux
    } = body

    // Créer le lieu sur la carte
    const place = await prisma.greenYouPlace.create({
      data: {
        referencementId,
        nom,
        type,
        email,
        telephone,
        adresse,
        codePostal,
        ville,
        pays: pays || 'France',
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        description,
        pratiquesEco,
        labelsCertifications,
        siteWeb,
        reseauxSociaux,
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      place
    })

  } catch (error) {
    console.error('Erreur création lieu GreenYou:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, isActive } = body

    const place = await prisma.greenYouPlace.update({
      where: { id },
      data: { isActive }
    })

    return NextResponse.json({
      success: true,
      place
    })

  } catch (error) {
    console.error('Erreur mise à jour lieu GreenYou:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
