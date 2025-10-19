"use client";

import Link from "next/link";
import { ArrowLeft, Leaf, Lightbulb, Recycle, Droplet, Wind, Sun, Users, ShoppingBag, Heart } from "lucide-react";

export default function AmeliorerEmpreintePage() {
  const conseils = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      titre: "Économie d'énergie",
      description: "Réduisez votre consommation énergétique",
      actions: [
        "Installer des ampoules LED à faible consommation",
        "Utiliser des thermostats programmables",
        "Isoler les bâtiments pour réduire les pertes de chaleur",
        "Éteindre les appareils en veille",
        "Installer des détecteurs de présence pour l'éclairage"
      ]
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      titre: "Gestion de l'eau",
      description: "Optimisez votre consommation d'eau",
      actions: [
        "Installer des réducteurs de débit sur les robinets",
        "Utiliser des chasses d'eau à double commande",
        "Récupérer l'eau de pluie pour l'arrosage",
        "Sensibiliser les clients à la réutilisation des serviettes",
        "Détecter et réparer les fuites rapidement"
      ]
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      titre: "Gestion des déchets",
      description: "Réduire, réutiliser, recycler",
      actions: [
        "Mettre en place le tri sélectif (papier, plastique, verre, organique)",
        "Composter les déchets organiques",
        "Privilégier les produits sans emballage ou avec emballages recyclables",
        "Donner les invendus alimentaires à des associations",
        "Utiliser des produits réutilisables (serviettes en tissu, contenants en verre)"
      ]
    },
    {
      icon: <Wind className="w-8 h-8" />,
      titre: "Énergies renouvelables",
      description: "Passez au vert pour votre énergie",
      actions: [
        "Installer des panneaux solaires photovoltaïques",
        "Utiliser un chauffe-eau solaire",
        "Souscrire à un fournisseur d'électricité verte",
        "Installer une petite éolienne si possible",
        "Utiliser des pompes à chaleur géothermiques"
      ]
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      titre: "Approvisionnement local",
      description: "Soutenez l'économie locale et réduisez l'empreinte carbone",
      actions: [
        "Acheter des produits locaux et de saison",
        "Créer des partenariats avec des producteurs de la région",
        "Privilégier les circuits courts",
        "Afficher l'origine des produits sur vos menus",
        "Participer aux marchés locaux"
      ]
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      titre: "Produits écologiques",
      description: "Choisissez des produits respectueux de l'environnement",
      actions: [
        "Utiliser des produits d'entretien écologiques et biodégradables",
        "Proposer des cosmétiques naturels et bio",
        "Utiliser du linge de maison en coton bio ou lin",
        "Éviter les produits jetables (plastique à usage unique)",
        "Choisir des produits avec des labels écologiques certifiés"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      titre: "Sensibilisation",
      description: "Impliquez votre équipe et vos clients",
      actions: [
        "Former votre personnel aux pratiques éco-responsables",
        "Communiquer sur vos engagements écologiques",
        "Afficher des conseils éco-gestes dans les chambres",
        "Organiser des événements de sensibilisation",
        "Créer un livret d'accueil éco-responsable"
      ]
    },
    {
      icon: <Sun className="w-8 h-8" />,
      titre: "Mobilité durable",
      description: "Encouragez les transports écologiques",
      actions: [
        "Installer des bornes de recharge pour véhicules électriques",
        "Proposer des vélos en location ou prêt gratuit",
        "Offrir des informations sur les transports en commun",
        "Organiser du covoiturage pour vos événements",
        "Créer des partenariats avec des services de mobilité verte"
      ]
    }
  ];

  const labels = [
    {
      nom: "Clef Verte",
      description: "Label international de tourisme durable pour les hébergements et restaurants",
      lien: "https://www.laclefverte.org/"
    },
    {
      nom: "Écolabel Européen",
      description: "Certification environnementale officielle de l'Union Européenne",
      lien: "https://www.ecolabel.eu/"
    },
    {
      nom: "Green Globe",
      description: "Certification internationale pour le tourisme durable",
      lien: "https://greenglobe.com/"
    },
    {
      nom: "Bio",
      description: "Labels pour les produits alimentaires biologiques (AB, Eurofeuille)",
      lien: "https://www.agencebio.org/"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/hebergement" className="inline-flex items-center text-white hover:text-green-100 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à GreenYou
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Améliorer votre empreinte écologique</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">
            Découvrez des conseils pratiques et des actions concrètes pour rendre votre établissement plus éco-responsable 
            et contribuer à la préservation de notre planète.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Pourquoi agir maintenant ?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Le secteur de l'hôtellerie et de la restauration a un impact significatif sur l'environnement. 
            En adoptant des pratiques durables, vous réduisez votre empreinte carbone, réalisez des économies 
            et attirez une clientèle de plus en plus sensible aux enjeux écologiques.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">30%</div>
              <p className="text-gray-600">d'économies possibles sur vos factures d'énergie</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">70%</div>
              <p className="text-gray-600">des voyageurs préfèrent des hébergements éco-responsables</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600">de satisfaction à contribuer à un avenir durable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conseils pratiques */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            8 domaines d'action pour réduire votre impact
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {conseils.map((conseil, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-full text-green-600">
                    {conseil.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{conseil.titre}</h3>
                    <p className="text-gray-600 text-sm">{conseil.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {conseil.actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labels et certifications */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Labels et certifications écologiques
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Obtenez une reconnaissance officielle de vos efforts en faveur de l'environnement
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {labels.map((label, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-green-700 mb-2">{label.nom}</h3>
                <p className="text-gray-600 mb-4">{label.description}</p>
                <a
                  href={label.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  En savoir plus →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à passer à l'action ?</h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez GreenYou et faites partie du réseau d'établissements éco-responsables
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hebergement/demande-referencement"
              className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-green-50 transition-colors font-bold text-lg inline-flex items-center justify-center"
            >
              <Leaf className="w-5 h-5 mr-2" />
              Demander mon référencement
            </Link>
            <Link
              href="/hebergement"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-green-600 transition-colors font-bold text-lg"
            >
              Découvrir GreenYou
            </Link>
          </div>
        </div>
      </section>

      {/* Ressources complémentaires */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Ressources utiles</h2>
          <div className="bg-green-50 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">📚 Guides et documentation</h3>
              <ul className="space-y-1 text-gray-700 ml-4">
                <li>• Guide ADEME : Tourisme et développement durable</li>
                <li>• Charte d'engagement pour l'hôtellerie durable</li>
                <li>• Calculateur d'empreinte carbone pour établissements</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">🤝 Partenaires et réseaux</h3>
              <ul className="space-y-1 text-gray-700 ml-4">
                <li>• Réseau Hôtellerie et Restauration Responsables</li>
                <li>• Green Food Project - Restauration durable</li>
                <li>• Collectif des Acteurs du Tourisme Responsable</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">💰 Aides et financements</h3>
              <ul className="space-y-1 text-gray-700 ml-4">
                <li>• Subventions ADEME pour la transition énergétique</li>
                <li>• Crédit d'impôt pour la rénovation énergétique</li>
                <li>• Prêts verts pour les investissements durables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
