"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MapPin, Phone, Mail, Clock, Sparkles, ArrowUpRight, Instagram, Facebook, Globe } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Nosotros", href: "/sobre-nosotros" },
]

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+54 9 11 1234-5678" },
  { icon: Mail, label: "Email", value: "info@adnlimpieza.com" },
  { icon: MapPin, label: "Ubicación", value: "Libertad 1556, Buenos Aires" },
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/adnlimpieza/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/adn.limpieza.77/", icon: Facebook },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const isAboutPage = pathname === "/sobre-nosotros"

  return (
    <footer className="relative bg-muted/30 border-t border-border/50">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
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
                />
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="font-semibold text-xl tracking-tight group-hover:text-primary transition-colors">
                ADN Limpieza
              </span>
            </Link>
            
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Más de 15 años brindando soluciones de limpieza profesional. 
              Productos de calidad que realmente cumplen sus promesas.
            </p>
            
            <WhatsAppButton 
              size="lg"
              className="shadow-soft hover:shadow-glow transition-all duration-300 mb-8"
            >
              Contactar por WhatsApp
            </WhatsAppButton>

            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                      "bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-soft"
                    )}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-6">
              Navegación
            </h3>
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-6">
              Contacto
            </h3>
            <ul className="space-y-4 mb-8">
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <li key={info.label} className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </li>
                )
              })}
              
              {/* Hours */}
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horario</p>
                  <p className="font-medium">Lun - Vie: 9:00 - 18:00</p>
                  <p className="text-sm text-muted-foreground">Sáb: 9:00 - 13:00</p>
                </div>
              </li>
            </ul>

            {/* Map Embed */}
            {!isAboutPage && (
              <div className="relative rounded-2xl overflow-hidden shadow-soft border border-border/50 h-48 lg:h-56 group mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.144453306899!2d-58.39121!3d-34.59123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab99a0ed30b%3A0xc3f835f8d689b275!2sLibertad%201556%2C%20C1016ABB%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sar!4v1718654321234!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ADN Limpieza. Todos los derechos reservados.
            </p>

            {/* Syntrax Credit */}
            <div className="flex items-center gap-0.5 text-sm text-muted-foreground/60">
              <span className="whitespace-nowrap translate-y-[1px]">desarrollado por:</span>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://syntrax-web.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center transition-all duration-300 hover:scale-110 -ml-1"
                    >
                      <div className="relative w-42 h-16">
                        <Image
                          src="/LogoSyntrax.png"
                          alt="Syntrax Logo"
                          fill
                          className="object-contain dark:invert dark:brightness-200 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                        />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    className="bg-card/95 backdrop-blur-xl border border-border/50 p-4 rounded-2xl shadow-soft-xl animate-in fade-in zoom-in duration-200"
                  >
                    <div className="flex flex-col gap-4 min-w-[200px]">
                      <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shadow-lg shadow-pink-500/20">
                          <Instagram className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">Syntrax Software</p>
                          <a 
                            href="https://www.instagram.com/syntrax.software/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            @syntrax.software
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Globe className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nuestra Web</p>
                          <a 
                            href="https://syntrax-web.vercel.app/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                          >
                            syntrax.software
                          </a>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link 
                href="#" 
                className="hover:text-foreground transition-colors duration-300"
              >
                Términos
              </Link>
              <Link 
                href="#" 
                className="hover:text-foreground transition-colors duration-300"
              >
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
