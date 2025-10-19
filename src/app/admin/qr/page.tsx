'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  QrCode, 
  Download,
  Eye,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  Search,
  Filter,
  Calendar,
  Users,
  Activity,
  MapPin,
  Settings,
  RefreshCw
} from 'lucide-react'
import QRCodeGenerator from '../../../components/QRGenerator'

interface QRCodeData {
  id: string
  fountainId: string
  fountainName: string
  qrCodeUrl: string
  createdAt: Date
  lastScanned?: Date
  scanCount: number
  isActive: boolean
  location: string
  type: 'fountain' | 'partner' | 'event'
}

interface ScanLog {
  id: string
  qrCodeId: string
  fountainName: string
  scannedAt: Date
  userId?: string
  userName?: string
  ipAddress: string
  userAgent: string
  location?: {
    latitude: number
    longitude: number
  }
}

export default function QRManagementPage() {
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([])
  const [scanLogs, setScanLogs] = useState<ScanLog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null)
  const [showGenerator, setShowGenerator] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'fountain' | 'partner' | 'event'>('all')
  const [showScanHistory, setShowScanHistory] = useState(false)

  useEffect(() => {
    loadQRCodes()
    loadScanLogs()
  }, [])

  async function loadQRCodes() {
    setLoading(true)
    try {
      // Simulation de données QR codes
      const mockQRCodes: QRCodeData[] = [
        {
          id: 'qr-001',
          fountainId: 'fountain-001',
          fountainName: 'Fontaine Centrale',
          qrCodeUrl: 'https://lmaamap.com/scan/qr-001',
          createdAt: new Date('2024-01-15'),
          lastScanned: new Date('2024-01-25T14:30:00'),
          scanCount: 156,
          isActive: true,
          location: 'Place de la République, Paris',
          type: 'fountain'
        },
        {
          id: 'qr-002',
          fountainId: 'fountain-002',
          fountainName: 'Fontaine Parc Municipal',
          qrCodeUrl: 'https://lmaamap.com/scan/qr-002',
          createdAt: new Date('2024-01-10'),
          lastScanned: new Date('2024-01-24T16:45:00'),
          scanCount: 89,
          isActive: true,
          location: 'Parc Municipal, Paris',
          type: 'fountain'
        },
        {
          id: 'qr-003',
          fountainId: 'partner-001',
          fountainName: 'Restaurant Central - Point d\'eau',
          qrCodeUrl: 'https://lmaamap.com/scan/qr-003',
          createdAt: new Date('2024-01-20'),
          lastScanned: new Date('2024-01-25T12:15:00'),
          scanCount: 234,
          isActive: true,
          location: 'Restaurant Central, 15 Rue de Rivoli',
          type: 'partner'
        },
        {
          id: 'qr-004',
          fountainId: 'fountain-004',
          fountainName: 'Fontaine Gare du Nord',
          qrCodeUrl: 'https://lmaamap.com/scan/qr-004',
          createdAt: new Date('2024-01-05'),
          lastScanned: new Date('2023-12-28T09:20:00'),
          scanCount: 45,
          isActive: false,
          location: 'Gare du Nord, Paris',
          type: 'fountain'
        }
      ]

      setQrCodes(mockQRCodes)
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement QR codes:', error)
      setLoading(false)
    }
  }

  async function loadScanLogs() {
    try {
      // Simulation des logs de scan
      const mockScanLogs: ScanLog[] = [
        {
          id: 'scan-001',
          qrCodeId: 'qr-001',
          fountainName: 'Fontaine Centrale',
          scannedAt: new Date('2024-01-25T14:30:00'),
          userId: 'user-123',
          userName: 'Jean Dupont',
          ipAddress: '192.168.1.105',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
          location: { latitude: 48.8566, longitude: 2.3522 }
        },
        {
          id: 'scan-002',
          qrCodeId: 'qr-003',
          fountainName: 'Restaurant Central - Point d\'eau',
          scannedAt: new Date('2024-01-25T12:15:00'),
          userId: 'user-456',
          userName: 'Marie Martin',
          ipAddress: '192.168.1.110',
          userAgent: 'Mozilla/5.0 (Android 14; SM-G991B)',
          location: { latitude: 48.8584, longitude: 2.3488 }
        },
        {
          id: 'scan-003',
          qrCodeId: 'qr-002',
          fountainName: 'Fontaine Parc Municipal',
          scannedAt: new Date('2024-01-24T16:45:00'),
          userId: 'user-789',
          userName: 'Pierre Dubois',
          ipAddress: '192.168.1.115',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          location: { latitude: 48.8606, longitude: 2.3376 }
        }
      ]

      setScanLogs(mockScanLogs)
    } catch (error) {
      console.error('Erreur chargement logs scan:', error)
    }
  }

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.fountainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || qr.type === filterType
    return matchesSearch && matchesType
  })

  async function generateNewQR(fountainId: string, fountainName: string) {
    try {
      // Simulation génération QR
      const newQR: QRCodeData = {
        id: `qr-${Date.now()}`,
        fountainId,
        fountainName,
        qrCodeUrl: `https://lmaamap.com/scan/qr-${Date.now()}`,
        createdAt: new Date(),
        scanCount: 0,
        isActive: true,
        location: 'Nouvelle location',
        type: 'fountain'
      }

      setQrCodes([...qrCodes, newQR])
      setShowGenerator(false)
      alert('QR Code généré avec succès !')
    } catch (error) {
      console.error('Erreur génération QR:', error)
      alert('Erreur lors de la génération du QR Code')
    }
  }

  async function toggleQRStatus(qrId: string) {
    setQrCodes(qrCodes.map(qr => 
      qr.id === qrId ? { ...qr, isActive: !qr.isActive } : qr
    ))
  }

  async function deleteQR(qrId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce QR Code ?')) {
      setQrCodes(qrCodes.filter(qr => qr.id !== qrId))
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    alert('URL copiée dans le presse-papiers !')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Chargement des QR Codes...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Gestion QR Codes</h1>
                <p className="text-gray-600 mt-1">Génération et suivi des QR codes pour les fontaines</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowScanHistory(!showScanHistory)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Activity className="w-4 h-4" />
                <span>Historique Scans</span>
              </button>
              
              <button
                onClick={() => setShowGenerator(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau QR</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Statistiques QR */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <QrCode className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total QR Codes</p>
                <p className="text-xl font-bold text-blue-600">{qrCodes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Scans Total</p>
                <p className="text-xl font-bold text-green-600">
                  {qrCodes.reduce((sum, qr) => sum + qr.scanCount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">QR Actifs</p>
                <p className="text-xl font-bold text-yellow-600">
                  {qrCodes.filter(qr => qr.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Scans Aujourd'hui</p>
                <p className="text-xl font-bold text-purple-600">24</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                <option value="all">Tous types</option>
                <option value="fountain">Fontaines</option>
                <option value="partner">Partenaires</option>
                <option value="event">Événements</option>
              </select>
            </div>

            <button
              onClick={loadQRCodes}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Actualiser</span>
            </button>
          </div>
        </div>

        {/* Liste des QR Codes */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QR Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fontaine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scans
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernier Scan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQRCodes.map((qr) => (
                  <tr key={qr.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <QrCode className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{qr.id}</p>
                          <p className="text-xs text-gray-500">{qr.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{qr.fountainName}</p>
                        <p className="text-xs text-gray-500">{qr.location}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">{qr.scanCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {qr.lastScanned ? new Date(qr.lastScanned).toLocaleDateString('fr-FR') : 'Jamais'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        qr.isActive 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {qr.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedQR(qr)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => copyToClipboard(qr.qrCodeUrl)}
                          className="text-green-600 hover:text-green-900"
                          title="Copier URL"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => window.open(qr.qrCodeUrl, '_blank')}
                          className="text-purple-600 hover:text-purple-900"
                          title="Ouvrir"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => toggleQRStatus(qr.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Basculer statut"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => deleteQR(qr.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredQRCodes.length === 0 && (
            <div className="text-center py-12">
              <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucun QR Code trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal QR Generator */}
      {showGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Générer un nouveau QR Code</h3>
                <button
                  onClick={() => setShowGenerator(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <QRCodeGenerator onGenerate={generateNewQR} />
            </div>
          </div>
        </div>
      )}

      {/* Modal Historique des scans */}
      {showScanHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Historique des Scans</h3>
                <button
                  onClick={() => setShowScanHistory(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Date/Heure
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Fontaine
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Utilisateur
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Localisation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {scanLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(log.scannedAt).toLocaleString('fr-FR')}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {log.fountainName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {log.userName || 'Anonyme'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {log.location ? `${log.location.latitude}, ${log.location.longitude}` : 'Non disponible'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal détails QR sélectionné */}
      {selectedQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Détails QR Code</h3>
                <button
                  onClick={() => setSelectedQR(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <QRCodeGenerator 
                    value={selectedQR.qrCodeUrl}
                    readonly={true}
                    size={200}
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <p className="text-sm text-gray-900">{selectedQR.id}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fontaine</label>
                    <p className="text-sm text-gray-900">{selectedQR.fountainName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-900 flex-1 truncate">{selectedQR.qrCodeUrl}</p>
                      <button
                        onClick={() => copyToClipboard(selectedQR.qrCodeUrl)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Scans Total</label>
                    <p className="text-sm text-gray-900">{selectedQR.scanCount}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Créé le</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedQR.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Statut</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedQR.isActive 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedQR.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
