'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Search, 
  Download,
  Eye,
  User,
  Shield,
  Activity,
  Calendar
} from 'lucide-react'

interface AuditLog {
  id: string
  timestamp: Date
  adminId: string
  adminName: string
  action: string
  entity: string
  entityId: string
  details: string
  ipAddress: string
  success: boolean
}

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [entityFilter, setEntityFilter] = useState('all')
  const [actionFilter, setActionFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('7d')

  useEffect(() => {
    loadAuditLogs()
  }, [entityFilter, actionFilter, dateFilter, loadAuditLogs])

  async function loadAuditLogs() {
    try {
      const params = new URLSearchParams()
      if (entityFilter !== 'all') params.append('entity', entityFilter)
      if (actionFilter !== 'all') params.append('action', actionFilter)
      if (dateFilter !== 'all') params.append('period', dateFilter)

      // Pour l'instant, utilisons des données simulées
      const mockLogs: AuditLog[] = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          adminId: 'admin-001',
          adminName: 'Admin Système',
          action: 'CREATE',
          entity: 'fountains',
          entityId: 'fountain-001',
          details: 'Création nouvelle fontaine - Place Centrale',
          ipAddress: '192.168.1.100',
          success: true
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          adminId: 'admin-001',
          adminName: 'Admin Système',
          action: 'UPDATE',
          entity: 'users',
          entityId: 'user-123',
          details: 'Mise à jour profil utilisateur',
          ipAddress: '192.168.1.100',
          success: true
        }
      ]

      setTimeout(() => {
        setLogs(mockLogs)
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Erreur chargement logs:', error)
      setLoading(false)
    }
  }

  async function exportLogs() {
    try {
      const params = new URLSearchParams()
      if (entityFilter !== 'all') params.append('entity', entityFilter)
      if (actionFilter !== 'all') params.append('action', actionFilter)
      if (dateFilter !== 'all') params.append('period', dateFilter)
      params.append('export', 'true')

      // Simulation de l'export pour l'instant
      alert('Export en cours de développement')
    } catch (error) {
      console.error('Erreur export logs:', error)
      alert('Erreur lors de l\'export')
    }
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create': return 'bg-green-100 text-green-800'
      case 'update': 
      case 'approve': return 'bg-blue-100 text-blue-800'
      case 'delete': return 'bg-red-100 text-red-800'
      case 'suspend': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEntityIcon = (entity: string) => {
    switch (entity.toLowerCase()) {
      case 'users': return <User className="w-4 h-4" />
      case 'partners': return <Shield className="w-4 h-4" />
      case 'fountains': return <Activity className="w-4 h-4" />
      default: return <Eye className="w-4 h-4" />
    }
  }

  const uniqueEntities = [...new Set(logs.map(log => log.entity))]
  const uniqueActions = [...new Set(logs.map(log => log.action))]

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
                <Shield className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Logs d&apos;Audit</h1>
              </div>
            </div>
            <button 
              onClick={exportLogs}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Actions</p>
                <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aujourd&apos;hui</p>
                <p className="text-2xl font-bold text-green-600">
                  {logs.filter(log => {
                    const logDate = new Date(log.timestamp).toDateString()
                    const today = new Date().toDateString()
                    return logDate === today
                  }).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins Actifs</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(logs.map(log => log.adminId)).size}
                </p>
              </div>
              <User className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux de succès</p>
                <p className="text-2xl font-bold text-blue-600">
                  {logs.length > 0 ? Math.round((logs.filter(log => log.success).length / logs.length) * 100) : 0}%
                </p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans les logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Toutes les entités</option>
              {uniqueEntities.map(entity => (
                <option key={entity} value={entity}>{entity}</option>
              ))}
            </select>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Toutes les actions</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Toute la période</option>
              <option value="1d">Dernières 24h</option>
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">90 derniers jours</option>
            </select>
          </div>
        </div>

        {/* Liste des logs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Chargement des logs...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entité
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Détails
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{new Date(log.timestamp).toLocaleDateString('fr-FR')}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleTimeString('fr-FR')}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{log.adminName}</div>
                            <div className="text-xs text-gray-500">ID: {log.adminId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getEntityIcon(log.entity)}
                          <span className="ml-2 text-sm text-gray-900">{log.entity}</span>
                        </div>
                        <div className="text-xs text-gray-500">ID: {log.entityId}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="truncate" title={log.details}>
                          {log.details}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.ipAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.success ? 'Succès' : 'Échec'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredLogs.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-500">
              Aucun log trouvé avec ces critères
            </div>
          )}
        </div>

        {/* Informations sur la période */}
        {logs.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <div className="text-sm text-blue-800">
                <strong>Période affichée:</strong> Du {new Date(Math.min(...logs.map(log => new Date(log.timestamp).getTime()))).toLocaleDateString('fr-FR')} 
                {' '}au {new Date(Math.max(...logs.map(log => new Date(log.timestamp).getTime()))).toLocaleDateString('fr-FR')}
                {' '}({filteredLogs.length} logs affichés sur {logs.length} au total)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}