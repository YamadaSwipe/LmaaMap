const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updateAdminPassword() {
  try {
    console.log('=== MISE À JOUR DU MOT DE PASSE ADMIN ===');
    
    // Générer un nouveau hash pour "admin123"
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('Nouveau hash généré pour "admin123"');
    
    // Mettre à jour l'admin
    const admin = await prisma.user.updateMany({
      where: {
        email: 'admin@lmaawater.com',
        role: 'ADMIN'
      },
      data: {
        password: hashedPassword
      }
    });
    
    if (admin.count > 0) {
      console.log('✅ Mot de passe admin mis à jour avec succès!');
      console.log('');
      console.log('📧 Email: admin@lmaawater.com');
      console.log('🔑 Mot de passe: admin123');
      console.log('');
      console.log('Vous pouvez maintenant vous connecter sur http://localhost:3000/admin/login');
    } else {
      console.log('❌ Aucun admin trouvé avec cet email');
    }
    
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword();
