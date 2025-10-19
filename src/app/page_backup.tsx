'use client'

import Link from 'next/link'
import { MapPin, Droplets, Smartphone, Users, Shield, Globe, CreditCard, QrCode, ArrowRight, Play, Star, Award, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const [bottlesSaved, setBottlesSaved] = useState(50000)
  
  useEffect(() => {
    // Charger la valeur initiale du compteur depuis l'API
    const loadCounter = async () => {
      try {
        const response = await fetch('/api/admin/counter')
        const data = await response.json()
        setBottlesSaved(data.bottlesSaved || 50000)
      } catch (error) {
        console.error('Erreur chargement compteur:', error)
      }
    }

    loadCounter()

    // Simulation du compteur qui s'incrémente toutes les 1 minute 30 secondes
    const interval = setInterval(() => {
      setBottlesSaved(prev => {
        const newValue = prev + Math.floor(Math.random() * 3) + 1
        // Optionnel: mettre à jour la valeur sur le serveur périodiquement
        // fetch('/api/admin/counter', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ action: 'set', value: newValue })
        // })
        return newValue
      })
    }, 90000) // 90 secondes = 1 minute 30
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Bouton Admin en bas à droite */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/admin/login"
          className="bg-gray-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-700 transition-all duration-300 inline-flex items-center"
        >
          <Shield className="w-4 h-4 mr-1" />
          Admin
        </Link>
      </div>

      {/* Hero Section - Bannière principale inspirée du site */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white relative overflow-hidden">
        {/* Éléments décoratifs d'arrière-plan */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto py-16 px-6 text-center relative">
          <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
            Des solutions pour s'hydrater sans plastique au <span className="text-yellow-300">Maroc</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Trouvez des points d'eau potable partout au Maroc avec <strong className="text-yellow-300">LmaaMap</strong> et rejoignez le mouvement zéro déchet
          </p>
          
          {/* Compteur d'impact - style du site original */}
          <div className="mt-12 bg-white/15 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto border border-white/20">
            <div className="text-7xl font-black mb-3 animate-pulse text-yellow-300 drop-shadow-lg">
              {bottlesSaved.toLocaleString()}
            </div>
            <div className="text-xl font-bold text-white drop-shadow-md mb-2">
              bouteilles évitées sur un an
            </div>
            <div className="text-yellow-200 font-medium text-lg">
              Rejoignez le mouvement
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 inline-flex items-center justify-center text-lg"
            >
              <MapPin className="w-6 h-6 mr-2" />
              Trouvez le point d'eau le plus proche
            </Link>
            <Link
              href="/consumer/register"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/30 transition-all duration-300 inline-flex items-center justify-center text-lg border border-white/30"
            >
              <Users className="w-6 h-6 mr-2" />
              Je m'engage
            </Link>
          </div>
        </div>
      </div>

      {/* Section "Je m'engage" - Inspirée du site original */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Je m'engage</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Particuliers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Je suis un particulier</h3>
              <p className="text-gray-600 text-center mb-8">
                Je souhaite m'engager à réduire ma consommation de bouteilles plastiques au Maroc.
              </p>
              <div className="text-center">
                <Link
                  href="/consumer/register"
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  Je m'engage
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>

            {/* Organisations */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Je suis une organisation</h3>
              <p className="text-gray-600 text-center mb-8">
                Je m'engage à réduire les bouteilles en plastique via notre politique RSE et nos achats.
              </p>
              <div className="text-center">
                <Link
                  href="/partner/register"
                  className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
                >
                  Mon organisation s'engage
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Solutions - Inspirée du site original */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Des solutions pour se passer de bouteilles plastiques</h2>
            <p className="text-xl text-gray-600">Des alternatives pour s'hydrater sans plastique à usage unique</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Eau Filtrée Certifiée</h3>
              <p className="text-gray-600 mb-6">
                Accès à une eau filtrée aux normes européennes pour seulement 2 DH dans nos points partenaires
              </p>
              <div className="text-blue-600 font-semibold">Filtration</div>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Points d'Eau Intelligents</h3>
              <p className="text-gray-600 mb-6">
                Utilisez notre application pour localiser et déverrouiller des fontaines intelligentes
              </p>
              <div className="text-green-600 font-semibold">Technologie</div>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Tourisme Durable</h3>
              <p className="text-gray-600 mb-6">
                Valorisons les établissements engagés dans des actions durables pour un tourisme responsable
              </p>
              <div className="text-purple-600 font-semibold">Durabilité</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/map"
              className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              Voir toutes les solutions
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Section Carte - Inspirée du site original */}
      <div className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Trouvez le point d'eau le plus proche
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                La carte interactive recense les points d'eau au Maroc. 
                Rendez-vous au point d'eau le plus proche pour remplir votre gourde auprès d'une 
                fontaine d'eau potable publique ou d'un établissement partenaire de la réduction plastique.
              </p>
              <Link
                href="/map"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center text-lg"
              >
                <MapPin className="w-6 h-6 mr-2" />
                Consultez la carte
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-24 h-24 text-blue-600" />
              </div>
              <div className="mt-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Points d'eau disponibles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-3xl font-black text-gray-900">LmaaMap</span>
            <span className="text-gray-700"> en chiffres</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2+</div>
              <div className="text-gray-600">Points d'eau</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1+</div>
              <div className="text-gray-600">Villes couvertes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">0+</div>
              <div className="text-gray-600">Scans effectués</div>
            </div>
          </div>
        </div>

        {/* Section Partenaires */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nos Partenaires <span className="text-green-600">Éco-Responsables</span>
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez les établissements marocains engagés dans le tourisme durable et la protection environnementale.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Partenaire 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">🏨</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Riad Bleu Marrakech</h3>
              <p className="text-gray-600 text-sm mb-3">Hôtel éco-responsable au cœur de la médina</p>
              <div className="flex justify-center space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Certifié</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">24h/24</span>
              </div>
            </div>

            {/* Partenaire 2 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">⛲</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Fontaine Jemaa el-Fna</h3>
              <p className="text-gray-600 text-sm mb-3">Point d'eau public en plein cœur de Marrakech</p>
              <div className="flex justify-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">2 DH</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Public</span>
              </div>
            </div>

            {/* Partenaire 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">🍃</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Café Eco-Friendly</h3>
              <p className="text-gray-600 text-sm mb-3">Restaurant zéro déchet avec point d'eau filtré</p>
              <div className="flex justify-center space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Bio</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">2 DH</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/map" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              Voir tous nos partenaires sur la carte
              <MapPin className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Section Consommateurs */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-16 border border-cyan-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-cyan-800">
              💧 Votre Porte-Monnaie Numérique LmaaMap
            </h2>
            <p className="text-xl mb-6 max-w-3xl mx-auto text-cyan-700">
              Créez votre compte, rechargez vos crédits par carte bancaire et accédez instantanément 
              à l'eau filtrée partout au Maroc avec votre QR code personnel !
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Recharge facile</h3>
                <p className="text-gray-600 text-sm">
                  Rechargez votre compte en ligne par carte bancaire. Paiement sécurisé en quelques clics.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">QR Code unique</h3>
                <p className="text-gray-600 text-sm">
                  Recevez votre QR code personnel pour accéder à toutes les fontaines du réseau.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Suivi en temps réel</h3>
                <p className="text-gray-600 text-sm">
                  Consultez votre solde, historique et impact environnemental depuis votre espace.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Comment ça marche ?</h3>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                  <p>Créez votre compte LmaaMap</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                  <p>Rechargez par carte bancaire</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                  <p>Recevez votre QR code</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
                  <p>Scannez sur toute fontaine</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consumer/dashboard"
                className="border-2 border-cyan-600 text-cyan-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cyan-600 hover:text-white transition-colors inline-flex items-center justify-center"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Mon espace client
              </Link>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-lg p-8 mb-16 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-4xl font-black text-white">
                LmaaMap
              </span>
              <br />
              <span className="text-2xl">Notre Mission Environnementale</span>
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto opacity-90">
              Réduire la pollution plastique au Maroc en offrant un accès facile à l'eau filtrée de qualité européenne. 
              Nous valorisons les établissements engagés dans le tourisme durable et l'action environnementale.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🌍</div>
                <h3 className="font-semibold mb-2">Écologie</h3>
                <p className="text-sm opacity-90">Réduction drastique des déchets plastiques</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏨</div>
                <h3 className="font-semibold mb-2">Partenaires Durables</h3>
                <p className="text-sm opacity-90">Valorisation des établissements éco-responsables</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚰</div>
                <h3 className="font-semibold mb-2">Qualité EU</h3>
                <p className="text-sm opacity-90">Filtration aux normes européennes à 2 DH</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Devenir Partenaire */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 mb-16 border border-green-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-800">
              🤝 Rejoignez le Réseau LmaaMap
            </h2>
            <p className="text-xl mb-6 max-w-3xl mx-auto text-green-700">
              Vous êtes propriétaire d'un hôtel, restaurant, café ou commerce ? 
              Rejoignez notre réseau et participez à la révolution écologique du tourisme marocain !
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">💰</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Revenus Supplémentaires</h3>
                <p className="text-gray-600 text-sm">
                  Générez des revenus avec chaque remplissage (2 DH) tout en attirant une clientèle éco-responsable
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">📱</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Visibilité Digitale</h3>
                <p className="text-gray-600 text-sm">
                  Votre établissement sera visible sur notre carte avec toutes vos informations commerciales
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/partner/register"
                className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center"
              >
                <Shield className="w-5 h-5 mr-2" />
                Inscription Gratuite
              </Link>
              <Link
                href="/admin/dashboard"
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 hover:text-white transition-colors inline-flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Espace Partenaire
              </Link>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2">Créez votre accès</h3>
              <p className="text-gray-600">Créez un compte pour générer votre QR code personnel <strong>OU</strong> rendez-vous directement dans une fontaine partenaire pour commencer</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2">Consommez de l'eau durable</h3>
              <p className="text-gray-600">Chaque utilisation évite une bouteille plastique et enrichit le compteur global</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2">Impact mesuré</h3>
              <p className="text-gray-600">Suivez votre contribution à la réduction de la pollution plastique en temps réel</p>
            </div>
          </div>
          
          {/* Real-time contribution info */}
          <div className="mt-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">💚 Votre Impact à Chaque Utilisation</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">+1</div>
                <div className="text-sm text-gray-600">Bouteille plastique évitée</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">-500g</div>
                <div className="text-sm text-gray-600">CO2 économisé</div>
              </div>
            </div>
          </div>
        </div>

        {/* How it works - Section 2 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Comment ça marche ? - Pour les Partenaires</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2">Rejoignez le réseau</h3>
              <p className="text-gray-600">Inscrivez votre établissement gratuitement pour devenir un point d'eau partenaire LmaaMap</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2">Installez votre fontaine</h3>
              <p className="text-gray-600">Recevez votre fontaine connectée et votre QR code unique pour accueillir les clients</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2">Générez de la valeur</h3>
              <p className="text-gray-600">Attirez une clientèle éco-responsable et valorisez votre engagement environnemental</p>
            </div>
          </div>
          
          {/* Business benefits info */}
          <div className="mt-12 bg-gradient-to-r from-orange-100 to-green-100 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">🏪 Avantages pour votre Établissement</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">+30%</div>
                <div className="text-sm text-gray-600">Clients éco-responsables</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Gratuit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à découvrir{' '}
            <span className="text-4xl font-black text-white">LmaaMap</span>
            {' '}?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Rejoignez le mouvement pour des actions durables au Maroc
          </p>
          <Link
            href="/map"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Globe className="w-5 h-5" />
            <span>Commencer maintenant</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
