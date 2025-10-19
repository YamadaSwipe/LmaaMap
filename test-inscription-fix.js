// Test simple d'inscription consumer
const testData = {
  firstName: "Test",
  lastName: "User", 
  email: "test.fix@example.com",
  phone: "+212123456789",
  city: "Casablanca",
  country: "MA",
  engagement: "Tester la correction"
};

console.log('🧪 Test d\'inscription après correction...');
console.log('📤 Données:', JSON.stringify(testData, null, 2));

fetch('http://localhost:3000/api/consumer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log('📊 Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('📥 Réponse:', JSON.stringify(data, null, 2));
  if (data.success) {
    console.log('✅ SUCCÈS - L\'inscription fonctionne !');
  } else {
    console.log('❌ ÉCHEC -', data.error);
  }
})
.catch(error => {
  console.error('💥 Erreur:', error.message);
});