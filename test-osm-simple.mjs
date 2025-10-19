// Test simple de l'intégration OpenStreetMap
import { getFountainsAroundPoint, getMoroccanFountains } from './src/lib/overpass'

async function testOSM() {
  console.log('🧪 Test OpenStreetMap Integration')
  
  try {
    // Test pour Marrakech
    console.log('\n🕌 Test Marrakech:')
    const marrakechFountains = await getFountainsAroundPoint(31.6295, -7.9811, 10000)
    console.log(`✅ ${marrakechFountains.length} fontaines trouvées à Marrakech`)
    
    if (marrakechFountains.length > 0) {
      console.log('📍 Première fontaine:', {
        id: marrakechFountains[0].id,
        name: marrakechFountains[0].name,
        lat: marrakechFountains[0].lat,
        lon: marrakechFountains[0].lon
      })
    }
    
    // Test pour toutes les villes marocaines
    console.log('\n🇲🇦 Test toutes les villes du Maroc:')
    const allMoroccanFountains = await getMoroccanFountains()
    console.log(`✅ ${allMoroccanFountains.length} fontaines trouvées au total`)
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

testOSM()