const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addCreditsToUsers() {
  try {
    console.log('🔄 Ajout de crédits aux utilisateurs existants...')

    // Donner 10 crédits à tous les utilisateurs existants
    const result = await prisma.user.updateMany({
      data: {
        credits: 10.00
      }
    })

    console.log(`✅ ${result.count} utilisateurs mis à jour avec 10 crédits`)

    // Créer quelques fontaines avec QR codes si elles n'existent pas
    const fountainCount = await prisma.fountain.count()
    
    if (fountainCount === 0) {
      console.log('🚰 Création de fontaines d\'exemple...')
      
      const fountains = [
        {
          name: 'Fontaine Centre-Ville',
          latitude: 48.8566,
          longitude: 2.3522,
          address: '1 Place de la République',
          city: 'Paris',
          description: 'Fontaine principale du centre-ville',
          qrCode: 'FOUNTAIN_001_CENTERVILLE',
          costPerUse: 0.30
        },
        {
          name: 'Fontaine Parc des Sports',
          latitude: 48.8606,
          longitude: 2.3376,
          address: 'Parc des Sports',
          city: 'Paris', 
          description: 'Fontaine du complexe sportif',
          qrCode: 'FOUNTAIN_002_SPORTS',
          costPerUse: 0.25
        },
        {
          name: 'Fontaine Université',
          latitude: 48.8449,
          longitude: 2.3430,
          address: 'Campus Universitaire',
          city: 'Paris',
          description: 'Fontaine du campus étudiant',
          qrCode: 'FOUNTAIN_003_UNIVERSITY',
          costPerUse: 0.20
        }
      ]

      for (const fountain of fountains) {
        await prisma.fountain.create({ data: fountain })
        console.log(`  ✅ Fontaine créée: ${fountain.name}`)
      }
    }

    console.log('🎉 Initialisation des crédits terminée!')

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addCreditsToUsers()