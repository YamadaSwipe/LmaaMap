#!/bin/bash
# Script de sauvegarde automatique pour LmaaMap
# À exécuter avant toute modification importante

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/backup_$DATE"

echo "🔄 Création de la sauvegarde..."
mkdir -p $BACKUP_DIR

# Sauvegarder le code source
cp -r src/ $BACKUP_DIR/
cp -r prisma/ $BACKUP_DIR/
cp package.json $BACKUP_DIR/
cp next.config.* $BACKUP_DIR/

# Sauvegarder la base de données
cp prisma/dev.db $BACKUP_DIR/

echo "✅ Sauvegarde créée dans $BACKUP_DIR"
echo "📁 Contient: src/, prisma/, package.json, base de données"
