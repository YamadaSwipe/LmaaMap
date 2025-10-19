// Test simple OpenStreetMap
const https = require('https')

function testOverpassAPI() {
  console.log('🧪 Test API Overpass OpenStreetMap pour le Maroc')
  
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="drinking_water"](30.0,-12.0,36.0,-1.0);
      node["amenity"="water_point"](30.0,-12.0,36.0,-1.0);
      node["man_made"="water_tap"](30.0,-12.0,36.0,-1.0);
    );
    out meta;
  `
  
  const data = JSON.stringify({ data: query })
  
  const options = {
    hostname: 'overpass-api.de',
    port: 443,
    path: '/api/interpreter',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'User-Agent': 'LmaaMap/1.0 (Contact: contact@lmaamap.com)'
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
        console.log(`✅ ${result.elements?.length || 0} points d'eau trouvés au Maroc`)
        
        if (result.elements && result.elements.length > 0) {
          console.log('\n📍 Première fontaine trouvée:')
          const first = result.elements[0]
          console.log({
            id: first.id,
            type: first.type,
            lat: first.lat,
            lon: first.lon,
            tags: first.tags
          })
        }
      } catch (error) {
        console.error('❌ Erreur parsing JSON:', error)
        console.log('Response:', body.substring(0, 200))
      }
    })
  })
  
  req.on('error', (error) => {
    console.error('❌ Erreur requête:', error)
  })
  
  req.write(data)
  req.end()
}

testOverpassAPI()
