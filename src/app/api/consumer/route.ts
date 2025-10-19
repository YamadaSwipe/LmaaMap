import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import QRCode from 'qrcode'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📝 Données reçues pour inscription consommateur:', body)
    
    const { firstName, lastName, email, password, phone, city, country, engagement, credits } = body

    // Validation basique - firstName, lastName, email et password sont obligatoires
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Le prénom, nom, email et mot de passe sont obligatoires' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Validation mot de passe
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      )
    }

    // Vérifier si l'email existe déjà
    const existingConsumer = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    })

    if (existingConsumer) {
      return NextResponse.json(
        { error: 'Cet email est déjà enregistré' },
        { status: 400 }
      )
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)

    // Préparer les données pour création
    const userData = {
      email: email.toLowerCase().trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      role: 'CONSUMER',
      password: hashedPassword,
      credits: credits || 0,
      ...(city && city.trim() && { city: city.trim() }),
      ...(country && country.trim() && { country: country.trim() }),
      ...(phone && phone.trim() && { phone: phone.trim() }),
      ...(engagement && engagement.trim() && { engagement: engagement.trim() }),
    }
    
    console.log('💾 Données préparées pour Prisma:', { ...userData, password: '[HIDDEN]' })

    // Créer le consommateur
    const consumer = await prisma.user.create({
      data: userData
    })

    // Générer le QR code pour l'utilisateur
    const qrData = {
      userId: consumer.id,
      email: consumer.email,
      name: consumer.name,
      credits: consumer.credits
    }
    
    const qrCodeString = await QRCode.toDataURL(JSON.stringify(qrData))

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie',
      qrCode: qrCodeString,
      consumer: {
        id: consumer.id,
        name: consumer.name,
        email: consumer.email,
        credits: consumer.credits
      }
    })

  } catch (error) {
    console.error('Erreur inscription consommateur:', error)
    
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
    const consumers = await prisma.user.findMany({
      where: { role: 'CONSUMER' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      consumers,
      count: consumers.length
    })

  } catch (error) {
    console.error('Erreur récupération consommateurs:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
