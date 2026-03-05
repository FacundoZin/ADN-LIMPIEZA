"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sparkles } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Nosotros", href: "/sobre-nosotros" },
]

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "py-3 glass border-b border-border/50 shadow-soft"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className={cn(
              "relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center transition-all duration-500",
              "bg-gradient-to-br from-white/10 to-white/5",
              "shadow-soft group-hover:shadow-glow group-hover:scale-110",
              "border border-white/20 group-hover:border-primary/50"
            )}>
              <Image
                src="/ADN-Limpieza-logo-redondo.png"
                alt="ADN Limpieza Logo"
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
                priority
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="hidden sm:block">
              <span className={cn(
                "font-semibold text-lg tracking-tight transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-foreground",
                "group-hover:text-primary"
              )}>
                ADN Limpieza
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className={cn(
              "flex items-center gap-1 p-1.5 rounded-full transition-all duration-300",
              isScrolled ? "bg-muted/50" : "bg-background/50 backdrop-blur-sm"
            )}>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {/* Active background pill */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-primary shadow-sm" />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <WhatsAppButton
                size="sm"
                className="shadow-soft hover:shadow-glow transition-shadow duration-300"
              >
                <span className="hidden lg:inline">Contactar</span>
              </WhatsAppButton>
            </div>

            {/* Mobile actions */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-xl transition-all duration-300",
                      isScrolled ? "" : "bg-background/50 backdrop-blur-sm"
                    )}
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full sm:w-[400px] p-0 border-l border-border/50"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile menu header */}
                    <SheetHeader className="p-6 border-b border-border/50">
                      <SheetTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-soft shrink-0">
                            <Image
                              src="/ADN-Limpieza-logo-redondo.png"
                              alt="ADN Limpieza Logo"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-semibold text-lg">ADN Limpieza</span>
                        </div>
                      </SheetTitle>
                    </SheetHeader>

                    {/* Navigation links */}
                    <nav className="flex-1 p-6 space-y-2">
                      {navigation.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                          <SheetClose asChild key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-medium transition-all duration-300",
                                "animate-slide-in-right",
                                isActive
                                  ? "bg-primary text-primary-foreground shadow-soft"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )}
                              style={{ animationDelay: `${index * 75}ms` }}
                            >
                              {item.name}
                            </Link>
                          </SheetClose>
                        )
                      })}
                    </nav>

                    {/* Mobile menu footer */}
                    <div className="p-6 border-t border-border/50 space-y-4">
                      <WhatsAppButton
                        size="lg"
                        className="w-full shadow-soft hover:shadow-glow"
                      >
                        Contactar por WhatsApp
                      </WhatsAppButton>

                      <p className="text-center text-sm text-muted-foreground">
                        +20 años de experiencia
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}
