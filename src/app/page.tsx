"use client"

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning } from 'lucide-react'

export default function Home() {
  const [happiness, setHappiness] = useState(50)

  const getEmoji = (value: number) => {
    if (value < 20) return <CloudLightning className="w-16 h-16 text-gray-600" />
    if (value < 40) return <CloudRain className="w-16 h-16 text-gray-400" />
    if (value < 60) return <Cloud className="w-16 h-16 text-gray-300" />
    if (value < 80) return <CloudSun className="w-16 h-16 text-yellow-400" />
    return <Sun className="w-16 h-16 text-yellow-500" />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Happy Globe</h1>
      <div className="w-64 h-64 rounded-full bg-white shadow-lg flex items-center justify-center mb-8">
        {getEmoji(happiness)}
      </div>
      <Slider
        className="w-64 mb-8"
        value={[happiness]}
        onValueChange={(value) => setHappiness(value[0])}
        max={100}
        step={1}
      />
      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
        Share Your Happiness
      </Button>
    </main>
  )
}

