const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testAdminLogin() {
  console.log('=== TEST DE CONNEXION ADMIN ===')
  
  try {
    // Recherche de l'admin dans la base
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@lmaamap.com' }
    })
    
    console.log('Admin trouvé:', admin ? 'OUI' : 'NON')
    
    if (admin) {
      console.log('Rôle:', admin.role)
      console.log('Email:', admin.email)
      
      // Test du mot de passe
      const isPasswordValid = await bcrypt.compare('admin123', admin.password)
      console.log('Mot de passe valide:', isPasswordValid ? 'OUI' : 'NON')
      
      // Test API
      console.log('\n=== TEST API LOGIN ===')
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@lmaamap.com',
          password: 'admin123'
        })
      })
      
      const result = await response.json()
      console.log('Statut HTTP:', response.status)
      console.log('Réponse API:', result)
    }
    
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAdminLogin()
