"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', happiness: 65 },
  { name: 'Tue', happiness: 59 },
  { name: 'Wed', happiness: 80 },
  { name: 'Thu', happiness: 81 },
  { name: 'Fri', happiness: 56 },
  { name: 'Sat', happiness: 55 },
  { name: 'Sun', happiness: 40 },
]

export default function TrendsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Happiness Trends</h1>
      <div className="w-full max-w-3xl h-96 bg-white rounded-lg shadow-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="happiness" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}

