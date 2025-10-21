import { NextRequest, NextResponse } from 'next/server'
export const revalidate = 60; // Revalidation toutes les 60 secondes

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // En production : push vers Supabase / DB
    // Ici : redirige vers /api/partners POST
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/partners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'ajout du partenaire' },
        { status: response.status }
      )
    }
    
    return NextResponse.json(data, { status: 201 })
    
  } catch (error) {
    console.error('Erreur dans add-partner:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// Méthodes non autorisées
export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  )
}