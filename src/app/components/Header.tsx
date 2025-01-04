"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  const handleSignOut = () => {
    setIsSignedIn(false)
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          <li>
            <Link href="/map" className="text-blue-600 hover:text-blue-800">
              Happiness Map
            </Link>
          </li>
          <li>
            <Link href="/trends" className="text-blue-600 hover:text-blue-800">
              Trends
            </Link>
          </li>
        </ul>
        <div>
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/signin">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

