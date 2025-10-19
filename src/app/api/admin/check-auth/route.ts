import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get('admin-auth')

    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, message: 'Non authentifié' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Authentifié'
    })

  } catch (error) {
    console.error('Erreur de vérification:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
