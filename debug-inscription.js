// Script de diagnostic avancé pour l'erreur d'inscription
console.log('🔍 DIAGNOSTIC AVANCÉ - Erreur d\'inscription persistante');
console.log('Date:', new Date().toLocaleString());

async function testDetailled() {
  const testCases = [
    {
      name: "Test données complètes",
      data: {
        firstName: "Ahmed",
        lastName: "Testeur",
        email: "ahmed.test.final@example.com",
        phone: "+212123456789",
        city: "Casablanca", 
        country: "MA",
        engagement: "Sauver la planète"
      }
    },
    {
      name: "Test données minimales",
      data: {
        firstName: "Fatima",
        lastName: "Minimal",
        email: "fatima.minimal@example.com",
        city: "Rabat",
        country: "MA"
      }
    },
    {
      name: "Test country France",
      data: {
        firstName: "Pierre",
        lastName: "Français",
        email: "pierre.france@example.com",
        city: "Paris",
        country: "FR"
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n🧪 ${testCase.name}`);
    console.log('📤 Données:', JSON.stringify(testCase.data, null, 2));
    
    try {
      const response = await fetch('http://localhost:3000/api/consumer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      });

      console.log(`📊 Status HTTP: ${response.status}`);
      console.log(`📋 Headers:`, Object.fromEntries(response.headers.entries()));
      
      let responseText;
      try {
        responseText = await response.text();
        console.log(`📥 Réponse brute: ${responseText}`);
        
        const result = JSON.parse(responseText);
        console.log(`📦 Réponse JSON:`, JSON.stringify(result, null, 2));
        
        if (response.ok) {
          console.log('✅ SUCCÈS');
        } else {
          console.log('❌ ÉCHEC -', result.error || 'Erreur inconnue');
          if (result.details) {
            console.log('🔍 Détails:', result.details);
          }
        }
      } catch (parseError) {
        console.log('⚠️ Erreur parsing JSON:', parseError.message);
        console.log('📄 Réponse brute:', responseText);
      }
      
    } catch (error) {
      console.error('💥 Erreur réseau:', error.message);
    }
    
    console.log('─'.repeat(50));
  }
}

// Attendre que le serveur soit prêt
setTimeout(() => {
  console.log('🚀 Démarrage des tests...');
  testDetailled().then(() => {
    console.log('\n🏁 Tests terminés!');
  }).catch(error => {
    console.error('💥 Erreur générale:', error);
  });
}, 3000);