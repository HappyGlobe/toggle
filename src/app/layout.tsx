import './globals.css'
import 'leaflet/dist/leaflet.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Happy Globe',
  description: 'Measure and share global happiness levels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-sky-200 to-yellow-200">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}

