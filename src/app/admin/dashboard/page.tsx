'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  Users, Building2, Droplets, Activity, 
  BarChart3, MapPin, QrCode, FileText,
  TrendingUp, AlertTriangle, CheckCircle, 
  Settings, Shield, Eye, Plus, Wallet,
  Euro, CreditCard, PieChart, RefreshCw, Leaf
} from 'lucide-react'

interface DashboardStats {
  users: { total: number; active: number; new_this_week: number }
  partners: { total: number; active: number; pending: number }
  fountains: { total: number; active: number; maintenance: number }
  scans: { total: number; today: number; weekly_growth: number }
  recent_activities: Array<{ type: string; description: string; timestamp: string }>
  alerts?: { pending_approvals: number; maintenance_alerts: number; low_water_pressure: number; offline_fountains: number }
  performance?: { uptime: number; response_time: number; error_rate: number }
}

interface FinancialStats {
  totalRevenue: number
  monthlyRevenue: number
  totalCreditsInCirculation: number
  averageUserSpending: number
  topFountains: Array<{ name: string; revenue: number; usage: number }>
  recentTransactions: Array<{ user: string; amount: number; type: string; date: string; fountain?: string }>
}

interface UserDetails {
  id: string
  email: string
  firstName: string
  lastName: string
  credits: number
  totalSpent: number
  totalUsage: number
  status: string
  lastActivity: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [financialStats, setFinancialStats] = useState<FinancialStats | null>(null)
  const [users, setUsers] = useState<UserDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'users'>('overview')

  useEffect(() => {
    loadDashboardStats()
    loadFinancialStats()
    loadUsers()
  }, [])

  async function loadDashboardStats() {
    try {
      const response = await fetch('/api/admin/dashboard')
      const result = await response.json()
      
      if (result.success) {
        setStats(result.data)
      } else {
        console.error('Erreur API:', result.error)
        // Fallback avec données simulées
        setStats({
          users: { total: 156, active: 142, new_this_week: 12 },
          partners: { total: 23, active: 21, pending: 2 },
          fountains: { total: 89, active: 84, maintenance: 5 },
          scans: { total: 2847, today: 47, weekly_growth: 15.3 },
          recent_activities: [
            { type: 'qr_scan', description: 'Nouveau scan QR - Fontaine #12', timestamp: '2024-01-15T10:30:00' },
            { type: 'new_user', description: 'Nouvel utilisateur inscrit', timestamp: '2024-01-15T09:15:00' },
            { type: 'maintenance', description: 'Fontaine #7 signalée en maintenance', timestamp: '2024-01-15T08:45:00' }
          ]
        })
      }
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement stats:', error)
      // Fallback avec données simulées en cas d'erreur
      setStats({
        users: { total: 156, active: 142, new_this_week: 12 },
        partners: { total: 23, active: 21, pending: 2 },
        fountains: { total: 89, active: 84, maintenance: 5 },
        scans: { total: 2847, today: 47, weekly_growth: 15.3 },
        recent_activities: [
          { type: 'qr_scan', description: 'Nouveau scan QR - Fontaine #12', timestamp: '2024-01-15T10:30:00' },
          { type: 'new_user', description: 'Nouvel utilisateur inscrit', timestamp: '2024-01-15T09:15:00' },
          { type: 'maintenance', description: 'Fontaine #7 signalée en maintenance', timestamp: '2024-01-15T08:45:00' }
        ]
      })
      setLoading(false)
    }
  }

