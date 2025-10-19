'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Droplets, 
  Building2, 
  Activity,
  Download
} from 'lucide-react'
import { format, subDays, startOfDay } from 'date-fns'
import { fr } from 'date-fns/locale'

interface AnalyticsData {
  userGrowth: Array<{
    date: string
    users: number
    newUsers: number
  }>
  scansActivity: Array<{
    date: string
    scans: number
    fountains: number
  }>
  topFountains: Array<{
    name: string
    scans: number
    location: string
  }>
  userTypes: Array<{
    name: string
    value: number
    color: string
  }>
  weeklyStats: {
    totalScans: number
    activeUsers: number
    newFountains: number
    avgScanPerUser: number
  }
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  async function loadAnalytics() {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/analytics?timeRange=${timeRange}`)
      const result = await response.json()
      
      if (result.success) {
        setAnalytics(result.data)
      } else {
        console.error('Erreur API:', result.error)
        // Fallback vers données mockées
        const mockData: AnalyticsData = {
          userGrowth: generateUserGrowthData(),
          scansActivity: generateScansData(),
          topFountains: [
            { name: 'Fontaine Centrale', scans: 1250, location: 'Centre-ville' },
            { name: 'Parc Municipal', scans: 980, location: 'Parc' },
            { name: 'Gare SNCF', scans: 756, location: 'Transport' },
            { name: 'Campus Université', scans: 642, location: 'Éducation' },
            { name: 'Marché Central', scans: 534, location: 'Commerce' }
          ],
          userTypes: [
            { name: 'Consommateurs', value: 65, color: '#3B82F6' },
            { name: 'Partenaires', value: 25, color: '#10B981' },
            { name: 'Administrateurs', value: 10, color: '#F59E0B' }
          ],
          weeklyStats: {
            totalScans: 4230,
            activeUsers: 892,
            newFountains: 12,
            avgScanPerUser: 4.7
          }
        }
        setAnalytics(mockData)
      }
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement analytics:', error)
      setLoading(false)
    }
  }

  function generateUserGrowthData() {
    const data = []
    for (let i = parseInt(timeRange); i >= 0; i--) {
      const date = startOfDay(subDays(new Date(), i))
      data.push({
        date: format(date, 'dd/MM', { locale: fr }),
        users: Math.floor(Math.random() * 50) + 800 + (parseInt(timeRange) - i) * 10,
        newUsers: Math.floor(Math.random() * 15) + 5
      })
    }
    return data
  }

  function generateScansData() {
    const data = []
    for (let i = parseInt(timeRange); i >= 0; i--) {
      const date = startOfDay(subDays(new Date(), i))
      data.push({
        date: format(date, 'dd/MM', { locale: fr }),
        scans: Math.floor(Math.random() * 200) + 150,
        fountains: Math.floor(Math.random() * 15) + 45
      })
    }
    return data
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Chargement des analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics & Rapports</h1>
                <p className="text-gray-600 mt-1">Analyse détaillée des données de la plateforme</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">90 derniers jours</option>
              </select>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Statistiques résumées */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Scans</p>
                <p className="text-2xl font-bold text-blue-600">{analytics?.weeklyStats.totalScans.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% vs semaine dernière
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold text-green-600">{analytics?.weeklyStats.activeUsers}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% vs semaine dernière
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Droplets className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Nouvelles Fontaines</p>
                <p className="text-2xl font-bold text-cyan-600">{analytics?.weeklyStats.newFountains}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +25% vs semaine dernière
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Moy. Scans/User</p>
                <p className="text-2xl font-bold text-purple-600">{analytics?.weeklyStats.avgScanPerUser}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% vs semaine dernière
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Croissance des utilisateurs */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Croissance des Utilisateurs</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics?.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.2}
                  name="Total Utilisateurs"
                />
                <Area 
                  type="monotone" 
                  dataKey="newUsers" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                  name="Nouveaux Utilisateurs"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Activité des scans */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité des Scans</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.scansActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="scans" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="Scans Quotidiens"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphiques secondaires */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Fontaines */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Fontaines</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analytics?.topFountains} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="scans" fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Types d'utilisateurs */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition Utilisateurs</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analytics?.userTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics?.userTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Résumé des performances */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performances Clés</h3>
            <div className="space-y-4">
              {analytics?.topFountains.slice(0, 3).map((fountain, index) => (
                <div key={fountain.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{fountain.name}</p>
                    <p className="text-sm text-gray-600">{fountain.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{fountain.scans}</p>
                    <p className="text-xs text-gray-500">scans</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Link
                href="/admin/fountains"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Voir toutes les fontaines →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}