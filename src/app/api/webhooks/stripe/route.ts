import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Exemple de logique pour gérer un webhook Stripe
  const body = await request.json();
  return NextResponse.json({ message: 'Webhook Stripe reçu', data: body });
}