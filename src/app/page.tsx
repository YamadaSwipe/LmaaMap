'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Droplet, Leaf, MapPin, Heart, Users, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

export default function ParenteseYouHome() {
  const [stats, setStats] = useState({
    bouteilles: 0,
    etablissements: 0,
    voyageurs: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        bouteilles: prev.bouteilles < 125000 ? prev.bouteilles + 500 : 125000,
        etablissements: prev.etablissements < 150 ? prev.etablissements + 1 : 150,
        voyageurs: prev.voyageurs < 8500 ? prev.voyageurs + 50 : 8500
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo ParenteseYou */}
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                ParenteseYou
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/lmaamap" 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                <Droplet className="w-5 h-5" />
                LmaaMap
              </Link>
              <Link 
                href="/map" 
                className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Carte
              </Link>
              <Link 
                href="/hebergement" 
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                <Leaf className="w-5 h-5" />
                GreenYou
              </Link>
              <Link 
                href="/greenyou/annuaire" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Annuaire
              </Link>
            </div>

            {/* CTA Button */}
            <Link 
              href="/hebergement/demande-referencement"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Rejoindre
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
              ParenteseYou
            </h1>

          <p className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6">
            Faites une pause pour la planète
          </p>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Voyagez autrement au Maroc : <span className="text-blue-600 font-semibold">trouvez des points d'eau de qualité</span> et <span className="text-green-600 font-semibold">découvrez des établissements qui transforment le tourisme</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/lmaamap"
              className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all transform hover:scale-105"
            >
              <Droplet className="w-6 h-6" />
              LmaaMap
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              href="/hebergement"
              className="group flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all transform hover:scale-105"
            >
              <Leaf className="w-6 h-6" />
              GreenYou
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          {/* Bouton Carte mis en valeur */}
          <Link
            href="/map"
            className="group flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transition-all transform hover:scale-105 mt-4 sm:mt-0"
            style={{ minWidth: '220px' }}
          >
            <MapPin className="w-6 h-6" />
            Carte
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          </div>

          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi agir maintenant ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Le tourisme de masse a un impact. Ensemble, changeons la donne au Maroc.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🏖️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pollution Plastique</h3>
              <div className="text-6xl font-extrabold text-red-600 mb-4">1M</div>
              <p className="text-gray-700 leading-relaxed">
                <strong>1 million</strong> de bouteilles plastiques vendues par minute dans le monde.
                Au Maroc, <strong>8%</strong> des déchets sont du plastique.
              </p>
              <p className="mt-4 text-red-700 font-semibold">
                Le plastique met 450 ans à se décomposer.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg border-2 border-blue-100 hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">💧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualité de l'Eau</h3>
              <div className="text-6xl font-extrabold text-blue-600 mb-4">x1000</div>
              <p className="text-gray-700 leading-relaxed">
                L'eau en bouteille coûte jusqu'à <strong>1000 fois plus cher</strong> que l'eau du robinet.
              </p>
              <p className="mt-4 text-blue-700 font-semibold">
                Développer des points d'eau de qualité, c'est offrir une expérience responsable aux voyageurs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border-2 border-green-100 hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tourisme Durable</h3>
              <div className="text-6xl font-extrabold text-green-600 mb-4">8%</div>
              <p className="text-gray-700 leading-relaxed">
                Le tourisme génère <strong>8%</strong> des émissions mondiales de CO2.
              </p>
              <p className="mt-4 text-green-700 font-semibold">
                Le tourisme responsable au Maroc crée des emplois locaux et préserve notre patrimoine naturel et culturel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos Solutions pour Voyager Responsable
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deux plateformes complémentaires pour transformer votre expérience de voyage au Maroc
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/lmaamap" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 text-white h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/20 p-4 rounded-2xl">
                    <Droplet className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">LmaaMap</h3>
                    <p className="text-blue-100">Plateforme eau responsable</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Points d'eau de <strong>haute qualité</strong> au Maroc</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Fontaines publiques et partenaires</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Géolocalisation en temps réel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-lg"><strong>Réduisez votre empreinte plastique</strong></span>
                  </li>
                </ul>

                <div className="flex items-center gap-3 text-lg font-semibold group-hover:gap-5 transition-all">
                  Découvrir LmaaMap
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </Link>

            <Link href="/hebergement" className="group">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 text-white h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/20 p-4 rounded-2xl">
                    <Leaf className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">GreenYou Maroc</h3>
                    <p className="text-green-100">Réseau éco-responsable</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Hébergements <strong>éco-certifiés</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Restaurants bio et locavores</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Lieux touristiques engagés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-lg"><strong>Impact social positif</strong></span>
                  </li>
                </ul>

                <div className="flex items-center gap-3 text-lg font-semibold group-hover:gap-5 transition-all">
                  Découvrir l'annuaire
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Notre Impact au Maroc
            </h2>
            <p className="text-xl text-gray-600">
              Des chiffres qui parlent, une communauté qui grandit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
              <div className="text-6xl mb-4">♻️</div>
              <div className="text-5xl font-extrabold text-blue-600 mb-2">
                {stats.bouteilles.toLocaleString()}+
              </div>
              <p className="text-xl font-semibold text-gray-700">
                Bouteilles plastiques<br />économisées
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-6xl mb-4">🌿</div>
              <div className="text-5xl font-extrabold text-green-600 mb-2">
                {stats.etablissements}+
              </div>
              <p className="text-xl font-semibold text-gray-700">
                Établissements<br />éco-responsables
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl">
              <div className="text-6xl mb-4">👥</div>
              <div className="text-5xl font-extrabold text-cyan-600 mb-2">
                {stats.voyageurs.toLocaleString()}+
              </div>
              <p className="text-xl font-semibold text-gray-700">
                Voyageurs<br />engagés
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comment Voyager Responsable ?
            </h2>
            <p className="text-xl text-gray-600">
              3 étapes simples pour transformer votre voyage au Maroc
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Découvrez</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explorez la <strong>carte LmaaMap</strong> pour localiser des points d'eau de qualité près de vous
              </p>
              <div className="mt-4 text-blue-600">
                <MapPin className="w-12 h-12 mx-auto" />
              </div>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Agissez</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Soutenez les <strong>établissements GreenYou</strong> qui s'engagent pour un tourisme durable
              </p>
              <div className="mt-4 text-green-600">
                <Heart className="w-12 h-12 mx-auto" />
              </div>
            </div>

            <div className="text-center">
              <div className="bg-cyan-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Partagez</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Inspirez d'autres voyageurs à <strong>adopter une démarche responsable</strong> au Maroc
              </p>
              <div className="mt-4 text-cyan-600">
                <Users className="w-12 h-12 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-green-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à transformer votre voyage au Maroc ?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Rejoignez des milliers de voyageurs qui ont fait le choix d'un tourisme responsable
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/lmaamap"
              className="group flex items-center justify-center gap-3 bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
            >
              <Droplet className="w-7 h-7" />
              Commencer avec LmaaMap
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link 
              href="/hebergement"
              className="group flex items-center justify-center gap-3 bg-white text-green-600 hover:bg-green-50 px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
            >
              <Leaf className="w-7 h-7" />
              Découvrir GreenYou
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="mt-16 pt-12 border-t border-white/20">
            <p className="text-lg mb-4 opacity-90">Vous êtes un établissement éco-responsable au Maroc ?</p>
            <Link 
              href="/hebergement/demande-referencement"
              className="inline-flex items-center gap-2 text-white hover:text-cyan-100 font-semibold text-lg underline underline-offset-4"
            >
              <Sparkles className="w-5 h-5" />
              Rejoignez le réseau GreenYou
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                ParenteseYou
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Faites une pause pour la planète. Voyagez responsable au Maroc avec LmaaMap et GreenYou.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Nos Plateformes</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/lmaamap" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Droplet className="w-4 h-4" />
                    LmaaMap - Plateforme eau
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Carte Interactive
                  </Link>
                </li>
                <li>
                  <Link href="/hebergement" className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2">
                    <Leaf className="w-4 h-4" />
                    GreenYou Maroc
                  </Link>
                </li>
                <li>
                  <Link href="/greenyou/annuaire" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Annuaire Éco
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Rejoignez-nous</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/hebergement/demande-referencement" className="text-gray-400 hover:text-white transition-colors">
                    Établissements : Rejoindre GreenYou
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="text-gray-400 hover:text-white transition-colors">
                    Espace Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ParenteseYou - LmaaMap & GreenYou Maroc. Tous droits réservés.</p>
            <p className="mt-2 text-sm">🇲🇦 Fait avec ❤️ pour un Maroc plus durable</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
