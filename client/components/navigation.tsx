"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShoppingBag, User, Heart, Settings, BarChart3 } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: ShoppingBag },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Subscription", href: "/subscription", icon: Settings },
  { name: "Admin", href: "/admin", icon: BarChart3 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Hawk Mart</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Button key={item.name} variant={pathname === item.href ? "default" : "ghost"} asChild size="sm">
                <Link href={item.href} className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
