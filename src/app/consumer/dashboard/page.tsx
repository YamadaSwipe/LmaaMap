'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  CreditCard, 
  Plus, 
  Eye, 
  MapPin, 
  TrendingUp, 
  Calendar,
  Droplets,
  Leaf,
  ArrowLeft,
  RefreshCw
} from 'lucide-react'

interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
  credits: number
  phone?: string
  city?: string
  country?: string
  createdAt: string
}

interface Transaction {
  id: string
  amount: number
  type: 'credit' | 'debit'
  date: string
  description: string
}

interface UsageStats {
  totalUsage: number
  thisMonth: number
  plasticBottlesSaved: number
  co2Saved: number // en kg
}

export default function ConsumerDashboard() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [usageStats, setUsageStats] = useState<UsageStats>({
    totalUsage: 0,
    thisMonth: 0,
    plasticBottlesSaved: 0,
    co2Saved: 0
  })
  const [loading, setLoading] = useState(true)
  const [rechargingCredits, setRechargingCredits] = useState(false)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      // Simuler des données utilisateur pour le développement
      const mockUserData: UserData = {
        id: 'user123',
        email: 'client@example.com',
        firstName: 'Mohammed',
        lastName: 'Alami',
        credits: 15.50,
        phone: '+212 6XX XXX XXX',
        city: 'Casablanca',
        country: 'MA',
        createdAt: '2025-01-15T10:00:00Z'
      }

      const mockTransactions: Transaction[] = [
        {
          id: '1',
          amount: 20.00,
          type: 'credit',
          date: '2025-01-15T10:00:00Z',
          description: 'Recharge de crédits'
        },
        {
          id: '2',
          amount: -0.30,
          type: 'debit',
          date: '2025-01-16T14:30:00Z',
          description: 'Fontaine Anfa Place'
        },
        {
          id: '3',
          amount: -0.25,
          type: 'debit',
          date: '2025-01-17T09:15:00Z',
          description: 'Fontaine Mall of Morocco'
        }
      ]

      const mockUsageStats: UsageStats = {
        totalUsage: 42,
        thisMonth: 15,
        plasticBottlesSaved: 42,
        co2Saved: 8.4
      }

      setUserData(mockUserData)
      setTransactions(mockTransactions)
      setUsageStats(mockUsageStats)
    } catch (error) {
      console.error('Erreur chargement données:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRechargeCredits = async (amount: number) => {
    setRechargingCredits(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          userEmail: userData?.email,
          type: 'recharge'
        }),
      })

      if (response.ok) {
        const { url } = await response.json()
        if (url) {
          window.location.href = url
        }
      } else {
        console.error('Erreur lors de la création de la session de paiement')
      }
    } catch (error) {
      console.error('Erreur recharge:', error)
    } finally {
      setRechargingCredits(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement de votre dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour {userData?.firstName} ! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez vos crédits et suivez votre impact environnemental
          </p>
        </div>

        {/* Cartes principales */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Solde de crédits */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Solde</h3>
              </div>
              <button
                onClick={() => loadUserData()}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {userData?.credits?.toFixed(2)} €
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Crédit disponible
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleRechargeCredits(10)}
                disabled={rechargingCredits}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
              >
                {rechargingCredits ? 'Traitement...' : '+ 10€'}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleRechargeCredits(20)}
                  disabled={rechargingCredits}
                  className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
                >
                  + 20€
                </button>
                <button
                  onClick={() => handleRechargeCredits(50)}
                  disabled={rechargingCredits}
                  className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
                >
                  + 50€
                </button>
              </div>
            </div>
          </div>

          {/* Utilisation ce mois */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <Droplets className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Ce mois</h3>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {usageStats.thisMonth}
            </div>
            <p className="text-gray-600 text-sm">
              Utilisations
            </p>
          </div>

          {/* Impact environnemental */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-emerald-500">
            <div className="flex items-center mb-4">
              <Leaf className="w-8 h-8 text-emerald-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Impact</h3>
            </div>
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {usageStats.plasticBottlesSaved}
            </div>
            <p className="text-gray-600 text-xs mb-2">
              Bouteilles plastique évitées
            </p>
            <div className="text-lg font-semibold text-emerald-600">
              {usageStats.co2Saved} kg
            </div>
            <p className="text-gray-600 text-xs">
              CO2 économisé
            </p>
          </div>
        </div>

        {/* Historique des transactions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Historique des transactions
          </h3>
          
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? <Plus className="w-5 h-5" /> : <Droplets className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : ''}{transaction.amount.toFixed(2)} €
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link 
            href="/map"
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <MapPin className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Trouver des fontaines</h3>
            </div>
            <p className="text-gray-600">
              Localisez les fontaines LmaaMap près de vous
            </p>
          </Link>

          <Link 
            href="/consumer/profile"
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-gray-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Mon profil</h3>
            </div>
            <p className="text-gray-600">
              Gérez vos informations personnelles
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
