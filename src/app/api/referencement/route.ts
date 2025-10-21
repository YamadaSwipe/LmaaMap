export const revalidate = 60; // Revalidation toutes les 60 secondes
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const demande = await prisma.referencementRequest.create({
      data: {
        nom: data.nom,
        type: data.type,
        email: data.email,
        telephone: data.telephone,
        adresse: data.adresse,
        codePostal: data.codePostal,
        ville: data.ville,
        pays: "Maroc", // GreenYou est destiné au Maroc uniquement
        description: data.description,
        pratiquesEco: data.pratiquesEco,
        labelsCertifications: data.labelsCertifications,
        siteWeb: data.siteWeb,
        reseauxSociaux: data.reseauxSociaux,
      },
    });
    return NextResponse.json({ success: true, demande }, { status: 201 });
  } catch (error) {
    console.error("Erreur POST:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de l'enregistrement" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await prisma.referencementRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("Erreur GET:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const { id, status, createPlace, latitude, longitude } = await req.json();
  
  try {
    // Mettre à jour le statut
    const updated = await prisma.referencementRequest.update({
      where: { id },
      data: { status },
    });

    // Si validé et createPlace est true, créer le lieu sur la carte
    if (status === 'VALIDE' && createPlace) {
      // Vérifier si un lieu n'existe pas déjà
      if (!updated.greenYouPlaceId) {
        let finalLatitude = latitude ? parseFloat(latitude) : 48.8566; // Paris par défaut
        let finalLongitude = longitude ? parseFloat(longitude) : 2.3522;
        
        // Si pas de coordonnées fournies, essayer le géocodage
        if (!latitude || !longitude) {
          const address = `${updated.adresse}, ${updated.codePostal} ${updated.ville}, ${updated.pays}`;
          const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
          
          try {
            const geoResponse = await fetch(geocodeUrl, {
              headers: { 'User-Agent': 'LmaaMap-GreenYou/1.0' }
            });
            const geoData = await geoResponse.json();
            
            if (geoData && geoData.length > 0) {
              finalLatitude = parseFloat(geoData[0].lat);
              finalLongitude = parseFloat(geoData[0].lon);
            }
          } catch (geoError) {
            console.error("Erreur géocodage:", geoError);
          }
        }

        // Créer le lieu GreenYou
        const place = await prisma.greenYouPlace.create({
          data: {
            nom: updated.nom,
            type: updated.type,
            email: updated.email,
            telephone: updated.telephone,
            adresse: updated.adresse,
            codePostal: updated.codePostal,
            ville: updated.ville,
            pays: updated.pays,
            latitude: finalLatitude,
            longitude: finalLongitude,
            description: updated.description,
            pratiquesEco: updated.pratiquesEco,
            labelsCertifications: updated.labelsCertifications,
            siteWeb: updated.siteWeb,
            reseauxSociaux: updated.reseauxSociaux,
            referencementId: updated.id,
          },
        });

        // Mettre à jour la demande avec l'ID du lieu créé
        await prisma.referencementRequest.update({
          where: { id },
          data: { greenYouPlaceId: place.id },
        });

        return NextResponse.json({ success: true, updated, place });
      }
    }

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Erreur PATCH:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
