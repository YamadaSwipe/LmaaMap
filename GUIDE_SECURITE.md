# 🛡️ Guide de Développement Sécurisé - LmaaMap

## ⚠️ RÈGLES D'OR (pour éviter la catastrophe !)

### Avant TOUTE modification importante :

1. **📦 SAUVEGARDE OBLIGATOIRE**
   ```bash
   # Windows
   scripts\backup-project.bat
   
   # Ou manuellement
   xcopy src backups\src_backup_%date% /E /I
   copy prisma\dev.db backups\
   ```

2. **🧪 TESTER sur une COPIE**
   - Ne jamais modifier directement le projet principal
   - Créer une branche Git ou une copie du dossier
   - Tester les changements sur la copie

3. **📝 DOCUMENTER les changements**
   - Noter ce que vous modifiez et pourquoi
   - Garder une liste des étapes de récupération

## 🚫 À NE JAMAIS FAIRE :

❌ Supprimer NextAuth sans plan de migration complet
❌ Modifier le schéma de base sans sauvegarde
❌ Faire des changements multiples simultanément
❌ Ignorer les erreurs de compilation

## ✅ Procédure sécurisée pour l'authentification :

### Si problème NextAuth :
1. **Analyser** le problème exact (URL, erreur)
2. **Sauvegarder** le projet
3. **Tester** les corrections sur la copie
4. **Documenter** la solution
5. **Appliquer** progressivement

### Alternatives à NextAuth :
- Système custom avec JWT (plus simple)
- Auth0 (externe, plus stable)
- Supabase Auth (intégré)

## 🔧 Outils de diagnostic :

### Vérifier l'état du projet :
```bash
npm run build    # Vérifier compilation
npm run lint     # Vérifier syntaxe
node scripts/inspect-database.js  # État DB
```

### Restaurer rapidement :
```bash
# Depuis une sauvegarde
xcopy backups\backup_YYYYMMDD\src src /E /I /Y
copy backups\backup_YYYYMMDD\dev.db prisma\
```

## 📞 Plan de récupération d'urgence :

1. **Arrêter** immédiatement les modifications
2. **Identifier** la dernière version fonctionnelle
3. **Restaurer** depuis la sauvegarde
4. **Analyser** ce qui a mal tourné
5. **Planifier** une approche alternative

---

**💡 Leçon retenue** : Un problème simple d'auth peut devenir catastrophique sans préparation. 
**🎯 Objectif** : Plus jamais perdre des heures à cause d'un manque de précaution !
