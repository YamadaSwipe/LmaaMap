const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('=== SAUVEGARDE DES DONNÉES IMPORTANTES ===\n');

// Sauvegarder l'admin
db.get("SELECT * FROM User WHERE role = 'admin'", (err, admin) => {
  if (err) {
    console.error('Erreur récupération admin:', err);
    return;
  }

  if (admin) {
    console.log('Admin trouvé:', {
      email: admin.email,
      name: admin.name,
      password: admin.password
    });
    
    // Créer un script pour récréer l'admin
    const adminScript = `
// Script pour recréer l'utilisateur admin
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const admin = await prisma.user.create({
      data: {
        email: '${admin.email}',
        name: '${admin.name}',
        password: '${admin.password}',
        role: 'ADMIN'
      }
    });
    console.log('Admin créé:', admin);
  } catch (error) {
    console.error('Erreur création admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
`;

    require('fs').writeFileSync(path.join(__dirname, 'recreate-admin.js'), adminScript);
    console.log('Script de recréation admin sauvegardé dans scripts/recreate-admin.js');
  }

  db.close();
});