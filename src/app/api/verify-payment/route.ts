import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import QRCode from 'qrcode'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()
    const url = new URL(request.url)
    const isMock = url.searchParams.get('mock') === 'true'

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID requis' },
        { status: 400 }
      )
    }

    let sessionData
    
    // Mode développement - simulation
    if (isMock || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_votre_cle_secrete_stripe') {
      console.log('Mode développement - simulation de vérification de paiement')
      
      // Données simulées pour le développement
      sessionData = {
        payment_status: 'paid',
        customer_email: 'test@example.com',
        metadata: {
          userEmail: 'test@example.com',
          userName: 'Test User',
          creditAmount: '20',
          type: 'credit_purchase'
        }
      }
    } else {
      // Mode production avec Stripe réel
      const Stripe = require('stripe')
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-06-20',
      })
      
      sessionData = await stripe.checkout.sessions.retrieve(sessionId)
    }

    if (sessionData.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Paiement non confirmé' },
        { status: 400 }
      )
    }

    const { userEmail, userName, creditAmount } = sessionData.metadata!

    // Vérifier si l'utilisateur existe déjà
    let user = await prisma.user.findUnique({
      where: { email: userEmail }
    })

    if (!user) {
      // Créer l'utilisateur avec un mot de passe temporaire
      const tempPassword = Math.random().toString(36).slice(-8)
      const hashedPassword = await bcrypt.hash(tempPassword, 12)

      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
          role: 'CONSUMER',
          password: hashedPassword,
          credits: parseFloat(creditAmount),
        }
      })
    } else {
      // Ajouter les crédits à l'utilisateur existant
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          credits: user.credits + parseFloat(creditAmount)
        }
      })
    }

    // Générer le QR code
    const qrData = {
      userId: user.id,
      email: user.email,
      name: user.name,
      credits: user.credits
    }
    
    const qrCodeString = await QRCode.toDataURL(JSON.stringify(qrData))

    return NextResponse.json({
      success: true,
      payment: {
        userEmail,
        userName,
        creditAmount
      },
      qrCode: qrCodeString,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        credits: user.credits
      }
    })

  } catch (error) {
    console.error('Erreur vérification paiement:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du paiement' },
      { status: 500 }
    )
  }
}