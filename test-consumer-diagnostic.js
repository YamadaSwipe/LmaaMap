// Script de diagnostic détaillé pour l'API consumer
console.log('🔍 DIAGNOSTIC API CONSUMER - Analyse détaillée de l\'erreur d\'inscription');

async function testConsumerAPI() {
  const baseUrl = 'http://localhost:3000';
  
  // Test 1: Données valides complètes
  console.log('\n📋 TEST 1: Données valides complètes');
  const validData = {
    firstName: "Ahmed",
    lastName: "Benali", 
    email: "ahmed.diagnostic@test.com",
    phone: "+212123456789",
    city: "Casablanca",
    country: "MA",
    engagement: "Réduire ma consommation d'eau"
  };
  
  await testRequest('POST', '/api/consumer', validData, 'Inscription complète');

  // Test 2: Données minimales (sans champs optionnels)
  console.log('\n📋 TEST 2: Données minimales obligatoires');
  const minimalData = {
    firstName: "Fatima",
    lastName: "El Idrissi",
    email: "fatima.diagnostic@test.com", 
    city: "Rabat",
    country: "MA"
  };
  
  await testRequest('POST', '/api/consumer', minimalData, 'Inscription minimale');

  // Test 3: Données manquantes - firstName
  console.log('\n📋 TEST 3: firstName manquant');
  const missingFirstName = {
    lastName: "Test",
    email: "test.firstname@test.com",
    city: "Fès", 
    country: "MA"
  };
  
  await testRequest('POST', '/api/consumer', missingFirstName, 'firstName manquant');

  // Test 4: Données manquantes - country
  console.log('\n📋 TEST 4: country manquant');
  const missingCountry = {
    firstName: "Test",
    lastName: "Country",
    email: "test.country@test.com",
    city: "Tanger"
  };
  
  await testRequest('POST', '/api/consumer', missingCountry, 'country manquant');

  // Test 5: Données manquantes - city
  console.log('\n📋 TEST 5: city manquant');
  const missingCity = {
    firstName: "Test", 
    lastName: "City",
    email: "test.city@test.com",
    country: "MA"
  };
  
  await testRequest('POST', '/api/consumer', missingCity, 'city manquant');

  // Test 6: Email déjà existant
  console.log('\n📋 TEST 6: Email en double (si premier test a réussi)');
  await testRequest('POST', '/api/consumer', validData, 'Email en double');
}

async function testRequest(method, endpoint, data, description) {
  try {
    console.log(`\n🧪 ${description}:`);
    console.log(`📤 Données envoyées:`, JSON.stringify(data, null, 2));
    
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    console.log(`📊 Status HTTP: ${response.status}`);
    
    const result = await response.json();
    console.log(`📥 Réponse:`, JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ SUCCÈS');
    } else {
      console.log('❌ ÉCHEC');
    }
    
    return { success: response.ok, status: response.status, data: result };
    
  } catch (error) {
    console.error(`💥 Erreur réseau:`, error.message);
    return { success: false, error: error.message };
  }
}

// Attendre un peu que le serveur soit prêt
setTimeout(() => {
  testConsumerAPI().then(() => {
    console.log('\n🏁 Diagnostic terminé!');
  });
}, 2000);