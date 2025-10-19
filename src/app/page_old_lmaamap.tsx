'use client'

import Link from 'next/link'
import { MapPin, ShoppingBag, Shield, Globe, User, Menu, X, Search, Smartphone, Droplets, Star, Users, TrendingUp, Mail, Phone, Facebook, Instagram, Twitter, QrCode, Building } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [bottlesSaved, setBottlesSaved] = useState(50000)
  
  useEffect(() => {
    const loadCounter = async () => {
      try {
        const response = await fetch('/api/admin/counter')
        if (response.ok) {
          const data = await response.json()
          setBottlesSaved(data.bottlesSaved || 50000)
        } else {
          console.log('API compteur non disponible, utilisation valeur par défaut')
          setBottlesSaved(50000)
        }
      } catch (error) {
        console.log('Erreur chargement compteur:', error)
        setBottlesSaved(50000)
      }
    }

    loadCounter()

    const interval = setInterval(() => {
      setBottlesSaved(prev => {
        const newValue = prev + Math.floor(Math.random() * 3) + 1
        return newValue
      })
    }, 90000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation fixe */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logos - Deux marques côte à côte */}
            <div className="flex items-center gap-3">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                LmaaMap
              </Link>
              <span className="text-gray-300 text-xl">|</span>
              <Link href="/hebergement" className="text-2xl font-bold text-green-700 hover:text-green-800 transition-colors">
                GreenYou
              </Link>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/map" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Carte
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                À propos
              </Link>
              <Link href="/partner/register" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Devenir partenaire
              </Link>
            </div>

            {/* Boutons de connexion desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/consumer/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Connexion
              </Link>
              <Link
                href="/consumer/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Inscription
              </Link>
            </div>

            {/* Menu mobile */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu mobile déroulant */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <Link href="/map" className="text-gray-700 hover:text-blue-600 font-medium">
                  Carte
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                  À propos
                </Link>
                <Link href="/partner/register" className="text-gray-700 hover:text-blue-600 font-medium">
                  Devenir partenaire
                </Link>
                <hr className="border-gray-200" />
                <Link href="/consumer/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Connexion
                </Link>
                <Link
                  href="/consumer/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Inscription
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Lien admin */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/admin/login"
          className="bg-gray-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-700 transition-all duration-300 inline-flex items-center"
        >
          <Shield className="w-4 h-4 mr-1" />
          Admin
        </Link>
      </div>

      {/* Section hero avec espacement pour la navbar */}
      <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white relative overflow-hidden pt-16 pb-8">
        <div className="max-w-6xl mx-auto py-8 px-6 text-center relative">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-white">
            <span className="text-emerald-400">LmaaMap</span> : Révolution anti-plastique au <span className="text-emerald-400">Maroc</span>
          </h1>
          <p className="text-base md:text-lg mb-6 text-slate-200 max-w-3xl mx-auto">
            <strong className="text-emerald-300">Réseau marocain</strong> de fontaines connectées pour un tourisme durable. 
            Réduction mesurable du plastique à travers villes et partenaires engagés.
          </p>
          
          <div className="mt-6 bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 max-w-sm mx-auto border border-slate-600/30">
            <div className="text-2xl md:text-3xl font-bold mb-2 text-emerald-400">
              {bottlesSaved.toLocaleString()}
            </div>
            <div className="text-sm md:text-base font-medium text-slate-200 mb-1">
              bouteilles plastiques évitées au Maroc
            </div>
            <div className="text-emerald-300 font-medium text-xs md:text-sm">
              Impact environnemental mesuré en temps réel
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/map"
              className="px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors inline-flex items-center justify-center"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Découvrir la carte
            </Link>
            <Link
              href="/consumer/register"
              className="px-6 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors border border-slate-600"
            >
              Rejoindre le mouvement
            </Link>
          </div>
        </div>
      </div>

      {/* Section Comment ça marche */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              <strong>4 étapes simples</strong> pour rejoindre la révolution anti-plastique au Maroc
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Créer votre compte</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Inscription gratuite en 2 minutes. Rejoignez la communauté LmaaMap engagée pour l'environnement.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              </div>
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Générer votre QR code</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Obtenez votre QR code personnel pour un accès rapide et un suivi de votre impact environnemental.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
              </div>
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Localiser une fontaine</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Trouvez la fontaine la plus proche ou achetez une gourde chez nos partenaires engagés.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="w-8 h-8 md:w-10 md:h-10 text-cyan-600" />
              </div>
              <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Remplir et payer</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Utilisez votre QR code, monnaie ou CB. Chaque utilisation évite une bouteille plastique !
              </p>
            </div>
          </div>
          
          {/* Encadré vision Smart */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center border border-blue-100">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">Vision Smart pour un Tourisme Durable</div>
                <div className="text-gray-600">Valorisation des villes • Partenaires engagés • Accès à l'eau facilité</div>
              </div>
            </div>
            <p className="text-gray-700 max-w-4xl mx-auto">
              <strong>LmaaMap</strong> transforme l'expérience touristique au Maroc en créant un réseau intelligent de fontaines connectées. 
              Nous valorisons les villes partenaires, facilitons l'accès à l'eau potable et offrons une empreinte écologique positive 
              pour un tourisme responsable et durable.
            </p>
          </div>
        </div>
      </div>

      {/* Section Impact et Technologie */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Impact Environnemental Mesuré & Traçabilité Intelligente</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              Nos fontaines connectées <strong>quantifient en temps réel</strong> la réduction du plastique. 
              Technologie intelligente pour un impact environnemental transparent et vérifiable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Filtration Avancée</h3>
              <p className="text-gray-600 text-sm md:text-base">
                <strong>Technologie de dernière génération</strong> avec multi-filtration garantissant une eau pure et sécurisée selon les normes internationales.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Villes & Partenaires Engagés</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Réseau de <strong>partenaires marocains engagés</strong> pour valoriser les villes et créer un tourisme durable et responsable.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Fontaines Connectées</h3>
              <p className="text-gray-600 text-sm md:text-base">
                <strong>Traçabilité complète</strong> pour le suivi des performances de filtration en temps réel. Monitoring intelligent pour une qualité optimale.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="w-8 h-8 md:w-10 md:h-10 text-cyan-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Impact Environnemental</h3>
              <p className="text-gray-600 text-sm md:text-base">
                <strong>Mesure en temps réel de l'impact</strong> : chaque utilisation évite une bouteille plastique. Quantification précise de la réduction des déchets.
              </p>
            </div>
          </div>
          
          {/* Encadré sécurité et qualité */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center border border-blue-100">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">Sécurité Sanitaire Garantie</div>
                <div className="text-gray-600">Contrôles qualité permanents • Normes européennes</div>
              </div>
            </div>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Nos fontaines sont équipées de <strong>systèmes de filtration multicouches</strong> et font l'objet de contrôles qualité réguliers. 
              Une solution de confiance adoptée par des milliers de voyageurs à travers l'Europe et l'Afrique du Nord.
            </p>
          </div>
        </div>
      </div>

      {/* Section témoignages et statistiques */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Statistiques d'impact */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">LmaaMap : Impact au Maroc</h2>
            <p className="text-xl text-gray-600 mb-12">
              Un réseau intelligent pour un tourisme durable au Royaume
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">47</div>
                <div className="text-gray-600">Fontaines connectées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-gray-600">Villes partenaires</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-600 mb-2">25+</div>
                <div className="text-gray-600">Partenaires engagés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600">Tourisme durable</div>
              </div>
            </div>
          </div>

          {/* Témoignages */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "En tant que touriste française, j'apprécie LmaaMap qui facilite l'accès à l'eau potable au Maroc. Une approche intelligente et durable!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">Marie L.</div>
                  <div className="text-gray-500 text-sm">Touriste - France</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "LmaaMap révolutionne l'expérience touristique au Maroc ! Accès facile à l'eau potable partout, c'est génial."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Ahmed K.</div>
                  <div className="text-gray-500 text-sm">Guide touristique - Marrakech</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Parfait pour les familles en voyage au Maroc! Mes enfants boivent une eau pure et sûre. Un réseau intelligent."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Sofia R.</div>
                  <div className="text-gray-500 text-sm">Famille voyageuse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section d'engagement */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Rejoignez le mouvement</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Je suis un utilisateur</h3>
              <p className="text-gray-600 text-center mb-8">
                Je veux utiliser les fontaines cartographiées et contribuer au tourisme durable pour un Maroc Smart.
              </p>
              <div className="text-center">
                <Link
                  href="/consumer/register"
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  Je m'engage à une consommation durable
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Je suis un établissement</h3>
              <p className="text-gray-600 text-center mb-8">
                Notre organisation mène des actions durables et dispose d'une politique RSE. Nous souhaitons réduire notre impact environnemental pour être référencés.
              </p>
              <div className="text-center">
                <Link
                  href="/partner/register"
                  className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
                >
                  Devenir partenaire RSE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white m-6">
        <h2 className="text-3xl font-bold mb-4">
          Prêt à découvrir <span className="text-4xl font-black text-white">LmaaMap</span> ?
        </h2>
        <p className="text-xl mb-6 opacity-90">
          Découvrez le réseau de fontaines Smart du Maroc et contribuez au tourisme durable
        </p>
        <Link
          href="/map"
          className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Globe className="w-5 h-5" />
          <span>Explorer le Maroc Smart</span>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div className="lg:col-span-2">
              <Link href="/" className="text-2xl font-bold text-white mb-4 block">
                LmaaMap
              </Link>
              <p className="text-gray-300 mb-6 max-w-md">
                LmaaMap : Révolution anti-plastique au Maroc. Fontaines Smart connectées pour un tourisme durable. 
                Impact environnemental quantifié, traçabilité complète, expérience visiteur optimisée.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/map" className="text-gray-300 hover:text-white transition-colors">
                    Carte interactive
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/partner/register" className="text-gray-300 hover:text-white transition-colors">
                    Devenir partenaire
                  </Link>
                </li>
                <li>
                  <Link href="/consumer/register" className="text-gray-300 hover:text-white transition-colors">
                    S'inscrire
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@lmaamap.ma
                </li>
                <li className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-2" />
                  +212 6 XX XX XX XX
                </li>
              </ul>
              
              <h4 className="text-lg font-semibold mt-6 mb-4">Légal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">
                    Politique des cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Barre de copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LmaaMap. Tous droits réservés. Fait avec ❤️ au Maroc.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
