'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { QrCode, Camera, ExternalLink } from 'lucide-react'
import QRGenerator from '../../components/QRGenerator'
import QRScanner from '../../components/QRScanner'

function QRTestContent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'generator' | 'scanner'>('generator')

  function handleQRGenerate(fountainId: string, fountainName: string) {
    alert(`QR Code généré pour: ${fountainName} (${fountainId})`)
  }

  function handleQRScan(data: string) {
    alert(`QR Code scanné: ${data}`)
    
    // Rediriger vers la page de scan avec le QR code
    const qrParam = encodeURIComponent(data)
    router.push(`/scan?qr=${qrParam}`)
  }

  function testScanUrl(qrId: string) {
    const testUrl = `https://lmaamap.com/scan/${qrId}`
    const scanUrl = `/scan?qr=${encodeURIComponent(testUrl)}`
    router.push(scanUrl)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Test QR Codes</h1>
            <p className="text-gray-600">Testez la génération et le scan des QR codes</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Onglets */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'generator'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <QrCode className="w-5 h-5 mx-auto mb-1" />
              Générateur
            </button>
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'scanner'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Camera className="w-5 h-5 mx-auto mb-1" />
              Scanner
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'generator' ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Générateur de QR Code
                </h3>
                <QRGenerator onGenerate={handleQRGenerate} />
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Scanner QR Code
                </h3>
                <QRScanner
                  onScan={handleQRScan}
                  onError={(error) => alert(`Erreur: ${error}`)}
                  isActive={activeTab === 'scanner'}
                />
              </div>
            )}
          </div>
        </div>

        {/* QR Codes de test */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              QR Codes de Test
            </h3>
            <p className="text-gray-600 mb-4">
              Cliquez sur ces liens pour tester le système de scan :
            </p>

            <div className="space-y-3">
              {[
                { id: 'qr-001', name: 'Fontaine Centrale', status: 'Actif' },
                { id: 'qr-002', name: 'Fontaine Parc Municipal', status: 'Actif' },
                { id: 'qr-003', name: 'Restaurant Central', status: 'Actif' },
                { id: 'qr-004', name: 'Fontaine Gare du Nord', status: 'Inactif' }
              ].map((qr) => (
                <div
                  key={qr.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <QrCode className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{qr.name}</p>
                      <p className="text-sm text-gray-500">{qr.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      qr.status === 'Actif' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {qr.status}
                    </span>
                    
                    <button
                      onClick={() => testScanUrl(qr.id)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Tester</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Instructions</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Utilisez l'onglet "Générateur" pour créer de nouveaux QR codes</li>
            <li>• Utilisez l'onglet "Scanner" pour scanner des QR codes avec votre caméra</li>
            <li>• Testez les QR codes existants avec les boutons "Tester"</li>
            <li>• Les QR codes inactifs afficheront un message d'erreur</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Export dynamique pour éviter l'hydratation côté serveur
const QRTestPage = dynamic(() => Promise.resolve(QRTestContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Chargement des tests QR...</p>
      </div>
    </div>
  )
})

export default QRTestPage