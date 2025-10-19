'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Wallet, CreditCard, History, QrCode, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  credits: number
}

interface Transaction {
  id: string
  type: string
  amount: number
  description: string
  createdAt: string
}

interface Fountain {
  id: string
  name: string
  address: string
  qrCode: string
  costPerUse: number
}

function CreditTestContent() {
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [fountains, setFountains] = useState<Fountain[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // ID utilisateur par défaut pour les tests (utilisateur admin)
  const testUserId = 'cmgrcl2e00000svz8s30woeln' // ID de l'admin LmaaMap

  useEffect(() => {
    loadUserData()
    loadFountains()
  }, [])

  async function loadUserData() {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/credits?userId=${testUserId}`)
      const result = await response.json()
      
      if (result.success) {
        setUser(result.data.user)
        setTransactions(result.data.transactions || [])
      } else {
        setMessage({ type: 'error', text: result.error || 'Erreur chargement utilisateur' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion' })
    } finally {
      setLoading(false)
    }
  }

  async function loadFountains() {
    try {
      const response = await fetch('/api/fountains')
      const result = await response.json()
      
      if (result.success) {
        setFountains(result.data || [])
      }
    } catch (error) {
      console.error('Erreur chargement fontaines:', error)
    }
  }

  async function addCredits(amount: number) {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: testUserId,
          amount,
          type: 'PURCHASE',
          description: `Achat de ${amount} crédits`
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setMessage({ type: 'success', text: `${amount} crédits ajoutés avec succès!` })
        loadUserData()
      } else {
        setMessage({ type: 'error', text: result.error || 'Erreur ajout crédits' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion' })
    } finally {
      setLoading(false)
    }
  }

  async function unlockFountain(fountain: Fountain) {
    try {
      setLoading(true)
      const response = await fetch('/api/fountain/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qrCode: fountain.qrCode,
          userId: testUserId
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `Fontaine ${fountain.name} déverrouillée! Coût: ${fountain.costPerUse}€` 
        })
        loadUserData()
      } else {
        setMessage({ type: 'error', text: result.error || 'Erreur déverrouillage' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🧪 Test du Système de Crédits</h1>
          
          {message && (
            <div className={`p-4 rounded-lg mb-4 flex items-center space-x-2 ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.type === 'success' ? 
                <CheckCircle className="w-5 h-5" /> : 
                <AlertCircle className="w-5 h-5" />
              }
              <span>{message.text}</span>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-4">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Chargement...</span>
            </div>
          )}
        </div>

        {user && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations utilisateur et solde */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Wallet className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Solde Utilisateur</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Utilisateur</p>
                  <p className="font-semibold">{user.name || 'Sans nom'}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Solde actuel</p>
                  <p className="text-3xl font-bold text-blue-800">{user.credits.toFixed(2)}€</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Actions rapides:</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => addCredits(5)}
                      disabled={loading}
                      className="px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
                    >
                      +5€
                    </button>
                    <button
                      onClick={() => addCredits(10)}
                      disabled={loading}
                      className="px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
                    >
                      +10€
                    </button>
                    <button
                      onClick={() => addCredits(20)}
                      disabled={loading}
                      className="px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
                    >
                      +20€
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Fontaines disponibles */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <QrCode className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">Fontaines Disponibles</h2>
              </div>
              
              <div className="space-y-3">
                {fountains.map(fountain => (
                  <div key={fountain.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{fountain.name}</h3>
                        <p className="text-sm text-gray-500">{fountain.address}</p>
                      </div>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                        {fountain.costPerUse}€
                      </span>
                    </div>
                    
                    <button
                      onClick={() => unlockFountain(fountain)}
                      disabled={loading || user.credits < fountain.costPerUse}
                      className="w-full mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {user.credits < fountain.costPerUse ? 
                        `Crédits insuffisants (${fountain.costPerUse}€ requis)` : 
                        'Déverrouiller la fontaine'
                      }
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Historique des transactions */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <History className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Historique des Transactions</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-500">Type</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-500">Description</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-500">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(transaction => (
                      <tr key={transaction.id} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-gray-600">
                          {new Date(transaction.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            transaction.type === 'USAGE' ? 'bg-red-100 text-red-800' :
                            transaction.type === 'PURCHASE' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{transaction.description}</td>
                        <td className={`py-3 text-sm font-semibold text-right ${
                          transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toFixed(2)}€
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {transactions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <History className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>Aucune transaction pour le moment</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Export dynamique pour éviter l'hydratation côté serveur
const CreditTestPage = dynamic(() => Promise.resolve(CreditTestContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Chargement des tests de crédits...</p>
      </div>
    </div>
  )
})

export default CreditTestPage