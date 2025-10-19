const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('=== INSPECTION DE LA BASE DE DONNÉES ===\n');

// Lister toutes les tables
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) {
    console.error('Erreur lors de la récupération des tables:', err);
    return;
  }

  console.log('Tables existantes:');
  tables.forEach(table => {
    console.log(`- ${table.name}`);
  });
  console.log('');

  // Pour chaque table, afficher le contenu
  tables.forEach(table => {
    if (table.name !== 'sqlite_sequence' && table.name !== '_prisma_migrations') {
      console.log(`\n=== Contenu de la table ${table.name.toUpperCase()} ===`);
      
      db.all(`SELECT * FROM ${table.name}`, (err, rows) => {
        if (err) {
          console.error(`Erreur lors de la lecture de ${table.name}:`, err);
          return;
        }

        if (rows.length === 0) {
          console.log('Aucune donnée');
        } else {
          console.log(`${rows.length} enregistrement(s):`);
          rows.forEach((row, index) => {
            console.log(`${index + 1}.`, row);
          });
        }
      });
    }
  });

  // Fermer la base après un délai pour laisser les requêtes se terminer
  setTimeout(() => {
    db.close((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture:', err);
      } else {
        console.log('\n=== FIN INSPECTION ===');
      }
    });
  }, 1000);
});
