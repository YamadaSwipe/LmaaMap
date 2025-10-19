const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function cleanDatabase() {
  try {
    console.log('🧹 Nettoyage de la base de données...')
    
    // Supprimer toutes les fontaines de la base de données
    const result = await prisma.fountain.deleteMany({})
    
    console.log(`✅ ${result.count} fontaine(s) supprimée(s) de la base de données`)
    
    // Supprimer tous les scans associés
    const scanResult = await prisma.scan.deleteMany({})
    console.log(`✅ ${scanResult.count} scan(s) supprimé(s)`)
    
    // Supprimer toutes les transactions associées
    const transactionResult = await prisma.transaction.deleteMany({})
    console.log(`✅ ${transactionResult.count} transaction(s) supprimée(s)`)
    
    console.log('🎉 Base de données nettoyée avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanDatabase()