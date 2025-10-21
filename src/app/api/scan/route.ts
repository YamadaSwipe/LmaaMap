import { NextRequest, NextResponse } from 'next/server'
export const revalidate = 60; // Revalidation toutes les 60 secondes
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const partnerId = searchParams.get('partnerId')
    
    if (!partnerId) {
      return NextResponse.json(
        { error: 'partnerId requis' },
        { status: 400 }
      )
    }
    
    const record = { 
      id: Date.now().toString(), 
      partnerId, 
      date: new Date().toISOString() 
    }
    
    // Pour dev local : append dans un fichier scans.json (rapid prototype)
    const filePath = path.join(process.cwd(), 'data', 'scans.json')
    let arr = []
    
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8') || '[]'
        arr = JSON.parse(fileContent)
      }
    } catch (e) { 
      console.error(e)
    }
    
    arr.push(record)
    
    // Créer le dossier data s'il n'existe pas
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2))
    
    return NextResponse.json({ ok: true, record }, { status: 200 })
    
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'error' },
      { status: 500 }
    )
  }
}

// Méthodes non autorisées
export async function POST() {
  return NextResponse.json(
    { error: 'Utilisez GET avec partnerId en query param' },
    { status: 405 }
  )
}