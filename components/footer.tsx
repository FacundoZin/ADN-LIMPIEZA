import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Sparkles, ArrowUpRight } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Nosotros", href: "/sobre-nosotros" },
]

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+54 9 11 1234-5678" },
  { icon: Mail, label: "Email", value: "info@adnlimpieza.com" },
  { icon: MapPin, label: "Ubicación", value: "Buenos Aires, Argentina" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

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
              className="shadow-soft hover:shadow-glow transition-all duration-300"
            >
              Contactar por WhatsApp
            </WhatsAppButton>
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
            <ul className="space-y-4">
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
