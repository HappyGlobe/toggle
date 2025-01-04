"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function SignInPage() {
  const [userId, setUserId] = useState('')
  const router = useRouter()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signing in with user ID:', userId)
    router.push('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">Enter your User ID to sign in</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="userId"
                  placeholder="Enter your 6-digit User ID"
                  value={userId}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setUserId(value);
                  }}
                  pattern="\d{6}"
                  maxLength={6}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Link href="/users" className="text-sm text-blue-600 hover:text-blue-800">
              Look at the users database
            </Link>
            <Button type="submit" className="w-full max-w-[200px]">Sign In</Button>
            <Link href="/register" className="text-sm text-blue-600 hover:text-blue-800">
              Register New User
            </Link>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}

