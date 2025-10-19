// Analyse détaillée des fontaines OpenStreetMap
const https = require('https')

function analyzeOSMFountains() {
  console.log('🔍 ANALYSE DÉTAILLÉE DES FONTAINES OPENSTREETMAP MAROC')
  console.log('=' .repeat(60))
  
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="drinking_water"](30.0,-12.0,36.0,-1.0);
      node["amenity"="fountain"](30.0,-12.0,36.0,-1.0);
      node["man_made"="water_tap"](30.0,-12.0,36.0,-1.0);
    );
    out meta;
  `
  
  const data = `data=${encodeURIComponent(query)}`
  
  const options = {
    hostname: 'overpass-api.de',
    port: 443,
    path: '/api/interpreter',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'LmaaMap-Analysis/1.0'
    }
  }
  
  const req = https.request(options, (res) => {
    let body = ''
    
    res.on('data', (chunk) => {
      body += chunk
    })
    
    res.on('end', () => {
      try {
        const result = JSON.parse(body)
        const fountains = result.elements || []
        
        console.log(`📊 RÉSULTATS: ${fountains.length} points d'eau trouvés\n`)
        
        // Analyse par type
        const types = {}
        const potabilityInfo = {
          drinkingWater: 0,    // amenity=drinking_water (EAU POTABLE)
          fountain: 0,         // amenity=fountain (FONTAINE DÉCORATIVE)
          waterTap: 0,         // man_made=water_tap (ROBINET D'EAU)
          unknown: 0
        }
        
        fountains.forEach((fountain, index) => {
          const tags = fountain.tags || {}
          
          // Classification par type principal
          if (tags.amenity === 'drinking_water') {
            potabilityInfo.drinkingWater++
          } else if (tags.amenity === 'fountain') {
            potabilityInfo.fountain++
          } else if (tags.man_made === 'water_tap') {
            potabilityInfo.waterTap++
          } else {
            potabilityInfo.unknown++
          }
          
          // Afficher les 10 premiers exemples
          if (index < 10) {
            console.log(`🚰 FONTAINE ${index + 1}:`)
            console.log(`   ID: ${fountain.id}`)
            console.log(`   Coordonnées: ${fountain.lat}, ${fountain.lon}`)
            console.log(`   Type principal: ${tags.amenity || tags.man_made || 'non spécifié'}`)
            console.log(`   Nom: ${tags.name || 'sans nom'}`)
            console.log(`   Potable: ${tags.drinking_water || 'non spécifié'}`)
            console.log(`   Accès: ${tags.access || 'public'}`)
            console.log(`   Opérateur: ${tags.operator || 'non spécifié'}`)
            console.log(`   Tous les tags:`, Object.keys(tags).map(k => `${k}=${tags[k]}`).join(', '))
            console.log('')
          }
        })
        
        console.log('📈 CLASSIFICATION PAR TYPE:')
        console.log(`   🟢 drinking_water (EAU POTABLE CONFIRMÉE): ${potabilityInfo.drinkingWater}`)
        console.log(`   🔵 fountain (FONTAINE - potabilité à vérifier): ${potabilityInfo.fountain}`)
        console.log(`   🟡 water_tap (ROBINET D'EAU): ${potabilityInfo.waterTap}`)
        console.log(`   ⚪ autres/non classé: ${potabilityInfo.unknown}`)
        
        console.log('\n🎯 CONCLUSION:')
        const safeForDrinking = potabilityInfo.drinkingWater + potabilityInfo.waterTap
        const needVerification = potabilityInfo.fountain
        
        console.log(`   ✅ SÛRS pour boire/remplir gourde: ${safeForDrinking}`)
        console.log(`   ⚠️  À VÉRIFIER (fontaines décoratives): ${needVerification}`)
        console.log(`   📊 Taux de sécurité: ${((safeForDrinking / fountains.length) * 100).toFixed(1)}%`)
        
      } catch (error) {
        console.error('❌ Erreur parsing:', error)
      }
    })
  })
  
  req.on('error', (error) => {
    console.error('❌ Erreur requête:', error)
  })
  
  req.write(data)
  req.end()
}

analyzeOSMFountains()
