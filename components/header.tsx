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
  { name: "Inicio", href: "/", id: "inicio" },
  { name: "Categorías", href: "/#categorias", id: "categorias" },
  { name: "Productos", href: "/productos" },
  { name: "Nosotros", href: "/sobre-nosotros" },
]

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const [activeSegment, setActiveSegment] = useState("")
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Only track sections on the home page
    if (pathname !== "/") {
      setActiveSegment("")
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Middle of screen
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSegment(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Watch sections that have corresponding nav IDs
    navigation.forEach((item) => {
      if (item.id) {
        const el = document.getElementById(item.id)
        if (el) observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "py-3 bg-white/80 dark:bg-black/40 backdrop-blur-xl border-b border-white/10 dark:border-white/10 shadow-soft"
          : "py-5 bg-transparent"
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
              "relative w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-500",
              "bg-background/80 dark:bg-white/10 backdrop-blur-md shadow-soft group-hover:shadow-glow group-hover:scale-105",
              "border border-border/50 dark:border-white/20 group-hover:border-primary/50"
            )}>
              <Image
                src="/ADN-Limpieza-logo-redondo.png"
                alt="ADN Limpieza Logo"
                fill
                className="object-cover p-1.5 transition-transform duration-700 ease-in-out group-hover:rotate-12"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className={cn(
                "font-bold text-xl tracking-tight transition-colors duration-300",
                "text-foreground",
                "group-hover:text-primary"
              )}>
                ADN <span className="text-primary group-hover:text-foreground transition-colors">LIMPIEZA</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className={cn(
              "flex items-center gap-1 p-1 rounded-full transition-all duration-300",
              isScrolled ? "bg-black/5 dark:bg-white/5" : "bg-black/10 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10"
            )}>
              {navigation.map((item) => {
                const isActive = item.id 
                  ? (pathname === "/" && activeSegment === item.id) || (pathname === "/" && activeSegment === "" && item.id === "inicio")
                  : pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300",
                      isActive
                        ? "text-white"
                        : "text-foreground/70 hover:text-primary dark:text-white/70 dark:hover:text-primary"
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
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <WhatsAppButton
                size="default"
                className="bg-primary hover:bg-primary/90 text-white shadow-soft transition-all duration-300 rounded-xl px-6 font-bold bg-gradient-to-r from-primary to-orange-400"
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
                        const isActive = item.id 
                          ? (pathname === "/" && activeSegment === item.id) || (pathname === "/" && activeSegment === "" && item.id === "inicio")
                          : pathname === item.href
                        
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
