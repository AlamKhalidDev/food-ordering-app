import type React from "react"
import type { User } from "@prisma/client"
import { MainNav } from "@/components/layout/main-nav"
import { UserNav } from "@/components/layout/user-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SideNav } from "@/components/layout/side-nav"

interface AppLayoutProps {
  children: React.ReactNode
  user: User
}

export function AppLayout({ children, user }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <UserNav user={user} />
          </div>
          <MobileNav user={user} />
        </div>
      </header>
      <div className="flex flex-1">
        <SideNav user={user} className="hidden lg:block" />
        <main className="flex-1 container py-6">{children}</main>
      </div>
    </div>
  )
}
