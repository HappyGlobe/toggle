"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  // In a real application, this would be generated on the server
  const newUserId = Math.floor(100000 + Math.random() * 900000).toString()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registering new user:', { id: newUserId, username })
    router.push('/signin')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Register New User</CardTitle>
          <CardDescription className="text-center">Create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">The ID of the new user will be:</p>
              <div className="bg-gray-100 rounded-lg p-2 mt-1">
                <p className="text-2xl font-bold">{newUserId}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="username"
                placeholder="Insert a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button type="submit" className="w-full max-w-[200px]">Register New User</Button>
            <Link href="/signin" className="text-sm text-blue-600 hover:text-blue-800">
              Back to Sign In
            </Link>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}

