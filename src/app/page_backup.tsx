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
      setBottlesSaved(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 90000); // 90 secondes = 1 minute 30
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="min-h-screen bg-white">
      {/* Toutes les sections sont ici, bien imbriquées */}
      {/* ...existing code... */}
    </div>
  );
}

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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Trouvez le point d'eau le plus proche</h2>
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
              <p className="text-gray-600">Créez un compte pour générer votre QR code personnel <strong>OU</strong> rendez-vous directement dans une fontaine partenaire</p>
            </div>
            {/* ... autres étapes ... */}
          </div>
        </div>