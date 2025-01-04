"use client"

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// This would typically come from a database or API
const users = [
  { id: '123456', username: 'John Doe', avatarUrl: 'https://github.com/shadcn.png' },
  { id: '234567', username: 'Jane Smith', avatarUrl: 'https://github.com/shadcn.png' },
  { id: '345678', username: 'Bob Johnson', avatarUrl: 'https://github.com/shadcn.png' },
  // Add more users as needed
]

export default function UsersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Users Database</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback>{user.username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">User ID: {user.id}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Link href="/signin" className="text-blue-600 hover:text-blue-800">
          Back to Sign In
        </Link>
      </div>
    </main>
  )
}

