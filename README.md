# 🚰 LmaaMap

**Plateforme de localisation de points d'eau au Maroc et en France**

## 🌟 Fonctionnalités

### ✅ **Système complet d'inscription**
- 👥 Inscription consommateur avec validation email
- 💳 Intégration paiements Stripe
- 🔐 Authentification sécurisée
- 📱 Génération de QR codes personnalisés

### 🗺️ **Carte interactive enrichie**
- **90+ points d'eau** à travers le Maroc et la France
- **Couverture géographique complète** :
  - 🇲🇦 **Maroc** : Tanger → Dakhla (provinces sahariennes incluses)
  - 🇫🇷 **France** : Paris, Lyon, Marseille, Toulouse...
- 🎯 **Types de points** : Fontaines publiques, hôtels partenaires, cafés
- ⚡ **Performance optimisée** : Affichage immédiat + chargement API en arrière-plan

### 📊 **Dashboards avancés**
- 👤 **Client** : Suivi des crédits, historique des scans
- 👑 **Admin** : Analytics, gestion utilisateurs, suivi financier
- 📈 **Métriques temps réel** : Revenus, utilisateurs actifs, usage

### 🔧 **Fonctionnalités techniques**
- 📱 **Scan QR codes** avec validation
- 🌐 **API REST** optimisée
- 🗃️ **Base de données** Prisma + SQLite
- 🎨 **Interface responsive** avec Next.js 15

## 🚀 Technologies

- **Frontend** : Next.js 15, React 19, TypeScript
- **Backend** : API Routes, Prisma ORM
- **Base de données** : SQLite
- **Paiements** : Stripe
- **Cartes** : Leaflet, OpenStreetMap
- **Authentification** : NextAuth.js
- **Styling** : Tailwind CSS

## 🗺️ Couverture géographique

### 🇲🇦 Maroc (Nord → Sud)
- **Nord** : Tanger, Tétouan, Chefchaouen
- **Centre** : Casablanca, Rabat, Fès, Meknès
- **Atlas & Désert** : Marrakech, Ouarzazate, Merzouga
- **Sud Saharien** : Laâyoune, Dakhla, Guelmim, Smara

### 🇫🇷 France (Principales villes)
- Paris, Lyon, Marseille, Toulouse, Nice, Bordeaux
- Strasbourg, Lille, Nantes, Montpellier, Rennes

## 🛠️ Installation

```bash
# Cloner le repository
git clone https://github.com/YamadaSwipe/LmaaMap.git
cd LmaaMap

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les clés API (Stripe, base de données, etc.)

# Initialiser la base de données
npx prisma generate
npx prisma db push

# Lancer le serveur de développement
npm run dev
```

## 📁 Structure du projet

```
LmaaMap/
├── src/
│   ├── app/                 # Pages Next.js App Router
│   │   ├── map/            # Carte interactive
│   │   ├── admin/          # Dashboard admin
│   │   ├── consumer/       # Espace client
│   │   └── api/            # API Routes
│   ├── components/         # Composants React
│   ├── lib/               # Utilitaires et configurations
│   └── types/             # Types TypeScript
├── prisma/                # Schéma base de données
├── public/                # Assets statiques
└── scripts/               # Scripts de maintenance
```

## 🔑 Variables d'environnement

```env
# Base de données
DATABASE_URL="file:./dev.db"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# NextAuth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

## 🚦 Utilisation

1. **Visitez** `http://localhost:3000`
2. **Explorez la carte** avec 90+ points d'eau
3. **Inscrivez-vous** comme consommateur
4. **Effectuez un paiement** pour obtenir des crédits
5. **Scannez des QR codes** aux points d'eau
6. **Consultez votre dashboard** client

## 👨‍💼 Administration

- **URL Admin** : `/admin/login`
- **Fonctionnalités** : Gestion utilisateurs, analytics, audit
- **Dashboard** : Métriques temps réel et suivi financier

## 📈 Statistiques

- ✅ **90+ points d'eau** référencés
- 🌍 **2 pays** couverts (Maroc + France)
- 🏙️ **50+ villes** incluses
- 🗺️ **Couverture complète** : Nord → Sud du Maroc

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **OpenStreetMap** pour les données cartographiques
- **Overpass API** pour l'accès aux données OSM
- **Stripe** pour l'infrastructure de paiement
- **Leaflet** pour la cartographie interactive

---

**🚰 LmaaMap** - *Trouvez de l'eau pure où que vous soyez au Maroc et en France* 💧
