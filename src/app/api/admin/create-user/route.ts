import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Exemple de logique pour créer un utilisateur
  const body = await request.json();
  return NextResponse.json({ message: 'Utilisateur créé avec succès', data: body });
}