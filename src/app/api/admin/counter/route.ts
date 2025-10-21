import { NextRequest, NextResponse } from 'next/server'
export const revalidate = 60; // Revalidation toutes les 60 secondes

// Stockage simple en mémoire pour le compteur
let bottlesSaved = 50000

export async function GET() {
  try {
    return NextResponse.json({ 
      bottlesSaved,
      success: true 
    })
  } catch (error) {
    console.error('Erreur GET compteur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur', bottlesSaved: 50000 },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, value } = body

    if (action === 'increment') {
      bottlesSaved += value || 1
    } else if (action === 'set' && typeof value === 'number') {
      bottlesSaved = value
    } else if (action === 'reset') {
      bottlesSaved = 50000
    }

    return NextResponse.json({ 
      bottlesSaved,
      success: true 
    })
  } catch (error) {
    console.error('Erreur POST compteur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
