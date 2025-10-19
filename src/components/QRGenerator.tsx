'use client'

import { useState, useEffect } from 'react'
import { QrCode, Download, Copy, RefreshCw } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'

interface QRGeneratorProps {
  onGenerate?: (fountainId: string, fountainName: string) => void
  value?: string
  readonly?: boolean
  size?: number
}

interface Fountain {
  id: string
  name: string
  location: string
  isActive: boolean
}

export default function QRGenerator({ 
  onGenerate, 
  value, 
  readonly = false, 
  size = 256 
}: QRGeneratorProps) {
  const [fountains, setFountains] = useState<Fountain[]>([])
  const [selectedFountain, setSelectedFountain] = useState('')
  const [customText, setCustomText] = useState('')
  const [qrValue, setQrValue] = useState(value || '')
  const [qrSize, setQrSize] = useState(size)
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M')
  const [includeMargin, setIncludeMargin] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!readonly) {
      loadFountains()
    }
  }, [readonly])

  useEffect(() => {
    if (value) {
      setQrValue(value)
    }
  }, [value])

  async function loadFountains() {
    try {
      // Simulation des fontaines disponibles
      const mockFountains: Fountain[] = [
        {
          id: 'fountain-001',
          name: 'Fontaine Centrale',
          location: 'Place de la République, Paris',
          isActive: true
        },
        {
          id: 'fountain-002',
          name: 'Fontaine Parc Municipal',
          location: 'Parc Municipal, Paris',
          isActive: true
        },
        {
          id: 'fountain-003',
          name: 'Fontaine Trocadéro',
          location: 'Place du Trocadéro, Paris',
          isActive: true
        },
        {
          id: 'fountain-004',
          name: 'Fontaine Nation',
          location: 'Place de la Nation, Paris',
          isActive: false
        },
        {
          id: 'fountain-005',
          name: 'Fontaine Bastille',
          location: 'Place de la Bastille, Paris',
          isActive: true
        }
      ]

      setFountains(mockFountains.filter(f => f.isActive))
    } catch (error) {
      console.error('Erreur chargement fontaines:', error)
    }
  }

  function generateQRValue() {
    if (selectedFountain && !customText) {
      const fountain = fountains.find(f => f.id === selectedFountain)
      if (fountain) {
        return `https://lmaamap.com/scan/${selectedFountain}`
      }
    }
    return customText
  }

  function handleGenerate() {
    const fountain = fountains.find(f => f.id === selectedFountain)
    if (fountain && onGenerate) {
      setLoading(true)
      setTimeout(() => {
        onGenerate(fountain.id, fountain.name)
        setLoading(false)
      }, 1000)
    }
  }

  function downloadQR() {
    const canvas = document.querySelector('#qr-code canvas') as HTMLCanvasElement
    if (canvas) {
      const link = document.createElement('a')
      link.download = `qr-code-${selectedFountain || 'custom'}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  function copyQRToClipboard() {
    const canvas = document.querySelector('#qr-code canvas') as HTMLCanvasElement
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob })
          navigator.clipboard.write([item]).then(() => {
            alert('QR Code copié dans le presse-papiers !')
          }).catch(() => {
            alert('Erreur lors de la copie')
          })
        }
      })
    }
  }

  const currentQRValue = value || generateQRValue()

  if (readonly) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div id="qr-code" className="p-4 bg-white border rounded-lg shadow-sm">
          {currentQRValue ? (
            <QRCodeCanvas
              value={currentQRValue}
              size={qrSize}
              level={errorLevel}
              includeMargin={includeMargin}
            />
          ) : (
            <div 
              className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
              style={{ width: qrSize, height: qrSize }}
            >
              <QrCode className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {currentQRValue && (
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadQR}
              className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger</span>
            </button>
            
            <button
              onClick={copyQRToClipboard}
              className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
            >
              <Copy className="w-4 h-4" />
              <span>Copier</span>
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Configuration du QR Code */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sélectionner une fontaine
          </label>
          <select
            value={selectedFountain}
            onChange={(e) => {
              setSelectedFountain(e.target.value)
              setCustomText('')
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choisir une fontaine...</option>
            {fountains.map((fountain) => (
              <option key={fountain.id} value={fountain.id}>
                {fountain.name} - {fountain.location}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center text-gray-500 text-sm">
          - OU -
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texte personnalisé
          </label>
          <textarea
            value={customText}
            onChange={(e) => {
              setCustomText(e.target.value)
              setSelectedFountain('')
            }}
            placeholder="Entrez l'URL ou le texte à encoder..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Options avancées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taille (px)
            </label>
            <input
              type="number"
              value={qrSize}
              onChange={(e) => setQrSize(parseInt(e.target.value) || 256)}
              min="128"
              max="512"
              step="32"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Niveau de correction
            </label>
            <select
              value={errorLevel}
              onChange={(e) => setErrorLevel(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="L">L - Faible (~7%)</option>
              <option value="M">M - Moyen (~15%)</option>
              <option value="Q">Q - Quartile (~25%)</option>
              <option value="H">H - Haute (~30%)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="include-margin"
            checked={includeMargin}
            onChange={(e) => setIncludeMargin(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="include-margin" className="text-sm text-gray-700">
            Inclure une marge autour du QR Code
          </label>
        </div>
      </div>

      {/* Prévisualisation */}
      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Prévisualisation</h4>
        
        <div className="flex flex-col items-center space-y-4">
          <div id="qr-code" className="p-4 bg-white border rounded-lg shadow-sm">
            {currentQRValue ? (
              <QRCodeCanvas
                value={currentQRValue}
                size={qrSize}
                level={errorLevel}
                includeMargin={includeMargin}
              />
            ) : (
              <div 
                className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                style={{ width: qrSize, height: qrSize }}
              >
                <div className="text-center">
                  <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Sélectionnez une fontaine ou<br />
                    entrez un texte personnalisé
                  </p>
                </div>
              </div>
            )}
          </div>

          {currentQRValue && (
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Valeur encodée :</p>
              <p className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded max-w-xs truncate">
                {currentQRValue}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {currentQRValue && (
              <>
                <button
                  onClick={downloadQR}
                  className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger</span>
                </button>
                
                <button
                  onClick={copyQRToClipboard}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copier</span>
                </button>
              </>
            )}

            {selectedFountain && onGenerate && (
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <QrCode className="w-4 h-4" />
                )}
                <span>{loading ? 'Génération...' : 'Générer et Sauvegarder'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Informations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="text-sm font-medium text-blue-800 mb-2">💡 Informations utiles</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Les QR codes sont automatiquement liés aux fontaines sélectionnées</li>
          <li>• Un niveau de correction plus élevé permet une meilleure lisibilité même si le code est partiellement endommagé</li>
          <li>• La taille recommandée pour l'impression est de 256px minimum</li>
          <li>• Les QR codes peuvent être désactivés temporairement sans être supprimés</li>
        </ul>
      </div>
    </div>
  )
}
