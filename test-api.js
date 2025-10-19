const { exec } = require('child_process');

function testAPIInscription() {
  console.log('Test API inscription avec curl...\n');
  
  const testData = {
    firstName: "Ahmed",
    lastName: "TestAPI",
    email: `test.api.${Date.now()}@example.com`,
    city: "Casablanca",
    country: "MA",
    phone: "+212123456789",
    engagement: "Proteger l'environnement"
  };
  
  console.log('Donnees test:');
  console.log(JSON.stringify(testData, null, 2));
  
  const curlData = JSON.stringify(testData).replace(/"/g, '\\"');
  const curlCommand = `curl -X POST http://localhost:3000/api/consumer -H "Content-Type: application/json" -d "${curlData}" -w "\\nHTTP Status: %{http_code}\\n" -s`;
  
  console.log('\nExecuting test...\n');
  
  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Erreur exec:', error.message);
      return;
    }
    
    if (stderr) {
      console.log('STDERR:', stderr);
    }
    
    console.log('REPONSE:');
    console.log(stdout);
    
    // Essayer de parser la réponse JSON
    const lines = stdout.split('\n');
    const jsonResponse = lines.slice(0, -2).join('\n'); // Retirer les 2 dernières lignes (HTTP Status)
    const httpStatus = lines[lines.length - 2];
    
    console.log('\n' + httpStatus);
    
    try {
      const parsed = JSON.parse(jsonResponse);
      if (parsed.success) {
        console.log('\n✅ INSCRIPTION REUSSIE!');
        console.log('ID utilisateur:', parsed.consumer.id);
        console.log('Nom:', parsed.consumer.name);
        console.log('Email:', parsed.consumer.email);
      } else {
        console.log('\n❌ ECHEC INSCRIPTION');
        console.log('Erreur:', parsed.error);
        if (parsed.details) {
          console.log('Details:', parsed.details);
        }
      }
    } catch (parseError) {
      console.log('\nReponse non-JSON ou erreur de parsing');
      console.log('Contenu brut:', jsonResponse);
    }
    } else {
      console.log('❌ Test échoué - Erreur d\'inscription');
    }
    
  } catch (error) {
    console.error('💥 Erreur lors du test:', error.message);
  }
}

testConsumerAPI();