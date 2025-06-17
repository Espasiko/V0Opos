"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { BookOpen, ClipboardList, Network, Users, Menu, Home, Brain, Sparkles, FileText } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Inicio",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Temario",
    href: "/temario",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Tests",
    href: "/tests",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Mapas Mentales",
    href: "/mapas",
    icon: <Network className="h-5 w-5" />,
  },
  {
    title: "Comparador",
    href: "/comparador",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Comunidad",
    href: "/comunidad",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "IA",
    href: "/ia",
    icon: <Sparkles className="h-5 w-5" />,
  },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] max-w-[300px] sm:w-72">
                <div className="flex items-center gap-2 pt-4 pb-8">
                  <Brain className="h-6 w-6" />
                  <span className="text-xl font-bold">OposIA</span>
                </div>
                <nav className="grid gap-2">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cambiar tema</span>
                  <ModeToggle />
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              <span className="text-xl font-bold hidden md:inline-block">OposIA</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-4 px-3 sm:py-6 sm:px-4">{children}</main>
      <footer className="border-t py-4 sm:py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} OposIA. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
