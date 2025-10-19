'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, QrCode } from 'lucide-react'
import dynamic from 'next/dynamic'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [paymentData, setPaymentData] = useState<{ id: string; amount: number; status: string } | null>(null)
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    if (sessionId) {
      verifyPayment()
    }
  }, [sessionId])

  const verifyPayment = async () => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })

      const data = await response.json()
      if (data.success) {
        setPaymentData(data.payment)
        setQrCode(data.qrCode)
      }
    } catch (error) {
      console.error('Erreur vérification paiement:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadQRCode = () => {
    const link = document.createElement('a')
    link.download = `qrcode-lmaamap-${paymentData?.userEmail}.png`
    link.href = qrCode
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Vérification du paiement...</p>
        </div>
      </div>
    )
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur de paiement</h2>
          <p className="text-gray-600 mb-6">
            Impossible de vérifier votre paiement. Veuillez contacter le support.
          </p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Paiement réussi !</h2>
        
        <p className="text-gray-600 mb-6">
          Félicitations ! Votre compte a été créé avec succès et vos crédits ont été ajoutés.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-2">Récapitulatif</div>
          <div className="font-semibold text-gray-900">{paymentData.creditAmount}€ de crédits</div>
          <div className="text-sm text-gray-600">{paymentData.userEmail}</div>
        </div>

        {qrCode && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Votre QR Code Personnel</h3>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 inline-block">
              <img src={qrCode} alt="QR Code utilisateur" className="w-32 h-32 mx-auto" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Utilisez ce QR code aux fontaines pour accéder à l'eau
            </p>
            <button 
              onClick={downloadQRCode}
              className="mt-3 flex items-center space-x-2 mx-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le QR Code</span>
            </button>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/map"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Découvrir les fontaines
          </Link>
          <Link
            href="/consumer/dashboard"
            className="block w-full text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Mon tableau de bord
          </Link>
        </div>
      </div>
    </div>
  )
}

// Export dynamique pour éviter la hydratation côté serveur
const PaymentSuccess = dynamic(() => Promise.resolve(PaymentSuccessContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p>Chargement...</p>
      </div>
    </div>
  )
})

export default PaymentSuccess