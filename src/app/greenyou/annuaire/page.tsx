'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowLeft, MapPin, Phone, Mail, Globe, Search, Filter, Leaf } from 'lucide-react'

interface GreenYouPlace {
  id: string
  nom: string
  type: string
  email: string
  telephone: string
  adresse: string
  codePostal: string
  ville: string
  pays: string
  latitude: number
  longitude: number
  description: string
  pratiquesEco: string
  labelsCertifications: string
  siteWeb?: string
  reseauxSociaux?: string
  isActive: boolean
}

export default function AnnuaireGreenYou() {
  const [places, setPlaces] = useState<GreenYouPlace[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterVille, setFilterVille] = useState<string>('all')

  useEffect(() => {
    fetchPlaces()
  }, [])

  const fetchPlaces = async () => {
    try {
      const response = await fetch('/api/greenyou-places')
      const data = await response.json()
      
      if (data.success && data.places) {
        setPlaces(data.places.filter((p: GreenYouPlace) => p.isActive))
      }
    } catch (error) {
      console.error('Erreur chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filtrer les établissements
  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || place.type === filterType
    const matchesVille = filterVille === 'all' || place.ville === filterVille
    return matchesSearch && matchesType && matchesVille
  })

  // Obtenir les types uniques
  const types = Array.from(new Set(places.map(p => p.type)))
  const villes = Array.from(new Set(places.map(p => p.ville))).sort()

  // Fonction pour obtenir l'émoji par type
  const getTypeEmoji = (type: string) => {
    if (type.includes('Hôtel') || type.includes('Gîte') || type.includes('hôtes')) return '🏨'
    if (type.includes('Restaurant') || type.includes('Café') || type.includes('Bar')) return '🍽️'
    if (type.includes('Musée') || type.includes('Parc') || type.includes('Site')) return '🏛️'
    if (type.includes('yoga') || type.includes('Spa') || type.includes('Sport')) return '🧘'
    return '🌿'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'annuaire GreenYou...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                ParenteseYou
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                href="/hebergement" 
                className="text-green-600 hover:text-green-700 transition-colors font-medium"
              >
                GreenYou
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {/* Badge Maroc supprimé */}
            </div>
          </div>
          
          <div className="text-center mb-6">
            <div className="relative inline-block mb-2">
              <h1 className="text-3xl font-bold text-green-700 flex items-center justify-center gap-3">
                <Leaf className="w-8 h-8" />
                Annuaire GreenYou
              </h1>
            </div>
            <p className="text-gray-600">
              {filteredPlaces.length} établissement{filteredPlaces.length > 1 ? 's' : ''} éco-responsable{filteredPlaces.length > 1 ? 's' : ''} référencé{filteredPlaces.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un établissement, une ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filtre Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="all">Tous les types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Filtre Ville */}
            <select
              value={filterVille}
              onChange={(e) => setFilterVille(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="all">Toutes les villes</option>
              {villes.map(ville => (
                <option key={ville} value={ville}>{ville}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste des établissements */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun établissement trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Header de la card */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold flex-1">{place.nom}</h3>
                    <span className="text-3xl ml-2">{getTypeEmoji(place.type)}</span>
                  </div>
                  <p className="text-sm text-green-100 mt-1">{place.type}</p>
                </div>

                {/* Contenu */}
                <div className="p-4 space-y-3">
                  {/* Description */}
                  {place.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">{place.description}</p>
                  )}

                  {/* Pratiques éco */}
                  {place.pratiquesEco && (
                    <div className="flex items-start gap-2">
                      <Leaf className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-500 line-clamp-2">{place.pratiquesEco}</p>
                    </div>
                  )}

                  {/* Labels */}
                  {place.labelsCertifications && (
                    <div className="flex flex-wrap gap-1">
                      {place.labelsCertifications.split(',').map((label, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {label.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="border-t pt-3 space-y-2">
                    {/* Adresse */}
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{place.adresse}, {place.ville}</span>
                    </div>

                    {/* Téléphone */}
                    {place.telephone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${place.telephone}`} className="text-green-600 hover:underline">
                          {place.telephone}
                        </a>
                      </div>
                    )}

                    {/* Email */}
                    {place.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a href={`mailto:${place.email}`} className="text-green-600 hover:underline truncate">
                          {place.email}
                        </a>
                      </div>
                    )}

                    {/* Site Web */}
                    {place.siteWeb && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <a
                          href={place.siteWeb}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline truncate"
                        >
                          Site web
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Bouton voir sur la carte */}
                  <Link
                    href={`/map?lat=${place.latitude}&lng=${place.longitude}`}
                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium text-sm"
                  >
                    Voir sur la carte
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t mt-12 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vous êtes un établissement éco-responsable au Maroc ?
          </h2>
          <p className="text-gray-600 mb-6">
            Rejoignez le réseau GreenYou et gagnez en visibilité auprès des voyageurs engagés
          </p>
          <Link
            href="/hebergement/demande-referencement"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            <Leaf className="w-5 h-5" />
            Demander mon référencement
          </Link>
        </div>
      </div>
    </div>
  )
}