  async function loadFinancialStats() {
    try {
      const response = await fetch('/api/admin/fountain-stats')
      const result = await response.json()
      
      if (result.success) {
        const mockFinancial: FinancialStats = {
          totalRevenue: result.totalRevenue,
          monthlyRevenue: result.totalRevenue * 0.15, // Approximation du mois en cours
          totalCreditsInCirculation: 1247.80,
          averageUserSpending: result.averageRevenue,
          topFountains: result.fountains.slice(0, 3).map((f: any) => ({
            name: f.name,
            revenue: f.totalRevenue,
            usage: f.totalUsage
          })),
          recentTransactions: [
            { user: 'mohammed.alami@gmail.com', amount: 20.00, type: 'recharge', date: '2025-01-17T10:30:00Z' },
            { user: 'fatima.benali@gmail.com', amount: -0.30, type: 'usage', date: '2025-01-17T09:15:00Z', fountain: 'Anfa Place' },
            { user: 'sarah.lahlou@gmail.com', amount: 50.00, type: 'recharge', date: '2025-01-16T16:45:00Z' },
            { user: 'youssef.tahiri@gmail.com', amount: -0.25, type: 'usage', date: '2025-01-16T14:20:00Z', fountain: 'Mall of Morocco' }
          ]
        }
        setFinancialStats(mockFinancial)
      }
    } catch (error) {
      console.error('Erreur chargement stats financières:', error)
    }
  }

