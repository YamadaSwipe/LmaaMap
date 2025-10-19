// Test direct avec curl via child_process
const { exec } = require('child_process');

function testAPI() {
  console.log('🧪 Test API inscription avec curl...');
  
  const testData = {
    firstName: "Test",
    lastName: "User",
    email: "test.debug@example.com", 
    city: "Casablanca",
    country: "MA"
  };
  
  const curlCommand = `curl -X POST http://localhost:3000/api/consumer -H "Content-Type: application/json" -d "${JSON.stringify(testData).replace(/"/g, '\\"')}" -v`;
  
  console.log('📤 Commande:', curlCommand);
  console.log('📦 Données:', JSON.stringify(testData, null, 2));
  
  exec(curlCommand, (error, stdout, stderr) => {
    console.log('\n📊 RÉSULTATS:');
    if (error) {
      console.error('❌ Erreur exec:', error);
    }
    if (stdout) {
      console.log('📥 STDOUT:', stdout);
    }
    if (stderr) {
      console.log('🔍 STDERR (curl verbose):', stderr);
    }
  });
}

// Attendre 2 secondes que le serveur soit prêt
setTimeout(testAPI, 2000);