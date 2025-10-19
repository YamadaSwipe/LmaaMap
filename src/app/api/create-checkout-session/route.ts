import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, userEmail, userName, type } = await request.json()

    if (!amount || !userEmail) {
      return NextResponse.json(
        { error: 'Montant et email requis' },
        { status: 400 }
      )
    }

    const isRecharge = type === 'recharge'

    // Mode développement - simulation de Stripe
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_votre_cle_secrete_stripe') {
      console.log('Mode développement - simulation de paiement Stripe')
      
      // Simuler une session Stripe
      const mockSessionId = `cs_test_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const successUrl = isRecharge 
        ? `${baseUrl}/consumer/dashboard?recharge=success&session_id=${mockSessionId}&mock=true`
        : `${baseUrl}/consumer/payment/success?session_id=${mockSessionId}&mock=true`
      
      return NextResponse.json({ 
        url: successUrl,
        sessionId: mockSessionId,
        mock: true
      })
    }

    // Mode production avec Stripe réel
    const Stripe = require('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Crédits LmaaMap',
              description: `Recharge de ${amount}€ de crédits pour fontaines`,
              images: ['https://example.com/credits-icon.png'],
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: userEmail,
      metadata: {
        userEmail,
        userName,
        creditAmount: amount.toString(),
        type: isRecharge ? 'credit_recharge' : 'credit_purchase'
      },
      success_url: isRecharge 
        ? `${process.env.NEXT_PUBLIC_DOMAIN}/consumer/dashboard?recharge=success&session_id={CHECKOUT_SESSION_ID}`
        : `${process.env.NEXT_PUBLIC_DOMAIN}/consumer/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: isRecharge
        ? `${process.env.NEXT_PUBLIC_DOMAIN}/consumer/dashboard?recharge=cancelled`
        : `${process.env.NEXT_PUBLIC_DOMAIN}/consumer/register?step=payment&error=cancelled`,
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error('Erreur création session:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
}
