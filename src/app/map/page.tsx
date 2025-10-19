'use client'

import dynamic from 'next/dynamic'

const MapClientComponent = dynamic(() => import('./MapClientComponent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          Chargement de la carte...
        </p>
      </div>
    </div>
  )
})

export default function MapPage() {
  return <MapClientComponent />
}