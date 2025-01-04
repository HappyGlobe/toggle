"use client"

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
})

export default function MapPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Happiness Map</h1>
      <div className="w-full max-w-3xl h-96 bg-white rounded-lg shadow-lg overflow-hidden">
        <MapComponent />
      </div>
    </main>
  )
}

