// Script de test pour l'intégration OpenStreetMap
const fetch = require('node-fetch')

async function testOSMIntegration() {
  console.log('🧪 Test de l\'intégration OpenStreetMap...\n')
  
  try {
    // Test 1: API standard sans OSM
    console.log('1️⃣ Test API fontaines standard:')
    const standardResponse = await fetch('http://localhost:3000/api/fountains')
    const standardData = await standardResponse.json()
    console.log(`   ✅ ${standardData.data?.length || 0} fontaines récupérées`)
    console.log(`   📊 Sources: DB: ${standardData.counts?.database || 0}, Static: ${standardData.counts?.static || 0}`)
    
    // Test 2: API avec OSM inclus
    console.log('\n2️⃣ Test API fontaines avec OpenStreetMap:')
    const osmResponse = await fetch('http://localhost:3000/api/fountains?includeOSM=true')
    const osmData = await osmResponse.json()
    console.log(`   ✅ ${osmData.data?.length || 0} fontaines récupérées`)
    console.log(`   📊 Sources: DB: ${osmData.counts?.database || 0}, Static: ${osmData.counts?.static || 0}, OSM: ${osmData.counts?.osm || 0}`)
    
    // Test 3: API OSM directe
    console.log('\n3️⃣ Test API OpenStreetMap directe:')
    const osmDirectResponse = await fetch('http://localhost:3000/api/fountains/osm?action=morocco')
    const osmDirectData = await osmDirectResponse.json()
    console.log(`   ✅ ${osmDirectData.data?.length || 0} fontaines OSM directes`)
    
    console.log('\n🎉 Tests terminés avec succès!')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

// Exécuter les tests
testOSMIntegration()