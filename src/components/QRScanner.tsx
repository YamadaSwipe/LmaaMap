'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, X, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface QRScannerProps {
  onScan?: (data: string) => void
  onError?: (error: string) => void
  onClose?: () => void
  isActive?: boolean
}

interface ScanResult {
  data: string
  timestamp: Date
  isValid: boolean
  fountainInfo?: {
    id: string
    name: string
    location: string
  }
}

export default function QRScanner({ 
  onScan, 
  onError, 
  onClose, 
  isActive = true 
}: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive) {
      initializeCamera()
    } else {
      stopScanning()
    }

    return () => {
      stopScanning()
    }
  }, [isActive])

  async function initializeCamera() {
    try {
      setLoading(true)
      setError(null)

      // Vérifier les permissions de caméra
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Caméra arrière de préférence
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          setHasPermission(true)
          setIsScanning(true)
          startScanning()
          setLoading(false)
        }
      }
    } catch (err) {
      console.error('Erreur accès caméra:', err)
      setHasPermission(false)
      setError('Impossible d\'accéder à la caméra. Vérifiez les permissions.')
      setLoading(false)
      
      if (onError) {
        onError('Erreur d\'accès à la caméra')
      }
    }
  }

  function startScanning() {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
    }

    scanIntervalRef.current = setInterval(() => {
      scanQRCode()
    }, 100) // Scanner toutes les 100ms
  }

  function stopScanning() {
    setIsScanning(false)
    
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
      scanIntervalRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  async function scanQRCode() {
    if (!videoRef.current || !canvasRef.current || !isScanning) {
      return
    }

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context || video.readyState !== video.HAVE_ENOUGH_DATA) {
      return
    }

    // Redimensionner le canvas selon la vidéo
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Dessiner la frame vidéo sur le canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    try {
      // Simulation de scan QR - Dans un vrai projet, utilisez une bibliothèque comme jsQR
      // const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      // const qrCode = jsQR(imageData.data, imageData.width, imageData.height)
      
      // Simulation d'un scan réussi (pour démo)
      const simulatedQRData = await simulateQRScan()
      
      if (simulatedQRData) {
        await handleScanSuccess(simulatedQRData)
      }
    } catch (error) {
      console.error('Erreur scan QR:', error)
    }
  }

  // Simulation d'un scan QR (remplacer par vraie logique)
  async function simulateQRScan(): Promise<string | null> {
    // Simulation: retourne un QR code valide de temps en temps
    if (Math.random() < 0.01) { // 1% de chance par scan
      const mockQRCodes = [
        'https://lmaamap.com/scan/qr-001',
        'https://lmaamap.com/scan/qr-002',
        'https://lmaamap.com/scan/qr-003'
      ]
      return mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)]
    }
    return null
  }

  async function handleScanSuccess(data: string) {
    setIsScanning(false)
    setLoading(true)

    try {
      // Valider et traiter le QR code
      const result = await validateQRCode(data)
      setScanResult(result)
      
      if (onScan) {
        onScan(data)
      }
    } catch (error) {
      setError('QR Code invalide ou expiré')
      if (onError) {
        onError('QR Code invalide')
      }
    } finally {
      setLoading(false)
    }
  }

  async function validateQRCode(data: string): Promise<ScanResult> {
    // Simulation de validation
    await new Promise(resolve => setTimeout(resolve, 1000))

    const isLmaaMapQR = data.includes('lmaamap.com/scan/')

    if (isLmaaMapQR) {
      const qrId = data.split('/').pop()
      
      // Simulation des infos fontaine
      const mockFountains: Record<string, any> = {
        'qr-001': {
          id: 'fountain-001',
          name: 'Fontaine Centrale',
          location: 'Place de la République, Paris'
        },
        'qr-002': {
          id: 'fountain-002',
          name: 'Fontaine Parc Municipal',
          location: 'Parc Municipal, Paris'
        },
        'qr-003': {
          id: 'fountain-003',
          name: 'Restaurant Central - Point d\'eau',
          location: 'Restaurant Central, 15 Rue de Rivoli'
        }
      }

      return {
        data,
        timestamp: new Date(),
        isValid: true,
        fountainInfo: mockFountains[qrId || ''] || null
      }
    }

    return {
      data,
      timestamp: new Date(),
      isValid: false
    }
  }

  function resetScanner() {
    setScanResult(null)
    setError(null)
    setIsScanning(true)
    startScanning()
  }

  if (hasPermission === false) {
    return (
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Accès à la caméra requis
          </h3>
          <p className="text-gray-600 mb-4">
            Pour scanner les QR codes, nous avons besoin d'accéder à votre caméra.
            Veuillez autoriser l'accès dans les paramètres de votre navigateur.
          </p>
          <div className="space-y-3">
            <button
              onClick={initializeCamera}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Réessayer
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Fermer
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Scanner QR</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Contenu principal */}
      <div className="p-4">
        {loading && (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-600">Initialisation de la caméra...</p>
          </div>
        )}

        {scanResult ? (
          // Résultat du scan
          <div className="text-center py-4">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              scanResult.isValid ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {scanResult.isValid ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-600" />
              )}
            </div>

            <h4 className={`text-lg font-semibold mb-2 ${
              scanResult.isValid ? 'text-green-800' : 'text-red-800'
            }`}>
              {scanResult.isValid ? 'QR Code Valide' : 'QR Code Invalide'}
            </h4>

            {scanResult.isValid && scanResult.fountainInfo ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="font-medium text-green-800">{scanResult.fountainInfo.name}</p>
                <p className="text-sm text-green-600">{scanResult.fountainInfo.location}</p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-600">
                  Ce QR code ne correspond pas à une fontaine LmaaMap valide.
                </p>
              </div>
            )}

            <div className="text-xs text-gray-500 mb-4">
              Scanné le {scanResult.timestamp.toLocaleString('fr-FR')}
            </div>

            <button
              onClick={resetScanner}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Scanner un autre QR Code
            </button>
          </div>
        ) : (
          // Interface de scan
          <div>
            {/* Zone de prévisualisation caméra */}
            <div className="relative mb-4">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover rounded-lg bg-gray-100"
                autoPlay
                playsInline
                muted
              />
              
              {/* Overlay de visée */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-white rounded-lg bg-transparent">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                </div>
              </div>

              {/* Indicateur d'état */}
              {isScanning && (
                <div className="absolute top-2 right-2">
                  <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Scanning...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Canvas caché pour le traitement */}
            <canvas
              ref={canvasRef}
              className="hidden"
            />

            {/* Instructions */}
            <div className="text-center text-sm text-gray-600 mb-4">
              <p>Positionnez le QR code dans le cadre</p>
              <p>La détection se fait automatiquement</p>
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={resetScanner}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Réinitialiser
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
                >
                  Fermer
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
