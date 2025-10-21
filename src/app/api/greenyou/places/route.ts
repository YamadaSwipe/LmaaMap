export const revalidate = 60; // Revalidation toutes les 60 secondes
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const places = await prisma.greenYouPlace.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, places });
  } catch (error) {
    console.error("Erreur GET greenyou/places:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const { id, isActive } = await req.json();
  
  try {
    const updated = await prisma.greenYouPlace.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json({ success: true, place: updated });
  } catch (error) {
    console.error("Erreur PATCH greenyou/places:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ success: false, error: "ID manquant" }, { status: 400 });
  }
  
  try {
    await prisma.greenYouPlace.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE greenyou/places:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
