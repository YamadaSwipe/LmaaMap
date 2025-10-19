// Test complet de l'API d'inscription
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testInscription() {
  console.log('Test direct de l inscription dans la base de donnees...\n');
  
  const testUser = {
    firstName: "Ahmed",
    lastName: "TestDirect", 
    email: `test.direct.${Date.now()}@example.com`,
    city: "Casablanca",
    country: "MA"
  };
  
  console.log('Donnees test:', JSON.stringify(testUser, null, 2));
  
  try {
    // Test direct Prisma
    console.log('\nTest 1: Insertion directe via Prisma...');
    const user = await prisma.user.create({
      data: testUser
    });
    
    console.log('SUCCES Prisma! Utilisateur cree:', {
      id: user.id,
      email: user.email,
      city: user.city,
      country: user.country,
      createdAt: user.createdAt
    });
    
    console.log('\nTest 2: Verification en base...');
    const verification = await prisma.user.findUnique({
      where: { email: testUser.email }
    });
    
    if (verification) {
      console.log('Utilisateur trouve en base!');
    } else {
      console.log('Utilisateur non trouve en base!');
    }
    
  } catch (error) {
    console.error('ERREUR Prisma:', error.message);
    console.error('Type d erreur:', error.constructor.name);
    if (error.code) {
      console.error('Code erreur:', error.code);
    }
    if (error.meta) {
      console.error('Metadonnees:', error.meta);
    }
  }
  
  // Test de l'API via fetch
  console.log('\nTest 3: API via fetch local...');
  try {
    const apiTestUser = {
      firstName: "Fatima",
      lastName: "TestAPI",
      email: `test.api.${Date.now()}@example.com`,
      city: "Rabat",
      country: "MA"
    };
    
    // Import fetch pour Node.js
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('http://localhost:3000/api/consumer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiTestUser)
    });
    
    console.log('Status HTTP:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Reponse brute:', responseText);
    
    if (response.ok) {
      const result = JSON.parse(responseText);
      console.log('SUCCES API!', result);
    } else {
      console.log('ECHEC API!');
      try {
        const errorResult = JSON.parse(responseText);
        console.log('Erreur detaillee:', errorResult);
      } catch (parseError) {
        console.log('Reponse non-JSON:', responseText);
      }
    }
    
  } catch (apiError) {
    console.error('ERREUR API:', apiError.message);
  }
  
  await prisma.$disconnect();
}

testInscription().catch(console.error);