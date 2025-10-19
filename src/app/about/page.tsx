'use client'

import Link from 'next/link'
import { ArrowLeft, Droplets, Globe, Users, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l&apos;accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos de LmaaMap</h1>
          <p className="text-xl text-blue-100">
            Technologie de filtration dernière génération - Présence internationale
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-8 h-8 text-blue-600 mr-3" />
                Notre mission
              </h2>
              <p className="text-gray-700 mb-4">
                LmaaMap déploie un réseau de fontaines d&apos;eau intelligentes pour 
                <strong> révolutionner l&apos;impact environnemental</strong> de l&apos;hydratation mondiale. 
                Nos fontaines connectées mesurent et quantifient la réduction du plastique en temps réel.
              </p>
              <p className="text-gray-700">
                Notre mission est de <strong>combattre la pollution plastique</strong> à travers une 
                infrastructure intelligente qui trace chaque bouteille évitée, déployée via notre réseau de partenaires.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="w-8 h-8 text-green-600 mr-3" />
                Notre vision
              </h2>
              <p className="text-gray-700 mb-4">
                Nous envisageons un monde où <strong>chaque bouteille plastique évitée est mesurée 
                et célébrée</strong>. Nos fontaines connectées créent un impact environnemental 
                quantifiable et transparent via notre réseau de partenaires.
              </p>
              <p className="text-gray-700">
                Notre vision : <strong>un écosystème de données environnementales</strong> qui 
                transforme l&apos;hydratation en acte de préservation planétaire, où chaque utilisateur 
                devient un acteur conscient de la réduction du plastique.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              Rejoignez notre réseau international
            </h2>
            <p className="text-gray-700 mb-8">
              <strong>Chaque utilisation évite une bouteille plastique mesurée en temps réel.</strong> 
              En choisissant LmaaMap, vous participez activement à la lutte contre la pollution 
              plastique avec un impact quantifié et transparent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consumer/register"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Devenir utilisateur
              </Link>
              <Link
                href="/partner/register"
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}