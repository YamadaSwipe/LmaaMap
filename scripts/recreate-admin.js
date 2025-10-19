
// Script pour recréer l'utilisateur admin
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const admin = await prisma.user.create({
      data: {
        email: 'admin@lmaawater.com',
        name: 'Admin LmaaWater',
        password: '$2b$10$tKfn1G3HrFVnGUEkzkyjgutdjZZzMHYIi0urZ/N0qrMxt9WJm6dRi',
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
