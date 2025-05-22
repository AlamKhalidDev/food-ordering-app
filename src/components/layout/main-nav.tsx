"use client"

import Link from "next/link"
import { UtensilsCrossed } from "lucide-react"

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <UtensilsCrossed className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl hidden md:inline-block">FoodHub</span>
      </Link>
    </div>
  )
}
