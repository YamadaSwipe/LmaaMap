'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Droplets, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Edit,
  Trash2,
  Search,
  Filter,
  MapPin,
  Wrench,
  Activity
} from 'lucide-react'

interface Fountain {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  status: 'active' | 'maintenance' | 'inactive'
  type: string
  lastMaintenance: string
  nextMaintenance?: string
  totalScans?: number
  quality?: 'excellent' | 'good' | 'fair' | 'poor'
  temperature?: number
  flow?: string
  createdAt: string
}

export default function FountainsManagement() {
  const [fountains, setFountains] = useState<Fountain[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [qualityFilter, setQualityFilter] = useState('all')

  useEffect(() => {
    loadFountains();
  }, []);

  async function loadFountains() {
    try {
      const response = await fetch('/api/admin/management?entity=fountains')
      const data = await response.json()
      if (data.success) {
        setFountains(data.data)
      }
    } catch (error) {
      console.error('Erreur chargement fontaines:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleFountainAction(action: string, fountainId: string) {
    try {
      const response = await fetch('/api/admin/management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, entity: 'fountains', id: fountainId })
      })
      const data = await response.json()
      
      if (data.success) {
        alert(data.message)
        loadFountains()
      }
    } catch (error) {
      console.error('Erreur action fontaine:', error)
      alert('Erreur lors de l\'action')
    }
  }

  const filteredFountains = fountains.filter(fountain => {
    const matchesSearch = fountain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fountain.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || fountain.status === statusFilter
    const matchesQuality = qualityFilter === 'all' || fountain.quality === qualityFilter
    return matchesSearch && matchesStatus && matchesQuality
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-blue-100 text-blue-800'
      case 'good': return 'bg-green-100 text-green-800'
      case 'fair': return 'bg-yellow-100 text-yellow-800'
      case 'poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const isMaintenanceRequired = (nextMaintenance?: string) => {
    if (!nextMaintenance) return false
    const nextDate = new Date(nextMaintenance)
    const today = new Date()
    const diffDays = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    return diffDays <= 7
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <Droplets className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Fontaines</h1>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Droplets className="w-4 h-4" />
              <span>Nouvelle fontaine</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{fountains.length}</p>
              </div>
              <Droplets className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actives</p>
                <p className="text-2xl font-bold text-green-600">
                  {fountains.filter(f => f.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {fountains.filter(f => f.status === 'maintenance').length}
                </p>
              </div>
              <Wrench className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactives</p>
                <p className="text-2xl font-bold text-red-600">
                  {fountains.filter(f => f.status === 'inactive').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Maintenance requise</p>
                <p className="text-2xl font-bold text-orange-600">
                  {fountains.filter(f => isMaintenanceRequired(f.nextMaintenance)).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={qualityFilter}
                onChange={(e) => setQualityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Toutes qualités</option>
                <option value="excellent">Excellente</option>
                <option value="good">Bonne</option>
                <option value="fair">Correcte</option>
                <option value="poor">Mauvaise</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grille des fontaines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Chargement des fontaines...</p>
            </div>
          ) : filteredFountains.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Aucune fontaine trouvée avec ces critères
            </div>
          ) : (
            filteredFountains.map((fountain) => (
              <div key={fountain.id} className="bg-white rounded-lg shadow-sm border p-6">
                {/* Header de la carte */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{fountain.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="truncate">{fountain.address}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(fountain.status)}`}>
                      {fountain.status}
                    </span>
                    {isMaintenanceRequired(fountain.nextMaintenance) && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                        Maintenance requise
                      </span>
                    )}
                  </div>
                </div>

                {/* Informations détaillées */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Qualité de l'eau</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getQualityColor(fountain.quality || 'good')}`}>
                      {fountain.quality || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Type</p>
                    <p className="text-sm font-medium text-gray-900">{fountain.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Température</p>
                    <p className="text-sm font-medium text-gray-900">{fountain.temperature || 'N/A'}°C</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Débit</p>
                    <p className="text-sm font-medium text-gray-900">{fountain.flow || 'N/A'}</p>
                  </div>
                </div>

                {/* Statistiques d'utilisation */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium">Utilisation</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{fountain.totalScans}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Scans au total</p>
                </div>

                {/* Informations de maintenance */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dernière maintenance:</span>
                    <span className="font-medium">
                      {new Date(fountain.lastMaintenance).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prochaine maintenance:</span>
                    <span className={`font-medium ${isMaintenanceRequired(fountain.nextMaintenance) ? 'text-orange-600' : 'text-gray-900'}`}>
                      {fountain.nextMaintenance ? new Date(fountain.nextMaintenance).toLocaleDateString('fr-FR') : 'Non planifiée'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleFountainAction('maintenance', fountain.id)}
                      className="text-yellow-600 hover:text-yellow-900 p-1"
                      title="Programmer maintenance"
                    >
                      <Wrench className="w-4 h-4" />
                    </button>
                    {fountain.status === 'inactive' && (
                      <button 
                        onClick={() => handleFountainAction('activate', fountain.id)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Activer"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        if (confirm(`Êtes-vous sûr de vouloir supprimer ${fountain.name} ?`)) {
                          handleFountainAction('delete', fountain.id)
                        }
                      }}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">
                    Ajoutée le {new Date(fountain.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}