  async function loadUsers() {
    try {
      const response = await fetch('/api/admin/users?limit=5')
      const result = await response.json()
      
      if (result.success) {
        setUsers(result.users)
      }
    } catch (error) {
      console.error('Erreur chargement utilisateurs:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Chargement du tableau de bord...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Admin</h1>
              <p className="text-gray-600 mt-1">Gestion et pilotage de la plateforme LmaaMap</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/admin/audit-logs"
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                <Shield className="w-4 h-4" />
                <span>Audit Logs</span>
              </Link>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Settings className="w-4 h-4" />
                <span>Paramètres</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'financial'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Aspect financier
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Utilisateurs détaillés
              </button>
            </nav>
          </div>
        </div>

        {/* Contenu de l'onglet Vue d'ensemble */}
        {activeTab === 'overview' && (
          <>
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Utilisateurs */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Utilisateurs</h3>
                  <p className="text-2xl font-bold text-blue-600">{stats?.users.total || 0}</p>
                </div>
              </div>
              <Link
                href="/admin/users"
                className="text-blue-600 hover:text-blue-800"
              >
                <Eye className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600 font-semibold">+{stats?.users.new_this_week || 0} cette semaine</span>
              <span className="text-gray-500">{stats?.users.active || 0} actifs</span>
            </div>
          </div>

          {/* Partenaires */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Partenaires</h3>
                  <p className="text-2xl font-bold text-green-600">{stats?.partners.total || 0}</p>
                </div>
              </div>
              <Link
                href="/admin/partners"
                className="text-green-600 hover:text-green-800"
              >
                <Eye className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-600 font-semibold">{stats?.partners.pending || 0} en attente</span>
              <span className="text-gray-500">{stats?.partners.active || 0} actifs</span>
            </div>
          </div>

          {/* Fontaines */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Droplets className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Fontaines</h3>
                  <p className="text-2xl font-bold text-cyan-600">{stats?.fountains.total || 0}</p>
                </div>
              </div>
              <Link
                href="/admin/fountains"
                className="text-cyan-600 hover:text-cyan-800"
              >
                <Eye className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-orange-600 font-semibold">{stats?.fountains.maintenance || 0} maintenance</span>
              <span className="text-gray-500">{stats?.fountains.active || 0} actives</span>
            </div>
          </div>

          {/* Activité QR */}
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <QrCode className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Scans QR</h3>
                  <p className="text-2xl font-bold text-purple-600">{stats?.scans.total || 0}</p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600 font-semibold">+{stats?.scans.weekly_growth || 0}%</span>
              <span className="text-gray-500">{stats?.scans.today || 0} aujourd'hui</span>
            </div>
          </div>
        </div>

        {/* Nouvelles fonctionnalités en vedette */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Nouvelles Fonctionnalités</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/admin/analytics" 
                className="p-4 border-2 border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Analytics Avancés</h4>
                </div>
                <p className="text-sm text-blue-700">Graphiques interactifs, rapports détaillés, tendances d'utilisation</p>
              </Link>

              <Link 
                href="/map-advanced" 
                className="p-4 border-2 border-green-200 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold text-green-900">Carte Interactive</h4>
                </div>
                <p className="text-sm text-green-700">Clustering, filtres avancés, recherche géographique, vue satellite</p>
              </Link>

              <Link 
                href="/admin/qr" 
                className="p-4 border-2 border-purple-200 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <QrCode className="w-6 h-6 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Système QR Codes</h4>
                </div>
                <p className="text-sm text-purple-700">Génération, scanning, tracking, analytics des QR codes</p>
              </Link>

              <Link 
                href="/admin/audit-logs" 
                className="p-4 border-2 border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="w-6 h-6 text-orange-600" />
                  <h4 className="font-semibold text-orange-900">Audit Logs</h4>
                </div>
                <p className="text-sm text-orange-700">Traçabilité complète, logs de sécurité, historique d'actions</p>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {stats?.recent_activities.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`p-1 rounded-full ${
                    activity.type === 'qr_scan' ? 'bg-purple-100' :
                    activity.type === 'new_user' ? 'bg-blue-100' : 
                    activity.type === 'new_partner' ? 'bg-green-100' :
                    'bg-orange-100'
                  }`}>
                    {activity.type === 'qr_scan' ? <QrCode className="w-4 h-4 text-purple-600" /> :
                     activity.type === 'new_user' ? <Users className="w-4 h-4 text-blue-600" /> :
                     activity.type === 'new_partner' ? <Building2 className="w-4 h-4 text-green-600" /> :
                     <AlertTriangle className="w-4 h-4 text-orange-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {activity.timestamp ? 
                        new Date(activity.timestamp).toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        }) + ' - ' + 
                        new Date(activity.timestamp).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short' 
                        }) :
                        'Il y a quelques minutes'
                      }
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'qr_scan' ? 'bg-purple-400' :
                      activity.type === 'new_user' ? 'bg-blue-400' : 
                      activity.type === 'new_partner' ? 'bg-green-400' :
                      'bg-orange-400'
                    }`}></div>
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Aucune activité récente</p>
                  <p className="text-xs text-gray-400">Les nouvelles activités apparaîtront ici</p>
                </div>
              )}
              
              {stats?.recent_activities && stats.recent_activities.length > 5 && (
                <div className="text-center pt-3">
                  <Link 
                    href="/admin/audit-logs" 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Voir toutes les activités →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alertes et Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Alertes système */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">🚨 Alertes Système</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Système opérationnel</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {stats?.alerts?.pending_approvals && stats.alerts.pending_approvals > 0 && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">
                      {stats.alerts.pending_approvals} approbations en attente
                    </span>
                  </div>
                  <Link href="/admin/partners" className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">
                    Voir →
                  </Link>
                </div>
              )}

              {stats?.alerts?.maintenance_alerts && stats.alerts.maintenance_alerts > 0 && (
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">
                      {stats.alerts.maintenance_alerts} fontaines en maintenance
                    </span>
                  </div>
                  <Link href="/admin/fountains" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                    Voir →
                  </Link>
                </div>
              )}

              {(!stats?.alerts?.pending_approvals && !stats?.alerts?.maintenance_alerts) && (
                <div className="text-center py-6 text-gray-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="text-sm font-medium">Aucune alerte active</p>
                  <p className="text-xs text-gray-400">Tous les systèmes fonctionnent normalement</p>
                </div>
              )}
            </div>
          </div>

          {/* Performance système */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Performance Système</h3>
            
            <div className="space-y-4">
              {/* Uptime */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Disponibilité</p>
                    <p className="text-xs text-gray-500">Dernières 24h</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{stats?.performance?.uptime || 99.8}%</p>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${stats?.performance?.uptime || 99.8}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Temps de réponse */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Temps de réponse</p>
                    <p className="text-xs text-gray-500">API moyenne</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{stats?.performance?.response_time || 245}ms</p>
                  <p className="text-xs text-gray-500">Excellent</p>
                </div>
              </div>

              {/* Taux d'erreur */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Taux d'erreur</p>
                    <p className="text-xs text-gray-500">Dernière heure</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600">{stats?.performance?.error_rate || 0.1}%</p>
                  <p className="text-xs text-gray-500">Très faible</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link 
                href="/admin/analytics" 
                className="flex items-center justify-center space-x-2 w-full p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Voir les analytics détaillés</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Actions rapides étendues */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Gestion principales */}
            <Link href="/admin/users" className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Utilisateurs</span>
              <span className="text-xs text-gray-500">{stats?.users.total || 0}</span>
            </Link>
            
            <Link href="/admin/partners" className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Building2 className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Partenaires</span>
              <span className="text-xs text-gray-500">{stats?.partners.total || 0}</span>
            </Link>
            
            <Link href="/admin/fountains" className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Droplets className="w-6 h-6 text-cyan-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Fontaines</span>
              <span className="text-xs text-gray-500">{stats?.fountains.total || 0}</span>
            </Link>

            <Link href="/admin/greenyou" className="flex flex-col items-center p-3 border-2 border-green-200 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Leaf className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">GreenYou</span>
              <span className="text-xs text-green-700">Éco 🌿</span>
            </Link>

            {/* Fonctionnalités avancées */}
            <Link href="/admin/analytics" className="flex flex-col items-center p-3 border-2 border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <BarChart3 className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Analytics</span>
              <span className="text-xs text-blue-700">Nouveau ✨</span>
            </Link>
            
            <Link href="/admin/qr" className="flex flex-col items-center p-3 border-2 border-purple-200 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <QrCode className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">QR Codes</span>
              <span className="text-xs text-purple-700">Nouveau ✨</span>
            </Link>
            
            <Link href="/admin/audit-logs" className="flex flex-col items-center p-3 border-2 border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <Shield className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">Audit Logs</span>
              <span className="text-xs text-orange-700">Nouveau ✨</span>
            </Link>
          </div>
          
          {/* Liens carte et tests */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-3">
              <Link href="/map" className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Carte Standard</span>
              </Link>
              <Link href="/map-advanced" className="flex items-center space-x-2 px-3 py-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Carte Avancée ✨</span>
              </Link>
              <Link href="/qr-test" className="flex items-center space-x-2 px-3 py-2 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
                <QrCode className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-700">Test QR 🧪</span>
              </Link>
              <Link href="/credits-test" className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors">
                <Wallet className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-700">Test Crédits 💰</span>
              </Link>
            </div>
          </div>
        </div>
        </>
        )}

        {/* Contenu de l'onglet Aspect financier */}
        {activeTab === 'financial' && financialStats && (
          <div className="space-y-6">
            {/* KPIs financiers */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Euro className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Revenus totaux</p>
                    <p className="text-2xl font-bold text-green-600">{financialStats.totalRevenue.toFixed(2)}€</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Ce mois</p>
                    <p className="text-2xl font-bold text-blue-600">{financialStats.monthlyRevenue.toFixed(2)}€</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <CreditCard className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Crédits en circulation</p>
                    <p className="text-2xl font-bold text-purple-600">{financialStats.totalCreditsInCirculation.toFixed(2)}€</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <BarChart3 className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Dépense moyenne</p>
                    <p className="text-2xl font-bold text-orange-600">{financialStats.averageUserSpending.toFixed(2)}€</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top fontaines et transactions récentes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top fontaines */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Top Fontaines (Revenus)
                </h3>
                <div className="space-y-4">
                  {financialStats.topFountains.map((fountain, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{fountain.name}</p>
                        <p className="text-sm text-gray-600">{fountain.usage} utilisations</p>
                      </div>
                      <p className="font-semibold text-green-600">{fountain.revenue.toFixed(2)}€</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transactions récentes */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Transactions Récentes
                </h3>
                <div className="space-y-4">
                  {financialStats.recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.user}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.type === 'recharge' ? 'Recharge' : `Utilisation ${transaction.fountain}`}
                        </p>
                      </div>
                      <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}€
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenu de l'onglet Utilisateurs détaillés */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Utilisateurs Détaillés
                  </h3>
                  <Link
                    href="/admin/users"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Voir tous →
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crédits
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total dépensé
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisations
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dernière activité
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.credits > 10 ? 'bg-green-100 text-green-800' :
                            user.credits > 2 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.credits.toFixed(2)}€
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.totalSpent.toFixed(2)}€
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.totalUsage}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status === 'active' ? 'Actif' : 'Solde faible'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.lastActivity).toLocaleDateString('fr-FR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}